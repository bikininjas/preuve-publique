// Assemblée nationale — scrutins publics (data.assemblee-nationale.fr).
//
// Source: official open-data archives of the AN, one JSON file per scrutin
// inside a zip per legislature. The zip is the retrieved document (SHA-256
// stored); each piece points to its public page and to its file inside the
// archive. Individual member positions (decompteNominatif) are present in
// the archives but deliberately not stored: they need their own reviewed
// model before publication. Only aggregated counts are kept.

import { Unzip, UnzipInflate } from 'fflate';
import { saveRaw, writeJsonl } from '../lib/staging.mjs';
import { requestBuffer } from '../lib/http.mjs';
import { buildEvidence, clampTitle, clampExcerpt, ValidationError } from '../lib/normalize.mjs';

export const name = 'an-scrutins';
export const description = 'Scrutins publics de l’Assemblée nationale (archives JSON par législature).';
export const defaults = { legislatures: '15,16,17', limit: '0' };
export const help = `Options :
  --legislatures=15,16,17  législatures à importer (15 = 2017-2022, 16 = 2022-2024, 17 = 2024-)
  --limit=N                nombre maximal de scrutins par législature (0 = tous)`;

const ZIP_BY_LEGISLATURE = {
  15: { file: 'Scrutins_XV.json.zip', label: 'XV' },
  16: { file: 'Scrutins.json.zip', label: '16' },
  17: { file: 'Scrutins.json.zip', label: '17' },
};
const ZIP_BASE = 'https://data.assemblee-nationale.fr/static/openData/repository';

function urlFor(legislature) {
  const { file } = ZIP_BY_LEGISLATURE[legislature];
  return `${ZIP_BASE}/${legislature}/loi/scrutins/${file}`;
}

const toCount = (value) => {
  const n = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) ? n : null;
};

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
  // Push in chunks: a single push of a multi-thousand-entry archive recurses
  // once per entry and overflows the call stack.
  const CHUNK = 1 << 20;
  const bytes = new Uint8Array(buffer);
  for (let offset = 0; offset < bytes.length; offset += CHUNK) {
    unzip.push(bytes.subarray(offset, offset + CHUNK), offset + CHUNK >= bytes.length);
  }
  return { entries, errors };
}

const scrutinTitle = (numero, titre) => {
  const cleaned = clampTitle(titre, 400);
  return cleaned ? `Scrutin n° ${numero} — ${cleaned}` : `Scrutin n° ${numero}`;
};

export function scrutinToRecord(scrutin, { legislature, zipFile, zipUrl, retrievedAt }) {
  const numero = scrutin.numero;
  const uid = scrutin.uid;
  const decompte = scrutin.syntheseVote?.decompte ?? {};
  const groupesRaw = scrutin.ventilationVotes?.organe?.groupes?.groupe ?? [];
  const groupes = (Array.isArray(groupesRaw) ? groupesRaw : [groupesRaw]).map((group) => ({
    organe_ref: group.organeRef ?? null,
    membres: toCount(group.nombreMembresGroupe),
    position_majoritaire: group.vote?.positionMajoritaire ?? null,
    pour: toCount(group.vote?.decompteVoix?.pour),
    contre: toCount(group.vote?.decompteVoix?.contre),
    abstentions: toCount(group.vote?.decompteVoix?.abstentions),
    non_votants: toCount(group.vote?.decompteVoix?.nonVotants),
  }));
  // Only genuine document identifiers become refs: a shared "same sitting"
  // reference is not a rapprochement between two pieces.
  const refs = [];
  if (scrutin.objet?.referenceLegislative) refs.push({ type: 'an:dossier', value: scrutin.objet.referenceLegislative });
  return buildEvidence({
    external_id: uid,
    kind: 'vote',
    institution: 'assemblee',
    title: scrutinTitle(numero, scrutin.titre),
    excerpt: clampExcerpt(scrutin.syntheseVote?.annonce ?? null),
    occurred_at: scrutin.dateScrutin,
    source_url: `https://www.assemblee-nationale.fr/dyn/${legislature}/scrutins/${numero}`,
    source_locator: `json/${uid}.json dans ${zipFile}`,
    detail: {
      legislature,
      seance_ref: scrutin.seanceRef ?? null,
      organe_ref: scrutin.organeRef ?? null,
      sort: scrutin.sort ?? null,
      type_vote: scrutin.typeVote ?? null,
      decompte: {
        votants: toCount(scrutin.syntheseVote?.nombreVotants),
        exprimes: toCount(scrutin.syntheseVote?.suffragesExprimes),
        requis: toCount(scrutin.syntheseVote?.nbrSuffragesRequis),
        pour: toCount(decompte.pour),
        contre: toCount(decompte.contre),
        abstentions: toCount(decompte.abstentions),
        non_votants: toCount(decompte.nonVotants),
      },
      groupes,
      refs,
    },
    source: {
      url: zipUrl,
      publisher: 'Assemblée nationale',
      document_title: `Scrutins publics — législature ${legislature} (archive JSON officielle)`,
      published_at: null,
      sha256: null,
      retrieved_at: retrievedAt,
    },
  });
}

export async function run({ options, stagingDir, log = () => {} }) {
  const legislatures = String(options.legislatures ?? defaults.legislatures)
    .split(',').map((v) => Number.parseInt(v.trim(), 10)).filter((v) => ZIP_BY_LEGISLATURE[v]);
  if (!legislatures.length) throw new Error('Aucune législature valide dans --legislatures.');
  const limit = Number.parseInt(options.limit ?? defaults.limit, 10) || 0;

  const evidence = [];
  const sources = [];
  const rawFiles = [];
  const notes = [];

  for (const legislature of legislatures) {
    const zipUrl = urlFor(legislature);
    const zipFile = ZIP_BY_LEGISLATURE[legislature].file;
    log(`Téléchargement ${zipUrl}`);
    const download = await requestBuffer(zipUrl, { timeoutMs: 300_000 });
    log(`  ${download.bytes} octets, sha256 ${download.sha256.slice(0, 16)}…`);
    const raw = saveRaw(stagingDir, `legislature-${legislature}-${zipFile}`, download.body);
    rawFiles.push({ url: zipUrl, ...raw, fetched_at: download.fetchedAt, content_type: download.contentType });
    sources.push({
      url: zipUrl,
      publisher: 'Assemblée nationale',
      document_title: `Scrutins publics — législature ${legislature} (archive JSON officielle)`,
      published_at: null,
      sha256: download.sha256,
      retrieved_at: download.fetchedAt,
    });

    let kept = 0;
    let parsed = 0;
    const { entries, errors } = await parseZip(download.body, (entryName, text) => {
      const parsedJson = JSON.parse(text);
      const scrutin = parsedJson.scrutin ?? parsedJson;
      if (!scrutin?.uid) throw new Error('entrée sans uid');
      parsed += 1;
      if (limit && parsed > limit) return;
      try {
        evidence.push(scrutinToRecord(scrutin, {
          legislature, zipFile, zipUrl, retrievedAt: download.fetchedAt,
        }));
        kept += 1;
      } catch (error) {
        if (error instanceof ValidationError) errors.push(`${entryName}: ${error.message}`);
        else throw error;
      }
    });
    if (errors.length) {
      notes.push(`législature ${legislature} : ${errors.length} entrée(s) non retenue(s) — ${errors[0]}`);
    }
    log(`  ${entries} fichiers JSON, ${parsed} scrutins lus, ${kept} retenus`);
    if (!entries) throw new Error(`Archive vide ou format inattendu pour la législature ${legislature}.`);
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
