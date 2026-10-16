import assert from "node:assert/strict";
import test from "node:test";

import { pickRandomDossierSlug } from "../src/lib/random-dossier.ts";

test("liste vide : aucun tirage", () => {
  assert.equal(pickRandomDossierSlug([]), null);
});

test("un seul dossier : il sort toujours", () => {
  assert.equal(pickRandomDossierSlug(["a"]), "a");
  assert.equal(pickRandomDossierSlug(["a"], () => 0.999), "a");
});

test("le tirage couvre la liste, bornes incluses", () => {
  const slugs = ["a", "b", "c"];
  assert.equal(pickRandomDossierSlug(slugs, () => 0), "a");
  assert.equal(pickRandomDossierSlug(slugs, () => 0.5), "b");
  assert.equal(pickRandomDossierSlug(slugs, () => 0.999999), "c");
});

test("un générateur qui renvoie 1 (hors [0,1[) ne déborde pas", () => {
  assert.equal(pickRandomDossierSlug(["a", "b"], () => 1), "b");
});

test("tout tirage retombe dans la liste", () => {
  const slugs = ["a", "b", "c", "d"];
  for (let i = 0; i <= 100; i += 1) {
    const slug = pickRandomDossierSlug(slugs, () => i / 100);
    assert.ok(slug !== null && slugs.includes(slug), `tirage hors liste pour ${i / 100}`);
  }
});
