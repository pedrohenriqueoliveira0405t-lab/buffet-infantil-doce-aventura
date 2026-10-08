import type { Metadata, Viewport } from "next";
import { DM_Sans, Fredoka } from "next/font/google";
import Script from "next/script";
import { brand, cookieBanner, seo } from "@/content/site";
import { palette } from "@/content/theme";
import { consentDefaultsScript } from "@/lib/consent";
import { siteUrl } from "@/lib/site-url";
import { AttributionTracker } from "@/components/ui/AttributionTracker";
import { CookieBanner } from "@/components/ui/CookieBanner";
import "./globals.css";

// Página 100% estática (SSG): o build falha se algo passar a depender da requisição.
export const ensureStatic = "navigation";

const display = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fredoka",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// GTM só é carregado se o ID estiver configurado (ver .env.example).
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const hasGtm = Boolean(gtmId && /^GTM-[A-Z0-9]+$/.test(gtmId));

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s | ${brand.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  applicationName: brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: brand.name,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: palette.warmWhite,
  // Necessário para env(safe-area-inset-*) funcionar no iPhone (barra fixa de CTA).
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        {/*
          Google Consent Mode v2: padrão "negado" antes de qualquer tag carregar.
          `beforeInteractive` injeta o script no <head> e o executa antes do código do Next,
          fora da árvore que o React hidrata. (Um <script> escrito direto no <head> quebrava a
          hidratação no Netlify, que insere um comentário e uma quebra de linha no <head>.)
        */}
        <Script
          id="consent-defaults"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: consentDefaultsScript }}
        />
        {hasGtm && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}

        <a
          href="#conteudo"
          className="sr-only rounded-full bg-deep-blue px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70]"
        >
          Pular para o conteúdo
        </a>

        {children}

        <CookieBanner {...cookieBanner} />
        <AttributionTracker />

        {hasGtm && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
      </body>
    </html>
  );
}
