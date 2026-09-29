// Sénat — scrutins publics (www.senat.fr/scrutin-public).
//
// The Sénat publishes its scrutins as session pages (HTML) listing every
// scrutin of a session with the date, subject, published result and links to
// the scrutin page and the legislative dossier. Each session page is a
// retrieved document (SHA-256 stored) and each scrutin points to its own
// page. Parsing failures are loud: a page whose structure changed is
// reported instead of silently producing empty records.

import { saveRaw, writeJsonl } from '../lib/staging.mjs';
import { requestText } from '../lib/http.mjs';
import { textOf, titleTag } from '../lib/html.mjs';
import { buildEvidence, clampTitle, toIsoDateFromFrench, ValidationError } from '../lib/normalize.mjs';

export const name = 'senat-scrutins';
export const description = 'Scrutins publics du Sénat (pages de session).';
export const defaults = { sessions: '2017,2018,2019,2020,2021,2022,2023,2024,2025', 'min-delay-ms': '1500', limit: '0' };
export const help = `Options :
  --sessions=2017,...,2025  sessions à importer (scr2017.html = session 2017-2018)
  --limit=N                 nombre maximal de scrutins par session (0 = tous)
  --min-delay-ms=N          espacement minimal entre deux requêtes`;

const BASE = 'https://www.senat.fr/scrutin-public';

function urlFor(session) {
  return `${BASE}/scr${session}.html`;
}

/** Split a session page into date-aware scrutin entries. */
export function parseSessionPage(html, { session }) {
  const tokens = [];
  for (const match of html.matchAll(/<div class="list-group-subtitle">([^<]+)<\/div>/g)) {
    tokens.push({ pos: match.index, kind: 'date', value: match[1] });
  }
  for (const match of html.matchAll(/<p class="my-2">([\s\S]*?)<\/p>/g)) {
    tokens.push({ pos: match.index, kind: 'entry', html: match[1] });
  }
  tokens.sort((a, b) => a.pos - b.pos);

  const entries = [];
  let currentDate = null;
  for (const token of tokens) {
    if (token.kind === 'date') {
      currentDate = token.value.trim();
      continue;
    }
    const entryHtml = token.html;
    const anchorPattern = /<a href="(\d{4}\/scr\d{4}-\d+)\.html">Scrutin N&deg;(\d+)<\/a>/g;
    const anchors = [...entryHtml.matchAll(anchorPattern)];
    anchors.forEach((anchor, index) => {
      const start = anchor.index + anchor[0].length;
      const end = index + 1 < anchors.length ? anchors[index + 1].index : entryHtml.length;
      const segment = entryHtml.slice(start, end);
      const badge = segment.match(/<span class="badge[^"]*">([^<]+)<\/span>/);
      const dossier = segment.match(/href="(\/dossier-legislatif\/[^"]+)"/);
      entries.push({
        session,
        slug: anchor[1],
        number: Number.parseInt(anchor[2], 10),
        dateText: currentDate,
        description: textOf(segment)
          .replace(/^[\s:.-]*consulter le dossier législatif[^.]*\.?\s*/i, '')
          .replace(/\s*(Adoption|Rejet)\s*$/, '')
          .replace(/^:\s*/, '')
          .replace(/\s*-\s*consulter le dossier législatif\s*\.?\s*$/i, '')
          .trim(),
        resultat: badge ? badge[1].trim() : null,
        dossierUrl: dossier ? `https://www.senat.fr${dossier[1]}` : null,
      });
    });
  }
  return entries;
}

const entryTitle = (number, description) => {
  const cleaned = clampTitle(description, 400);
  return cleaned ? `Scrutin n° ${number} — ${cleaned}` : `Scrutin n° ${number}`;
};

export function entryToRecord(entry, { pageUrl, pageTitle, retrievedAt }) {
  const refs = [];
  if (entry.dossierUrl) {
    const slug = entry.dossierUrl.split('/').pop()?.replace(/\.html$/, '');
    if (slug) refs.push({ type: 'senat:dossier', value: slug });
  }
  return buildEvidence({
    external_id: entry.slug.replace('/', '-'),
    kind: 'vote',
    institution: 'senat',
    title: entryTitle(entry.number, entry.description),
    excerpt: entry.resultat ? clampResult(entry.resultat) : null,
    occurred_at: toIsoDateFromFrench(entry.dateText, 'date du scrutin'),
    source_url: `https://www.senat.fr/scrutin-public/${entry.slug}.html`,
    source_locator: `${pageTitle ?? `scr${entry.session}.html`} — scrutin n° ${entry.number}`,
    detail: {
      session: `${entry.session}-${entry.session + 1}`,
      numero: entry.number,
      resultat: entry.resultat,
      dossier_url: entry.dossierUrl,
      refs,
    },
    source: {
      url: pageUrl,
      publisher: 'Sénat',
      document_title: pageTitle ?? `Scrutins de la session ${entry.session}-${entry.session + 1}`,
      published_at: null,
      sha256: null,
      retrieved_at: retrievedAt,
    },
  });
}

function clampResult(resultat) {
  // The badge wording is the source's own result label ("Adoption", "Rejet").
  return `Résultat publié : ${resultat}`.slice(0, 120);
}

export async function run({ options, stagingDir, log = () => {} }) {
  const sessions = String(options.sessions ?? defaults.sessions)
    .split(',').map((v) => Number.parseInt(v.trim(), 10)).filter((v) => Number.isFinite(v));
  if (!sessions.length) throw new Error('Aucune session valide dans --sessions.');
  const limit = Number.parseInt(options.limit ?? defaults.limit, 10) || 0;
  const minDelayMs = Number.parseInt(options['min-delay-ms'] ?? defaults['min-delay-ms'], 10) || 0;

  const evidence = [];
  const sources = [];
  const rawFiles = [];
  const notes = [];

  for (const session of sessions) {
    const pageUrl = urlFor(session);
    log(`Téléchargement ${pageUrl}`);
    const response = await requestText(pageUrl, { minDelayMs, timeoutMs: 60_000 });
    const pageTitle = titleTag(response.text)?.replace(/\s*-\s*Sénat\s*$/, '') ?? null;
    const raw = saveRaw(stagingDir, `session-${session}.html`, response.body);
    rawFiles.push({ url: pageUrl, ...raw, fetched_at: response.fetchedAt, content_type: response.contentType });
    sources.push({
      url: pageUrl,
      publisher: 'Sénat',
      document_title: pageTitle ?? `Scrutins de la session ${session}-${session + 1}`,
      published_at: null,
      sha256: response.sha256,
      retrieved_at: response.fetchedAt,
    });

    const entries = parseSessionPage(response.text, { session });
    if (!entries.length) {
      notes.push(`session ${session} : aucune entrée reconnue (page vide ou structure modifiée) — ${pageUrl}`);
      log('  0 entrée reconnue');
      continue;
    }
    let kept = 0;
    for (const entry of entries.slice(0, limit || entries.length)) {
      try {
        evidence.push(entryToRecord(entry, {
          pageUrl, pageTitle, retrievedAt: response.fetchedAt,
        }));
        kept += 1;
      } catch (error) {
        if (error instanceof ValidationError) notes.push(`scrutin n° ${entry.number} (${session}) non retenu : ${error.message}`);
        else throw error;
      }
    }
    if (entries.length !== new Set(entries.map((e) => e.slug)).size) {
      notes.push(`session ${session} : doublons de scrutins dans la page (${entries.length} entrées)`);
    }
    log(`  ${entries.length} scrutins lus, ${kept} retenus`);
  }

  const seen = new Set();
  const deduped = evidence.filter((record) => !seen.has(record.external_id) && seen.add(record.external_id));
  writeJsonl(`${stagingDir}/evidence.jsonl`, deduped);
  writeJsonl(`${stagingDir}/sources.jsonl`, sources);
  return {
    counts: { evidence: deduped.length, sources: sources.length, actors: 0 },
    rawFiles,
    notes,
  };
}
