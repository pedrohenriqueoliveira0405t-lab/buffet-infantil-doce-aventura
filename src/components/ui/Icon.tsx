import { createElement } from "react";
import {
  Award,
  Baby,
  BadgeCheck,
  Cake,
  CalendarCheck,
  Castle,
  ChefHat,
  ClipboardCheck,
  Crown,
  FileText,
  FireExtinguisher,
  Gift,
  Handshake,
  Heart,
  HeartPulse,
  IdCard,
  Palette,
  PartyPopper,
  Salad,
  ShieldCheck,
  Sofa,
  Sparkles,
  Trees,
  UserRound,
  Users,
  Utensils,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName, Tone } from "@/content/types";
import { cn } from "@/lib/cn";
import { toneClasses } from "./tones";

const icons: Record<IconName, LucideIcon> = {
  award: Award,
  baby: Baby,
  "badge-check": BadgeCheck,
  cake: Cake,
  "calendar-check": CalendarCheck,
  castle: Castle,
  chef: ChefHat,
  clipboard: ClipboardCheck,
  crown: Crown,
  "file-text": FileText,
  "fire-extinguisher": FireExtinguisher,
  gift: Gift,
  handshake: Handshake,
  heart: Heart,
  "heart-pulse": HeartPulse,
  "id-card": IdCard,
  palette: Palette,
  party: PartyPopper,
  salad: Salad,
  shield: ShieldCheck,
  sofa: Sofa,
  sparkles: Sparkles,
  trees: Trees,
  user: UserRound,
  users: Users,
  utensils: Utensils,
  zap: Zap,
};

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  return createElement(icons[name], { "aria-hidden": true, ...props });
}

/** Ícone dentro de um círculo pastel, usado em benefícios, compromissos e selos. */
export function IconBubble({
  name,
  tone,
  surface = "tone",
  className,
}: {
  name: IconName;
  tone: Tone;
  /** "tone": fundo pastel do tom; "white": fundo branco (para usar sobre painéis coloridos). */
  surface?: "tone" | "white";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-grid size-10 shrink-0 place-items-center rounded-xl text-deep-blue sm:size-12 sm:rounded-2xl",
        surface === "white" ? "bg-white shadow-soft" : toneClasses[tone].soft,
        className,
      )}
    >
      <Icon name={name} className="size-5 sm:size-6" strokeWidth={1.75} />
    </span>
  );
}
