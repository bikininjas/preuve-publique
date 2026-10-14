import { NextResponse } from "next/server";
import { z } from "zod";

import { log } from "../../../server/middleware/logger.ts";
import {
  checkRateLimit,
  clientIp,
  rateLimitHeaders,
} from "../../../server/middleware/rate-limit.ts";
import { sha256Hex } from "../../../server/services/crypto.service.ts";
import { searchPublishedDossiers } from "../../../server/services/dossier.service.ts";

/**
 * Recherche publique : RPC `search_dossiers_hybrid` (plein texte française +
 * fusion de rangs avec la similarité vectorielle), avec validation stricte du
 * paramètre et limitation de débit par adresse IP.
 *
 * L'IP n'est jamais journalisée en clair : seule une empreinte tronquée sert au
 * diagnostic et au comptage.
 */

export const dynamic = "force-dynamic";

const querySchema = z.object({
  q: z
    .string()
    .trim()
    .min(2, "la recherche demande au moins 2 caractères")
    .max(120, "la recherche est limitée à 120 caractères"),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ip = clientIp(request.headers);
  const limit = checkRateLimit(`search:${ip}`, { limit: 30, windowMs: 60_000 });
  const limitedHeaders = rateLimitHeaders(limit);

  if (!limit.allowed) {
    log.warn("recherche limitée", { ip_hash: sha256Hex(ip).slice(0, 16) });
    return NextResponse.json(
      { error: "trop de requêtes", retry_after_seconds: limit.retryAfterSeconds },
      { status: 429, headers: { ...limitedHeaders, "Cache-Control": "no-store" } },
    );
  }

  const parsed = querySchema.safeParse({ q: url.searchParams.get("q") ?? "" });
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "paramètre q invalide",
        detail: parsed.error.issues.map((issue) => issue.message).join(" ; "),
      },
      { status: 400, headers: { ...limitedHeaders, "Cache-Control": "no-store" } },
    );
  }

  const results = await searchPublishedDossiers(parsed.data.q);
  if (!results.ok) {
    log.error("api recherche : lecture impossible", { error: results.message });
    return NextResponse.json(
      { error: "recherche impossible", detail: results.message },
      { status: 503, headers: { ...limitedHeaders, "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    {
      query: parsed.data.q,
      origin: results.origin,
      count: results.value.length,
      results: results.value.map((dossier) => ({
        slug: dossier.slug,
        claim_title: dossier.claim_title,
        verdict: dossier.verdict,
        verdict_summary: dossier.verdict_summary,
        consensus_score: dossier.consensus_score,
        sources: dossier.sources.length,
        spectra: [...new Set(dossier.sources.map((source) => source.spectrum))],
      })),
    },
    {
      headers: {
        ...limitedHeaders,
        "Cache-Control": "public, max-age=30, s-maxage=300, stale-while-revalidate=600",
      },
    },
  );
}
