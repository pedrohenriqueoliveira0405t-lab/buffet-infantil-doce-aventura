import { ChevronDown } from "lucide-react";
import { ctas, faq } from "@/content/site";
import { ExclusiveAccordion } from "@/components/ui/ExclusiveAccordion";
import { Container, Section } from "@/components/ui/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/**
 * FAQ com <details> nativo: acessível e funciona sem JavaScript.
 * Uma pergunta aberta por vez; a linha inteira da pergunta é a área de toque.
 * No mobile, o CTA vem depois das perguntas; no desktop, fica na coluna fixa à esquerda.
 */
export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-title" spacing="bottom">
      <Container className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} description={faq.description} />
          <div className="mt-6 hidden lg:block">
            <WhatsAppCta cta={ctas.faq} variant="secondary" />
          </div>
        </div>

        <ExclusiveAccordion className="border-t border-graphite/10">
          {faq.items.map((item) => (
            <details key={item.question} name="faq" className="group border-b border-graphite/10">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-left font-display text-lg leading-snug font-medium text-deep-blue transition-opacity select-none active:opacity-70 sm:gap-6 sm:py-5 sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-baby-blue/40 transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown aria-hidden="true" className="size-5" strokeWidth={2} />
                </span>
              </summary>
              <p className="max-w-2xl pb-5 leading-relaxed text-graphite/85 sm:pr-12 sm:pb-6">{item.answer}</p>
            </details>
          ))}
        </ExclusiveAccordion>

        <div className="lg:hidden">
          <WhatsAppCta cta={ctas.faq} variant="secondary" className="w-full sm:w-auto" />
        </div>
      </Container>
    </Section>
  );
}
