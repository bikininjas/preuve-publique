import assert from "node:assert/strict";
import test from "node:test";

import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import { VERDICT_STAMPS } from "../src/lib/labels.ts";
import {
  SITE_URL,
  buildShareText,
  canonicalDossierUrl,
  pickHeadlineSources,
} from "../src/lib/share-text.ts";

/**
 * Le texte de partage est le seul endroit du site où le verdict part sans son
 * dossier : il doit rester fidèle aux données publiées — titre réel, verdict en
 * capitales, institutions réelles des pièces, lien canonique — et ne rien
 * promettre quand le dossier n'a pas de quoi sourcer la phrase.
 */

function makeSource(overrides) {
  return {
    id: overrides.id ?? `source-${overrides.display_order}`,
    spectrum: overrides.spectrum,
    source_name: overrides.source_name ?? "Pièce de test",
    author_or_institution: overrides.author_or_institution,
    publication_date: overrides.publication_date ?? null,
    quote_kind: overrides.quote_kind ?? "FAIT_DOCUMENTE",
    exact_quote: overrides.exact_quote ?? "Extrait de test.",
    context_explanation: overrides.context_explanation ?? "Contexte de test.",
    original_url: overrides.original_url ?? null,
    author_reference_url: overrides.author_reference_url ?? null,
    archive_storage_path: overrides.archive_storage_path ?? null,
    archive_sha256: overrides.archive_sha256 ?? null,
    archive_binary_sha256: overrides.archive_binary_sha256 ?? null,
    display_order: overrides.display_order,
  };
}

const BASE_DOSSIER = {
  id: "00000000-0000-4000-8000-000000000000",
  slug: "dossier-de-test",
  claim_title: "Une affirmation de test circule",
  verdict: "FAUX",
  verdict_summary: "Résumé éditorial de test.",
  category: "SOCIETE",
  protagonists: [],
  consensus_score: 90,
  premises: [],
  is_published: true,
  published_at: "2026-10-16",
  sources: [],
};

test("le gabarit suit le format attendu sur un dossier réel", () => {
  const dossier = publishedSeedDossiers()[0];
  assert.ok(dossier !== undefined, "le seed doit contenir au moins un dossier publié");
  const text = buildShareText(dossier);
  assert.ok(
    text.startsWith(`${VERDICT_STAMPS[dossier.verdict]} : ${dossier.claim_title}`),
    `préfixe attendu « ${VERDICT_STAMPS[dossier.verdict]} : ${dossier.claim_title} », texte : ${text}`,
  );
  assert.match(text, /\. Démenti par .+\. Preuve et sources : /);
  assert.ok(text.endsWith(canonicalDossierUrl(dossier.slug)), text);
  assert.ok(text.includes(SITE_URL), "le lien copié doit porter l'adresse canonique");
});

test("chaque dossier publié produit un texte sourcé et vérifiable", () => {
  const dossiers = publishedSeedDossiers();
  assert.ok(dossiers.length > 0, "le seed doit publier des dossiers");
  for (const dossier of dossiers) {
    const text = buildShareText(dossier);
    assert.ok(
      text.includes(`https://preuve-publique.fr/dossiers/${dossier.slug}`),
      `lien canonique manquant pour ${dossier.slug}`,
    );
    assert.ok(!text.includes("undefined"), `valeur indéfinie dans le texte de ${dossier.slug}`);
    assert.ok(!/\s{2,}/.test(text), `espaces doubles dans le texte de ${dossier.slug}`);
    assert.equal(
      text,
      buildShareText(dossier),
      `le texte doit être déterministe pour ${dossier.slug}`,
    );
    // Le guard impose au moins une pièce : la phrase cite donc au moins une institution.
    assert.match(text, /Démenti par |Confirmé par /, `aucune institution citée pour ${dossier.slug}`);
  }
});

test("les deux pièces retenues sont les plus institutionnelles, à institutions distinctes", () => {
  const sources = [
    makeSource({ spectrum: "GAUCHE", author_or_institution: "Fondation Jean-Jaurès", display_order: 1 }),
    makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: "Insee", display_order: 4 }),
    makeSource({ spectrum: "DROITE_LIBERALE_CONSERVATRICE", author_or_institution: "Institut Montaigne", display_order: 2 }),
    makeSource({ spectrum: "ARCHIVE_PRIMAIRE", author_or_institution: "Journal officiel", display_order: 3 }),
  ];
  const picked = pickHeadlineSources(sources);
  assert.deepEqual(
    picked.map((source) => source.author_or_institution),
    ["Insee", "Journal officiel"],
  );

  const dossier = { ...BASE_DOSSIER, sources };
  assert.equal(
    buildShareText(dossier),
    "FAUX : Une affirmation de test circule. Démenti par Insee et Journal officiel. " +
      "Preuve et sources : https://preuve-publique.fr/dossiers/dossier-de-test",
  );
});

test("deux pièces du même auteur ne font pas deux démentis", () => {
  const sources = [
    makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: "Insee", display_order: 1 }),
    makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: "Insee", display_order: 2 }),
    makeSource({ spectrum: "CONSENSUS_ACADEMIQUE", author_or_institution: "INED", display_order: 3 }),
  ];
  const picked = pickHeadlineSources(sources);
  assert.deepEqual(
    picked.map((source) => source.author_or_institution),
    ["Insee", "INED"],
  );
});

test("une seule institution se cite sans conjonction", () => {
  const dossier = {
    ...BASE_DOSSIER,
    sources: [
      makeSource({ spectrum: "ARCHIVE_PRIMAIRE", author_or_institution: "Conseil d'État", display_order: 1 }),
    ],
  };
  assert.equal(
    buildShareText(dossier),
    "FAUX : Une affirmation de test circule. Démenti par Conseil d'État. " +
      "Preuve et sources : https://preuve-publique.fr/dossiers/dossier-de-test",
  );
});

test("un dossier confirmé ne dit pas « démenti »", () => {
  const dossier = {
    ...BASE_DOSSIER,
    verdict: "VRAI",
    sources: [
      makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: "Dares", display_order: 1 }),
      makeSource({ spectrum: "CONSENSUS_ACADEMIQUE", author_or_institution: "CNRS", display_order: 2 }),
    ],
  };
  const text = buildShareText(dossier);
  assert.ok(text.startsWith("VRAI : "), text);
  assert.match(text, /Confirmé par Dares et CNRS\./);
  assert.ok(!text.includes("Démenti"), text);
});

test("sans pièce, la phrase s'arrête au verdict et au lien", () => {
  const text = buildShareText({ ...BASE_DOSSIER, sources: [] });
  assert.equal(
    text,
    "FAUX : Une affirmation de test circule. Preuve et sources : https://preuve-publique.fr/dossiers/dossier-de-test",
  );
});

test("l'URL canonique ne double pas les slashes", () => {
  assert.equal(
    canonicalDossierUrl("mon-dossier", "https://preuve-publique.fr/"),
    "https://preuve-publique.fr/dossiers/mon-dossier",
  );
});

test("un titre déjà ponctué ne reçoit pas de point en trop", () => {
  const dossier = { ...BASE_DOSSIER, claim_title: "Le vaccin est-il dangereux ?" };
  assert.ok(buildShareText(dossier).startsWith("FAUX : Le vaccin est-il dangereux ? Preuve"), buildShareText(dossier));
});
