import { NextResponse } from "next/server";

import { supabaseServer } from "@/db/index.ts";
import { SHA256_PATTERN } from "@/server/services/crypto.service.ts";
import { log } from "@/server/middleware/logger.ts";

export const dynamic = "force-dynamic";

/**
 * Fiche d'archive publique, servie **octet pour octet** telle qu'elle a été
 * déposée : c'est ce qui permet à quiconque de recalculer son SHA-256 et de
 * retrouver l'empreinte annoncée. Une fiche ne change jamais, donc la réponse
 * peut être mise en cache indéfiniment.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sha256: string }> },
) {
  const { sha256 } = await params;
  if (!SHA256_PATTERN.test(sha256)) {
    return NextResponse.json(
      { error: "empreinte attendue : 64 caractères hexadécimaux minuscules" },
      { status: 400 },
    );
  }

  const client = supabaseServer();
  if (client === null) {
    return NextResponse.json(
      { error: "Supabase n'est pas configuré : la fiche ne peut pas être relue ici." },
      { status: 503 },
    );
  }

  const { data, error } = await client
    .from("dossier_source_archives")
    .select("sha256, content, bytes, captured_at, capture_kind")
    .eq("sha256", sha256)
    .maybeSingle();

  if (error !== null) {
    log.error("lecture de fiche d'archive en echec", { sha256, error: error.message });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (data === null) {
    return NextResponse.json(
      { error: "aucune fiche d'archive pour cette empreinte" },
      { status: 404 },
    );
  }

  return new NextResponse(data.content as string, {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=31536000, immutable",
      "x-archive-sha256": data.sha256 as string,
      "x-archive-bytes": String(data.bytes),
      "x-archive-capture": data.capture_kind as string,
      "x-content-type-options": "nosniff",
    },
  });
}
