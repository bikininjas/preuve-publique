import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { validateJudicialSnapshot } from '../../lib/judicial.ts';
import { loadProjectEnv, requireDbUrl } from '../lib/env.mjs';
import { connect, startRun, finishRun } from '../lib/db.mjs';

const court = url => /^https:\/\/(?:www\.)?(?:tribunal-de-paris\.justice\.fr|courdecassation\.fr|cours-appel\.justice\.fr|justice\.gouv\.fr|legifrance\.gouv\.fr)\//.test(url);
const receipt = source => !!source.retrieved_at && (/^[a-f0-9]{64}$/.test(source.sha256 ?? '')
  || source.capture_method === 'rendered_dom' && /^[a-f0-9]{64}$/.test(source.capture_sha256 ?? ''));
export function judicialPublicationEligible(row) {
  const snapshot = row.detail?.judicial?.snapshot;
  if (!validateJudicialSnapshot(snapshot) || !court(row.source_url) || !row.source_locator) return false;
  if (!snapshot.sources.some(s => s.url === row.source_url && s.kind === 'judiciary' && receipt(s))) return false;
  return snapshot.participants.every(p => p.finality !== 'final'
    || snapshot.sources.some(s => s.url === p.finality_source?.url && s.kind === 'judiciary' && receipt(s)));
}

export async function publishJudicial(db, { dryRun = true, manageTransaction = true } = {}) {
  if (manageTransaction) await db.query('begin');
  try {
    await db.query('select pg_advisory_xact_lock(734001902)');
    const { rows } = await db.query(`select id,title,source_url,source_locator,detail from public.evidence
      where kind='judicial_event' and status='draft' and reviewed_by is null and reviewed_at is null
      and not exists(select 1 from public.evidence newer where newer.kind='judicial_event'
        and newer.detail->'judicial'->>'case_id'=evidence.detail->'judicial'->>'case_id'
        and (newer.occurred_at,newer.id)>(evidence.occurred_at,evidence.id)) for update`);
    const ids = rows.filter(judicialPublicationEligible).map(r => r.id);
    const result = await db.query(`update public.evidence set status='published', publication_method='judicial_source_verified',
      publication_confidence=null, reviewed_by=null, reviewed_at=null,
      publication_checks=$2::jsonb, detail=jsonb_set(detail,'{publication}',$3::jsonb)
      where id=any($1::uuid[]) and status='draft'`, [ids, JSON.stringify({ primary_source_verified:true,
        roles_motifs_finality_checked:true,dated_affiliations_only:true,user_requested_without_review:true,human_review:false }),
        JSON.stringify({ published_at:new Date().toISOString(),policy:'faits judiciaires sourcés, sans relecture humaine' })]);
    if (manageTransaction) await db.query(dryRun ? 'rollback' : 'commit');
    return { dry_run:dryRun,examined:rows.length,published:result.rowCount,awaiting_source:rows.length-ids.length };
  } catch (error) { if (manageTransaction) await db.query('rollback'); throw error; }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length>1 || args.some(a=>!['--yes','--dry-run'].includes(a))) throw new Error('Utiliser --yes ou --dry-run.');
  const dryRun=!args.includes('--yes'); loadProjectEnv();
  const db=await connect(requireDbUrl(),{applicationName:'preuve-publique-justice-publication'});
  let run;
  try {
    if(!dryRun) run=await startRun(db,{importer:'judicial-publication',options:{policy:'primary_sources_without_human_review'}});
    const stats=await publishJudicial(db,{dryRun});
    if(run)await finishRun(db,run,{status:'ok',stats});
    console.log(JSON.stringify(stats));
  } catch(error){if(run)await finishRun(db,run,{status:'error',error:'Publication judiciaire interrompue, vérifier les sources et la migration.'});throw error;}
  finally{await db.end();}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)main().catch(()=>{console.error('Publication judiciaire interrompue. Aucun secret affiché.');process.exitCode=1;});
