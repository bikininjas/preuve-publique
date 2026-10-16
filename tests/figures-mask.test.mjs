import assert from "node:assert/strict";
import test from "node:test";

import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import { isKeyFigure, keyFigures, splitFigures } from "../src/lib/figures-mask.ts";

/**
 * Le caviardage des chiffres est **visuel** : il recouvre, il ne réécrit rien.
 * Le seul invariant qui compte — la concaténation des segments rend le texte
 * d'origine, caractère pour caractère — est vérifié sur des cas tordus puis sur
 * toute la prose publiée du seed.
 */

const join = (text) => splitFigures(text).map((segment) => segment.text).join("");

test("la découpe ne perd ni ne réécrit un seul caractère", () => {
  const texts = [
    "",
    "Aucun chiffre ici, que des mots.",
    "L'immigration coûte « des dizaines de milliards d'euros » par an (chiffre non documenté).",
    "En 2024, 1 200 € par mois — soit 45 % du SMIC — et 12,5 points de plus.",
    "Le 2026-10-16, 3 personnes, 5 % de hausse.",
    "Un espace insécable : 1\u00a0200 € et un espace fin : 1\u202f200 €.",
  ];
  for (const text of texts) {
    assert.equal(join(text), text, `perte de caractères dans : ${text}`);
  }
});

test("les chiffres clés sont reconnus : montants, pourcentages, dates", () => {
  assert.deepEqual(keyFigures("Le RSA s'élève à 635 € par mois."), ["635 €"]);
  assert.deepEqual(keyFigures("Une hausse de 45 % en dix ans."), ["45 %"]);
  assert.deepEqual(keyFigures("Publié le 2026-10-16."), ["2026-10-16"]);
  assert.deepEqual(keyFigures("Entre 1 200 € et 2 000 € par mois."), ["1 200 €", "2 000 €"]);
  assert.deepEqual(keyFigures("1,5 milliard d'euros"), ["1,5 milliard"]);
  assert.deepEqual(keyFigures("5 % seulement."), ["5 %"], "une unité qualifie un chiffre court");
  assert.deepEqual(keyFigures("il y a 10 ans"), ["10 ans"]);
});

test("un chiffre isolé n'est pas un secret d'État", () => {
  assert.equal(isKeyFigure("3"), false);
  assert.deepEqual(keyFigures("Article 3 du texte."), []);
  assert.deepEqual(keyFigures("les 3 piliers"), []);
});

test("la prose publiée entière passe la découpe sans perte", () => {
  const dossiers = publishedSeedDossiers();
  assert.ok(dossiers.length > 0, "le seed doit publier des dossiers");
  let figures = 0;
  for (const dossier of dossiers) {
    const texts = [
      dossier.verdict_summary,
      ...dossier.premises.flatMap((premise) => [premise.claim_part, premise.detail]),
    ];
    for (const text of texts) {
      assert.equal(join(text), text, `${dossier.slug} : perte de caractères`);
      for (const figure of keyFigures(text)) {
        assert.ok(text.includes(figure), `${dossier.slug} : chiffre inventé (${figure})`);
        figures += 1;
      }
    }
  }
  assert.ok(figures > 20, `chiffres clés repérés dans le seed : ${figures}`);
});
