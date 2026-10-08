"use client";

import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Duração em milissegundos. */
  duration?: number;
}

function format(value: number, decimals: number) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Número que sobe de 0 até o valor final quando entra na tela (uma vez só).
 * - O HTML já sai com o valor final (SEO, leitores de tela e quem está sem JavaScript).
 * - Com prefers-reduced-motion, o valor final aparece direto.
 * - A largura do valor final fica reservada, então nada ao redor se mexe durante a contagem.
 */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "", duration = 1500 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${prefix}${format(value, decimals)}${suffix}`;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    const render = (current: number) => {
      element.textContent = `${prefix}${format(current, decimals)}${suffix}`;
    };

    let frame = 0;
    render(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutCubic: começa rápido e desacelera suavemente perto do valor final.
          const eased = 1 - Math.pow(1 - progress, 3);
          render(value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      render(value);
    };
  }, [value, decimals, prefix, suffix, duration]);

  return (
    <>
      <span aria-hidden="true" className="inline-grid tabular-nums">
        {/* Reserva a largura do valor final. */}
        <span className="invisible col-start-1 row-start-1">{finalText}</span>
        <span ref={ref} className="col-start-1 row-start-1">
          {finalText}
        </span>
      </span>
      <span className="sr-only">{finalText}</span>
    </>
  );
}
