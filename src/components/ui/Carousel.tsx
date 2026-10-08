"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
  /** Itens (<li>). */
  children: ReactNode;
}

const controlButton =
  "grid size-11 place-items-center rounded-full bg-white text-deep-blue shadow-soft ring-1 ring-graphite/10 transition active:scale-95 hover:ring-deep-blue/40 disabled:cursor-not-allowed disabled:opacity-40";

/**
 * Carrossel leve com scroll-snap nativo: swipe no celular, trackpad e teclado (setas, com
 * foco na lista), bolinhas indicadoras e setas opcionais. Quando a lista não rola
 * (ex.: virou grade no desktop), os controles somem sozinhos.
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
  children,
}: CarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(initialIndex);
  const [edges, setEdges] = useState({ atStart: initialIndex === 0, atEnd: false });

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

  const showArrows = Boolean(previousLabel && nextLabel);

  return (
    <div className={className}>
      <ul
        ref={listRef}
        aria-label={label}
        tabIndex={0}
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
              onClick={() => goTo(index)}
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
