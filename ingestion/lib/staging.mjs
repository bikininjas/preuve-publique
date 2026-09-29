// Staging area: every importer run writes its raw snapshots and normalized
// records to ingestion/.staging/<importer>/<timestamp>/ before anything
// touches the database. A failed run can be inspected, re-pushed or resumed
// without fetching again.

import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { PROJECT_ROOT } from './env.mjs';
import { sha256Hex } from './http.mjs';

export const DEFAULT_STAGING_ROOT = resolve(PROJECT_ROOT, 'ingestion', '.staging');

export function createStagingDir(importer, { label = '', root = DEFAULT_STAGING_ROOT } = {}) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
  const dir = join(root, importer, label ? `${stamp}_${label}` : stamp);
  mkdirSync(join(dir, 'raw'), { recursive: true });
  return dir;
}

export function saveRaw(dir, filename, buffer) {
  const relative = join('raw', filename).replaceAll('\\', '/');
  writeFileSync(join(dir, relative), buffer);
  return { file: relative, sha256: sha256Hex(buffer), bytes: buffer.byteLength };
}

export function writeJsonl(file, rows) {
  writeFileSync(file, rows.map((row) => JSON.stringify(row)).join('\n') + (rows.length ? '\n' : ''));
}

export function readJsonl(file) {
  if (!existsSync(file)) return [];
  const text = readFileSync(file, 'utf8');
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`${file} ligne ${index + 1}: JSON invalide (${error.message})`);
      }
    });
}

export function writeJson(file, value) {
  writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}

export function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

export function writeManifest(dir, manifest) {
  writeJson(join(dir, 'manifest.json'), manifest);
}

export function readManifest(dir) {
  return readJson(join(dir, 'manifest.json'));
}

export function dirSizeBytes(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) total += dirSizeBytes(full);
    else total += statSync(full).size;
  }
  return total;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} Go`;
}
