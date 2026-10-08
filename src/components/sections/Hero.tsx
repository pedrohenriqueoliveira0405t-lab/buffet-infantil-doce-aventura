import { Sparkles } from "lucide-react";
import { ctas, hero, rating } from "@/content/site";
import { Container } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { Stars } from "@/components/ui/Rating";
import { Highlight } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/**
 * Primeira dobra: responde à busca (o que é + onde + diferencial), mostra autoridade
 * (1.800 festas, 4,9 no Google) e já oferece o CTA principal.
 *
 * Mobile primeiro: em 375x667 cabem logo, headline (30px, até 4 linhas), subtítulo curto,
 * CTA e selo 4,9 sem rolar. A foto vem depois do texto e nunca empurra o CTA para fora.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-5 pb-10 sm:pt-10 lg:pt-12 lg:pb-16">
      <div
        aria-hidden="true"
        className="glow-baby-blue pointer-events-none absolute -top-40 -right-40 size-[26rem] opacity-50 sm:-top-56 sm:-right-48 sm:size-[52rem] sm:opacity-60"
      />
      <div
        aria-hidden="true"
        className="glow-mint pointer-events-none absolute top-1/3 -left-56 hidden size-[30rem] opacity-50 sm:block"
      />

      <Container className="relative grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <h1 id="hero-title">
            <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.14em] text-graphite/80 uppercase sm:text-[13px] sm:tracking-[0.18em]">
              <span aria-hidden="true" className="h-0.5 w-5 shrink-0 rounded-full bg-pastel-pink sm:w-6" />
              {hero.eyebrow}
            </span>
            <span className="mt-3 block font-display text-[1.875rem] leading-[1.1] font-medium tracking-tight text-balance text-deep-blue min-[400px]:text-[2rem] sm:mt-5 sm:text-6xl sm:leading-[1.04] lg:text-[4.25rem]">
              <Highlight text={hero.title} />
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-base leading-relaxed text-graphite/85 sm:mt-5 sm:text-xl sm:leading-relaxed">
            <span className="sm:hidden">{hero.subtitleShort}</span>
            <span className="hidden sm:inline">{hero.subtitle}</span>
          </p>

          <div className="mt-5 flex flex-col items-start gap-4 sm:mt-7 sm:flex-row sm:items-center sm:gap-6">
            <WhatsAppCta cta={ctas.hero} size="lg" className="w-full sm:w-auto" />
            <p className="hidden text-sm text-graphite/80 sm:block">{hero.ctaNote}</p>
          </div>

          <div
            data-hero-rating
            className="mt-4 flex items-center gap-3 sm:mt-7 sm:gap-4 sm:border-t sm:border-graphite/10 sm:pt-5"
          >
            <span className="font-display text-3xl font-medium text-deep-blue sm:text-4xl">{rating.display}</span>
            <span className="flex flex-col gap-0.5 sm:gap-1">
              <Stars value={rating.value} />
              <span className="text-base text-graphite/85 sm:text-sm">{rating.label}</span>
            </span>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 hidden -rotate-2 rounded-[2.75rem] bg-pastel-pink/35 sm:block"
          />
          {/* FOTO REAL: /public/images/hero-salao-decorado.jpg (veja `hero.image` em site.ts) */}
          <Photo
            image={hero.image}
            preload
            sizes="(min-width: 1024px) 520px, 100vw"
            className="aspect-[4/3] rounded-[2rem] shadow-soft sm:aspect-[16/10] sm:rounded-[2.5rem] sm:shadow-lift lg:aspect-[4/5]"
          />

          <div className="absolute -bottom-5 left-3 flex max-w-[calc(100%-1.5rem)] items-center gap-3 rounded-2xl bg-white p-3 shadow-lift ring-1 ring-graphite/5 sm:-bottom-6 sm:left-6 sm:p-5">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-soft-yellow text-deep-blue sm:size-11">
              <Sparkles aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </span>
            <span className="flex flex-col">
              <span className="font-display text-lg leading-tight font-semibold text-deep-blue">
                {hero.exclusive.title}
              </span>
              <span className="text-base leading-snug text-graphite/85 sm:text-sm">{hero.exclusive.text}</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
