/**
 * Applique les dossiers de référence en base, avec la connexion privilégiée.
 *
 * Chaque dossier passe par le validateur de triangulation : la publication est
 * refusée si les règles de preuve ne sont pas réunies. Le script est rejouable
 * (suppression puis insertion par slug).
 */
import { eq } from "drizzle-orm";

import { closePrivilegedDb, privilegedDb } from "../src/db/index.ts";
import { dossierSources, dossiers } from "../src/db/schema.ts";
import { SEED_DOSSIERS } from "../src/db/seed-fallback.ts";
import { log } from "../src/server/middleware/logger.ts";
import { assertPublishableDossier } from "../src/server/validators/dossier.schema.ts";

const db = privilegedDb();

for (const candidate of SEED_DOSSIERS) {
  const dossier = assertPublishableDossier(candidate);
  await db.delete(dossiers).where(eq(dossiers.slug, dossier.slug));

  await db.insert(dossiers).values({
    id: dossier.id,
    slug: dossier.slug,
    claimTitle: dossier.claim_title,
    verdict: dossier.verdict,
    verdictSummary: dossier.verdict_summary,
    category: dossier.category,
    consensusScore: dossier.consensus_score,
    premises: dossier.premises,
    isPublished: dossier.is_published,
    publishedAt: dossier.published_at === null ? null : new Date(dossier.published_at),
  });

  if (dossier.sources.length > 0) {
    await db.insert(dossierSources).values(
      dossier.sources.map((source) => ({
        id: source.id,
        dossierId: dossier.id,
        spectrum: source.spectrum,
        sourceName: source.source_name,
        authorOrInstitution: source.author_or_institution,
        publicationDate: source.publication_date,
        quoteKind: source.quote_kind,
        exactQuote: source.exact_quote,
        contextExplanation: source.context_explanation,
        originalUrl: source.original_url,
        archiveStoragePath: source.archive_storage_path,
        archiveSha256: source.archive_sha256,
        archiveBinarySha256: source.archive_binary_sha256,
        displayOrder: source.display_order,
      })),
    );
  }

  log.info("dossier de reference applique", {
    slug: dossier.slug,
    sources: dossier.sources.length,
    publie: dossier.is_published,
  });
}

await closePrivilegedDb();
log.info("seed applique", { dossiers: SEED_DOSSIERS.length });
