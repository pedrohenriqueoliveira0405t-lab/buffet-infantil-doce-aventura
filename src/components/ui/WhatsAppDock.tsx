import { contact, ctas } from "@/content/site";
import { WhatsAppIcon } from "./BrandIcons";
import { StickyCtaBar } from "./StickyCtaBar";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * CTA de WhatsApp sempre ao alcance:
 * - mobile (< 768px): barra fixa no rodapé da tela, botão em largura total;
 * - tablet e desktop: botão flutuante no canto inferior direito.
 */
export function WhatsAppDock() {
  return (
    <>
      <StickyCtaBar>
        <WhatsAppLink
          phone={contact.whatsapp}
          message={ctas.stickyBar.message}
          ctaLocation={ctas.stickyBar.location}
          // Classes próprias (e não buttonClasses) para o padding menor caber em 360px numa linha só.
          className="flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full bg-deep-blue px-3 py-2.5 text-center min-[375px]:gap-2 text-base leading-tight font-semibold text-white shadow-soft transition duration-200 select-none active:scale-[0.98] active:opacity-90"
        >
          <WhatsAppIcon className="size-5 shrink-0" />
          <span>{ctas.stickyBar.label}</span>
        </WhatsAppLink>
      </StickyCtaBar>

      <WhatsAppLink
        phone={contact.whatsapp}
        message={ctas.float.message}
        ctaLocation={ctas.float.location}
        ariaLabel={`${ctas.float.label} pelo WhatsApp (abre em nova aba)`}
        className="fixed right-6 bottom-6 z-50 hidden h-14 items-center justify-center gap-2.5 rounded-full bg-deep-blue px-6 text-white shadow-lift ring-4 ring-warm-white/70 transition duration-200 active:scale-95 motion-safe:hover:-translate-y-0.5 md:inline-flex"
      >
        <WhatsAppIcon className="size-6" />
        <span className="font-semibold">{ctas.float.label}</span>
      </WhatsAppLink>
    </>
  );
}
