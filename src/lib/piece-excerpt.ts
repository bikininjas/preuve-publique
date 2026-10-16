/**
 * Traitement d'un extrait de pièce — carte de source et table lumineuse
 * partagent ces règles, pour qu'un extrait ne soit jamais présenté de deux
 * façons différentes selon l'endroit.
 *
 * Le papier d'archive (`pp-extrait`) marque tous les extraits officiels. Le
 * trait de surligneur n'est posé que sur une citation exacte : un fait
 * documenté est un résumé de la pièce, pas son verbatim — il ne reçoit jamais
 * `pp-surlignage` (règle éditoriale du site, testée).
 */

import type { QuoteKind } from "./types.ts";

/** Trait de surligneur : réservé au verbatim. */
export const VERBATIM_MARKER = "pp-surlignage";

/** Vrai seulement pour une citation mot pour mot. */
export function isVerbatim(kind: QuoteKind): boolean {
  return kind === "CITATION_EXACTE";
}

/** Classes du bloc d'extrait, selon la nature de la pièce. */
export function excerptClasses(kind: QuoteKind): string {
  return isVerbatim(kind) ? "pp-extrait pp-extrait--citation" : "pp-extrait pp-extrait--fait";
}

/**
 * Texte affiché : une citation exacte s'entoure de guillemets français, un fait
 * documenté se lit tel quel (aucun guillemet qui laisserait croire au verbatim).
 */
export function excerptText(kind: QuoteKind, quote: string): string {
  return isVerbatim(kind) ? `« ${quote} »` : quote;
}
