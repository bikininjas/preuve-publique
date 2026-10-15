import assert from "node:assert/strict";
import test from "node:test";

import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import {
  assertPublishableDossier,
  triangulationIssues,
  withDerivedProofHashes,
  dossierSchema,
} from "../src/server/validators/dossier.schema.ts";

function publishable() {
  return assertPublishableDossier(publishedSeedDossiers()[0]);
}

function issuesOf(mutate) {
  const dossier = publishable();
  const broken = mutate(structuredClone(dossier));
  return triangulationIssues(broken).map((issue) => issue.code);
}

test("le dossier de référence passe le validateur (avec ses empreintes dérivées)", () => {
  const dossier = publishable();
  assert.equal(dossier.is_published, true);
  assert.deepEqual(triangulationIssues(dossier), []);
  for (const source of dossier.sources) {
    assert.match(source.archive_sha256, /^[0-9a-f]{64}$/);
  }
});

test("un dossier publié sans preuve primaire est refusé", () => {
  const codes = issuesOf((dossier) => {
    dossier.sources = dossier.sources.filter(
      (source) => source.spectrum !== "ARCHIVE_PRIMAIRE" && source.spectrum !== "DONNEES_BRUTES_OFFICIELLES",
    );
    return dossier;
  });
  assert.ok(codes.includes("TRIANGULATION_PRIMARY_REQUIRED"), codes.join(","));
});

test("un dossier publié sans validation académique est refusé", () => {
  const codes = issuesOf((dossier) => {
    dossier.sources = dossier.sources.filter((source) => source.spectrum !== "CONSENSUS_ACADEMIQUE");
    return dossier;
  });
  assert.ok(codes.includes("TRIANGULATION_ACADEMIC_REQUIRED"), codes.join(","));
});

test("un dossier publié sans pluralisme politique est refusé", () => {
  const codes = issuesOf((dossier) => {
    dossier.sources = dossier.sources.filter(
      (source) => source.spectrum !== "DROITE_LIBERALE_CONSERVATRICE" && source.spectrum !== "GAUCHE",
    );
    dossier.sources.push({
      ...dossier.sources[0],
      id: "source-sociale-demo",
      spectrum: "GAUCHE",
      display_order: 99,
    });
    return dossier;
  });
  assert.ok(codes.includes("TRIANGULATION_PLURALISM_REQUIRED"), codes.join(","));
});

test("une source sans empreinte valide bloque la publication", () => {
  const codes = issuesOf((dossier) => {
    dossier.sources[0].archive_sha256 = "pas-une-empreinte";
    return dossier;
  });
  assert.ok(codes.includes("TRIANGULATION_PROOF_HASH_REQUIRED"), codes.join(","));
});

test("une citation vide bloque la publication", () => {
  const codes = issuesOf((dossier) => {
    dossier.sources[0].exact_quote = "   ";
    return dossier;
  });
  assert.ok(codes.includes("TRIANGULATION_QUOTE_REQUIRED"), codes.join(","));
});

test("un brouillon incomplet reste acceptable : la règle ne vise que la publication", () => {
  const draft = withDerivedProofHashes({
    id: "brouillon",
    slug: "brouillon-de-test",
    claim_title: "Brouillon",
    verdict: "FAUX",
    verdict_summary: "En cours d'instruction.",
    category: "SOCIETE",
    protagonists: [],
    consensus_score: 0,
    premises: [],
    is_published: false,
    published_at: null,
    sources: [],
  });
  assert.deepEqual(triangulationIssues(draft), []);
  assert.equal(dossierSchema.safeParse(draft).success, true);
});

test("l'empreinte est dérivée quand elle manque, jamais inventée quand elle est fausse", () => {
  const base = publishedSeedDossiers()[0];
  const source = base.sources[0];
  const derived = withDerivedProofHashes({
    ...base,
    sources: [{ ...source, archive_sha256: null }],
  });
  assert.match(derived.sources[0].archive_sha256, /^[0-9a-f]{64}$/);

  const wrong = withDerivedProofHashes({
    ...base,
    sources: [{ ...source, archive_sha256: "f".repeat(64) }],
  });
  assert.equal(wrong.sources[0].archive_sha256, "f".repeat(64));
});
