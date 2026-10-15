import { ctas, space } from "@/content/site";
import { cn } from "@/lib/cn";
import { Carousel } from "@/components/ui/Carousel";
import { Container, Panel, Section } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { PhotoSlideshow } from "@/components/ui/PhotoSlideshow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

// Mosaico a partir do tablet: a primeira área (brinquedoteca) ganha destaque.
const tileLayout = ["md:col-span-2 lg:col-span-2 lg:row-span-2", "lg:col-span-2", "lg:col-span-2"];

const tileAspect = [
  "md:aspect-[16/9] lg:aspect-auto",
  "md:aspect-[4/3] lg:aspect-auto",
  "md:aspect-[4/3] lg:aspect-auto",
];

const SIZES = "(min-width: 768px) 50vw, 85vw";

/**
 * O espaço: galeria das áreas, com especificações concretas.
 * Áreas com mais de uma foto viram slideshow automático; com uma, foto fixa.
 * Mobile: carrossel com swipe (card de ~85% + pedaço do próximo), legenda abaixo da foto.
 * Tablet/desktop: grade em mosaico com a legenda sobre a foto.
 */
export function Space() {
  return (
    <Section id="espaco" labelledBy="espaco-title" spacing="none">
      <Panel className="bg-baby-blue/25">
        <Container>
          <SectionHeading
            id="espaco-title"
            eyebrow={space.eyebrow}
            title={space.title}
            description={space.description}
          />

          <Carousel
            label="Áreas do espaço"
            itemLabels={space.areas.map((area) => area.name)}
            className="mt-section-gap"
            controlsClassName="md:hidden"
            listClassName="md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pt-0 md:pb-0 lg:grid-cols-4 lg:grid-rows-[18rem_18rem]"
          >
            {space.areas.map((area, index) => {
              const photoClass = cn("aspect-[4/3] w-full md:h-full", tileAspect[index]);
              return (
                <li
                  key={area.name}
                  className={cn(
                    "group relative flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft md:block md:w-auto",
                    tileLayout[index],
                  )}
                >
                  {/* Fotos em /public/images/imagens_site (lista em `space.areas[].images`, site.ts). */}
                  {area.images.length > 1 ? (
                    <PhotoSlideshow
                      images={area.images}
                      label={`Fotos: ${area.name}`}
                      sizes={SIZES}
                      className={photoClass}
                    />
                  ) : (
                    <Photo
                      image={area.images[0]}
                      compactLabel
                      sizes={SIZES}
                      className={cn(
                        photoClass,
                        "transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]",
                      )}
                    />
                  )}
                  <div className="flex-1 px-4 py-3.5 md:absolute md:inset-x-4 md:bottom-4 md:rounded-2xl md:bg-warm-white/95 md:px-5 md:py-4 md:shadow-soft">
                    <h3 className="font-display text-lg leading-tight font-semibold text-deep-blue md:text-xl">
                      {area.name}
                    </h3>
                    <p className="mt-1 text-base leading-snug text-graphite/85 md:text-sm">{area.spec}</p>
                  </div>
                </li>
              );
            })}
          </Carousel>

          <div className="mt-6 flex justify-center md:mt-8">
            <WhatsAppCta cta={ctas.space} size="lg" className="w-full sm:w-auto" />
          </div>
        </Container>
      </Panel>
    </Section>
  );
}
