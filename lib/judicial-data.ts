import { DataUnavailableError, getEvidencePage } from './data.ts';
import type { EvidencePage } from './types';

/** Refuse truncated or changing pages: a partial count must never look complete. */
export async function collectJudicialPages(readPage: (offset: number) => Promise<EvidencePage>): Promise<EvidencePage> {
  const first = await readPage(0);
  if (first.total > 2000 || first.limit < 1 || first.offset !== 0) throw new DataUnavailableError();
  const items = [...first.items];
  for (let offset = first.limit; offset < first.total; offset += first.limit) {
    const page = await readPage(offset);
    if (page.total !== first.total || page.offset !== offset || page.limit !== first.limit) throw new DataUnavailableError();
    items.push(...page.items);
  }
  if (items.length !== first.total || new Set(items.map(item => item.id)).size !== items.length) throw new DataUnavailableError();
  return { items, total: first.total, offset: 0, limit: items.length, hasMore: false };
}

export function getJudicialEvidence(): Promise<EvidencePage> {
  return collectJudicialPages(offset => getEvidencePage({ kind: 'judicial_event', offset, limit: 100 }));
}
