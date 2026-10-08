"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/analytics";

/** Registra UTMs e gclid da URL de entrada em sessionStorage. Não renderiza nada. */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
