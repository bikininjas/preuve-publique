import { CATEGORY_LABELS, VERDICT_STAMPS, VERDICT_TONES } from "@/lib/labels";
import type { VerdictStatus } from "@/lib/types";

/**
 * Tampon du verdict, teinté par son ton : un « vrai » n'est pas tamponné rouge,
 * un « trompeur » ne prend pas la couleur d'un fait. Le tampon est encré (double
 * cadre, manque d'encre) — c'est une pièce d'archive, pas un badge d'interface.
 */
export default function VerdictStamp({
  verdict,
  className = "",
  animate = true,
}: {
  verdict: VerdictStatus;
  className?: string;
  animate?: boolean;
}) {
  const tone = VERDICT_TONES[verdict];
  const toneClass =
    tone === "true"
      ? "text-truebd border-truebd bg-truebg"
      : tone === "warn"
        ? "text-warnbd border-warnbd bg-warnbg"
        : "text-falsebd border-falsebd bg-falsebg";

  return (
    <span
      className={`pp-stamp ${animate ? "pp-stamp-in" : ""} ${toneClass} ${className}`}
      title={`Verdict éditorial : ${VERDICT_STAMPS[verdict]}`}
    >
      {VERDICT_STAMPS[verdict]}
    </span>
  );
}
