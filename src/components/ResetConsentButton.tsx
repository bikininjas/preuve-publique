"use client";

import { ANALYTICS_CONSENT_KEY } from "@/lib/analytics";

/** Retrait du consentement : efface le choix puis recharge la page. */
export default function ResetConsentButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.localStorage.removeItem(ANALYTICS_CONSENT_KEY);
        window.location.reload();
      }}
      className="mt-1 inline-flex border border-grid px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition hover:border-ink"
    >
      Modifier mon choix
    </button>
  );
}
