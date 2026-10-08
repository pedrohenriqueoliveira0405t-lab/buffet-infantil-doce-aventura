import { ctas, finalCta } from "@/content/site";
import { Container } from "@/components/ui/Layout";
import { Highlight } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/** CTA final: bloco grande, frase emocional e botão de WhatsApp. */
export function FinalCta() {
  return (
    <section aria-labelledby="cta-final-title" className="defer-render pb-section">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-baby-blue px-5 py-10 text-center sm:rounded-[2.5rem] sm:px-12 sm:py-14 lg:py-16">
          <div
            aria-hidden="true"
            className="glow-pastel-pink pointer-events-none absolute -top-40 -left-36 size-[28rem] opacity-80"
          />
          <div
            aria-hidden="true"
            className="glow-soft-yellow pointer-events-none absolute -right-36 -bottom-48 size-[32rem] opacity-90"
          />
          <div
            aria-hidden="true"
            className="glow-mint pointer-events-none absolute top-1/4 right-1/5 hidden size-72 opacity-70 sm:block"
          />

          <div className="relative mx-auto max-w-3xl">
            <h2
              id="cta-final-title"
              className="font-display text-[1.75rem] leading-[1.15] font-medium tracking-tight text-deep-blue sm:text-5xl sm:leading-[1.1] lg:text-6xl"
            >
              <Highlight text={finalCta.title} />
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-graphite sm:mt-4 sm:text-lg">
              {finalCta.description}
            </p>
            <WhatsAppCta cta={ctas.finalCta} size="lg" className="mt-6 w-full sm:mt-7 sm:w-auto" />
            <p className="mt-4 text-base font-medium text-graphite sm:text-sm">{finalCta.note}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
