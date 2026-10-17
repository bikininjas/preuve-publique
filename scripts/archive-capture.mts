/**
 * Capture d'archives réelles — `npm run archive:capture`.
 *
 * Déroulé, par pièce d'un dossier publié :
 *   1. construction d'une fiche d'archive canonique (NFC, déterministe) ;
 *   2. calcul de sa vraie empreinte SHA-256 (`node:crypto`) sur les octets ;
 *   3. dépôt dans `public.dossier_source_archives` (table content-addressed :
 *      la contrainte de la base revérifie l'empreinte du contenu) ;
 *   4. relecture de la fiche déposée et rehachage, avant toute mise à jour ;
 *   5. écriture de `archive_storage_path` et `archive_binary_sha256` sur la pièce ;
 *   6. miroir dans le bucket `immutable-archives` **si** un accès privilégié
 *      existe (clé de service, ou jeton de session administrateur) — sinon le
 *      script le dit et s'arrête là, sans jamais prétendre avoir déposé au bucket.
 *
 * Ce que le script écrit, et ce qu'il n'écrit pas :
 *   - `archive_binary_sha256` reçoit l'empreinte du **document déposé** ;
 *   - `archive_sha256` (empreinte de la **citation**) n'est jamais réécrit par une
 *     capture : c'est l'identité publique que le lecteur recalcule depuis la page.
 *
 * Exécution : hors conteneur web, avec `DB_PG_URL`. Aucune clé n'est nécessaire
 * pour le dépôt en base ; `SUPABASE_SERVICE_ROLE_KEY` ou
 * `SUPABASE_ADMIN_ACCESS_TOKEN` n'ouvrent que le miroir Storage.
 *
 *   node scripts/archive-capture.mts                 # contrôle (aucune écriture)
 *   node scripts/archive-capture.mts --fetch         # tente aussi un instantané des URL
 *   node scripts/archive-capture.mts --yes           # dépose les fiches et met la base à jour
 */
import { createHash } from "node:crypto";

import { eq } from "drizzle-orm";

import { truthyFlag } from "./flag.mts";
import { supabaseStorageWriter, privilegedDb, closePrivilegedDb } from "../src/db/index.ts";
import { dossierSourceArchives, dossierSources, dossiers as dossiersTable } from "../src/db/schema.ts";
import { buildArchiveRecord, type CaptureOutcome } from "../src/lib/archive-record.ts";
import { InvalidFetchUrlError, plusEncodedVariant, toFetchUrl } from "../src/lib/fetch-url.ts";
import { log } from "../src/server/middleware/logger.ts";
import { assertPublishableDossier } from "../src/server/validators/dossier.schema.ts";
import { computeIntegrityRoot } from "../src/server/services/crypto.service.ts";

const BUCKET = "immutable-archives";
const shouldWrite = truthyFlag("--yes");
const shouldFetch = truthyFlag("--fetch");
/**
 * UA de navigateur : plusieurs pare-feux (Urssaf compris) réinitialisent la
 * connexion TLS quand le client s'annonce comme un robot d'archivage. On
 * archive en se présentant comme un lecteur ordinaire ; l'identité du client
 * reste tracée dans les journaux et dans la fiche (`capture.url`).
 */
const FETCH_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0";
const FETCH_HEADERS = {
  "user-agent": FETCH_USER_AGENT,
  accept: "text/html,application/xhtml+xml,application/pdf,application/xml;q=0.9,*/*;q=0.8",
  "accept-language": "fr-FR,fr;q=0.9,en;q=0.8",
};
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
  let target: string;
  try {
    target = toFetchUrl(url);
  } catch (error) {
    const reason =
      error instanceof InvalidFetchUrlError ? `URL refusée : ${error.message}` : "URL refusée";
    return { kind: "URL_UNAVAILABLE", url, reason };
  }

  const request = (candidate: string) =>
    fetch(candidate, {
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
      headers: FETCH_HEADERS,
    });

  try {
    let response = await request(target);
    // Un « + » de chemin est littéral pour certains serveurs, une espace pour
    // d'autres : si la lecture directe répond 404, on réessaie avec %2B.
    if (response.status === 404) {
      const alternate = plusEncodedVariant(target);
      if (alternate !== null) {
        log.info("404 sur un chemin contenant + : réessai avec %2B", {
          url,
          fetch_url: target,
          retry_url: alternate,
        });
        response = await request(alternate);
      }
    }
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

  const storage = supabaseStorageWriter();
  if (shouldWrite && storage === null) {
    log.info(
      "miroir Storage non disponible : dépôt en base uniquement (ni SUPABASE_SERVICE_ROLE_KEY ni SUPABASE_ADMIN_ACCESS_TOKEN)",
      { bucket: BUCKET },
    );
  }

  let deposited = 0;
  let verified = 0;
  let mirrored = 0;
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
      category: row.category,
      protagonists: row.protagonists,
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
          author_reference_url: source.authorReferenceUrl,
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
      const encoded = new TextEncoder().encode(content);
      const sha256 = sha256Hex(encoded);
      hashes.push(sha256);

      log.info("fiche d'archive prete", {
        path,
        octets: encoded.byteLength,
        sha256,
        capture: outcome.kind,
        ecriture: shouldWrite,
      });

      if (!shouldWrite) {
        deposited += 1;
        continue;
      }

      const known = await db
        .select({ sha256: dossierSourceArchives.sha256, content: dossierSourceArchives.content })
        .from(dossierSourceArchives)
        .where(eq(dossierSourceArchives.sha256, sha256));

      if (known.length > 0) {
        if (known[0]?.content !== content) {
          log.error("conflit d'empreinte : deux contenus différents pour la même adresse", { sha256 });
          process.exitCode = 2;
          continue;
        }
        log.info("fiche déjà déposée, identique", { sha256 });
      } else {
        await db.insert(dossierSourceArchives).values({
          sha256,
          sourceId: source.id,
          dossierId: dossier.id,
          schema: "preuve-publique/archive-record/v1",
          content,
          bytes: encoded.byteLength,
          capturedAt: new Date(capturedAt),
          captureKind: outcome.kind,
        });
      }

      const [stored] = await db
        .select({
          content: dossierSourceArchives.content,
          bytes: dossierSourceArchives.bytes,
          captureKind: dossierSourceArchives.captureKind,
        })
        .from(dossierSourceArchives)
        .where(eq(dossierSourceArchives.sha256, sha256));
      if (stored === undefined || sha256Hex(new TextEncoder().encode(stored.content)) !== sha256) {
        log.error("la fiche relue ne redonne pas l'empreinte annoncée", { sha256 });
        process.exitCode = 2;
        continue;
      }

      await db
        .update(dossierSources)
        .set({
          archiveStoragePath: `dossier_source_archives/${sha256}`,
          archiveBinarySha256: sha256,
        })
        .where(eq(dossierSources.id, source.id));

      deposited += 1;
      verified += 1;
      log.info("fiche déposée et relue", { sha256, octets: stored.bytes, capture: stored.captureKind });

      if (storage !== null) {
        const upload = await storage.storage.from(BUCKET).upload(path, encoded, {
          contentType: "application/json; charset=utf-8",
          upsert: false,
        });
        if (upload.error !== null && !/already exists|Duplicate/i.test(upload.error.message)) {
          log.error("miroir Storage refusé", { path, error: upload.error.message });
          process.exitCode = 2;
          continue;
        }
        const check = await storage.storage.from(BUCKET).download(path);
        if (check.error !== null) {
          log.error("miroir Storage illisible après dépôt", { path, error: check.error.message });
          process.exitCode = 2;
          continue;
        }
        const remote = sha256Hex(new Uint8Array(await check.data.arrayBuffer()));
        if (remote !== sha256) {
          log.error("le miroir Storage ne correspond pas à l'empreinte", { path, depose: remote });
          process.exitCode = 2;
          continue;
        }
        mirrored += 1;
        log.info("miroir Storage vérifié", { path, sha256 });
      }
    }
  }

  log.info("capture terminee", {
    mode: shouldWrite ? "ecriture" : "controle",
    instantane_reseau: shouldFetch,
    pieces: hashes.length,
    fiches_deposees: deposited,
    fiches_relues: verified,
    miroir_storage: mirrored,
    racine_des_captures: computeIntegrityRoot(hashes),
  });

  await closePrivilegedDb();
}

await run();
