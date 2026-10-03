import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { canonicalJson } from '../lib/db.mjs';
import { selectEssentialVotes } from '../lib/vote-selection.mjs';

export const ARCHIVE_TABLES = ['sources','evidence','vote_party_coverage','vote_group_coverage','vote_party_tallies','vote_group_tallies','candidate_ballots','evidence_links','policy_measure_evidence'];
export function readArchive(path, expectedSha256) {
  const bytes = readFileSync(path);
  if (!/^[a-f0-9]{64}$/.test(expectedSha256 ?? '') || createHash('sha256').update(bytes).digest('hex') !== expectedSha256) throw new Error('Empreinte de sauvegarde discordante.');
  const archive = JSON.parse(gunzipSync(bytes, {maxOutputLength: 256_000_000}));
  if (archive.version !== 1 || ARCHIVE_TABLES.some(table => !Array.isArray(archive.tables?.[table]))) throw new Error('Sauvegarde incomplète.');
  return archive;
}
const touches = (row, ids) => [row.vote_id,row.evidence_id,row.from_id,row.to_id].some(id => ids.has(id));
const normalized = row => {
  const copy = JSON.parse(JSON.stringify(row));
  // The visibility operation updates these fields; documentary content must still match.
  delete copy.status; delete copy.updated_at;
  return canonicalJson(copy);
};
const sorted = rows => rows.map(normalized).sort();

export function retentionPlan(archive) {
  const votes = archive.tables.evidence;
  if (votes.some(row => row.kind !== 'vote') || votes.length > 100_000) throw new Error('Périmètre de sauvegarde invalide.');
  const keep = new Set(selectEssentialVotes(votes).map(row => row.id));
  const ids = new Set(votes.filter(row => !keep.has(row.id)).map(row => row.id));
  const removed = {evidence:ids.size};
  for (const table of ARCHIVE_TABLES.filter(table => !['sources','evidence'].includes(table))) removed[table] = archive.tables[table].filter(row => touches(row,ids)).length;
  return {ids:[...ids],retained:keep.size,removed};
}

// A separately approved physical cleanup. Nothing is deleted unless the backup,
// current rows, dependent rows and current selection all agree in one transaction.
export async function pruneArchivedVotes(client, archive, {dryRun=true}={}) {
  const plan = retentionPlan(archive);
  const ids = new Set(plan.ids);
  await client.query('begin');
  try {
    await client.query('select pg_advisory_xact_lock(734001905)');
    const {rows:allVotes} = await client.query("select * from public.evidence where kind='vote' for update");
    const currentKeep = new Set(selectEssentialVotes(allVotes).map(row => row.id));
    const current = allVotes.filter(row => ids.has(row.id));
    if (current.length !== ids.size || current.some(row => row.status !== 'draft' || currentKeep.has(row.id))) throw new Error('Statut ou sélection modifiés : nouvelle préparation nécessaire.');
    const original = archive.tables.evidence.filter(row => ids.has(row.id));
    if (canonicalJson(sorted(original)) !== canonicalJson(sorted(current))) throw new Error('Une pièce a changé depuis la sauvegarde.');
    const dependent = {};
    for (const table of ARCHIVE_TABLES.filter(table => !['sources','evidence'].includes(table))) {
      const rows = (await client.query(`select * from public.${table} for update`)).rows.filter(row => touches(row,ids));
      if (rows.some(row => ['reviewed','published'].includes(row.status))) throw new Error('Une dépendance validée bloque le retrait.');
      if (canonicalJson(sorted(rows)) !== canonicalJson(sorted(archive.tables[table].filter(row => touches(row,ids))))) throw new Error('Une dépendance a changé depuis la sauvegarde.');
      dependent[table] = rows.length;
    }
    // Non-cascading foreign keys first; tallies follow their coverage through CASCADE.
    await client.query('delete from public.evidence_links where from_id=any($1::uuid[]) or to_id=any($1::uuid[])',[plan.ids]);
    await client.query('delete from public.candidate_ballots where vote_id=any($1::uuid[])',[plan.ids]);
    await client.query('delete from public.policy_measure_evidence where evidence_id=any($1::uuid[])',[plan.ids]);
    const result = await client.query("delete from public.evidence where id=any($1::uuid[]) and status='draft'",[plan.ids]);
    if (result.rowCount !== ids.size) throw new Error('Nombre de suppressions divergent.');
    await client.query(dryRun?'rollback':'commit');
    return {dryRun,removed:{evidence:result.rowCount,...dependent},retained:plan.retained};
  } catch(error) {await client.query('rollback');throw error;}
}

export async function restoreArchivedVotes(client, archive, {dryRun=true}={}) {
  await client.query('begin');
  const restored={};
  try {
    await client.query('select pg_advisory_xact_lock(734001905)');
    for (const table of ARCHIVE_TABLES) {
      const {rows:columns} = await client.query("select column_name from information_schema.columns where table_schema='public' and table_name=$1 and is_generated='NEVER' order by ordinal_position",[table]);
      if (!columns.length) throw new Error('Schéma absent pour restauration.');
      const names=columns.map(({column_name})=>`"${column_name.replaceAll('"','""')}"`).join(',');
      restored[table]=0;
      for(let offset=0;offset<archive.tables[table].length;offset+=500){
        const result=await client.query(`insert into public.${table} (${names}) select ${names} from jsonb_populate_recordset(null::public.${table},$1::jsonb) on conflict do nothing`,[JSON.stringify(archive.tables[table].slice(offset,offset+500))]);
        restored[table]+=result.rowCount;
      }
    }
    await client.query(dryRun?'rollback':'commit');
    return {dryRun,restored};
  }catch(error){await client.query('rollback');throw error;}
}
