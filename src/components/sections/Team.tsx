import { Quote } from "lucide-react";
import { ctas, team } from "@/content/site";
import { Container, Section } from "@/components/ui/Layout";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/** Quem cuida da sua festa: especialistas (fictícios) com credencial concreta. */
export function Team() {
  return (
    <Section id="equipe" labelledBy="equipe-title">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12">
          <SectionHeading
            id="equipe-title"
            eyebrow={team.eyebrow}
            title={team.title}
            description={team.description}
          />
          <figure className="relative rounded-[1.75rem] bg-pastel-pink/25 p-5 sm:p-8">
            <Quote aria-hidden="true" className="size-7 text-deep-blue/40 sm:size-8" strokeWidth={1.5} />
            <blockquote className="mt-3 font-display text-lg leading-snug font-medium text-deep-blue sm:mt-4 sm:text-2xl">
              “{team.quote.text}”
            </blockquote>
            <figcaption className="mt-4 text-base text-graphite/85 sm:mt-5 sm:text-sm">
              <span className="font-semibold text-graphite">{team.quote.author}</span>, {team.quote.role}
            </figcaption>
          </figure>
        </div>

        <ul className="mt-section-gap grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
          {team.members.map((member) => (
            <li key={member.name} className="reveal">
              {/* FOTO REAL: retrato vertical 4:5 (veja `team.members[].image` em site.ts) */}
              <Photo
                image={member.image}
                compactLabel
                sizes="(min-width: 1024px) 270px, 50vw"
                className="aspect-[4/5] rounded-3xl sm:rounded-[1.75rem]"
              />
              <h3 className="mt-3 font-display text-lg leading-tight font-semibold text-deep-blue sm:mt-4 sm:text-xl">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-bold tracking-wide text-graphite/80 uppercase sm:text-sm">{member.role}</p>
              <p className="mt-1.5 text-base leading-snug text-graphite/85 sm:mt-2 sm:leading-relaxed">{member.credential}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <WhatsAppCta cta={ctas.team} variant="secondary" className="w-full sm:w-auto" />
        </div>
      </Container>
    </Section>
  );
}
