"use client";

import { useState } from "react";

import { Caviard } from "@/components/BlindModeSwitch";
import {
  SPECTRUM_CODES,
  SPECTRUM_COLUMN_LABELS,
  SPECTRUM_ORDER,
  SPECTRUM_SHORT_LABELS,
  formatDate,
  pieceCode,
} from "@/lib/labels";
import { documentedSpectra } from "@/lib/types";
import type { Dossier, DossierSource, PoliticalSpectrum } from "@/lib/types";

/**
 * Spectromètre : six piliers reliés au verdict central par un faisceau SVG. Le
 * tracé dit exactement ce que les données disent — chaque pilier documenté tire
 * une ligne vers le verdict ; un pilier vide n'en tire aucune. Rien n'est
 * dessiné pour « faire joli ».
 *
 * Le survol (ou le focus clavier) d'un pilier allume son faisceau et déplie ses
 * pièces : c'est le même contenu que la liste, atteint par le faisceau. Les noms
 * et les institutions restent caviardés au besoin — le mode preuve à l'aveugle
 * vaut ici comme partout.
 */
export default function ConvergenceSpectrometer({ dossier }: { dossier: Dossier }) {
  const [active, setActive] = useState<PoliticalSpectrum | null>(null);

  const counts = new Map<PoliticalSpectrum, number>();
  const firstOf = new Map<PoliticalSpectrum, DossierSource[]>();
  for (const spectrum of SPECTRUM_ORDER) {
    counts.set(spectrum, 0);
    firstOf.set(spectrum, []);
  }
  for (const source of dossier.sources) {
    counts.set(source.spectrum, (counts.get(source.spectrum) ?? 0) + 1);
    firstOf.get(source.spectrum)?.push(source);
  }

  const covered = documentedSpectra(dossier.sources);
  const total = dossier.sources.length;
  /* Les six foyers sont au centre des six colonnes du schéma (1000 / 6) :
     chaque faisceau part vraiment au-dessus de son pilier, pas d'un paquet
     resserré au milieu du cadre. */
  const columns = SPECTRUM_ORDER.map((spectrum, index) => ({
    spectrum,
    count: counts.get(spectrum) ?? 0,
    sources: (firstOf.get(spectrum) ?? []).slice(0, 3),
    x: ((index + 0.5) * 1000) / SPECTRUM_ORDER.length,
  }));
  const activeColumn = columns.find((column) => column.spectrum === active) ?? null;

  return (
    <section aria-labelledby="spectrometre" className="border border-grid bg-surface">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-grid px-4 py-3">
        <h2
          id="spectrometre"
          className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink"
        >
          Spectromètre de triangulation
        </h2>
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          {covered.length}/6 piliers documentés · {total} pièces recoupées
        </p>
      </div>

      <div className="px-4 pt-4">
        <svg
          viewBox="0 0 1000 120"
          role="img"
          aria-label={`Convergence de ${covered.length} piliers documentés vers le verdict`}
          className="block h-auto w-full"
          shapeRendering="geometricPrecision"
        >
          <defs>
            {columns.map((column) => (
              <g key={`grad-${column.spectrum}`}>
                {/* Le faisceau au repos : l'opacité monte vers le verdict. */}
                <linearGradient
                  id={`pp-beam-base-${column.spectrum}`}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="104"
                >
                  <stop offset="0" stopColor="var(--pp-stone)" stopOpacity="0.05" />
                  <stop offset="0.6" stopColor="var(--pp-stone)" stopOpacity="0.4" />
                  <stop offset="1" stopColor="var(--pp-stone)" stopOpacity="0.85" />
                </linearGradient>
                {/* Le faisceau allumé : le laiton de la table lumineuse. */}
                <linearGradient
                  id={`pp-beam-live-${column.spectrum}`}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="104"
                >
                  <stop offset="0" stopColor="var(--pp-seal)" stopOpacity="0" />
                  <stop offset="0.45" stopColor="var(--pp-seal)" stopOpacity="0.35" />
                  <stop offset="1" stopColor="var(--pp-seal)" stopOpacity="1" />
                </linearGradient>
              </g>
            ))}
          </defs>

          <line
            x1="500"
            y1="0"
            x2="500"
            y2="104"
            stroke="var(--pp-grid-soft)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {columns.map((column) => {
            const isActive = active === column.spectrum;
            const dimmed = active !== null && !isActive;
            if (column.count === 0) {
              return (
                <path
                  key={column.spectrum}
                  className="pp-beam"
                  d={`M ${column.x} 0 L ${column.x} 16`}
                  stroke="var(--pp-grid-soft)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  strokeLinecap="round"
                  fill="none"
                  opacity={dimmed ? 0.2 : 0.7}
                  vectorEffect="non-scaling-stroke"
                />
              );
            }
            return (
              <g key={column.spectrum}>
                <path
                  className="pp-beam"
                  d={`M ${column.x} 0 L 500 104`}
                  stroke={`url(#pp-beam-base-${column.spectrum})`}
                  strokeWidth="1"
                  strokeLinecap="round"
                  fill="none"
                  opacity={isActive ? 0.15 : dimmed ? 0.22 : 1}
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  className="pp-beam"
                  d={`M ${column.x} 0 L 500 104`}
                  stroke={`url(#pp-beam-live-${column.spectrum})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  opacity={isActive ? 1 : 0}
                  vectorEffect="non-scaling-stroke"
                  aria-hidden="true"
                />
              </g>
            );
          })}

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

      {/* 2 colonnes sur téléphone, 3 sur écran moyen, 6 seulement quand la
          largeur permet à chaque libellé de tenir sans se chevaucher. */}
      <div className="pp-spec-grid grid grid-cols-2 border-t border-grid sm:grid-cols-3 2xl:grid-cols-6">
        {columns.map((column) => {
          const isActive = active === column.spectrum;
          return (
            <a
              key={column.spectrum}
              href={`#pieces-${column.spectrum}`}
              onMouseEnter={() => setActive(column.spectrum)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(column.spectrum)}
              onBlur={() => setActive(null)}
              aria-current={isActive ? "true" : undefined}
              className="pp-spec-cell group flex flex-col justify-between gap-3 px-3 py-4 no-underline"
              title={SPECTRUM_SHORT_LABELS[column.spectrum]}
            >
              <span className="flex items-center gap-2">
                <span
                  className={column.count > 0 ? "pp-led pp-led--on" : "pp-led pp-led--off"}
                  aria-hidden="true"
                />
                <span className="font-mono text-[12px] tracking-[0.12em] text-muted">
                  {SPECTRUM_CODES[column.spectrum]}
                </span>
              </span>
              <span className="pp-spec-label font-mono text-[13px] leading-tight tracking-[0.08em] text-ink">
                <Caviard label="[PILIER MASQUÉ]">{SPECTRUM_COLUMN_LABELS[column.spectrum]}</Caviard>
              </span>
              <span className="flex items-baseline gap-2">
                <span className="font-mono text-2xl leading-none text-ink">
                  {String(column.count).padStart(2, "0")}
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
                  {column.count === 0 ? "aucune pièce" : column.count > 1 ? "pièces" : "pièce"}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      {/* Ce que le faisceau allumé traverse : les pièces du pilier. */}
      <div className="pp-spec-panel" aria-live="polite">
        {activeColumn === null ? (
          <p className="pp-spec-kicker">
            Survolez un pilier (ou atteignez-le au clavier) : son faisceau s&apos;allume et ses
            pièces s&apos;affichent — le bouton ouvre la pièce dans la liste.
          </p>
        ) : (
          <div className="space-y-2">
            <p className="pp-spec-kicker">
              Faisceau {SPECTRUM_CODES[activeColumn.spectrum]} ·{" "}
              {SPECTRUM_COLUMN_LABELS[activeColumn.spectrum]} ·{" "}
              {activeColumn.count === 0
                ? "aucune pièce recoupée"
                : `${activeColumn.count} pièce${activeColumn.count > 1 ? "s" : ""}`}
            </p>
            {activeColumn.count === 0 ? (
              <p className="pp-tight text-muted">
                Ce pilier reste éteint : aucune pièce ne le documente. Le site ne le comble pas
                par une approximation.
              </p>
            ) : (
              <ul className="space-y-2">
                {activeColumn.sources.map((source) => (
                  <li
                    key={source.id}
                    className="border-l-2 border-gridsoft pl-3 font-mono text-[12px] leading-relaxed"
                  >
                    <span className="text-seal">{pieceCode(source.display_order)}</span>{" "}
                    <Caviard>{source.source_name}</Caviard>{" "}
                    <span className="text-muted">
                      · <Caviard label="[INSTITUTION MASQUÉE]">{source.author_or_institution}</Caviard> ·{" "}
                      {formatDate(source.publication_date)}
                    </span>
                    <p className="mt-1 font-serif text-[15px] text-ink">
                      {source.quote_kind === "CITATION_EXACTE"
                        ? `« ${source.exact_quote} »`
                        : source.exact_quote}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {activeColumn.count > activeColumn.sources.length ? (
              <p className="pp-spec-kicker">
                et {activeColumn.count - activeColumn.sources.length} autre
                {activeColumn.count - activeColumn.sources.length > 1 ? "s" : ""} pièce
                {activeColumn.count - activeColumn.sources.length > 1 ? "s" : ""} dans la liste
              </p>
            ) : null}
          </div>
        )}
      </div>

      <div className="pp-spec-panel">
        <div className="pp-spec-head">
          <p className="pp-spec-kicker">Jauge de consensus (score éditorial)</p>
          <p className="pp-spec-score">{dossier.consensus_score}%</p>
        </div>
        <div className="mt-3 flex items-end gap-[2px]" aria-hidden="true">
          {Array.from({ length: 40 }, (_, index) => {
            const threshold = (index + 1) * 2.5;
            const activeTick = dossier.consensus_score >= threshold;
            return (
              <span
                key={threshold}
                className={activeTick ? "h-6 w-full bg-ink" : "h-3 w-full bg-gridsoft"}
              />
            );
          })}
        </div>
        <p className="mt-3 font-mono text-[12px] leading-relaxed tracking-[0.06em] text-muted">
          Le score est fixé par la rédaction lors de la constitution du dossier.
          Ce qui se compte, et se vérifie source par source, c&apos;est la
          couverture ci-dessus.
        </p>
      </div>
    </section>
  );
}
