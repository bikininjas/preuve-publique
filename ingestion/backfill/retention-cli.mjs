import { readArchive, retentionPlan, pruneArchivedVotes, restoreArchivedVotes } from './retention.mjs';
import { connect, startRun, finishRun } from '../lib/db.mjs';
import { loadProjectEnv, requireDbUrl } from '../lib/env.mjs';
const [mode,path,sha,flag]=process.argv.slice(2);
if (!['plan','prune','restore'].includes(mode)||!path||!sha||!['--yes','--dry-run',undefined].includes(flag)) throw new Error('Usage : retention-cli.mjs plan|prune|restore archive.json.gz sha256 [--yes|--dry-run]');
const archive=readArchive(path,sha);
if(mode==='plan')console.log(JSON.stringify(retentionPlan(archive)));
else{
 loadProjectEnv();const db=await connect(requireDbUrl());let run;
 const dryRun=flag!=='--yes';
 try{if(!dryRun)run=await startRun(db,{importer:`essential-votes-${mode}`,options:{archive_sha256:sha}});
  const stats=await (mode==='prune'?pruneArchivedVotes:restoreArchivedVotes)(db,archive,{dryRun});
  if(run)await finishRun(db,run,{status:'ok',stats});console.log(JSON.stringify(stats));
 }catch{if(run)await finishRun(db,run,{status:'error',error:'Opération annulée ; vérifier sauvegarde et état courant.'});console.error('Opération annulée ; aucune écriture de cette transaction.');process.exitCode=1;}finally{await db.end();}
}
