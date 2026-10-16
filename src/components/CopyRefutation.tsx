"use client";

import { Check, ClipboardCopy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { VERDICT_STAMPS, formatDate } from "@/lib/labels";
import { documentedSpectra } from "@/lib/types";
import type { Dossier, DossierSource } from "@/lib/types";

const QUOTE_LIMIT = 240;

function shorten(text: string): string {
  const clean = text.trim();
  return clean.length > QUOTE_LIMIT ? `${clean.slice(0, QUOTE_LIMIT - 1)}…` : clean;
}

/**
 * « Copier la réfutation » : un résumé court et sourcé, prêt à coller dans un
 * fil de discussion.
 *
 * Le texte est assemblé à partir des seules données du dossier — au plus une
 * pièce par pilier documenté, dans l'ordre des piliers, pour que la réfutation
 * parte avec des sources de bords différents. Aucun fait n'est ajouté pour la
 * formule, aucune citation n'est reformulée : si un extrait est trop long, il
 * est coupé et la coupe se voit.
 */
export default function CopyRefutation({ dossier }: { dossier: Dossier }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        window.clearTimeout(timer.current);
      }
    };
  }, []);

  const pillars = documentedSpectra(dossier.sources);
  const picked = pillars
    .map((spectrum) => dossier.sources.find((source) => source.spectrum === spectrum))
    .filter((source): source is DossierSource => source !== undefined)
    .slice(0, 3);

  function buildText(origin: string): string {
    const lines = [
      `« ${dossier.claim_title} »`,
      `Verdict : ${VERDICT_STAMPS[dossier.verdict]}`,
      `${dossier.sources.length} pièces recoupées · ${pillars.length}/6 piliers documentés · ${dossier.consensus_score}% de consensus éditorial`,
      "",
      dossier.verdict_summary,
      "",
      "Pièces :",
      ...picked.map((source) => {
        const where = `${source.author_or_institution}${
          source.publication_date === null ? "" : `, ${formatDate(source.publication_date)}`
        }`;
        const body = shorten(source.exact_quote);
        return `- ${source.source_name} (${where}) : ${
          source.quote_kind === "CITATION_EXACTE" ? `« ${body} »` : body
        }`;
      }),
      "",
      `Dossier complet, empreintes SHA-256 vérifiables : ${origin}`,
    ];
    return lines.join("\n");
  }

  /** Repli pour les contextes où l'API presse-papiers n'existe pas. */
  function legacyCopy(text: string): boolean {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    document.body.removeChild(area);
    return ok;
  }

  async function copy() {
    const origin = `${window.location.origin}/dossiers/${dossier.slug}`;
    const text = buildText(origin);
    let ok = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard !== undefined) {
        await navigator.clipboard.writeText(text);
        ok = true;
      } else {
        ok = legacyCopy(text);
      }
    } catch {
      ok = legacyCopy(text);
    }
    setState(ok ? "copied" : "failed");
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
    }
    timer.current = window.setTimeout(() => setState("idle"), 4000);
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={copy}
          className="pp-btn"
          aria-describedby="copie-refutation-etat"
        >
          {state === "copied" ? (
            <Check size={14} aria-hidden="true" />
          ) : (
            <ClipboardCopy size={14} aria-hidden="true" />
          )}
          {state === "copied" ? "Réfutation copiée" : "Copier la réfutation (format débat)"}
        </button>
        <details className="pp-drop">
          <summary className="pp-tap pp-meta text-seal">Voir le texte copié</summary>
          <div className="pp-drop-panel pp-drop-panel--end pp-drop-panel--text w-[min(92vw,30rem)] max-h-[70vh] overflow-y-auto">
            <p className="pp-tight px-2 py-2 text-muted">
              Le même texte, à recopier à la main si le navigateur refuse le
              presse-papiers. Il ne contient que les données du dossier ; le lien y
              est relatif, celui copié porte l&apos;adresse complète.
            </p>
            <pre className="whitespace-pre-wrap break-words border-t border-gridsoft px-2 py-2 font-mono text-[12px] leading-relaxed text-ink">
              {buildText(`/dossiers/${dossier.slug}`)}
            </pre>
          </div>
        </details>
      </div>

      <p
        id="copie-refutation-etat"
        role="status"
        className={`pp-meta ${state === "failed" ? "text-falsebd" : "text-muted"}`}
      >
        {state === "copied"
          ? `Texte copié — ${picked.length} pièce${picked.length > 1 ? "s" : ""} et le lien du dossier`
          : state === "failed"
            ? "Copie refusée par le navigateur : le texte reste lisible ci-dessus (« Voir le texte copié »)."
            : picked.length === 0
              ? "Aucune pièce recoupée à citer : le texte s'arrête au verdict."
              : `Le texte cite ${picked.length} pièce${picked.length > 1 ? "s" : ""} — une par pilier documenté.`}
      </p>
    </div>
  );
}
