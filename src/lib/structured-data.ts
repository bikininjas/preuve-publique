import { SITE_DESCRIPTION, SITE_URL } from "./seo.ts";
import { singleLineSummary } from "./summary.ts";
import type { Dossier } from "./types.ts";

/**
 * Données structurées (schema.org) : elles aident les moteurs à dater,
 * attribuer et comprendre les pages — elles ne modifient jamais les faits
 * affichés. Tout vient du dossier publié ; rien n'est déduit ni inventé.
 */

export function organizationJsonLd(baseUrl: string = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Preuve publique",
    url: `${baseUrl}/`,
    description: SITE_DESCRIPTION,
  };
}

export function websiteJsonLd(baseUrl: string = SITE_URL) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Preuve publique",
    url: `${baseUrl}/`,
    inLanguage: "fr",
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/recherche?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function dossierJsonLd(dossier: Dossier, baseUrl: string = SITE_URL) {
  const url = `${baseUrl}/dossiers/${dossier.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: dossier.claim_title,
    description: singleLineSummary(dossier.verdict_summary),
    inLanguage: "fr",
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    ...(dossier.published_at !== null ? { datePublished: dossier.published_at } : {}),
    publisher: {
      "@type": "Organization",
      name: "Preuve publique",
      url: `${baseUrl}/`,
    },
    isAccessibleForFree: true,
  };
}
