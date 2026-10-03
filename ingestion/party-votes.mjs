/**
 * Reconstruct party ballot counts from official AN individual roll calls and
 * one dated affiliation in the official actor reference. Dry run by default.
 * Staging archives are local; no privileged database URL enters the website.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { connect, startRun, finishRun } from './lib/db.mjs';
import { loadProjectEnv, requireDbUrl } from './lib/env.mjs';
import { parseZip } from './importers/an-scrutins.mjs';
import { aggregatePartyVotes } from './lib/party-vote-aggregation.mjs';

const NON_PARTY_LABELS = new Set(['Non déclaré(s)', 'Non rattaché(s)']);
const stagingArg = process.argv.find((arg) => arg.startsWith('--staging='));
const STAGING = path.resolve(stagingArg?.slice('--staging='.length) ?? 'ingestion/.staging/an-scrutins/2026-09-30_07-28-18');

async function main() {
  loadProjectEnv();
  const client = await connect(requireDbUrl());
  let run;
  try {
    const manifest = JSON.parse(fs.readFileSync(path.join(STAGING, 'manifest.json'), 'utf8'));
    if (manifest.importer !== 'an-scrutins') throw new Error('Staging AN invalide');
    const votesResult = await client.query(`
      select e.id, e.external_id, e.occurred_at::date::text as day,
             s.url as archive_url, s.sha256 as archive_sha256
      from public.evidence e join public.sources s on s.id = e.source_id
      where e.status = 'published' and e.kind = 'vote' and e.institution = 'assemblee'
    `);
    const published = new Map(votesResult.rows.map((row) => [row.external_id, row]));
    const affiliationResult = await client.query(`
      select replace(person.external_id, 'an-acteur:', '') as person_ref,
             relation.to_actor_id as party_id,
             party.name as party_name,
             relation.started_at::text, relation.ended_at::text
      from public.actor_relations relation
      join public.actors person on person.id = relation.from_actor_id and person.kind = 'person'
      join public.actors party on party.id = relation.to_actor_id and party.kind = 'party'
      where relation.relation = 'affiliated_to'
    `);
    const affiliations = new Map();
    for (const row of affiliationResult.rows) {
      if (NON_PARTY_LABELS.has(row.party_name)) continue;
      const entries = affiliations.get(row.person_ref) ?? [];
      entries.push(row);
      affiliations.set(row.person_ref, entries);
    }
    const rows = [];
    const coverage = [];
    const found = new Set();
    const stats = { published: published.size, found: 0, documented: 0, recorded: 0, unattributed: 0, conflicts: 0, parties: 0, empty: 0, officialCountDifferences: [] };
    for (const archive of manifest.raw) {
      const file = path.join(STAGING, archive.file);
      if (!fs.existsSync(file)) throw new Error(`Archive absente : ${archive.file}`);
      const bytes = fs.readFileSync(file);
      const hash = createHash('sha256').update(bytes).digest('hex');
      if (hash !== archive.sha256) throw new Error(`Empreinte de l'archive invalide : ${archive.file}`);
      const result = await parseZip(bytes, (_name, content) => {
        const scrutin = JSON.parse(content).scrutin;
        const vote = published.get(scrutin?.uid);
        if (!vote) return;
        if (found.has(scrutin.uid)) throw new Error(`Scrutin dupliqué : ${scrutin.uid}`);
        found.add(scrutin.uid);
        if (vote.archive_sha256 !== hash || vote.archive_url !== archive.url) {
          throw new Error(`Archive différente de la source en base : ${scrutin.uid}`);
        }
        const tally = aggregatePartyVotes(scrutin, affiliations, vote.day);
        stats.conflicts += tally.conflicts;
        const total = scrutin.syntheseVote?.decompte ?? {};
        const officialCount = ['pour', 'contre', 'abstentions', 'nonVotants'].reduce((sum, key) => sum + Number(total[key] ?? 0), 0);
        if (tally.recorded !== officialCount) {
          stats.officialCountDifferences.push({ uid: scrutin.uid, recorded: tally.recorded, officialCount });
          return;
        }
        if (tally.conflicts) throw new Error(`Positions nominatives conflictuelles : ${scrutin.uid}`);
        const attributed = [...tally.parties.values()].reduce((sum, counts) =>
          sum + counts.pour + counts.contre + counts.abstention + counts.non_votant, 0);
        if (attributed + tally.unattributed !== tally.recorded) throw new Error(`Décompte des partis incohérent : ${scrutin.uid}`);
        stats.documented += 1;
        stats.recorded += tally.recorded;
        stats.unattributed += tally.unattributed;
        if (!tally.parties.size) stats.empty += 1;
        coverage.push({ voteId: vote.id, recorded: tally.recorded, unattributed: tally.unattributed, officialCount, hash });
        for (const [partyId, counts] of tally.parties) {
          rows.push({ voteId: vote.id, partyId, counts });
        }
      });
      if (result.errors.length) throw new Error(`${archive.file} : ${result.errors[0]}`);
    }
    stats.found = found.size;
    stats.parties = rows.length;
    if (stats.found !== stats.published) throw new Error(`${stats.published - stats.found} scrutin(s) publié(s) absent(s) des archives`);
    const { rows: existing } = await client.query('select vote_id from public.vote_party_coverage');
    const existingIds = new Set(existing.map((row) => row.vote_id));
    let additions = coverage.filter((row) => !existingIds.has(row.voteId));
    let additionIds = new Set(additions.map((row) => row.voteId));
    let newTallies = rows.filter((row) => additionIds.has(row.voteId));
    stats.preserved = coverage.length - additions.length;
    stats.newCoverage = additions.length;
    stats.newTallies = newTallies.length;
    if (!process.argv.includes('--write')) { console.log(JSON.stringify(stats)); return; }
    const { rows: [{ table_ready: tableReady }] } = await client.query("select to_regclass('public.vote_party_tallies') is not null as table_ready");
    if (!tableReady) throw new Error('Migration vote_party_tallies absente');
    run = await startRun(client, { importer: 'an-party-coverage-backfill', options: { staging: path.basename(STAGING), preserveExisting: true } });
    await client.query('begin');
    try {
      await client.query('select pg_advisory_xact_lock(734001904)');
      const { rows: current } = await client.query('select vote_id from public.vote_party_coverage');
      const currentIds = new Set(current.map((row) => row.vote_id));
      additions = coverage.filter((row) => !currentIds.has(row.voteId));
      additionIds = new Set(additions.map((row) => row.voteId));
      newTallies = rows.filter((row) => additionIds.has(row.voteId));
      stats.preserved = coverage.length - additions.length;
      stats.newCoverage = additions.length;
      stats.newTallies = newTallies.length;
      for (let offset = 0; offset < additions.length; offset += 200) {
        await client.query(`
          insert into public.vote_party_coverage
            (vote_id, recorded_individuals, unattributed_individuals, official_individuals, archive_sha256)
          select x.vote_id, x.recorded, x.unattributed, x.official_count, x.hash
          from jsonb_to_recordset($1::jsonb) as x(vote_id uuid, recorded int, unattributed int, official_count int, hash text)
          on conflict (vote_id) do nothing
        `, [JSON.stringify(additions.slice(offset, offset + 200).map((row) => ({
          vote_id: row.voteId, recorded: row.recorded, unattributed: row.unattributed,
          official_count: row.officialCount, hash: row.hash,
        })))]);
      }
      for (let offset = 0; offset < newTallies.length; offset += 500) {
        await client.query(`
          insert into public.vote_party_tallies
            (vote_id, party_id, pour, contre, abstention, non_votant)
          select x.vote_id, x.party_id, x.pour, x.contre, x.abstention, x.non_votant
          from jsonb_to_recordset($1::jsonb) as x(vote_id uuid, party_id uuid,
            pour int, contre int, abstention int, non_votant int)
          on conflict (vote_id, party_id) do nothing
        `, [JSON.stringify(newTallies.slice(offset, offset + 500).map((row) => ({
          vote_id: row.voteId, party_id: row.partyId, ...row.counts,
        })))]);
      }
      await client.query('commit');
      await finishRun(client, run, { status: 'ok', stats });
      console.log(JSON.stringify(stats));
    } catch (error) {
      await client.query('rollback');
      await finishRun(client, run, { status: 'error', error: 'Reprise annulée ; aucun décompte existant modifié.' });
      throw error;
    }
  } finally {
    await client.end();
  }
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
