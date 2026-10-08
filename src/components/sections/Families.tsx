import { ctas, families } from "@/content/site";
import { cn } from "@/lib/cn";
import { Container, Section } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

// Mosaico 4x3 no desktop; no mobile, 1 foto larga + 6 quadradas em 2 colunas.
const tileLayout = [
  "col-span-2 aspect-[16/10] lg:col-span-2 lg:row-span-2 lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:row-span-2 lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:col-span-2 lg:aspect-auto",
  "aspect-square lg:aspect-auto",
];

/** Famílias que confiam em nós: mosaico de festas reais (decoração, sem crianças identificáveis). */
export function Families() {
  return (
    <Section id="familias" labelledBy="familias-title">
      <Container>
        <SectionHeading
          id="familias-title"
          eyebrow={families.eyebrow}
          title={families.title}
          description={families.description}
          align="center"
        />

        <ul className="mt-section-gap grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[13rem]">
          {families.parties.map((party, index) => (
            <li key={party.theme} className={cn("reveal group relative overflow-hidden rounded-3xl", tileLayout[index])}>
              {/* FOTO REAL: veja `families.parties[].image` em site.ts */}
              <Photo
                image={party.image}
                compactLabel
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="h-full w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
              />
              <p className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-full bg-warm-white/95 px-3.5 py-1.5 text-sm shadow-soft">
                <span className="font-semibold text-deep-blue">{party.theme}</span>
                <span className="hidden text-graphite/85 sm:inline"> · {party.child}</span>
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <WhatsAppCta cta={ctas.families} size="lg" className="w-full sm:w-auto" />
        </div>
      </Container>
    </Section>
  );
}
