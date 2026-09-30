// Database layer for the ingestion and review CLI. Writes go through the
// trusted PostgreSQL connection (DB_PG_URL), never through the publishable
// key. Every function takes a client object exposing query(text, params) so
// the same code runs against node-postgres and against PGlite in tests.

import { join } from 'node:path';
import { readJsonl, readManifest } from './staging.mjs';
import { evidenceKey } from './normalize.mjs';

export const REVIEW_TABLES = ['evidence', 'evidence_links'];
export const ROW_STATUSES = ['draft', 'reviewed', 'published'];

const ALLOWED_TRANSITIONS = {
  draft: ['reviewed'],
  reviewed: ['published', 'draft'],
  published: ['reviewed'],
};

export async function connect(pgUrl, { applicationName = 'preuve-publique-ingestion' } = {}) {
  const { default: pg } = await import('pg');
  // Dates must round-trip as plain 'YYYY-MM-DD' strings, never as local-midnight
  // JS Dates whose timezone depends on the machine running the import.
  pg.types.setTypeParser(1082, (value) => value);
  const client = new pg.Client({ connectionString: pgUrl, application_name: applicationName });
  await client.connect();
  return {
    driver: 'pg',
    query: (text, params) => client.query(text, params),
    end: () => client.end(),
  };
}

export async function withTransaction(client, fn) {
  await client.query('begin');
  try {
    const result = await fn();
    await client.query('commit');
    return result;
  } catch (error) {
    await client.query('rollback');
    throw error;
  }
}

export function canonicalJson(value) {
  if (value === null || value === undefined) return 'null';
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (typeof value === 'object') {
    const keys = Object.keys(value).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(value[k])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

const asDateString = (value) => {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
};

export async function upsertSource(client, source) {
  const { rows } = await client.query(
    `insert into public.sources (url, publisher, document_title, published_at, sha256, retrieved_at)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (url) do update set
       publisher = excluded.publisher,
       document_title = excluded.document_title,
       published_at = coalesce(excluded.published_at, public.sources.published_at),
       sha256 = coalesce(excluded.sha256, public.sources.sha256),
       retrieved_at = greatest(public.sources.retrieved_at, excluded.retrieved_at)
     returning id`,
    [source.url, source.publisher, source.document_title, source.published_at ?? null,
      source.sha256 ?? null, source.retrieved_at ?? new Date().toISOString()],
  );
  return rows[0].id;
}

export async function upsertActor(client, actor) {
  if (actor.external_id) {
    const { rows } = await client.query(
      `insert into public.actors (external_id, name, kind) values ($1, $2, $3)
       on conflict (external_id) do update set name = excluded.name, kind = excluded.kind
       returning id`,
      [actor.external_id, actor.name, actor.kind],
    );
    return rows[0].id;
  }
  const existing = await client.query(
    'select id from public.actors where external_id is null and name = $1 and kind = $2 limit 1',
    [actor.name, actor.kind],
  );
  if (existing.rowCount) return existing.rows[0].id;
  const { rows } = await client.query(
    'insert into public.actors (name, kind) values ($1, $2) returning id',
    [actor.name, actor.kind],
  );
  return rows[0].id;
}

async function findEvidence(client, record) {
  const { rows } = await client.query(
    `select id, status, title, excerpt, occurred_at::text as occurred_at, source_url, source_locator, source_id, actor_id, detail
     from public.evidence
     where institution is not distinct from $1 and kind = $2 and external_id = $3`,
    [record.institution, record.kind, record.external_id],
  );
  return rows[0] ?? null;
}

/**
 * Refs are additive: each importer contributes documentary references, so an
 * evidence re-push must union them with the references already stored
 * (including those added by another importer's refs.jsonl), while every other
 * detail field follows the source record.
 */
export function mergeDetailRefs(existingDetail, recordDetail) {
  const base = recordDetail === null || recordDetail === undefined
    ? null
    : JSON.parse(JSON.stringify(recordDetail));
  const out = [];
  const seen = new Set();
  for (const ref of [
    ...(Array.isArray(existingDetail?.refs) ? existingDetail.refs : []),
    ...(Array.isArray(recordDetail?.refs) ? recordDetail.refs : []),
  ]) {
    if (!ref?.type || !ref?.value) continue;
    const key = `${ref.type}::${ref.value}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ type: ref.type, value: ref.value });
  }
  if (!out.length) return base;
  return { ...(base ?? {}), refs: out };
}

function evidenceChanged(existing, record, { sourceId, actorId, detailValue }) {
  return existing.title !== record.title
    || (existing.excerpt ?? null) !== (record.excerpt ?? null)
    || asDateString(existing.occurred_at) !== record.occurred_at
    || existing.source_url !== record.source_url
    || (existing.source_locator ?? null) !== (record.source_locator ?? null)
    || existing.source_id !== sourceId
    || (existing.actor_id ?? null) !== (actorId ?? null)
    || canonicalJson(existing.detail) !== canonicalJson(detailValue);
}

/**
 * Insert a new piece as draft, refresh a draft, and never overwrite a
 * reviewed or published piece: a changed published source is reported back
 * (action 'locked_changed') for a human to review, never silently replaced.
 */
export async function upsertEvidence(client, record, { initialStatus = 'draft', sourceId, actorId } = {}) {
  const resolvedSourceId = sourceId ?? await upsertSource(client, record.source);
  const resolvedActorId = actorId ?? (record.actor ? await upsertActor(client, record.actor) : null);
  const existing = await findEvidence(client, record);
  const detailValue = mergeDetailRefs(existing?.detail ?? null, record.detail);
  const detailJson = detailValue === null ? null : JSON.stringify(detailValue);

  if (!existing) {
    const { rows } = await client.query(
      `insert into public.evidence
         (source_id, actor_id, title, excerpt, kind, institution, occurred_at, source_url, source_locator, external_id, status, detail)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb)
       returning id`,
      [resolvedSourceId, resolvedActorId, record.title, record.excerpt, record.kind, record.institution,
        record.occurred_at, record.source_url, record.source_locator, record.external_id, initialStatus, detailJson],
    );
    return { action: 'inserted', id: rows[0].id, status: initialStatus };
  }

  const changed = evidenceChanged(existing, record, { sourceId: resolvedSourceId, actorId: resolvedActorId, detailValue });
  if (existing.status !== 'draft') {
    return { action: changed ? 'locked_changed' : 'unchanged', id: existing.id, status: existing.status };
  }
  if (!changed) return { action: 'unchanged', id: existing.id, status: existing.status };
  await client.query(
    `update public.evidence set
       source_id = $2, actor_id = $3, title = $4, excerpt = $5, occurred_at = $6,
       source_url = $7, source_locator = $8, detail = $9::jsonb
     where id = $1 and status = 'draft'`,
    [existing.id, resolvedSourceId, resolvedActorId, record.title, record.excerpt,
      record.occurred_at, record.source_url, record.source_locator, detailJson],
  );
  return { action: 'updated', id: existing.id, status: 'draft' };
}

async function findLink(client, link) {
  const { rows } = await client.query(
    `select id, status, confidence, method, rationale from public.evidence_links
     where from_id = $1 and to_id = $2 and relation = $3`,
    [link.from_id, link.to_id, link.relation],
  );
  return rows[0] ?? null;
}

/** Same protection as evidence: reviewed or published links are never overwritten. */
export async function upsertLink(client, link) {
  const existing = await findLink(client, link);
  if (!existing) {
    const { rows } = await client.query(
      `insert into public.evidence_links (from_id, to_id, relation, confidence, method, rationale, status)
       values ($1, $2, $3, $4, $5, $6, 'draft') returning id`,
      [link.from_id, link.to_id, link.relation, link.confidence, link.method, link.rationale],
    );
    return { action: 'inserted', id: rows[0].id, status: 'draft' };
  }
  const changed = Number(existing.confidence) !== Number(link.confidence)
    || existing.method !== link.method || existing.rationale !== link.rationale;
  if (existing.status !== 'draft') {
    return { action: changed ? 'locked_changed' : 'unchanged', id: existing.id, status: existing.status };
  }
  if (!changed) return { action: 'unchanged', id: existing.id, status: existing.status };
  await client.query(
    'update public.evidence_links set confidence = $2, method = $3, rationale = $4 where id = $1 and status = \'draft\'',
    [existing.id, link.confidence, link.method, link.rationale],
  );
  return { action: 'updated', id: existing.id, status: 'draft' };
}

export function emptyPushStats() {
  return {
    sources: 0,
    actors: 0,
    evidence: { total: 0, inserted: 0, updated: 0, unchanged: 0, locked_changed: 0 },
    links: { total: 0, inserted: 0, updated: 0, unchanged: 0, locked_changed: 0 },
    refs: { total: 0, added: 0, already: 0, missing: 0, locked_changed: 0 },
    locked: [],
    notes: [],
  };
}

function bump(bucket, action, entry) {
  bucket[action] += 1;
  return entry;
}

/**
 * Push a staging directory into the database inside one transaction.
 * dryRun performs the whole write path then rolls back: SQL is exercised,
 * nothing is persisted.
 */
export async function pushStaging(client, stagingDir, { initialStatus = 'draft', dryRun = false } = {}) {
  const manifest = readManifest(stagingDir);
  const sources = readJsonl(join(stagingDir, 'sources.jsonl'));
  const actors = readJsonl(join(stagingDir, 'actors.jsonl'));
  const evidenceRows = readJsonl(join(stagingDir, 'evidence.jsonl'));
  const stats = emptyPushStats();
  const sourceIds = new Map();
  const actorIds = new Map();

  await client.query('begin');
  try {
    for (const source of sources) {
      if (sourceIds.has(source.url)) continue;
      sourceIds.set(source.url, await upsertSource(client, source));
      stats.sources += 1;
    }
    for (const actor of actors) {
      const key = actor.external_id ?? `${actor.kind}|${actor.name}`;
      if (actorIds.has(key)) continue;
      actorIds.set(key, await upsertActor(client, actor));
      stats.actors += 1;
    }
    const seen = new Set();
    for (const record of evidenceRows) {
      const key = evidenceKey(record);
      if (seen.has(key)) continue;
      seen.add(key);
      if (!sourceIds.has(record.source.url)) {
        sourceIds.set(record.source.url, await upsertSource(client, record.source));
        stats.sources += 1;
      }
      const actorKey = record.actor ? (record.actor.external_id ?? `${record.actor.kind}|${record.actor.name}`) : null;
      if (actorKey && !actorIds.has(actorKey)) {
        actorIds.set(actorKey, await upsertActor(client, record.actor));
        stats.actors += 1;
      }
      const result = await upsertEvidence(client, record, {
        initialStatus,
        sourceId: sourceIds.get(record.source.url),
        actorId: actorKey ? actorIds.get(actorKey) : null,
      });
      stats.evidence.total += 1;
      bump(stats.evidence, result.action, null);
      if (result.action === 'locked_changed') {
        stats.locked.push({ id: result.id, title: record.title, external_id: record.external_id });
      }
    }
    const refPatches = readJsonl(join(stagingDir, 'refs.jsonl'));
    await applyRefPatches(client, refPatches, stats);
    if (dryRun) await client.query('rollback');
    else await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  }
  return { stats, manifest: { importer: manifest.importer, created_at: manifest.created_at } };
}

/**
 * Apply reference patches (refs.jsonl) written by importers whose dataset
 * links existing pieces to a dossier: drafts get the reference added, pieces
 * already reviewed or published are reported as locked, and missing pieces
 * are counted so a later push can complete them.
 */
export async function applyRefPatches(client, patches, stats) {
  for (const patch of patches) {
    stats.refs.total += 1;
    const { rows } = await client.query(
      `select id, status, detail from public.evidence
       where institution is not distinct from $1 and kind = $2 and external_id = $3`,
      [patch.institution, patch.kind, patch.external_id],
    );
    if (!rows.length) { stats.refs.missing += 1; continue; }
    const row = rows[0];
    const detail = row.detail && typeof row.detail === 'object' ? row.detail : {};
    const refs = Array.isArray(detail.refs) ? detail.refs : [];
    const already = refs.some((ref) => ref.type === patch.add_ref.type && ref.value === patch.add_ref.value);
    if (already) { stats.refs.already += 1; continue; }
    if (row.status !== 'draft') {
      stats.refs.locked_changed += 1;
      stats.locked.push({
        id: row.id,
        title: `${patch.external_id} ← ${patch.add_ref.type} = ${patch.add_ref.value}`,
        external_id: patch.external_id,
      });
      continue;
    }
    const nextDetail = { ...detail, refs: [...refs, patch.add_ref] };
    await client.query(
      'update public.evidence set detail = $2::jsonb where id = $1 and status = \'draft\'',
      [row.id, JSON.stringify(nextDetail)],
    );
    stats.refs.added += 1;
  }
}

export async function generateLinks(client, { dryRun = false } = {}) {
  const { rows } = await client.query(
    'select id, kind, institution, title, detail from public.evidence order by occurred_at asc, id asc',
  );
  const { candidateLinks } = await import('./links.mjs');
  const { links: candidates, notes } = candidateLinks(rows);
  const stats = emptyPushStats();
  stats.notes = notes;
  await client.query('begin');
  try {
    for (const link of candidates) {
      const result = await upsertLink(client, link);
      stats.links.total += 1;
      bump(stats.links, result.action, null);
      if (result.action === 'locked_changed') {
        stats.locked.push({ id: result.id, title: `${link.from_id}→${link.to_id} (${link.relation})`, external_id: null });
      }
    }
    if (dryRun) await client.query('rollback');
    else await client.query('commit');
  } catch (error) {
    await client.query('rollback');
    throw error;
  }
  return stats;
}

export async function startRun(client, { importer, options = {} }) {
  const { rows } = await client.query(
    'insert into public.ingestion_runs (importer, options) values ($1, $2::jsonb) returning id',
    [importer, JSON.stringify(options)],
  );
  return rows[0].id;
}

export async function finishRun(client, id, { status, stats = {}, error = null }) {
  await client.query(
    'update public.ingestion_runs set finished_at = now(), status = $2, stats = $3::jsonb, error = $4 where id = $1',
    [id, status, JSON.stringify(stats), error],
  );
}

export async function recentRuns(client, limit = 10) {
  const { rows } = await client.query(
    'select id, importer, started_at, finished_at, status, options, stats, error from public.ingestion_runs order by started_at desc limit $1',
    [limit],
  );
  return rows;
}

export async function listReviewQueue(client, { table = 'evidence', status = 'draft', limit = 50 } = {}) {
  if (!REVIEW_TABLES.includes(table)) throw new Error(`Table de revue inconnue : ${table}`);
  const { rows } = await client.query(
    `select * from public.${table} where status = $1 order by id limit $2`,
    [status, limit],
  );
  return rows;
}

/** Editorial transition: draft → reviewed → published, backwards allowed. */
export async function setReviewStatus(client, { table, id, status, reviewer }) {
  if (!REVIEW_TABLES.includes(table)) throw new Error(`Table de revue inconnue : ${table}`);
  if (!ROW_STATUSES.includes(status)) throw new Error(`Statut inconnu : ${status}`);
  if (status !== 'draft' && !reviewer) {
    throw new Error('Un relecteur identifié est requis pour tout changement de statut hors brouillon.');
  }
  const { rows } = await client.query(`select id, status from public.${table} where id = $1`, [id]);
  if (!rows.length) throw new Error(`Aucune ligne ${table} avec id ${id}`);
  const current = rows[0].status;
  if (current === status) return { id, from: current, to: status, unchanged: true };
  if (!ALLOWED_TRANSITIONS[current]?.includes(status)) {
    throw new Error(`Transition ${current} → ${status} non autorisée (${table}).`);
  }
  await client.query(
    `update public.${table}
     set status = $2,
         reviewed_by = case when $2 = 'draft' then null else $3 end,
         reviewed_at = case when $2 = 'draft' then null else now() end
     where id = $1`,
    [id, status, reviewer ?? null],
  );
  return { id, from: current, to: status, reviewer: reviewer ?? null };
}

export async function databaseStats(client) {
  const { rows: byStatus } = await client.query(
    'select status, kind, institution, count(*)::int as count from public.evidence group by 1, 2, 3 order by 1, 2, 3',
  );
  const { rows: tables } = await client.query(
    `select 'sources' as table, count(*)::int as count from public.sources
     union all select 'actors', count(*)::int from public.actors
     union all select 'evidence', count(*)::int from public.evidence
     union all select 'evidence_links', count(*)::int from public.evidence_links`,
  );
  let sizeBytes = null;
  try {
    const { rows } = await client.query('select pg_database_size(current_database()) as bytes');
    sizeBytes = Number(rows[0].bytes);
  } catch {
    sizeBytes = null;
  }
  return { byStatus, tables, sizeBytes };
}
