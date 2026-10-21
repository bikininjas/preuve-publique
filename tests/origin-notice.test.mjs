import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

/**
 * Garde-fou de provenance : le repli sur les dossiers de référence locaux doit
 * se dire à l'écran, sur **toutes** les pages qui lisent le registre.
 *
 * L'écart qui a existé : `/recherche` et les fiches annonçaient le mode de
 * lecture, l'accueil et `/dossiers` non — les mêmes chiffres, servis depuis le
 * même repli, s'affichaient donc comme s'ils venaient de la base. Le service
 * renvoyait bien `origin: "seed"` ; c'est la page qui ne le lisait pas.
 *
 * Le contrôle est textuel : il ne prouve pas le rendu, il prouve que chaque
 * page branche le composant sur l'`origin` réellement renvoyé par le service.
 * Le rendu lui-même se vérifie sur le serveur standalone.
 */

const PAGES = [
  { file: "../src/app/page.tsx", origin: "listed.origin", label: "l'accueil" },
  { file: "../src/app/dossiers/page.tsx", origin: "listed.origin", label: "la liste des dossiers" },
  { file: "../src/app/recherche/page.tsx", origin: "results.origin", label: "la recherche" },
  {
    file: "../src/app/dossiers/[slug]/page.tsx",
    origin: "result.origin",
    label: "la fiche de dossier",
  },
];

function read(file) {
  return readFileSync(new URL(file, import.meta.url), "utf8");
}

test("chaque page qui lit le registre annonce son mode de lecture", () => {
  for (const page of PAGES) {
    const source = read(page.file);
    assert.match(
      source,
      /import OriginNotice from "@\/components\/OriginNotice";/,
      `${page.label} n'importe pas OriginNotice`,
    );
    assert.ok(
      source.includes(`<OriginNotice origin={${page.origin}}`),
      `${page.label} n'affiche pas OriginNotice avec ${page.origin}`,
    );
  }
});

test("le repli local est annoncé, en clair, quand Supabase n'est pas configuré", () => {
  const notice = read("../src/components/OriginNotice.tsx");
  assert.match(notice, /Supabase n&apos;est pas configuré/);
  assert.match(notice, /dossiers de référence\s+locaux/);
  assert.match(notice, /rien n&apos;est présenté\s+comme lu en base/);
  /* La base ne déclenche aucun avertissement : le composant sort `null`. */
  assert.match(notice, /if \(origin === "supabase"\) \{\s*return null;/);
});

test("aucun commentaire de lint ne subsiste : le dépôt n'a pas d'ESLint", () => {
  const suspects = [
    "../src/app/page.tsx",
    "../src/components/SiteHeader.tsx",
    "../src/app/dossiers/page.tsx",
    "../src/app/recherche/page.tsx",
  ];
  for (const file of suspects) {
    assert.doesNotMatch(
      read(file),
      /eslint-disable/,
      `${file} porte un commentaire eslint-disable sans ESLint pour le lire`,
    );
  }
});
