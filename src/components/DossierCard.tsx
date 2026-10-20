import Link from "next/link";

import ConvergenceSegments from "@/components/ConvergenceSegments";
import PillarStrip from "@/components/PillarStrip";
import VerdictStamp, { stampTilt } from "@/components/VerdictStamp";
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
 * catégories). C'est une chemise d'instruction — un onglet de papier porte la
 * cote réelle du dossier et l'état de ses empreintes, la plaque sombre porte le
 * verdict, le mini-spectromètre des piliers et le registre des scellés.
 *
 * La plaque est une surface de table lumineuse (voir `.pp-folder__plate`) : le
 * survol allume son filet au laiton et fait monter une lueur interne. Toute la
 * fiche est cliquable, et le lien mène au dossier — pas seulement son titre. La
 * cote de l'onglet est dérivée de l'identifiant du dossier : elle n'est jamais
 * écrite à la main.
 */
export default function DossierCard({ dossier }: { dossier: Dossier }) {
  const spectra = documentedSpectra(dossier.sources);
  const pieces = dossier.sources.length;
  const piecesWithHash = dossier.sources.filter(
    (source) => source.archive_sha256 !== null,
  ).length;
  const score = Math.min(100, Math.max(0, dossier.consensus_score));
  /* Cartel de la vignette : le crédit réel du document, ou à défaut la cote
     du dossier — jamais une référence inventée. */
  const credit = (dossier.illustration_credit ?? "").trim();

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

      <div className="pp-card pp-folder__plate">
        <div className="pp-folder__layout">
          <div className="pp-folder__main">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/categories/${CATEGORY_SLUGS[dossier.category]}`}
                className="pp-chip relative z-10"
                data-category={dossier.category}
              >
                {CATEGORY_LABELS[dossier.category]}
              </Link>
              <VerdictStamp verdict={dossier.verdict} tilt={stampTilt(dossier.id)} />
              <span className="pp-meta ml-auto text-muted">{formatLongDate(dossier.published_at)}</span>
            </div>

            <h3 className="pp-card-title">
              <Link href={`/dossiers/${dossier.slug}`}>{dossier.claim_title}</Link>
            </h3>

            <p className="pp-clamp-3 pp-tight text-muted">{dossier.verdict_summary}</p>

            {/* Registre des scellés : chaque chiffre est une lecture réelle de la
                fiche. Les pièces et les empreintes se comptent ; l'indice de
                convergence, lui, est éditorial — le titre de la cellule le dit. */}
            <dl className="pp-plate__seals">
              <div className="pp-seal-cell">
                <dt className="pp-seal-cell__key">Pièces</dt>
                <dd className="pp-seal-cell__value">{String(pieces).padStart(2, "0")}</dd>
              </div>
              <div className="pp-seal-cell">
                <dt className="pp-seal-cell__key">Piliers</dt>
                <dd className="pp-seal-cell__value">{spectra.length}/6</dd>
              </div>
              <div className="pp-seal-cell">
                <dt className="pp-seal-cell__key">Empreintes</dt>
                <dd className="pp-seal-cell__value">
                  {piecesWithHash}/{pieces}
                </dd>
              </div>
              <div
                className="pp-seal-cell"
                title="Indice de convergence affiché — score éditorial, la couverture documentaire se compte"
              >
                <dt className="pp-seal-cell__key">Convergence</dt>
                <dd className="pp-seal-cell__value">{score}%</dd>
              </div>
            </dl>

            {/* Les six pôles en pastilles, puis la piste d'audit segmentée : un
                bloc allumé vaut cinq points, le chiffre exact est au-dessus. */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <PillarStrip spectra={spectra} />
              <ConvergenceSegments score={score} className="min-w-[84px] flex-1" />
            </div>
          </div>

          {/* Encadré d'archive : vignette verticale 3:4 dans la marge droite,
              avec son micro-cartel. Le cadrage est fixe, plus de bandeau
              horizontal qui coupe le sujet. */}
          {dossier.illustration_url ? (
            <figure className="pp-folder__visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="pp-thumb"
                src={dossier.illustration_url}
                alt=""
                loading="lazy"
              />
              <figcaption
                className="pp-cartel-mini"
                title={credit === "" ? dossierCode(dossier.id) : credit}
              >
                {credit === "" ? dossierCode(dossier.id) : credit}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </div>
    </article>
  );
}
