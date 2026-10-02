// Automated release is deliberately narrow: official parliamentary vote snapshots.
// A confidence score describes documentary conformity, not a political claim.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { isAbsolute, join, normalize, sep } from 'node:path';
import { readJsonl, readManifest } from './staging.mjs';
import { canonicalJson } from './db.mjs';
import { parseZip, scrutinToRecord } from '../importers/an-scrutins.mjs';
import { parseSessionPage, entryToRecord } from '../importers/senat-scrutins.mjs';
import { titleTag } from './html.mjs';

const OFFICIAL_PREFIX = 'https://data.assemblee-nationale.fr/static/openData/repository/';
const SCORE = 0.99;
const FIELDS = ['external_id', 'kind', 'institution', 'title', 'excerpt', 'occurred_at', 'source_url', 'source_locator'];
const normalizedDetail = (value) => {
  if (!value || typeof value !== 'object') return null;
  const { refs, topics_source, ...rest } = value;
  return rest;
};
const same = (a, b) => FIELDS.every((key) => (a[key] ?? null) === (b[key] ?? null))
  && canonicalJson(normalizedDetail(a.detail)) === canonicalJson(normalizedDetail(b.detail));

function rawPath(stagingDir, file) {
  if (!file || isAbsolute(file) || !normalize(file).startsWith(`raw${sep}`) || normalize(file).split(sep).includes('..')) {
    throw new Error('Chemin brut du manifeste invalide.');
  }
  return join(stagingDir, file);
}

export async function verifyArchive(stagingDir) {
  const manifest = readManifest(stagingDir);
  const institution = { 'an-scrutins': 'assemblee', 'senat-scrutins': 'senat' }[manifest.importer];
  if (!institution) throw new Error('Publication automatique réservée aux sources officielles de scrutins AN/Sénat.');
  const sources = readJsonl(join(stagingDir, 'sources.jsonl'));
  const staged = readJsonl(join(stagingDir, 'evidence.jsonl'));
  if (!Array.isArray(manifest.raw) || !manifest.raw.length || !sources.length || !staged.length) {
    throw new Error('Archive, sources ou pièces absentes.');
  }
  const replayed = new Map();
  for (const raw of manifest.raw) {
    const official = institution === 'assemblee'
      ? typeof raw.url === 'string' && raw.url.startsWith(OFFICIAL_PREFIX) && /\/\d+\/loi\/scrutins\/[^/]+\.json\.zip$/.test(raw.url)
      : /^https:\/\/www\.senat\.fr\/scrutin-public\/scr\d{4}\.html$/.test(raw.url);
    if (!official) {
      throw new Error('URL d’archive non officielle.');
    }
    const source = sources.find((item) => item.url === raw.url);
    if (!source || source.sha256 !== raw.sha256 || !/^[a-f0-9]{64}$/.test(raw.sha256)) {
      throw new Error('Empreinte de source absente ou discordante.');
    }
    const buffer = readFileSync(rawPath(stagingDir, raw.file));
    const sha = createHash('sha256').update(buffer).digest('hex');
    if (sha !== raw.sha256 || buffer.byteLength !== raw.bytes) throw new Error('Archive brute modifiée.');
    if (institution === 'senat') {
      const html = buffer.toString('utf8');
      const session = Number(raw.url.match(/scr(\d{4})\.html$/)[1]);
      const pageTitle = titleTag(html)?.replace(/\s*-\s*Sénat\s*$/, '') ?? null;
      const entries = parseSessionPage(html, { session });
      if (!entries.length) throw new Error('Page officielle du Sénat sans scrutin reconnu : vérifier la structure de la source.');
      for (const entry of entries) {
        const record = entryToRecord(entry, { pageUrl: raw.url, pageTitle, retrievedAt: source.retrieved_at });
        if (replayed.has(record.external_id)) throw new Error('Identifiant de scrutin dupliqué dans les sources.');
        replayed.set(record.external_id, record);
      }
      continue;
    }
    const legislature = Number(raw.url.match(/repository\/(\d+)\/loi\/scrutins\//)?.[1]);
    if (![15, 16, 17].includes(legislature)) throw new Error('Législature non prise en charge.');
    const zipFile = raw.url.split('/').at(-1);
    const result = await parseZip(buffer, (_entry, text) => {
      const value = JSON.parse(text);
      const scrutin = value.scrutin ?? value;
      if (!scrutin?.uid) throw new Error('Scrutin sans identifiant.');
      const record = scrutinToRecord(scrutin, {
        legislature, zipFile, zipUrl: raw.url, retrievedAt: source.retrieved_at,
      });
      if (replayed.has(record.external_id)) throw new Error('Identifiant de scrutin dupliqué dans les archives.');
      replayed.set(record.external_id, record);
    });
    if (!result.entries || result.errors.length) throw new Error(`Archive impossible à rejouer : ${result.errors[0] ?? 'vide'}`);
  }
  const eligible = [];
  const rejected = [];
  const seen = new Set();
  for (const record of staged) {
    const replay = replayed.get(record.external_id);
    const source = sources.find((item) => item.url === record.source?.url);
    if (seen.has(record.external_id) || !replay || !source || !same(record, replay)
      || record.source?.url !== replay.source.url) {
      rejected.push({ external_id: record.external_id ?? null, reason: 'pièce de staging différente de l’archive' });
    } else {
      eligible.push({ record, source });
    }
    seen.add(record.external_id);
  }
  if (rejected.length) throw new Error(`${rejected.length} pièce(s) du staging divergent de l’archive officielle ; publication annulée.`);
  return { eligible, institution, archiveCount: manifest.raw.length, score: SCORE };
}

export async function publishVerified(client, verified, { limit = 50, dryRun = true, manageTransaction = true } = {}) {
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 500) throw new Error('--limit doit être entre 1 et 500.');
  const stats = { archives: verified.archiveCount, verified: verified.eligible.length, published: 0, already: 0, rejected: 0, examined: 0, confidence: SCORE };
  const institution = verified.institution ?? 'assemblee';
  if (!['assemblee', 'senat'].includes(institution)) throw new Error('Institution non prise en charge.');
  if (manageTransaction) await client.query('begin');
  try {
    const keys = verified.eligible.map(({ record }) => record.external_id);
    const queue = await client.query(
      `select external_id, status from public.evidence
       where institution = $2 and kind = 'vote' and external_id = any($1::text[])`,
      [keys, institution],
    );
    const statuses = new Map(queue.rows.map((row) => [row.external_id, row.status]));
    stats.already = queue.rows.filter((row) => row.status === 'published').length;
    for (const { record, source } of verified.eligible) {
      if (stats.examined >= limit) break;
      if (statuses.get(record.external_id) !== 'draft') continue;
      const { rows } = await client.query(
        `select e.id, e.status, e.external_id, e.kind, e.institution, e.title, e.excerpt,
                e.occurred_at::text as occurred_at, e.source_url, e.source_locator, e.detail,
                s.url as archive_url, s.sha256 as archive_sha256
         from public.evidence e join public.sources s on s.id = e.source_id
         where e.external_id = $1 and e.institution = $2 and e.kind = 'vote'`,
        [record.external_id, institution],
      );
      if (rows.length !== 1) { stats.rejected += 1; continue; }
      const row = rows[0];
      stats.examined += 1;
      if (row.status !== 'draft' || row.archive_url !== source.url
        || row.archive_sha256 !== source.sha256 || !same(row, record)) {
        stats.rejected += 1;
        continue;
      }
      const checks = {
        official_domain: true, archive_sha256: true, staging_replay: true,
        database_match: true, interpretation: false,
        source_url: source.url, snapshot_sha256: source.sha256, retrieved_at: source.retrieved_at,
      };
      const result = await client.query(
        `update public.evidence set status = 'published', reviewed_by = 'contrôle automatique : archive officielle',
            reviewed_at = now(), publication_confidence = $2, publication_method = 'official_archive_replay',
            publication_checks = $3::jsonb
         where id = $1 and status = 'draft'`,
        [row.id, SCORE, JSON.stringify(checks)],
      );
      stats.published += result.rowCount;
    }
    if (manageTransaction) await client.query(dryRun ? 'rollback' : 'commit');
    return stats;
  } catch (error) {
    if (manageTransaction) await client.query('rollback');
    throw error;
  }
}
