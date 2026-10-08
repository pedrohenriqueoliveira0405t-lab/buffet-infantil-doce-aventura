import type { Tone } from "@/content/types";

/** Classes por tom pastel (escritas por extenso para o Tailwind encontrar). */
export const toneClasses: Record<Tone, { soft: string; placeholder: string }> = {
  blue: {
    soft: "bg-baby-blue/45",
    placeholder: "[--ph:var(--color-baby-blue)]",
  },
  pink: {
    soft: "bg-pastel-pink/40",
    placeholder: "[--ph:var(--color-pastel-pink)]",
  },
  yellow: {
    soft: "bg-soft-yellow/60",
    placeholder: "[--ph:var(--color-soft-yellow)]",
  },
  mint: {
    soft: "bg-mint/60",
    placeholder: "[--ph:var(--color-mint)]",
  },
};
