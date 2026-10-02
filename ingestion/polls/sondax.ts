import { parseCsv } from '../lib/csv.mjs';
import { requestBuffer, sha256Hex } from '../lib/http.mjs';
import { canonicalJson } from '../lib/db.mjs';
import { configurationKey, isDate } from '../../lib/polls/query.ts';
import type { PollDocument, PollScenario } from '../../lib/polls/types.ts';

export const SONDAX_URL = 'https://sondax.fr/donnees/sondages-presidentielle-2027.csv';
export const MIRROR_URL = 'https://www.data.gouv.fr/api/1/datasets/r/6b97e100-6031-42e0-9c93-aeb9dd49ef0d';
export const COLUMNS = ['sondage_id', 'institut', 'terrain_debut', 'terrain_fin', 'echantillon', 'tour',
  'configuration', 'configuration_principale', 'echantillon_configuration', 'candidat_id', 'candidat',
  'parti', 'score', 'source', 'wikipedia_revid', 'url_source'];

export class PollImportError extends Error {}
export function documentHash(document: PollDocument): string { return sha256Hex(canonicalJson(document)); }

export function parseSondax(input: Uint8Array | string): PollDocument[] {
  let text: string;
  try { text = typeof input === 'string' ? input : new TextDecoder('utf-8', { fatal: true }).decode(input); }
  catch { throw new PollImportError('CSV Sondax : UTF-8 invalide.'); }
  const rows = parseCsv(text.replace(/^\uFEFF/, ''), ',', true);
  const header = rows.shift();
  if (!header || header.length !== COLUMNS.length || new Set(header).size !== header.length
      || COLUMNS.some((column) => !header.includes(column))) {
    throw new PollImportError('Schéma CSV Sondax inattendu : colonnes absentes, ajoutées ou dupliquées.');
  }
  if (!rows.length || rows.length > 100000) throw new PollImportError('CSV vide ou volume supérieur à la limite de 100 000 lignes.');
  const documents = new Map<string, PollDocument>();
  rows.forEach((cells, index) => {
    const fail = (reason: string): never => { throw new PollImportError(`CSV Sondax, ligne ${index + 2} : ${reason}`); };
    if (cells.length !== header.length) fail('nombre de colonnes incohérent.');
    const row = Object.fromEntries(header.map((key, i) => [key, cells[i]]));
    const required = (key: string) => {
      const value = row[key].trim().normalize('NFC');
      if (!value || value.length > 2000) fail(`${key} vide ou trop long.`);
      return value;
    };
    const integer = (key: string, nullable = false): number | null => {
      const value = row[key].trim();
      if (nullable && value === '') return null;
      if (!/^\d+$/.test(value) || Number(value) < 1 || !Number.isSafeInteger(Number(value)) || Number(value) > 2147483647) fail(`${key} invalide.`);
      return Number(value);
    };
    const id = required('sondage_id'), institute = required('institut');
    const start = required('terrain_debut'), end = required('terrain_fin');
    if (!isDate(start) || !isDate(end) || start > end) fail('dates de terrain invalides.');
    const sample = integer('echantillon', true), scenarioSample = integer('echantillon_configuration', true);
    if (sample && scenarioSample && scenarioSample > sample) fail('échantillon de configuration supérieur au total.');
    const roundValue = integer('tour');
    if (roundValue !== 1 && roundValue !== 2) fail('tour invalide.');
    const round = roundValue as 1 | 2;
    const scenarioNumber = integer('configuration') as number;
    const primaryValue = row.configuration_principale.trim();
    if (!['', '0', '1'].includes(primaryValue) || (round === 1 && primaryValue === '') || (round === 2 && primaryValue !== '')) fail('configuration_principale incohérente.');
    const isPrimary = primaryValue === '' ? null : primaryValue === '1';
    const candidateId = required('candidat_id');
    if (!/^[a-z0-9][a-z0-9_-]*$/.test(candidateId)) fail('candidat_id invalide.');
    const candidateName = required('candidat'), sourceOrigin = required('source');
    if (!['wikipedia', 'manuel'].includes(sourceOrigin)) fail('source inconnue.');
    const revision = row.wikipedia_revid.trim() || null;
    if ((revision && !/^\d+$/.test(revision)) || (sourceOrigin === 'wikipedia' && !revision)) fail('révision Wikipédia invalide ou absente.');
    // Validate the original URL without reserializing, trimming or changing it.
    const sourceUrl = row.url_source;
    try {
      const url = new URL(sourceUrl);
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || sourceUrl !== sourceUrl.trim() || /[\u0000-\u0020]/.test(sourceUrl)) fail('url_source invalide.');
    } catch { fail('url_source invalide.'); }
    const scoreValue = row.score.trim();
    if (!/^\d+(\.\d+)?$/.test(scoreValue) || Number(scoreValue) > 100) fail('score hors de [0, 100].');
    const metadata = { external_id: id, institute, fieldwork_start: start, fieldwork_end: end,
      sample_size: sample, source_provider: 'sondax', source_url: sourceUrl,
      source_origin: sourceOrigin, wikipedia_revision: revision };
    let document = documents.get(id);
    if (!document) { document = { ...metadata, scenarios: [] }; documents.set(id, document); }
    else {
      const { scenarios: _scenarios, ...previous } = document;
      if (canonicalJson(previous) !== canonicalJson(metadata)) fail(`métadonnées contradictoires pour ${id}.`);
    }
    let scenario = document.scenarios.find((s) => s.round === round && s.scenario_number === scenarioNumber);
    if (!scenario) {
      scenario = { round, scenario_number: scenarioNumber, is_primary: isPrimary,
        scenario_sample_size: scenarioSample, configuration_key: '', results: [] };
      document.scenarios.push(scenario);
    } else if (scenario.is_primary !== isPrimary || scenario.scenario_sample_size !== scenarioSample) fail('configuration incohérente.');
    if (scenario.results.some((r) => r.candidate_external_id === candidateId)) fail('doublon de candidat dans une configuration.');
    scenario.results.push({ candidate_external_id: candidateId, candidate_name: candidateName,
      party: row.parti.trim().normalize('NFC') || null, score: Number(scoreValue) });
  });
  for (const document of documents.values()) {
    document.scenarios.sort((a, b) => a.round - b.round || a.scenario_number - b.scenario_number);
    for (const scenario of document.scenarios) {
      scenario.results.sort((a, b) => a.candidate_external_id.localeCompare(b.candidate_external_id, 'en'));
      validateConfiguration(scenario, document.external_id);
      scenario.configuration_key = configurationKey(scenario.round, scenario.results.map((r) => r.candidate_external_id));
    }
  }
  return [...documents.values()].sort((a, b) => a.external_id.localeCompare(b.external_id, 'en'));
}

function validateConfiguration(scenario: PollScenario, id: string) {
  const count = scenario.results.length;
  const total = scenario.results.reduce((sum, result) => sum + result.score, 0);
  // Tolerance for published rounding; this is a completeness check, never a normalization.
  if (count < 2 || (scenario.round === 2 && count !== 2) || Math.abs(total - 100) > Math.max(2, count * .5)) {
    throw new PollImportError(`${id}, tour ${scenario.round}, configuration ${scenario.scenario_number} : résultats incomplets ou incohérents (total ${total} %).`);
  }
}

export interface PollDownload {
  documents: PollDocument[];
  datasetUrl: string;
  finalUrl: string;
  datasetHash: string;
  retrievedAt: string;
  bytes: number;
  fallback: boolean;
  downloadIssues?: string[];
}

type DownloadRequest = (url: string, options: { timeoutMs: number; retries: number; headers: Record<string, string> }) => Promise<{
  body: Uint8Array; finalUrl: string; contentType: string; fetchedAt: string; sha256: string; bytes: number;
}>;

export async function downloadSondax(request: DownloadRequest = requestBuffer): Promise<PollDownload> {
  const downloadIssues: string[] = [];
  for (const [index, url] of [SONDAX_URL, MIRROR_URL].entries()) {
    let response: Awaited<ReturnType<DownloadRequest>>;
    try {
      response = await request(url, { timeoutMs: 30000, retries: 2, headers: { accept: 'text/csv, text/plain, application/octet-stream' } });
    } catch {
      if (index === 0) { downloadIssues.push('Sondax : échec de téléchargement ; recours au miroir.'); continue; }
      throw new PollImportError('Sondax et le miroir data.gouv.fr sont indisponibles. Les données existantes sont conservées.');
    }
    if (response.bytes > 8 * 1024 * 1024) throw new PollImportError('CSV Sondax supérieur à 8 Mio : import refusé.');
    if (/text\/html|application\/json|application\/pdf/i.test(response.contentType)) {
      if (index === 0) { downloadIssues.push('Sondax : réponse non CSV ; recours au miroir.'); continue; }
      throw new PollImportError('Le miroir ne renvoie pas un CSV.');
    }
    // A valid transport with a changed CSV schema must fail loudly, not use a stale mirror.
    const documents = parseSondax(response.body);
    return { documents, datasetUrl: url, finalUrl: response.finalUrl, datasetHash: response.sha256,
      retrievedAt: response.fetchedAt, bytes: response.bytes, fallback: index === 1, downloadIssues };
  }
  throw new PollImportError('Téléchargement impossible.');
}
