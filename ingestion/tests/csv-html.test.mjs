// CSV scanner and HTML helper tests: they lock the parsing assumptions used
// against the Sénat files (semicolon delimiter, latin-1 source, French
// entities in scrutin pages).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, rowsToObjects } from '../lib/csv.mjs';
import { decodeEntities, textOf, titleTag } from '../lib/html.mjs';

test('parseCsv handles quotes, doubled quotes, embedded semicolons and newlines', () => {
  const rows = parseCsv('A;B\n"x;y";"il a dit ""bonjour"""\n"ligne\nsur deux";2\n', ';');
  assert.deepEqual(rows, [['A', 'B'], ['x;y', 'il a dit "bonjour"'], ['ligne\nsur deux', '2']]);
});

test('parseCsv keeps empty trailing fields', () => {
  const rows = parseCsv('a;b;c\n1;;3\n', ';');
  assert.deepEqual(rows, [['a', 'b', 'c'], ['1', '', '3']]);
});

test('rowsToObjects keys rows by header and trims values', () => {
  const objects = rowsToObjects(parseCsv('Titre;Numéro de la loi\n "Une loi"; 2021-5 \n', ';'));
  assert.deepEqual(objects, [{ Titre: 'Une loi', 'Numéro de la loi': '2021-5' }]);
});

test('decodeEntities and textOf decode the French entities used by senat.fr', () => {
  assert.equal(decodeEntities('N&deg;347 &eacute;conomie &amp; suite'), 'N°347 économie & suite');
  assert.equal(decodeEntities('Groupe &Eacute;cologiste'), 'Groupe Écologiste');
  assert.equal(decodeEntities('&#233;t&#xE9;'), 'été');
  assert.equal(textOf('<p>Scrutin N&deg;347&nbsp;: <b>texte</b> </p>'), 'Scrutin N°347 : texte');
});

test('titleTag extracts and cleans the page title', () => {
  assert.equal(titleTag('<title>Scrutins de la session 2024-2025 - Sénat</title>'), 'Scrutins de la session 2024-2025 - Sénat');
  assert.equal(titleTag('<html></html>'), null);
});
