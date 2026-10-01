/** Download and verify the Sénat's official analysis by political group.
 * Usage: DB_PG_URL=... node ingestion/senat-group-votes.mjs [--write] [--limit=N]
 * Cached HTML is retained under the ignored .staging directory for audits/resume.
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import pg from 'pg';
import { parseSenatGroupVotes } from './lib/senat-group-votes.mjs';

const write = process.argv.includes('--write');
const limit = Number(process.argv.find((arg) => arg.startsWith('--limit='))?.split('=')[1] ?? 0);
const cache = join(import.meta.dirname, '.staging', 'senat-group-votes');
mkdirSync(cache, { recursive: true });
if (!process.env.DB_PG_URL) throw new Error('DB_PG_URL requis');
const db = new pg.Client({ connectionString: process.env.DB_PG_URL, ssl: { rejectUnauthorized: false } });
await db.connect();

async function fetchPage(vote) {
  const path = join(cache, `${vote.id}.html`);
  if (existsSync(path)) return readFileSync(path, 'utf8');
  if (!/^https:\/\/www\.senat\.fr\/scrutin-public\/\d{4}\/scr\d{4}-\d+\.html$/.test(vote.source_url)) {
    throw new Error('URL officielle inattendue');
  }
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(vote.source_url, { signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'PreuvePublique/1.0 (+https://preuve-publique-git-919818604436.europe-west1.run.app)' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      if (html.length < 10000) throw new Error('Page trop courte');
      writeFileSync(path, html);
      return html;
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
    }
  }
}

async function store(vote, parsed, sha256) {
  await db.query('begin');
  try {
    await db.query(`insert into public.vote_group_coverage
      (vote_id, official_pour, official_contre, official_abstention, official_non_votant, page_sha256)
      values ($1,$2,$3,$4,$5,$6)
      on conflict (vote_id) do update set official_pour=excluded.official_pour,
      official_contre=excluded.official_contre, official_abstention=excluded.official_abstention,
      official_non_votant=excluded.official_non_votant, page_sha256=excluded.page_sha256,
      processed_at=now()`, [vote.id, parsed.official.pour, parsed.official.contre,
      parsed.official.abstention, parsed.official.non_votant, sha256]);
    await db.query('delete from public.vote_group_tallies where vote_id=$1', [vote.id]);
    await db.query(`insert into public.vote_group_tallies
      (vote_id,group_ref,group_name,members,pour,contre,abstention,non_votant)
      select $1, g.group_ref, g.group_name, g.members, g.pour, g.contre,
        g.abstention, g.non_votant
      from jsonb_to_recordset($2::jsonb) as g(group_ref text,group_name text,
        members integer,pour integer,contre integer,abstention integer,non_votant integer)`,
    [vote.id, JSON.stringify(parsed.groups)]);
    await db.query('commit');
  } catch (error) {
    await db.query('rollback');
    throw error;
  }
}

try {
  const { rows } = await db.query(`select id, source_url from public.evidence
    where status='published' and kind='vote' and institution='senat'
    order by occurred_at desc, id desc ${limit > 0 ? `limit ${Math.floor(limit)}` : ''}`);
  let done = 0;
  const errors = [];
  for (const vote of rows) {
    try {
      const html = await fetchPage(vote);
      const parsed = parseSenatGroupVotes(html);
      if (write) await store(vote, parsed, createHash('sha256').update(html).digest('hex'));
      done++;
    } catch (error) {
      errors.push({ id: vote.id, url: vote.source_url, error: String(error.message ?? error) });
    }
    if ((done + errors.length) % 100 === 0) console.log(`${done + errors.length}/${rows.length}: ${done} vérifiés, ${errors.length} exclus`);
    if (!existsSync(join(cache, `${vote.id}.html`))) await new Promise((resolve) => setTimeout(resolve, 400));
  }
  writeFileSync(join(cache, write ? 'write-errors.json' : 'fetch-errors.json'), JSON.stringify(errors, null, 2));
  console.log(JSON.stringify({ total: rows.length, verified: done, excluded: errors.length, write }));
  if (errors.length) process.exitCode = 1;
} finally {
  await db.end();
}
