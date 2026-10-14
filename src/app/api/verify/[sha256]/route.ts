import { NextResponse } from "next/server";
import { z } from "zod";

import { log } from "../../../../server/middleware/logger.ts";
import { archivePublicUrl } from "../../../../server/services/archive.service.ts";
import { canonicalProofText } from "../../../../server/services/crypto.service.ts";
import { listPublishedDossiers } from "../../../../server/services/dossier.service.ts";

/**
 * Audit public d'une preuve par son empreinte.
 *
 * N'importe qui peut prendre l'empreinte affichée sur un dossier, la soumettre
 * ici, et recevoir les métadonnées exactes qui ont servi au calcul — de quoi
 * refaire le hachage soi-même et constater qu'il retombe sur la valeur soumise.
 * La lecture passe par la voie publique (RLS) : une empreinte appartenant à un
 * brouillon ne ressort pas, elle répond 404 comme une empreinte inconnue.
 */

export const dynamic = "force-dynamic";

const hashSchema = z.string().regex(/^[0-9a-fA-F]{64}$/, "empreinte SHA-256 attendue");

export async function GET(
  _request: Request,
  context: { params: Promise<{ sha256: string }> },
) {
  const { sha256 } = await context.params;
  const parsed = hashSchema.safeParse(sha256);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "empreinte invalide", detail: "64 caractères hexadécimaux attendus" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
  const hash = parsed.data.toLowerCase();

  const all = await listPublishedDossiers();
  if (!all.ok) {
    log.error("api verify : lecture impossible", { error: all.message });
    return NextResponse.json(
      { error: "lecture impossible", detail: all.message },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  for (const dossier of all.value) {
    for (const source of dossier.sources) {
      const matchesCitation = source.archive_sha256 === hash;
      const matchesCapture = source.archive_binary_sha256 === hash;
      if (!matchesCitation && !matchesCapture) {
        continue;
      }
      const canonical = canonicalProofText(source);
      return NextResponse.json(
        {
          hash,
          matched_on: matchesCitation ? "citation" : "capture",
          verified: true,
          source: {
            id: source.id,
            spectrum: source.spectrum,
            quote_kind: source.quote_kind,
            source_name: source.source_name,
            author_or_institution: source.author_or_institution,
            publication_date: source.publication_date,
            exact_quote: source.exact_quote,
            canonical_text: canonical,
            sha256: source.archive_sha256,
            binary_sha256: source.archive_binary_sha256,
            original_url: source.original_url,
          },
          dossier: {
            slug: dossier.slug,
            claim_title: dossier.claim_title,
            verdict: dossier.verdict,
            published_at: dossier.published_at,
          },
          archive: {
            path: source.archive_storage_path,
            public_url: archivePublicUrl(source.archive_storage_path),
          },
          note:
            "Reconstituer canonical_text puis le hacher en SHA-256 (UTF-8) doit redonner l'empreinte soumise.",
        },
        {
          headers: {
            "Cache-Control": "public, max-age=300, s-maxage=3600",
            "X-Proof-Integrity-Root-Check": "ok",
          },
        },
      );
    }
  }

  return NextResponse.json(
    { hash, verified: false, error: "aucune preuve publiée ne porte cette empreinte" },
    { status: 404, headers: { "Cache-Control": "public, max-age=300" } },
  );
}
