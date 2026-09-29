#!/usr/bin/env node
// Operator entry point for ingestion and editorial review.
//
//   node ingestion/cli.mjs list
//   node ingestion/cli.mjs fetch <importer> [options]      → staging only
//   node ingestion/cli.mjs push --staging <dir> [--dry-run] [--yes]
//   node ingestion/cli.mjs run <importer> [options] [--no-push] [--yes]
//   node ingestion/cli.mjs link [--dry-run] [--yes]
//   node ingestion/cli.mjs review list|set [...]
//   node ingestion/cli.mjs runs [--limit=N]
//   node ingestion/cli.mjs measure
//
// Writes to the database require DB_PG_URL (.env.local) and an explicit
// --yes for anything that is not a dry run. Fetches never need credentials,
// and a fetch never touches the database.

import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import {
  DEFAULT_STAGING_ROOT, createStagingDir, dirSizeBytes, formatBytes,
  readManifest, writeManifest,
} from './lib/staging.mjs';
import { loadProjectEnv, requireDbUrl, redactPgUrl, PROJECT_ROOT } from './lib/env.mjs';
import * as db from './lib/db.mjs';

const IMPORTERS = ['an-scrutins', 'senat-scrutins', 'senat-texts', 'pe-votes', 'pe-texts', 'legifrance'];

const rel = (path) => relative(PROJECT_ROOT, path).replaceAll('\\', '/');
const isTrue = (value) => value === true || value === 'true' || value === 'yes';

function usage() {
  console.log(`Preuve Publique — ingestion et revue éditoriale

Commandes :
  list                                  importeurs disponibles et options
  fetch <importeur> [options]           télécharge et écrit dans ingestion/.staging (aucune écriture en base)
  push --staging <dossier>              pousse un staging en base (--dry-run pour vérifier sans écrire)
  run <importeur> [options]             fetch + push (--no-push pour ne faire que le fetch)
  link [--dry-run]                      rapprochements documentaires déterministes (statut brouillon)
  review list [--table=] [--status=]    file de relecture
  review set --table= --id= --status= [--reviewer=]
  runs [--limit=N]                      derniers passages d'ingestion enregistrés
  measure                               volumes du staging et de la base

Options communes : --dry-run, --yes (confirme une écriture réelle), --label=<nom>
Variables : DB_PG_URL (.env.local) pour toute commande qui écrit ou mesure.`);
}

function parseArgs(argv) {
  const positional = [];
  const options = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) { positional.push(arg); continue; }
    const eq = arg.indexOf('=');
    if (eq !== -1) options[arg.slice(2, eq)] = arg.slice(eq + 1);
    else if (argv[i + 1] !== undefined && !argv[i + 1].startsWith('--')) options[arg.slice(2)] = argv[++i];
    else options[arg.slice(2)] = 'true';
  }
  return { positional, options };
}

async function loadImporter(name) {
  if (!IMPORTERS.includes(name)) {
    throw new Error(`Importeur inconnu : ${name ?? '(absent)'}. Disponibles : ${IMPORTERS.join(', ')}`);
  }
  return import(`./importers/${name}.mjs`);
}

async function openDb() {
  loadProjectEnv();
  const dbUrl = requireDbUrl();
  console.log(`Cible : ${redactPgUrl(dbUrl)}`);
  return db.connect(dbUrl);
}

async function cmdList() {
  for (const importerName of IMPORTERS) {
    const importer = await loadImporter(importerName);
    console.log(`\n${importerName} — ${importer.description}`);
    console.log(importer.help ?? '');
  }
}

async function cmdFetch(name, options) {
  const importer = await loadImporter(name);
  const stagingDir = createStagingDir(name, { label: options.label ?? '' });
  const merged = { ...importer.defaults, ...options };
  console.log(`[${name}] staging : ${rel(stagingDir)}`);
  const result = await importer.run({
    options: merged,
    stagingDir,
    log: (message) => console.log(`[${name}] ${message}`),
  });
  const manifest = {
    importer: name,
    created_at: new Date().toISOString(),
    options: merged,
    counts: result.counts,
    raw: result.rawFiles ?? [],
    notes: result.notes ?? [],
  };
  writeManifest(stagingDir, manifest);
  console.log(`[${name}] ${result.counts.evidence} pièce(s), ${result.counts.sources} source(s), ${(result.rawFiles ?? []).length} fichier(s) brut(s)`);
  for (const note of manifest.notes) console.log(`[${name}] note : ${note}`);
  console.log(`[${name}] manifeste : ${rel(join(stagingDir, 'manifest.json'))}`);
  return stagingDir;
}

function printPushStats(stats, dryRun) {
  console.log(dryRun ? 'Vérification terminée : transaction annulée, aucune écriture en base.' : 'Écriture appliquée.');
  console.log(`  sources : ${stats.sources}   acteurs : ${stats.actors}`);
  console.log(`  pièces : ${stats.evidence.total} (${stats.evidence.inserted} nouvelles, ${stats.evidence.updated} mises à jour, ${stats.evidence.unchanged} inchangées, ${stats.evidence.locked_changed} verrouillées)`);
  if (stats.links.total) {
    console.log(`  liens : ${stats.links.total} (${stats.links.inserted} nouveaux, ${stats.links.updated} mis à jour, ${stats.links.locked_changed} verrouillés)`);
  }
  if (stats.locked.length) {
    console.log('  pièces déjà relues ou publiées dont la source a changé (non écrites) :');
    for (const item of stats.locked.slice(0, 20)) console.log(`   - ${item.title} — ${item.id}`);
    if (stats.locked.length > 20) console.log(`   … ${stats.locked.length - 20} autre(s)`);
  }
  for (const note of stats.notes ?? []) console.log(`  note : ${note}`);
}

async function cmdPush(options, { stagingDirOverride = null } = {}) {
  const stagingDir = resolve(stagingDirOverride ?? options.staging ?? '');
  if (!stagingDirOverride && !options.staging) throw new Error('--staging <dossier> requis (dossier contenant manifest.json).');
  if (!existsSync(join(stagingDir, 'manifest.json'))) {
    throw new Error(`Aucun manifest.json dans ${stagingDir} — lancer d'abord une commande fetch.`);
  }
  const manifest = readManifest(stagingDir);
  const initialStatus = options.status ?? 'draft';
  if (!['draft', 'reviewed'].includes(initialStatus)) {
    throw new Error("--status doit valoir draft ou reviewed : la publication passe par « review set ».");
  }
  const dryRun = isTrue(options['dry-run']);
  const client = await openDb();
  try {
    if (!dryRun && !isTrue(options.yes)) {
      console.log('Écriture réelle demandée mais non confirmée : relancer avec --yes (ou --dry-run pour vérifier).');
      process.exitCode = 1;
      return;
    }
    let runId = null;
    if (!dryRun) {
      runId = await db.startRun(client, {
        importer: manifest.importer,
        options: { staging: rel(stagingDir), status: initialStatus },
      });
    }
    try {
      const { stats } = await db.pushStaging(client, stagingDir, { initialStatus, dryRun });
      if (runId) await db.finishRun(client, runId, { status: 'ok', stats });
      printPushStats(stats, dryRun);
    } catch (error) {
      if (runId) {
        await db.finishRun(client, runId, { status: 'error', stats: {}, error: String(error.message ?? error) });
      }
      throw error;
    }
  } finally {
    await client.end();
  }
}

async function cmdLink(options) {
  const dryRun = isTrue(options['dry-run']);
  const client = await openDb();
  try {
    if (!dryRun && !isTrue(options.yes)) {
      console.log('Écriture réelle demandée mais non confirmée : relancer avec --yes (ou --dry-run).');
      process.exitCode = 1;
      return;
    }
    let runId = null;
    if (!dryRun) runId = await db.startRun(client, { importer: 'link', options: { dryRun } });
    try {
      const stats = await db.generateLinks(client, { dryRun });
      if (runId) await db.finishRun(client, runId, { status: 'ok', stats });
      printPushStats({ ...stats, evidence: { total: 0, inserted: 0, updated: 0, unchanged: 0, locked_changed: 0 } }, dryRun);
      console.log(`  liens candidats : ${stats.links.total} (statut brouillon, revue humaine requise avant publication)`);
    } catch (error) {
      if (runId) await db.finishRun(client, runId, { status: 'error', stats: {}, error: String(error.message ?? error) });
      throw error;
    }
  } finally {
    await client.end();
  }
}

function formatRow(row) {
  const started = row.started_at instanceof Date ? row.started_at.toISOString() : String(row.started_at);
  const summary = JSON.stringify(row.stats ?? {});
  return `${started}  ${String(row.status).padEnd(9)} ${String(row.importer).padEnd(16)} ${summary.slice(0, 160)}${row.error ? `  erreur: ${String(row.error).slice(0, 120)}` : ''}`;
}

async function cmdRuns(options) {
  const limit = Number.parseInt(options.limit ?? '10', 10) || 10;
  const client = await openDb();
  try {
    const rows = await db.recentRuns(client, limit);
    if (!rows.length) { console.log('Aucun passage enregistré.'); return; }
    for (const row of rows) console.log(formatRow(row));
  } finally {
    await client.end();
  }
}

async function cmdReview(subcommand, options) {
  const client = await openDb();
  try {
    if (subcommand === 'list') {
      const table = options.table ?? 'evidence';
      const status = options.status ?? 'draft';
      const limit = Number.parseInt(options.limit ?? '20', 10) || 20;
      const rows = await db.listReviewQueue(client, { table, status, limit });
      console.log(`${rows.length} ligne(s) ${table} au statut « ${status} »`);
      for (const row of rows) {
        if (table === 'evidence') {
          console.log(`  ${row.id}  ${String(row.occurred_at).slice(0, 10)}  ${row.kind}/${row.institution ?? '-'}  ${String(row.title).slice(0, 100)}`);
        } else {
          console.log(`  ${row.id}  ${row.relation}  ${row.from_id} → ${row.to_id}  ${String(row.rationale).slice(0, 80)}`);
        }
      }
      return;
    }
    if (subcommand === 'set') {
      if (!options.table || !options.id || !options.status) {
        throw new Error('review set requiert --table=evidence|evidence_links --id=<uuid> --status=draft|reviewed|published [--reviewer=<nom>]');
      }
      const result = await db.setReviewStatus(client, {
        table: options.table,
        id: options.id,
        status: options.status,
        reviewer: options.reviewer,
      });
      if (result.unchanged) console.log(`${result.id} : déjà au statut ${result.to}`);
      else console.log(`${result.id} : ${result.from} → ${result.to}${result.reviewer ? ` (relecteur : ${result.reviewer})` : ''}`);
      return;
    }
    throw new Error('review requiert le sous-commande list ou set.');
  } finally {
    await client.end();
  }
}

async function cmdMeasure(options) {
  const root = options.staging ? resolve(options.staging) : null;
  if (root) {
    console.log(`Staging ${rel(root)} : ${formatBytes(dirSizeBytes(root))}`);
  } else if (existsSync(DEFAULT_STAGING_ROOT)) {
    console.log('Volumes staging (ingestion/.staging) :');
    for (const importerName of readdirSync(DEFAULT_STAGING_ROOT)) {
      const importerDir = join(DEFAULT_STAGING_ROOT, importerName);
      if (!statSync(importerDir).isDirectory()) continue;
      const runs = readdirSync(importerDir).filter((name) => statSync(join(importerDir, name)).isDirectory());
      const size = dirSizeBytes(importerDir);
      console.log(`  ${importerName.padEnd(16)} ${formatBytes(size).padStart(10)}  ${runs.length} passage(s)`);
      console.log('    (les fichiers bruts peuvent être supprimés après vérification : le staging n’est pas la base)');
    }
  } else {
    console.log('Aucun staging.');
  }

  loadProjectEnv();
  if (!process.env.DB_PG_URL) {
    console.log('DB_PG_URL absente : mesures de la base non disponibles.');
    return;
  }
  const client = await db.connect(process.env.DB_PG_URL);
  try {
    const stats = await db.databaseStats(client);
    console.log('\nBase :');
    for (const table of stats.tables) console.log(`  ${table.table.padEnd(16)} ${table.count}`);
    if (stats.sizeBytes !== null) console.log(`  taille          ${formatBytes(stats.sizeBytes)}`);
    console.log('  pièces par statut / nature / institution :');
    for (const row of stats.byStatus) {
      console.log(`    ${String(row.status).padEnd(9)} ${String(row.kind).padEnd(13)} ${String(row.institution ?? '-').padEnd(19)} ${row.count}`);
    }
  } finally {
    await client.end();
  }
}

async function main() {
  loadProjectEnv();
  const [command, ...rest] = process.argv.slice(2);
  const { positional, options } = parseArgs(rest);
  switch (command) {
    case 'list': return cmdList();
    case 'fetch': {
      if (!positional[0]) throw new Error('fetch requiert un nom d’importeur (voir « list »).');
      return cmdFetch(positional[0], options);
    }
    case 'push': return cmdPush(options);
    case 'run': {
      if (!positional[0]) throw new Error('run requiert un nom d’importeur (voir « list »).');
      const stagingDir = await cmdFetch(positional[0], options);
      if (isTrue(options['no-push'])) return;
      return cmdPush(options, { stagingDirOverride: stagingDir });
    }
    case 'link': return cmdLink(options);
    case 'runs': return cmdRuns(options);
    case 'review': return cmdReview(positional[0], options);
    case 'measure': return cmdMeasure(options);
    default:
      usage();
      if (command !== undefined) process.exitCode = 1;
      return;
  }
}

main().catch((error) => {
  console.error(`Erreur : ${error.message ?? error}`);
  if (error.name === 'MissingConfigError') console.error('Voir ingestion/README.md pour la configuration.');
  process.exitCode = 1;
});
