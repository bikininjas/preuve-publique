import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import test from "node:test";

/**
 * Garde-fou de contraste : les jetons `-bd` sont des **filets**, jamais des
 * encres.
 *
 * L'écart qui a existé : les panneaux d'avertissement et d'erreur écrivaient
 * `text-falsebd` / `text-warnbd` sur `bg-*-bg`. En thème clair, sans
 * conséquence (6,8:1 et 6,4:1) ; en chambre noire, les deux jetons sont sombres
 * et le texte tombait à 1,75:1 — un panneau illisible. `FallacyAnatomy`
 * employait déjà les encres (`text-false`, `text-warn`) ; seule la variante
 * `-bd` traînait.
 *
 * Le test lit les valeurs réelles dans `globals.css` : il ne parie pas sur des
 * couleurs recopiées, il recalcule le rapport de contraste des paires que les
 * classes emploient.
 */

const ROOT = new URL("../src/", import.meta.url);

function read(file) {
  return readFileSync(new URL(file, ROOT), "utf8");
}

function luminance(hex) {
  const clean = hex.replace("#", "");
  const channels = [0, 2, 4].map((i) => parseInt(clean.slice(i, i + 2), 16) / 255);
  const linear = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Les deux thèmes, tels que la feuille les déclare : `:root` d'abord, puis la
 * surcharge `[data-theme="dark"]` par-dessus. Les blocs `:root` multiples du
 * fichier se cumulent dans l'ordre, exactement comme le navigateur.
 */
function readThemes() {
  const css = read("app/globals.css");
  const base = new Map();
  const dark = new Map();
  for (const [, selector, body] of css.matchAll(/(:root|\[data-theme="dark"\])\s*\{([^}]*)\}/g)) {
    const target = selector === ":root" ? base : dark;
    for (const [, name, value] of body.matchAll(/(--pp-[a-z-]+)\s*:\s*([^;]+);/g)) {
      target.set(name, value.trim());
    }
  }
  const resolve = (scope, name, depth = 0) => {
    const value = scope.get(name);
    if (value === undefined || depth > 5) {
      return null;
    }
    const ref = value.match(/^var\((--pp-[a-z-]+)\)$/);
    if (ref !== null) {
      return resolve(scope, ref[1], depth + 1);
    }
    return value.startsWith("#") ? value : null;
  };
  /* Deux portées complètes : le thème clair n'est que `:root`, la chambre noire
     est `:root` recouvert par `[data-theme="dark"]`. */
  return { light: base, dark: new Map([...base, ...dark]), resolve };
}

const themes = readThemes();

const PAIRS = [
  { ink: "--pp-false-ink", panel: "--pp-false-bg", label: "erreur" },
  { ink: "--pp-warn-ink", panel: "--pp-warn-bg", label: "avertissement" },
  { ink: "--pp-true", panel: "--pp-true-bg", label: "confirmation" },
];

for (const [theme, scope] of [["clair", themes.light], ["sombre", themes.dark]]) {
  for (const pair of PAIRS) {
    test(`le panneau « ${pair.label} » reste lisible en thème ${theme} (AA)`, () => {
      const ink = themes.resolve(scope, pair.ink);
      const panel = themes.resolve(scope, pair.panel);
      assert.ok(ink !== null, `${pair.ink} introuvable dans globals.css`);
      assert.ok(panel !== null, `${pair.panel} introuvable dans globals.css`);
      const ratio = contrast(ink, panel);
      assert.ok(
        ratio >= 4.5,
        `${pair.ink} (${ink}) sur ${pair.panel} (${panel}) : ${ratio.toFixed(2)}:1 en thème ${theme}`,
      );
    });
  }
}

test("les panneaux teintés portent une encre, jamais un filet", () => {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = new URL(entry.name + (entry.isDirectory() ? "/" : ""), dir);
      if (entry.isDirectory()) {
        walk(path);
      } else if (entry.name.endsWith(".tsx")) {
        files.push(path);
      }
    }
  };
  walk(ROOT);

  const offenders = [];
  for (const file of files) {
    const short = file.pathname.slice(file.pathname.indexOf("/src/") + 5);
    readFileSync(file, "utf8").split("\n").forEach((line, index) => {
      if (/text-(false|warn)bd/.test(line)) {
        offenders.push(`${short}:${index + 1} filet en encre`);
      }
      if (/bg-falsebg/.test(line) && /\btext-false(?!ink)\b/.test(line)) {
        offenders.push(`${short}:${index + 1} text-false sur bg-falsebg`);
      }
      if (/bg-warnbg/.test(line) && /\btext-warn(?!ink)\b/.test(line)) {
        offenders.push(`${short}:${index + 1} text-warn sur bg-warnbg`);
      }
    });
  }
  assert.deepEqual(offenders, [], "les panneaux teintés doivent utiliser --pp-*-ink");
});
