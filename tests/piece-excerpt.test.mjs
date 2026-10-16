import assert from "node:assert/strict";
import test from "node:test";

import { publishedSeedDossiers } from "../src/db/seed-fallback.ts";
import {
  VERBATIM_MARKER,
  excerptClasses,
  excerptText,
  isVerbatim,
} from "../src/lib/piece-excerpt.ts";

/**
 * Règle éditoriale : le trait de surligneur marque le verbatim, jamais un
 * résumé. Ces tests la tiennent sur les pièces réelles du seed — c'est le
 * genre de règle qui se perd silencieusement quand on retouche une carte.
 */

test("une citation exacte reçoit le papier d'archive et le trait de surligneur", () => {
  assert.equal(isVerbatim("CITATION_EXACTE"), true);
  assert.equal(excerptClasses("CITATION_EXACTE"), "pp-extrait pp-extrait--citation");
  assert.equal(excerptText("CITATION_EXACTE", "Le texte exact."), "« Le texte exact. »");
});

test("un fait documenté reçoit le papier d'archive mais jamais le trait", () => {
  assert.equal(isVerbatim("FAIT_DOCUMENTE"), false);
  assert.equal(excerptClasses("FAIT_DOCUMENTE"), "pp-extrait pp-extrait--fait");
  assert.ok(!excerptClasses("FAIT_DOCUMENTE").includes(VERBATIM_MARKER));
  assert.ok(!excerptClasses("FAIT_DOCUMENTE").includes("citation"));
  // Pas de guillemets : un résumé ne se donne pas pour du verbatim.
  assert.equal(excerptText("FAIT_DOCUMENTE", "Un fait résumé."), "Un fait résumé.");
});

test("chaque pièce publiée du seed tombe dans un traitement connu, jamais dans les deux", () => {
  const pieces = publishedSeedDossiers().flatMap((dossier) =>
    dossier.sources.map((source) => ({ slug: dossier.slug, source })),
  );
  assert.ok(pieces.length > 0, "le seed doit publier des pièces");
  for (const { slug, source } of pieces) {
    const classes = excerptClasses(source.quote_kind);
    assert.ok(classes.startsWith("pp-extrait "), `${slug} : classe de bloc manquante`);
    assert.equal(
      classes.includes("--citation"),
      source.quote_kind === "CITATION_EXACTE",
      `${slug} : traitement de citation inattendu`,
    );
    assert.ok(source.exact_quote.trim() !== "", `${slug} : extrait vide, rien à mettre en valeur`);
  }
});
