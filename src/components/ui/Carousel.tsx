"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CarouselProps {
  /** Nome acessível da lista. */
  label: string;
  /** Nome de cada item, usado nas bolinhas ("Ir para: Fantasia"). */
  itemLabels: string[];
  /** Com os dois rótulos, mostra setas a partir de 768px. */
  previousLabel?: string;
  nextLabel?: string;
  /** Item exibido primeiro (centralizado quando align = "center"). */
  initialIndex?: number;
  /** Alinhamento do snap: "start" (padrão) ou "center". Os itens devem usar snap-start/snap-center. */
  align?: "start" | "center";
  /** Classes extras da lista, por exemplo para virar grade em telas maiores. */
  listClassName?: string;
  /**
   * Classes extras dos controles (bolinhas e setas), por exemplo "lg:hidden" quando a lista
   * vira grade. Escondidos por CSS, e não por estado, para não causar layout shift.
   */
  controlsClassName?: string;
  className?: string;
  /**
   * Rolagem automática: tempo (ms) em cada item. Só funciona até `autoplayMaxWidth` (mobile),
   * com a lista visível na tela; pausa por alguns segundos após toque/arraste e tem botão de pausar.
   */
  autoplay?: number;
  /** Largura máxima (px) em que a rolagem automática funciona. Padrão: 767 (mobile). */
  autoplayMaxWidth?: number;
  /** Itens (<li>). */
  children: ReactNode;
}

/** Depois de um toque, arraste ou clique, a rolagem automática espera este tempo para voltar. */
const RESUME_AFTER_INTERACTION = 8000;

const mediaStore = (query: string) => ({
  subscribe: (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  },
  get: () => window.matchMedia(query).matches,
});
const reducedMotionStore = mediaStore("(prefers-reduced-motion: reduce)");
const subscribeVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};

const controlButton =
  "grid size-11 place-items-center rounded-full bg-white text-deep-blue shadow-soft ring-1 ring-graphite/10 transition active:scale-95 hover:ring-deep-blue/40 disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Carrossel leve com scroll-snap nativo: swipe no celular, trackpad e teclado (setas, com
 * foco na lista), bolinhas indicadoras, setas opcionais e rolagem automática opcional (mobile).
 */
export function Carousel({
  label,
  itemLabels,
  previousLabel,
  nextLabel,
  initialIndex = 0,
  align = "start",
  listClassName,
  controlsClassName,
  className,
  autoplay,
  autoplayMaxWidth = 767,
  children,
}: CarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(initialIndex);
  const [edges, setEdges] = useState({ atStart: initialIndex === 0, atEnd: false });

  // Rolagem automática (mobile)
  const [smallStore] = useState(() => mediaStore(`(max-width: ${autoplayMaxWidth}px)`));
  const small = useSyncExternalStore(smallStore.subscribe, smallStore.get, () => false);
  const reducedMotion = useSyncExternalStore(reducedMotionStore.subscribe, reducedMotionStore.get, () => false);
  const pageVisible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => true);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [tick, setTick] = useState(0);
  const lastInteraction = useRef(0);
  const markInteraction = () => {
    lastInteraction.current = Date.now();
  };
  const autoplayPaused = userPaused ?? reducedMotion;
  const playing = Boolean(autoplay) && small && !autoplayPaused && inView && pageVisible && !keyboardFocus;

  const items = () => Array.from(listRef.current?.children ?? []) as HTMLElement[];

  const targetLeft = (list: HTMLUListElement, item: HTMLElement) => {
    if (align === "center") return item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2;
    return item.offsetLeft - parseFloat(getComputedStyle(list).scrollPaddingLeft || "0");
  };

  const sync = () => {
    const list = listRef.current;
    if (!list) return;
    let nearest = 0;
    let best = Infinity;
    items().forEach((item, index) => {
      const distance = Math.abs(targetLeft(list, item) - list.scrollLeft);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setActive(nearest);
    setEdges({
      atStart: list.scrollLeft <= 4,
      atEnd: list.scrollLeft + list.clientWidth >= list.scrollWidth - 4,
    });
  };

  const goTo = (index: number) => {
    const list = listRef.current;
    const item = items()[index];
    if (!list || !item) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: targetLeft(list, item), behavior: reduceMotion ? "auto" : "smooth" });
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    let positioned = initialIndex === 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    // O ResizeObserver dispara depois do layout (inclusive quando a seção, com renderização
    // adiada, chega perto da tela): é ali que posicionamos o item inicial, sem forçar layout.
    const onResize = () => {
      if (!positioned && list.clientWidth > 0) {
        positioned = true;
        const first = list.children[initialIndex] as HTMLElement | undefined;
        if (first && list.scrollWidth > list.clientWidth) {
          list.scrollTo({ left: targetLeft(list, first), behavior: "instant" });
        }
      }
      onScroll();
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(list);
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      list.removeEventListener("scroll", onScroll);
    };
    // Executa só na montagem: `sync`/`targetLeft` leem o DOM no momento da chamada.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Visibilidade da lista na tela (só importa com rolagem automática).
  useEffect(() => {
    const list = listRef.current;
    if (!list || !autoplay) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.5,
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [autoplay]);

  // Avanço automático: a cada mudança de item o tempo recomeça; após interação, espera mais.
  useEffect(() => {
    if (!playing || !autoplay) return;
    const wait = Math.max(autoplay, lastInteraction.current + RESUME_AFTER_INTERACTION - Date.now());
    const timer = window.setTimeout(() => {
      const list = listRef.current;
      if (list && Date.now() - lastInteraction.current >= RESUME_AFTER_INTERACTION) {
        const atEnd = list.scrollLeft + list.clientWidth >= list.scrollWidth - 4;
        goTo(atEnd || active + 1 >= itemLabels.length ? 0 : active + 1);
      }
      setTick((value) => value + 1);
    }, wait);
    return () => window.clearTimeout(timer);
    // goTo lê o DOM no momento da chamada; o efeito reage a item ativo, estado e tique.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, autoplay, active, tick]);

  const showArrows = Boolean(previousLabel && nextLabel);

  return (
    <div
      className={className}
      onFocus={(event) => {
        // Só o foco por teclado pausa (tocar num botão também dá foco, e não deve travar a rolagem).
        if (event.target.matches(":focus-visible")) setKeyboardFocus(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false);
      }}
    >
      <ul
        ref={listRef}
        aria-label={label}
        tabIndex={0}
        onPointerDown={markInteraction}
        onTouchStart={markInteraction}
        onWheel={markInteraction}
        onKeyDown={markInteraction}
        className={cn(
          "no-scrollbar relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-2 pb-4 sm:-mx-8 sm:scroll-px-8 sm:gap-5 sm:px-8",
          listClassName,
        )}
      >
        {children}
      </ul>

      <div className={cn("mt-1 flex items-center justify-center gap-3", controlsClassName)}>
        {/* Bolinhas: área de toque de 44px, ponto visual pequeno. */}
        <div className={cn("flex items-center", showArrows && "md:mr-auto md:-ml-3.5")}>
          {itemLabels.map((itemLabel, index) => (
            <button
              key={itemLabel}
              type="button"
              onClick={() => {
                markInteraction();
                goTo(index);
              }}
              aria-label={`Ir para: ${itemLabel}`}
              aria-current={index === active ? "true" : undefined}
              className="group grid size-11 place-items-center rounded-full active:scale-90"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-colors duration-300",
                  index === active ? "w-6 bg-deep-blue" : "w-2 bg-graphite/30 group-hover:bg-graphite/50",
                )}
              />
            </button>
          ))}
        </div>

        {autoplay ? (
          <button
            type="button"
            onClick={() => setUserPaused(!autoplayPaused)}
            aria-label={
              autoplayPaused ? `Continuar rolagem automática: ${label}` : `Pausar rolagem automática: ${label}`
            }
            className="grid size-11 place-items-center rounded-full text-deep-blue transition active:scale-90 md:hidden"
          >
            {autoplayPaused ? (
              <Play aria-hidden="true" className="size-4 fill-current" />
            ) : (
              <Pause aria-hidden="true" className="size-4 fill-current" />
            )}
          </button>
        ) : null}

        {showArrows && (
          <div className="hidden gap-3 md:flex">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, active - 1))}
              disabled={edges.atStart}
              aria-label={previousLabel}
              className={controlButton}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(Math.min(itemLabels.length - 1, active + 1))}
              disabled={edges.atEnd}
              aria-label={nextLabel}
              className={controlButton}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
