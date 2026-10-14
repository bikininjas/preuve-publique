import { NextResponse } from "next/server";
import { z } from "zod";

import { log } from "../../../../server/middleware/logger.ts";
import { computeIntegrityRoot } from "../../../../server/services/crypto.service.ts";
import { getPublishedDossier } from "../../../../server/services/dossier.service.ts";

/**
 * Dossier public en JSON, avec les en-têtes qui protègent des pics viraux :
 * cache de bord agressif et racine d'intégrité (`X-Proof-Integrity-Root`),
 * pour qu'un lecteur puisse vérifier d'un `curl` que la page n'a pas changé.
 */

export const dynamic = "force-dynamic";

const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  if (!slugSchema.safeParse(slug).success) {
    return NextResponse.json(
      { error: "slug invalide" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const result = await getPublishedDossier(slug);
  if (!result.ok) {
    log.error("api dossiers : lecture impossible", { slug, error: result.message });
    return NextResponse.json(
      { error: "lecture impossible", detail: result.message },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  if (result.value === null) {
    return NextResponse.json(
      { error: "dossier introuvable" },
      { status: 404, headers: { "Cache-Control": "public, max-age=60" } },
    );
  }

  const dossier = result.value;
  const hashes = dossier.sources
    .map((source) => source.archive_sha256)
    .filter((hash): hash is string => hash !== null);
  const root = computeIntegrityRoot(hashes);
  const etag = `"${root}"`;

  const cacheHeaders: Record<string, string> = {
    "Cache-Control": "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400",
    "X-Proof-Integrity-Root": root,
    ETag: etag,
  };

  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: cacheHeaders });
  }

  return NextResponse.json(
    {
      dossier,
      integrity: {
        algorithm: "sha256(empreintes de sources triées, jointes par '|')",
        root,
        sources: dossier.sources.map((source) => ({
          id: source.id,
          sha256: source.archive_sha256,
          binary_sha256: source.archive_binary_sha256,
        })),
      },
      origin: result.origin,
    },
    { headers: cacheHeaders },
  );
}
