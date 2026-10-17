/**
 * Normalisation des URL avant la requête HTTP d'archivage (`--fetch`).
 *
 * Cas réel : le dossier de presse Urssaf
 * `https://www.urssaf.org/files/Espace+media/Dossier+de+presse/...`
 * — le « + » y est **littéral**. Certains serveurs le lisent comme une espace
 * (réflexe des formulaires) et répondent 404 ; d'autres l'exigent tel quel.
 * On ne peut donc pas trancher à l'aveugle :
 *
 *   1. `toFetchUrl` valide l'URL (http/https, absolue) et la rend telle quelle,
 *      « + » compris — aucune réécriture silencieuse ;
 *   2. `plusEncodedVariant` fournit la variante `%2B` du chemin, à essayer en
 *      second si la première requête répond 404.
 */

export class InvalidFetchUrlError extends Error {}

/** Valide une URL de pièce et la rend prête pour `fetch`, sans altérer le « + ». */
export function toFetchUrl(raw: string): string {
  const trimmed = raw.trim();
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new InvalidFetchUrlError(`URL illisible : ${trimmed}`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new InvalidFetchUrlError(`protocole refusé : ${parsed.protocol}`);
  }
  return parsed.href;
}

/**
 * Variante du chemin où chaque « + » littéral devient `%2B`, ou `null` s'il n'y
 * en a pas. La chaîne de requête et le fragment ne sont pas touchés.
 */
export function plusEncodedVariant(url: string): string | null {
  const parsed = new URL(url);
  if (!parsed.pathname.includes("+")) {
    return null;
  }
  parsed.pathname = parsed.pathname
    .split("/")
    .map((segment) => segment.replace(/\+/g, "%2B"))
    .join("/");
  return parsed.href;
}
