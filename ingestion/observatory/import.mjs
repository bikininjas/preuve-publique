import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildEvidence } from '../lib/normalize.mjs';
import { requestBuffer, sha256Hex } from '../lib/http.mjs';
import { canonicalJson, connect, startRun, finishRun, upsertEvidence } from '../lib/db.mjs';
import { loadProjectEnv, requireDbUrl } from '../lib/env.mjs';
import domains from '../../lib/inequality-domains.json' with { type: 'json' };
import { validateJudicialSnapshot } from '../../lib/judicial.ts';
import judicialEntities from '../../lib/judicial-entities.json' with { type: 'json' };
import { publishJudicial } from './publish-judicial.mjs';

const HOSTS = new Set(['www.cnccep.fr', 'www.insee.fr', 'www.cours-appel.justice.fr', 'www.cereq.fr', 'drees.solidarites-sante.gouv.fr', 'www.ipp.eu', 'www.enseignementsup-recherche.gouv.fr', 'www.defenseurdesdroits.fr', 'www.vie-publique.fr', 'www.info.gouv.fr', 'www.courdecassation.fr', 'www.tribunal-de-paris.justice.fr', 'www.elysee.fr', 'www.assemblee-nationale.fr']);
const KINDS = new Set(['program', 'statement', 'indicator', 'judicial_event']);
const JUDICIAL_HOSTS = new Set(['www.legifrance.gouv.fr', 'www.senat.fr', 'www2.assemblee-nationale.fr', 'www.europarl.europa.eu', 'www.publicsenat.fr', 'www.lemonde.fr', 'www.rtl.fr', 'www.mouvementdemocrate.fr', 'modemffe.mouvementdemocrate.fr', 'horizonsleparti.fr', 'lafranceinsoumise.fr', 'republicains.fr', 'www.pcf.fr']);
const allowedHost = (host, record) => HOSTS.has(host) || record.kind === 'judicial_event' && record.detail?.judicial?.snapshot && JUDICIAL_HOSTS.has(host);
const nonempty = (value) => typeof value === 'string' && Boolean(value.trim());
function validateCapture(fetched) {
  if (fetched.representation === 'rendered_dom') {
    if (fetched.sha256 !== null || fetched.captureSha256 !== sha256Hex(fetched.body) || !Number.isFinite(Date.parse(fetched.fetchedAt))) throw new Error('Capture sans provenance distincte de l’original.');
  } else if (!/^[a-f0-9]{64}$/.test(fetched.sha256 ?? '')) throw new Error('Empreinte du document absente.');
}

export function validateDocument(document) {
  if (!nonempty(document.edition) || !Array.isArray(document.records) || !document.records.length || document.records.length > 20) throw new Error('Lot éditorial invalide (1 à 20 pièces).');
  const keys = new Set();
  for (const record of document.records) {
    if (!KINDS.has(record.kind) || record.status && record.status !== 'draft') throw new Error('Import éditorial limité aux brouillons.');
    if (!nonempty(record.external_id) || keys.has(record.external_id)) throw new Error('Référence absente ou dupliquée.');
    keys.add(record.external_id);
    const url = new URL(record.source_url);
    if (url.protocol !== 'https:' || url.username || url.password || !allowedHost(url.hostname, record)) throw new Error('Source documentaire non autorisée.');
    if (!nonempty(record.source_locator) || !nonempty(record.source?.publisher) || !nonempty(record.source?.document_title)) throw new Error('Provenance incomplète.');
    if (record.excerpt && record.detail?.excerpt_type !== 'quote') throw new Error('Un extrait doit être identifié comme citation ; un résumé est distinct.');
    if (record.kind === 'program') {
      const p = record.detail?.program;
      if (!p || !['author', 'election', 'edition', 'election_date', 'date_note', 'scope_note'].every((key) => nonempty(p[key])) || !Object.hasOwn(p, 'publication_date')) throw new Error('Édition électorale incomplète.');
    }
    if (record.kind === 'statement') {
      const p = record.detail?.statement;
      if (!p || !['author', 'date', 'context', 'scope_note'].every((key) => nonempty(p[key])) || p.date !== record.occurred_at) throw new Error('Déclaration sans auteur, date, contexte ou limite.');
    }
    if (record.kind === 'indicator') {
      const p = record.detail?.indicator;
      if (!p || !Number.isFinite(p.value) || !['unit', 'period', 'geography', 'population', 'method', 'limits'].every((key) => nonempty(p[key])) || !Array.isArray(p.series) || !p.series.length || !p.series.every((row) => nonempty(row.period) && Number.isFinite(row.value))) throw new Error('Indicateur sans valeur, champ ou méthode.');
      if (p.series.at(-1).period !== p.period || p.series.at(-1).value !== p.value) throw new Error('Dernier point incompatible avec la valeur affichée.');
      if (p.domain && !domains.some(({ id }) => id === p.domain)) throw new Error('Domaine d’inégalité inconnu.');
      if (p.measurement_type && !['observation', 'simulation', 'testing'].includes(p.measurement_type)) throw new Error('Type de mesure inconnu.');
      // Une date SQL de classement ne doit pas inventer le jour de publication.
      if (p.publication_month !== undefined && (typeof p.publication_month !== 'string' || !/^\d{4}-(0[1-9]|1[0-2])$/.test(p.publication_month)
        || record.occurred_at !== `${p.publication_month}-01` || record.source?.published_at != null)) throw new Error('Précision mensuelle incompatible avec la date de publication.');
      if (p.comparisons !== undefined) {
        if (!nonempty(p.value_label) || !nonempty(p.comparison_note) || !Array.isArray(p.comparisons) || p.comparisons.length < 2 || p.comparisons.length > 10
          || !p.comparisons.every((row) => nonempty(row.label) && Number.isFinite(row.value) && !Object.hasOwn(row, 'unit') && !Object.hasOwn(row, 'period'))
          || new Set(p.comparisons.map((row) => row.label)).size !== p.comparisons.length
          || !p.comparisons.some((row) => row.label === p.value_label && row.value === p.value)) throw new Error('Comparaison sans dénominateur, groupes distincts ou valeur de référence.');
      }
      const markers = record.detail?.source_verification?.markers;
      if (markers !== undefined && (!Array.isArray(markers) || markers.length < 2 || !markers.every(nonempty))) throw new Error('Repères de vérification incomplets.');
    }
    if (record.kind === 'judicial_event') {
      const p = record.detail?.judicial;
      if (!p || !['case_id', 'court', 'stage', 'status_at_event', 'current_status_note', 'presumption_note'].every((key) => nonempty(p[key]))) throw new Error('Étape judiciaire sans contexte ni limite temporelle.');
      if (p.snapshot !== undefined) {
        if (!validateJudicialSnapshot(p.snapshot) || !p.snapshot.sources.some(s => s.url === record.source_url)) throw new Error('Synthèse judiciaire invalide ou sans source principale.');
        for (const source of p.snapshot.sources) if (!allowedHost(new URL(source.url).hostname, record)) throw new Error('Référence judiciaire hors répertoire autorisé.');
        for (const person of p.snapshot.participants) for (const affiliation of person.affiliations) {
          const entity = judicialEntities.entities.find(e => e.id === affiliation.entity_id);
          if (!entity || (entity.kind === 'group') !== (affiliation.basis === 'group_membership')) throw new Error('Formation ou base de rattachement incompatible.');
        }
      }
    }
  }
  return document;
}

/** Download and fingerprint once per URL; originals stay outside Postgres/Git. */
export async function prepareDocument(document, { fetchDocument = requestBuffer, archiveDir } = {}) {
  validateDocument(document);
  document = structuredClone(document);
  const sources = new Map();
  const records = [];
  let bytes = 0;
  for (const record of document.records) {
    if (!sources.has(record.source_url)) {
      const fetched = await fetchDocument(record.source_url, { timeoutMs: 30_000, retries: 1, minDelayMs: 300 });
      validateCapture(fetched);
      if (fetched.bytes > 10_000_000 || bytes + fetched.bytes > 25_000_000) throw new Error('Budget de téléchargement du lot dépassé.');
      const finalUrl = new URL(fetched.finalUrl);
      if (!allowedHost(finalUrl.hostname, record) || finalUrl.protocol !== 'https:') throw new Error('Redirection hors source autorisée.');
      if (new URL(record.source_url).pathname.endsWith('.pdf') && fetched.body.subarray(0, 5).toString() !== '%PDF-') throw new Error('Le document reçu n’est pas un PDF.');
      bytes += fetched.bytes;
      if (archiveDir) {
        mkdirSync(archiveDir, { recursive: true });
        writeFileSync(join(archiveDir, `${fetched.sha256 ?? fetched.captureSha256}.bin`), fetched.body);
      }
      sources.set(record.source_url, fetched);
    }
    const fetched = sources.get(record.source_url);
    if (fetched.body.subarray(0, 5).toString() !== '%PDF-') {
      const markers = record.detail?.source_verification?.markers
        ?? (record.source_url === 'https://www.insee.fr/fr/statistiques/8600989' ? ['2063', '15,4', '0,297', '07/07/2025'] : []);
      const plain = fetched.body.toString('utf8').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').normalize('NFKC').replace(/\s+/g, ' ');
      if (markers.length < 2 || !markers.every((marker) => plain.includes(marker.normalize('NFKC')))) throw new Error('L’édition officielle attendue n’est pas retrouvée.');
    }
    const snapshot = record.detail?.judicial?.snapshot;
    if (snapshot) {
      for (const source of snapshot.sources) {
        if (!sources.has(source.url)) {
          try {
            if (bytes >= 15_000_000) throw new Error('Budget des références complémentaires atteint.');
            const ref = await fetchDocument(source.url, { timeoutMs: 15_000, retries: 0, minDelayMs: 300 });
            validateCapture(ref);
            const url = new URL(ref.finalUrl);
            bytes += ref.bytes;
            if (!allowedHost(url.hostname, record) || url.protocol !== 'https:' || url.username || url.password || ref.bytes > 10_000_000 || bytes > 25_000_000) throw new Error('Référence hors budget ou source autorisée.');
            if (new URL(source.url).pathname.endsWith('.pdf') && ref.body.subarray(0, 5).toString() !== '%PDF-') throw new Error('Référence PDF indisponible.');
            if (archiveDir) writeFileSync(join(archiveDir, `${ref.sha256 ?? ref.captureSha256}.bin`), ref.body);
            sources.set(source.url, ref);
          } catch {
            // The editorial source was read during research; an unavailable
            // fingerprint remains explicit and requires human review.
            source.retrieval_note = 'Document consulté pendant la recherche ; récupération automatique de l’original non aboutie, empreinte à contrôler en relecture.';
          }
        }
        if (bytes > 25_000_000) throw new Error('Budget de téléchargement du lot dépassé.');
        const ref = sources.get(source.url);
        if (ref) {
          source.retrieved_at = ref.fetchedAt; source.sha256 = ref.sha256;
          if (ref.representation === 'rendered_dom') {
            source.capture_method = 'rendered_dom'; source.capture_sha256 = ref.captureSha256;
            source.retrieval_note = 'Texte de la page officielle consulté dans le navigateur. L’empreinte de cette capture est distincte de celle de l’original, dont le téléchargement automatique est indisponible.';
          }
        }
      }
    }
    records.push(buildEvidence({ ...record, institution: null,
      source: { ...record.source, url: record.source_url, retrieved_at: fetched.fetchedAt, sha256: fetched.sha256 },
      detail: { ...record.detail, editorial_batch: document.edition,
        ...(fetched.representation === 'rendered_dom' ? { source_capture: { method: 'rendered_dom', sha256: fetched.captureSha256, captured_at: fetched.fetchedAt, original_fingerprint_available: false } } : {}),
      },
    }));
  }
  return { edition: document.edition, records, sourceCount: sources.size, bytes };
}

export async function importDocument(db, prepared, { dryRun = true } = {}) {
  validateDocument({ edition: prepared.edition, records: prepared.records });
  await db.query('begin');
  const stats = { dryRun, sources: prepared.sourceCount, bytes: prepared.bytes, pieces: [], inserted: 0, updated: 0, unchanged: 0, locked_changed: 0 };
  try {
    // institution=null n’a pas de contrainte d’unicité SQL : sérialiser ce lot.
    await db.query("select pg_advisory_xact_lock(734001902)");
    for (const record of prepared.records) {
      // Protéger aussi l’empreinte de la source d’une pièce déjà relue :
      // upsertEvidence actualise sinon la source avant de verrouiller la pièce.
      const { rows } = await db.query(`select e.id,e.status,e.title,e.excerpt,e.occurred_at::text,e.source_url,e.source_locator,e.detail,s.sha256
        from public.evidence e join public.sources s on s.id=e.source_id
        where e.institution is null and e.kind=$1 and e.external_id=$2`, [record.kind, record.external_id]);
      const previous = rows[0];
      const { rows: sourceRows } = await db.query(`select s.sha256,
        exists(select 1 from public.evidence e where e.source_id=s.id and e.status<>'draft') as locked
        from public.sources s where s.url=$1`, [record.source.url]);
      const source = sourceRows[0];
      let result;
      if (source?.locked && source.sha256 !== record.source.sha256) {
        result = { id: previous?.id ?? null, status: previous?.status ?? 'draft', action: 'locked_changed' };
      } else if (previous && previous.status !== 'draft') {
        const changed = previous.sha256 !== record.source.sha256
          || ['title', 'excerpt', 'occurred_at', 'source_url', 'source_locator'].some((key) => (previous[key] ?? null) !== (record[key] ?? null))
          || canonicalJson(previous.detail) !== canonicalJson(record.detail);
        result = { id: previous.id, status: previous.status, action: changed ? 'locked_changed' : 'unchanged' };
      } else result = await upsertEvidence(db, record);
      stats[result.action] += 1;
      stats.pieces.push({ ...result, external_id: record.external_id });
    }
    if (prepared.records.some(r => r.kind === 'judicial_event' && r.detail?.judicial?.snapshot))
      stats.publication = await publishJudicial(db, { dryRun, manageTransaction: false });
    await db.query(dryRun ? 'rollback' : 'commit');
    return stats;
  } catch (error) {
    await db.query('rollback');
    throw error;
  }
}

export function parseOptions(args) {
  let file = new URL('./pilot.json', import.meta.url);
  let mode;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file' && args[i + 1] && !args[i + 1].startsWith('--') && file instanceof URL) file = resolve(args[++i]);
    else if (['--yes', '--dry-run'].includes(args[i]) && !mode) mode = args[i];
    else throw new Error('Options : --file chemin.json, --dry-run (défaut) ou --yes (écriture en brouillon).');
  }
  return { file, dryRun: mode !== '--yes' };
}

async function main() {
  const { file, dryRun } = parseOptions(process.argv.slice(2));
  const document = JSON.parse(readFileSync(file, 'utf8'));
  const prepared = await prepareDocument(document, { archiveDir: resolve('ingestion/.staging/observatoire/raw') });
  loadProjectEnv();
  const db = await connect(requireDbUrl(), { applicationName: 'preuve-publique-observatoire' });
  let run;
  try {
    if (!dryRun) run = await startRun(db, { importer: 'observatoire-editorial', options: { edition: prepared.edition, dryRun } });
    const stats = await importDocument(db, prepared, { dryRun });
    if (run) await finishRun(db, run, { status: stats.locked_changed ? 'partial' : 'ok', stats });
    console.log(JSON.stringify(stats, null, 2));
  } catch (error) {
    if (run) await finishRun(db, run, { status: 'error', error: 'Import éditorial interrompu ; aucune pièce du lot écrite.' });
    throw error;
  } finally { await db.end(); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(`Import interrompu${/^[A-Z0-9]{5}$/.test(error.code ?? '') ? ` (code ${error.code})` : ''}. Vérifier sources, migration et connexion d’ingestion ; aucun secret n’est affiché.`); process.exitCode = 1; });
}
