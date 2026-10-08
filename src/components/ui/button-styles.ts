import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "light";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Hover só em dispositivos com mouse (padrão do Tailwind v4); no toque, o retorno
 * visual vem do estado :active (leve redução e opacidade, só transform/opacity).
 */
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full text-center leading-tight font-semibold select-none sm:whitespace-nowrap transition duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 active:scale-[0.97] active:opacity-90 disabled:pointer-events-none disabled:opacity-40";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-deep-blue text-white shadow-soft hover:shadow-lift",
  secondary: "bg-white text-deep-blue ring-1 ring-deep-blue/25 ring-inset hover:ring-deep-blue/60 hover:shadow-soft",
  light: "bg-warm-white text-deep-blue shadow-soft hover:bg-white hover:shadow-lift focus-on-dark",
};

/**
 * Todos os tamanhos têm no mínimo 44px de altura (alvo de toque).
 * Altura mínima (e não fixa) para o texto poder quebrar em telas estreitas (só abaixo de 640px).
 */
const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2 text-sm sm:px-5",
  md: "min-h-12 px-6 py-2.5 text-base sm:text-[15px]",
  lg: "min-h-14 px-7 py-3 text-base sm:px-8",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
