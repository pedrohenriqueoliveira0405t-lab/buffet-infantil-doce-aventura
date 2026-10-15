import { Check, Clock, Star, Users } from "lucide-react";
import { packages } from "@/content/site";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { Carousel } from "@/components/ui/Carousel";
import { Container, Section } from "@/components/ui/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/**
 * Pacotes: "a partir de" para qualificar o lead sem cara de tabela de preço.
 * O Fantasia fica em destaque (ancoragem) e cada card tem CTA com mensagem própria.
 *
 * Mobile/tablet: carrossel com scroll-snap; o Fantasia já aparece centralizado, com um
 * pedaço dos vizinhos à mostra (indica que dá para deslizar). Desktop: grade de 3 colunas.
 */
export function Packages() {
  const featuredIndex = Math.max(
    0,
    packages.items.findIndex((item) => item.featured),
  );

  return (
    <Section id="pacotes" labelledBy="pacotes-title" spacing="top" className="pb-8">
      <Container>
        <SectionHeading
          id="pacotes-title"
          eyebrow={packages.eyebrow}
          title={packages.title}
          description={packages.description}
          align="center"
        />

        <Carousel
          label="Pacotes"
          itemLabels={packages.items.map((item) => `pacote ${item.name}`)}
          initialIndex={featuredIndex}
          align="center"
          className="mt-6 sm:mt-section-gap"
          controlsClassName="lg:hidden"
          listClassName="pt-6 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:py-6"
        >
          {packages.items.map((item) => (
            <li
              key={item.id}
              className={cn(
                "relative flex w-[85%] shrink-0 snap-center flex-col rounded-[1.75rem] bg-white p-5 transition-shadow duration-300 sm:w-[60%] sm:p-8 md:w-[46%] lg:w-auto",
                item.featured
                  ? "shadow-lift ring-2 ring-deep-blue lg:-my-6 lg:py-10"
                  : "shadow-soft ring-1 ring-graphite/10 hover:shadow-lift",
              )}
            >
              {item.badge && (
                <span className="absolute -top-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-soft-yellow px-4 py-2 text-xs font-bold tracking-wider whitespace-nowrap text-graphite uppercase shadow-soft">
                  <Star aria-hidden="true" className="size-3.5 fill-deep-blue text-deep-blue" />
                  {item.badge}
                </span>
              )}

              <h3 className="font-display text-2xl font-medium text-deep-blue sm:text-3xl">{item.name}</h3>
              <p className="mt-1.5 leading-snug text-graphite/85 sm:mt-2">{item.tagline}</p>

              <ul className="mt-4 flex flex-wrap gap-2 text-sm font-medium text-graphite sm:mt-5">
                <li className="inline-flex items-center gap-1.5 rounded-full bg-baby-blue/35 px-3 py-1.5">
                  <Users aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  {packages.guestsLabel(item.guests)}
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-full bg-baby-blue/35 px-3 py-1.5">
                  <Clock aria-hidden="true" className="size-4" strokeWidth={1.75} />
                  {item.duration}
                </li>
              </ul>

              <p className="mt-4 border-t border-graphite/10 pt-4 sm:mt-5 sm:pt-5">
                <span className="block text-base text-graphite/80 sm:text-sm">{packages.priceLabel}</span>
                <span className="font-display text-4xl font-medium text-deep-blue sm:text-[2.75rem]">
                  {formatPrice(item.priceFrom)}
                </span>
              </p>

              <p className="mt-4 text-base font-bold text-graphite sm:mt-5 sm:text-sm">{item.includesTitle}</p>
              <ul className="mt-2.5 flex-1 space-y-2 sm:mt-3 sm:space-y-2.5">
                {item.includes.map((include) => (
                  <li key={include} className="flex gap-3 leading-snug text-graphite/90">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint">
                      <Check aria-hidden="true" className="size-3.5 text-deep-blue" strokeWidth={2.5} />
                    </span>
                    {include}
                  </li>
                ))}
              </ul>

              {/* Com o mouse em cima, o botão muda para menta (o mesmo tom dos checks da lista). */}
              <WhatsAppCta
                cta={item.cta}
                variant={item.featured ? "primary" : "secondary"}
                size="lg"
                className="mt-6 w-full hover:bg-mint hover:text-deep-blue sm:mt-7"
              />
            </li>
          ))}
        </Carousel>

        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-graphite/80 sm:mt-6 sm:text-sm">
          {packages.note}
        </p>
      </Container>
    </Section>
  );
}
