import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>;
}

/**
 * Espaçamento vertical das seções. Os valores vêm dos tokens `--section-space`
 * (py/pt/pb-section) definidos em globals.css, iguais para a página inteira.
 * - both: padding em cima e embaixo (padrão)
 * - top / bottom: só de um lado (quando a seção vizinha já dá o respiro)
 * - none: sem padding (seções que usam <Panel>, que tem o próprio padding)
 */
const sectionSpacing = {
  both: "py-section",
  top: "pt-section",
  bottom: "pb-section",
  none: "",
} as const;

export type SectionSpacing = keyof typeof sectionSpacing;

/**
 * Seção padrão, com compensação do header fixo nas âncoras.
 * Todas ficam abaixo da dobra, então usam renderização adiada (`defer-render`, globals.css).
 */
export function Section({
  id,
  labelledBy,
  spacing = "both",
  className,
  children,
}: {
  id?: string;
  labelledBy: string;
  spacing?: SectionSpacing;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("defer-render scroll-mt-16 lg:scroll-mt-20", sectionSpacing[spacing], className)}
    >
      {children}
    </section>
  );
}

/** Painel arredondado com fundo de cor, levemente recuado das bordas da tela, com o padding padrão de seção. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative mx-2 overflow-hidden rounded-[2rem] py-section sm:mx-4 sm:rounded-[var(--radius-panel)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
