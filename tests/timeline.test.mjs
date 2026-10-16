import assert from "node:assert/strict";
import test from "node:test";

import { parseTimelineEvents } from "../src/lib/timeline.ts";

test("une chronologie absente ou d'un autre type rend une liste vide", () => {
  assert.deepEqual(parseTimelineEvents(undefined), []);
  assert.deepEqual(parseTimelineEvents(null), []);
  assert.deepEqual(parseTimelineEvents("1990-09-12"), []);
  assert.deepEqual(parseTimelineEvents({ date: "1990-09-12" }), []);
});

test("les étapes valides sont lues dans l'ordre, avec leur renvoi de pièce", () => {
  const parsed = parseTimelineEvents([
    {
      date: "1990-09-12",
      title: "Signature du traité « 2+4 »",
      description: "Le traité ne dit rien de l'élargissement de l'OTAN.",
      evidence_ref: "Pièce #01",
    },
    {
      date: "1994-12-05",
      title: "Mémorandum de Budapest",
      description: "La Russie s'engage sur les frontières existantes.",
      evidence_ref: null,
    },
  ]);
  assert.equal(parsed.length, 2);
  assert.deepEqual(parsed[0], {
    date: "1990-09-12",
    title: "Signature du traité « 2+4 »",
    description: "Le traité ne dit rien de l'élargissement de l'OTAN.",
    evidence_ref: "Pièce #01",
  });
  assert.equal(parsed[1].evidence_ref, null);
});

test("une étape illisible est écartée, jamais devinée", () => {
  const parsed = parseTimelineEvents([
    { date: "1990-09-12", title: "Sans description" },
    { date: "", title: "Date vide", description: "…" },
    { title: "Sans date", description: "…" },
    "texte libre",
    {
      date: "2014-10-16",
      title: "Entretien Gorbatchev",
      description: "Étape valide.",
      evidence_ref: 42,
    },
  ]);
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].title, "Entretien Gorbatchev");
  assert.equal(parsed[0].evidence_ref, null);
});

test("les champs en trop sont ignorés sans bruit", () => {
  const parsed = parseTimelineEvents([
    {
      date: "2017",
      title: "Publication du National Security Archive",
      description: "Les mémorandums de 1990 sont déclassifiés.",
      evidence_ref: "Pièce #05",
      extra: true,
    },
  ]);
  assert.deepEqual(parsed[0], {
    date: "2017",
    title: "Publication du National Security Archive",
    description: "Les mémorandums de 1990 sont déclassifiés.",
    evidence_ref: "Pièce #05",
  });
});
