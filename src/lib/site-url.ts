/**
 * URL pública do site, usada em metadados, sitemap e dados estruturados.
 * Defina NEXT_PUBLIC_SITE_URL em produção (ex.: https://www.seubuffet.com.br).
 * Sem a variável, usa o domínio de produção da plataforma (Netlify ou Vercel).
 */
const netlifyUrl = process.env.NETLIFY === "true" ? process.env.URL : undefined;
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  netlifyUrl ||
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");
