// Assemblée nationale — référentiel des acteurs et des organes.
//
// Source : l'archive officielle « tous acteurs, tous mandats, tous organes
// (historique) » de chaque législature, un fichier JSON par acteur et par
// organe. Elle apporte ce que les archives de scrutins ne contiennent pas :
//   1. le **nom** des groupes parlementaires et des partis (`organeRef` →
//      libellé), qui permet de nommer les 52 organes cités par les scrutins ;
//   2. la **composition datée** des groupes et l'affiliation déclarée des
//      députés à un parti, portées par les mandats (`typeOrgane` = GP ou
//      PARPOL, avec date de début et de fin).
//
// Ce que l'importeur ne fait pas, et ne fera pas :
//   - aucune position de vote n'est lue ni stockée (il n'y en a pas ici) ;
//   - aucune donnée personnelle au-delà du nom : l'état civil du référentiel
//     est réduit à prénom + nom (dates et lieux de naissance, adresses et
//     identifiant HATVP ne sont pas recopiés) ;
//   - aucun lien groupe ↔ parti n'est déduit de la composition : ce sont deux
//     acteurs distincts ; leur parenté relèvera d'un rapprochement relu.

import { Unzip, UnzipInflate } from 'fflate';
import { saveRaw, writeJsonl } from '../lib/staging.mjs';
import { requestBuffer } from '../lib/http.mjs';
import { buildActor, ValidationError } from '../lib/normalize.mjs';

export const name = 'an-referentiel';
export const description = 'Référentiel de l’Assemblée nationale : groupes, partis, personnes et mandats.';
// Une seule législature suffit : l'archive « historique » contient les mandats
// et les acteurs des législatures antérieures (vérifié sur la législature 17 :
// mandats de groupe depuis la législature 12, soit 2002). En demander
// plusieurs produirait les mêmes mandats plusieurs fois — dédoublonnés à
// l'écriture, mais avec une provenance qui dépendrait du dernier import.
export const defaults = { legislatures: '17', persons: '1', limit: '0' };
export const help = `Options :
  --legislatures=15,16,17  législatures à importer (défaut 17 ; l'archive est historique et couvre déjà les précédentes)
  --persons=0|1             importer aussi les personnes et leurs mandats (défaut 1 ; sans elles, aucun lien d'acteur n'est produit)
  --limit=N                nombre maximal de fiches d'acteurs lues par législature (0 = toutes, contrôle)`;

const LEGISLATURES = [15, 16, 17];
const ZIP_FILE = 'AMO30_tous_acteurs_tous_mandats_tous_organes_historique.json.zip';
const ZIP_BASE = 'https://data.assemblee-nationale.fr/static/openData/repository';

const urlFor = (legislature) => `${ZIP_BASE}/${legislature}/amo/tous_acteurs_mandats_organes_xi_legislature/${ZIP_FILE}`;

/** Les valeurs d'identifiant du référentiel sont tantôt une chaîne, tantôt un objet { '#text': … }. */
export function textOf(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') {
    return typeof value['#text'] === 'string' ? value['#text'].trim() || null : null;
  }
  const text = String(value).trim();
  return text || null;
}

const asList = (value) => {
  if (value === null || value === undefined) return [];
  return Array.isArray(value) ? value : [value];
};

/** Code d'organe du référentiel → nature d'acteur du projet. */
export const ORGANE_KINDS = { GP: 'group', PARPOL: 'party' };

export function organeKind(codeType) {
  return ORGANE_KINDS[codeType] ?? null;
}

/** Identifiant du projet : l'organe ou l'acteur est préfixé par sa source. */
export const organeExternalId = (uid) => `an-organe:${uid}`;
export const acteurExternalId = (uid) => `an-acteur:${uid}`;

/**
 * Un organe devient un acteur `group` ou `party`. Les autres codes du
 * référentiel (commissions, délégations, circonscriptions…) ne deviennent pas
 * des acteurs : ils ne votent pas et ne portent pas de programme.
 */
export function organeToActor(organe) {
  const kind = organeKind(organe?.codeType);
  if (!kind) return null;
  const uid = textOf(organe?.uid);
  const label = organe?.libelle ?? organe?.libelleEdition ?? organe?.libelleAbrege ?? null;
  if (!uid || !label) return null;
  return buildActor({ external_id: organeExternalId(uid), name: label, kind });
}

/** Une personne du référentiel : prénom + nom, rien d'autre. */
export function acteurToActor(acteur, uid) {
  const resolved = uid ?? textOf(acteur?.uid);
  const ident = acteur?.etatCivil?.ident ?? {};
  const parts = [ident.prenom, ident.nom].map((part) => textOf(part)).filter(Boolean);
  if (!resolved || !parts.length) return null;
  return buildActor({ external_id: acteurExternalId(resolved), name: parts.join(' '), kind: 'person' });
}

const RELATION_BY_TYPE_ORGANE = { GP: 'member_of', PARPOL: 'affiliated_to' };

/**
 * Un mandat de groupe ou de parti devient un lien daté. Un mandat sans date de
 * début ou sans référence d'organe est écarté et signalé : un lien sans date
 * ne prouve rien.
 */
export function mandateToRelation(mandat, { from }) {
  const relation = RELATION_BY_TYPE_ORGANE[mandat?.typeOrgane];
  if (!relation) return { skip: 'autre type de mandat' };
  const to = textOf(mandat?.organes?.organeRef);
  const startedAt = textOf(mandat?.dateDebut);
  if (!to) return { skip: 'mandat sans référence d’organe' };
  if (!startedAt) return { skip: 'mandat sans date de début' };
  return {
    relation: {
      from_external_id: from,
      to_external_id: organeExternalId(to),
      relation,
      started_at: startedAt,
      ended_at: textOf(mandat?.dateFin),
      detail: {
        mandat_uid: textOf(mandat?.uid),
        type_organe: mandat.typeOrgane,
        qualite: mandat?.infosQualite?.libQualite ?? null,
        legislature: mandat?.legislature ?? null,
        date_publication: mandat?.datePublication ?? null,
      },
    },
  };
}

/** Le référentiel porte des dates civiles simples ('2017-06-27') : jamais un fuseau. */
function requireIsoDate(value, field) {
  const text = textOf(value);
  if (!text) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) throw new ValidationError(field, 'date inattendue dans le référentiel', text);
  return text;
}

/** Stream the zip entry by entry: one decompressed file in memory at a time. */
async function parseZip(buffer, onEntry) {
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

export async function run({ options, stagingDir, log = () => {} }) {
  const legislatures = String(options.legislatures ?? defaults.legislatures)
    .split(',').map((value) => Number.parseInt(value.trim(), 10)).filter((value) => LEGISLATURES.includes(value));
  if (!legislatures.length) throw new Error('Aucune législature valide dans --legislatures.');
  const withPersons = String(options.persons ?? defaults.persons) !== '0';
  const limit = Number.parseInt(options.limit ?? defaults.limit, 10) || 0;

  const actorsByExternalId = new Map();
  const relationsByKey = new Map();
  const sources = [];
  const rawFiles = [];
  const notes = [];
  const skipped = new Map();

  const countSkip = (reason) => skipped.set(reason, (skipped.get(reason) ?? 0) + 1);

  for (const legislature of legislatures) {
    const zipUrl = urlFor(legislature);
    log(`Téléchargement ${zipUrl}`);
    const download = await requestBuffer(zipUrl, { timeoutMs: 300_000 });
    log(`  ${download.bytes} octets, sha256 ${download.sha256.slice(0, 16)}…`);
    const raw = saveRaw(stagingDir, `legislature-${legislature}-${ZIP_FILE}`, download.body);
    rawFiles.push({ url: zipUrl, ...raw, fetched_at: download.fetchedAt, content_type: download.contentType });
    sources.push({
      url: zipUrl,
      publisher: 'Assemblée nationale',
      document_title: `Référentiel des acteurs, mandats et organes — législature ${legislature} (archive JSON officielle)`,
      published_at: null,
      sha256: download.sha256,
      retrieved_at: download.fetchedAt,
    });

    let organes = 0;
    let keptOrganes = 0;
    let acteurs = 0;
    const personUids = new Set();
    // Les mandats sont mis de côté pendant la lecture : une personne n'est
    // retenue que si au moins un de ses mandats produit un lien.
    const mandates = [];

    const { entries, errors } = await parseZip(download.body, (entryName, text) => {
      const parsed = JSON.parse(text);
      if (parsed.organe) {
        organes += 1;
        const actor = organeToActor(parsed.organe);
        if (!actor) return;
        keptOrganes += 1;
        actorsByExternalId.set(actor.external_id, actor);
        return;
      }
      if (!parsed.acteur) return;
      if (!withPersons) return;
      if (limit && acteurs >= limit) return;
      acteurs += 1;
      const uid = entryName.match(/(PA\d+)\.json$/)?.[1] ?? textOf(parsed.acteur.uid);
      const actor = acteurToActor(parsed.acteur, uid);
      if (!actor) { countSkip('fiche d’acteur sans nom ou sans identifiant'); return; }
      for (const mandat of asList(parsed.acteur?.mandats?.mandat)) {
        if (!mandat || typeof mandat !== 'object') continue;
        const mapped = mandateToRelation(mandat, { from: actor.external_id });
        if (mapped.skip) { countSkip(mapped.skip); continue; }
        const relation = {
          ...mapped.relation,
          started_at: requireIsoDate(mapped.relation.started_at, 'dateDebut'),
          ended_at: requireIsoDate(mapped.relation.ended_at, 'dateFin'),
          source_url: zipUrl,
        };
        mandates.push({ actor, relation });
        personUids.add(actor.external_id);
      }
    });

    for (const { actor, relation } of mandates) actorsByExternalId.set(actor.external_id, actor);
    for (const { relation } of mandates) {
      relationsByKey.set(
        `${relation.from_external_id}|${relation.to_external_id}|${relation.relation}|${relation.started_at}`,
        relation,
      );
    }

    if (errors.length) notes.push(`législature ${legislature} : ${errors.length} entrée(s) non retenue(s) — ${errors[0]}`);
    log(`  ${entries} fichier(s), ${organes} organe(s) dont ${keptOrganes} groupe(s) ou parti(s), ${acteurs} fiche(s) d’acteur(s), ${personUids.size} personne(s) retenue(s)`);
    if (!entries) throw new Error(`Archive vide ou format inattendu pour la législature ${legislature}.`);
  }

  const actors = [...actorsByExternalId.values()];
  const relations = [...relationsByKey.values()];
  writeJsonl(`${stagingDir}/actors.jsonl`, actors);
  writeJsonl(`${stagingDir}/actor-relations.jsonl`, relations);
  writeJsonl(`${stagingDir}/sources.jsonl`, sources);

  for (const [reason, count] of [...skipped.entries()].sort((a, b) => b[1] - a[1])) {
    notes.push(`mandats ou fiches écartés — ${reason} : ${count}`);
  }
  notes.push('les liens d’acteur naissent sans statut de relecture : leur visibilité suit celle des deux acteurs reliés (une pièce publiée pour chacun).');
  log(`  ${actors.length} acteur(s) et ${relations.length} lien(s) écrits dans le staging`);

  return {
    counts: { evidence: 0, sources: sources.length, actors: actors.length, relations: relations.length, refs: 0 },
    rawFiles,
    notes,
  };
}
