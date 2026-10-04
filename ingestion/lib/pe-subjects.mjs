// Descriptive enrichment, separate from the immutable decision/archive replay.
import { peDocumentReference } from '../../lib/pe-document.ts';
import { canonicalJson } from './db.mjs';

export function adoptedSubjectIndex(texts) {
  const index = new Map();
  for (const text of texts) {
    if (!text.title?.trim() || !/^[a-f0-9]{64}$/.test(text.sha256 ?? '')) continue;
    for (const ref of text.detail?.refs ?? []) {
      if (ref.type !== 'pe:doc') continue;
      const subject = {
        document_id: ref.value, title: text.title, source_url: text.source_url,
        source_locator: text.source_locator, retrieved_at: text.retrieved_at,
        sha256: text.sha256, method: 'explicit_document_reference', language: 'fr',
        source_evidence_id: text.id,
      };
      // Differing titles for one document need the actual document, not a guess.
      if (index.has(ref.value) && index.get(ref.value)?.title !== text.title) index.set(ref.value, null);
      else if (!index.has(ref.value)) index.set(ref.value, subject);
    }
  }
  return index;
}

export function plenaryDocumentSubject(json, documentId, source) {
  const doc = json.data?.find(item => item.id === `eli/dl/doc/${documentId}`);
  if (!doc) throw new Error(`Document européen discordant : ${documentId}`);
  const titles = new Set([doc.title_dcterms?.fr, ...(doc.is_realized_by ?? []).map(item => item.title?.fr)]
    .filter(title => typeof title === 'string' && title.trim()).map(title => title.trim()));
  if (titles.size !== 1) throw new Error(`Intitulé français absent ou ambigu : ${documentId}`);
  return {
    document_id: documentId, title: [...titles][0], source_url: source.url,
    source_locator: `${documentId} — title (fr)`, retrieved_at: source.retrievedAt,
    sha256: source.sha256, method: 'explicit_document_reference', language: 'fr',
  };
}

export async function applySubjectPlan(client, patches, { dryRun = true } = {}) {
  const stats = { enriched: 0, already: 0, conflicts: 0 };
  await client.query('begin');
  try {
    for (const patch of patches) {
      if (patch.subject.document_id !== peDocumentReference(patch.title)?.id) throw new Error('Référence du sujet discordante.');
      const { rows } = await client.query('select title,status,detail from public.evidence where id=$1 for update', [patch.id]);
      const row = rows[0];
      if (canonicalJson(row?.detail?.text_subject) === canonicalJson(patch.subject)) { stats.already += 1; continue; }
      if (!row || row.title !== patch.title || row.status !== patch.status || row.detail?.text_subject
        || canonicalJson(row.detail) !== canonicalJson(patch.detail)) { stats.conflicts += 1; continue; }
      // Only the additive description changes. Title, counts, status, review and
      // publication checks remain the exact decision checked against its archive.
      const updated = await client.query(
        `update public.evidence set detail=coalesce(detail,'{}'::jsonb) || jsonb_build_object('text_subject',$2::jsonb)
         where id=$1 and institution='parlement_europeen' and kind='vote' returning id`,
        [patch.id, JSON.stringify(patch.subject)],
      );
      stats.enriched += updated.rows.length;
    }
    await client.query(dryRun ? 'rollback' : 'commit');
    return stats;
  } catch (error) { await client.query('rollback'); throw error; }
}
