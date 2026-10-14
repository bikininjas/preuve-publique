/**
 * Capture d'archives réelles — `npm run archive:capture`.
 *
 * Déroulé, par pièce d'un dossier publié :
 *   1. construction d'une fiche d'archive canonique (NFC, déterministe) ;
 *   2. calcul de sa vraie empreinte SHA-256 (`node:crypto`) sur les octets ;
 *   3. dépôt dans le bucket public en lecture seule `immutable-archives` ;
 *   4. écriture en base de `archive_storage_path` et `archive_binary_sha256` ;
 *   5. re-téléchargement de la copie déposée et comparaison d'empreinte.
 *
 * Ce que le script écrit, et ce qu'il n'écrit pas :
 *   - `archive_binary_sha256` reçoit l'empreinte du **fichier déposé** ;
 *   - `archive_sha256` (empreinte de la **citation**) n'est jamais réécrit par
 *     une capture : c'est l'identité publique de la preuve, celle que le lecteur
 *     recalcule depuis la page. Mélanger les deux ferait perdre au lecteur la
 *     vérification qu'il peut faire lui-même.
 *
 * Exécution : hors conteneur web, avec `DB_PG_URL` (écriture en base) et
 * `SUPABASE_SERVICE_ROLE_KEY` (dépôt Storage). Sans `--yes`, le script ne fait
 * que calculer et afficher : c'est un contrôle, pas une écriture.
 *
 *   node scripts/archive-capture.mts                 # contrôle (aucune écriture)
 *   node scripts/archive-capture.mts --fetch         # tente aussi un instantané des URL
 *   node scripts/archive-capture.mts --yes           # dépose et met à jour la base
 */
import { createHash } from "node:crypto";

import { eq } from "drizzle-orm";

import { truthyFlag } from "./flag.mts";
import { supabaseAdmin, privilegedDb, closePrivilegedDb } from "../src/db/index.ts";
import { dossierSources, dossiers as dossiersTable } from "../src/db/schema.ts";
import { buildArchiveRecord, type CaptureOutcome } from "../src/lib/archive-record.ts";
import { log } from "../src/server/middleware/logger.ts";
import { assertPublishableDossier } from "../src/server/validators/dossier.schema.ts";
import { computeIntegrityRoot } from "../src/server/services/crypto.service.ts";

const BUCKET = "immutable-archives";
const shouldWrite = truthyFlag("--yes");
const shouldFetch = truthyFlag("--fetch");
const slugFilter = process.argv
  .find((argument) => argument.startsWith("--slug="))
  ?.slice("--slug=".length);

function sha256Hex(input: string | Uint8Array): string {
  return createHash("sha256").update(input).digest("hex");
}

async function fetchOutcome(url: string | null): Promise<CaptureOutcome> {
  if (url === null) {
    return { kind: "METADATA_ONLY", reason: "aucune URL d'origine documentée" };
  }
  if (!shouldFetch) {
    return {
      kind: "METADATA_ONLY",
      reason: "instantané réseau non demandé (relancer avec --fetch)",
    };
  }
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
      headers: { "user-agent": "preuve-publique-archive/1.0 (+https://preuve-publique.fr)" },
    });
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (!response.ok) {
      return { kind: "URL_UNAVAILABLE", url, reason: `HTTP ${response.status}` };
    }
    return {
      kind: "URL_SNAPSHOT",
      url,
      status: response.status,
      contentType: response.headers.get("content-type"),
      bytes: bytes.byteLength,
      sha256: sha256Hex(bytes),
    };
  } catch (error) {
    return {
      kind: "URL_UNAVAILABLE",
      url,
      reason: error instanceof Error ? error.message : "erreur réseau inconnue",
    };
  }
}

async function run() {
  const db = privilegedDb();
  const rows = await db.select().from(dossiersTable).where(eq(dossiersTable.isPublished, true));
  log.info("capture : dossiers publies lus", { dossiers: rows.length });

  const storage = supabaseAdmin();
  if (shouldWrite && storage === null) {
    log.error(
      "capture impossible : SUPABASE_SERVICE_ROLE_KEY absente (elle ne doit pas vivre dans le conteneur web)",
      { bucket: BUCKET },
    );
    process.exitCode = 2;
    return;
  }

  if (shouldWrite && storage !== null) {
    const buckets = await storage.storage.listBuckets();
    const exists = (buckets.data ?? []).some((bucket) => bucket.name === BUCKET);
    if (!exists) {
      const created = await storage.storage.createBucket(BUCKET, { public: true });
      if (created.error !== null) {
        log.error("creation du bucket refusee", { bucket: BUCKET, error: created.error.message });
        process.exitCode = 2;
        return;
      }
      log.info("bucket cree (lecture publique, ecriture par cle de service uniquement)", {
        bucket: BUCKET,
      });
    } else {
      log.info("bucket deja present", { bucket: BUCKET });
    }
  }

  let captured = 0;
  let verified = 0;
  const hashes: string[] = [];

  for (const row of rows) {
    if (slugFilter !== undefined && row.slug !== slugFilter) {
      continue;
    }
    const sources = await db
      .select()
      .from(dossierSources)
      .where(eq(dossierSources.dossierId, row.id));

    const dossier = assertPublishableDossier({
      id: row.id,
      slug: row.slug,
      claim_title: row.claimTitle,
      verdict: row.verdict,
      verdict_summary: row.verdictSummary,
      consensus_score: row.consensusScore,
      premises: row.premises,
      is_published: row.isPublished,
      published_at: row.publishedAt === null ? null : row.publishedAt.toISOString(),
      sources: sources
        .sort((left, right) => left.displayOrder - right.displayOrder)
        .map((source) => ({
          id: source.id,
          spectrum: source.spectrum,
          source_name: source.sourceName,
          author_or_institution: source.authorOrInstitution,
          publication_date: source.publicationDate,
          quote_kind: source.quoteKind,
          exact_quote: source.exactQuote,
          context_explanation: source.contextExplanation,
          original_url: source.originalUrl,
          archive_storage_path: source.archiveStoragePath,
          archive_sha256: source.archiveSha256,
          archive_binary_sha256: source.archiveBinarySha256,
          display_order: source.displayOrder,
        })),
    });

    for (const source of dossier.sources) {
      const capturedAt = new Date().toISOString();
      const outcome = await fetchOutcome(source.original_url);
      const { path, content } = buildArchiveRecord({
        dossier: {
          id: dossier.id,
          slug: dossier.slug,
          claim_title: dossier.claim_title,
          verdict: dossier.verdict,
        },
        source,
        capturedAt,
        outcome,
      });
      const bytes = new TextEncoder().encode(content);
      const sha256 = sha256Hex(bytes);
      hashes.push(sha256);

      log.info("fiche d'archive prete", {
        path,
        octets: bytes.byteLength,
        sha256,
        capture: outcome.kind,
        ecriture: shouldWrite,
      });

      if (!shouldWrite || storage === null) {
        captured += 1;
        continue;
      }

      const upload = await storage.storage
        .from(BUCKET)
        .upload(path, bytes, {
          contentType: "application/json; charset=utf-8",
          upsert: false,
        });

      if (upload.error !== null) {
        const alreadyThere = /already exists|Duplicate/i.test(upload.error.message);
        if (!alreadyThere) {
          log.error("depot refuse", { path, error: upload.error.message });
          process.exitCode = 2;
          continue;
        }
        const existing = await storage.storage.from(BUCKET).download(path);
        if (existing.error !== null) {
          log.error("copie existante illisible", { path, error: existing.error.message });
          process.exitCode = 2;
          continue;
        }
        const existingHash = sha256Hex(new Uint8Array(await existing.data.arrayBuffer()));
        if (existingHash !== sha256) {
          log.error("conflit : une capture differente existe deja (une capture est immuable)", {
            path,
            empreinte_deposee: existingHash,
            empreinte_locale: sha256,
          });
          process.exitCode = 2;
          continue;
        }
        log.info("capture deja deposee, identique", { path, sha256 });
      }

      await db
        .update(dossierSources)
        .set({ archiveStoragePath: path, archiveBinarySha256: sha256 })
        .where(eq(dossierSources.id, source.id));

      const check = await storage.storage.from(BUCKET).download(path);
      if (check.error !== null) {
        log.error("verification impossible apres depot", { path, error: check.error.message });
        process.exitCode = 2;
        continue;
      }
      const storedHash = sha256Hex(new Uint8Array(await check.data.arrayBuffer()));
      if (storedHash !== sha256) {
        log.error("la copie deposee ne correspond pas a l'empreinte calculee", {
          path,
          empreinte_deposee: storedHash,
          empreinte_calculee: sha256,
        });
        process.exitCode = 2;
        continue;
      }
      verified += 1;
      log.info("capture deposee et verifiee", { path, sha256 });
    }
  }

  log.info("capture terminee", {
    mode: shouldWrite ? "ecriture" : "controle",
    instantane_reseau: shouldFetch,
    pieces: captured,
    verifiees: verified,
    racine_des_captures: computeIntegrityRoot(hashes),
  });

  await closePrivilegedDb();
}

await run();
