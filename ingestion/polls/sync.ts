import { canonicalJson, finishRun, startRun, withTransaction } from '../lib/db.mjs';
import { documentHash, downloadSondax, PollImportError } from './sondax.ts';
import type { PollDownload } from './sondax.ts';
import type { PollDocument } from '../../lib/polls/types.ts';

export interface PollDbClient {
  query(sql: string, params?: unknown[]): Promise<{ rows: Record<string, unknown>[]; rowCount?: number }>;
}
export interface SyncStats {
  added: number; modified: number; unchanged: number; published: number;
  retained: number; scenarios: number; results: number; warnings: string[];
}

/** No absent poll, scenario or candidate is ever deleted by a snapshot import. */
export async function upsertPolls(db: PollDbClient, download: PollDownload, runId: string, publish = false): Promise<SyncStats> {
  const stats: SyncStats = { added: 0, modified: 0, unchanged: 0, published: 0, retained: 0, scenarios: 0, results: 0, warnings: [...download.downloadIssues ?? []] };
  for (const document of download.documents) {
    const { rows: existingRows } = await db.query(
      `select p.id, p.status, p.content_sha256, v.content from public.polls p
       left join public.poll_revisions v on v.poll_id = p.id and v.content_sha256 = p.content_sha256
       where p.source_provider = $1 and p.external_id = $2`, [document.source_provider, document.external_id]);
    const existing = existingRows[0];
    if (existing) {
      if (!existing.content) throw new PollImportError('Révision courante absente : import refusé.');
      const previous = existing.content as PollDocument;
      // A smaller snapshot or reassigned local configuration number cannot replace
      // a known complete hypothesis. Keep its original provenance and report it.
      if (previous.scenarios.some((old) => !document.scenarios.some((s) => s.round === old.round
          && s.scenario_number === old.scenario_number && s.configuration_key === old.configuration_key))) {
        stats.retained++;
        stats.warnings.push(`${document.source_provider}/${document.external_id} : configuration absente ou liste de candidats modifiée ; version précédente conservée pour contrôle.`);
        continue;
      }
    }
    const hash = documentHash(document);
    const changed = !existing || existing.content_sha256 !== hash;
    const publicationChanged = publish && existing?.status === 'draft';
    if (!changed && !publicationChanged) { stats.unchanged++; continue; }
    if (changed) existing ? stats.modified++ : stats.added++;
    if (publicationChanged || (!existing && publish)) stats.published++;
    const { rows } = await db.query(
      `insert into public.polls (source_provider, external_id, institute, fieldwork_start, fieldwork_end, sample_size,
        source_url, source_origin, wikipedia_revision, dataset_url, dataset_sha256, content_sha256, retrieved_at, status)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       on conflict (source_provider, external_id) do update set
        institute = excluded.institute, fieldwork_start = excluded.fieldwork_start, fieldwork_end = excluded.fieldwork_end,
        sample_size = excluded.sample_size, source_url = excluded.source_url, source_origin = excluded.source_origin,
        wikipedia_revision = excluded.wikipedia_revision, dataset_url = excluded.dataset_url, dataset_sha256 = excluded.dataset_sha256,
        content_sha256 = excluded.content_sha256, retrieved_at = excluded.retrieved_at,
        status = case when $14 = 'published' then 'published' else public.polls.status end, updated_at = now()
       returning id`,
      [document.source_provider, document.external_id, document.institute, document.fieldwork_start, document.fieldwork_end,
        document.sample_size, document.source_url, document.source_origin, document.wikipedia_revision,
        download.datasetUrl, download.datasetHash, hash, download.retrievedAt, publish ? 'published' : 'draft']);
    const pollId = rows[0].id;
    await db.query(
      `insert into public.poll_revisions (poll_id, run_id, content_sha256, content, dataset_url, dataset_sha256, retrieved_at)
       values ($1,$2,$3,$4::jsonb,$5,$6,$7) on conflict (poll_id, content_sha256) do nothing`,
      [pollId, runId, hash, canonicalJson(document), download.datasetUrl, download.datasetHash, download.retrievedAt]);
    if (!changed) continue;
    for (const scenario of document.scenarios) {
      const { rows: scenarioRows } = await db.query(
        `insert into public.poll_scenarios (poll_id, round, scenario_number, is_primary, scenario_sample_size, configuration_key)
         values ($1,$2,$3,$4,$5,$6) on conflict (poll_id, round, scenario_number) do update set
          is_primary = excluded.is_primary, scenario_sample_size = excluded.scenario_sample_size, configuration_key = excluded.configuration_key
         where (public.poll_scenarios.is_primary, public.poll_scenarios.scenario_sample_size, public.poll_scenarios.configuration_key)
           is distinct from (excluded.is_primary, excluded.scenario_sample_size, excluded.configuration_key) returning id`,
        [pollId, scenario.round, scenario.scenario_number, scenario.is_primary, scenario.scenario_sample_size, scenario.configuration_key]);
      if (scenarioRows.length) stats.scenarios++;
      const scenarioId = scenarioRows[0]?.id ?? (await db.query(
        'select id from public.poll_scenarios where poll_id = $1 and round = $2 and scenario_number = $3',
        [pollId, scenario.round, scenario.scenario_number])).rows[0].id;
      for (const result of scenario.results) {
        const changedResults = await db.query(
          `insert into public.poll_results (scenario_id, candidate_external_id, candidate_name, party, score)
           values ($1,$2,$3,$4,$5) on conflict (scenario_id, candidate_external_id) do update set
            candidate_name = excluded.candidate_name, party = excluded.party, score = excluded.score
           where (public.poll_results.candidate_name, public.poll_results.party, public.poll_results.score)
             is distinct from (excluded.candidate_name, excluded.party, excluded.score) returning id`,
          [scenarioId, result.candidate_external_id, result.candidate_name, result.party, result.score]);
        stats.results += changedResults.rows.length;
      }
    }
  }
  await db.query(`insert into public.poll_sync_state (source_provider, last_success_at, dataset_url, dataset_sha256)
    values ('sondax', now(), $1, $2) on conflict (source_provider) do update set
      last_success_at = excluded.last_success_at, dataset_url = excluded.dataset_url, dataset_sha256 = excluded.dataset_sha256`,
  [download.datasetUrl, download.datasetHash]);
  return stats;
}

/** Existing private ingestion journal + atomic batch + non-overlapping imports. */
export async function syncSondax(db: PollDbClient, {
  publish = false, download = downloadSondax,
}: { publish?: boolean; download?: () => Promise<PollDownload> } = {}): Promise<SyncStats> {
  const lock = await db.query('select pg_try_advisory_lock(8272027) as acquired');
  if (!lock.rows[0]?.acquired) throw new PollImportError('Une synchronisation Sondax est déjà en cours.');
  let runId: string | null = null;
  try {
    runId = await startRun(db, { importer: 'polls:sondax', options: { publish } });
    const data = await download();
    return await withTransaction(db, async () => {
      const stats = await upsertPolls(db, data, runId as string, publish);
      await finishRun(db, runId as string, { status: 'ok', stats: { ...stats, dataset_url: data.datasetUrl, final_url: data.finalUrl,
        dataset_sha256: data.datasetHash, retrieved_at: data.retrievedAt, bytes: data.bytes, fallback: data.fallback } });
      return stats;
    });
  } catch (error) {
    // Never write raw driver errors, which may contain credentials, into logs.
    if (runId) await finishRun(db, runId, { status: 'error', stats: {},
      error: error instanceof PollImportError ? error.message : 'Échec de synchronisation : transaction annulée. Consulter la connexion et le schéma.' });
    throw error instanceof PollImportError ? error : new PollImportError('Échec de synchronisation : transaction annulée. Aucune donnée partielle publiée.');
  } finally {
    await db.query('select pg_advisory_unlock(8272027)');
  }
}
