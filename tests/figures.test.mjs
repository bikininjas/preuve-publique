import assert from "node:assert/strict";
import test from "node:test";

import { REFERENCE_DOSSIER, publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import { formatAverageConsensus, registryFigures } from "../src/lib/figures.ts";

/**
 * Les chiffres du registre affichés sur l'accueil et sur la page des dossiers
 * sont des comptages : ce test fixe la règle pour qu'un chiffre d'apparence
 * calculée ne puisse pas devenir une valeur inventée.
 */

test("les chiffres du registre sont des comptages sur les dossiers reçus", () => {
  const dossiers = publishedSeedDossiers();
  const figures = registryFigures(dossiers);

  assert.equal(figures.dossiers, dossiers.length);
  assert.equal(
    figures.pieces,
    dossiers.reduce((total, dossier) => total + dossier.sources.length, 0),
  );
  assert.ok(figures.fingerprints >= 0 && figures.fingerprints <= figures.pieces);
  assert.ok(figures.pillars >= 0 && figures.pillars <= figures.dossiers * 6);
});

test("la moyenne des scores éditoriaux suit les dossiers, et ne divise jamais par zéro", () => {
  assert.equal(registryFigures([]).averageConsensus, null);
  assert.equal(registryFigures([]).dossiers, 0);

  const single = registryFigures([REFERENCE_DOSSIER]);
  assert.equal(single.averageConsensus, REFERENCE_DOSSIER.consensus_score);

  const many = registryFigures([REFERENCE_DOSSIER, REFERENCE_DOSSIER]);
  assert.equal(many.averageConsensus, REFERENCE_DOSSIER.consensus_score);
});

test("la moyenne s'affiche au dixième, en français, ou en tiret s'il n'y a rien à moyenner", () => {
  assert.equal(formatAverageConsensus(null), "—");
  assert.match(formatAverageConsensus(97.44), /^97,4\s*%$/);
  assert.match(formatAverageConsensus(100), /^100,0\s*%$/);
});
