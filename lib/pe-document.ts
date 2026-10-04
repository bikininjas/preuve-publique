import type { Evidence } from './types.ts';

/** The document explicitly named in a decision; never a topic or a similar title. */
export function peDocumentReference(title: string): { label: string; id: string } | null {
  const wording = title.replace(/^Vote du \d{4}-\d{2}-\d{2}\s*[—–-]\s*/i, '');
  const matches = [...wording.matchAll(/(?:^|\s[—–-]\s)\(?((RC-\s*)?([ABC])(\d+)-(\d+)\/(\d{4})(?:\/REV\d+)?)\b/gi)];
  if (matches.length !== 1) return null;
  const match = matches[0];
  const prefix = match[2] ? 'RC' : match[3];
  return { label: match[1].replace(/\s+/g, '').toUpperCase(), id: `${prefix}-${match[4]}-${match[6]}-${match[5]}`.toUpperCase() };
}

export interface PeTextSubject {
  document_id: string;
  title: string;
  source_url: string;
  source_locator: string;
  retrieved_at: string;
  sha256: string;
  method: 'explicit_document_reference';
  language: 'fr';
  source_evidence_id?: string;
}

/** A subject is usable only for the exact document named in this European vote. */
export function peTextSubject(item: Pick<Evidence, 'kind' | 'title'> & Partial<Pick<Evidence, 'institution' | 'detail'>>): PeTextSubject | null {
  if (item.kind !== 'vote' || item.institution !== 'parlement_europeen') return null;
  const subject = item.detail?.text_subject as PeTextSubject | undefined;
  if (!subject || subject.document_id !== peDocumentReference(item.title)?.id
    || subject.method !== 'explicit_document_reference' || subject.language !== 'fr'
    || typeof subject.title !== 'string' || !subject.title.trim()
    || !/^https:\/\/data\.europarl\.europa\.eu\/api\/v2\//.test(subject.source_url)
    || !/^[a-f0-9]{64}$/.test(subject.sha256)) return null;
  return subject;
}

/** Remove only the document genre, keeping the source's French subject verbatim. */
export function peSubjectLabel(title: string): string {
  return title.replace(/^(?:(?:proposition de )?résolution(?: législative)?|rapport|recommandation)(?: commune)?\s+(?:sur|concernant)\s+/i, '').trim();
}
