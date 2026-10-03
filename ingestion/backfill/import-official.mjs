import { upsertSource, upsertEvidence } from '../lib/db.mjs';
import { matchesOfficialRecord } from '../lib/auto-publish.mjs';
import { selectEssentialVotes } from '../lib/vote-selection.mjs';

// This path consumes a replayed archive, never unverified external records.
// Originals remain on disk; inserts are bounded and reviewed rows are protected.
export async function importOfficial(db, verified, { dryRun = true } = {}) {
  const fetched = verified.eligible.length;
  if (verified.kind === 'vote') verified = { ...verified, eligible: selectEssentialVotes(verified.eligible) };
  const rows=verified.eligible.map(x=>x.record);
  // Source envelopes and actor descriptions are not stored in evidence rows.
  const bytes=Buffer.byteLength(JSON.stringify(rows.map(record=>({...record,source:undefined,actor:undefined}))));
  if (rows.length>50_000 || bytes>32_000_000 || !['assemblee','parlement_europeen','senat'].includes(verified.institution)) throw new Error('Budget ou archive non pris en charge.');
  const {rows:[size]}=await db.query('select pg_database_size(current_database())::text bytes');
  if (Number(size.bytes)+bytes*10>450_000_000) throw new Error('Budget gratuit : import annulé avant écriture.');
  const stats={dryRun,fetched,verified:rows.length,out_of_scope:fetched-rows.length,inserted:0,updated:0,unchanged:0,protected:0};
  await db.query('begin');
  try {
    await db.query('select pg_advisory_xact_lock(734001905)');
    const {rows:existing}=await db.query(`select e.*,e.occurred_at::text occurred_at from public.evidence e
      where institution=$1 and kind=$2 and external_id=any($3::text[]) for update`,[verified.institution,verified.kind,rows.map(r=>r.external_id)]);
    const previous=new Map(existing.map(r=>[r.external_id,r]));
    const sources=new Map(),inserts=[];
    for(const {record,source} of verified.eligible) {
      const old=previous.get(record.external_id);
      if(old && old.status!=='draft') {
        if(!matchesOfficialRecord(old,record)) throw new Error('Une pièce déjà validée diverge ; aucune écriture.');
        stats.protected++;continue;
      }
      if(!sources.has(source.url)) sources.set(source.url,await upsertSource(db,source));
      const sourceId=sources.get(source.url);
      if(old){const result=await upsertEvidence(db,record,{sourceId});stats[result.action]++;}
      else inserts.push({...record,source_id:sourceId,topics:record.topics??[]});
    }
    for(let offset=0;offset<inserts.length;offset+=400){
      const result=await db.query(`insert into public.evidence
        (source_id,title,excerpt,kind,institution,occurred_at,source_url,source_locator,external_id,status,detail,topics)
        select x.source_id,x.title,x.excerpt,x.kind,x.institution,x.occurred_at,x.source_url,x.source_locator,x.external_id,'draft',x.detail,x.topics
        from jsonb_to_recordset($1::jsonb) x(source_id uuid,title text,excerpt text,kind text,institution text,occurred_at date,source_url text,source_locator text,external_id text,detail jsonb,topics text[])`,[JSON.stringify(inserts.slice(offset,offset+400))]);
      stats.inserted+=result.rowCount;
    }
    await db.query(dryRun?'rollback':'commit');return stats;
  }catch(e){await db.query('rollback');throw e;}
}
