import assert from "node:assert/strict";
import test from "node:test";

import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import { singleLineSummary, verdictParagraphs } from "../src/lib/summary.ts";

test("un résumé césuré rend ses paragraphes, dans l'ordre", () => {
  assert.deepEqual(verdictParagraphs("Un.\n\nDeux.\n\n\nTrois."), ["Un.", "Deux.", "Trois."]);
});

test("les blancs en trop sont absorbés et un bloc unique reste un bloc", () => {
  assert.deepEqual(verdictParagraphs("  Un.  \n\n \n\n  Deux. "), ["Un.", "Deux."]);
  assert.deepEqual(verdictParagraphs("Un seul bloc."), ["Un seul bloc."]);
  assert.deepEqual(verdictParagraphs(""), []);
});

test("la version mono-ligne aplatit les césures pour les balises meta", () => {
  assert.equal(singleLineSummary("Un.\n\nDeux."), "Un. Deux.");
  assert.equal(singleLineSummary("Sans césure."), "Sans césure.");
});

test("chaque dossier publié du seed a un résumé d'au moins deux paragraphes", () => {
  const offenders = publishedSeedDossiers()
    .filter((dossier) => verdictParagraphs(dossier.verdict_summary).length < 2)
    .map((dossier) => dossier.slug);
  assert.deepEqual(offenders, [], "résumé en un seul bloc — césurer avec \\n\\n dans le seed");
});
