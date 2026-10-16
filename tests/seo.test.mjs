import assert from "node:assert/strict";
import test from "node:test";

import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import {
  SITE_URL,
  buildRssFeed,
  buildSitemapEntries,
  escapeXml,
  toRfc822Date,
} from "../src/lib/seo.ts";
import {
  dossierJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "../src/lib/structured-data.ts";

/**
 * Surfaces publiques lisibles par les moteurs : plan de site, flux RSS,
 * données structurées. Invariants : rien de privé n'y figure, tout ce qui est
 * publié y figure, et rien n'y est inventé (pas de date fabriquée, pas de
 * contenu non échappé).
 */

const published = publishedSeedDossiers();

test("le plan de site couvre les pages fixes et les neuf catégories", () => {
  const entries = buildSitemapEntries([]);
  const urls = entries.map((entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length, "URL dupliquée dans le plan de site");
  for (const path of ["/", "/dossiers", "/methode"]) {
    assert.ok(urls.includes(`${SITE_URL}${path}`), `entrée manquante : ${path}`);
  }
  const categories = urls.filter((url) => url.includes("/categories/"));
  assert.equal(categories.length, 9);
  assert.ok(
    !urls.some(
      (url) => url.includes("/admin") || url.includes("/recherche") || url.includes("/api"),
    ),
    "une page privée figure dans le plan de site",
  );
});

test("chaque dossier publié a son entrée, avec sa date quand elle existe", () => {
  assert.ok(published.length > 0, "le seed doit publier au moins un dossier");
  const entries = buildSitemapEntries(published);
  const byUrl = new Map(entries.map((entry) => [entry.url, entry]));
  for (const dossier of published) {
    const entry = byUrl.get(`${SITE_URL}/dossiers/${dossier.slug}`);
    assert.ok(entry, `entrée manquante : ${dossier.slug}`);
    if (dossier.published_at !== null) {
      assert.equal(entry.lastModified, dossier.published_at);
    } else {
      assert.equal(entry.lastModified, undefined);
    }
  }
  const dossierEntries = entries.filter((entry) => entry.url.startsWith(`${SITE_URL}/dossiers/`));
  assert.equal(dossierEntries.length, published.length);
});

test("les URL du plan de site sont absolues", () => {
  for (const entry of buildSitemapEntries(published)) {
    assert.ok(entry.url.startsWith(`${SITE_URL}/`), `URL non absolue : ${entry.url}`);
  }
});

test("l'échappement XML neutralise balises et esperluettes", () => {
  assert.equal(escapeXml(`a & <b> "c" 'd'`), "a &amp; &lt;b&gt; &quot;c&quot; &apos;d&apos;");
});

test("une date AAAA-MM-JJ devient un pubDate RFC 822 à midi UTC", () => {
  assert.equal(toRfc822Date("2026-10-16"), "Fri, 16 Oct 2026 12:00:00 GMT");
});

test("le flux RSS porte chaque dossier publié en une entrée", () => {
  const feed = buildRssFeed(published);
  assert.ok(feed.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(feed.includes("<language>fr-fr</language>"));
  const items = feed.match(/<item>/g) ?? [];
  assert.equal(items.length, published.length);
  for (const dossier of published) {
    assert.ok(feed.includes(`<link>${SITE_URL}/dossiers/${dossier.slug}</link>`));
  }
});

test("le flux échappe le contenu qui vient de la base, et n'invente pas de date", () => {
  const feed = buildRssFeed([
    {
      ...published[0],
      claim_title: `Titre & <script> "guillemets"`,
      verdict_summary: "Résumé & suite",
      published_at: null,
    },
  ]);
  assert.ok(feed.includes("Titre &amp; &lt;script&gt; &quot;guillemets&quot;"));
  assert.ok(!feed.includes("<script>"));
  assert.ok(feed.includes("Résumé &amp; suite"));
  assert.ok(!feed.includes("<pubDate>"), "pas de pubDate sans date publiée");
});

test("les données structurées restent fidèles au dossier publié", () => {
  const org = organizationJsonLd();
  assert.equal(org["@type"], "Organization");
  assert.equal(org.url, `${SITE_URL}/`);

  const site = websiteJsonLd();
  assert.equal(site["@type"], "WebSite");
  assert.equal(
    site.potentialAction.target.urlTemplate,
    `${SITE_URL}/recherche?q={search_term_string}`,
  );

  const dossier = published[0];
  const article = dossierJsonLd(dossier);
  assert.equal(article.headline, dossier.claim_title);
  assert.equal(article.url, `${SITE_URL}/dossiers/${dossier.slug}`);
  assert.equal(article.publisher.name, "Preuve publique");
  if (dossier.published_at !== null) {
    assert.equal(article.datePublished, dossier.published_at);
  } else {
    assert.equal(article.datePublished, undefined);
  }
});
