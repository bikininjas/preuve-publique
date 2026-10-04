import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { readManifest } from '../lib/staging.mjs';
import { parseZip } from '../importers/an-dossiers.mjs';
import { finalAdoption } from '../lib/final-adoption.mjs';
import { focusPublishedVotes } from '../lib/vote-selection.mjs';
import { connect, startRun, finishRun } from '../lib/db.mjs';
import { loadProjectEnv, requireDbUrl } from '../lib/env.mjs';

async function main() {
  const args=process.argv.slice(2), index=args.indexOf('--staging');
  if(index<0||!args[index+1]||args.some((a,i)=>![index,index+1].includes(i)&&!['--yes','--dry-run'].includes(a)))throw new Error('Utiliser --staging dossier et --yes ou --dry-run.');
  const dryRun=!args.includes('--yes'),dir=resolve(args[index+1]),manifest=readManifest(dir);
  if(manifest.importer!=='an-dossiers')throw new Error('Archive de dossiers législatifs requise.');
  const proofs=[];
  for(const raw of manifest.raw){
    if(!/^https:\/\/data\.assemblee-nationale\.fr\/static\/openData\/repository\/(15|16|17)\/loi\/dossiers_legislatifs\//.test(raw.url))throw new Error('Archive non officielle.');
    const path=resolve(dir,raw.file);if(!path.startsWith(dir+ '\\')&&!path.startsWith(dir+'/'))throw new Error('Chemin hors staging.');
    const bytes=readFileSync(path);if(bytes.length!==raw.bytes||createHash('sha256').update(bytes).digest('hex')!==raw.sha256)throw new Error('Archive modifiée.');
    const source={url:raw.url,sha256:raw.sha256,retrieved_at:raw.fetched_at};
    const result=await parseZip(bytes,(_,text)=>{const d=JSON.parse(text).dossierParlementaire;if(d){const p=finalAdoption(d,source);if(p)proofs.push(p);}});
    if(result.errors.length)throw new Error('Dossier illisible.');
  }
  loadProjectEnv();const db=await connect(requireDbUrl(),{applicationName:'preuve-publique-final-votes'});let run;
  const stats={dry_run:dryRun,proofs:proofs.length,institutions:[]};
  try{
    if(!dryRun)run=await startRun(db,{importer:'final-adoption-focus',options:{source_manifest:manifest.created_at,physical_deletion:false}});
    await db.query('begin');
    for(const institution of ['assemblee','senat','parlement_europeen']){
      const before=(await db.query("select count(*)::int n from evidence where kind='vote' and institution=$1 and status='published'",[institution])).rows[0].n;
      const withdrawn=await focusPublishedVotes(db,institution,proofs);stats.institutions.push({institution,before,retained:before-withdrawn,withdrawn});
    }
    await db.query(dryRun?'rollback':'commit');if(run)await finishRun(db,run,{status:'ok',stats});console.log(JSON.stringify(stats));
  }catch(error){await db.query('rollback');if(run)await finishRun(db,run,{status:'error',error:'Recentrage interrompu ; consulter les preuves de procédure.'});throw error;}
  finally{await db.end();}
}
main().catch(()=>{console.error('Recentrage interrompu. Aucun secret affiché.');process.exitCode=1;});
