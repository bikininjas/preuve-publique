// Parlement européen — textes adoptés (API Open Data v2).
//
// One record per adopted text of a plenary year. The ELI identifier is the
// canonical European identifier of the document; the procedure references
// feed the deterministic linker.

import { saveRaw, writeJsonl } from '../lib/staging.mjs';
import { buildEvidence, clampTitle, ValidationError } from '../lib/normalize.mjs';
import { PE_API, eliTail, pePaginate, pickLabel } from '../lib/pe.mjs';

export const name = 'pe-texts';
export const description = 'Textes adoptés par le Parlement européen en plénière.';
export const defaults = { years: '2025,2026', 'min-delay-ms': '1500', limit: '0' };
export const help = `Options :
  --years=2025,2026   années de textes adoptés à importer
  --limit=N           nombre maximal de textes retenus au total (0 = tous)
  --min-delay-ms=N    espacement minimal entre requêtes`;

export function textToRecord(item, { sourceUrl, retrievedAt }) {
  const identifier = item.identifier ?? null;
  if (!identifier) throw new ValidationError('identifier', 'absent de la réponse', item.id);
  const title = pickLabel(item.title_dcterms) ?? identifier;
  const refs = [];
  const ownId = item.id ? eliTail(item.id) : null;
  if (ownId) refs.push({ type: 'pe:doc', value: ownId });
  for (const adopted of item.adopts ?? []) refs.push({ type: 'pe:doc', value: eliTail(adopted) });
  for (const realization of item.inverse_created_a_realization_of ?? []) {
    const tail = eliTail(realization);
    if (String(realization).includes('/proc/')) refs.push({ type: 'pe:procedure', value: tail });
  }
  return buildEvidence({
    external_id: identifier,
    kind: 'adopted_text',
    institution: 'parlement_europeen',
    title: clampTitle(title, 400),
    excerpt: null,
    occurred_at: item.document_date,
    source_url: sourceUrl,
    source_locator: `${identifier} — ELI ${item.id ?? '(inconnu)'}`,
    detail: {
      ep_number: item.epNumber ?? null,
      notation: item.notation_publicRegister ?? null,
      label: item.label ?? null,
      work_type: item.work_type ?? null,
      eli_id: item.id ?? null,
      refs,
    },
    source: {
      url: sourceUrl,
      publisher: 'Parlement européen',
      document_title: sourceTitleFor(item),
      published_at: null,
      sha256: null,
      retrieved_at: retrievedAt,
    },
  });
}

const sourceTitleFor = (item) => `Textes adoptés ${item.identifierYear ?? ''} (texte ${item.identifier ?? ''})`.trim();

export async function run({ options, stagingDir, log = () => {} }) {
  const years = String(options.years ?? defaults.years)
    .split(',').map((v) => Number.parseInt(v.trim(), 10)).filter((v) => Number.isFinite(v));
  if (!years.length) throw new Error('Aucune année valide dans --years.');
  const minDelayMs = Number.parseInt(options['min-delay-ms'] ?? defaults['min-delay-ms'], 10) || 0;
  const limit = Number.parseInt(options.limit ?? defaults.limit, 10) || 0;

  const evidence = [];
  const sources = [];
  const rawFiles = [];
  const notes = [];

  for (const year of years) {
    const sourceUrl = `${PE_API}/adopted-texts`;
    log(`Textes adoptés ${year}`);
    const pages = await pePaginate(`${sourceUrl}?year=${year}`, { minDelayMs });
    const items = pages.flatMap((page) => page.data);
    const retrievedAt = pages[0]?.fetchedAt ?? new Date().toISOString();
    for (const page of pages) {
      const raw = saveRaw(stagingDir, `adopted-texts-${year}-offset-${page.url.match(/offset=(\d+)/)?.[1] ?? '0'}.json`, page.body);
      rawFiles.push({ url: page.url, ...raw, fetched_at: page.fetchedAt, content_type: 'application/ld+json' });
    }
    sources.push({
      url: sourceUrl,
      publisher: 'Parlement européen',
      document_title: `Textes adoptés — année ${year}`,
      published_at: null,
      sha256: pages[0]?.sha256 ?? null,
      retrieved_at: retrievedAt,
    });
    let kept = 0;
    for (const item of items) {
      if (limit && evidence.length >= limit) break;
      try {
        evidence.push(textToRecord(item, { sourceUrl, retrievedAt }));
        kept += 1;
      } catch (error) {
        if (error instanceof ValidationError) notes.push(`${item.id ?? 'item'} non retenu : ${error.message}`);
        else throw error;
      }
    }
    log(`  ${items.length} textes lus, ${kept} retenus`);
  }

  writeJsonl(`${stagingDir}/evidence.jsonl`, evidence);
  writeJsonl(`${stagingDir}/sources.jsonl`, sources);
  return {
    counts: { evidence: evidence.length, sources: sources.length, actors: 0 },
    rawFiles,
    notes,
  };
}
