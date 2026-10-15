"use client";

import { useEffect, useRef } from "react";

/** Distância entre o balão e o rodapé da janela quando a página chega ao fim. */
const BOTTOM_GAP = 28;
/** Inércia: fração da distância percorrida por quadro (menor = flutua com mais atraso). */
const EASE = 0.09;
/** Largura mínima da tela (px) para o balão aparecer: no mobile ele fica escondido. */
const MIN_WIDTH = 768;

/**
 * Balão decorativo que "se solta" da logo e acompanha a rolagem.
 *
 * - Fica fixo na margem esquerda, fora da área de conteúdo: no topo da página aparece
 *   ao lado da logo; no fim, perto do rodapé.
 * - Movimento só com transform (sem layout shift), atualizado em requestAnimationFrame
 *   com um pouco de inércia, balanço lateral e inclinação na direção do movimento.
 * - Só a partir de 768px (tablet e desktop). No mobile fica escondido e o script não roda.
 * - Com prefers-reduced-motion, fica parado ao lado da logo.
 */
export function FloatingBalloon() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const large = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);

    let x = 0;
    let startY = 0;
    let endY = 0;
    let swayAmplitude = 0;
    let maxScroll = 1;
    let target = 0;
    let current = 0;
    let frame = 0;

    const measure = () => {
      const logo = document.querySelector<HTMLElement>("[data-logo-anchor]");
      const header = document.querySelector("header");
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const wide = window.innerWidth >= 1280;
      const gap = wide ? 40 : 8;
      const logoLeft = logo?.getBoundingClientRect().left ?? 32;

      x = Math.max(4, logoLeft - width - gap);
      swayAmplitude = wide ? 8 : 3;
      startY = Math.max(4, ((header?.offsetHeight ?? 64) - height) / 2);
      endY = Math.max(startY, window.innerHeight - height - BOTTOM_GAP);
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    /** `velocity`: deslocamento vertical do balão neste quadro, em px. */
    const paint = (velocity: number) => {
      if (reducedMotion.matches) {
        element.style.transform = `translate3d(${x}px, ${startY}px, 0)`;
        return;
      }
      const y = startY + current * (endY - startY);
      // Balanço lateral e leve rotação ao longo do percurso, como se flutuasse,
      // mais uma inclinação na direção do movimento (como a cordinha arrastando).
      const wave = current * Math.PI * 7;
      const sway = Math.sin(wave) * swayAmplitude;
      const tilt = Math.max(-10, Math.min(10, velocity * 3)) + Math.sin(wave + 0.8) * 4;
      element.style.transform = `translate3d(${x + sway}px, ${y}px, 0) rotate(${tilt}deg)`;
    };

    const tick = () => {
      frame = 0;
      const delta = target - current;
      const previous = current;
      current = Math.abs(delta) < 0.0002 ? target : current + delta * EASE;
      paint((current - previous) * (endY - startY));
      if (current !== target) frame = requestAnimationFrame(tick);
    };

    const requestTick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (reducedMotion.matches || !large.matches) return;
      target = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      requestTick();
    };

    let initialized = false;
    const onResize = () => {
      if (!large.matches) return;
      measure();
      if (!initialized) {
        // Primeira medição: posiciona direto, sem animar a partir do topo.
        initialized = true;
        target = current = reducedMotion.matches ? 0 : Math.min(1, window.scrollY / maxScroll);
        paint(0);
        element.dataset.ready = "true";
        return;
      }
      onScroll();
      paint(0);
    };

    // O ResizeObserver dispara logo após o primeiro layout (e quando a página muda de altura,
    // com fontes e imagens). Medir ali evita forçar um layout extra durante a hidratação.
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reducedMotion.addEventListener("change", onResize);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reducedMotion.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[45] hidden w-5 opacity-0 transition-opacity duration-500 will-change-transform data-[ready]:opacity-75 md:block xl:w-10 xl:data-[ready]:opacity-100"
      style={{ transformOrigin: "50% 40%" }}
    >
      <svg viewBox="0 0 40 72" className="block w-full overflow-visible motion-safe:animate-balloon-bob">
        {/* Corpo do balão (rosa da paleta, como o balão da logo) */}
        <path
          d="M20 2C10.6 2 4 9.4 4 19c0 11 8.2 20.6 14.4 23.4h3.2C27.8 39.6 36 30 36 19 36 9.4 29.4 2 20 2Z"
          className="fill-pastel-pink"
        />
        {/* Brilho */}
        <ellipse cx="13.5" cy="13" rx="3.6" ry="6" transform="rotate(20 13.5 13)" className="fill-white" opacity="0.55" />
        {/* Nó */}
        <path d="M17.6 42.4h4.8l1.4 3.4h-7.6l1.4-3.4Z" className="fill-pastel-pink" />
        {/* Cordinha */}
        <path
          d="M20 45.8c-2.6 4.4 2.6 7.6 0 12-2.2 3.8 1.6 7.2 0.6 12"
          fill="none"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="stroke-deep-blue/60"
        />
      </svg>
    </div>
  );
}
