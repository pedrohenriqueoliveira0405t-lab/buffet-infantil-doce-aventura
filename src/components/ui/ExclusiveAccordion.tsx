"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Garante que só um <details> fique aberto por vez dentro do grupo.
 * Os navegadores atuais já fazem isso com o atributo `name`; este componente
 * cobre os mais antigos, sem mudar nada para quem já tem suporte.
 */
export function ExclusiveAccordion({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    // "toggle" não sobe na árvore; escutamos na fase de captura.
    const onToggle = (event: Event) => {
      const opened = event.target;
      if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;
      container.querySelectorAll("details[open]").forEach((details) => {
        if (details !== opened) (details as HTMLDetailsElement).open = false;
      });
    };
    container.addEventListener("toggle", onToggle, true);
    return () => container.removeEventListener("toggle", onToggle, true);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
