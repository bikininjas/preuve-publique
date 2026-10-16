import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import {
  browserSha256Bytes,
  scrambleFrame,
  truncateHash,
  verificationTarget,
  verifyPiece,
} from "../src/lib/archive-verification.ts";
import { canonicalProofText } from "../src/lib/canonical.ts";
import { computeCanonicalProofHash } from "../src/server/services/crypto.service.ts";
import { withDerivedProofHashes } from "../src/server/validators/dossier.schema.ts";

/**
 * Le scellé d'archive n'a de valeur que s'il vérifie quelque chose de réel :
 * les octets de la capture au miroir quand elle est déposée, la chaîne
 * canonique de la citation sinon — et rien du tout quand aucune empreinte
 * n'existe. Ces tests tiennent les trois chemins, le brouillage du terminal et
 * la robustesse sans WebCrypto.
 */

const sha256Hex = (text) => createHash("sha256").update(text).digest("hex");

function makeSource(overrides) {
  return {
    id: overrides.id ?? "00000000-0000-4000-8000-000000000001",
    spectrum: overrides.spectrum ?? "ARCHIVE_PRIMAIRE",
    source_name: overrides.source_name ?? "Pièce de test",
    author_or_institution: overrides.author_or_institution ?? "Institution de test",
    publication_date: overrides.publication_date ?? "2026-01-01",
    quote_kind: overrides.quote_kind ?? "CITATION_EXACTE",
    exact_quote: overrides.exact_quote ?? "Citation de test.",
    context_explanation: "Contexte de test.",
    original_url: null,
    author_reference_url: null,
    archive_storage_path: null,
    archive_sha256: overrides.archive_sha256 ?? null,
    archive_binary_sha256: overrides.archive_binary_sha256 ?? null,
    display_order: overrides.display_order ?? 1,
  };
}

test("l'empreinte abrégée garde le début et la fin, jamais le milieu", () => {
  const hash = "a3f8b9c0".repeat(8);
  assert.equal(hash.length, 64);
  assert.equal(truncateHash(hash), "a3f8b9…b9c0");
  assert.equal(truncateHash("court"), "court");
  assert.ok(truncateHash(hash).length < hash.length);
});

test("le brouillage garde longueur et alphabet, et se fixe sur l'empreinte réelle", () => {
  const target = "a3f8b9c0".repeat(8);
  assert.equal(target.length, 64);
  const frame = scrambleFrame(target, 4, () => 0.5);
  assert.equal(frame.length, target.length);
  assert.match(frame, /^[0-9a-f]{64}$/);
  assert.equal(frame.slice(0, 4), target.slice(0, 4), "le préfixe fixé doit être le vrai");
  assert.notEqual(frame, target, "un brouillage non terminé doit brouiller");
  /* Dernière image : exactement l'empreinte réelle — aucun hexadécimal de décor. */
  assert.equal(scrambleFrame(target, target.length, () => 0.5), target);
  assert.equal(scrambleFrame(target, 999, () => 0.5), target);
});

test("les octets sont hachés à l'identique de node:crypto", async () => {
  const bytes = new TextEncoder().encode("abc").buffer;
  assert.equal(await browserSha256Bytes(bytes), sha256Hex("abc"));
});

test("le scellé vise la capture quand elle est déposée, la citation sinon, rien faute d'empreinte", () => {
  const binary = makeSource({ archive_binary_sha256: "b".repeat(64), archive_sha256: "a".repeat(64) });
  const capture = verificationTarget(binary);
  assert.equal(capture.kind, "capture");
  assert.equal(capture.url, `/api/archives/${"b".repeat(64)}`);

  const citation = verificationTarget(makeSource({ archive_sha256: "a".repeat(64) }));
  assert.equal(citation.kind, "citation");
  assert.equal(citation.canonical, canonicalProofText(makeSource({})));

  assert.equal(verificationTarget(makeSource({})).kind, "none");
});

test("une capture dont les octets redonnent l'empreinte est vérifiée", async () => {
  const bytes = new TextEncoder().encode("contenu capturé, octet pour octet").buffer;
  const hash = await browserSha256Bytes(bytes);
  const source = makeSource({ archive_binary_sha256: hash });
  const outcome = await verifyPiece(source, async () => bytes);
  assert.deepEqual(outcome, { status: "verified", kind: "capture" });
});

test("une capture altérée sort en divergence, avec l'empreinte recalculée", async () => {
  const source = makeSource({ archive_binary_sha256: sha256Hex("ce que le serveur annonce") });
  const altered = new TextEncoder().encode("ce que le serveur sert vraiment").buffer;
  const outcome = await verifyPiece(source, async () => altered);
  assert.equal(outcome.status, "divergent");
  assert.equal(outcome.computed, sha256Hex("ce que le serveur sert vraiment"));
});

test("capture illisible ou téléchargement refusé : la vérification le dit", async () => {
  const source = makeSource({ archive_binary_sha256: "c".repeat(64) });
  const refused = await verifyPiece(source, async () => null);
  assert.equal(refused.status, "unavailable");
  assert.match(refused.reason, /indisponible/);
  const broken = await verifyPiece(source, async () => {
    throw new Error("réseau coupé");
  });
  assert.equal(broken.status, "unavailable");
  assert.match(broken.reason, /réseau coupé/);
});

test("sans WebCrypto, la vérification s'arrête au lieu de faire semblant", async () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "crypto");
  if (descriptor === undefined || !descriptor.configurable) {
    return; /* environnement qui fige crypto : rien à tester ici */
  }
  try {
    Object.defineProperty(globalThis, "crypto", { value: undefined, configurable: true });
    const outcome = await verifyPiece(makeSource({ archive_sha256: "d".repeat(64) }));
    assert.equal(outcome.status, "unavailable");
    assert.match(outcome.reason, /WebCrypto/);
  } finally {
    Object.defineProperty(globalThis, "crypto", descriptor);
  }
});

test("chaque pièce publiée du seed se vérifie de bout en bout (citation canonique)", async () => {
  const dossiers = publishedSeedDossiers().map(withDerivedProofHashes);
  let checked = 0;
  for (const dossier of dossiers) {
    for (const source of dossier.sources) {
      const target = verificationTarget(source);
      assert.equal(target.kind, "citation", `${dossier.slug} : les pièces du seed n'ont pas de capture binaire`);
      const outcome = await verifyPiece(source);
      assert.equal(outcome.status, "verified", `${dossier.slug} : ${source.source_name}`);
      checked += 1;
    }
  }
  assert.ok(checked > 100, `pièces vérifiées : ${checked}`);
});

test("l'empreinte de citation intègre la capture quand elle existe : les octets d'abord", () => {
  const source = makeSource({ archive_binary_sha256: "e".repeat(64) });
  const canonical = canonicalProofText(source);
  /* C'est la raison d'être de l'ordre : la citation seule ne suffirait pas à
     retrouver une empreinte liée à sa capture. */
  assert.notEqual(computeCanonicalProofHash(source, source.archive_binary_sha256), sha256Hex(canonical));
  assert.equal(verificationTarget(source).kind, "capture");
});
