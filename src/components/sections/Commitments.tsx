import { commitments } from "@/content/site";
import { IconBubble } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Layout";
import { Eyebrow, Highlight } from "@/components/ui/SectionHeading";

/** Compromissos por contrato: reduz o risco percebido logo depois dos preços. */
export function Commitments() {
  return (
    <section aria-labelledby="compromissos-title" className="defer-render pb-section">
      <Container>
        <div className="rounded-[2rem] bg-soft-yellow/40 px-5 py-6 sm:p-10 lg:p-12">
          <div className="grid gap-3 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <Eyebrow>{commitments.eyebrow}</Eyebrow>
              <h2
                id="compromissos-title"
                className="mt-3 font-display text-[1.75rem] leading-[1.15] font-medium text-deep-blue sm:text-4xl sm:leading-tight"
              >
                <Highlight text={commitments.title} />
              </h2>
            </div>
            <p className="leading-relaxed text-graphite/85 lg:pb-1">{commitments.description}</p>
          </div>

          {/* Mobile: 2 colunas com texto curto. */}
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-8 sm:gap-y-6 lg:mt-8 lg:grid-cols-4">
            {commitments.items.map((item) => (
              <li key={item.title}>
                <IconBubble name={item.icon} tone={item.tone} surface="white" />
                <h3 className="mt-3 font-display text-lg leading-snug font-semibold text-deep-blue sm:mt-4">
                  {item.title}
                </h3>
                <p className="mt-1 leading-snug text-graphite/85 sm:mt-1.5 sm:leading-relaxed">
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.text}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
