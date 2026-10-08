import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingTone = "default" | "inverse";

/** Renderiza *trechos entre asteriscos* com o marca-texto da marca. */
export function Highlight({ text, tone = "default" }: { text: string; tone?: HeadingTone }) {
  const parts = text.split(/\*(.+?)\*/g);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className={tone === "inverse" ? "text-soft-yellow" : "text-highlight"}>
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function Eyebrow({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: HeadingTone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em]",
        tone === "inverse" ? "text-soft-yellow" : "text-graphite/80",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-0.5 w-6 rounded-full", tone === "inverse" ? "bg-soft-yellow" : "bg-pastel-pink")}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: HeadingTone;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          // Escala: 28px no mobile, 44px no tablet, 48px no desktop.
          "mt-3 font-display text-[1.75rem] leading-[1.15] font-medium tracking-tight sm:text-[2.75rem] sm:leading-[1.12] lg:text-5xl",
          tone === "inverse" ? "text-white" : "text-deep-blue",
        )}
      >
        <Highlight text={title} tone={tone} />
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-base leading-relaxed sm:mt-4 sm:text-lg",
            tone === "inverse" ? "text-white/85" : "text-graphite/85",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
