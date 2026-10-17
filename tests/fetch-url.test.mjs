import assert from "node:assert/strict";
import test from "node:test";

import {
  InvalidFetchUrlError,
  plusEncodedVariant,
  toFetchUrl,
} from "../src/lib/fetch-url.ts";

const URSSAF =
  "https://www.urssaf.org/files/Espace+media/Dossier+de+presse/NAT-DP-Bilan+LCTI+2024_2025+03+06.pdf";

test("le + littéral du chemin est conservé pour la requête (Urssaf l'exige)", () => {
  assert.equal(toFetchUrl(URSSAF), URSSAF);
});

test("la variante %2B est proposée pour un chemin qui contient un +", () => {
  assert.equal(
    plusEncodedVariant(URSSAF),
    "https://www.urssaf.org/files/Espace%2Bmedia/Dossier%2Bde%2Bpresse/NAT-DP-Bilan%2BLCTI%2B2024_2025%2B03%2B06.pdf",
  );
});

test("pas de variante si le chemin n'a pas de + (le + de la query reste une espace)", () => {
  assert.equal(plusEncodedVariant("https://exemple.fr/page?q=a+b"), null);
});

test("la variante %2B est idempotente sur une URL déjà encodée", () => {
  assert.equal(plusEncodedVariant("https://exemple.fr/a%2Bb"), null);
});

test("espaces et accents du chemin sont encodés par la validation", () => {
  assert.equal(
    toFetchUrl("https://exemple.fr/dossier de presse/é+à.pdf"),
    "https://exemple.fr/dossier%20de%20presse/%C3%A9+%C3%A0.pdf",
  );
});

test("un protocole non http(s) est refusé", () => {
  assert.throws(() => toFetchUrl("ftp://exemple.fr/fichier.pdf"), InvalidFetchUrlError);
  assert.throws(() => toFetchUrl("file:///etc/passwd"), InvalidFetchUrlError);
});

test("une chaîne qui n'est pas une URL est refusée", () => {
  assert.throws(() => toFetchUrl("pas une url"), InvalidFetchUrlError);
  assert.throws(() => toFetchUrl(""), InvalidFetchUrlError);
});
