"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Barra fixa no rodapé da tela (só no mobile), com o CTA ao alcance do polegar.
 *
 * - Aparece depois que o CTA do hero sai da tela por cima.
 * - Some enquanto o CTA final estiver visível, para não duplicar o botão.
 * - Em páginas sem CTA de hero (ex.: política de privacidade), fica sempre visível.
 * - Respeita a safe area do iPhone e anima só com transform.
 */
export function StickyCtaBar({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.querySelector('[data-cta-location="hero"]');
    const finalCta = document.querySelector('[data-cta-location="cta_final"]');
    let passedHero = !heroCta;
    let finalInView = false;
    const update = () => setVisible(passedHero && !finalInView);

    const observers: IntersectionObserver[] = [];
    if (heroCta) {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry) return;
        passedHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        update();
      });
      observer.observe(heroCta);
      observers.push(observer);
    }
    if (finalCta) {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry) return;
        finalInView = entry.isIntersecting;
        update();
      });
      observer.observe(finalCta);
      observers.push(observer);
    }
    const frame = observers.length === 0 ? requestAnimationFrame(update) : 0;

    return () => {
      cancelAnimationFrame(frame);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 bg-warm-white px-2.5 pt-3 min-[375px]:px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-12px_rgb(35_94_131/0.3)] transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden",
        visible ? "translate-y-0" : "translate-y-[calc(100%+1rem)]",
      )}
    >
      {children}
    </div>
  );
}
