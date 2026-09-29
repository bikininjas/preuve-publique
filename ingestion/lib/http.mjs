// HTTP helper for official sources: identifies the project, spaces requests,
// retries transient failures with backoff, and reports the SHA-256 of every
// retrieved document so provenance can be stored.

import { createHash } from 'node:crypto';

export const USER_AGENT =
  'preuve-publique-ingestion/0.1 (projet citoyen de traçabilité; +https://github.com/bikininjas/preuve-publique)';

let lastRequestAt = 0;

export function sha256Hex(data) {
  return createHash('sha256').update(data).digest('hex');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export class HttpError extends Error {
  constructor(message, { status, url, bodySnippet } = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.url = url;
    this.bodySnippet = bodySnippet;
  }
}

function retryAfterMs(response) {
  const header = response.headers.get('retry-after');
  if (!header) return null;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.min(seconds * 1000, 60_000);
  const date = Date.parse(header);
  if (!Number.isNaN(date)) return Math.min(Math.max(date - Date.now(), 0), 60_000);
  return null;
}

/**
 * Fetch a URL and return the body with provenance metadata.
 * Retries network errors, 429 and 5xx with exponential backoff.
 */
export async function requestBuffer(url, options = {}) {
  const {
    headers = {},
    timeoutMs = 120_000,
    retries = 3,
    minDelayMs = 0,
    signal,
    method = 'GET',
    body,
  } = options;

  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    if (attempt > 0) {
      const backoff = Math.min(1000 * 2 ** (attempt - 1), 15_000) + Math.floor(Math.random() * 500);
      await sleep(lastError?.retryAfterMs ?? backoff);
    }
    const spacing = lastRequestAt + minDelayMs - Date.now();
    if (spacing > 0) await sleep(spacing);
    lastRequestAt = Date.now();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const onAbort = () => controller.abort();
    signal?.addEventListener('abort', onAbort, { once: true });
    try {
      const response = await fetch(url, {
        method,
        body,
        headers: { 'user-agent': USER_AGENT, accept: '*/*', ...headers },
        redirect: 'follow',
        signal: controller.signal,
      });
      if (!response.ok) {
        const retryable = response.status === 429 || response.status >= 500;
        const snippet = (await response.text().catch(() => '')).slice(0, 300);
        const error = new HttpError(`HTTP ${response.status} pour ${url}`, {
          status: response.status,
          url,
          bodySnippet: snippet,
        });
        if (retryable && attempt < retries) {
          error.retryAfterMs = response.status === 429 ? retryAfterMs(response) ?? undefined : undefined;
          lastError = error;
          continue;
        }
        throw error;
      }
      const responseBody = Buffer.from(await response.arrayBuffer());
      return {
        body: responseBody,
        status: response.status,
        finalUrl: response.url || url,
        contentType: response.headers.get('content-type') ?? '',
        fetchedAt: new Date().toISOString(),
        sha256: sha256Hex(responseBody),
        bytes: responseBody.byteLength,
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      lastError = error;
      if (attempt === retries) throw error;
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }
  }
  throw lastError ?? new Error(`Échec de la requête ${url}`);
}

export async function requestText(url, options = {}) {
  const result = await requestBuffer(url, options);
  const encoding = options.encoding ?? 'utf8';
  return { ...result, text: result.body.toString(encoding) };
}
