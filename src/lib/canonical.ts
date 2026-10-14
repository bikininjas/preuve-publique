/**
 * Canonicalisation d'une preuve — module **pur**, sans dépendance Node, donc
 * utilisable aussi bien par le serveur que par le navigateur.
 *
 * C'est la seule définition de la chaîne canonique : le serveur la hache avec
 * `node:crypto`, la page d'audit la hache avec `crypto.subtle`. Si les deux
 * divergeaient, l'audit local afficherait un faux désaccord — ce module est donc
 * la pierre angulaire de la vérification côté navigateur.
 */

export type ProofPayload = {
  source_name: string;
  author_or_institution: string;
  publication_date: string | null;
  exact_quote: string;
};

export const SHA256_PATTERN = /^[0-9a-f]{64}$/;

export function isValidSha256(value: unknown): value is string {
  return typeof value === "string" && SHA256_PATTERN.test(value);
}

/** Chaîne canonique : quatre champs, NFC, espaces de bord retirés, séparés par « | ». */
export function canonicalProofText(payload: ProofPayload): string {
  return [
    payload.source_name,
    payload.author_or_institution,
    payload.publication_date ?? "",
    payload.exact_quote,
  ]
    .map((part) => part.normalize("NFC").trim())
    .join("|");
}

export function toHex(bytes: Uint8Array): string {
  let hex = "";
  for (const byte of bytes) {
    hex += byte.toString(16).padStart(2, "0");
  }
  return hex;
}

/**
 * Empreinte calculée par le navigateur du lecteur (`crypto.subtle.digest`).
 * Retourne `null` quand l'API n'est pas disponible (contexte non sécurisé) :
 * l'interface le dit, elle ne prétend pas avoir vérifié.
 */
export async function browserSha256(text: string): Promise<string | null> {
  const subtle = globalThis.crypto?.subtle;
  if (subtle === undefined) {
    return null;
  }
  const digest = await subtle.digest("SHA-256", new TextEncoder().encode(text));
  return toHex(new Uint8Array(digest));
}
