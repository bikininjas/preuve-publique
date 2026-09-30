/** Small readers for Next.js searchParams, shared by the pages. */

/** Shape Next.js hands to a page's `searchParams` prop (awaited in Next 16). */
export type SearchParamsRecord = Record<string, string | string[] | undefined>;

export function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Positive page number, 1 by default. */
export function pageParam(value: string | string[] | undefined, fallback = 1): number {
  const parsed = Number.parseInt(first(value) ?? '', 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : fallback;
}

/** Only a relative /admin path is accepted as a redirect target. */
export function safeAdminPath(value: unknown, fallback = '/admin'): string {
  const path = typeof value === 'string' ? value : Array.isArray(value) ? value[0] : undefined;
  if (!path || !path.startsWith('/admin') || path.startsWith('//')) return fallback;
  return path;
}

/** Keeps only the expected value, `undefined` otherwise. */
export function enumParam<T extends string>(
  value: string | string[] | undefined,
  allowed: readonly T[],
): T | undefined {
  const clean = first(value);
  return clean && (allowed as readonly string[]).includes(clean) ? (clean as T) : undefined;
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Identifiers used in PostgREST filters are validated, never interpolated raw. */
export function isUuid(value: string | null | undefined): value is string {
  return typeof value === 'string' && UUID_PATTERN.test(value);
}
