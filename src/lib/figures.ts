import { documentedSpectra } from "./types.ts";
import type { Dossier } from "./types.ts";

/**
 * Chiffres du registre, comptés sur les dossiers passés en argument. Tous sont
 * des comptages : rien n'est estimé, rien n'est extrapolé. Une valeur qui ne se
 * compte pas (le verdict, le résumé) ne figure pas ici.
 *
 * `averageConsensus` est la moyenne arithmétique des scores éditoriaux. Elle se
 * calcule, mais elle ne mesure pas la vérité : c'est un indicateur éditorial, et
 * l'interface doit le dire — le score lui-même est fixé par la rédaction,
 * dossier par dossier.
 */
export type RegistryFigures = {
  dossiers: number;
  pieces: number;
  /** Pièces portant une empreinte SHA-256 vérifiable. */
  fingerprints: number;
  /** Somme des piliers documentés de chaque dossier. */
  pillars: number;
  averageConsensus: number | null;
};

export function registryFigures(dossiers: Dossier[]): RegistryFigures {
  const pieces = dossiers.reduce((total, dossier) => total + dossier.sources.length, 0);
  const fingerprints = dossiers.reduce(
    (total, dossier) =>
      total + dossier.sources.filter((source) => source.archive_sha256 !== null).length,
    0,
  );
  const pillars = dossiers.reduce(
    (total, dossier) => total + documentedSpectra(dossier.sources).length,
    0,
  );
  const scored = dossiers.filter((dossier) => Number.isFinite(dossier.consensus_score));
  const averageConsensus =
    scored.length === 0
      ? null
      : scored.reduce((total, dossier) => total + dossier.consensus_score, 0) / scored.length;

  return { dossiers: dossiers.length, pieces, fingerprints, pillars, averageConsensus };
}

/** Moyenne affichée au dixième, en français — ou un tiret s'il n'y a rien à moyenner. */
export function formatAverageConsensus(value: number | null): string {
  if (value === null) {
    return "—";
  }
  return `${value.toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} %`;
}
