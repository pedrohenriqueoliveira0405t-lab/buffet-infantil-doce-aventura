"use client";

import type { MouseEvent, ReactNode } from "react";
import { describeOrigin, getAttribution, trackWhatsAppClick } from "@/lib/analytics";
import { buildWhatsAppUrl, withReference } from "@/lib/whatsapp";

interface WhatsAppLinkProps {
  phone: string;
  message: string;
  ctaLocation: string;
  packageName?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

/**
 * Link para o WhatsApp com rastreamento.
 * O HTML já sai com o link funcional (inclusive sem JavaScript). No clique, acrescentamos
 * a origem do tráfego à mensagem e disparamos o evento `whatsapp_click`.
 */
export function WhatsAppLink({
  phone,
  message,
  ctaLocation,
  packageName,
  className,
  ariaLabel,
  children,
}: WhatsAppLinkProps) {
  const href = buildWhatsAppUrl(phone, withReference(message, ctaLocation));

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const attribution = getAttribution();
    const origin = describeOrigin(attribution);
    if (origin) {
      event.currentTarget.href = buildWhatsAppUrl(phone, withReference(message, ctaLocation, origin));
    }
    trackWhatsAppClick({ ctaLocation, packageName, attribution });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={ariaLabel}
      data-cta-location={ctaLocation}
      className={className}
    >
      {children}
      {!ariaLabel && <span className="sr-only"> (abre o WhatsApp em nova aba)</span>}
    </a>
  );
}
