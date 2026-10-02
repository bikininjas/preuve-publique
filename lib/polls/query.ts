import type { PollQuery } from './types.ts';

export class PollQueryError extends Error {}

export function isDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value))
    && new Date(value).toISOString().slice(0, 10) === value;
}

/** Strict, bounded public API filters. Dates filter the end of fieldwork. */
export function parsePollQuery(params: URLSearchParams): PollQuery {
  const allowed = new Set(['institute', 'candidate', 'party', 'round', 'startDate', 'endDate', 'configuration', 'page', 'limit']);
  for (const key of params.keys()) {
    if (!allowed.has(key) || params.getAll(key).length !== 1) throw new PollQueryError(`Paramètre invalide : ${key}.`);
  }
  const text = (key: string) => {
    const value = params.get(key)?.trim() || null;
    if (value && (value.length > 1000 || /[\u0000-\u001f]/.test(value))) throw new PollQueryError(`Filtre invalide : ${key}.`);
    return value;
  };
  const round = text('round');
  if (round && round !== '1' && round !== '2') throw new PollQueryError('Le tour doit être 1 ou 2.');
  const startDate = text('startDate'), endDate = text('endDate');
  if ([startDate, endDate].some((date) => date && !isDate(date))) throw new PollQueryError('Date invalide (AAAA-MM-JJ attendu).');
  if (startDate && endDate && startDate > endDate) throw new PollQueryError('La période est inversée.');
  const integer = (key: string, fallback: number, max: number) => {
    const value = text(key);
    if (value === null) return fallback;
    if (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > max) throw new PollQueryError(`Pagination invalide : ${key}.`);
    return Number(value);
  };
  return {
    institute: text('institute'), candidate: text('candidate'), party: text('party'),
    round: round ? Number(round) as 1 | 2 : null, startDate, endDate, configuration: text('configuration'),
    page: integer('page', 1, 10000), limit: integer('limit', 20, 100),
  };
}

export function configurationKey(round: 1 | 2, candidateIds: string[]): string {
  return `${round}:${[...candidateIds].sort().join('|')}`;
}
