/**
 * Rastreamento de conversão.
 *
 * - Guarda UTMs e gclid em sessionStorage na chegada, para não perder a origem
 *   quando o visitante navega ou demora para clicar.
 * - Dispara o evento `whatsapp_click` no dataLayer do Google Tag Manager
 *   (usado como conversão no Google Ads).
 */

const STORAGE_KEY = "lp_attribution";

const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

type TrackedParam = (typeof TRACKED_PARAMS)[number];

export type Attribution = Partial<Record<TrackedParam, string>> & {
  referrer?: string;
  landing_page?: string;
};

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Attribution = {};
    for (const key of TRACKED_PARAMS) {
      const value = params.get(key);
      if (value) fromUrl[key] = value.slice(0, 200);
    }

    // Sem parâmetros novos, mantém a origem já registrada nesta sessão.
    const hasNewParams = Object.keys(fromUrl).length > 0;
    if (!hasNewParams && window.sessionStorage.getItem(STORAGE_KEY)) return;

    let referrer: string | undefined;
    if (document.referrer) {
      const host = new URL(document.referrer).hostname;
      if (host !== window.location.hostname) referrer = host;
    }

    const data: Attribution = { ...fromUrl, referrer, landing_page: window.location.pathname };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage indisponível (modo privado, bloqueio de cookies): segue sem atribuição.
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/** Resumo curto e legível da origem, usado na referência da mensagem do WhatsApp. */
export function describeOrigin(attribution: Attribution): string | null {
  const { gclid, utm_source, utm_medium, utm_campaign, referrer } = attribution;
  if (gclid) return ["Google Ads", utm_campaign].filter(Boolean).join(" / ");
  if (utm_source) return [utm_source, utm_medium, utm_campaign].filter(Boolean).join(" / ");
  if (referrer?.includes("instagram")) return "Instagram";
  if (referrer?.includes("google")) return "Google";
  return null;
}

interface WhatsAppClickEvent {
  ctaLocation: string;
  packageName?: string;
  attribution: Attribution;
}

export function trackWhatsAppClick({ ctaLocation, packageName, attribution }: WhatsAppClickEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "whatsapp_click",
    cta_location: ctaLocation,
    package: packageName,
    ...attribution,
  });
}
