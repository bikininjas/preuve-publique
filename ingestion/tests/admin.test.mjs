// Integration tests for the admin review migration: the allowlist, admin
// reads across every status, the reviewer-required rule, and the column-level
// write limits, exercised through the same role and claims the website uses
// (`authenticated` plus a verified email claim). A bare PostgreSQL has no
// `auth` schema, so `auth.jwt()` is stubbed on top of the same GUC PostgREST
// sets (`request.jwt.claims`).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { PGlite } from '@electric-sql/pglite';
import { pgliteClient } from './helpers/pglite-client.mjs';
import * as db from '../lib/db.mjs';

const ROOT = resolve(import.meta.dirname, '..', '..');
const MIGRATIONS = [
  '20260929000000_initial.sql',
  '20260930000000_backend_pipeline.sql',
  '20261001000000_fix_reference_policies.sql',
  '20261002000000_admin_review.sql',
];

const ALLOWED_EMAIL = 'sebpicot@gmail.com';

async function freshDb() {
  const pglite = new PGlite();
  await pglite.exec('create role anon; create role authenticated;');
  await pglite.exec(`
    create schema auth;
    create function auth.jwt() returns jsonb language sql stable
    as $$ select coalesce(
      nullif(current_setting('request.jwt.claim', true), ''),
      nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb $$;
    grant usage on schema auth to anon, authenticated;
    grant execute on function auth.jwt() to anon, authenticated;
  `);
  for (const file of MIGRATIONS) {
    await pglite.exec(readFileSync(join(ROOT, 'supabase', 'migrations', file), 'utf8'));
  }
  await pglite.exec('grant usage on schema public to anon, authenticated;');
  return pgliteClient(pglite);
}

/** Switch the session to a role, optionally carrying an email claim. */
async function actAs(client, email = null) {
  await client.query('reset role');
  const claims = email ? { role: 'authenticated', email } : { role: 'anon' };
  await client.query('select set_config($1, $2, false)', ['request.jwt.claims', JSON.stringify(claims)]);
  await client.query(email ? 'set role authenticated' : 'set role anon');
}

async function asSuperuser(client) {
  await client.query('reset role');
  await client.query('select set_config($1, $2, false)', ['request.jwt.claims', '{}']);
}

/** Two vote pieces on one source: the first is published, the second stays a draft. */
async function seed(client) {
  const { rows: [source] } = await client.query(
    `insert into public.sources (url, publisher, document_title)
     values ('https://exemple.test/scrutins', 'Assemblée nationale', 'Scrutins de test') returning id`,
  );
  const inserted = [];
  for (const [externalId, title] of [['T1', 'Scrutin n° 1'], ['T2', 'Scrutin n° 2']]) {
    const { rows: [row] } = await client.query(
      `insert into public.evidence (source_id, title, kind, institution, occurred_at, source_url, external_id)
       values ($1, $2, 'vote', 'assemblee', '2020-01-01', 'https://exemple.test/' || $3, $3) returning id`,
      [source.id, title, externalId],
    );
    inserted.push(row.id);
  }
  await db.setReviewStatus(client, { table: 'evidence', id: inserted[0], status: 'reviewed', reviewer: 'test' });
  await db.setReviewStatus(client, { table: 'evidence', id: inserted[0], status: 'published', reviewer: 'test' });
  return { sourceId: source.id, publishedId: inserted[0], draftId: inserted[1] };
}

const selectStatuses = async (client) => {
  const { rows } = await client.query('select status, count(*)::int as n from public.evidence group by 1 order by 1');
  return rows;
};

test('anon ne lit que le publié, ne voit pas la liste d’administration et ne peut pas écrire', async () => {
  const client = await freshDb();
  const ids = await seed(client);

  await actAs(client, null);
  const visible = await client.query('select count(*)::int as n from public.evidence');
  assert.equal(visible.rows[0].n, 1);
  await assert.rejects(() => client.query('select email from public.admin_users'));
  await assert.rejects(() => client.query('select public.is_admin()'));
  await assert.rejects(() => client.query(
    `update public.evidence set status = 'reviewed', reviewed_by = 'x' where id = $1`,
    [ids.draftId],
  ));
  await asSuperuser(client);
});

test('une adresse autorisée voit tous les statuts, lit les runs et publie une pièce', async () => {
  const client = await freshDb();
  const ids = await seed(client);

  await actAs(client, ALLOWED_EMAIL);
  const admin = await client.query('select public.is_admin() as ok');
  assert.equal(admin.rows[0].ok, true);
  const self = await client.query('select email from public.admin_users');
  assert.equal(self.rows.length, 1);
  assert.equal(self.rows[0].email, ALLOWED_EMAIL);

  const all = await client.query('select count(*)::int as n from public.evidence');
  assert.equal(all.rows[0].n, 2, 'un administrateur voit les brouillons');
  const sources = await client.query('select count(*)::int as n from public.sources');
  assert.equal(sources.rows[0].n, 1, 'la source d’un brouillon est lisible par l’administration');
  const runs = await client.query('select count(*)::int as n from public.ingestion_runs');
  assert.equal(runs.rows[0].n, 0);

  const reviewed = await client.query(
    `update public.evidence set status = 'reviewed', reviewed_by = $2, reviewed_at = now()
     where id = $1 returning status, reviewed_by`,
    [ids.draftId, ALLOWED_EMAIL],
  );
  assert.equal(reviewed.rows.length, 1);
  assert.equal(reviewed.rows[0].status, 'reviewed');

  const published = await client.query(
    `update public.evidence set status = 'published', reviewed_by = $2, reviewed_at = now()
     where id = $1 returning status`,
    [ids.draftId, ALLOWED_EMAIL],
  );
  assert.equal(published.rows.length, 1);

  await actAs(client, null);
  assert.equal((await selectStatuses(client)).length, 1, 'le public ne voit que du publié');
  assert.equal((await client.query('select count(*)::int as n from public.evidence')).rows[0].n, 2);
  await asSuperuser(client);
});

test('une autre adresse connectée reste limitée au publié et ne modifie rien', async () => {
  const client = await freshDb();
  const ids = await seed(client);

  await actAs(client, 'quelquun@exemple.test');
  const admin = await client.query('select public.is_admin() as ok');
  assert.equal(admin.rows[0].ok, false);
  const self = await client.query('select email from public.admin_users');
  assert.equal(self.rows.length, 0, 'la liste reste invisible');
  const visible = await client.query('select count(*)::int as n from public.evidence');
  assert.equal(visible.rows[0].n, 1);

  for (const id of [ids.draftId, ids.publishedId]) {
    const updated = await client.query(
      `update public.evidence set status = 'reviewed', reviewed_by = 'x', reviewed_at = now()
       where id = $1 returning status`,
      [id],
    );
    assert.equal(updated.rows.length, 0, 'aucune ligne modifiable hors de la liste');
  }
  await asSuperuser(client);
  assert.deepEqual(await selectStatuses(client), [
    { status: 'draft', n: 1 },
    { status: 'published', n: 1 },
  ]);
});

test('la base exige un relecteur identifié et limite les colonnes écrites', async () => {
  const client = await freshDb();
  const ids = await seed(client);
  await actAs(client, ALLOWED_EMAIL);

  await assert.rejects(
    () => client.query(`update public.evidence set status = 'reviewed' where id = $1`, [ids.draftId]),
    /row-level security/,
  );
  await assert.rejects(
    () => client.query(`update public.evidence set title = 'titre réécrit' where id = $1`, [ids.draftId]),
    /permission denied/,
  );
  const cleared = await client.query(
    `update public.evidence set status = 'draft', reviewed_by = null, reviewed_at = null where id = $1 returning status`,
    [ids.draftId],
  );
  assert.equal(cleared.rows.length, 1, 'le retour au brouillon reste possible sans relecteur');

  // Même règle pour les rapprochements (créés par l'ingestion, pas par le web).
  await asSuperuser(client);
  const { rows: [link] } = await client.query(
    `insert into public.evidence_links (from_id, to_id, relation, confidence, method, rationale)
     values ($1, $2, 'same_proposal', 1, 'deterministic', 'même référence') returning id`,
    [ids.draftId, ids.publishedId],
  );
  await actAs(client, ALLOWED_EMAIL);
  await assert.rejects(
    () => client.query(`update public.evidence_links set status = 'published' where id = $1`, [link.id]),
    /row-level security/,
  );
  const linked = await client.query(
    `update public.evidence_links set status = 'published', reviewed_by = $2, reviewed_at = now()
     where id = $1 returning status`,
    [link.id, ALLOWED_EMAIL],
  );
  assert.equal(linked.rows.length, 1);
  await asSuperuser(client);
});

test('désactiver une adresse ferme l’accès', async () => {
  const client = await freshDb();
  const ids = await seed(client);
  await client.query('update public.admin_users set active = false where email = $1', [ALLOWED_EMAIL]);

  await actAs(client, ALLOWED_EMAIL);
  assert.equal((await client.query('select public.is_admin() as ok')).rows[0].ok, false);
  assert.equal((await client.query('select count(*)::int as n from public.evidence')).rows[0].n, 1);
  const updated = await client.query(
    `update public.evidence set status = 'reviewed', reviewed_by = 'x', reviewed_at = now()
     where id = $1 returning status`,
    [ids.draftId],
  );
  assert.equal(updated.rows.length, 0);
  await asSuperuser(client);
});
