import { supabaseAdmin, supabaseEnv } from "../../db/index.ts";
import { computeBinaryProofHash } from "./crypto.service.ts";

/**
 * Captures immuables des sources (bucket public `immutable-archives`).
 *
 * L'écriture exige une clé privilégiée : elle n'est donc possible que hors du
 * conteneur web, depuis un script ou un service d'archivage. Le site, lui, ne
 * fait que lire l'URL publique — et ne présente jamais une capture qui n'existe
 * pas.
 */

export const ARCHIVE_BUCKET = "immutable-archives";

export class ArchiveUnavailableError extends Error {}

function encodePath(path: string): string {
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

/** URL publique de lecture d'une capture, ou null si Supabase n'est pas configuré. */
export function archivePublicUrl(path: string | null): string | null {
  const env = supabaseEnv();
  if (env === null || path === null || path.length === 0) {
    return null;
  }
  return `${env.url}/storage/v1/object/public/${ARCHIVE_BUCKET}/${encodePath(path)}`;
}

export type UploadResult = { path: string; sha256: string; bytes: number };

/**
 * Dépose une capture et retourne son empreinte SHA-256, qui devient
 * `archive_binary_sha256` dans la source. `upsert: false` : un dépôt existant
 * n'est jamais écrasé silencieusement — une capture est immuable.
 */
export async function uploadImmutableArchive(
  path: string,
  bytes: Uint8Array,
  contentType: string,
): Promise<UploadResult> {
  const client = supabaseAdmin();
  if (client === null) {
    throw new ArchiveUnavailableError(
      "Dépôt d'archive impossible : SUPABASE_SERVICE_ROLE_KEY est absente (elle ne doit pas être présente dans le conteneur web).",
    );
  }
  const sha256 = computeBinaryProofHash(bytes);
  const { error } = await client.storage
    .from(ARCHIVE_BUCKET)
    .upload(path, bytes, { contentType, upsert: false });
  if (error !== null) {
    throw new ArchiveUnavailableError(`Dépôt d'archive refusé : ${error.message}`);
  }
  return { path, sha256, bytes: bytes.byteLength };
}

export type ArchiveCheck = {
  available: boolean;
  sha256: string | null;
  matches: boolean | null;
  message: string;
};

/**
 * Relit une capture et compare son empreinte à celle qui est publiée : c'est la
 * seule façon de prouver que le document stocké est bien celui qui a été haché.
 */
export async function verifyStoredArchive(
  path: string | null,
  expectedSha256: string | null,
): Promise<ArchiveCheck> {
  if (path === null || path.length === 0) {
    return {
      available: false,
      sha256: null,
      matches: null,
      message: "aucune capture archivée pour cette source",
    };
  }
  const url = archivePublicUrl(path);
  if (url === null) {
    return {
      available: false,
      sha256: null,
      matches: null,
      message: "Supabase n'est pas configuré : la capture ne peut pas être relue",
    };
  }
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return {
        available: false,
        sha256: null,
        matches: null,
        message: `capture illisible (HTTP ${response.status})`,
      };
    }
    const bytes = new Uint8Array(await response.arrayBuffer());
    const sha256 = computeBinaryProofHash(bytes);
    const matches = expectedSha256 === null ? null : sha256 === expectedSha256.toLowerCase();
    return {
      available: true,
      sha256,
      matches,
      message: matches === false ? "la capture ne correspond pas à l'empreinte publiée" : "capture vérifiée",
    };
  } catch (error) {
    return {
      available: false,
      sha256: null,
      matches: null,
      message: `capture inaccessible : ${error instanceof Error ? error.message : "erreur inconnue"}`,
    };
  }
}
