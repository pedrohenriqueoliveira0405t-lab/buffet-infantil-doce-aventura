import { Star } from "lucide-react";
import { rating } from "@/content/site";
import { cn } from "@/lib/cn";

/** Estrelas decorativas: o valor é sempre informado em texto ao lado. */
export function Stars({
  value = 5,
  className,
  starClassName,
}: {
  value?: number;
  className?: string;
  starClassName?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          strokeWidth={1.5}
          className={cn(
            "size-4",
            index < Math.round(value) ? "fill-soft-yellow text-deep-blue" : "fill-transparent text-deep-blue/30",
            starClassName,
          )}
        />
      ))}
    </span>
  );
}

/**
 * Selo de avaliação do Google, estilizado com a identidade da marca
 * (sem o logotipo oficial do Google).
 */
export function GoogleRatingSeal({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-4 rounded-3xl bg-white px-5 py-4 shadow-soft ring-1 ring-graphite/5",
        className,
      )}
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-soft-yellow font-display text-2xl font-semibold text-deep-blue">
        {rating.display}
      </span>
      <span className="flex flex-col gap-1">
        <Stars value={rating.value} />
        <span className="text-sm font-semibold text-graphite">
          Nota {rating.display} de 5 no {rating.source}
        </span>
        <span className="text-xs text-graphite/80">{rating.label}</span>
      </span>
    </div>
  );
}
