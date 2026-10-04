#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadProjectEnv, requireDbUrl, PROJECT_ROOT } from './lib/env.mjs';
import { connect, startRun, finishRun } from './lib/db.mjs';
import { PE_API, peGetJson } from './lib/pe.mjs';
import { sha256Hex } from './lib/http.mjs';
import { saveRaw, writeJson, readJson } from './lib/staging.mjs';
import { adoptedSubjectIndex, plenaryDocumentSubject, applySubjectPlan } from './lib/pe-subjects.mjs';
import { peDocumentReference } from '../lib/pe-document.ts';

const args = new Set(process.argv.slice(2));
if (args.has('--help')) {
  console.log('npm run pe:subjects -- [--dry-run | --yes] [--offline]\nComplète les sujets des scrutins européens publiés ; défaut : préparation sans écriture.\n--offline réutilise seulement les sources déjà en base et le cache vérifié.');
  process.exit(0);
}
if ([...args].some(arg => !['--dry-run', '--yes', '--offline'].includes(arg)) || (args.has('--yes') && args.has('--dry-run'))) throw new Error('Options invalides ; consulter --help.');
loadProjectEnv();
const cacheDir = join(PROJECT_ROOT, 'ingestion', '.staging', 'pe-subjects');
mkdirSync(join(cacheDir, 'raw'), { recursive: true });
const client = await connect(requireDbUrl(), { applicationName: 'preuve-publique-pe-subjects' });
let runId;
try {
  await client.query("set statement_timeout='30s'");
  const { rows: votes } = await client.query("select id,title,status,detail from public.evidence where institution='parlement_europeen' and kind='vote' and status='published' order by occurred_at desc,id");
  const { rows: texts } = await client.query(`select e.id,e.title,e.source_url,e.source_locator,e.detail,s.retrieved_at,s.sha256
    from public.evidence e join public.sources s on s.id=e.source_id
    where e.institution='parlement_europeen' and e.kind='adopted_text' and e.status='published' order by e.id`);
  const index = adoptedSubjectIndex(texts);
  const patches = [], unresolved = [], failures = [];
  const documents = new Map();
  for (const vote of votes) {
    if (vote.detail?.text_subject) continue;
    const ref = peDocumentReference(vote.title);
    if (!ref) { unresolved.push({ id: vote.id, title: vote.title, reason: 'no_document_reference' }); continue; }
    let subject = index.get(ref.id);
    if (!subject) {
      if (!documents.has(ref.id)) {
        const metadataFile = join(cacheDir, `${ref.id}.json`);
        const documentUrl = `${PE_API}/${ref.id.startsWith('C-') ? 'documents' : 'plenary-documents'}/${ref.id}?language-filter=fr`;
        try {
          let source, json;
          if (existsSync(metadataFile)) {
            const cached = readJson(metadataFile);
            const body = readFileSync(join(cacheDir, 'raw', `${ref.id}.json`));
            if (sha256Hex(body) !== cached.sha256 || cached.url !== documentUrl) throw new Error('Cache européen discordant.');
            source = cached; json = JSON.parse(body);
          } else if (!args.has('--offline')) {
            const response = await peGetJson(documentUrl, { minDelayMs: 1500, timeoutMs: 20_000 });
            saveRaw(cacheDir, `${ref.id}.json`, response.body);
            source = { url: response.url, retrievedAt: response.fetchedAt, sha256: response.sha256 };
            json = response.json;
            writeJson(metadataFile, source);
          }
          documents.set(ref.id, json ? plenaryDocumentSubject(json, ref.id, source) : null);
        } catch (error) {
          failures.push({ document_id: ref.id, error: error.message }); documents.set(ref.id, null);
          console.log(`${ref.id} : ${error.message}`);
        }
        if (documents.size % 20 === 0) console.log(`${documents.size} documents consultés ; ${failures.length} indisponibles`);
      }
      subject = documents.get(ref.id);
    }
    if (subject) patches.push({ ...vote, subject });
    else unresolved.push({ id: vote.id, document_id: ref.id, reason: 'subject_unavailable' });
  }
  writeJson(join(cacheDir, 'plan.json'), { created_at: new Date().toISOString(), patches, unresolved, failures });
  console.log(JSON.stringify({ examined: votes.length, prepared: patches.length, unresolved: unresolved.length, failures: failures.length }));
  if (args.has('--yes') || args.has('--dry-run')) {
    runId = await startRun(client, { importer: 'pe-subjects', options: { dry_run: !args.has('--yes'), offline: args.has('--offline') } });
    const stats = await applySubjectPlan(client, patches, { dryRun: !args.has('--yes') });
    await finishRun(client, runId, { status: stats.conflicts || failures.length ? 'partial' : 'ok', stats: { ...stats, unresolved: unresolved.length, failures: failures.length } });
    console.log(JSON.stringify({ ...stats, dry_run: !args.has('--yes') }));
  }
} catch (error) {
  if (runId) await finishRun(client, runId, { status: 'error', error: error.message });
  throw error;
} finally { await client.end(); }
