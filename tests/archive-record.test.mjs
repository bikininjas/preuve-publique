import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import { buildArchiveRecord, archiveRecordPath } from "../src/lib/archive-record.ts";
import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import { withDerivedProofHashes } from "../src/server/validators/dossier.schema.ts";

const DOSSIER = publishedSeedDossiers()[0];
const SOURCE = withDerivedProofHashes(DOSSIER).sources[0];

function build(outcome) {
  return buildArchiveRecord({
    dossier: {
      id: DOSSIER.id,
      slug: DOSSIER.slug,
      claim_title: DOSSIER.claim_title,
      verdict: DOSSIER.verdict,
    },
    source: SOURCE,
    capturedAt: "2026-10-14T12:00:00.000Z",
    outcome,
  });
}

test("la fiche est déterministe : mêmes entrées, mêmes octets", () => {
  const first = build({ kind: "METADATA_ONLY", reason: "test" });
  const second = build({ kind: "METADATA_ONLY", reason: "test" });
  assert.equal(first.content, second.content);
  assert.equal(
    createHash("sha256").update(first.content, "utf8").digest("hex"),
    createHash("sha256").update(second.content, "utf8").digest("hex"),
  );
  assert.equal(first.path, archiveRecordPath(DOSSIER, SOURCE));
});

test("la fiche porte de quoi recalculer l'empreinte de la citation", () => {
  const { content } = build({ kind: "METADATA_ONLY", reason: "test" });
  const record = JSON.parse(content);
  assert.equal(record.schema, "preuve-publique/archive-record/v1");
  assert.equal(record.citation.sha256, SOURCE.archive_sha256);
  assert.equal(
    record.citation.canonical_text,
    [
      SOURCE.source_name,
      SOURCE.author_or_institution,
      SOURCE.publication_date,
      SOURCE.exact_quote,
    ].join("|"),
  );
  assert.ok(Array.isArray(record.limits) && record.limits.length >= 3);
});

test("la fiche dit toujours ce que la capture a réellement fait", () => {
  const metadataOnly = JSON.parse(build({ kind: "METADATA_ONLY", reason: "pas d'URL" }).content);
  assert.equal(metadataOnly.capture.kind, "METADATA_ONLY");

  const snapshot = JSON.parse(
    build({
      kind: "URL_SNAPSHOT",
      url: "https://example.test/doc",
      status: 200,
      contentType: "text/html",
      bytes: 1234,
      sha256: "a".repeat(64),
    }).content,
  );
  assert.equal(snapshot.capture.kind, "URL_SNAPSHOT");
  assert.equal(snapshot.capture.bytes, 1234);

  const unavailable = JSON.parse(
    build({ kind: "URL_UNAVAILABLE", url: "https://example.test/doc", reason: "HTTP 403" }).content,
  );
  assert.equal(unavailable.capture.kind, "URL_UNAVAILABLE");
  assert.equal(unavailable.capture.reason, "HTTP 403");
});

test("les chaînes sont normalisées en NFC", () => {
  const decomposed = { ...SOURCE, source_name: "De\u0301ja\u0300 vu" };
  const { content } = buildArchiveRecord({
    dossier: {
      id: DOSSIER.id,
      slug: DOSSIER.slug,
      claim_title: DOSSIER.claim_title,
      verdict: DOSSIER.verdict,
    },
    source: decomposed,
    capturedAt: "2026-10-14T12:00:00.000Z",
    outcome: { kind: "METADATA_ONLY", reason: "test" },
  });
  assert.ok(content.includes("Déjà vu"));
  assert.ok(!content.includes("De\u0301ja\u0300"));
});

test("le chemin de dépôt est stable et sans caractère exotique", () => {
  const path = archiveRecordPath(DOSSIER, SOURCE);
  assert.match(path, /^[a-z0-9-]+\/[a-z0-9-]+\.json$/);
  assert.ok(path.startsWith("hitler-et-les-nazis-etaient-de-gauche/"));
});
