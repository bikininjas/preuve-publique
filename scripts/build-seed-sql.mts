/**
 * Produit `supabase/seed.sql` à partir des dossiers de référence typés
 * (`src/db/seed-fallback.ts`).
 *
 * Le script passe par le validateur de triangulation : un dossier de référence
 * qui ne respecte pas la règle de publication fait échouer la génération, au
 * lieu d'être écrit puis publié.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { SEED_DOSSIERS } from "../src/db/seed-fallback.ts";
import type { Dossier, DossierSource } from "../src/lib/types.ts";
import { assertPublishableDossier } from "../src/server/validators/dossier.schema.ts";
import { log } from "../src/server/middleware/logger.ts";

function sqlText(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlNullable(value: string | null): string {
  return value === null ? "null" : sqlText(value);
}

function sourceInsert(dossier: Dossier, source: DossierSource): string {
  const columns = [
    "id",
    "dossier_id",
    "spectrum",
    "source_name",
    "author_or_institution",
    "publication_date",
    "quote_kind",
    "exact_quote",
    "context_explanation",
    "original_url",
    "archive_storage_path",
    "archive_sha256",
    "archive_binary_sha256",
    "display_order",
  ].join(", ");
  const values = [
    sqlText(source.id),
    sqlText(dossier.id),
    `${sqlText(source.spectrum)}::political_spectrum`,
    sqlText(source.source_name),
    sqlText(source.author_or_institution),
    sqlNullable(source.publication_date),
    `${sqlText(source.quote_kind)}::quote_kind`,
    sqlText(source.exact_quote),
    sqlText(source.context_explanation),
    sqlNullable(source.original_url),
    sqlNullable(source.archive_storage_path),
    sqlNullable(source.archive_sha256),
    sqlNullable(source.archive_binary_sha256),
    String(source.display_order),
  ].join(",\n  ");
  return `insert into public.dossier_sources (${columns}) values (\n  ${values}\n);`;
}

function dossierInsert(dossier: Dossier): string {
  return [
    "insert into public.dossiers (",
    "  id, slug, claim_title, verdict, verdict_summary, consensus_score,",
    "  premises, is_published, published_at",
    ") values (",
    `  ${sqlText(dossier.id)},`,
    `  ${sqlText(dossier.slug)},`,
    `  ${sqlText(dossier.claim_title)},`,
    `  ${sqlText(dossier.verdict)}::verdict_status,`,
    `  ${sqlText(dossier.verdict_summary)},`,
    `  ${String(dossier.consensus_score)},`,
    `  ${sqlText(JSON.stringify(dossier.premises))}::jsonb,`,
    `  ${dossier.is_published ? "true" : "false"},`,
    `  ${dossier.published_at === null ? "null" : `${sqlText(dossier.published_at)}::timestamptz`}`,
    ");",
  ].join("\n");
}

const blocks: string[] = [
  "-- seed.sql — généré par `npm run seed:sql` (scripts/build-seed-sql.mts).",
  "-- Ne pas modifier à la main : modifier src/db/seed-fallback.ts.",
  "-- Rejouable : chaque insertion est précédée d'une suppression par slug.",
  "-- Les empreintes archive_sha256 sont calculées sur les champs publiés",
  "-- (voir src/server/services/crypto.service.ts) et contrôlées par le",
  "-- validateur de triangulation avant écriture.",
  "",
];

for (const dossier of SEED_DOSSIERS) {
  const validated = assertPublishableDossier(dossier);
  blocks.push(`delete from public.dossiers where slug = ${sqlText(validated.slug)};`);
  blocks.push(dossierInsert(validated));
  for (const source of validated.sources) {
    blocks.push(sourceInsert(validated, source));
  }
  blocks.push("");
}

const base = dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const target = resolve(base, "../supabase/seed.sql");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, blocks.join("\r\n"), "utf8");
log.info("seed sql genere", { target, dossiers: SEED_DOSSIERS.length });
