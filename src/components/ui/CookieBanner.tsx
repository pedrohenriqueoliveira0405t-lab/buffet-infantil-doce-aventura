"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  OPEN_PREFERENCES_EVENT,
  openCookiePreferences,
  readConsent,
  saveConsent,
  subscribeConsent,
  type ConsentChoice,
} from "@/lib/consent";
import { buttonClasses } from "./button-styles";

const SHOW_AFTER_MS = 6000;

interface CookieBannerProps {
  title: string;
  text: string;
  policyLabel: string;
  acceptLabel: string;
  rejectLabel: string;
}

/**
 * Banner de cookies (LGPD) com Aceitar / Recusar de mesmo peso visual.
 * A escolha atualiza o Google Consent Mode v2 e pode ser revista pelo rodapé.
 */
export function CookieBanner({ title, text, policyLabel, acceptLabel, rejectLabel }: CookieBannerProps) {
  // No servidor o banner não é renderizado; no navegador, aparece só se ainda não houver escolha.
  const consent = useSyncExternalStore(
    subscribeConsent,
    () => readConsent() ?? "unset",
    () => "server",
  );
  const [reopened, setReopened] = useState(false);
  // O banner só aparece após a primeira rolagem (ou alguns segundos), para não cobrir
  // a headline e o CTA da primeira dobra. Até a escolha, o Consent Mode fica "negado".
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, open);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open);
  }, []);

  useEffect(() => {
    if (armed) return;
    const arm = () => setArmed(true);
    const onScroll = () => {
      if (window.scrollY > 120) arm();
    };
    const timer = window.setTimeout(arm, SHOW_AFTER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [armed]);

  const pending = consent === "unset" && armed;
  if (!pending && !reopened) return null;

  const choose = (choice: ConsentChoice) => {
    saveConsent(choice);
    setReopened(false);
  };

  return (
    <section
      aria-label={title}
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-[60] mx-auto max-w-md rounded-3xl bg-white p-4 shadow-lift ring-1 ring-graphite/10 sm:bottom-6 sm:p-6 lg:inset-x-6 lg:flex lg:max-w-4xl lg:items-center lg:gap-8 lg:py-5 lg:pr-5 lg:pl-7"
    >
      <div className="lg:flex-1">
        <p className="font-display text-lg font-semibold text-deep-blue">{title}</p>
        <p className="mt-1 text-base leading-snug text-graphite/85 sm:mt-1.5 sm:text-sm sm:leading-relaxed">
          {text}{" "}
          <Link href="/politica-de-privacidade" className="font-semibold text-deep-blue underline underline-offset-2">
            {policyLabel}
          </Link>
          .
        </p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 lg:mt-0 lg:w-64 lg:shrink-0">
        <button type="button" onClick={() => choose("denied")} className={buttonClasses("secondary", "sm")}>
          {rejectLabel}
        </button>
        <button type="button" onClick={() => choose("granted")} className={buttonClasses("primary", "sm")}>
          {acceptLabel}
        </button>
      </div>
    </section>
  );
}

export function CookiePreferencesButton({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className={className}
    >
      {label}
    </button>
  );
}
