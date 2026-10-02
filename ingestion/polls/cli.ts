import { connect } from '../lib/db.mjs';
import { loadProjectEnv, requireDbUrl } from '../lib/env.mjs';
import { downloadSondax, PollImportError } from './sondax.ts';
import { syncSondax } from './sync.ts';

loadProjectEnv();
const args = process.argv.slice(2);
const allowed = ['--dry-run', '--yes', '--publish', '--help'];
if (args.includes('--help')) {
  console.log('npm run polls:sync -- --dry-run\nnpm run polls:sync -- --yes [--publish]\nDB_PG_URL reste réservée au script interne.');
} else {
  try {
    if (args.some((arg) => !allowed.includes(arg)) || (!args.includes('--dry-run') && !args.includes('--yes')))
      throw new PollImportError('Utiliser --dry-run pour contrôler le CSV, ou --yes pour écrire ; --publish rend les mesures validées publiques.');
    if (args.includes('--dry-run')) {
      const data = await downloadSondax();
      console.log(JSON.stringify({ dryRun: true, polls: data.documents.length, scenarios: data.documents.flatMap((p) => p.scenarios).length,
        results: data.documents.flatMap((p) => p.scenarios).flatMap((s) => s.results).length,
        datasetUrl: data.datasetUrl, datasetHash: data.datasetHash, bytes: data.bytes, fallback: data.fallback }, null, 2));
    } else {
      const db = await connect(requireDbUrl(), { applicationName: 'preuve-publique-polls' });
      try { console.log(JSON.stringify(await syncSondax(db, { publish: args.includes('--publish') }), null, 2)); }
      finally { await db.end(); }
    }
  } catch (error) {
    console.error(error instanceof PollImportError ? error.message : 'Import impossible : vérifier DB_PG_URL, le réseau et la migration des sondages.');
    process.exitCode = 1;
  }
}
