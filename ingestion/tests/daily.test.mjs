import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dailyWindow, selectRecent } from '../daily/sync.mjs';

test('daily scrutiny window uses Paris dates and never trusts archive order', () => {
  const window = dailyWindow(new Date('2026-09-30T22:01:00Z'));
  assert.equal(window.today, '2026-10-01');
  assert.equal(window.since, '2026-09-01');
  assert.deepEqual(window.sessions, [2025, 2026]);
  const eligible = ['2026-07-21', '2026-10-02', '2026-09-30', '2026-10-03']
    .map((occurred_at, index) => ({ record: { occurred_at, external_id: String(index) } }));
  assert.deepEqual(selectRecent({ eligible }, window).map(item => item.record.occurred_at), ['2026-09-30']);
});
