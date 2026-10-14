import assert from "node:assert/strict";
import test from "node:test";

import {
  checkRateLimit,
  clientIp,
  rateLimitHeaders,
  resetRateLimits,
} from "../src/server/middleware/rate-limit.ts";

test("le quota laisse passer puis bloque, et se réinitialise à la fenêtre suivante", () => {
  resetRateLimits();
  const start = 1_000_000;
  for (let index = 0; index < 3; index += 1) {
    assert.equal(checkRateLimit("ip", { limit: 3, windowMs: 1000, now: start }).allowed, true);
  }
  const blocked = checkRateLimit("ip", { limit: 3, windowMs: 1000, now: start });
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.remaining, 0);
  assert.ok(blocked.retryAfterSeconds >= 1);

  const nextWindow = checkRateLimit("ip", { limit: 3, windowMs: 1000, now: start + 1001 });
  assert.equal(nextWindow.allowed, true);
});

test("deux adresses ne partagent pas le même compteur", () => {
  resetRateLimits();
  const now = 2_000_000;
  checkRateLimit("a", { limit: 1, windowMs: 1000, now });
  assert.equal(checkRateLimit("a", { limit: 1, windowMs: 1000, now }).allowed, false);
  assert.equal(checkRateLimit("b", { limit: 1, windowMs: 1000, now }).allowed, true);
});

test("l'IP vient des en-têtes de la plateforme, et vaut inconnue sans en-tête", () => {
  assert.equal(clientIp(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" })), "203.0.113.7");
  assert.equal(clientIp(new Headers({ "x-real-ip": "198.51.100.4" })), "198.51.100.4");
  assert.equal(clientIp(new Headers()), "unknown");
});

test("les en-têtes de quota annoncent la limite, le reste et le délai", () => {
  const allowed = rateLimitHeaders({
    allowed: true,
    limit: 30,
    remaining: 12,
    resetAt: 1_700_000_060_000,
    retryAfterSeconds: 60,
  });
  assert.equal(allowed["X-RateLimit-Limit"], "30");
  assert.equal(allowed["X-RateLimit-Remaining"], "12");
  assert.equal(allowed["Retry-After"], undefined);

  const blocked = rateLimitHeaders({
    allowed: false,
    limit: 30,
    remaining: 0,
    resetAt: 1_700_000_060_000,
    retryAfterSeconds: 42,
  });
  assert.equal(blocked["Retry-After"], "42");
});
