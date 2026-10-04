import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from './site.ts';
import { first, pageParam, type SearchParamsRecord } from './params.ts';
import { findVoteSubject, VOTE_SUBJECT_GROUPS } from './vote-subjects.ts';

export type SeoDocument = { title: string; description: string; section: string; parent?: { name: string; path: string }; sourceUrl?: string };

export const SEO_PAGES: Record<string, SeoDocument> = {
  '/': { title: 'Votes des députés et sénateurs : scrutins et sources', description: 'Explorez les scrutins de l’Assemblée nationale et du Sénat, les votes des partis et les sources des décisions politiques, depuis 2017.', section: 'Les décisions, les sources, le contexte' },
  '/scrutins': { title: 'Scrutins : qui vote quoi à l’Assemblée et au Sénat ?', description: 'Retrouvez les votes officiels par sujet, parti ou groupe : pour, contre, abstention et non-participation, avec le texte exact et les sources.', section: 'Scrutins officiels' },
  '/pieces': { title: 'Documents et scrutins publiés', description: 'Consultez les pièces publiées de Preuve Publique : scrutins officiels, textes adoptés et documents politiques, avec leur date et leur provenance.', section: 'Base documentaire' },
  '/categories': { title: 'Votes par thème : économie, société et vie quotidienne', description: 'Explorez les votes par thème et sous-thème : logement, retraites, impôts, santé, immigration et sécurité. Chaque graphique renvoie aux scrutins officiels.', section: 'Thèmes et sous-thèmes' },
  '/groupes': { title: 'Groupes parlementaires : retrouver leurs votes officiels', description: 'Retrouvez les groupes de l’Assemblée nationale, leurs noms et périodes documentées, et leurs positions majoritaires dans les scrutins publiés.', section: 'Groupes parlementaires' },
  '/partis': { title: 'Partis politiques : leurs votes par thème', description: 'Comparez les bulletins rattachables aux partis par thème et sous-thème, avec les affiliations datées, les scrutins et les limites de la méthode.', section: 'Partis et votes' },
  '/partis/comparer': { title: 'Comparer deux partis sur les mêmes scrutins', description: 'Deux partis côte à côte, texte par texte : pour, contre, abstentions et non-votants documentés, avec les sources et les affiliations datées.', section: 'Comparer les partis', parent: { name: 'Partis', path: '/partis' } },
  '/methode': { title: 'Méthode, sources et limites de l’observatoire', description: 'Comment les scrutins, les affiliations et les documents sont vérifiés : sources primaires, provenance, relecture humaine et limites des comparaisons.', section: 'Notre méthode' },
  '/observatoire': { title: 'Observatoire : parole politique, inégalités et justice', description: 'Suivez les chantiers documentaires sur les programmes, les votes, les inégalités et les procédures judiciaires. Sources, méthode et données manquantes explicites.', section: 'Observatoire citoyen' },
  '/preparer-mon-vote': { title: 'Préparer mon vote : sujets, pièces et carnet de choix', description: 'Partez de vos questions pour explorer les scrutins, comparer les mêmes pièces et préparer un carnet personnel, avec les sources et les limites du corpus.', section: 'Préparer mon vote' },
  '/presidentielle-2027': { title: 'Présidentielle 2027 : sondages et positions documentées', description: 'Accédez aux sondages de la présidentielle 2027, aux personnes testées et à leurs positions documentées, avec les sources et les limites de chaque comparaison.', section: 'Présidentielle 2027' },
  '/presidentielle-2027/sondages': { title: 'Sondages présidentielle 2027 : configurations et sources', description: 'Explorez les sondages rapportés par Sondax pour 2027 : personnes testées, instituts, dates, configurations exactes et liens vers les publications originales.', section: 'Sondages · Présidentielle 2027' },
  '/presidentielle-2027/candidats': { title: 'Présidentielle 2027 : personnes testées et votes documentés', description: 'Retrouvez les personnes testées dans les sondages, leurs identités recoupées et leurs bulletins officiels disponibles. Un sondage ne confirme pas une candidature.', section: 'Personnes testées · 2027' },
  '/presidentielle-2027/comparer': { title: 'Comparer les votes et les pièces par sous-thème', description: 'Mettez côte à côte les mêmes scrutins et documents pour les personnes testées en 2027, avec les votes individuels disponibles et les sources originales.', section: 'Comparaison documentaire · 2027' },
};

export function concise(value: string, maximum = 170): string {
  const text = value.replace(/\s+/g, ' ').trim();
  if (text.length <= maximum) return text;
  const cut = text.lastIndexOf(' ', maximum - 1);
  return `${text.slice(0, cut > maximum / 2 ? cut : maximum - 1).trim()}…`;
}

/** Only controlled facets are indexable; search and combinations retain follow. */
export function seoQuery(path: string, query: SearchParamsRecord = {}) {
  const normalized = new URLSearchParams();
  let indexable = true;
  let label = '';
  for (const [key, raw] of Object.entries(query).sort(([a], [b]) => a.localeCompare(b))) {
    const value = first(raw);
    if (!value || key.startsWith('utm_') || ['gclid', 'fbclid', 'msclkid'].includes(key)) continue;
    if (key === 'page') {
      const page = pageParam(raw);
      if (page > 1) {
        normalized.set('page', String(page));
        label += ` · page ${page}`;
      }
      if (String(page) !== value) indexable = false;
    } else if (key === 'institution' && ['/scrutins', '/categories'].includes(path) && ['assemblee', 'senat'].includes(value)) {
      if (path === '/scrutins' || value === 'senat') normalized.set(key, value);
      label += value === 'senat' ? ' · Sénat' : ' · Assemblée nationale';
    } else if (key === 'subject' && path === '/scrutins' && findVoteSubject(value)) {
      normalized.set(key, value);
      label += ` · ${findVoteSubject(value)!.label}`;
    } else if (key === 'category' && path === '/scrutins' && VOTE_SUBJECT_GROUPS.some(category => category.id === value)) {
      normalized.set(key, value);
      label += ` · ${VOTE_SUBJECT_GROUPS.find(category => category.id === value)!.label}`;
    } else {
      indexable = false;
      if (['q', 'kind', 'topic', 'institution', 'subject', 'category', 'party', 'group', 'candidate', 'institute', 'round', 'start', 'end', 'configuration', 'party_page', 'group_page', 'left', 'right'].includes(key)) {
        for (const item of Array.isArray(raw) ? raw : [value]) normalized.append(key, item.slice(0, 200));
      }
    }
    if (Array.isArray(raw) && raw.length > 1) indexable = false;
  }
  if (normalized.has('subject') && normalized.has('category')) indexable = false;
  const search = normalized.toString();
  return { path: `${path}${search ? `?${search}` : ''}`, indexable, label };
}

export function shareImagePath(path: string): string {
  return `/partage/${path === '/' ? 'accueil' : path.replace(/^\//, '')}`;
}

export function pageMetadata(path: string, document = SEO_PAGES[path], query: SearchParamsRecord = {}): Metadata {
  const selection = seoQuery(path, query);
  const title = concise(`${document.title}${selection.label}`, 130);
  const fullTitle = `${title} · ${SITE_NAME}`;
  const description = concise(document.description);
  const image = { url: `${SITE_URL}${shareImagePath(path)}`, width: 1200, height: 630, alt: `${document.section} — ${document.title}`, type: 'image/png' };
  return {
    title: {absolute: `${concise(title, 85)} · ${SITE_NAME}`}, description,
    alternates: { canonical: `${SITE_URL}${selection.path}` },
    robots: { index: selection.indexable, follow: true, googleBot: { index: selection.indexable, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'fr_FR', url: `${SITE_URL}${selection.path}`, title: fullTitle, description, images: [image] },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [{ url: image.url, alt: image.alt }] },
  };
}

/** Escape embedded JSON independently of source-provided titles. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
