import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { pgliteClient } from './helpers/pglite-client.mjs';
import { adoptedSubjectIndex, plenaryDocumentSubject, applySubjectPlan } from '../lib/pe-subjects.mjs';
import { peDocumentReference } from '../../lib/pe-document.ts';

const subject = {
  document_id: 'B-10-2026-0385', title: 'Renforcer la résilience sanitaire mondiale dans les pays partenaires',
  source_url: 'https://data.europarl.europa.eu/api/v2/adopted-texts?year=2026',
  source_locator: 'TA-10-2026-0318', retrieved_at: '2026-10-03T19:29:03.201Z',
  sha256: 'a'.repeat(64), method: 'explicit_document_reference', language: 'fr',
};

test('les références des décisions, rapports et résolutions communes désignent exactement leur document', () => {
  assert.deepEqual(peDocumentReference('Vote du 2026-09-17 — RC-B10-0398/2026 - Proposition de résolution (ensemble du texte)'), { label: 'RC-B10-0398/2026', id: 'RC-10-2026-0398' });
  assert.equal(peDocumentReference('Vote du 2026-09-17 — A10-0168/2026 - Loucas Fourlas - Proposition de résolution (ensemble du texte)').id, 'A-10-2026-0168');
  assert.deepEqual(peDocumentReference('Vote du 2026-07-09 — RC-B10-0345/2026/REV1 - Proposition de résolution (ensemble du texte)'), { label: 'RC-B10-0345/2026/REV1', id: 'RC-10-2026-0345' });
  assert.deepEqual(peDocumentReference('Vote du 2023-12-14 — Les communautés massaï en Tanzanie - The Maasai Communities in Tanzania - RC-B9-0511/2023 - Proposition de résolution (ensemble du texte)'), { label: 'RC-B9-0511/2023', id: 'RC-9-2023-0511' });
  assert.equal(peDocumentReference('Vote du 2026-09-17 — B10-0385/2026 - B10-0386/2026'), null);
  assert.equal(peDocumentReference('Vote du 2023-03-16 — Cambodge - RC- B9-0169/2023 - Proposition de résolution').id, 'RC-9-2023-0169');
  assert.equal(peDocumentReference('Vote du 2020-06-17 — (A9-0023/2020) - Vote unique').id, 'A-9-2020-0023');
  assert.equal(peDocumentReference('Vote du 2020-03-26 — C9-0082/2020 - Vote final').id, 'C-9-2020-0082');
  assert.equal(peDocumentReference('Vote du 2026-09-17 — Ordre du jour : débat sur B10-0385/2026'), null);
});

test('les textes adoptés ne donnent un sujet que par référence exacte non ambiguë', () => {
  const text = { id: 'text-id', ...subject, detail: { refs: [{ type: 'pe:doc', value: subject.document_id }] } };
  assert.equal(adoptedSubjectIndex([text]).get(subject.document_id).title, subject.title);
  assert.equal(adoptedSubjectIndex([text]).get('B-10-2026-0386'), undefined);
  assert.equal(adoptedSubjectIndex([text, { ...text, title: 'Autre sujet' }, text]).get(subject.document_id), null);
});

test('les métadonnées retiennent seulement le titre français du document demandé', () => {
  const doc = { id: 'eli/dl/doc/B-10-2026-0385', is_realized_by: [
    { title: { en: 'Health resilience' } }, { title: { fr: 'PROPOSITION DE RÉSOLUTION sur la santé mondiale' } },
  ] };
  const source = { url: subject.source_url, retrievedAt: subject.retrieved_at, sha256: subject.sha256 };
  assert.equal(plenaryDocumentSubject({ data: [doc] }, subject.document_id, source).title, 'PROPOSITION DE RÉSOLUTION sur la santé mondiale');
  assert.throws(() => plenaryDocumentSubject({ data: [doc] }, 'B-10-2026-0386', source), /discordant/);
  assert.throws(() => plenaryDocumentSubject({ data: [{ ...doc, is_realized_by: [{ title: { en: 'Health' } }] }] }, subject.document_id, source), /français absent/);
});

test('la correction conserve le scrutin publié, annule les simulations et protège les modifications concurrentes', async () => {
  const pglite = new PGlite();
  const client = pgliteClient(pglite);
  try {
    await pglite.exec(`create table public.evidence (id text primary key,title text,status text,institution text,kind text,detail jsonb,reviewed_by text,publication_checks jsonb);`);
    const patch = { id: 'vote-id', title: 'Vote du 2026-09-17 — B10-0385/2026 - Proposition de résolution (ensemble du texte)', status: 'published', detail: { favor: 319, against: 142, refs: [{ type: 'pe:doc', value: 'PV-10-2026-09-17-RCV-ITM-031' }] }, subject };
    await client.query(`insert into public.evidence values ($1,$2,$3,'parlement_europeen','vote',$4::jsonb,'archive officielle','{"database_match":true}')`, [patch.id, patch.title, patch.status, JSON.stringify(patch.detail)]);
    assert.equal((await applySubjectPlan(client, [patch])).enriched, 1);
    assert.deepEqual((await client.query('select detail from public.evidence')).rows[0].detail, patch.detail);
    assert.equal((await applySubjectPlan(client, [patch], { dryRun: false })).enriched, 1);
    const row = (await client.query('select * from public.evidence')).rows[0];
    assert.equal(row.title, patch.title);
    assert.equal(row.status, 'published');
    assert.equal(row.reviewed_by, 'archive officielle');
    assert.deepEqual(row.publication_checks, { database_match: true });
    assert.deepEqual(row.detail, { ...patch.detail, text_subject: subject });
    assert.equal((await applySubjectPlan(client, [patch], { dryRun: false })).already, 1);
    await client.query('update public.evidence set detail=$1::jsonb', [JSON.stringify({ ...patch.detail, favor: 320 })]);
    assert.equal((await applySubjectPlan(client, [patch], { dryRun: false })).conflicts, 1);
  } finally { await pglite.close(); }
});
