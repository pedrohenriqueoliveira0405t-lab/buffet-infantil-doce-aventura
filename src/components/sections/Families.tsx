import { ctas, families } from "@/content/site";
import { cn } from "@/lib/cn";
import { phoneWidth } from "@/lib/image-sizes";
import { Container, Section } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

// Mosaico pensado para as proporções das fotos (a 1ª é vertical; as demais, horizontais ou quadradas).
// Mobile: 2 colunas, a 1ª foto alta + 6 quadradas. A partir de 768px: 3x3, com a 1ª e a 5ª altas.
// `sizes` considera o recorte (object-cover): nos blocos altos a foto é exibida mais larga que o bloco.
const SQUARE = {
  className: "aspect-square md:aspect-auto",
  sizes: `(min-width: 1152px) 380px, (min-width: 768px) 40vw, ${phoneWidth("60vw")}`,
};
const tiles = [
  { className: "row-span-2", sizes: `(min-width: 1152px) 400px, (min-width: 768px) 50vw, ${phoneWidth("85vw")}` },
  SQUARE,
  SQUARE,
  SQUARE,
  {
    className: "aspect-square md:row-span-2 md:aspect-auto",
    sizes: `(min-width: 1152px) 470px, (min-width: 768px) 60vw, ${phoneWidth("60vw")}`,
  },
  SQUARE,
  SQUARE,
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

        <ul className="mt-section-gap grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:auto-rows-[14rem]">
          {families.parties.map((party, index) => (
            <li
              key={party.theme}
              className={cn("reveal group relative overflow-hidden rounded-3xl", (tiles[index] ?? SQUARE).className)}
            >
              {/* FOTO REAL: veja `families.parties[].image` em site.ts */}
              <Photo
                image={party.image}
                compactLabel
                sizes={(tiles[index] ?? SQUARE).sizes}
                className="h-full w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
              />
              {/* Mobile: etiqueta mais justa, para "Jardim Encantado" caber numa linha em 360px. */}
              <p className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] rounded-full bg-warm-white/95 px-2.5 py-1 text-[13px] shadow-soft sm:bottom-3 sm:left-3 sm:max-w-[calc(100%-1.5rem)] sm:px-3.5 sm:py-1.5 sm:text-sm">
                <span className="font-semibold text-deep-blue">{party.theme}</span>
                <span className="hidden text-graphite/85 lg:inline"> · {party.child}</span>
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
