import { supabaseServer } from "../../../db/index.ts";
import { log } from "../../../server/middleware/logger.ts";

/**
 * Sonde Cloud Run.
 *
 * Toujours 200 tant que le runtime répond : une sonde de démarrage qui échoue
 * parce que Supabase hoquette ferait redémarrer des instances saines. Le
 * diagnostic, lui, est complet (`database.reachable`, latence) et `?strict=1`
 * retourne 503 quand la base est configurée mais injoignable, pour un
 * surveillance externe.
 */

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const strict = new URL(request.url).searchParams.get("strict") === "1";
  const client = supabaseServer();

  const database: {
    configured: boolean;
    reachable: boolean;
    latencyMs: number | null;
    error?: string;
  } = { configured: client !== null, reachable: true, latencyMs: null };

  if (client !== null) {
    const started = Date.now();
    const { error } = await client
      .from("dossiers")
      .select("slug", { count: "exact", head: true })
      .eq("is_published", true);
    database.latencyMs = Date.now() - started;
    if (error !== null) {
      database.reachable = false;
      database.error = error.message;
      log.warn("healthcheck : base injoignable", { error: error.message });
    }
  }

  const healthy = database.reachable;
  const body = {
    status: healthy ? "healthy" : "degraded",
    region: process.env.K_SERVICE ? "cloud-run" : "local",
    revision: process.env.K_REVISION ?? null,
    uptimeSeconds: Math.round(process.uptime()),
    runtime: { node: process.version },
    database,
    timestamp: new Date().toISOString(),
  };

  return Response.json(body, {
    status: healthy || !strict ? 200 : 503,
    headers: { "Cache-Control": "no-store" },
  });
}
