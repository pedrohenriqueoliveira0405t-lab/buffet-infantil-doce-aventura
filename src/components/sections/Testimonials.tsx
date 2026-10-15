import { Quote } from "lucide-react";
import { testimonials } from "@/content/site";
import { phoneWidth } from "@/lib/image-sizes";
import { Carousel } from "@/components/ui/Carousel";
import { Container, Panel, Section } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { GoogleRatingSeal, Stars } from "@/components/ui/Rating";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Depoimentos (fictícios) com nome, cidade, idade do filho e tema da festa.
 * Um depoimento principal em destaque, com foto da festa, e os demais em carrossel.
 */
export function Testimonials() {
  const { featured } = testimonials;

  return (
    <Section id="depoimentos" labelledBy="depoimentos-title" spacing="none">
      <Panel className="bg-pastel-pink/20">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading id="depoimentos-title" eyebrow={testimonials.eyebrow} title={testimonials.title} />
            <GoogleRatingSeal className="self-start lg:self-auto" />
          </div>

          <figure className="reveal mt-section-gap grid overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
            {/* FOTO REAL: veja `testimonials.featured.image` em site.ts */}
            <Photo
              image={featured.image}
              sizes={`(min-width: 1024px) 500px, (min-width: 640px) 100vw, ${phoneWidth("100vw")}`}
              className="aspect-[16/9] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[24rem]"
            />
            <div className="flex flex-col justify-center p-5 sm:p-10">
              <Quote aria-hidden="true" className="size-7 text-pastel-pink sm:size-9" strokeWidth={1.5} />
              <blockquote className="mt-3 font-display text-lg leading-snug font-medium text-graphite sm:mt-4 sm:text-2xl sm:leading-snug">
                “{featured.quote}”
              </blockquote>
              <figcaption className="mt-5 flex flex-col gap-1.5 border-t border-graphite/10 pt-4 sm:mt-6 sm:pt-5">
                <Stars value={featured.rating} />
                <span className="sr-only">Nota {featured.rating} de 5.</span>
                <span className="font-semibold text-graphite">
                  {featured.name}, {featured.relation}
                </span>
                <span className="text-base text-graphite/80 sm:text-sm">
                  Tema {featured.theme} · {featured.city}
                </span>
              </figcaption>
            </div>
          </figure>

          <Carousel
            label={testimonials.carouselLabel}
            itemLabels={testimonials.items.map((item) => `depoimento de ${item.name}`)}
            previousLabel={testimonials.previousLabel}
            nextLabel={testimonials.nextLabel}
            autoplay={6000}
            className="mt-4 sm:mt-6"
          >
            {testimonials.items.map((item) => (
              <li
                key={item.name}
                className="flex w-[85%] shrink-0 snap-start sm:w-[22rem] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <figure className="flex w-full flex-col rounded-[1.75rem] bg-white p-5 shadow-soft sm:p-7">
                  <Stars value={item.rating} />
                  <span className="sr-only">Nota {item.rating} de 5.</span>
                  <blockquote className="mt-3 flex-1 leading-relaxed text-graphite/90 sm:mt-4">“{item.quote}”</blockquote>
                  <figcaption className="mt-5 border-t border-graphite/10 pt-4 sm:mt-6 sm:pt-5">
                    <span className="block font-semibold text-graphite">
                      {item.name}, {item.relation}
                    </span>
                    <span className="mt-1 block text-base text-graphite/80 sm:text-sm">
                      Tema {item.theme} · {item.city}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </Carousel>
        </Container>
      </Panel>
    </Section>
  );
}
