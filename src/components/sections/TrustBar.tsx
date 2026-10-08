import { Star } from "lucide-react";
import { trustBar } from "@/content/site";
import { CountUp } from "@/components/ui/CountUp";
import { Container } from "@/components/ui/Layout";

/**
 * Barra de confiança logo abaixo do hero: dois números concretos,
 * que sobem de 0 até o valor final quando a barra entra na tela.
 */
export function TrustBar() {
  return (
    <section aria-label={trustBar.label}>
      <Container>
        <dl className="mx-auto grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] bg-graphite/10 shadow-soft ring-1 ring-graphite/5">
          {trustBar.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center bg-white px-3 py-5 text-center sm:px-4 sm:py-8">
              <dt className="order-2 mt-2 text-base leading-snug text-graphite/85">
                <span className="font-semibold text-graphite">{stat.label}</span>
                {"detail" in stat && stat.detail && <span className="block sm:inline"> {stat.detail}</span>}
              </dt>
              <dd className="order-1 flex items-center gap-1.5 font-display text-4xl leading-none font-medium text-deep-blue sm:text-5xl">
                <CountUp
                  value={stat.value}
                  decimals={"decimals" in stat ? stat.decimals : undefined}
                  prefix={"prefix" in stat ? stat.prefix : undefined}
                />
                {"star" in stat && stat.star && (
                  <Star aria-hidden="true" strokeWidth={1.5} className="size-7 fill-soft-yellow text-deep-blue sm:size-8" />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
