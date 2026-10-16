import { CATEGORY_ORDER, CATEGORY_SLUGS } from "./labels.ts";
import { singleLineSummary } from "./summary.ts";
import type { Dossier } from "./types.ts";

/**
 * Adresse publique du site : une seule source pour les URL absolues du plan
 * de site, du flux et des métadonnées. Le site ne se sert que sur ce domaine.
 */
export const SITE_URL = "https://preuve-publique.fr";

export const SITE_DESCRIPTION =
  "Chaque dossier croise archives primaires, consensus académique et sources de tout le spectre politique : la preuve ne dépend d'aucune autorité.";

export type SitemapEntry = {
  url: string;
  lastModified?: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

/**
 * Plan de site : les pages fixes, les neuf catégories, puis un dossier publié
 * par entrée — jamais autre chose que ce qui est servi publiquement. Les URL
 * sont absolues et sans paramètre : le plan ne connaît ni `/recherche` (hors
 * index par choix), ni `/admin`, ni l'API.
 */
export function buildSitemapEntries(
  dossiers: Dossier[],
  baseUrl: string = SITE_URL,
): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/dossiers`, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/methode`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/mentions-legales`, changeFrequency: "monthly", priority: 0.3 },
  ];
  for (const category of CATEGORY_ORDER) {
    entries.push({
      url: `${baseUrl}/categories/${CATEGORY_SLUGS[category]}`,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }
  for (const dossier of dossiers) {
    entries.push({
      url: `${baseUrl}/dossiers/${dossier.slug}`,
      ...(dossier.published_at !== null ? { lastModified: dossier.published_at } : {}),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  return entries;
}

/** Échappement XML : tout contenu du flux vient de la base, rien n'y porte
 * de balisage — mais rien n'est supposé non plus. */
export function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

/** RFC 822 attendu par RSS (pubDate) : midi UTC évite tout glissement de jour. */
export function toRfc822Date(date: string): string {
  return new Date(`${date}T12:00:00Z`).toUTCString();
}

/**
 * Flux RSS des dossiers publiés : titre, lien, date et résumé d'une ligne.
 * Le flux sert la même règle que le site — rien qui ne soit publié n'y figure,
 * et un dossier sans date publiée sort sans `<pubDate>` plutôt qu'avec une
 * date inventée.
 */
export function buildRssFeed(dossiers: Dossier[], baseUrl: string = SITE_URL): string {
  const items = dossiers
    .map((dossier) => {
      const link = `${baseUrl}/dossiers/${dossier.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(dossier.claim_title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        ...(dossier.published_at !== null
          ? [`      <pubDate>${toRfc822Date(dossier.published_at)}</pubDate>`]
          : []),
        `      <description>${escapeXml(singleLineSummary(dossier.verdict_summary))}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>Preuve publique — la preuve par le recoupement</title>",
    `    <link>${baseUrl}/</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    "    <language>fr-fr</language>",
    `    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>`,
    ...(items === "" ? [] : [items]),
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
