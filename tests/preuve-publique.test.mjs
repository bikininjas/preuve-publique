import assert from "node:assert/strict";
import test from "node:test";

import {
  DRAFT_CONTROL_DOSSIER,
  REFERENCE_DOSSIER,
  publishedSeedDossiers,
} from "../src/db/seed-fallback.ts";
import { SPECTRUM_ORDER } from "../src/lib/labels.ts";
import { searchSeedDossiers } from "../src/lib/search.ts";
import { documentedSpectra } from "../src/lib/types.ts";

const HASH = /^[0-9a-f]{64}$/;

test("le dossier de référence est publiable et complet", () => {
  assert.equal(REFERENCE_DOSSIER.is_published, true);
  assert.equal(REFERENCE_DOSSIER.verdict, "FAUX");
  assert.equal(REFERENCE_DOSSIER.slug, "hitler-et-les-nazis-etaient-de-gauche");
  assert.ok(REFERENCE_DOSSIER.premises.length >= 3);
  assert.ok(REFERENCE_DOSSIER.sources.length >= 6);
  assert.ok(
    REFERENCE_DOSSIER.consensus_score >= 0 && REFERENCE_DOSSIER.consensus_score <= 100,
  );
});

test("aucune source ne porte d'empreinte inventée", () => {
  for (const dossier of [REFERENCE_DOSSIER, DRAFT_CONTROL_DOSSIER]) {
    for (const source of dossier.sources) {
      if (source.archive_sha256 !== null) {
        assert.match(source.archive_sha256, HASH);
      }
      assert.ok(source.exact_quote.trim().length > 20);
      assert.ok(source.context_explanation.trim().length > 20);
      assert.ok(SPECTRUM_ORDER.includes(source.spectrum));
    }
  }
});

test("les piliers documentés se calculent sur les sources", () => {
  const covered = documentedSpectra(REFERENCE_DOSSIER.sources);
  assert.deepEqual(
    [...covered].sort(),
    [
      "ARCHIVE_PRIMAIRE",
      "CONSENSUS_ACADEMIQUE",
      "DROITE_LIBERALE_CONSERVATRICE",
      "GAUCHE",
    ].sort(),
  );
  assert.equal(covered.length, 4);
});

test("le brouillon de contrôle n'est jamais publié", () => {
  const published = publishedSeedDossiers().map((dossier) => dossier.slug);
  assert.ok(!published.includes(DRAFT_CONTROL_DOSSIER.slug));
  assert.equal(published.length, 1);
});

test("la recherche locale trouve le dossier par son titre et par une citation", () => {
  for (const query of ["nazis", "socialiste", "secteur privé 1934", "propriété privée"]) {
    const results = searchSeedDossiers(query);
    assert.equal(results.length, 1, `attendu un résultat pour « ${query} »`);
  }
  assert.equal(searchSeedDossiers("zzzz").length, 0);
});

test("la recherche ignore casse et accents", () => {
  assert.equal(searchSeedDossiers("ETAiENT de GAUCHE").length, 1);
  assert.equal(searchSeedDossiers("propriete privee").length, 1);
});
