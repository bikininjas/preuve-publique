import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contentSecurityPolicy } from '../lib/analytics-policy.ts';

test('la CSP autorise la balise et les collecteurs seulement sur un écran public configuré', () => {
  const policy = contentSecurityPolicy('/scrutins', 'G-TEST123456');
  const directives = Object.fromEntries(policy.split('; ').map((value) => {
    const [name, ...sources] = value.split(' ');
    return [name, sources];
  }));
  assert.ok(directives['script-src'].includes('https://www.googletagmanager.com'));
  assert.ok(directives['connect-src'].includes('https://*.google-analytics.com'));
  assert.deepEqual(directives['form-action'], ["'self'"]);
  assert.deepEqual(directives['frame-ancestors'], ["'none'"]);
  assert.equal(policy.includes('unsafe-eval'), false);
  assert.equal(/doubleclick|googlesyndication|googleadservices/.test(policy), false);
});

test('pages privées, inconnues et configuration invalide ne reçoivent aucune autorisation Google', () => {
  for (const path of ['/admin', '/admin/review', '/auth/callback', '/api/analytics/config', '/inconnu', '/confidentialite', '/preparer-mon-vote']) {
    assert.equal(contentSecurityPolicy(path, 'G-TEST123456').includes('google'), false, path);
  }
  for (const id of [undefined, '', 'incorrect']) {
    assert.equal(contentSecurityPolicy('/scrutins', id).includes('google'), false);
  }
});
