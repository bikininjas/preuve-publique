// Reuse the archive replay checks, in bounded batches; default is a rollback.
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { verifyArchive, publishVerified } from '../lib/auto-publish.mjs';
import { connect, startRun, finishRun } from '../lib/db.mjs';
import { loadProjectEnv, requireDbUrl } from '../lib/env.mjs';
import { importOfficial } from './import-official.mjs';
import { selectEssentialVotes, focusPublishedVotes } from '../lib/vote-selection.mjs';

export async function releaseArchive(db, verified, { dryRun = true } = {}) {
  const fetched = verified.eligible.length;
  if ((verified.kind ?? 'vote') === 'vote') verified = { ...verified, eligible: selectEssentialVotes(verified.eligible) };
  const stats = { dryRun, verified: verified.eligible.length, published: 0, rejected: 0, batches: 0 };
  stats.out_of_scope = fetched - verified.eligible.length;
  if (verified.eligible.length > 50_000) throw new Error('Archive trop volumineuse : définir un nouveau budget.');
  await db.query('begin');
  try {
    await db.query('select pg_advisory_xact_lock(734001903)');
    for (let offset=0;offset<verified.eligible.length;offset+=500) {
      const batch = await publishVerified(db, { ...verified, eligible: verified.eligible.slice(offset,offset+500) }, { limit: 500, manageTransaction: false });
      stats.published += batch.published;
      stats.rejected += batch.rejected;
      stats.batches++;
      if (batch.rejected) {
        // Rejections need inspection, never a global status update.
        throw new Error('Archive ou base divergente : transaction intégralement annulée.');
      }
    }
    if ((verified.kind ?? 'vote') === 'vote') stats.withdrawn = await focusPublishedVotes(db, verified.institution);
    await db.query(dryRun ? 'rollback' : 'commit');
    return stats;
  } catch (error) { await db.query('rollback'); throw error; }
}

async function main() {
  const args = process.argv.slice(2);
  const staging = args[0];
  if (!staging || args.slice(1).some((arg) => !['--yes', '--dry-run','--import-drafts'].includes(arg)) || args.length > 3) throw new Error('Usage : official-votes.mjs staging [--import-drafts] [--yes|--dry-run]');
  const verified = await verifyArchive(resolve(staging));
  loadProjectEnv();
  const db = await connect(requireDbUrl());
  const dryRun = !args.includes('--yes') || args.includes('--dry-run');
  let run;
  try {
    if (!dryRun) run = await startRun(db, { importer: args.includes('--import-drafts') ? 'official-archive-import' : 'official-votes-backfill', options: { institution: verified.institution, kind:verified.kind, verified: verified.eligible.length } });
    const stats = args.includes('--import-drafts') ? await importOfficial(db, verified, { dryRun }) : await releaseArchive(db, verified, { dryRun });
    if (run) await finishRun(db, run, { status: 'ok', stats });
    console.log(JSON.stringify(stats));
  } catch (error) {
    if (run) await finishRun(db, run, { status: 'error', error: 'Reprise annulée ; inspecter la conformité documentaire.' });
    throw error;
  } finally { await db.end(); }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main().catch(() => { console.error('Reprise interrompue ; aucune publication de la transaction.'); process.exitCode = 1; });
