import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import {
  canonicalProofText,
  computeCanonicalProofHash,
  computeIntegrityRoot,
  isValidSha256,
} from "../src/server/services/crypto.service.ts";

const PAYLOAD = {
  source_name: "  Liberty Magazine, vol. 9 n° 28  ",
  author_or_institution: "Adolf Hitler, interviewé par George Sylvester Viereck",
  publication_date: "1932-07-09",
  exact_quote: "  Le socialisme [national-socialiste] ne répudie pas la propriété privée. ",
};

test("la chaîne canonique est exactement celle que le site annonce", () => {
  assert.equal(
    canonicalProofText(PAYLOAD),
    "Liberty Magazine, vol. 9 n° 28|Adolf Hitler, interviewé par George Sylvester Viereck|1932-07-09|Le socialisme [national-socialiste] ne répudie pas la propriété privée.",
  );
});

test("l'empreinte est le SHA-256 de la chaîne canonique (vérifiable hors du code)", () => {
  const expected = createHash("sha256")
    .update(canonicalProofText(PAYLOAD), "utf8")
    .digest("hex");
  assert.equal(computeCanonicalProofHash(PAYLOAD), expected);
  assert.match(computeCanonicalProofHash(PAYLOAD), /^[0-9a-f]{64}$/);
  assert.equal(isValidSha256(expected), true);
});

test("la normalisation Unicode ne change pas le résultat", () => {
  const composed = { ...PAYLOAD, source_name: "Déjà vu" };
  const decomposed = { ...PAYLOAD, source_name: "De\u0301ja\u0300 vu" };
  assert.equal(computeCanonicalProofHash(composed), computeCanonicalProofHash(decomposed));
});

test("une date absente est représentée par un champ vide, jamais inventée", () => {
  const undated = { ...PAYLOAD, publication_date: null };
  assert.ok(canonicalProofText(undated).includes("|1932|") === false);
  assert.equal(canonicalProofText(undated).split("|")[2], "");
});

test("l'empreinte de capture se combine sans écraser celle de la citation", () => {
  const binary = createHash("sha256").update("archive binaire", "utf8").digest("hex");
  const combined = computeCanonicalProofHash(PAYLOAD, binary);
  assert.notEqual(combined, computeCanonicalProofHash(PAYLOAD));
  assert.equal(
    combined,
    createHash("sha256")
      .update(`${canonicalProofText(PAYLOAD)}|binary:${binary}`, "utf8")
      .digest("hex"),
  );
});

test("la racine d'intégrité ne dépend pas de l'ordre des sources", () => {
  const a = computeCanonicalProofHash(PAYLOAD);
  const b = computeCanonicalProofHash({ ...PAYLOAD, source_name: "Autre source" });
  assert.equal(computeIntegrityRoot([a, b]), computeIntegrityRoot([b, a]));
  assert.notEqual(computeIntegrityRoot([a, b]), computeIntegrityRoot([a]));
});

test("une empreinte mal formée est refusée", () => {
  assert.equal(isValidSha256("8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4"), true);
  assert.equal(isValidSha256("ABC"), false);
  assert.equal(isValidSha256(""), false);
  assert.equal(isValidSha256("Z".repeat(64)), false);
  assert.equal(isValidSha256(null), false);
});
