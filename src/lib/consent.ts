/**
 * Consentimento de cookies (LGPD) integrado ao Google Consent Mode v2.
 *
 * O padrão "negado" é definido por um script inline no <head> (ver `consentDefaultsScript`),
 * antes de o GTM carregar. Aqui ficam a leitura, a gravação e a atualização da escolha.
 */

export type ConsentChoice = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "lp_consent_v1";
const CHANGE_EVENT = "lp:consent-change";
export const OPEN_PREFERENCES_EVENT = "lp:open-cookie-preferences";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Sem localStorage, a escolha vale só para esta página.
  }
  window.gtag?.("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "consent_update", consent_choice: choice });
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function openCookiePreferences(): void {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

/**
 * Script inline do <head>: cria o dataLayer, define o Consent Mode v2 como "negado"
 * e reaplica a escolha salva, tudo antes de o GTM carregar.
 */
export const consentDefaultsScript = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}
`.trim();
