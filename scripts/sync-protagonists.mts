/**
 * Reporte le dossier de référence sur la ligne existante : protagonistes et
 * références d'auteur, sans supprimer et recréer la ligne — ce qui emporterait
 * par cascade les fiches d'archive déjà déposées.
 */
import { eq } from "drizzle-orm";

import { closePrivilegedDb, privilegedDb } from "../src/db/index.ts";
import { dossierSources, dossiers } from "../src/db/schema.ts";
import { REFERENCE_DOSSIER } from "../src/db/seed-fallback.ts";
import { log } from "../src/server/middleware/logger.ts";

const db = privilegedDb();

const [ligne] = await db
  .select({ id: dossiers.id })
  .from(dossiers)
  .where(eq(dossiers.slug, REFERENCE_DOSSIER.slug));

if (ligne === undefined) {
  log.error("dossier de référence absent de la base", { slug: REFERENCE_DOSSIER.slug });
  await closePrivilegedDb();
  process.exit(2);
}

await db
  .update(dossiers)
  .set({ protagonists: REFERENCE_DOSSIER.protagonists })
  .where(eq(dossiers.id, ligne.id));

log.info("protagonistes reportes", {
  dossier: REFERENCE_DOSSIER.slug,
  protagonistes: REFERENCE_DOSSIER.protagonists.length,
});

const sources = await db
  .select({ id: dossierSources.id, author: dossierSources.authorOrInstitution })
  .from(dossierSources)
  .where(eq(dossierSources.dossierId, ligne.id));

let posees = 0;
for (const source of sources) {
  const reference = REFERENCE_DOSSIER.sources.find(
    (candidate) => candidate.author_or_institution === source.author,
  );
  const url = reference?.author_reference_url ?? null;
  await db
    .update(dossierSources)
    .set({ authorReferenceUrl: url })
    .where(eq(dossierSources.id, source.id));
  if (url !== null) {
    posees += 1;
  }
  log.info("piece mise a jour", { author: source.author, reference: url ?? "aucune" });
}

log.info("references d'auteur posees", { posees, sources: sources.length });
await closePrivilegedDb();
