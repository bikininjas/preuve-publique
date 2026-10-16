/**
 * Tirage au sort d'un dossier : logique pure, générateur injectable (testé).
 *
 * `null` quand le catalogue est vide — l'appelant n'affiche alors aucun bouton.
 * Le résultat est borné même si le générateur renvoie 1 (hors `[0, 1[`).
 */
export function pickRandomDossierSlug(
  slugs: readonly string[],
  random: () => number = Math.random,
): string | null {
  if (slugs.length === 0) {
    return null;
  }
  const index = Math.min(Math.max(Math.floor(random() * slugs.length), 0), slugs.length - 1);
  return slugs[index] ?? null;
}
