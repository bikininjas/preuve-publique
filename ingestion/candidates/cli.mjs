import { resolve } from 'node:path';
import { loadProjectEnv,requireDbUrl } from '../lib/env.mjs';
import { connect,startRun,finishRun } from '../lib/db.mjs';
import { syncCandidates,CandidateImportError } from './sync.mjs';
loadProjectEnv();
const args=process.argv.slice(2);
if(args.some((arg)=> !['--yes','--dry-run','--publish-facts','--current-snapshots-only'].includes(arg) && !arg.startsWith('--referential=') && !arg.startsWith('--votes='))) {
  console.error('Option inconnue.'); process.exitCode=1;
} else {
  let db,run;
  try {
    const value=(prefix,fallback)=>resolve(args.find((arg)=>arg.startsWith(prefix))?.slice(prefix.length) ?? fallback);
    db=await connect(requireDbUrl(),{applicationName:'preuve-publique-candidates'});
    run=await startRun(db,{importer:'candidate-facts',options:{dryRun:!args.includes('--yes') || args.includes('--dry-run'),publishFacts:args.includes('--publish-facts'),currentSnapshotsOnly:args.includes('--current-snapshots-only')}});
    const stats=await syncCandidates(db,{
      referential:value('--referential=','ingestion/.staging/an-referentiel/2026-09-30_17-15-18'),
      votes:value('--votes=','ingestion/.staging/an-scrutins/2026-09-30_07-28-18'),
      publish:args.includes('--publish-facts'),dryRun:!args.includes('--yes') || args.includes('--dry-run'),
      currentSnapshotsOnly:args.includes('--current-snapshots-only'),
    });
    await finishRun(db,run,{status:'ok',stats});
    console.log(JSON.stringify(stats,null,2));
  } catch(error) { const message=error instanceof CandidateImportError?error.message:'Import des candidats impossible : vérifier connexion, staging et migration.'; if(db && run) await finishRun(db,run,{status:'error',error:message}); console.error(message); process.exitCode=1; }
  finally { if(db) await db.end(); }
}
