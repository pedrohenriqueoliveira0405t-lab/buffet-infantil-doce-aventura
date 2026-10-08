/**
 * Monta o link do WhatsApp com a mensagem pré-preenchida.
 * Formato: https://wa.me/{numero}?text={mensagem}
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/**
 * Acrescenta, de forma discreta, de onde o lead veio (posição do CTA e origem do tráfego),
 * para o atendente saber o contexto sem precisar perguntar.
 * Ex.: "Olá! ...\n\n(ref.: site · pacote_fantasia · Google Ads)"
 */
export function withReference(message: string, ctaLocation: string, origin?: string | null): string {
  const parts = ["site", ctaLocation, origin].filter(Boolean);
  return `${message}\n\n(ref.: ${parts.join(" · ")})`;
}
