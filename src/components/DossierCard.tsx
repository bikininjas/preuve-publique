import Link from "next/link";

import { CATEGORY_LABELS, CATEGORY_SLUGS, VERDICT_STAMPS, formatLongDate } from "@/lib/labels";
import type { Dossier } from "@/lib/types";
import { documentedSpectra } from "@/lib/types";

/**
 * Fiche de dossier : la brique de lecture du registre (accueil, liste,
 * catégories, recherche). Toute la fiche est cliquable, et le lien mène au
 * dossier — pas seulement son titre.
 */
export default function DossierCard({ dossier }: { dossier: Dossier }) {
  const pillars = documentedSpectra(dossier.sources).length;
  const pieces = dossier.sources.length;
  const piecesWithHash = dossier.sources.filter(
    (source) => source.archive_sha256 !== null,
  ).length;

  return (
    <article className="pp-card">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/categories/${CATEGORY_SLUGS[dossier.category]}`}
          className="pp-chip relative z-10"
          data-category={dossier.category}
        >
          {CATEGORY_LABELS[dossier.category]}
        </Link>
        <span
          className="pp-stamp-in border px-2 py-0.5 font-mono text-[12px] tracking-[0.14em]"
          style={{
            borderColor: "var(--pp-false-bd)",
            color: "var(--pp-false-bd)",
            background: "var(--pp-false-bg)",
            transform: "rotate(-2deg)",
          }}
        >
          {VERDICT_STAMPS[dossier.verdict]}
        </span>
        <span className="pp-meta ml-auto text-muted">{formatLongDate(dossier.published_at)}</span>
      </div>

      <h3 className="pp-card-title">
        <Link href={`/dossiers/${dossier.slug}`}>{dossier.claim_title}</Link>
      </h3>

      <p className="pp-clamp-3 pp-tight text-muted">{dossier.verdict_summary}</p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-gridsoft pt-2">
        <span className="pp-meta text-muted">
          {String(pieces).padStart(2, "0")} pièces · {pillars}/6 piliers
        </span>
        <span className="pp-meta text-muted">
          {piecesWithHash} empreintes
        </span>
        <span className="pp-meta ml-auto text-ink">Consensus {dossier.consensus_score}%</span>
      </div>

      {/* Jauge millimétrée : une graduation tous les 10 points. */}
      <div
        className="relative h-2 border border-gridsoft"
        role="img"
        aria-label={`Score de consensus affiché : ${dossier.consensus_score} sur 100`}
      >
        <span
          className="pp-gauge-fill absolute inset-y-0 left-0 bg-ink"
          style={{ width: `${Math.min(100, Math.max(0, dossier.consensus_score))}%` }}
        />
      </div>
    </article>
  );
}
