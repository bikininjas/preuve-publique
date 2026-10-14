import assert from "node:assert/strict";
import test from "node:test";

import { browserSha256, canonicalProofText, toHex } from "../src/lib/canonical.ts";
import { computeCanonicalProofHash } from "../src/server/services/crypto.service.ts";
import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";

/**
 * Le badge « intégrité confirmée localement » n'a de valeur que si le calcul du
 * navigateur et celui du serveur donnent le même résultat. Ce test exécute les
 * deux moteurs — WebCrypto (celui du lecteur) et node:crypto (celui du site) —
 * sur la même chaîne canonique.
 */

const PAYLOAD = {
  source_name: "  Liberty Magazine, vol. 9 n° 28  ",
  author_or_institution: "Adolf Hitler, interviewé par George Sylvester Viereck",
  publication_date: "1932-07-09",
  exact_quote: "  Contrairement au marxisme, le socialisme ne répudie pas la propriété privée. ",
};

test("WebCrypto (navigateur) et node:crypto (serveur) donnent la même empreinte", async () => {
  const canonical = canonicalProofText(PAYLOAD);
  const fromBrowser = await browserSha256(canonical);
  assert.ok(fromBrowser !== null, "WebCrypto indisponible dans cet environnement");
  assert.equal(fromBrowser, computeCanonicalProofHash(PAYLOAD));
  assert.match(fromBrowser, /^[0-9a-f]{64}$/);
});

test("l'empreinte d'une pièce réelle se recalcule à l'identique côté navigateur", async () => {
  for (const dossier of publishedSeedDossiers()) {
    for (const source of dossier.sources) {
      const expected = computeCanonicalProofHash(source, source.archive_binary_sha256);
      const fromBrowser = await browserSha256(canonicalProofText(source));
      assert.equal(fromBrowser, expected, `pièce ${source.source_name}`);
    }
  }
});

test("le convertisseur hexadécimal reste stable", () => {
  assert.equal(toHex(new Uint8Array([0, 15, 16, 255])), "000f10ff");
  assert.equal(toHex(new Uint8Array([])), "");
});
