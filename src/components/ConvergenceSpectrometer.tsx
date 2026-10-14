import { Caviard } from "@/components/BlindModeSwitch";
import {
  SPECTRUM_CODES,
  SPECTRUM_COLUMN_LABELS,
  SPECTRUM_ORDER,
  SPECTRUM_SHORT_LABELS,
} from "@/lib/labels";
import { documentedSpectra } from "@/lib/types";
import type { Dossier, PoliticalSpectrum } from "@/lib/types";

/**
 * Spectromètre : six colonnes reliées au verdict central par un tracé SVG. Le
 * tracé dit exactement ce que les données disent — chaque colonne documentée
 * tire une ligne vers le verdict ; une colonne vide n'en tire aucune. Rien n'est
 * dessiné pour « faire joli ».
 */
export default function ConvergenceSpectrometer({ dossier }: { dossier: Dossier }) {
  const counts = new Map<PoliticalSpectrum, number>();
  for (const spectrum of SPECTRUM_ORDER) {
    counts.set(spectrum, 0);
  }
  for (const source of dossier.sources) {
    counts.set(source.spectrum, (counts.get(source.spectrum) ?? 0) + 1);
  }
  const covered = documentedSpectra(dossier.sources);
  const total = dossier.sources.length;
  const columns = SPECTRUM_ORDER.map((spectrum, index) => ({
    spectrum,
    count: counts.get(spectrum) ?? 0,
    x: 500 + ((index - 2.5) * 740) / 6,
  }));

  return (
    <section aria-labelledby="spectrometre" className="border border-grid bg-surface">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-grid px-4 py-3">
        <h2
          id="spectrometre"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
        >
          Spectromètre de triangulation
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {covered.length}/6 piliers documentés · {total} pièces recoupées
        </p>
      </div>

      <div className="px-4 pt-4">
        <svg
          viewBox="0 0 1000 120"
          role="img"
          aria-label={`Convergence de ${covered.length} piliers documentés vers le verdict`}
          className="h-24 w-full"
        >
          <line x1="500" y1="0" x2="500" y2="104" stroke="var(--pp-grid-soft)" strokeWidth="1" />
          {columns.map((column) =>
            column.count > 0 ? (
              <path
                key={column.spectrum}
                d={`M ${column.x} 0 L 500 104`}
                stroke="var(--pp-grid)"
                strokeWidth="1"
                fill="none"
              />
            ) : (
              <path
                key={column.spectrum}
                d={`M ${column.x} 0 L ${column.x} 16`}
                stroke="var(--pp-grid-soft)"
                strokeWidth="1"
                strokeDasharray="3 4"
                fill="none"
              />
            ),
          )}
          <rect x="484" y="104" width="32" height="12" fill="var(--pp-ink)" />
          <text
            x="500"
            y="114"
            textAnchor="middle"
            fill="var(--pp-canvas)"
            fontSize="9"
            fontFamily="var(--font-jetbrains-mono), monospace"
          >
            FAIT
          </text>
        </svg>
      </div>

      <div className="grid grid-cols-2 border-t border-grid lg:grid-cols-6">
        {columns.map((column) => (
          <a
            key={column.spectrum}
            href={`#pieces-${column.spectrum}`}
            className="group flex flex-col justify-between gap-3 border-b border-r border-gridsoft px-3 py-4 no-underline transition hover:bg-surface2 lg:border-b-0"
            title={SPECTRUM_SHORT_LABELS[column.spectrum]}
          >
            <span className="flex items-center gap-2">
              <span
                className={column.count > 0 ? "pp-led pp-led--on" : "pp-led pp-led--off"}
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
                {SPECTRUM_CODES[column.spectrum]}
              </span>
            </span>
            <span className="font-mono text-[11px] leading-tight tracking-[0.08em] text-ink">
              <Caviard label="[PILIER MASQUÉ]">{SPECTRUM_COLUMN_LABELS[column.spectrum]}</Caviard>
            </span>
            <span className="flex items-baseline gap-2">
              <span className="font-mono text-2xl leading-none text-ink">
                {String(column.count).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                {column.count === 0 ? "aucune pièce" : column.count > 1 ? "pièces" : "pièce"}
              </span>
            </span>
          </a>
        ))}
      </div>

      <div className="border-t border-grid px-4 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Jauge de consensus (score éditorial)
          </p>
          <p className="font-mono text-sm text-ink">{dossier.consensus_score}%</p>
        </div>
        <div className="mt-3 flex items-end gap-[2px]" aria-hidden="true">
          {Array.from({ length: 40 }, (_, index) => {
            const threshold = (index + 1) * 2.5;
            const active = dossier.consensus_score >= threshold;
            return (
              <span
                key={threshold}
                className={active ? "h-6 w-full bg-ink" : "h-3 w-full bg-gridsoft"}
              />
            );
          })}
        </div>
        <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-muted">
          Le score est fixé par la rédaction lors de la constitution du dossier.
          Ce qui se compte, et se vérifie source par source, c&apos;est la
          couverture ci-dessus.
        </p>
      </div>
    </section>
  );
}
