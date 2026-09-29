// Environment loading for the ingestion CLI.
// Reads .env.local then .env from the project root, without overriding
// variables already present in the process environment. Secret values are
// never printed: use redactPgUrl() when a target must be shown.

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const PROJECT_ROOT = resolve(import.meta.dirname, '..', '..');

function parseEnvFile(text) {
  const out = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key) out[key] = value;
  }
  return out;
}

/** Load .env.local and .env; process environment wins over file values. */
export function loadProjectEnv(root = PROJECT_ROOT) {
  for (const name of ['.env.local', '.env']) {
    const file = resolve(root, name);
    if (!existsSync(file)) continue;
    const parsed = parseEnvFile(readFileSync(file, 'utf8'));
    for (const [key, value] of Object.entries(parsed)) {
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}

export class MissingConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingConfigError';
  }
}

/**
 * The trusted PostgreSQL connection used for ingestion and review writes.
 * Never the publishable key, never exposed to the web service.
 */
export function requireDbUrl() {
  const url = process.env.DB_PG_URL?.trim();
  if (!url) {
    throw new MissingConfigError(
      'DB_PG_URL est absente. Renseignez-la dans .env.local (connexion directe PostgreSQL, jamais la clé publique).',
    );
  }
  if (!/^postgres(ql)?:\/\//.test(url)) {
    throw new MissingConfigError('DB_PG_URL ne ressemble pas à une chaîne de connexion PostgreSQL.');
  }
  return url;
}

/** Connection target for display: never includes the password. */
export function redactPgUrl(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.username ? `${parsed.username}@` : ''}${parsed.host}${parsed.pathname}`;
  } catch {
    return '(DB_PG_URL illisible)';
  }
}

export function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new MissingConfigError(`Variable ${name} absente.`);
  return value;
}
