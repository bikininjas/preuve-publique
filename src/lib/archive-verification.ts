/**
 * Vérification locale d'une pièce : ce que le lecteur peut réellement
 * refaire dans son navigateur, et sur quoi.
 *
 * Deux choses se vérifient, dans cet ordre :
 *   1. les **octets de la capture** quand elle est déposée au miroir
 *      `immutable-archives` (`/api/archives/<empreinte binaire>`) — on rehache
 *      le fichier servi et on compare à l'empreinte publiée ;
 *   2. sinon la **citation canonique** — on rehache la chaîne canonique des
 *      quatre champs publiés et on compare à l'empreinte de citation.
 * Sans empreinte enregistrée, il n'y a rien à vérifier : le module le dit
 * (`kind: "none"`) au lieu de proposer une vérification qui ne vérifierait
 * rien.
 *
 * Module pur (aucune dépendance Node) : il tourne dans le navigateur du
 * lecteur comme dans les tests.
 */

import { canonicalProofText, toHex } from "./canonical.ts";
import type { DossierSource } from "./types.ts";

export type VerificationTarget =
  | { kind: "capture"; sha256: string; url: string }
  | { kind: "citation"; sha256: string; canonical: string }
  | { kind: "none" };

export type VerifyOutcome =
  | { status: "verified"; kind: "capture" | "citation" }
  | { status: "divergent"; kind: "capture" | "citation"; computed: string }
  | { status: "unavailable"; reason: string }
  | { status: "absent" };

/** Ce qu'une pièce permet de vérifier — capture d'abord, citation sinon. */
export function verificationTarget(source: DossierSource): VerificationTarget {
  if (source.archive_binary_sha256 !== null && source.archive_binary_sha256 !== "") {
    return {
      kind: "capture",
      sha256: source.archive_binary_sha256,
      url: `/api/archives/${source.archive_binary_sha256}`,
    };
  }
  if (source.archive_sha256 !== null && source.archive_sha256 !== "") {
    return {
      kind: "citation",
      sha256: source.archive_sha256,
      canonical: canonicalProofText(source),
    };
  }
  return { kind: "none" };
}

/** Empreinte abrégée, à la façon d'un numéro de scellé : a3f8b9…2e1c. */
export function truncateHash(hash: string): string {
  return hash.length <= 13 ? hash : `${hash.slice(0, 6)}…${hash.slice(-4)}`;
}

/**
 * Une image du brouillage du terminal : les caractères oscillent entre l'aléa
 * hexadécimal et la valeur réelle, et se fixent de gauche à droite. La dernière
 * image est toujours l'empreinte réelle — le brouillage est une **transition**,
 * jamais une donnée affichée (le site n'affiche pas d'hexadécimal de décor).
 */
export function scrambleFrame(
  target: string,
  settled: number,
  random: () => number = Math.random,
): string {
  const HEX = "0123456789abcdef";
  return [...target]
    .map((char, index) => {
      if (index < settled || !/[0-9a-f]/.test(char)) {
        return char;
      }
      return HEX[Math.min(15, Math.floor(random() * 16))];
    })
    .join("");
}

/** Empreinte SHA-256 d'octets, calculée par WebCrypto — `null` sans WebCrypto. */
export async function browserSha256Bytes(bytes: ArrayBuffer): Promise<string | null> {
  const subtle = globalThis.crypto?.subtle;
  if (subtle === undefined) {
    return null;
  }
  const digest = await subtle.digest("SHA-256", bytes);
  return toHex(new Uint8Array(digest));
}

/** Téléchargement des octets d'une capture ; `null` si le serveur ne les sert pas. */
export type BytesFetcher = (url: string) => Promise<ArrayBuffer | null>;

async function defaultFetchBytes(url: string): Promise<ArrayBuffer | null> {
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  return response.arrayBuffer();
}

/**
 * Vérifie une pièce et rend un état explicite. Aucun chemin ne « fait semblant » :
 * un calcul impossible ou un téléchargement refusé sort en `unavailable` avec la
 * raison, une empreinte qui ne se recalcule pas sort en `divergent`.
 */
export async function verifyPiece(
  source: DossierSource,
  fetchBytes: BytesFetcher = defaultFetchBytes,
): Promise<VerifyOutcome> {
  const target = verificationTarget(source);

  if (target.kind === "none") {
    return { status: "absent" };
  }

  if (target.kind === "capture") {
    let bytes: ArrayBuffer | null;
    try {
      bytes = await fetchBytes(target.url);
    } catch (error) {
      return { status: "unavailable", reason: `capture illisible (${String(error)})` };
    }
    if (bytes === null) {
      return { status: "unavailable", reason: "capture indisponible au téléchargement" };
    }
    const computed = await browserSha256Bytes(bytes);
    if (computed === null) {
      return { status: "unavailable", reason: "WebCrypto indisponible dans ce navigateur" };
    }
    return computed === target.sha256
      ? { status: "verified", kind: "capture" }
      : { status: "divergent", kind: "capture", computed };
  }

  const computed = await browserSha256Bytes(new TextEncoder().encode(target.canonical).buffer as ArrayBuffer);
  if (computed === null) {
    return { status: "unavailable", reason: "WebCrypto indisponible dans ce navigateur" };
  }
  return computed === target.sha256
    ? { status: "verified", kind: "citation" }
    : { status: "divergent", kind: "citation", computed };
}
