"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { SiteImage } from "@/content/types";
import { cn } from "@/lib/cn";
import { toneClasses } from "./tones";

interface PhotoSlideshowProps {
  images: SiteImage[];
  /** Nome acessível do conjunto de fotos (ex.: "Fotos da brinquedoteca"). */
  label: string;
  sizes: string;
  className?: string;
  /** Pré-carrega a primeira foto (só no hero, que é o LCP). */
  preloadFirst?: boolean;
  /** Tempo de cada foto, em milissegundos. */
  interval?: number;
  /** Classes extras de posicionamento dos controles (pausar e indicador). */
  controlsClassName?: string;
}

/** Duração do esmaecimento entre fotos (igual à classe duration-700). */
const FADE_MS = 700;

const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const subscribeVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};

/**
 * Fotos que passam sozinhas, com troca por esmaecimento (só opacidade).
 *
 * - Pausa fora da tela, com a aba em segundo plano e com o mouse ou o foco do teclado em cima.
 * - Botão de pausar/continuar (acessibilidade: conteúdo que se move sozinho precisa de pausa).
 * - Com prefers-reduced-motion, não começa sozinho; o visitante pode apertar "continuar".
 * - Só a primeira foto carrega com a página; a próxima é buscada assim que a primeira aparece,
 *   e as demais conforme o slideshow avança (sempre uma à frente).
 * - Só troca para uma foto que já carregou: em rede lenta, a foto atual fica um pouco mais,
 *   em vez de aparecer um quadro vazio.
 */
export function PhotoSlideshow({
  images,
  label,
  sizes,
  className,
  preloadFirst = false,
  interval = 2500,
  controlsClassName,
}: PhotoSlideshowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  // Só entram fotos marcadas como prontas (ready: true) em site.ts.
  const ready = images.filter((image) => image.ready);
  const count = ready.length;
  const [index, setIndex] = useState(0);
  /** Foto anterior: fica visível por baixo enquanto a nova aparece (sem "piscar" o fundo). */
  const [previous, setPrevious] = useState<number | null>(null);
  /** Maior índice já montado no DOM (carregamento progressivo). */
  const [revealed, setRevealed] = useState(0);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );

  // Sem escolha do visitante, o padrão é tocar (ou ficar parado com movimento reduzido).
  const paused = userPaused ?? reducedMotion;
  const playing = count > 1 && !paused && inView && pageVisible && !hovering && !focused;

  // Visibilidade na tela.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || count < 2) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.25,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [count]);

  /** Fotos que já terminaram de carregar (ou falharam: não travam o slideshow). */
  const loadedRef = useRef(new Set<number>());
  /** O tempo da foto atual acabou, mas a próxima ainda está carregando. */
  const waitingRef = useRef(false);
  const next = count > 0 ? (index + 1) % count : 0;

  const advance = () => {
    waitingRef.current = false;
    setPrevious(index);
    setIndex((index + 1) % count);
    // Já monta a seguinte, para ela carregar enquanto esta aparece.
    setRevealed((value) => Math.min(count - 1, value + 1));
  };

  const onImageDone = (i: number) => {
    loadedRef.current.add(i);
    // A primeira apareceu: começa a buscar a segunda.
    if (i === 0) setRevealed((value) => Math.max(value, Math.min(1, count - 1)));
    if (waitingRef.current && i === next) advance();
  };

  // Terminada a transição, a anterior sai de baixo (com 2 fotos, ela é a próxima a entrar
  // e precisa estar transparente para aparecer suavemente).
  useEffect(() => {
    if (previous === null) return;
    const timer = window.setTimeout(() => setPrevious(null), FADE_MS + 100);
    return () => window.clearTimeout(timer);
  }, [previous]);

  // Avanço automático: espera o tempo da foto e só troca se a próxima já carregou.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (loadedRef.current.has((index + 1) % count)) advance();
      else waitingRef.current = true;
    }, interval);
    return () => {
      window.clearTimeout(timer);
      waitingRef.current = false;
    };
    // `advance` só usa setters e refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, count, interval]);

  if (count === 0) return null;
  const limit = Math.max(revealed, index);

  return (
    <div
      ref={rootRef}
      role={count > 1 ? "group" : undefined}
      aria-roledescription={count > 1 ? "carrossel" : undefined}
      aria-label={count > 1 ? label : undefined}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={(event) => {
        // Só o foco por teclado pausa (tocar no botão também dá foco e não deve impedir o "continuar").
        if (event.target.matches(":focus-visible")) setFocused(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      className={cn("photo-placeholder relative overflow-hidden", toneClasses[ready[0].tone].placeholder, className)}
    >
      {ready.map((image, i) =>
        i <= limit ? (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            preload={preloadFirst && i === 0}
            // As seguintes só entram no DOM quando vão ser usadas: carregam na hora (lazy as
            // seguraria dentro de carrosséis, até o card aparecer).
            loading={i === 0 ? undefined : "eager"}
            onLoad={() => onImageDone(i)}
            onError={() => onImageDone(i)}
            aria-hidden={i !== index}
            // A atual aparece por cima da anterior, que continua opaca embaixo até a próxima troca.
            className={cn(
              "object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none",
              i === index ? "z-[2] opacity-100" : i === previous ? "z-[1] opacity-100" : "opacity-0",
            )}
          />
        ) : null,
      )}

      {count > 1 && (
        <div
          className={cn(
            "absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-warm-white/90 py-0.5 pr-0.5 pl-3 shadow-soft",
            controlsClassName,
          )}
        >
          <span aria-hidden="true" className="flex items-center gap-1">
            {ready.map((image, i) => (
              <span
                key={image.src}
                className={cn(
                  "block h-1.5 rounded-full transition-colors duration-300",
                  i === index ? "w-4 bg-deep-blue" : "w-1.5 bg-graphite/30",
                )}
              />
            ))}
          </span>
          <button
            type="button"
            onClick={() => setUserPaused(!paused)}
            aria-label={paused ? `Continuar: ${label}` : `Pausar: ${label}`}
            className="grid size-11 place-items-center rounded-full text-deep-blue transition active:scale-90"
          >
            {paused ? (
              <Play aria-hidden="true" className="size-4 fill-current" />
            ) : (
              <Pause aria-hidden="true" className="size-4 fill-current" />
            )}
          </button>
          <span className="sr-only" aria-live="polite">
            {paused ? `Foto ${index + 1} de ${count}: ${ready[index]?.label ?? ""}` : ""}
          </span>
        </div>
      )}
    </div>
  );
}
