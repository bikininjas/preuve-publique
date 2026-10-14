import { createHash } from "node:crypto";

import {
  SHA256_PATTERN,
  canonicalProofText,
  isValidSha256,
  type ProofPayload,
} from "../../lib/canonical.ts";

/**
 * Intégrité cryptographique des preuves.
 *
 * L'empreinte publiée est **dérivable par n'importe qui** à partir de ce que le
 * site affiche : les quatre champs, normalisés (Unicode NFC, espaces en trop
 * retirés) et joints par des barres verticales, puis hachés en SHA-256.
 *
 *   sha256( source_name | author_or_institution | publication_date | exact_quote )
 *
 * Si une capture binaire (PDF, scan) est archivée, son empreinte est combinée à
 * la précédente : sha256(canonique | binary:<sha256 du fichier>). L'empreinte de
 * la citation reste ainsi l'identité publique de la preuve, et la capture
 * archivée une attestation distincte.
 *
 * La canonicalisation vit dans `src/lib/canonical.ts`, partagée avec la
 * vérification côté navigateur : une seule définition, deux moteurs de hachage.
 */

export { SHA256_PATTERN, canonicalProofText, isValidSha256 };
export type { ProofPayload };

export function sha256Hex(input: string | Uint8Array): string {
  return createHash("sha256").update(input).digest("hex");
}

export function computeCanonicalProofHash(
  payload: ProofPayload,
  binarySha256?: string | null,
): string {
  const canonical = canonicalProofText(payload);
  if (typeof binarySha256 === "string" && binarySha256.length > 0) {
    return sha256Hex(`${canonical}|binary:${binarySha256.toLowerCase()}`);
  }
  return sha256Hex(canonical);
}

export function computeBinaryProofHash(bytes: Uint8Array): string {
  return sha256Hex(bytes);
}

/**
 * Racine d'intégrité d'un dossier : la liste **triée** des empreintes de ses
 * sources est hachée. L'ordre d'affichage n'y change rien ; la moindre
 * modification d'une citation la change.
 */
export function computeIntegrityRoot(hashes: readonly string[]): string {
  const sorted = hashes.map((hash) => hash.toLowerCase()).sort();
  return sha256Hex(sorted.join("|"));
}
