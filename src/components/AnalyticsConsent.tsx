"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ANALYTICS_CONSENT_KEY,
  parseConsent,
  type AnalyticsConsent,
} from "@/lib/analytics";

type GtagWindow = Window & { dataLayer?: unknown[] };

/**
 * Met à jour le Consent Mode de la balise Google déjà chargée dans le <head>.
 * On ne recharge pas gtag.js : une seule balise par page, et le consentement
 * par défaut reste « denied » tant que la personne n'a pas accepté.
 */
function pushConsent(value: AnalyticsConsent) {
  const target = window as GtagWindow;
  target.dataLayer = target.dataLayer || [];
  target.dataLayer.push(["consent", "update", { analytics_storage: value }]);
}

/**
 * Mesure d'audience GA4 conditionnée au consentement. La balise Google est
 * présente dans le <head> (détectable par Google), mais en Consent Mode
 * « denied » : aucun cookie d'analyse n'est déposé avant l'accord. Accepter
 * met le consentement à jour ; refuser le laisse refusé. Le choix est mémorisé
 * dans le stockage local.
 */
export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = parseConsent(window.localStorage.getItem(ANALYTICS_CONSENT_KEY));
    setConsent(stored);
    setHydrated(true);
    if (stored !== null) {
      pushConsent(stored);
    }
  }, []);

  const choose = (value: AnalyticsConsent) => {
    pushConsent(value);
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {hydrated && consent === null ? (
        <aside
          aria-label="Mesure d'audience"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-grid bg-surface"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-relaxed text-muted">
              Aucun cookie n&apos;est déposé sans votre accord. Accepter active la mesure
              d&apos;audience Google Analytics (pages vues, appareil, provenance) pour
              savoir quels dossiers sont lus et améliorer le site.
              <Link
                href="/mentions-legales"
                className="ml-1 underline decoration-grid underline-offset-2 hover:text-ink"
              >
                En savoir plus
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="border border-grid px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition hover:border-ink"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="border border-ink bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-surface transition hover:opacity-80"
              >
                Accepter
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}
