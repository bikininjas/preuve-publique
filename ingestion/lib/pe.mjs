// Shared helpers for the European Parliament Open Data API v2.
// The API requires a descriptive User-Agent, caps requests (about 500 per
// 5 minutes per endpoint) and only answers LD+JSON to the documented media
// type; political positions (had_voter_*) are present in responses but are
// deliberately not stored: they need their own reviewed model.

import { requestText } from './http.mjs';

export const PE_API = 'https://data.europarl.europa.eu/api/v2';
export const PE_ACCEPT = 'application/ld+json';

/** Multilingual label object → French, then English, then any value. */
export function pickLabel(value, preferred = 'fr') {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') return value.trim() || null;
  if (typeof value === 'object') {
    const order = [preferred, 'en', 'mul', ...Object.keys(value)];
    for (const lang of order) {
      const candidate = value[lang];
      if (typeof candidate === 'string' && candidate.trim()) return candidate.trim();
    }
  }
  return null;
}

/** 'eli/dl/event/MTG-...' → 'MTG-...'; 'eli/dl/proc/2025-2028' → '2025-2028'. */
export function eliTail(value) {
  return String(value ?? '').replace(/^eli\/dl\/[a-z]+\//, '');
}

export async function peGetJson(url, { minDelayMs = 1500, timeoutMs = 60_000 } = {}) {
  const response = await requestText(url, {
    headers: { accept: PE_ACCEPT },
    minDelayMs,
    timeoutMs,
  });
  return {
    url,
    body: response.body,
    fetchedAt: response.fetchedAt,
    sha256: response.sha256,
    bytes: response.bytes,
    json: JSON.parse(response.text),
  };
}

/**
 * Iterate offset/limit pages of a collection endpoint, yielding each page.
 * Stops when a page returns fewer than `limit` items.
 */
export async function pePaginate(baseUrl, { minDelayMs = 1500, limit = 50, maxPages = 200 } = {}) {
  const pages = [];
  for (let offset = 0, page = 0; page < maxPages; page += 1, offset += limit) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    const pageUrl = `${baseUrl}${separator}limit=${limit}&offset=${offset}`;
    const result = await peGetJson(pageUrl, { minDelayMs });
    const data = Array.isArray(result.json?.data) ? result.json.data : [];
    pages.push({ ...result, data });
    if (data.length < limit) break;
  }
  return pages;
}
