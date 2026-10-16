import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  DRAFT_CONTROL_DOSSIER,
  REFERENCE_DOSSIER,
  SEED_DOSSIERS,
  publishedSeedDossiers,
} from "../src/db/seed-fallback.ts";
import { SPECTRUM_ORDER } from "../src/lib/labels.ts";
import { searchSeedDossiers } from "../src/lib/search.ts";
import { documentedSpectra } from "../src/lib/types.ts";

const HASH = /^[0-9a-f]{64}$/;
const ROOT = fileURLToPath(new URL("..", import.meta.url));

test("le dossier de référence est publiable et complet", () => {
  assert.equal(REFERENCE_DOSSIER.is_published, true);
  assert.equal(REFERENCE_DOSSIER.verdict, "FAUX");
  assert.equal(REFERENCE_DOSSIER.slug, "hitler-et-les-nazis-etaient-de-gauche");
  assert.ok(REFERENCE_DOSSIER.premises.length >= 3);
  assert.ok(REFERENCE_DOSSIER.sources.length >= 6);
  assert.ok(
    REFERENCE_DOSSIER.consensus_score >= 0 && REFERENCE_DOSSIER.consensus_score <= 100,
  );
});

test("aucune source ne porte d'empreinte inventée", () => {
  for (const dossier of SEED_DOSSIERS) {
    for (const source of dossier.sources) {
      if (source.archive_sha256 !== null) {
        assert.match(source.archive_sha256, HASH);
      }
      assert.ok(source.exact_quote.trim().length > 20);
      assert.ok(source.context_explanation.trim().length > 20);
      assert.ok(SPECTRUM_ORDER.includes(source.spectrum));
    }
  }
});

test("les piliers documentés se calculent sur les sources", () => {
  const covered = documentedSpectra(REFERENCE_DOSSIER.sources);
  assert.deepEqual(
    [...covered].sort(),
    [
      "ARCHIVE_PRIMAIRE",
      "CONSENSUS_ACADEMIQUE",
      "DROITE_LIBERALE_CONSERVATRICE",
      "GAUCHE",
    ].sort(),
  );
  assert.equal(covered.length, 4);
});

test("le brouillon de contrôle n'est jamais publié", () => {
  const published = publishedSeedDossiers().map((dossier) => dossier.slug);
  assert.ok(!published.includes(DRAFT_CONTROL_DOSSIER.slug));
  assert.equal(published.length, 30);
  assert.ok(published.includes("aide-medicale-detat-securite-sociale-soins-de-confort"));
  assert.ok(published.includes("sans-papiers-et-rsa-des-leur-arrivee"));
  assert.ok(published.includes("petain-vichy-ont-ils-protege-les-juifs-francais"));
  assert.ok(published.includes("cout-immigration-budget-france"));
  assert.ok(published.includes("immigration-insecurite-criminalite-france"));
  assert.ok(published.includes("expulsion-etrangers-delinquants-juges-et-droit"));
  assert.ok(published.includes("pourvoi-cassation-culpabilite-ineligibilite-elus"));
  assert.ok(published.includes("assistants-rn-pourvoi-cassation-ineligibilite"));
  assert.ok(published.includes("allocation-demandeur-asile-carte-bancaire-montant"));
  assert.ok(published.includes("sans-papiers-rsa-caf-apl-aides-sociales"));
  assert.ok(published.includes("agression-bordeaux-clandestin-oqtf"));
  assert.ok(published.includes("incendie-eglise-saint-omer-attentat-islamiste"));
  assert.ok(published.includes("aides-rsa-vs-smic-revenu-disponible"));
  assert.ok(published.includes("discriminations-embauche-origine-mythe"));
  assert.ok(published.includes("homoparentalite-developpement-troubles-enfants"));
  assert.ok(published.includes("theorie-du-genre-ecole-education-nationale"));
  assert.ok(published.includes("laxisme-judiciaire-peines-prison-france"));
  assert.ok(published.includes("aspa-minimum-vieillesse-etrangers-conditions-cotisation"));
  assert.ok(published.includes("fraude-sociale-vs-fraude-fiscale-cout-france"));
  assert.ok(published.includes("genetique-races-biologiques-humaines"));
  assert.ok(published.includes("union-prophete-aicha-anachronisme-pedophilie"));
  assert.ok(published.includes("islam-homosexualite-transidentite-droit-compare"));
  assert.ok(published.includes("rechauffement-climatique-cycle-solaire-activite-humaine"));
  assert.ok(published.includes("voiture-electrique-vs-thermique-bilan-carbone-acv"));
  assert.ok(published.includes("otan-russie-traite-1990-non-elargissement-est"));
  assert.ok(published.includes("carte-mondiale-qi-pays-afrique-fraude-lynn"));
  assert.ok(published.includes("grand-remplacement-theorie-complot-demographie"));
  assert.ok(published.includes("politique-macron-socialiste-mythe-fiscalite-capital"));
  assert.ok(published.includes("racisme-anti-blanc-systemique-confusion-conceptuelle"));
});

test("la recherche locale trouve le dossier par son titre et par une citation", () => {
  // « nazis » remonte le dossier de référence (titre et pièces) et le dossier
  // Vichy (citation du discours de Jacques Chirac de 1995).
  const nazis = searchSeedDossiers("nazis")
    .map((dossier) => dossier.slug)
    .sort();
  assert.deepEqual(nazis, [
    "hitler-et-les-nazis-etaient-de-gauche",
    "petain-vichy-ont-ils-protege-les-juifs-francais",
  ]);
  for (const query of ["secteur privé 1934", "propriété privée"]) {
    const results = searchSeedDossiers(query);
    assert.equal(results.length, 1, `attendu un résultat pour « ${query} »`);
  }
  // « socialiste » est partagé par le dossier de référence et le dossier
  // Macron (titre et pièces) : la requête ne renvoie plus un résultat unique.
  const socialiste = searchSeedDossiers("socialiste")
    .map((dossier) => dossier.slug)
    .sort();
  assert.deepEqual(socialiste, [
    "hitler-et-les-nazis-etaient-de-gauche",
    "politique-macron-socialiste-mythe-fiscalite-capital",
  ]);
  assert.equal(searchSeedDossiers("zzzz").length, 0);
});

test("la recherche ignore casse et accents", () => {
  assert.equal(searchSeedDossiers("ETAiENT de GAUCHE").length, 1);
  assert.equal(searchSeedDossiers("propriete privee").length, 1);
});

test("chaque dossier publié porte une illustration libre avec son crédit", () => {
  for (const dossier of publishedSeedDossiers()) {
    assert.ok(dossier.illustration_url, `${dossier.slug} : illustration manquante`);
    assert.match(dossier.illustration_url, /^\/illustrations\/[a-z0-9-]+\.jpg$/, dossier.slug);
    assert.ok(
      existsSync(resolve(ROOT, "public", dossier.illustration_url.slice(1))),
      `${dossier.slug} : fichier d'illustration absent de public/`,
    );
    assert.ok(
      typeof dossier.illustration_credit === "string" &&
        dossier.illustration_credit.trim().length > 10,
      `${dossier.slug} : crédit d'illustration manquant`,
    );
  }
});
