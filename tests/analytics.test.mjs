import assert from "node:assert/strict";
import test from "node:test";

import {
  ANALYTICS_CONSENT_KEY,
  GA_MEASUREMENT_ID,
  isValidMeasurementId,
  parseConsent,
} from "../src/lib/analytics.ts";

test("l'identifiant de mesure du site est un identifiant GA4 valide", () => {
  assert.equal(isValidMeasurementId(GA_MEASUREMENT_ID), true);
  assert.equal(GA_MEASUREMENT_ID.startsWith("G-"), true);
});

test("un tag Google (GT-) n'est pas accepté comme identifiant GA4", () => {
  assert.equal(isValidMeasurementId("GT-5MXH663G"), false);
  assert.equal(isValidMeasurementId("UA-12345-1"), false);
  assert.equal(isValidMeasurementId(""), false);
});

test("le consentement mémorisé se relit sans ambiguïté", () => {
  assert.equal(ANALYTICS_CONSENT_KEY, "pp-analytics-consent");
  assert.equal(parseConsent("granted"), "granted");
  assert.equal(parseConsent("denied"), "denied");
  assert.equal(parseConsent(null), null);
  assert.equal(parseConsent(""), null);
  assert.equal(parseConsent("yes"), null);
});
