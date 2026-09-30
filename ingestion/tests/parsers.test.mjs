// Importers against the official formats: these tests lock the mapping from
// each source's raw shape to a traceable record, including the guarantees
// that individual voting positions never leave the pipeline and that every
// record points back to its exact source.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseSessionPage, entryToRecord } from '../importers/senat-scrutins.mjs';
import { scrutinToRecord } from '../importers/an-scrutins.mjs';
import { dossierToRecords } from '../importers/an-dossiers.mjs';
import { decisionToRecord } from '../importers/pe-votes.mjs';
import { textToRecord } from '../importers/pe-texts.mjs';
import { rowToRecord } from '../importers/senat-texts.mjs';
import { parseCsv, rowsToObjects } from '../lib/csv.mjs';

const fixture = (name) => readFileSync(join(import.meta.dirname, 'fixtures', name), 'utf8');
const RETRIEVED = '2026-01-02T03:04:05.000Z';

test('Sénat — session page yields date, subject, published result and dossier', () => {
  const entries = parseSessionPage(fixture('senat-session.sample.html'), { session: 2024 });
  assert.equal(entries.length, 2);
  const [first, second] = entries;
  assert.equal(first.slug, '2024/scr2024-347');
  assert.equal(first.number, 347);
  assert.equal(first.dateText, '8 juillet 2025');
  assert.equal(first.resultat, 'Adoption');
  assert.equal(first.dossierUrl, 'https://www.senat.fr/dossier-legislatif/ppl23-555.html');
  assert.match(first.description, /^sur l'ensemble de la proposition de loi/);
  assert.doesNotMatch(first.description, /consulter le dossier|Adoption/);
  assert.equal(second.number, 346);
  assert.equal(second.resultat, 'Rejet');
});

test('Sénat — scrutin entry becomes a traceable vote record', () => {
  const [first] = parseSessionPage(fixture('senat-session.sample.html'), { session: 2024 });
  const record = entryToRecord(first, {
    pageUrl: 'https://www.senat.fr/scrutin-public/scr2024.html',
    pageTitle: 'Scrutins de la session 2024-2025',
    retrievedAt: RETRIEVED,
  });
  assert.equal(record.external_id, '2024-scr2024-347');
  assert.equal(record.occurred_at, '2025-07-08');
  assert.equal(record.source_url, 'https://www.senat.fr/scrutin-public/2024/scr2024-347.html');
  assert.equal(record.institution, 'senat');
  assert.equal(record.detail.resultat, 'Adoption');
  assert.deepEqual(record.detail.refs, [{ type: 'senat:dossier', value: 'ppl23-555' }]);
  assert.match(record.excerpt, /Adoption/);
  assert.equal(record.source.url, 'https://www.senat.fr/scrutin-public/scr2024.html');
});

test('AN — scrutin record carries counts and refs, never individual positions', () => {
  const scrutin = JSON.parse(fixture('an-scrutin.sample.json')).scrutin;
  const record = scrutinToRecord(scrutin, {
    legislature: 15,
    zipFile: 'Scrutins_XV.json.zip',
    zipUrl: 'https://data.assemblee-nationale.fr/static/openData/repository/15/loi/scrutins/Scrutins_XV.json.zip',
    retrievedAt: RETRIEVED,
  });
  assert.equal(record.external_id, 'VTANR5L15V2944');
  assert.match(record.title, /^Scrutin n° 2944 — l'article 24 bis/);
  assert.equal(record.occurred_at, '2020-10-07');
  assert.equal(record.source_url, 'https://www.assemblee-nationale.fr/dyn/15/scrutins/2944');
  assert.equal(record.detail.decompte.pour, 56);
  assert.equal(record.detail.decompte.abstentions, 1);
  assert.equal(record.detail.groupes[0].organe_ref, 'PO730964');
  assert.equal(record.detail.groupes[0].position_majoritaire, 'pour');
  assert.equal(record.detail.groupes[0].pour, 35);
  assert.equal(record.source_locator, 'json/VTANR5L15V2944.json dans Scrutins_XV.json.zip');
  const serialized = JSON.stringify(record);
  assert.ok(!serialized.includes('PA719952'), 'aucune position individuelle ne doit être stockée');
  assert.ok(!('decompteNominatif' in record.detail));
});

test('PE — decision maps outcome, counts and documentary refs without voter lists', () => {
  const decision = JSON.parse(fixture('pe-decision.sample.json'));
  const record = decisionToRecord(decision, {
    sitting: 'MTG-PL-2025-01-20',
    sittingDate: '2025-01-20',
    sourceUrl: 'https://data.europarl.europa.eu/api/v2/meetings/MTG-PL-2025-01-20/decisions',
    sourceTitle: 'Décisions de la séance 2025-01-20 (MTG-PL-2025-01-20)',
    retrievedAt: RETRIEVED,
  });
  assert.equal(record.external_id, 'MTG-PL-2025-01-20-DEC-171426');
  assert.equal(record.title, 'Vote du 2025-01-20 — Ordre du jour de mercredi - Demande du groupe PfE');
  assert.equal(record.occurred_at, '2025-01-20');
  assert.equal(record.detail.outcome, 'REJECTED');
  assert.equal(record.detail.against, 313);
  assert.equal(record.detail.favor, 108);
  assert.deepEqual(record.detail.refs, [{ type: 'pe:doc', value: 'PV-10-2025-01-20-RCV-ITM-001' }]);
  assert.ok(!JSON.stringify(record).includes('person/197552'));
});

test('PE — adopted text keeps its ELI identity and procedure reference', () => {
  const record = textToRecord(JSON.parse(fixture('pe-text.sample.json')), {
    sourceUrl: 'https://data.europarl.europa.eu/api/v2/adopted-texts',
    retrievedAt: RETRIEVED,
  });
  assert.equal(record.external_id, 'TA-10-2026-0006');
  assert.equal(record.title, "Réforme de l'acte électoral européen – obstacles à la ratification et à l'application dans les États membres");
  assert.equal(record.occurred_at, '2026-01-20');
  assert.ok(record.detail.refs.some((ref) => ref.type === 'pe:procedure' && ref.value === '2025-2028'));
  assert.ok(record.detail.refs.some((ref) => ref.type === 'pe:doc' && ref.value === 'A-10-2025-0252'));
  assert.ok(record.detail.refs.some((ref) => ref.type === 'pe:doc' && ref.value === 'TA-10-2026-0006'));
});

test('AN — un dossier promulgué produit la loi, sa référence JO et les rattachements de scrutins', () => {
  const dossier = JSON.parse(fixture('an-dossier.sample.json')).dossierParlementaire;
  const { evidence, refs } = dossierToRecords(dossier, {
    legislature: 15,
    zipFile: 'Dossiers_Legislatifs_XV.json.zip',
    zipUrl: 'https://data.assemblee-nationale.fr/static/openData/repository/15/loi/dossiers_legislatifs/Dossiers_Legislatifs_XV.json.zip',
    retrievedAt: RETRIEVED,
  });
  assert.equal(evidence.length, 1);
  const record = evidence[0];
  assert.equal(record.external_id, 'loi-2020-1238');
  assert.equal(record.kind, 'adopted_text');
  assert.equal(record.institution, 'assemblee');
  assert.equal(record.occurred_at, '2020-10-09');
  assert.equal(record.source_url, 'https://www.assemblee-nationale.fr/dyn/15/dossiers/DLR5L15N38768');
  assert.equal(record.detail.nor, 'EAEJ1934332L');
  assert.equal(record.detail.num_jo, '247');
  assert.equal(record.detail.url_legifrance, 'https://www.legifrance.gouv.fr/WAspad/UnTexteDeJorf?numjo=EAEJ1934332L');
  assert.deepEqual(record.detail.refs, [{ type: 'an:dossier', value: 'DLR5L15N38768' }]);
  assert.equal(refs.length, 1);
  assert.equal(refs[0].external_id, 'VTANR5L15V2944');
  assert.deepEqual(refs[0].add_ref, { type: 'an:dossier', value: 'DLR5L15N38768' });
  assert.match(refs[0].rationale, /dossier DLR5L15N38768/);
});

test('Sénat — promulgation rows become laws with an https dossier reference', () => {
  const rows = rowsToObjects(parseCsv(fixture('senat-promulguees.sample.csv'), ';'));
  assert.equal(rows.length, 3);
  const record = rowToRecord(rows[1], {
    iso: '2021-12-30',
    numero: '2021-1900',
    title: rows[1].Titre,
    refs: [{ type: 'senat:dossier', value: 'pjlf2022' }],
    sha256: 'a'.repeat(64),
    retrievedAt: RETRIEVED,
  });
  assert.equal(record.external_id, 'loi-2021-1900');
  assert.equal(record.kind, 'adopted_text');
  assert.equal(record.institution, 'senat');
  assert.equal(record.occurred_at, '2021-12-30');
  assert.equal(record.source_url, 'https://www.senat.fr/dossier-legislatif/pjlf2022.html');
  assert.equal(record.detail.themes.includes('Budget'), true);
  assert.equal(record.source.sha256, 'a'.repeat(64));
});
