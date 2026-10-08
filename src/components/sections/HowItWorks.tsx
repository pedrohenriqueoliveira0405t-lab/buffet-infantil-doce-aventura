import { ctas, howItWorks } from "@/content/site";
import { Container, Panel, Section } from "@/components/ui/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/** Como funciona: 4 etapas, do primeiro contato ao pós-festa, mostrando que há método. */
export function HowItWorks() {
  return (
    <Section id="como-funciona" labelledBy="como-funciona-title" spacing="none">
      <Panel className="bg-mint/30">
        <Container>
          <SectionHeading
            id="como-funciona-title"
            eyebrow={howItWorks.eyebrow}
            title={howItWorks.title}
            description={howItWorks.description}
            align="center"
          />

          <ol className="mt-section-gap grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {howItWorks.steps.map((step, index) => (
              <li
                key={step.title}
                className="reveal relative flex flex-col rounded-3xl bg-white p-5 shadow-soft sm:rounded-[1.75rem] sm:p-7"
              >
                {/* No mobile, número e título na mesma linha para o card ficar compacto. */}
                <div className="flex items-center gap-3 sm:block">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-mint font-display text-base font-semibold text-deep-blue sm:size-12 sm:text-lg"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl leading-snug font-semibold text-deep-blue sm:mt-4">
                    <span className="sr-only">Etapa {index + 1}: </span>
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2.5 flex-1 leading-relaxed text-graphite/85 sm:mt-3">{step.text}</p>
                <p className="mt-4 inline-flex self-start rounded-full bg-mint/45 px-3 py-1 text-xs font-semibold text-graphite sm:mt-5">
                  {step.meta}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex justify-center">
            <WhatsAppCta cta={ctas.howItWorks} size="lg" className="w-full sm:w-auto" />
          </div>
        </Container>
      </Panel>
    </Section>
  );
}
