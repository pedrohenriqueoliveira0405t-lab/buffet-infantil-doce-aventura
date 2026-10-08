/**
 * Tipos do conteúdo do site. Os dados em si ficam em `site.ts`.
 */

/** Tons pastel da paleta, usados em fundos, ícones e placeholders de foto. */
export type Tone = "blue" | "pink" | "yellow" | "mint";

/** Ícones disponíveis (mapeados para o lucide-react em `components/ui/Icon.tsx`). */
export type IconName =
  | "award"
  | "baby"
  | "badge-check"
  | "cake"
  | "calendar-check"
  | "castle"
  | "chef"
  | "clipboard"
  | "crown"
  | "file-text"
  | "fire-extinguisher"
  | "gift"
  | "handshake"
  | "heart"
  | "heart-pulse"
  | "id-card"
  | "palette"
  | "party"
  | "salad"
  | "shield"
  | "sofa"
  | "sparkles"
  | "trees"
  | "user"
  | "users"
  | "utensils"
  | "zap";

export interface BrandLogo {
  /** Caminho do arquivo dentro de /public. */
  src: string;
  /** Dimensões reais do arquivo, em px. */
  width: number;
  height: number;
  /** Retângulo (em px do arquivo) onde está o desenho, sem as margens transparentes. */
  crop: { x: number; y: number; width: number; height: number };
}

export interface SiteImage {
  /** Caminho da foto real dentro de /public (ex.: "/images/hero-salao.jpg"). */
  src: string;
  /**
   * Mude para `true` quando a foto real estiver em /public/images.
   * Enquanto for `false`, o site exibe um placeholder com a mesma proporção.
   */
  ready: boolean;
  /** Texto alternativo descritivo (vale tanto para a foto quanto para o placeholder). */
  alt: string;
  /** Legenda curta exibida no placeholder, indicando qual foto entra ali. */
  label: string;
  tone: Tone;
  icon?: IconName;
}

/** Todo CTA leva ao WhatsApp, com mensagem própria e evento `whatsapp_click`. */
export interface Cta {
  label: string;
  /** Rótulo curto, usado no mobile quando o espaço é pequeno (ex.: header). */
  shortLabel?: string;
  /** Mensagem pré-preenchida no WhatsApp. */
  message: string;
  /** Valor de `cta_location` no evento `whatsapp_click`. */
  location: string;
  /** Valor de `package` no evento `whatsapp_click`, quando o CTA é de um pacote. */
  package?: string;
}

export interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail?: string;
  /** Mostra uma estrela ao lado do número (usado na nota do Google). */
  star?: boolean;
}

export interface Feature {
  icon: IconName;
  tone: Tone;
  title: string;
  text: string;
  /** Versão curta do texto, exibida no mobile (grade de 2 colunas). */
  short: string;
}

export interface SpaceArea {
  name: string;
  spec: string;
  image: SiteImage;
}

export interface TeamMember {
  name: string;
  role: string;
  credential: string;
  image: SiteImage;
}

export interface Step {
  title: string;
  text: string;
  meta: string;
}

export interface Package {
  id: string;
  name: string;
  tagline: string;
  guests: number;
  duration: string;
  priceFrom: number;
  featured?: boolean;
  badge?: string;
  includesTitle: string;
  includes: string[];
  cta: Cta;
}

export interface Testimonial {
  name: string;
  relation: string;
  theme: string;
  city: string;
  rating: number;
  quote: string;
}

export interface FamilyParty {
  theme: string;
  child: string;
  image: SiteImage;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PolicySection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}
