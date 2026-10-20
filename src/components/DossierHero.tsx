import Link from "next/link";

import ConvergenceSegments from "@/components/ConvergenceSegments";
import VerdictStamp from "@/components/VerdictStamp";
import { CaviardFigures } from "@/components/BlindModeSwitch";
import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  SPECTRUM_COLUMN_LABELS,
  SPECTRUM_ORDER,
  dossierCode,
  formatDate,
} from "@/lib/labels";
import { verdictParagraphs } from "@/lib/summary";
import type { Dossier } from "@/lib/types";

/**
 * Cartouche de dossier : registre technique, affirmation, synthèse et bloc
 * d'actions dans la colonne de lecture ; le scellé d'archive dans la marge.
 *
 * La hauteur est dictée par le contenu — aucun `min-h` forcé. La grille 12
 * colonnes répartit 8/4 : la synthèse et ses boutons restent dans le flux de
 * lecture, le scellé (verdict, consensus, tirage, piliers) tient dans une
 * colonne compacte. Toutes les valeurs affichées sont réelles (cote dérivée de
 * l'identifiant, compteurs de pièces et d'empreintes, racine d'intégrité) :
 * aucun numéro de registre inventé.
 */
export default function DossierHero({
  dossier,
  integrityRoot,
  actions,
}: {
  dossier: Dossier;
  integrityRoot: string;
  /** Boutons de partage, rendus sous la synthèse dans le flux de lecture. */
  actions?: React.ReactNode;
}) {
  const withHash = dossier.sources.filter((source) => source.archive_sha256 !== null).length;
  const spectra = SPECTRUM_ORDER.filter((spectrum) =>
    dossier.sources.some((source) => source.spectrum === spectrum),
  );
  const score = Math.min(100, Math.max(0, dossier.consensus_score));
  /* La planche d'illustration vit dans la marge du scellé, sous le verdict :
     elle ne coupe ni le texte de synthèse ni le rang des outils de partage. */
  const illustration = (dossier.illustration_url ?? "").trim();
  const credit = (dossier.illustration_credit ?? "").trim();

  return (
    <section className="h-auto border border-grid bg-surface">
      {/* Métadonnées techniques : les seuls chiffres du cartouche, tous lus
          dans le dossier — cote, pièces, empreintes, piliers, racine, audit. */}
      <div className="flex flex-wrap items-stretch border-b border-gridsoft font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <span className="border-r border-gridsoft px-3 py-2">
          DOSSIER <span className="text-ink">{dossierCode(dossier.id)}</span>
        </span>
        <span className="border-r border-gridsoft px-3 py-2">
          PIÈCES <span className="text-ink">{String(dossier.sources.length).padStart(2, "0")}</span>
        </span>
        <span className="border-r border-gridsoft px-3 py-2">
          EMPREINTES{" "}
          <span className="text-ink">
            {withHash}/{dossier.sources.length}
          </span>
        </span>
        <span className="border-r border-gridsoft px-3 py-2">
          PILIERS <span className="text-ink">{spectra.length}/6</span>
        </span>
        <span className="border-r border-gridsoft px-3 py-2">
          CATÉGORIE{" "}
          <Link
            className="text-ink hover:underline"
            href={`/categories/${CATEGORY_SLUGS[dossier.category]}`}
          >
            {CATEGORY_LABELS[dossier.category]}
          </Link>
        </span>
        <span className="flex-1 border-r border-gridsoft px-3 py-2">
          RACINE{" "}
          <span className="text-ink" title={integrityRoot}>
            {integrityRoot.slice(0, 8).toUpperCase()}…
          </span>
        </span>
        <span className="border-r border-gridsoft px-3 py-2">AUDIT {formatDate(dossier.published_at)}</span>
        <Link className="px-3 py-2 text-ink hover:underline" href="/dossiers">
          REGISTRE →
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 p-4 sm:p-5 lg:grid-cols-12 lg:gap-8">
        {/* Colonne principale (8/12) : affirmation, synthèse, actions. */}
        <div className="min-w-0 lg:col-span-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted">
            Affirmation examinée
          </p>
          <h1 className="mb-4 font-serif text-2xl font-bold leading-[1.12] tracking-tight text-ink md:text-3xl">
            <span className="text-muted">«&nbsp;</span>
            {dossier.claim_title}
            <span className="text-muted">&nbsp;»</span>
          </h1>

          <div className="mb-4 space-y-3 text-base leading-relaxed text-muted md:text-lg">
            {verdictParagraphs(dossier.verdict_summary).map((paragraph, index) => (
              <p key={index}>
                <CaviardFigures text={paragraph} />
              </p>
            ))}
          </div>

          {/* Zone d'action intégrée : les deux copies tombent à la fin de la
              lecture de la synthèse, sans changer d'écran ni défiler. */}
          {actions ? <div className="pp-dossier-actions">{actions}</div> : null}
        </div>

        {/* Colonne forensique (4/12) : dossier de scellé unifié. */}
        <aside
          className="pp-folder__plate min-w-0 space-y-4 border p-4 lg:col-span-4"
          aria-label="Dossier de scellé"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="pp-sealed__label font-mono uppercase text-muted">
                Verdict
              </p>
              <div className="mt-2">
                <VerdictStamp verdict={dossier.verdict} animate={false} />
              </div>
            </div>
            <div
              className="shrink-0 text-right"
              title="Score éditorial — la couverture documentaire, elle, se compte pièce par pièce"
            >
              <p className="pp-sealed__label font-mono uppercase text-muted">
                Consensus
              </p>
              <p className="pp-sealed__score font-mono font-medium tabular-nums text-ink">
                {score}%
              </p>
              <ConvergenceSegments score={score} segments={12} className="mt-2 w-24" />
            </div>
          </div>

          <p className="pp-sealed__note font-mono uppercase text-muted">
            Score éditorial — la couverture documentaire se compte pièce par pièce
          </p>

          {/* Tirage d'archive : planche cadrée, cartel du crédit réel. */}
          {illustration !== "" ? (
            <figure className="pp-negative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="pp-negative__image aspect-[4/3] max-h-64 w-full object-cover"
                src={illustration}
                alt=""
                loading="eager"
                decoding="async"
              />
              <figcaption className="pp-cartel" title={credit === "" ? dossierCode(dossier.id) : credit}>
                {credit === "" ? dossierCode(dossier.id) : credit}
              </figcaption>
            </figure>
          ) : null}

          {/* Répartition des piliers : une puce par pilier, allumée seulement
              quand le dossier le couvre. Un pilier sans pièce reste éteint —
              il n'est ni estimé ni comblé. */}
          <div>
            <p className="pp-sealed__label font-mono uppercase text-muted">
              Piliers documentés · {spectra.length}/6
            </p>
            <ul className="pp-pillars pp-pillars--list mt-2">
              {SPECTRUM_ORDER.map((spectrum) => {
                const documented = spectra.includes(spectrum);
                return (
                  <li
                    key={spectrum}
                    className="pp-sealed__pillar flex items-center gap-2 font-mono uppercase text-muted"
                    data-documented={documented ? "true" : "false"}
                    title={`${SPECTRUM_COLUMN_LABELS[spectrum]} — ${
                      documented ? "documenté" : "aucune pièce recensée"
                    }`}
                  >
                    <span
                      className={documented ? "pp-led pp-led--on" : "pp-led pp-led--off"}
                      data-spectrum={spectrum}
                      aria-hidden="true"
                    />
                    {SPECTRUM_COLUMN_LABELS[spectrum]}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Registre des scellés : les compteurs du dossier, en chiffres
              tabulaires — la couverture documentaire se compte, elle. */}
          <dl className="pp-plate__seals">
            <div className="pp-seal-cell">
              <dt className="pp-seal-cell__key">Pièces</dt>
              <dd className="pp-seal-cell__value">
                {String(dossier.sources.length).padStart(2, "0")}
              </dd>
            </div>
            <div className="pp-seal-cell">
              <dt className="pp-seal-cell__key">Empreintes</dt>
              <dd className="pp-seal-cell__value">
                {withHash}/{dossier.sources.length}
              </dd>
            </div>
            <div className="pp-seal-cell">
              <dt className="pp-seal-cell__key">Piliers</dt>
              <dd className="pp-seal-cell__value">{spectra.length}/6</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
