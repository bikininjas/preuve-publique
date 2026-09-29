// Légifrance (DILA) — textes publiés au Journal officiel, via l'API PISTE.
//
// Requires a PISTE account (https://piste.gouv.fr) and the environment
// variables LEGIFRANCE_CLIENT_ID / LEGIFRANCE_CLIENT_SECRET. This importer
// has NOT been exercised against the live API without credentials: field
// names may need a first-run adjustment, and the run fails loudly with the
// API's own error until then. Nothing is stored without a successful,
// identified response.

import { saveRaw, writeJsonl } from '../lib/staging.mjs';
import { requestText } from '../lib/http.mjs';
import { buildEvidence, clampExcerpt, cleanText, ValidationError } from '../lib/normalize.mjs';
import { MissingConfigError, requireEnv } from '../lib/env.mjs';

export const name = 'legifrance';
export const description = 'Textes publiés au Journal officiel via l’API Légifrance (PISTE).';
export const defaults = { mode: 'jorf', id: '' };
export const help = `Options :
  --mode=jorf|legitext  nature de l'identifiant fourni (jorf = texte publié au JO, legitext = texte consolidé)
  --id=JORFTEXT…        identifiant du texte à importer (ex. JORFTEXT000049123456)

Variables requises : LEGIFRANCE_CLIENT_ID, LEGIFRANCE_CLIENT_SECRET (compte PISTE).`;

const TOKEN_URL = 'https://oauth.piste.gouv.fr/api/oauth/token';
const API_BASE = 'https://api.piste.gouv.fr/dila/legifrance/lf-engine-app';

const CONSULT_PATH = {
  jorf: '/consult/jorf',
  legitext: '/consult/legiPart',
};

const PUBLIC_URL = {
  jorf: (id) => `https://www.legifrance.gouv.fr/jorf/id/${id}`,
  legitext: (id) => `https://www.legifrance.gouv.fr/loda/id/${id}`,
};

export async function fetchToken({ minDelayMs = 0 } = {}) {
  const clientId = requireEnv('LEGIFRANCE_CLIENT_ID');
  const clientSecret = requireEnv('LEGIFRANCE_CLIENT_SECRET');
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'openid',
  });
  const response = await requestText(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    minDelayMs,
    timeoutMs: 30_000,
    body: body.toString(),
  });
  const parsed = JSON.parse(response.text);
  if (!parsed.access_token) throw new Error('Réponse OAuth PISTE sans access_token.');
  return { token: parsed.access_token, expiresIn: parsed.expires_in ?? null };
}

async function consult(token, mode, id, { minDelayMs }) {
  const url = `${API_BASE}${CONSULT_PATH[mode]}`;
  const response = await requestText(url, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    minDelayMs,
    timeoutMs: 60_000,
    body: JSON.stringify({ textId: id }),
  });
  return { url, response, json: JSON.parse(response.text) };
}

function textToRecord(payload, { mode, id, sourceUrl, retrievedAt }) {
  // Field names follow the documented JORF consultation shape; confirmed at
  // the first successful run against the live API.
  const title = payload?.title ?? payload?.titre ?? null;
  const dateParution = payload?.dateParution ?? payload?.date ?? null;
  const text = payload?.text ?? payload?.texte ?? null;
  if (!title || !dateParution) {
    throw new ValidationError('title', 'champs title/dateParution absents de la réponse Légifrance — vérifier le mapping', id);
  }
  return buildEvidence({
    external_id: id,
    kind: 'adopted_text',
    institution: 'legifrance',
    title: cleanText(title, { max: 400 }),
    excerpt: clampExcerpt(text ? String(text).slice(0, 400) : null),
    occurred_at: dateParution,
    source_url: PUBLIC_URL[mode](id),
    source_locator: `${mode}:${id} — réponse ${CONSULT_PATH[mode]}`,
    detail: {
      mode,
      jorf_id: id,
      nature: payload?.nature ?? null,
      nor: payload?.nor ?? null,
      date_parution: dateParution,
      refs: [{ type: 'legifrance:jorf', value: id }],
    },
    source: {
      url: sourceUrl,
      publisher: 'DILA — Légifrance',
      document_title: `Consultation ${mode} ${id} (API Légifrance)`,
      published_at: null,
      sha256: null,
      retrieved_at: retrievedAt,
    },
  });
}

export async function run({ options, stagingDir, log = () => {} }) {
  const mode = String(options.mode ?? defaults.mode);
  const id = String(options.id ?? defaults.id).trim();
  if (!['jorf', 'legitext'].includes(mode)) throw new Error('--mode doit valoir jorf ou legitext.');
  if (!id) throw new Error('--id requis : identifiant JORF ou LEGITEXT du texte à importer.');
  if (!process.env.LEGIFRANCE_CLIENT_ID || !process.env.LEGIFRANCE_CLIENT_SECRET) {
    throw new MissingConfigError(
      'Identifiants PISTE absents (LEGIFRANCE_CLIENT_ID, LEGIFRANCE_CLIENT_SECRET). '
      + 'Créer un compte sur https://piste.gouv.fr puis relancer. Aucune donnée n’a été récupérée.',
    );
  }

  log(`Obtention du jeton PISTE`);
  const { token } = await fetchToken();
  log(`Consultation ${mode} ${id}`);
  const { url, response, json } = await consult(token, mode, id, { minDelayMs: 0 });
  const raw = saveRaw(stagingDir, `${mode}-${id}.json`, response.body);
  const payload = json?.data ?? json;
  const record = textToRecord(payload, { mode, id, sourceUrl: url, retrievedAt: response.fetchedAt });

  writeJsonl(`${stagingDir}/evidence.jsonl`, [record]);
  writeJsonl(`${stagingDir}/sources.jsonl`, [{
    url,
    publisher: 'DILA — Légifrance',
    document_title: `Consultation ${mode} ${id} (API Légifrance)`,
    published_at: null,
    sha256: response.sha256,
    retrieved_at: response.fetchedAt,
  }]);
  return {
    counts: { evidence: 1, sources: 1, actors: 0 },
    rawFiles: [{ url, ...raw, fetched_at: response.fetchedAt, content_type: response.contentType }],
    notes: ['Premier passage réel de cet importeur : vérifier le mapping des champs dans le fichier brut conservé.'],
  };
}
