// Assemblée nationale — dossiers législatifs (data.assemblee-nationale.fr).
//
// Official source of adopted French law, credential-free: each dossier that
// reached promulgation carries the law number, its title as published, the
// promulgation date and the Journal officiel reference (NOR, JO number,
// Légifrance URL). The same tree carries the scrutins attached to the
// dossier (voteRefs), emitted here as reference patches so existing vote
// rows get a `an:dossier` reference — the documentary link between a vote
// and the text it concerns.
//
// Légifrance's own API (PISTE) is deliberately not used: the account is
// reserved in practice to public-sector users. The JO reference published by
// the AN is stored as a link, never fetched.

import { Unzip, UnzipInflate } from 'fflate';
import { saveRaw, writeJsonl } from '../lib/staging.mjs';
import { requestBuffer } from '../lib/http.mjs';
import { buildEvidence, clampTitle, toIsoDate, ValidationError } from '../lib/normalize.mjs';

export const name = 'an-dossiers';
export const description = 'Dossiers législatifs de l’Assemblée nationale : lois promulguées et scrutins rattachés.';
export const defaults = { legislatures: '15,16,17', limit: '0' };
export const help = `Options :
  --legislatures=15,16,17  législatures à importer (15 = 2017-2022, 16 = 2022-2024, 17 = 2024-)
  --limit=N                nombre maximal de lois retenues par législature (0 = toutes)`;

const ZIP_BY_LEGISLATURE = {
  15: 'Dossiers_Legislatifs_XV.json.zip',
  16: 'Dossiers_Legislatifs.json.zip',
  17: 'Dossiers_Legislatifs.json.zip',
};
const ZIP_BASE = 'https://data.assemblee-nationale.fr/static/openData/repository';

const urlFor = (legislature) => `${ZIP_BASE}/${legislature}/loi/dossiers_legislatifs/${ZIP_BY_LEGISLATURE[legislature]}`;

function walk(node, visit) {
  if (Array.isArray(node)) {
    for (const item of node) walk(item, visit);
    return;
  }
  if (node && typeof node === 'object') {
    visit(node);
    for (const value of Object.values(node)) walk(value, visit);
  }
}

function collectPromulgations(dossier) {
  const found = [];
  walk(dossier?.actesLegislatifs, (node) => {
    if (node.codeActe === 'PROM-PUB') found.push(node);
  });
  return found;
}

function collectVoteRefs(dossier) {
  const refs = new Set();
  walk(dossier?.actesLegislatifs, (node) => {
    const value = node.voteRefs?.voteRef;
    if (typeof value === 'string') refs.add(value);
    else if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === 'string') refs.add(item);
        else if (item?.voteRef) refs.add(item.voteRef);
      }
    }
  });
  return [...refs];
}

/** Normalize the JO link published by the AN (old WAspad URLs are http). */
function normalizeJoUrl(url) {
  if (typeof url !== 'string' || !url.startsWith('http')) return null;
  return url.replace(/^http:\/\//i, 'https://');
}

/** First date that parses, with its origin, so a source typo is visible. */
function firstValidDate(candidates) {
  for (const [source, value] of candidates) {
    if (!value) continue;
    try {
      return { iso: toIsoDate(value, 'date'), from: source, raw: String(value) };
    } catch {
      // Essaye la source suivante (certaines dates du jeu de données
      // contiennent des fautes de frappe, ex. année « 0021 »).
    }
  }
  return null;
}

export function dossierToRecords(dossier, { legislature, zipFile, zipUrl, retrievedAt }) {
  const uid = dossier?.uid;
  if (!uid) throw new ValidationError('uid', 'dossier sans uid', null);
  const title = clampTitle(dossier?.titreDossier?.titre, 300);
  const promulgations = collectPromulgations(dossier);
  const sourceUrl = `https://www.assemblee-nationale.fr/dyn/${legislature}/dossiers/${uid}`;
  const source = {
    url: zipUrl,
    publisher: 'Assemblée nationale',
    document_title: `Dossiers législatifs — législature ${legislature} (archive JSON officielle)`,
    published_at: null,
    sha256: null,
    retrieved_at: retrievedAt,
  };

  const evidence = [];
  const notes = [];
  for (const act of promulgations) {
    const codeLoi = act.codeLoi ?? null;
    const titreLoi = clampTitle(act.titreLoi ?? title, 300);
    if (!codeLoi || !titreLoi) {
      notes.push(`dossier ${uid} : acte de promulgation sans numéro ou sans titre, ignoré`);
      continue;
    }
    const occurred = firstValidDate([
      ['acte', act.dateActe],
      ['journal officiel', act.infoJO?.dateJO],
    ]);
    if (!occurred) {
      notes.push(`dossier ${uid} : promulguée mais sans date exploitable, ignorée`);
      continue;
    }
    evidence.push(buildEvidence({
      external_id: `loi-${codeLoi}`,
      kind: 'adopted_text',
      institution: 'assemblee',
      title: `Loi n° ${codeLoi} — ${titreLoi}`,
      excerpt: null,
      occurred_at: occurred.iso,
      source_url: sourceUrl,
      source_locator: `acte de promulgation ${act.uid ?? codeLoi} dans ${zipFile}`,
      detail: {
        code_loi: codeLoi,
        nor: act.infoJO?.referenceNOR ?? null,
        num_jo: act.infoJO?.numJO ?? null,
        date_jo: act.infoJO?.dateJO ?? null,
        date_acte: act.dateActe ?? null,
        date_source: occurred.from,
        url_legifrance: normalizeJoUrl(act.infoJO?.urlLegifrance),
        texte_loi_ref: act.texteLoiRef ?? null,
        dossier_uid: uid,
        legislature,
        refs: [{ type: 'an:dossier', value: uid }],
      },
      source,
    }));
  }

  const refs = collectVoteRefs(dossier).map((voteRef) => ({
    institution: 'assemblee',
    kind: 'vote',
    external_id: voteRef,
    add_ref: { type: 'an:dossier', value: uid },
    rationale: `Scrutin rattaché au dossier ${uid} par les actes législatifs de l'Assemblée nationale.`,
  }));

  return { evidence, refs, notes };
}

/** Stream the zip entry by entry: one decompressed file in memory at a time. */
export async function parseZip(buffer, onEntry) {
  const errors = [];
  let entries = 0;
  const unzip = new Unzip((file) => {
    if (!/\.json$/i.test(file.name)) return;
    entries += 1;
    const chunks = [];
    file.ondata = (error, chunk, final) => {
      if (error) { errors.push(`${file.name}: ${error.message}`); return; }
      chunks.push(chunk);
      if (final) {
        try {
          onEntry(file.name, Buffer.concat(chunks).toString('utf8'));
        } catch (error2) {
          errors.push(`${file.name}: ${error2.message}`);
        }
      }
    };
    file.start();
  });
  unzip.register(UnzipInflate);
  const CHUNK = 1 << 20;
  const bytes = new Uint8Array(buffer);
  for (let offset = 0; offset < bytes.length; offset += CHUNK) {
    unzip.push(bytes.subarray(offset, offset + CHUNK), offset + CHUNK >= bytes.length);
  }
  return { entries, errors };
}

export async function run({ options, stagingDir, log = () => {} }) {
  const legislatures = String(options.legislatures ?? defaults.legislatures)
    .split(',').map((v) => Number.parseInt(v.trim(), 10)).filter((v) => ZIP_BY_LEGISLATURE[v]);
  if (!legislatures.length) throw new Error('Aucune législature valide dans --legislatures.');
  const limit = Number.parseInt(options.limit ?? defaults.limit, 10) || 0;

  const evidence = [];
  const refs = [];
  const sources = [];
  const rawFiles = [];
  const notes = [];

  for (const legislature of legislatures) {
    const zipUrl = urlFor(legislature);
    const zipFile = ZIP_BY_LEGISLATURE[legislature];
    log(`Téléchargement ${zipUrl}`);
    const download = await requestBuffer(zipUrl, { timeoutMs: 300_000 });
    log(`  ${download.bytes} octets, sha256 ${download.sha256.slice(0, 16)}…`);
    const raw = saveRaw(stagingDir, `legislature-${legislature}-${zipFile}`, download.body);
    rawFiles.push({ url: zipUrl, ...raw, fetched_at: download.fetchedAt, content_type: download.contentType });
    const source = {
      url: zipUrl,
      publisher: 'Assemblée nationale',
      document_title: `Dossiers législatifs — législature ${legislature} (archive JSON officielle)`,
      published_at: null,
      sha256: download.sha256,
      retrieved_at: download.fetchedAt,
    };
    sources.push(source);

    let dossiers = 0;
    let laws = 0;
    let pairs = 0;
    let ignored = 0;
    const { entries, errors } = await parseZip(download.body, (entryName, text) => {
      const parsed = JSON.parse(text);
      // L'archive mélange plusieurs natures de fichiers (dossiers, acteurs,
      // organes…) : seuls les dossiers parlementaires sont traités ici.
      if (!parsed.dossierParlementaire) { ignored += 1; return; }
      const dossier = parsed.dossierParlementaire;
      if (!dossier.uid) throw new Error('dossier sans uid');
      dossiers += 1;
      const mapped = dossierToRecords(dossier, { legislature, zipFile, zipUrl, retrievedAt: download.fetchedAt });
      for (const note of mapped.notes) notes.push(note);
      if (limit && laws >= limit) return;
      for (const record of mapped.evidence) {
        record.source = source;
        evidence.push(record);
        laws += 1;
      }
      refs.push(...mapped.refs);
      pairs += mapped.refs.length;
    });
    if (errors.length) notes.push(`législature ${legislature} : ${errors.length} entrée(s) non retenue(s) — ${errors[0]}`);
    log(`  ${entries} fichiers lus, ${dossiers} dossiers parlementaires, ${ignored} fichier(s) d'une autre nature ignoré(s)`);
    log(`  ${laws} lois promulguées retenues, ${pairs} rattachements de scrutins`);
    if (!dossiers) throw new Error(`Aucun dossier parlementaire reconnu pour la législature ${legislature}.`);
  }

  const seen = new Set();
  const deduped = evidence.filter((record) => !seen.has(record.external_id) && seen.add(record.external_id));
  const seenRefs = new Set();
  const dedupedRefs = refs.filter((ref) => {
    const key = `${ref.external_id}|${ref.add_ref.type}|${ref.add_ref.value}`;
    return !seenRefs.has(key) && seenRefs.add(key);
  });

  writeJsonl(`${stagingDir}/evidence.jsonl`, deduped);
  writeJsonl(`${stagingDir}/sources.jsonl`, sources);
  writeJsonl(`${stagingDir}/refs.jsonl`, dedupedRefs);
  return {
    counts: { evidence: deduped.length, sources: sources.length, actors: 0, refs: dedupedRefs.length },
    rawFiles,
    notes,
  };
}
