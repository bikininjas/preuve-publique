// Scope comes from explicit source wording, never from vote counts or political weight.
// A last available vote in one chamber is not necessarily a definitive adoption.
const plain = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[’‘]/g, "'").toLowerCase().replace(/\s+/g, ' ').trim();
export function voteSelection(record) {
  if (record.kind && record.kind !== 'vote') return null;
  const title = plain(record.title).replace(/^scrutin n[°º]\s*\d+\s*[-–—]\s*/, '');
  const institution = record.institution;
  if (['assemblee', 'senat'].includes(institution)) {
    const whole = /^(?:sur )?l'ensemble (?:du projet|de la proposition) de loi\b/.test(title)
      || /^(?:sur )?l'article (?:unique|\d+(?: bis| ter)?) constituant l'ensemble (?:du projet|de la proposition) de loi\b/.test(title);
    if (!whole) return null;
    const type = institution === 'assemblee' ? 'an:dossier' : 'senat:dossier';
    const refs = [...new Set((record.detail?.refs ?? []).filter(ref => ref.type === type).map(ref => ref.value))];
    // Conflicting source identifiers must be reviewed, not merged automatically.
    if (refs.length > 1) return null;
    const subject = title.replace(/^.*?(?=(?:projet|proposition) de loi\b)/, '')
      .replace(/\s*\((?:premiere|deuxieme|troisieme|nouvelle|lecture definitive|texte de la commission mixte paritaire)[^)]*\)\.?$/, '')
      .replace(/[.\s]+$/, '');
    const edition = record.detail?.legislature ?? record.external_id?.match(/L(\d+)V/)?.[1] ?? '';
    const titleKey = `${institution}:intitule:${edition}:${subject}`;
    return { key: refs[0] ? `${institution}:${refs[0]}` : titleKey, title_key: titleKey, reference: refs[0] ?? null,
      grouping: refs.length ? 'dossier_officiel' : 'meme_intitule', scope: 'ensemble_loi',
      definitive: /lecture definitive/.test(title) };
  }
  if (institution === 'parlement_europeen') {
    // Require a final scope at the end: "ensemble" inside a policy subject proves nothing.
    if (!/(?:\(ensemble du texte\)|\bvote (?:unique|final)|\b(?:single|final) vote)\.?$/.test(title)) return null;
    const reference = title.match(/\b(?:rc-)?[abc]\d+-\d{4}\/\d{4}\b/)?.[0];
    if (!reference) return null;
    // A discharge report can contain a resolution and a separate decision.
    // Their common report identifier must not collapse two distinct whole texts.
    const disposition = title.match(/propositions? de (resolution(?: legislative)?|decisions?)\s*\(ensemble du texte\)\.?$/)?.[1];
    const textType = disposition?.replace(/^decisions$/, 'decision') ?? 'texte';
    return { key: `${institution}:${reference}:${textType}`, reference, text_type: textType,
      grouping: 'document_officiel', scope: 'vote_final_texte', definitive: false };
  }
  return null;
}

const order = record => Number(record.detail?.numero ?? record.external_id?.match(/(?:V|DEC-)(\d+)$/)?.[1] ?? 0);
export function selectEssentialVotes(entries) {
  const aliases = new Map();
  for (const entry of entries) {
    const selection = voteSelection(entry.record ?? entry);
    if (!selection?.title_key || !selection.reference) continue;
    if (!aliases.has(selection.title_key)) aliases.set(selection.title_key, new Set());
    aliases.get(selection.title_key).add(selection.key);
  }
  const latest = new Map();
  for (const entry of entries) {
    const record = entry.record ?? entry;
    if (record.kind && record.kind !== 'vote') continue;
    const selection = voteSelection(record);
    if (!selection) continue;
    const references = aliases.get(selection.title_key);
    const key = !selection.reference && references?.size === 1 ? [...references][0] : selection.key;
    const previous = latest.get(key);
    const old = previous?.record ?? previous;
    if (!old || record.occurred_at > old.occurred_at || (record.occurred_at === old.occurred_at && order(record) > order(old))) latest.set(key, entry);
  }
  return [...latest.values()];
}

// Call inside the caller's transaction after inserting the newer official votes.
// Existing metadata and review traces survive this reversible visibility change.
export async function focusPublishedVotes(client, institution) {
  const { rows } = await client.query(`select id,kind,institution,title,external_id,occurred_at::text occurred_at,detail
    from public.evidence where kind='vote' and institution=$1 and status='published' for update`, [institution]);
  const keep = new Set(selectEssentialVotes(rows).map(row => row.id));
  const excluded = rows.filter(row => !keep.has(row.id)).map(row => row.id);
  if (!excluded.length) return 0;
  const result = await client.query("update public.evidence set status='draft' where id=any($1::uuid[]) and status='published'", [excluded]);
  return result.rowCount;
}
