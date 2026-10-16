/**
 * Lecture des résumés de verdict.
 *
 * Le seed écrit chaque résumé d'un seul tenant, les césures de paragraphe y
 * sont marquées par une ligne vide (« \n\n »). Le rendu ne fabrique aucun
 * découpage — un résumé d'un seul bloc reste d'un seul bloc ; le test de
 * contenu exige, lui, au moins deux paragraphes par dossier publié.
 */
export function verdictParagraphs(summary: string): string[] {
  return summary
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

/** Version mono-ligne, pour les balises meta (aucun saut de ligne autorisé). */
export function singleLineSummary(summary: string): string {
  return summary.replace(/\s*\n\s*/g, " ").trim();
}
