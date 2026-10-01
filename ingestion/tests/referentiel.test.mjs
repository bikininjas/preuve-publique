// Référentiel de l'Assemblée nationale : la fiche d'un organe ou d'un acteur
// devient un acteur traçable, et un mandat daté devient un lien d'acteur. Ces
// tests verrouillent trois garanties : les identifiants sont préfixés par leur
// source, aucune donnée personnelle ne dépasse le nom, et un mandat sans date
// ou sans référence ne produit jamais un lien.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  acteurExternalId,
  acteurToActor,
  mandateToRelation,
  organeExternalId,
  organeKind,
  organeToActor,
  textOf,
} from '../importers/an-referentiel.mjs';

const fixture = (name) => JSON.parse(readFileSync(join(import.meta.dirname, 'fixtures', name), 'utf8'));
const ORGANE = fixture('an-organe.sample.json').organe;
const ACTEUR = fixture('an-acteur.sample.json').acteur;
const mandat = (uid) => ACTEUR.mandats.mandat.find((item) => item.uid === uid);

test('un groupe devient un acteur « group » nommé comme le référentiel', () => {
  const actor = organeToActor(ORGANE);
  assert.equal(actor.external_id, 'an-organe:PO845413');
  assert.equal(actor.name, 'La France insoumise - Nouveau Front Populaire');
  assert.equal(actor.kind, 'group');
  // Aucun champ supplémentaire : ce que la base stocke, rien de plus.
  assert.deepEqual(Object.keys(actor).sort(), ['external_id', 'kind', 'name']);
});

test('seuls les groupes et les partis deviennent des acteurs', () => {
  assert.equal(organeKind('GP'), 'group');
  assert.equal(organeKind('PARPOL'), 'party');
  assert.equal(organeKind('CIRCONSCRIPTION'), null);
  assert.equal(organeToActor({ uid: 'PO1', codeType: 'GE', libelle: 'Commission' }), null);
  assert.equal(organeExternalId('PO1'), 'an-organe:PO1');
});

test('une personne ne porte que son prénom et son nom', () => {
  const actor = acteurToActor(ACTEUR);
  assert.equal(actor.external_id, 'an-acteur:PA267551');
  assert.equal(actor.name, 'Jacques Lamblin');
  assert.equal(actor.kind, 'person');
  assert.deepEqual(Object.keys(actor).sort(), ['external_id', 'kind', 'name']);
  // L'état civil du référentiel (naissance, profession, adresses, HATVP) ne
  // doit pas être recopié : c'est une donnée personnelle sans usage public.
  const serialized = JSON.stringify(actor);
  for (const forbidden of ['1952', 'Nancy', 'hatvp', 'Chirurgien']) {
    assert.ok(!serialized.includes(forbidden), `« ${forbidden} » ne doit pas être recopié`);
  }
  // L'identifiant peut être un objet { '#text': 'PA…' } selon l'entrée du zip.
  assert.equal(textOf(ACTEUR.uid), 'PA267551');
  assert.equal(acteurExternalId('PA1'), 'an-acteur:PA1');
});

test('un mandat de groupe devient un lien daté « member_of »', () => {
  const { relation } = mandateToRelation(mandat('PM708140'), { from: acteurExternalId('PA267551') });
  assert.equal(relation.from_external_id, 'an-acteur:PA267551');
  assert.equal(relation.to_external_id, 'an-organe:PO707869');
  assert.equal(relation.relation, 'member_of');
  assert.equal(relation.started_at, '2015-06-02');
  assert.equal(relation.ended_at, '2017-06-20');
  assert.deepEqual(relation.detail, {
    mandat_uid: 'PM708140',
    type_organe: 'GP',
    qualite: 'Membre du',
    legislature: '14',
    date_publication: '2015-06-02',
  });
});

test('une affiliation déclarée à un parti devient « affiliated_to »', () => {
  const { relation } = mandateToRelation(mandat('PM710508'), { from: acteurExternalId('PA267551') });
  assert.equal(relation.relation, 'affiliated_to');
  assert.equal(relation.to_external_id, 'an-organe:PO710396');
  assert.equal(relation.started_at, '2015-12-01');
  assert.equal(relation.detail.legislature, null);
});

test('les mandats hors groupe et parti, sans date ou sans organe, sont écartés', () => {
  assert.equal(mandateToRelation(mandat('PM700001'), { from: 'an-acteur:PA1' }).skip, 'autre type de mandat');
  assert.equal(mandateToRelation(mandat('PM700002'), { from: 'an-acteur:PA1' }).skip, 'mandat sans date de début');
  assert.equal(
    mandateToRelation({ typeOrgane: 'GP', dateDebut: '2024-07-18', organes: {} }, { from: 'an-acteur:PA1' }).skip,
    'mandat sans référence d’organe',
  );
  assert.equal(mandateToRelation(null, { from: 'an-acteur:PA1' }).skip, 'autre type de mandat');
});
