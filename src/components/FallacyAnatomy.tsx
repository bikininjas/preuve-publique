import {
  PREMISE_DISTORTION_LEVELS,
  PREMISE_STAMP_LABELS,
  PREMISE_STATUS_TONES,
} from "@/lib/labels";
import { CaviardFigures } from "@/components/BlindModeSwitch";
import type { Premise } from "@/lib/types";

const TONE_TEXT: Record<"true" | "warn" | "false", string> = {
  true: "text-true border-truebd bg-truebg",
  warn: "text-warnink border-warnbd bg-warnbg",
  false: "text-falseink border-falsebd bg-falsebg",
};

/**
 * Table de dissection du sophisme : chaque segment de l'affirmation est
 * présenté sur deux colonnes reliées par le diagnostic.
 *
 * À gauche, l'affirmation virale — la brique telle qu'elle circule, soulignée
 * au pointillé rouge. Au centre, le connecteur fléché de diagnostic. À droite,
 * la réalité matérielle : le détail des pièces et le niveau de l'échelle de
 * statut.
 *
 * Le niveau (0, 40, 60, 100) traduit le statut éditorial, il ne le mesure pas —
 * c'est écrit sous la frise, et cette mention ne doit pas disparaître.
 */
export default function FallacyAnatomy({ premises }: { premises: Premise[] }) {
  if (premises.length === 0) {
    return (
      <p className="border border-grid bg-surface p-4 font-mono text-[13px] uppercase tracking-[0.12em] text-muted">
        Aucune brique d&apos;affirmation documentée pour ce dossier.
      </p>
    );
  }

  return (
    <section aria-labelledby="radiographie" className="border border-grid bg-surface">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-grid px-4 py-3">
        <h2
          id="radiographie"
          className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink"
        >
          Radiographie du sophisme
        </h2>
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          {premises.length} segments analysés
        </p>
      </div>

      <ol>
        {premises.map((premise, index) => {
          const tone = PREMISE_STATUS_TONES[premise.status];
          const level = PREMISE_DISTORTION_LEVELS[premise.status];
          return (
            <li key={premise.claim_part} className="border-b border-gridsoft last:border-b-0">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(150px,190px)_minmax(0,1.05fr)]">
                {/* Colonne gauche : l'illusion rhétorique. */}
                <div className="pp-dissect__claim px-4 py-5 sm:px-6">
                  <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
                    SEGMENT {String(index + 1).padStart(2, "0")} — l&apos;affirmation virale
                  </p>
                  <p className="mt-3 font-serif text-xl leading-snug text-ink italic">
                    <span className="pp-sophism">
                      <CaviardFigures text={premise.claim_part} />
                    </span>
                  </p>
                </div>

                {/* Connecteur : le diagnostic technique, sur le trait de jonction. */}
                <div className="pp-dissect__connector lg:border-x lg:border-gridsoft">
                  <span className={`pp-stamp pp-stamp--flat w-fit text-[12px] ${TONE_TEXT[tone]}`}>
                    {PREMISE_STAMP_LABELS[premise.status]}
                  </span>
                </div>

                {/* Colonne droite : ce que disent les pièces. */}
                <div className="pp-dissect__fact px-4 py-5 sm:px-6">
                  <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
                    La réalité matérielle
                  </p>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink">
                    <CaviardFigures text={premise.detail} />
                  </p>

                  <div className="mt-5 flex flex-wrap items-end gap-x-5 gap-y-3">
                    <div>
                      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                        Niveau de distorsion
                      </p>
                      <p className="text-4xl leading-none font-medium tracking-tight text-ink">
                        {String(level).padStart(3, "0")}
                      </p>
                    </div>
                    <div className="flex items-end gap-[2px]" aria-hidden="true">
                      {Array.from({ length: 10 }, (_, tick) => {
                        const active = level >= (tick + 1) * 10;
                        return (
                          <span
                            key={tick}
                            className={
                              active
                                ? `h-6 w-3 ${
                                    tone === "false"
                                      ? "bg-false"
                                      : tone === "warn"
                                        ? "bg-warn"
                                        : "bg-true"
                                  }`
                                : "h-2 w-3 bg-gridsoft"
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

      <p className="border-t border-grid px-4 py-3 font-mono text-[12px] leading-relaxed tracking-[0.06em] text-muted">
        Échelle de distorsion : 0 (fait exact), 40 (vrai détourné), 60 (confusion
        conceptuelle), 100 (contredit par les pièces). Elle traduit le statut
        éditorial de chaque segment, elle ne le calcule pas.
      </p>
    </section>
  );
}
