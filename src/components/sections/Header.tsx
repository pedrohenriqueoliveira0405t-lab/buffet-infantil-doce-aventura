import Link from "next/link";
import { brand, ctas, nav } from "@/content/site";
import { Container } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";

/**
 * Header fixo e enxuto. No mobile e no tablet: só logo + botão compacto (56px de altura).
 * Mesmo visual no topo e durante a rolagem: fundo sólido igual ao da página,
 * sem borda, sombra ou blur, e sem destaque automático de link ativo.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-warm-white">
      <Container className="flex h-14 items-center justify-between gap-3 sm:h-16 lg:h-20">
        {/* data-logo-anchor: ponto de partida do balão decorativo (FloatingBalloon). */}
        <Link
          href="/"
          aria-label={`${brand.name}, página inicial`}
          data-logo-anchor
          className="flex h-11 shrink-0 items-center rounded-lg active:opacity-80"
        >
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${item.href}`}
                  className="inline-flex min-h-11 items-center rounded-md text-[15px] font-medium text-graphite transition-colors hover:text-deep-blue active:opacity-70"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <WhatsAppCta
          cta={ctas.header}
          size="sm"
          ariaLabel={`${ctas.header.label} pelo WhatsApp (abre em nova aba)`}
          className="shrink-0 whitespace-nowrap"
        />
      </Container>
    </header>
  );
}
