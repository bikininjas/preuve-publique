/**
 * Applique les dossiers de référence en base, avec la connexion privilégiée.
 *
 * Chaque dossier passe par le validateur de triangulation : la publication est
 * refusée si les règles de preuve ne sont pas réunies.
 *
 * Depuis le 17/10/2026, l'application est un **UPSERT** : le dossier est mis à
 * jour par son slug et les pièces sont rapprochées par identifiant, URL ou
 * empreinte — plus de `DELETE` du dossier, donc plus de cascade qui vidait
 * `dossier_source_archives` à chaque mise à jour. Les fiches d'archive des
 * pièces conservées survivent à l'application ; seules les pièces réellement
 * retirées du seed disparaissent (et emportent alors leurs propres fiches).
 *
 * Une pièce dont le contenu publié change est détachée de sa capture
 * (`archive_binary_sha256` remis à null) : la fiche reste en base, mais une
 * nouvelle capture est nécessaire pour recoller la preuve au texte affiché.
 *
 *   node scripts/apply-seed.mts                     # tous les dossiers du seed
 *   node scripts/apply-seed.mts --slug=<slug>       # un seul dossier (upsert ciblé)
 */
import { and, eq, inArray } from "drizzle-orm";

import { closePrivilegedDb, privilegedDb } from "../src/db/index.ts";
import { dossierSources, dossiers } from "../src/db/schema.ts";
import { SEED_DOSSIERS } from "../src/db/seed-fallback.ts";
import type { DossierSource } from "../src/lib/types.ts";
import { computeCanonicalProofHash } from "../src/server/services/crypto.service.ts";
import { log } from "../src/server/middleware/logger.ts";
import { assertPublishableDossier } from "../src/server/validators/dossier.schema.ts";

const db = privilegedDb();
const slugFilter = process.argv
  .find((argument) => argument.startsWith("--slug="))
  ?.slice("--slug=".length);

const targets =
  slugFilter === undefined
    ? SEED_DOSSIERS
    : SEED_DOSSIERS.filter((candidate) => candidate.slug === slugFilter);

if (slugFilter !== undefined && targets.length === 0) {
  log.error("slug absent du seed", { slug: slugFilter });
  process.exitCode = 2;
}

type ExistingSource = typeof dossierSources.$inferSelect;

/** Champs de contenu : identiques en base et dans le seed, à la casse près. */
function contentOfExisting(row: ExistingSource) {
  return {
    spectrum: row.spectrum,
    sourceName: row.sourceName,
    authorOrInstitution: row.authorOrInstitution,
    publicationDate: row.publicationDate,
    quoteKind: row.quoteKind,
    exactQuote: row.exactQuote,
    contextExplanation: row.contextExplanation,
    originalUrl: row.originalUrl,
    authorReferenceUrl: row.authorReferenceUrl,
    displayOrder: row.displayOrder,
  };
}

function contentOfSeed(source: DossierSource) {
  return {
    spectrum: source.spectrum,
    sourceName: source.source_name,
    authorOrInstitution: source.author_or_institution,
    publicationDate: source.publication_date,
    quoteKind: source.quote_kind,
    exactQuote: source.exact_quote,
    contextExplanation: source.context_explanation,
    originalUrl: source.original_url,
    authorReferenceUrl: source.author_reference_url,
    displayOrder: source.display_order,
  };
}

/**
 * Empreinte de citation dérivée des quatre champs canoniques — identique à celle
 * que recalcule le lecteur depuis la page. Le trigger de triangulation (0015)
 * refuse de publier une pièce sans cette empreinte : une pièce neuve doit donc
 * la recevoir à l'insertion, et une pièce modifiée à la mise à jour.
 */
function citationProofHash(source: DossierSource): string {
  return computeCanonicalProofHash({
    source_name: source.source_name,
    author_or_institution: source.author_or_institution,
    publication_date: source.publication_date,
    exact_quote: source.exact_quote,
  });
}

function sameContent(row: ExistingSource, source: DossierSource): boolean {
  const left = contentOfExisting(row);
  const right = contentOfSeed(source);
  return (Object.keys(right) as Array<keyof typeof right>).every(
    (key) => left[key] === right[key],
  );
}

/**
 * Les quatre champs de la chaîne canonique (`canonicalProofText`). L'URL n'en
 * fait pas partie : une pièce dont seule l'adresse change garde son empreinte
 * de citation — condition explicite pour ne pas réécrire `archive_sha256`.
 */
function canonicalKeyOfExisting(row: ExistingSource): string {
  return JSON.stringify([
    row.sourceName,
    row.authorOrInstitution,
    row.publicationDate,
    row.exactQuote,
  ]);
}

function canonicalKeyOfSeed(source: DossierSource): string {
  return JSON.stringify([
    source.source_name,
    source.author_or_institution,
    source.publication_date,
    source.exact_quote,
  ]);
}

let insertedSources = 0;
let updatedSources = 0;
let removedSources = 0;

for (const candidate of targets) {
  const dossier = assertPublishableDossier(candidate);

  const counts = await db.transaction(async (tx) => {
    // 1. Le dossier est écrit en brouillon : la règle « publié ⇒ preuves
    //    présentes » ne peut passer qu'une fois les pièces synchronisées.
    const publishedAt =
      dossier.published_at === null ? null : new Date(dossier.published_at);
    const [row] = await tx
      .insert(dossiers)
      .values({
        id: dossier.id,
        slug: dossier.slug,
        claimTitle: dossier.claim_title,
        verdict: dossier.verdict,
        verdictSummary: dossier.verdict_summary,
        category: dossier.category,
        protagonists: dossier.protagonists,
        consensusScore: dossier.consensus_score,
        premises: dossier.premises,
        timeline: dossier.timeline ?? [],
        isPublished: false,
        publishedAt,
        illustrationUrl: dossier.illustration_url ?? null,
        illustrationCredit: dossier.illustration_credit ?? null,
      })
      .onConflictDoUpdate({
        target: dossiers.slug,
        set: {
          claimTitle: dossier.claim_title,
          verdict: dossier.verdict,
          verdictSummary: dossier.verdict_summary,
          category: dossier.category,
          protagonists: dossier.protagonists,
          consensusScore: dossier.consensus_score,
          premises: dossier.premises,
          timeline: dossier.timeline ?? [],
          illustrationUrl: dossier.illustration_url ?? null,
          illustrationCredit: dossier.illustration_credit ?? null,
          updatedAt: new Date(),
        },
      })
      .returning({ id: dossiers.id });

    if (row === undefined) {
      throw new Error(`upsert sans ligne retournée pour ${dossier.slug}`);
    }
    const dossierId = row.id;
    const existing = await tx
      .select()
      .from(dossierSources)
      .where(eq(dossierSources.dossierId, dossierId));

    const byId = new Map(existing.map((source) => [source.id, source]));
    const byUrl = new Map(
      existing
        .filter((source) => source.originalUrl !== null)
        .map((source) => [source.originalUrl as string, source]),
    );
    const byProof = new Map(
      existing
        .filter((source) => source.archiveSha256 !== null)
        .map((source) => [source.archiveSha256 as string, source]),
    );

    const keptIds = new Set<string>();
    let inserted = 0;
    let updated = 0;

    for (const source of dossier.sources) {
      const match =
        byId.get(source.id) ??
        (source.original_url === null ? undefined : byUrl.get(source.original_url)) ??
        (source.archive_sha256 === null ? undefined : byProof.get(source.archive_sha256));

      const content = contentOfSeed(source);
      if (match === undefined) {
        await tx.insert(dossierSources).values({
          id: source.id,
          dossierId,
          ...content,
          archiveSha256: citationProofHash(source),
          archiveStoragePath: source.archive_storage_path,
          archiveBinarySha256: source.archive_binary_sha256,
        });
        inserted += 1;
        continue;
      }

      const unchanged = sameContent(match, source);
      await tx
        .update(dossierSources)
        .set({
          ...content,
          // L'empreinte de citation est dérivée : celle en base peut avoir été
          // calculée avec la capture binaire. On la garde telle que le texte
          // canonique (source, auteur, date, citation) est inchangé — une URL
          // modifiée ne doit jamais réécrire `archive_sha256`.
          archiveSha256:
            canonicalKeyOfExisting(match) === canonicalKeyOfSeed(source)
              ? match.archiveSha256
              : citationProofHash(source),
          // Contenu inchangé : la capture reste attachée. Contenu modifié :
          // on détache (sans supprimer la fiche) pour exiger une recapture.
          archiveStoragePath: unchanged
            ? (match.archiveStoragePath ?? source.archive_storage_path)
            : null,
          archiveBinarySha256: unchanged
            ? (match.archiveBinarySha256 ?? source.archive_binary_sha256)
            : null,
        })
        .where(eq(dossierSources.id, match.id));
      keptIds.add(match.id);
      updated += 1;
    }

    // 3. Pièces retirées du seed : seules celles-là perdent leurs fiches.
    const removed = existing.filter((source) => !keptIds.has(source.id));
    if (removed.length > 0) {
      await tx.delete(dossierSources).where(
        and(
          eq(dossierSources.dossierId, dossierId),
          inArray(
            dossierSources.id,
            removed.map((source) => source.id),
          ),
        ),
      );
    }

    // 4. Statut de publication en dernier : le trigger de triangulation
    //    (migration 0015) valide les quatre règles sur les pièces finales.
    await tx
      .update(dossiers)
      .set({
        isPublished: dossier.is_published,
        publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(dossiers.id, dossierId));

    log.info("dossier de reference applique", {
      slug: dossier.slug,
      sources: dossier.sources.length,
      ajoutees: inserted,
      mises_a_jour: updated,
      retirees: removed.length,
      publie: dossier.is_published,
    });

    return { inserted, updated, removed: removed.length };
  });

  insertedSources += counts.inserted;
  updatedSources += counts.updated;
  removedSources += counts.removed;
}

log.info("seed applique", {
  dossiers: targets.length,
  portee: slugFilter ?? "tous",
  sources_ajoutees: insertedSources,
  sources_mises_a_jour: updatedSources,
  sources_retirees: removedSources,
});

await closePrivilegedDb();
