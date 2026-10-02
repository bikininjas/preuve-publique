import { join } from 'node:path';
import { createStagingDir, readJsonl, saveRaw, writeJsonl, writeManifest } from '../lib/staging.mjs';
import { requestText, HttpError } from '../lib/http.mjs';
import { titleTag } from '../lib/html.mjs';
import { run as fetchAssembly } from '../importers/an-scrutins.mjs';
import { parseSessionPage, entryToRecord } from '../importers/senat-scrutins.mjs';
import { verifyArchive, publishVerified } from '../lib/auto-publish.mjs';
import { startRun, finishRun, upsertSource, upsertEvidence } from '../lib/db.mjs';

export function dailyWindow(now = new Date()) {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const since = new Date(Date.parse(`${today}T00:00:00Z`) - 30 * 86400000).toISOString().slice(0, 10);
  const year = Number(today.slice(0, 4));
  const month = Number(today.slice(5, 7));
  const session = month >= 10 ? year : year - 1;
  return { today, since, sessions: [session - 1, session], pendingSessionAllowed: month === 10 };
}

export function selectRecent(verified, window) {
  // Archive order is not chronological. A limit on its first entries would miss new votes.
  return verified.eligible.filter(({ record }) => record.occurred_at >= window.since && record.occurred_at <= window.today)
    .sort((a, b) => b.record.occurred_at.localeCompare(a.record.occurred_at) || a.record.external_id.localeCompare(b.record.external_id));
}

export async function fetchDaily(institution, window, { root, request = requestText } = {}) {
  const importer = institution === 'assemblee' ? 'an-scrutins' : 'senat-scrutins';
  const dir = createStagingDir(importer, { root, label: 'quotidien' });
  if (institution === 'assemblee') {
    const result = await fetchAssembly({ options: { legislatures: '17', limit: '0' }, stagingDir: dir });
    writeManifest(dir, { importer, created_at: new Date().toISOString(), raw: result.rawFiles, counts: result.counts, notes: result.notes });
  } else {
    const records = [], sources = [], raw = [], notes = [];
    for (const session of window.sessions) {
      const url = `https://www.senat.fr/scrutin-public/scr${session}.html`;
      let response;
      try { response = await request(url, { minDelayMs: 1500, timeoutMs: 60000 }); }
      catch (error) {
        // Only a missing NEW October session is expected; old pages and other errors fail the job.
        if (error instanceof HttpError && error.status === 404 && window.pendingSessionAllowed && session === window.sessions.at(-1)) {
          notes.push({ session, state: 'pending', http_status: 404, url });
          continue;
        }
        throw error;
      }
      const pageTitle = titleTag(response.text)?.replace(/\s*-\s*Sénat\s*$/, '') ?? null;
      const entries = parseSessionPage(response.text, { session });
      if (!entries.length) throw new Error('Page du Sénat reçue mais aucun scrutin reconnu : structure à vérifier.');
      raw.push({ url, ...saveRaw(dir, `session-${session}.html`, response.body) });
      sources.push({ url, publisher: 'Sénat', document_title: pageTitle, published_at: null, sha256: response.sha256, retrieved_at: response.fetchedAt });
      records.push(...entries.map(entry => entryToRecord(entry, { pageUrl: url, pageTitle, retrievedAt: response.fetchedAt })));
    }
    writeJsonl(join(dir, 'evidence.jsonl'), records);
    writeJsonl(join(dir, 'sources.jsonl'), sources);
    writeManifest(dir, { importer, raw, notes });
  }
  return dir;
}

export async function syncDaily(client, { institution, now = new Date(), dryRun = true, fetch = fetchDaily, root } = {}) {
  if (!['assemblee', 'senat'].includes(institution)) throw new Error('Institution attendue : assemblee ou senat.');
  const window = dailyWindow(now);
  const stats = { institution, dry_run: dryRun, since: window.since, today: window.today, fetched: 0, recent: 0, already: 0, inserted: 0, updated: 0, published: 0 };
  // Also prevents overlap with a manually launched copy outside GitHub Actions.
  const lockKey = `preuve-publique:daily:${institution}`;
  const lock = await client.query('select pg_try_advisory_lock(hashtext($1)) as acquired', [lockKey]);
  if (!lock.rows[0].acquired) throw new Error('Une synchronisation de cette institution est déjà en cours.');
  let runId;
  try {
    if (!dryRun) runId = await startRun(client, { importer: `daily-scrutins:${institution}`, options: { ...window, max_new: 500 } });
    const dir = await fetch(institution, window, { root });
    const verified = await verifyArchive(dir);
    if (verified.institution !== institution) throw new Error('Institution du staging différente de la tâche.');
    stats.fetched = verified.eligible.length;
    stats.source_latest = verified.eligible.map(({ record }) => record.occurred_at).sort().at(-1);
    stats.sources = readJsonl(join(dir, 'sources.jsonl')).map(({ url, sha256, retrieved_at }) => ({ url, sha256, retrieved_at }));
    const { readManifest } = await import('../lib/staging.mjs');
    stats.notes = readManifest(dir).notes ?? [];
    const recent = selectRecent(verified, window);
    stats.recent = recent.length;
    await client.query('begin');
    try {
      const existing = await client.query('select external_id, status from public.evidence where institution=$1 and kind=\'vote\' and external_id=any($2::text[])', [institution, recent.map(({ record }) => record.external_id)]);
      const statuses = new Map(existing.rows.map(row => [row.external_id, row.status]));
      // Published/reviewed documents stay untouched; historical drafts are outside this window.
      const candidates = recent.filter(({ record }) => !statuses.has(record.external_id) || statuses.get(record.external_id) === 'draft');
      stats.already = recent.length - candidates.length;
      if (candidates.length > 500) throw new Error('Plus de 500 nouveaux scrutins récents : import annulé, reprise explicite nécessaire.');
      const sourceIds = new Map();
      for (const { record, source } of candidates) {
        if (!sourceIds.has(source.url)) sourceIds.set(source.url, await upsertSource(client, source));
        const result = await upsertEvidence(client, record, { sourceId: sourceIds.get(source.url) });
        if (result.action === 'inserted') stats.inserted += 1;
        if (result.action === 'updated') stats.updated += 1;
      }
      const publication = await publishVerified(client, { ...verified, eligible: candidates }, { limit: 500, dryRun: false, manageTransaction: false });
      if (publication.rejected || publication.published !== candidates.length) throw new Error('Conformité en base incomplète : import et publication annulés.');
      stats.published = publication.published;
      await client.query(dryRun ? 'rollback' : 'commit');
    } catch (error) { await client.query('rollback'); throw error; }
    if (runId) await finishRun(client, runId, { status: 'ok', stats });
    return stats;
  } catch (error) {
    // Never serialize a driver error containing credentials or connection details.
    if (runId) await finishRun(client, runId, { status: 'error', stats, error: 'Synchronisation interrompue. Consulter les étapes du workflow et les sources officielles.' });
    throw error;
  } finally { await client.query('select pg_advisory_unlock(hashtext($1))', [lockKey]); }
}
