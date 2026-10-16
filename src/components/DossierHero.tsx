import {
  SPECTRUM_COLUMN_LABELS,
  VERDICT_STAMPS,
  VERDICT_TONES,
  dossierCode,
  formatDate,
} from "@/lib/labels";
import { CaviardFigures } from "@/components/BlindModeSwitch";
import { verdictParagraphs } from "@/lib/summary";
import type { Dossier } from "@/lib/types";

/**
 * Cartouche de dossier : registre technique, affirmation géante, tampon de
 * verdict. Toutes les valeurs affichées sont réelles (identifiant du dossier,
 * nombre de pièces, racine d'intégrité) : aucun numéro de registre inventé.
 */
export default function DossierHero({
  dossier,
  integrityRoot,
}: {
  dossier: Dossier;
  integrityRoot: string;
}) {
  const tone = VERDICT_TONES[dossier.verdict];
  const withHash = dossier.sources.filter((source) => source.archive_sha256 !== null).length;
  const spectra = new Set(dossier.sources.map((source) => source.spectrum));
  const toneText =
    tone === "true" ? "text-true" : tone === "warn" ? "text-warn" : "text-false";

  return (
    <section className="border border-grid bg-surface">
      <div className="flex flex-wrap items-stretch border-b border-grid font-mono text-[12px] uppercase tracking-[0.16em] text-muted sm:text-[13px]">
        <span className="border-r border-gridsoft px-3 py-2">
          DOSSIER <span className="text-ink">{dossierCode(dossier.id)}</span>
        </span>
        <span className="border-r border-gridsoft px-3 py-2">
          PIÈCES <span className="text-ink">{String(dossier.sources.length).padStart(2, "0")}</span>
        </span>
        <span className="border-r border-gridsoft px-3 py-2">
          EMPREINTES <span className="text-ink">{withHash}/{dossier.sources.length}</span>
        </span>
        <span className="border-r border-gridsoft px-3 py-2">
          PILIERS <span className="text-ink">{spectra.size}/6</span>
        </span>
        <span className="flex-1 px-3 py-2">
          RACINE{" "}
          <span className="text-ink" title={integrityRoot}>
            {integrityRoot.slice(0, 12).toUpperCase()}…
          </span>
        </span>
        <span className="px-3 py-2">AUDIT {formatDate(dossier.published_at)}</span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_minmax(260px,320px)]">
        <div className="border-gridsoft px-5 py-8 sm:px-8 lg:border-r">
          <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-muted">
            Affirmation examinée
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
            <span className="text-muted">«&nbsp;</span>
            <em className="not-italic">{dossier.claim_title}</em>
            <span className="text-muted">&nbsp;»</span>
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 font-sans text-base leading-relaxed text-muted">
            {verdictParagraphs(dossier.verdict_summary).map((paragraph, index) => (
              <p key={index}>
                <CaviardFigures text={paragraph} />
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 bg-surface2 px-5 py-8 sm:px-8">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-muted">
              Verdict
            </p>
            <div className={`pp-stamp mt-3 ${toneText}`}>{VERDICT_STAMPS[dossier.verdict]}</div>
          </div>
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-muted">
              Consensus documentaire
            </p>
            <p className="mt-2 font-mono text-4xl font-medium tracking-tight text-ink">
              {String(dossier.consensus_score).padStart(3, "0")}%
            </p>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
              Score éditorial — la couverture, elle, se compte
            </p>
          </div>
          <ul className="space-y-1 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
            {[...spectra].slice(0, 6).map((spectrum) => (
              <li key={spectrum} className="flex items-center gap-2">
                <span className="pp-led pp-led--on" aria-hidden="true" />
                {SPECTRUM_COLUMN_LABELS[spectrum]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
