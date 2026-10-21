"use client";

import { Check, LoaderCircle, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { buildShareText, headlineInstitutions } from "@/lib/share-text";
import type { Dossier } from "@/lib/types";

/** Durée du retour « Copié ! » avant retour au repos, en millisecondes. */
const CONFIRM_MS = 2000;

type CopyState = "idle" | "working" | "copied" | "refused";

/**
 * « Partager ce débat » : copie en un clic un paragraphe prêt à poster sur X,
 * Facebook ou un forum — verdict en capitales, institutions des pièces les plus
 * officielles et lien canonique du dossier.
 *
 * Le texte vient des seules données du dossier (`share-text.ts`) : aucun fait
 * n'est ajouté pour la formule. Si le navigateur refuse le presse-papiers
 * (permission, contexte non sécurisé), l'état le dit explicitement et le texte
 * reste lisible dans le panneau, à recopier à la main.
 */
export default function ShareDebateButton({ dossier }: { dossier: Dossier }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    /* Le minuteur est annulé au démontage : jamais de setState sur un composant parti. */
    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
    };
  }, []);

  async function copy() {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    setState("working");
    try {
      const text = buildShareText(dossier);
      /* Refus ou absence d'API = échec explicite, jamais une copie silencieusement perdue. */
      if (typeof navigator === "undefined" || typeof navigator.clipboard?.writeText !== "function") {
        setState("refused");
        return;
      }
      await navigator.clipboard.writeText(text);
      setState("copied");
      timer.current = window.setTimeout(() => setState("idle"), CONFIRM_MS);
    } catch {
      setState("refused");
    }
  }

  const institutions = headlineInstitutions(dossier.sources).length;
  const text = buildShareText(dossier);
  const label =
    state === "copied"
      ? "Copié !"
      : state === "working"
        ? "Copie…"
        : "Copier l'argumentaire (réseaux sociaux)";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void copy()}
          disabled={state === "working"}
          className="pp-btn disabled:opacity-60"
          aria-describedby="partage-debat-etat"
        >
          {state === "copied" ? (
            <Check size={14} className="text-true" aria-hidden="true" />
          ) : state === "working" ? (
            <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />
          ) : (
            <Share2 size={14} aria-hidden="true" />
          )}
          {label}
        </button>
        <details className="pp-drop pp-drop--page">
          <summary className="pp-tap pp-meta text-seal">Voir le texte du partage</summary>
          <div className="pp-drop-panel pp-drop-panel--text w-[min(92vw,30rem)] max-h-[70vh] overflow-y-auto">
            <p className="pp-tight px-2 py-2 text-muted">
              Le texte exact copié par le bouton, à recopier à la main si le
              navigateur refuse le presse-papiers.
            </p>
            <pre className="whitespace-pre-wrap break-words border-t border-gridsoft px-2 py-2 font-mono text-[12px] leading-relaxed text-ink">
              {text}
            </pre>
          </div>
        </details>
      </div>

      <p
        id="partage-debat-etat"
        role="status"
        className={`pp-meta ${state === "refused" ? "text-false" : "text-muted"}`}
      >
        {state === "copied"
          ? "Texte copié — verdict, sources et lien, prêt à coller sur X, Facebook ou un forum."
          : state === "working"
            ? "Copie en cours…"
            : state === "refused"
              ? "Presse-papiers refusé ou indisponible (permission, contexte non sécurisé) : recopiez le texte depuis « Voir le texte du partage »."
              : institutions === 0
                ? "Le paragraphe s'arrête au verdict et au lien : aucune pièce de ce dossier ne porte d'institution habilitée à démentir."
                : `Le paragraphe cite le verdict, ${institutions} institution${institutions > 1 ? "s" : ""} (les pièces les plus officielles) et le lien canonique.`}
      </p>
    </div>
  );
}
