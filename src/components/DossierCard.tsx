import Link from "next/link";

import PillarStrip from "@/components/PillarStrip";
import VerdictStamp from "@/components/VerdictStamp";
import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  dossierCode,
  formatLongDate,
} from "@/lib/labels";
import type { Dossier } from "@/lib/types";
import { documentedSpectra } from "@/lib/types";

/**
 * Fiche de dossier : la brique de lecture du registre (accueil, liste,
 * catégories). C'est une chemise d'instruction — un onglet porte la cote réelle
 * du dossier et l'état de ses empreintes, le corps porte le verdict, le
 * mini-spectromètre des piliers et la jauge.
 *
 * Toute la fiche est cliquable, et le lien mène au dossier — pas seulement son
 * titre. La cote de l'onglet est dérivée de l'identifiant du dossier : elle
 * n'est jamais écrite à la main.
 */
export default function DossierCard({ dossier }: { dossier: Dossier }) {
  const spectra = documentedSpectra(dossier.sources);
  const pieces = dossier.sources.length;
  const piecesWithHash = dossier.sources.filter(
    (source) => source.archive_sha256 !== null,
  ).length;

  return (
    <article className="pp-folder">
      {/* Onglet de la chemise : cote, catégorie, état des empreintes. */}
      <div className="pp-folder__tab">
        <span
          className={piecesWithHash === pieces ? "pp-led pp-led--on" : "pp-led pp-led--off"}
          title={
            piecesWithHash === pieces
              ? `Chaque pièce porte une empreinte (${pieces}/${pieces})`
              : `${piecesWithHash} pièces sur ${pieces} portent une empreinte`
          }
        />
        <span className="text-ink">{dossierCode(dossier.id)}</span>
        <span aria-hidden="true">·</span>
        <span>{CATEGORY_LABELS[dossier.category]}</span>
        <span aria-hidden="true">·</span>
        <span>
          {piecesWithHash}/{pieces} empreintes
        </span>
      </div>

      <div className="pp-card">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/categories/${CATEGORY_SLUGS[dossier.category]}`}
            className="pp-chip relative z-10"
            data-category={dossier.category}
          >
            {CATEGORY_LABELS[dossier.category]}
          </Link>
          <VerdictStamp verdict={dossier.verdict} />
          <span className="pp-meta ml-auto text-muted">{formatLongDate(dossier.published_at)}</span>
        </div>

        {dossier.illustration_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-28 w-full border border-gridsoft object-cover"
            src={dossier.illustration_url}
            alt=""
            loading="lazy"
          />
        ) : null}

        <h3 className="pp-card-title">
          <Link href={`/dossiers/${dossier.slug}`}>{dossier.claim_title}</Link>
        </h3>

        <p className="pp-clamp-3 pp-tight text-muted">{dossier.verdict_summary}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-gridsoft pt-2">
          <span className="pp-meta text-muted">
            {String(pieces).padStart(2, "0")} pièces · {spectra.length}/6 piliers
          </span>
          <span className="pp-meta text-muted">{piecesWithHash} empreintes</span>
          <span className="pp-meta ml-auto text-ink">Consensus {dossier.consensus_score}%</span>
        </div>

        <PillarStrip spectra={spectra} />

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
      </div>
    </article>
  );
}
