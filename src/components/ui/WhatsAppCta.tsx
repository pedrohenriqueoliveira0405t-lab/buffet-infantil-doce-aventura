import { contact } from "@/content/site";
import type { Cta } from "@/content/types";
import { WhatsAppIcon } from "./BrandIcons";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";
import { WhatsAppLink } from "./WhatsAppLink";

/**
 * Botão de CTA padrão do site. Todo CTA passa por aqui: leva ao WhatsApp,
 * usa a mensagem própria definida em `site.ts` e dispara `whatsapp_click`.
 * Se o CTA tiver `shortLabel`, ele aparece no mobile e o rótulo completo a partir de 640px.
 */
export function WhatsAppCta({
  cta,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
}: {
  cta: Cta;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Nome acessível explícito (útil quando o rótulo visível é curto). */
  ariaLabel?: string;
}) {
  return (
    <WhatsAppLink
      phone={contact.whatsapp}
      message={cta.message}
      ctaLocation={cta.location}
      packageName={cta.package}
      ariaLabel={ariaLabel}
      className={buttonClasses(variant, size, className)}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      {cta.shortLabel ? (
        <>
          <span className="sm:hidden">{cta.shortLabel}</span>
          <span className="hidden sm:inline">{cta.label}</span>
        </>
      ) : (
        <span>{cta.label}</span>
      )}
    </WhatsAppLink>
  );
}
