import { appendFileSync, writeFileSync } from 'node:fs';
import { loadProjectEnv, requireDbUrl } from '../lib/env.mjs';
import { connect } from '../lib/db.mjs';
import { syncDaily } from './sync.mjs';

loadProjectEnv();
const args = process.argv.slice(2);
const institution = args.find(arg => arg.startsWith('--institution='))?.split('=')[1];
const dryRun = !args.includes('--yes') || args.includes('--dry-run');
let client;
try {
  client = await connect(requireDbUrl(), { applicationName: 'preuve-publique-scrutins-quotidiens' });
  const stats = await syncDaily(client, { institution, dryRun });
  console.log(JSON.stringify(stats, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Scrutins ${institution}\n\n${dryRun ? 'Simulation, transaction annulée.' : 'Synchronisation appliquée.'}\n\nDernier vote à la source : ${stats.source_latest}. ${stats.recent} récents, ${stats.inserted} nouveaux, ${stats.published} publiés.\n\n\`\`\`json\n${JSON.stringify(stats, null, 2)}\n\`\`\`\n`);
  if (process.env.SCRUTINS_REPORT) writeFileSync(process.env.SCRUTINS_REPORT, JSON.stringify(stats, null, 2));
} catch {
  console.error('Synchronisation des scrutins échouée : vérifier institution, source officielle, connexion et journal /admin/runs. Aucun identifiant de connexion n’est affiché.');
  process.exitCode = 1;
} finally { if (client) await client.end(); }
