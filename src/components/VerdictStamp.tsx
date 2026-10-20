import { VERDICT_STAMPS, VERDICT_TONES } from "@/lib/labels";
import type { VerdictStatus } from "@/lib/types";

/**
 * Inclinaison stable du tampon, dérivée d'une graine (l'identifiant du
 * dossier) : deux fiches voisines ne sont pas d'aplomb de la même façon, mais
 * une même fiche garde son inclinaison d'un rendu à l'autre.
 */
export function stampTilt(seed: string): "a" | "b" {
  let sum = 0;
  for (const char of seed) {
    sum += char.codePointAt(0) ?? 0;
  }
  return sum % 2 === 0 ? "a" : "b";
}

/**
 * Tampon du verdict, teinté par son ton : un « vrai » n'est pas tamponné rouge,
 * un « trompeur » ne prend pas la couleur d'un fait. Le tampon est encré (double
 * cadre, manque d'encre) — c'est une pièce d'archive, pas un badge d'interface.
 *
 * La teinte vient de jetons (`--pp-stamp-*-ink/line/bg`) et non de classes en
 * dur : sur le papier d'archive le carmin reste sombre, sur la plaque sombre
 * d'une fiche il s'éclaircit au rouge-400 — le composant n'a pas besoin de
 * savoir sur quel fond il est posé.
 *
 * L'inclinaison est déterministe (deux variantes, choisies par une graine) :
 * un tampon n'est jamais d'aplomb, mais il ne tremble pas d'un rendu à l'autre
 * et ne provoque aucun écart d'hydratation.
 */
export default function VerdictStamp({
  verdict,
  className = "",
  animate = true,
  tilt,
}: {
  verdict: VerdictStatus;
  className?: string;
  animate?: boolean;
  tilt?: "a" | "b";
}) {
  const tone = VERDICT_TONES[verdict];
  const label = VERDICT_STAMPS[verdict];
  const resolvedTilt = tilt ?? stampTilt(label);

  return (
    <span
      className={`pp-stamp ${animate ? "pp-stamp-in" : ""} ${className}`}
      data-tone={tone}
      data-tilt={resolvedTilt}
      title={`Verdict éditorial : ${label}`}
    >
      {label}
    </span>
  );
}
