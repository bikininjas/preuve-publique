import {
  PREMISE_DISTORTION_LEVELS,
  PREMISE_STAMP_LABELS,
  PREMISE_STATUS_TONES,
} from "@/lib/labels";
import type { Premise } from "@/lib/types";

const TONE_TEXT: Record<"true" | "warn" | "false", string> = {
  true: "text-true border-truebd bg-truebg",
  warn: "text-warnbd border-warnbd bg-warnbg",
  false: "text-falsebd border-falsebd bg-falsebg",
};

/**
 * Radiographie du sophisme : l'affirmation découpée en segments, chacun avec son
 * tampon et sa jauge de distorsion. La jauge est une **échelle de statut**
 * (0, 40, 60, 100) : elle traduit le statut éditorial, elle ne prétend pas
 * mesurer quoi que ce soit — c'est écrit sous la frise.
 */
export default function FallacyAnatomy({ premises }: { premises: Premise[] }) {
  if (premises.length === 0) {
    return (
      <p className="border border-grid bg-surface p-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        Aucune brique d&apos;affirmation documentée pour ce dossier.
      </p>
    );
  }

  return (
    <section aria-labelledby="radiographie" className="border border-grid bg-surface">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-grid px-4 py-3">
        <h2
          id="radiographie"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
        >
          Radiographie du sophisme
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
          {premises.length} segments analysés
        </p>
      </div>

      <ol>
        {premises.map((premise, index) => {
          const tone = PREMISE_STATUS_TONES[premise.status];
          const level = PREMISE_DISTORTION_LEVELS[premise.status];
          return (
            <li key={premise.claim_part} className="border-b border-gridsoft last:border-b-0">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)]">
                <div className="border-gridsoft px-4 py-5 sm:px-6 lg:border-r">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    SEGMENT {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 font-serif text-xl leading-snug text-ink italic">
                    {premise.claim_part}
                  </p>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
                    {premise.detail}
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-3 bg-surface2 px-4 py-5 sm:px-6">
                  <span className={`pp-stamp w-fit ${TONE_TEXT[tone]}`}>
                    {PREMISE_STAMP_LABELS[premise.status]}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      Distorsion {level}%
                    </p>
                    <div className="mt-2 flex items-end gap-[2px]" aria-hidden="true">
                      {Array.from({ length: 10 }, (_, tick) => {
                        const active = level >= (tick + 1) * 10;
                        return (
                          <span
                            key={tick}
                            className={
                              active
                                ? `h-5 w-full ${
                                    tone === "false"
                                      ? "bg-false"
                                      : tone === "warn"
                                        ? "bg-warn"
                                        : "bg-true"
                                  }`
                                : "h-2 w-full bg-gridsoft"
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="border-t border-grid px-4 py-3 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-muted">
        Échelle de distorsion : 0 (fait exact), 40 (vrai détourné), 60 (confusion
        conceptuelle), 100 (contredit par les pièces). Elle traduit le statut
        éditorial de chaque segment, elle ne le calcule pas.
      </p>
    </section>
  );
}
