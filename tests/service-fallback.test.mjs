import assert from "node:assert/strict";
import test from "node:test";

import { computeCanonicalProofHash } from "../src/server/services/crypto.service.ts";
import {
  clearDossierCache,
  getPublishedDossier,
  listPublishedDossiers,
  searchPublishedDossiers,
} from "../src/server/services/dossier.service.ts";

/**
 * Garde-fou du mode de repli : sans Supabase, le service doit servir exactement
 * les mêmes empreintes dérivées qu'en base. Sans ce contrôle, le repli
 * affichait des empreintes nulles et l'audit `/api/verify` répondait 404 en
 * local alors qu'il répond 200 en production — deux comportements pour la même
 * donnée.
 */

function withoutSupabase() {
  for (const name of [
    "SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ]) {
    delete process.env[name];
  }
  clearDossierCache();
}

test("le repli local sert des empreintes dérivées, identiques à celles de la base", async () => {
  withoutSupabase();

  const list = await listPublishedDossiers();
  assert.equal(list.ok, true);
  assert.equal(list.origin, "seed");
  assert.equal(list.value.length, 29);

  const dossier = await getPublishedDossier("hitler-et-les-nazis-etaient-de-gauche");
  assert.equal(dossier.ok, true);
  assert.equal(dossier.origin, "seed");
  assert.ok(dossier.value !== null);
  assert.equal(dossier.value.sources.length, 8);
  for (const source of dossier.value.sources) {
    assert.match(source.archive_sha256, /^[0-9a-f]{64}$/);
    assert.equal(source.archive_sha256, computeCanonicalProofHash(source, null));
    assert.equal(source.archive_binary_sha256, null);
  }
});

test("le repli local ne publie jamais le brouillon et répond sur la recherche", async () => {
  withoutSupabase();

  const draft = await getPublishedDossier("brouillon-de-controle-rls");
  assert.equal(draft.ok, true);
  assert.equal(draft.value, null);

  const search = await searchPublishedDossiers("nazis");
  assert.equal(search.ok, true);
  assert.equal(search.origin, "seed");
  assert.equal(search.value.length, 2);
  assert.match(search.value[0].sources[0].archive_sha256, /^[0-9a-f]{64}$/);
});
