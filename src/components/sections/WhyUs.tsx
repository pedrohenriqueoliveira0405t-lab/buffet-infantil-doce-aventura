import { whyUs } from "@/content/site";
import { IconBubble } from "@/components/ui/Icon";
import { Container, Section } from "@/components/ui/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Por que nos escolher: benefícios específicos, em layout editorial.
 * No mobile, grade de 2 colunas com ícones menores e texto curto.
 */
export function WhyUs() {
  return (
    <Section id="diferenciais" labelledBy="diferenciais-title">
      <Container>
        <div className="grid gap-3 lg:grid-cols-2 lg:items-end lg:gap-12">
          <SectionHeading id="diferenciais-title" eyebrow={whyUs.eyebrow} title={whyUs.title} />
          <p className="max-w-xl text-base leading-relaxed text-graphite/85 sm:text-lg">{whyUs.description}</p>
        </div>

        <ul className="mt-section-gap grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-3">
          {whyUs.items.map((item) => (
            <li key={item.title} className="reveal border-t border-graphite/10 pt-5 sm:pt-6">
              <IconBubble name={item.icon} tone={item.tone} />
              <h3 className="mt-3 font-display text-lg leading-snug font-medium text-deep-blue sm:mt-4 sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1.5 leading-relaxed text-graphite/85 sm:mt-2">
                <span className="sm:hidden">{item.short}</span>
                <span className="hidden sm:inline">{item.text}</span>
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
