// Deliberately tiny, bounded deterrent for repeated OAuth starts. Authorization
// remains enforced by the server and RLS; no address, token or IP is persisted.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 6;
const MAX_KEYS = 1000;

export function mayStartAdminLogin(forwardedFor: string | null, now = Date.now()) {
  const ip = (forwardedFor ?? 'unknown').split(',')[0].trim().slice(0, 80);
  const recent = (attempts.get(ip) ?? []).filter(time => time > now - WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) return false;
  recent.push(now);
  if (attempts.size >= MAX_KEYS && !attempts.has(ip)) attempts.delete(attempts.keys().next().value!);
  attempts.set(ip, recent);
  return true;
}
