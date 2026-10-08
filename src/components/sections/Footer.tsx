import Link from "next/link";
import { brand, contact, footer } from "@/content/site";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { CookiePreferencesButton } from "@/components/ui/CookieBanner";
import { Container } from "@/components/ui/Layout";
import { Logo } from "@/components/ui/Logo";

/** Links com área de toque de 44px de altura. */
const linkClass =
  "inline-flex min-h-11 items-center rounded-md text-graphite/85 transition-colors hover:text-deep-blue active:opacity-70";

/**
 * Rodapé. O respiro inferior evita que a barra de CTA (mobile, já somando a safe area
 * do iPhone) ou o botão flutuante (tablet/desktop) cubram o conteúdo.
 */
export function Footer() {
  return (
    <footer className="defer-render border-t border-graphite/10 bg-white pt-10 pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:pb-24">
      <Container>
        <div className="grid gap-7 sm:gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo variant="footer" />
            <p className="mt-4 max-w-sm leading-relaxed text-graphite/85 sm:mt-5">{brand.description}</p>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.16em] text-graphite/80 uppercase">{footer.contactTitle}</h2>
            <ul className="mt-3 space-y-2 text-base text-graphite/85 sm:mt-4 sm:space-y-2.5 sm:text-[15px]">
              <li>{contact.address.full}</li>
              <li>Visitas: {contact.visitHours.label.toLowerCase()}</li>
              <li>WhatsApp: {contact.phoneDisplay}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.16em] text-graphite/80 uppercase">{footer.linksTitle}</h2>
            <ul className="mt-2 text-base sm:mt-3 sm:text-[15px]">
              <li>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2`}>
                  <InstagramIcon className="size-4" />
                  {contact.instagram}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className={linkClass}>
                  {footer.privacyLabel}
                </Link>
              </li>
              <li>
                <CookiePreferencesButton label={footer.cookiesLabel} className={`${linkClass} cursor-pointer`} />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-graphite/10 pt-5 text-base text-graphite/80 sm:mt-8 sm:flex-row sm:justify-between sm:gap-3 sm:text-sm">
          <p>
            © {brand.name} · {footer.since}
          </p>
          <p>{footer.disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}
