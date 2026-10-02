// Normalization and validation of staged records. Every rule here mirrors a
// constraint of supabase/migrations: a record that passes this module can be
// pushed to the database without a surprise, and a record that cannot be
// traced back to its source is rejected.

export const KINDS = ['program', 'statement', 'amendment', 'vote', 'adopted_text', 'indicator', 'judicial_event'];
export const INSTITUTIONS = ['assemblee', 'senat', 'parlement_europeen', 'legifrance'];
export const ACTOR_KINDS = ['person', 'party', 'group'];

export const TITLE_MAX = 500;
export const EXCERPT_MAX = 600;

// Institutional hosts for which a http:// URL is upgraded to https://. The
// upgrade is only applied to hosts that serve the same document over TLS.
const UPGRADABLE_HOSTS = new Set([
  'www.senat.fr',
  'senat.fr',
  'data.senat.fr',
  'www.assemblee-nationale.fr',
  'assemblee-nationale.fr',
  'data.assemblee-nationale.fr',
  'www.europarl.europa.eu',
  'data.europarl.europa.eu',
  'www.legifrance.gouv.fr',
]);

export class ValidationError extends Error {
  constructor(field, message, value) {
    super(`${field}: ${message}`);
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
  }
}

export function cleanText(value, { max = TITLE_MAX, field = 'text' } = {}) {
  if (value === null || value === undefined) return null;
  const cleaned = String(value).replace(/\s+/g, ' ').trim();
  if (!cleaned) return null;
  if (cleaned.length > max) throw new ValidationError(field, `dépasse ${max} caractères`, cleaned.slice(0, 80));
  return cleaned;
}

/** Short excerpts only: the full document stays at its publisher. */
export function clampExcerpt(value, max = EXCERPT_MAX) {
  if (value === null || value === undefined) return null;
  const cleaned = String(value).replace(/\s+/g, ' ').trim();
  if (!cleaned) return null;
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Titles come from the source wording and can be long sentences. They are
 * bounded for display and search; the trailing ellipsis shows the reader
 * that the full wording lives at the source URL.
 */
export function clampTitle(value, max = TITLE_MAX) {
  const cleaned = value === null || value === undefined
    ? null
    : String(value).replace(/\s+/g, ' ').trim();
  if (!cleaned) return null;
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

const FR_MONTHS = {
  janvier: 1, février: 2, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, août: 8, aout: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12, decembre: 12,
};

function isoFromParts(year, month, day, field) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    throw new ValidationError(field, 'date illisible', `${year}-${month}-${day}`);
  }
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new ValidationError(field, 'date inexistante', `${year}-${month}-${day}`);
  }
  return date.toISOString().slice(0, 10);
}

/**
 * Accepts 'YYYY-MM-DD', 'DD/MM/YYYY' and ISO datetimes; returns 'YYYY-MM-DD'.
 * Day-first is the convention of the French institutional sources used here.
 */
export function toIsoDate(value, field = 'date') {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) throw new ValidationError(field, 'date invalide', value);
    return value.toISOString().slice(0, 10);
  }
  const text = String(value ?? '').trim();
  if (!text) throw new ValidationError(field, 'date absente', value);
  let match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return isoFromParts(Number(match[1]), Number(match[2]), Number(match[3]), field);
  match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) return isoFromParts(Number(match[3]), Number(match[2]), Number(match[1]), field);
  throw new ValidationError(field, 'format de date non reconnu', text.slice(0, 40));
}

/** '21 juillet 2026' → '2026-07-21'. */
export function toIsoDateFromFrench(value, field = 'date') {
  const text = String(value ?? '').trim().toLowerCase();
  const match = text.match(/^(\d{1,2})(?:er)?\s+([a-zéûôà]+)\s+(\d{4})$/);
  if (!match || !FR_MONTHS[match[2]]) throw new ValidationError(field, 'date française non reconnue', value);
  return isoFromParts(Number(match[3]), FR_MONTHS[match[2]], Number(match[1]), field);
}

/** The database requires https URLs. Other schemes are rejected, never guessed. */
export function requireHttpsUrl(value, field = 'url') {
  const text = String(value ?? '').trim();
  if (!text) throw new ValidationError(field, 'URL absente', value);
  let parsed;
  try {
    parsed = new URL(text);
  } catch {
    throw new ValidationError(field, 'URL illisible', text.slice(0, 120));
  }
  if (parsed.protocol === 'https:') return parsed.toString();
  if (parsed.protocol === 'http:' && UPGRADABLE_HOSTS.has(parsed.hostname)) {
    parsed.protocol = 'https:';
    return parsed.toString();
  }
  throw new ValidationError(field, `protocole non accepté (${parsed.protocol})`, text.slice(0, 120));
}

function requireNonEmpty(value, field, max = 200) {
  const cleaned = cleanText(value, { max, field });
  if (!cleaned) throw new ValidationError(field, 'champ obligatoire vide', value);
  return cleaned;
}

export function buildRef(input) {
  const type = requireNonEmpty(input?.type, 'ref.type', 60);
  if (!/^[a-z0-9_:.-]+$/.test(type)) throw new ValidationError('ref.type', 'format invalide', type);
  const value = requireNonEmpty(input?.value, 'ref.value', 200);
  return { type, value };
}

export function buildSource(input) {
  return {
    url: requireHttpsUrl(input?.url, 'source.url'),
    publisher: requireNonEmpty(input?.publisher, 'source.publisher', 200),
    document_title: requireNonEmpty(input?.document_title, 'source.document_title', 300),
    published_at: input?.published_at ? toIsoDate(input.published_at, 'source.published_at') : null,
    sha256: input?.sha256 ? requireNonEmpty(input.sha256, 'source.sha256', 64) : null,
    retrieved_at: input?.retrieved_at ?? new Date().toISOString(),
  };
}

export function buildActor(input) {
  const kind = requireNonEmpty(input?.kind, 'actor.kind', 20);
  if (!ACTOR_KINDS.includes(kind)) throw new ValidationError('actor.kind', 'valeur non prevue', kind);
  return {
    external_id: requireNonEmpty(input?.external_id, 'actor.external_id', 200),
    name: requireNonEmpty(input?.name, 'actor.name', 300),
    kind,
  };
}

/** Rubriques : uniquement celles que la source publie, jamais une déduction du site. */
export const TOPIC_MAX = 80;

export function buildTopics(value) {
  if (value === null || value === undefined) return [];
  const list = Array.isArray(value) ? value : [value];
  const out = [];
  const seen = new Set();
  for (const item of list) {
    const clean = cleanText(item, { max: TOPIC_MAX, field: 'topic' });
    if (!clean) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
  }
  return out;
}

export function buildEvidence(input) {
  const kind = requireNonEmpty(input?.kind, 'kind', 40);
  if (!KINDS.includes(kind)) throw new ValidationError('kind', 'valeur non prévue', kind);
  const institution = input?.institution ?? null;
  if (institution !== null && !INSTITUTIONS.includes(institution)) {
    throw new ValidationError('institution', 'valeur non prévue', institution);
  }
  const detailRaw = input?.detail ?? null;
  if (detailRaw !== null && (typeof detailRaw !== 'object' || Array.isArray(detailRaw))) {
    throw new ValidationError('detail', 'objet attendu', typeof detailRaw);
  }
  let detail = null;
  if (detailRaw !== null) {
    const serializable = JSON.parse(JSON.stringify(detailRaw));
    if (Array.isArray(serializable.refs)) {
      serializable.refs = serializable.refs.map(buildRef);
    }
    detail = serializable;
  }
  return {
    external_id: requireNonEmpty(input?.external_id, 'external_id', 200),
    kind,
    institution,
    title: requireNonEmpty(clampTitle(input?.title), 'title', TITLE_MAX),
    excerpt: clampExcerpt(input?.excerpt),
    occurred_at: toIsoDate(input?.occurred_at, 'occurred_at'),
    source_url: requireHttpsUrl(input?.source_url, 'source_url'),
    source_locator: input?.source_locator ? requireNonEmpty(input.source_locator, 'source_locator', 300) : null,
    detail,
    topics: buildTopics(input?.topics),
    source: buildSource(input?.source),
    actor: input?.actor ? buildActor(input.actor) : null,
  };
}

export function evidenceKey(record) {
  return `${record.institution ?? ''}|${record.kind}|${record.external_id}`;
}

/** Keep the last occurrence of each key: a later fetch of the same item wins. */
export function dedupeByKey(records) {
  const byKey = new Map();
  for (const record of records) byKey.set(evidenceKey(record), record);
  return [...byKey.values()];
}
