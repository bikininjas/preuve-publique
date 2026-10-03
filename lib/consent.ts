export const CONSENT_STORAGE_KEY = 'preuve-publique-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
export const CONSENT_CHANGE_EVENT = 'preuve-publique-consent-change';

export interface CookieConsent {
  version: number;
  analytics: boolean;
  recordedAt: number;
  expiresAt: number;
}

export function createConsent(analytics: boolean, now = Date.now()): CookieConsent {
  return { version: CONSENT_VERSION, analytics, recordedAt: now, expiresAt: now + CONSENT_MAX_AGE_MS };
}

/** Invalid, outdated or expired choices never authorize analytics. */
export function parseConsent(raw: string | null, now = Date.now()): CookieConsent | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Partial<CookieConsent>;
    if (value?.version !== CONSENT_VERSION || typeof value.analytics !== 'boolean' ||
      typeof value.recordedAt !== 'number' || typeof value.expiresAt !== 'number' ||
      !Number.isFinite(value.recordedAt) || !Number.isFinite(value.expiresAt) ||
      value.recordedAt > now || value.expiresAt <= now ||
      value.expiresAt <= value.recordedAt || value.expiresAt - value.recordedAt > CONSENT_MAX_AGE_MS) return null;
    return value as CookieConsent;
  } catch {
    return null;
  }
}

export function analyticsMeasurementId(value: unknown): string | null {
  return typeof value === 'string' && /^G-[A-Z0-9]{6,20}$/.test(value.trim()) ? value.trim() : null;
}

/** Report only known public screens, without the selected person or subject. */
export function analyticsPage(pathname: string): { path: string; title: string } | null {
  const pages: Record<string, string> = {
    '/': 'Accueil', '/scrutins': 'Scrutins', '/pieces': 'Pièces', '/partis': 'Partis',
    '/groupes': 'Groupes', '/categories': 'Thèmes', '/methode': 'Méthode',
    '/observatoire': 'Observatoire', '/presidentielle-2027': 'Présidentielle 2027',
    '/presidentielle-2027/sondages': 'Sondages', '/presidentielle-2027/candidats': 'Annuaire des personnes',
    '/presidentielle-2027/comparer': 'Comparaison documentaire',
  };
  if (Object.hasOwn(pages, pathname)) return { path: pathname, title: `${pages[pathname]} · Preuve Publique` };
  const details = [
    { pattern: /^\/pieces\/[^/]+$/, path: '/pieces/[id]', title: 'Fiche documentaire' },
    { pattern: /^\/partis\/[^/]+$/, path: '/partis/[id]', title: 'Profil de parti' },
    { pattern: /^\/groupes\/[^/]+$/, path: '/groupes/[id]', title: 'Profil de groupe' },
    { pattern: /^\/categories\/[^/]+$/, path: '/categories/[slug]', title: 'Rubrique documentaire' },
    { pattern: /^\/presidentielle-2027\/candidats\/[^/]+$/, path: '/presidentielle-2027/candidats/[candidate]', title: 'Profil de personne' },
  ];
  const detail = details.find(({ pattern }) => pattern.test(pathname));
  return detail ? { path: detail.path, title: `${detail.title} · Preuve Publique` } : null;
}
