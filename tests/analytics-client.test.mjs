import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createConsent, CONSENT_MAX_AGE_MS } from '../lib/consent.ts';

function browserStub(t) {
  const scripts = [];
  const cookieWrites = [];
  const fakeWindow = { location: { origin: 'https://preuve-publique.fr', hostname: 'preuve-publique.fr' } };
  const fakeDocument = {
    createElement: () => ({ remove() { this.removed = true; } }),
    head: { appendChild: (script) => scripts.push(script) },
    getElementById: (id) => scripts.find((script) => script.id === id),
    get cookie() { return '_ga=visitor; _ga_TEST123456=session; sb-auth-token=private'; },
    set cookie(value) { cookieWrites.push(value); },
  };
  globalThis.window = fakeWindow;
  globalThis.document = fakeDocument;
  t.after(() => { delete globalThis.window; delete globalThis.document; });
  return { scripts, cookieWrites, fakeWindow };
}

test('aucun tag ni événement avant accord, après refus ou après expiration', async (t) => {
  const { scripts, fakeWindow } = browserStub(t);
  const { trackPage } = await import('../lib/analytics-client.ts?before-consent');
  const expired = JSON.stringify(createConsent(true, Date.now() - CONSENT_MAX_AGE_MS));
  for (const choice of [null, '{}', JSON.stringify(createConsent(false)), expired]) trackPage('G-TEST123456', '/scrutins', choice);
  assert.equal(scripts.length, 0);
  assert.equal(fakeWindow.dataLayer, undefined);
});

test('un seul tag et une seule page vue par navigation, sans identité politique', async (t) => {
  const { scripts, fakeWindow } = browserStub(t);
  const { trackPage } = await import('../lib/analytics-client.ts?accepted');
  const choice = JSON.stringify(createConsent(true));
  trackPage('G-TEST123456', '/admin/review', choice);
  assert.equal(scripts.length, 0);
  trackPage('G-TEST123456', '/partis/nom-politique', choice);
  trackPage('G-TEST123456', '/partis/nom-politique', choice);
  trackPage('G-TEST123456', '/scrutins', choice);
  assert.equal(scripts.length, 1);
  const events = fakeWindow.dataLayer.filter(([command]) => command === 'event');
  assert.equal(events.length, 2);
  assert.equal(JSON.stringify(fakeWindow.dataLayer).includes('nom-politique'), false);
  assert.equal(events[1][2].page_referrer, 'https://preuve-publique.fr/partis/[id]');
  const config = fakeWindow.dataLayer.find(([command]) => command === 'config')[2];
  assert.equal(config.send_page_view, false);
  assert.equal(config.allow_google_signals, false);
  assert.equal(config.cookie_update, false);
});

test('le retrait désactive le tag et efface les cookies GA sans toucher à la session', async (t) => {
  const { scripts, cookieWrites, fakeWindow } = browserStub(t);
  const { trackPage, stopAnalytics } = await import('../lib/analytics-client.ts?withdrawal');
  trackPage('G-TEST123456', '/scrutins', JSON.stringify(createConsent(true)));
  assert.equal(stopAnalytics(), true);
  assert.equal(fakeWindow['ga-disable-G-TEST123456'], true);
  assert.equal(scripts[0].removed, true);
  assert.equal(fakeWindow.dataLayer.length, 0);
  assert.equal(fakeWindow.gtag, undefined);
  assert.ok(cookieWrites.some((value) => value.startsWith('_ga=;')));
  assert.ok(cookieWrites.some((value) => value.startsWith('_ga_TEST123456=;')));
  assert.equal(cookieWrites.some((value) => value.includes('sb-auth-token')), false);
});
