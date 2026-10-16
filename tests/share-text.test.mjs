import assert from "node:assert/strict";
import test from "node:test";

import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import { VERDICT_STAMPS } from "../src/lib/labels.ts";
import {
  SITE_URL,
  buildShareText,
  canonicalDossierUrl,
  headlineInstitutions,
  institutionName,
} from "../src/lib/share-text.ts";

/**
 * Le texte de partage est le seul endroit du site où le verdict part sans son
 * dossier : il doit rester fidèle aux données publiées — titre réel, verdict en
 * capitales, institutions réelles des pièces, lien canonique — et ne rien
 * promettre quand le dossier n'offre aucune institution habilitée à démentir.
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

const URL_TEST = "https://preuve-publique.fr/dossiers/dossier-de-test";

test("le gabarit suit le format attendu sur un dossier réel", () => {
  const dossier = publishedSeedDossiers()[0];
  assert.ok(dossier !== undefined, "le seed doit contenir au moins un dossier publié");
  const text = buildShareText(dossier);
  assert.ok(
    text.startsWith(`${VERDICT_STAMPS[dossier.verdict]} : ${dossier.claim_title}. `),
    `préfixe attendu « ${VERDICT_STAMPS[dossier.verdict]} : ${dossier.claim_title}. », texte : ${text}`,
  );
  assert.match(text, /\. (Démenti|Confirmé) par .+\. Preuve et sources : /);
  assert.ok(text.endsWith(canonicalDossierUrl(dossier.slug)), text);
  assert.ok(text.includes(SITE_URL), "le lien copié doit porter l'adresse canonique");
});

test("chaque dossier publié produit un texte déterministe et vérifiable", () => {
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
    assert.ok(!/\.\./.test(text), `point double dans le texte de ${dossier.slug} : ${text}`);
    assert.equal(
      text,
      buildShareText(dossier),
      `le texte doit être déterministe pour ${dossier.slug}`,
    );
    // Le guard impose une preuve primaire, une validation académique et deux
    // spectres : la phrase peut donc toujours nommer au moins une institution.
    assert.match(text, /(Démenti|Confirmé) par .+\. Preuve et sources : /, `démenti nommé manquant pour ${dossier.slug}`);
  }
});

test("seuls les piliers institutionnels sont cités, administrations puis institutions puis recherche", () => {
  const sources = [
    makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: "Insee", display_order: 4 }),
    makeSource({ spectrum: "GAUCHE", author_or_institution: "Fondation Jean-Jaurès", display_order: 1 }),
    makeSource({ spectrum: "CONSENSUS_ACADEMIQUE", author_or_institution: "INED", display_order: 3 }),
    makeSource({ spectrum: "DROITE_LIBERALE_CONSERVATRICE", author_or_institution: "Institut Montaigne", display_order: 2 }),
    makeSource({ spectrum: "CENTRE", author_or_institution: "Cour des comptes", display_order: 5 }),
  ];
  assert.deepEqual(headlineInstitutions(sources), ["Insee", "Cour des comptes"]);

  const dossier = { ...BASE_DOSSIER, sources };
  assert.equal(
    buildShareText(dossier),
    `FAUX : Une affirmation de test circule. Démenti par Insee et Cour des comptes. Preuve et sources : ${URL_TEST}`,
  );
});

test("deux pièces de la même institution ne font pas deux démentis", () => {
  const sources = [
    makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: "Insee", display_order: 1 }),
    makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: "Insee", display_order: 2 }),
    makeSource({ spectrum: "CONSENSUS_ACADEMIQUE", author_or_institution: "INED", display_order: 3 }),
  ];
  assert.deepEqual(headlineInstitutions(sources), ["Insee", "INED"]);
});

test("une pièce signée par des auteurs de l'institution déjà citée ne compte pas deux fois", () => {
  const sources = [
    makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: "ADEME", display_order: 1 }),
    makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: "Caroline Mir et Hamza El Jebbari, ADEME", display_order: 2 }),
    makeSource({ spectrum: "CONSENSUS_ACADEMIQUE", author_or_institution: "GIEC", display_order: 3 }),
    makeSource({ spectrum: "CENTRE", author_or_institution: "Agence internationale de l'énergie, rapport annuel Global EV Outlook, publié le 24 avril 2024", display_order: 4 }),
  ];
  /* Noms courts d'abord : « ADEME » et « GIEC » plutôt que la notice de l'AIE. */
  assert.deepEqual(headlineInstitutions(sources), ["ADEME", "GIEC"]);
});

test("un entretien n'est pas une institution : la pièce est écartée du démenti nommé", () => {
  const sources = [
    makeSource({ spectrum: "CENTRE", author_or_institution: "Propos recueillis par Virginie Larousse", display_order: 1 }),
    makeSource({ spectrum: "CONSENSUS_ACADEMIQUE", author_or_institution: "Joshua J. Little, Pembroke College, université d'Oxford, 2022", display_order: 2 }),
  ];
  assert.deepEqual(headlineInstitutions(sources), ["Joshua J. Little, Pembroke College, université d'Oxford"]);
});

test("une seule institution se cite sans conjonction", () => {
  const dossier = {
    ...BASE_DOSSIER,
    sources: [
      makeSource({ spectrum: "CENTRE", author_or_institution: "Conseil d'État (France)", display_order: 1 }),
    ],
  };
  assert.equal(
    buildShareText(dossier),
    `FAUX : Une affirmation de test circule. Démenti par Conseil d'État (France). Preuve et sources : ${URL_TEST}`,
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

test("sans institution habilitée, la phrase s'arrête au verdict et au lien", () => {
  /* L'archive primaire peut être signée du sujet de l'affirmation : la citer
     comme « démenti » serait faux, donc elle n'est jamais retenue. */
  const dossier = {
    ...BASE_DOSSIER,
    sources: [
      makeSource({ spectrum: "ARCHIVE_PRIMAIRE", author_or_institution: "Adolf Hitler, interviewé par George Sylvester Viereck", display_order: 1 }),
      makeSource({ spectrum: "GAUCHE", author_or_institution: "L'Humanité", display_order: 2 }),
    ],
  };
  assert.deepEqual(headlineInstitutions(dossier.sources), []);
  assert.equal(
    buildShareText(dossier),
    `FAUX : Une affirmation de test circule. Preuve et sources : ${URL_TEST}`,
  );
});

test("le nom cité perd sa glose et sa parenthèse longue, jamais son début", () => {
  assert.equal(
    institutionName("SSMSI — Service statistique ministériel de la sécurité intérieure (ministère de l'Intérieur)"),
    "SSMSI",
  );
  assert.equal(
    institutionName("DREES (Direction de la recherche, des études, de l'évaluation et des statistiques)"),
    "DREES",
  );
  assert.equal(institutionName("Cour des comptes (France)"), "Cour des comptes (France)");
  assert.equal(institutionName("Ian Kershaw (Oxford), Richard J. Evans (Cambridge), Johann Chapoutot (Sorbonne)"), "Ian Kershaw (Oxford), Richard J. Evans (Cambridge), Johann Chapoutot (Sorbonne)");
  assert.equal(
    institutionName("Guido Barbujani, Arianna Magagni, Eric Minch et L. Luca Cavalli-Sforza, PNAS, 1997"),
    "Guido Barbujani, Arianna Magagni, Eric Minch et L. Luca Cavalli-Sforza, PNAS…",
  );
});

test("une coupe au-delà de la limite se voit et tombe sur un mot entier", () => {
  const long = "Ministère des Solidarités, de l'Autonomie et des Personnes handicapées / Assemblée nationale";
  const name = institutionName(long);
  assert.equal(name, "Ministère des Solidarités, de l'Autonomie et des Personnes handicapées…");
  assert.ok(long.startsWith(name.slice(0, -1)), name);

  const dossier = {
    ...BASE_DOSSIER,
    sources: [makeSource({ spectrum: "DONNEES_BRUTES_OFFICIELLES", author_or_institution: long, display_order: 1 })],
  };
  const text = buildShareText(dossier);
  assert.ok(text.includes("handicapées… Preuve et sources : "), text);
});

test("l'URL canonique ne double pas les slashes", () => {
  assert.equal(
    canonicalDossierUrl("mon-dossier", "https://preuve-publique.fr/"),
    "https://preuve-publique.fr/dossiers/mon-dossier",
  );
});

test("un titre déjà ponctué ne reçoit pas de point en trop", () => {
  const dossier = { ...BASE_DOSSIER, claim_title: "Le vaccin est-il dangereux ?" };
  const text = buildShareText(dossier);
  assert.ok(text.startsWith("FAUX : Le vaccin est-il dangereux ? Preuve"), text);
});
