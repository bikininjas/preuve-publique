// Sénat — lois promulguées (data.senat.fr, base des dossiers législatifs).
//
// One CSV row per promulgated law, with the Sénat dossier URL and the
// themes. The Sénat is the source of this record: the same law will appear
// separately, with its own provenance, when Légifrance is imported.

import { saveRaw, writeJsonl } from '../lib/staging.mjs';
import { requestText } from '../lib/http.mjs';
import { parseCsv, rowsToObjects } from '../lib/csv.mjs';
import { buildEvidence, clampTitle, toIsoDate, ValidationError } from '../lib/normalize.mjs';

export const name = 'senat-texts';
export const description = 'Lois promulguées selon la base des dossiers législatifs du Sénat (CSV).';
export const defaults = { since: '2017-01-01', limit: '0' };
export const help = `Options :
  --since=AAAA-MM-JJ  ne retenir que les promulgations à partir de cette date (défaut 2017-01-01)
  --limit=N           nombre maximal de lois retenues (0 = toutes)`;

const CSV_URL = 'https://data.senat.fr/data/dosleg/promulguees.csv';

/**
 * Vocabulaire publié par le Sénat dans la colonne « Thèmes » de
 * `promulguees.csv` — relevé tel quel le 30/09/2026 (30 rubriques). Les valeurs
 * du fichier sont des listes triées de ces rubriques, séparées par « , » ;
 * trois rubriques contiennent elles-mêmes une virgule (« Économie et finances,
 * fiscalité », « Recherche, sciences et techniques », « PME, commerce et
 * artisanat »), d'où une analyse par correspondance du plus long libellé et une
 * vérification par aller-retour. Aucune rubrique n'est ajoutée par le site.
 */
export const SENAT_TOPICS = [
  'Affaires étrangères et coopération',
  'Agriculture et pêche',
  'Aménagement du territoire',
  'Anciens combattants',
  'Budget',
  'Collectivités territoriales',
  'Culture',
  'Défense',
  'Économie et finances, fiscalité',
  'Éducation',
  'Énergie',
  'Entreprises',
  'Environnement',
  'Famille',
  'Fonction publique',
  'Justice',
  'Logement et urbanisme',
  'Outre-mer',
  'PME, commerce et artisanat',
  'Police et sécurité',
  'Pouvoirs publics et Constitution',
  'Questions sociales et santé',
  'Recherche, sciences et techniques',
  'Sécurité sociale',
  'Société',
  'Sports',
  'Traités et conventions',
  'Transports',
  'Travail',
  'Union européenne',
];

const TOPICS_BY_LENGTH = [...SENAT_TOPICS].sort((a, b) => b.length - a.length);

/**
 * « Police et sécurité, Société » → deux rubriques. Une valeur que l'analyse ne
 * reconstruit pas entièrement est signalée (`complete: false`) et n'entre pas
 * en base : mieux vaut une pièce sans rubrique qu'une rubrique tronquée.
 */
export function parseSenatThemes(value) {
  const raw = String(value ?? '').replace(/\s+/g, ' ').trim();
  if (!raw) return { topics: [], complete: true };
  const topics = [];
  let rest = raw;
  while (rest) {
    const match = TOPICS_BY_LENGTH.find((topic) => rest === topic || rest.startsWith(`${topic}, `));
    if (!match) return { topics: [], complete: false, raw };
    topics.push(match);
    rest = rest === match ? '' : rest.slice(match.length + 2);
  }
  const sorted = [...topics].sort((a, b) => a.localeCompare(b, 'fr'));
  return { topics, complete: true, sorted: sorted.every((topic, index) => topic === topics[index]) };
}

function dossierSlug(url) {
  try {
    const base = new URL(url).pathname.split('/').pop() ?? '';
    const slug = base.replace(/\.html?$/i, '');
    return slug || null;
  } catch {
    return null;
  }
}

export function rowToRecord(row, { iso, numero, title, refs, sha256, retrievedAt }) {
  const themes = parseSenatThemes(row['Thèmes']);
  return buildEvidence({
    external_id: `loi-${numero}`,
    kind: 'adopted_text',
    institution: 'senat',
    title: title ?? `Loi n° ${numero}`,
    excerpt: null,
    occurred_at: iso,
    source_url: row['URL du dossier'],
    source_locator: `promulguees.csv — loi n° ${numero}`,
    topics: themes.topics,
    detail: {
      loi_numero: numero,
      date_promulgation: iso,
      date_initiale: row['Date initiale'] || null,
      etat: row['État du dossier'] || null,
      decision_cc: row['Décision du CC'] || null,
      date_decision_cc: row['Date de la décision'] || null,
      type_dossier: row['Type de dossier'] || null,
      themes: row['Thèmes'] || null,
      themes_analyse: themes.complete ? 'rubriques reconnues' : 'valeur non reconstruite, non reprise',
      refs,
    },
    source: {
      url: CSV_URL,
      publisher: 'Sénat',
      document_title: 'Dossiers législatifs — lois promulguées (CSV officiel)',
      published_at: null,
      sha256,
      retrieved_at: retrievedAt,
    },
  });
}

export async function run({ options, stagingDir, log = () => {} }) {
  const since = String(options.since ?? defaults.since);
  const limit = Number.parseInt(options.limit ?? defaults.limit, 10) || 0;
  const sinceIso = toIsoDate(since, 'since');

  log(`Téléchargement ${CSV_URL}`);
  const response = await requestText(CSV_URL, { encoding: 'latin1', timeoutMs: 120_000 });
  const raw = saveRaw(stagingDir, 'promulguees.csv', response.body);
  log(`  ${response.bytes} octets, sha256 ${response.sha256.slice(0, 16)}…`);

  const rows = rowsToObjects(parseCsv(response.text, ';'));
  if (!rows.length || !('Titre' in rows[0]) || !('Date de promulgation' in rows[0])) {
    throw new Error('Structure inattendue du CSV promulguees.csv (colonnes Titre / Date de promulgation absentes).');
  }

  const evidence = [];
  const notes = [];
  let skippedNoDate = 0;
  let skippedBefore = 0;
  let skippedNoNumber = 0;
  let truncatedTitles = 0;
  let unparsedThemes = 0;

  for (const row of rows) {
    const datePromulgation = row['Date de promulgation'];
    if (!datePromulgation) { skippedNoDate += 1; continue; }
    let iso;
    try {
      iso = toIsoDate(datePromulgation, 'Date de promulgation');
    } catch (error) {
      if (error instanceof ValidationError) { skippedNoDate += 1; continue; }
      throw error;
    }
    if (iso < sinceIso) { skippedBefore += 1; continue; }
    const numero = (row['Numéro de la loi'] ?? '').trim();
    if (!numero) {
      skippedNoNumber += 1;
      notes.push(`loi sans numéro ignorée : « ${(row.Titre ?? '').slice(0, 80)}… » (promulguée le ${iso})`);
      continue;
    }
    const title = clampTitle(row.Titre);
    if (title && title.length !== (row.Titre ?? '').trim().length) truncatedTitles += 1;

    const refs = [];
    const slug = dossierSlug(row['URL du dossier']);
    if (slug) refs.push({ type: 'senat:dossier', value: slug });

    try {
      const record = rowToRecord(row, {
        iso,
        numero,
        title,
        refs,
        sha256: response.sha256,
        retrievedAt: response.fetchedAt,
      });
      if (!record.topics.length && record.detail.themes) unparsedThemes += 1;
      evidence.push(record);
    } catch (error) {
      if (error instanceof ValidationError) notes.push(`loi n° ${numero} non retenue : ${error.message}`);
      else throw error;
    }
  }

  const selected = limit ? evidence.slice(0, limit) : evidence;
  notes.push(`lignes écartées : ${skippedNoDate} sans date, ${skippedBefore} avant ${sinceIso}, ${skippedNoNumber} sans numéro de loi`);
  if (truncatedTitles) notes.push(`${truncatedTitles} titre(s) tronqué(s) à 500 caractères pour la base`);
  if (unparsedThemes) notes.push(`${unparsedThemes} loi(s) dont la colonne « Thèmes » n'a pas été reconstruite : conservée telle quelle dans le détail, aucune rubrique retenue`);

  writeJsonl(`${stagingDir}/evidence.jsonl`, selected);
  writeJsonl(`${stagingDir}/sources.jsonl`, [{
    url: CSV_URL,
    publisher: 'Sénat',
    document_title: 'Dossiers législatifs — lois promulguées (CSV officiel)',
    published_at: null,
    sha256: response.sha256,
    retrieved_at: response.fetchedAt,
  }]);
  log(`  ${rows.length} lignes lues, ${selected.length} lois retenues`);
  return {
    counts: { evidence: selected.length, sources: 1, actors: 0 },
    rawFiles: [{ url: CSV_URL, ...raw, fetched_at: response.fetchedAt, content_type: response.contentType }],
    notes,
  };
}
