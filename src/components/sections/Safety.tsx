import { FileCheck2 } from "lucide-react";
import { ctas, safety } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Container, Panel, Section } from "@/components/ui/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/**
 * Segurança e credenciais como prova técnica, apresentadas como selos.
 * Fundo deep-blue (texto branco, contraste AA) para dar peso a esta seção.
 */
export function Safety() {
  return (
    <Section id="seguranca" labelledBy="seguranca-title" spacing="none">
      <Panel className="bg-deep-blue">
        <div
          aria-hidden="true"
          className="glow-baby-blue pointer-events-none absolute -top-56 -right-48 size-[40rem] opacity-20"
        />
        <div
          aria-hidden="true"
          className="glow-mint pointer-events-none absolute -bottom-64 -left-40 size-[36rem] opacity-15"
        />

        <Container className="relative">
          <SectionHeading
            id="seguranca-title"
            eyebrow={safety.eyebrow}
            title={safety.title}
            description={safety.description}
            tone="inverse"
          />

          {/* Mobile: grade de 2 colunas, selo em cima e texto curto. */}
          <ul className="mt-section-gap grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
            {safety.seals.map((seal) => (
              <li
                key={seal.title}
                className="reveal flex flex-col gap-3 rounded-3xl bg-white/[0.07] p-4 ring-1 ring-white/15 sm:flex-row sm:gap-5 sm:rounded-[1.75rem] sm:p-6 lg:p-7"
              >
                {/* Selo: anel duplo em amarelo, como um carimbo de certificação. */}
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-soft-yellow text-deep-blue ring-2 ring-soft-yellow/50 ring-offset-2 ring-offset-deep-blue sm:size-14 sm:ring-offset-4">
                  <Icon name={seal.icon} className="size-5 sm:size-6" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-base leading-snug font-medium text-white sm:text-xl">{seal.title}</h3>
                  <p className="mt-1 leading-snug text-white/90 sm:mt-2 sm:leading-relaxed">
                    <span className="sm:hidden">{seal.short}</span>
                    <span className="hidden sm:inline">{seal.text}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col items-start gap-5 border-t border-white/15 pt-6 sm:mt-8 sm:gap-6 sm:pt-7 lg:flex-row lg:items-center lg:justify-between">
            <p className="flex max-w-2xl items-start gap-3 text-white/85">
              <FileCheck2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-soft-yellow" strokeWidth={1.75} />
              {safety.documentsNote}
            </p>
            <WhatsAppCta cta={ctas.safety} variant="light" size="lg" className="w-full sm:w-auto" />
          </div>
        </Container>
      </Panel>
    </Section>
  );
}
