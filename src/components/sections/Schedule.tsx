import { CalendarDays } from "lucide-react";
import { ctas, schedule } from "@/content/site";
import { Container, Section } from "@/components/ui/Layout";
import { Eyebrow, Highlight } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/** Agenda: escassez honesta, explicada pelo próprio diferencial (uma festa por vez). */
export function Schedule() {
  return (
    <Section id="agenda" labelledBy="agenda-title">
      <Container>
        {/* Mobile: texto, horários e, por último, o CTA. Desktop: horários na coluna da direita. */}
        <div className="relative grid gap-5 overflow-hidden rounded-[2rem] bg-soft-yellow/45 px-5 py-6 sm:gap-7 sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-x-12 lg:gap-y-6 lg:p-12">
          <div
            aria-hidden="true"
            className="glow-white pointer-events-none absolute -top-40 -right-40 size-[28rem] opacity-70"
          />
          <div className="relative min-w-0 lg:col-start-1 lg:row-start-1">
            <Eyebrow>{schedule.eyebrow}</Eyebrow>
            <h2
              id="agenda-title"
              className="mt-3 font-display text-[1.75rem] leading-[1.15] font-medium text-deep-blue sm:text-4xl sm:leading-tight lg:text-[2.75rem]"
            >
              <Highlight text={schedule.title} />
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-graphite/85 sm:mt-4 sm:text-lg">
              {schedule.description}
            </p>
          </div>

          <ul className="relative grid gap-2.5 sm:gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            {schedule.slots.map((slot) => (
              <li key={slot.day} className="flex items-center gap-3 rounded-2xl bg-white/90 p-3.5 shadow-soft sm:gap-4 sm:p-5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-soft-yellow text-deep-blue sm:size-11">
                  <CalendarDays aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block font-semibold text-graphite">{slot.day}</span>
                  <span className="block text-base text-graphite/80 sm:text-sm">{slot.detail}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="relative lg:col-start-1 lg:row-start-2">
            <WhatsAppCta cta={ctas.schedule} size="lg" className="w-full sm:w-auto" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
