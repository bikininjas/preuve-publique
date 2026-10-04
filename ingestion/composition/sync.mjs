/** A small, versioned composition snapshot. No database writes and no inference from groups to parties. */
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { unzipSync, strFromU8 } from 'fflate';
import { assemblyEntries, countSeats, europeanPartyEntries, senateEntries, active } from './normalize.mjs';

const day = new Date().toISOString().slice(0, 10);
const cache = resolve('.cache', 'composition-source', day);
await mkdir(cache, { recursive: true });
const hash = value => createHash('sha256').update(value).digest('hex');
const pause = ms => new Promise(r => setTimeout(r, ms));
const API = 'https://data.europarl.europa.eu/api/v2';
const FORMAT = 'format=application%2Fld%2Bjson';
const AN = 'https://data.assemblee-nationale.fr/static/openData/repository/17/amo/deputes_actifs_mandats_actifs_organes/AMO10_deputes_actifs_mandats_actifs_organes.json.zip';
const SENATE = 'https://www.senat.fr/api-senat/senateurs.json';
const CURRENT = `${API}/meps/show-current?${FORMAT}&offset=0&limit=1000`;
const BODIES = `${API}/corporate-bodies/show-current?${FORMAT}&offset=0&limit=1000`;

async function download(url, key) {
  const file = resolve(cache, `${key}.raw`);
  try { return await readFile(file); } catch { /* Source not yet cached for this day. */ }
  for (let attempt = 0; attempt < 4; attempt++) {
    const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (r.status === 429 || r.status === 503) {
      const value = r.headers.get('retry-after');
      const seconds = Number(value) || Math.max(0, (Date.parse(value ?? '') - Date.now()) / 1000) || 60;
      console.log(`Source temporairement limitée : attente de ${Math.ceil(seconds)} secondes.`);
      await pause(Math.max(1000, seconds * 1000));
      continue;
    }
    if (!r.ok) throw new Error(`${key} : HTTP ${r.status}`);
    const buffer = Buffer.from(await r.arrayBuffer());
    if (!buffer.length || buffer.length > 25000000) throw new Error(`${key} : taille inattendue`);
    await writeFile(file, buffer);
    await pause(1300);
    return buffer;
  }
  throw new Error(`${key} : source indisponible, instantané conservé`);
}

function source(url, publisher, locator, contents) {
  return { url, publisher, locator, retrievedAt: day, sha256: hash(contents) };
}
function composition(institution, mode, scope, entries, total, basis, notes, sources, asOf = day, period = 'Membres en exercice') {
  return { institution, mode, scope, total, listed: entries.length, asOf, period, basis, notes, buckets: countSeats(entries, total), sources };
}

const [anRaw, senateRaw, currentRaw, bodiesRaw, fundingRaw] = await Promise.all([
  download(AN, 'an'), download(SENATE, 'senate'), download(CURRENT, 'pe-current'), download(BODIES, 'pe-bodies'),
  readFile(new URL('./senate-funding-2026.json', import.meta.url)),
]);
const files = unzipSync(anRaw);
const actors = [], organs = [];
for (const [name, bytes] of Object.entries(files)) {
  if (name.includes('/acteur/')) actors.push(JSON.parse(strFromU8(bytes)).acteur);
  else if (name.includes('/organe/')) organs.push(JSON.parse(strFromU8(bytes)).organe);
}
const senators = JSON.parse(senateRaw.toString('utf8'));
const current = JSON.parse(currentRaw.toString('utf8')).data;
const bodies = JSON.parse(bodiesRaw.toString('utf8')).data;
if (!Array.isArray(current) || current.length < 650 || current.length >= 1000 || !Array.isArray(bodies) || bodies.length >= 1000) throw new Error('Liste européenne incomplète ou pagination requise');
const members = [];
let cursor = 0;
await Promise.all(Array.from({ length: 1 }, async () => {
  while (cursor < current.length) {
    const m = current[cursor++];
    const raw = await download(`${API}/meps/${m.identifier}?${FORMAT}`, `mep-${m.identifier}`);
    const person = JSON.parse(raw.toString('utf8')).data?.[0];
    if (String(person?.identifier) !== m.identifier) throw new Error('Identité européenne différente');
    const party = [...new Set((person.hasMembership ?? []).filter(x => x.membershipClassification === 'def/ep-entities/NATIONAL_POLITICAL_GROUP' && active({ start: x.memberDuring?.startDate, end: x.memberDuring?.endDate }, day)).map(x => x.organization))];
    members.push({ id: m.identifier, country: m['api:country-of-representation'], group: m['api:political-group'], party, sha256: hash(raw) });
    if (members.length % 150 === 0) console.log(`${members.length}/${current.length} profils européens contrôlés.`);
  }
}));
const required = new Set(members.flatMap(m => m.party));
const bodyHashes = [];
for (const b of bodies.filter(b => b.classification === 'def/ep-entities/EU_POLITICAL_GROUP')) required.add(b.id);
for (const id of required) {
  const existing = bodies.find(b => b.id === id);
  // The list often supplies only acronyms (RN, PS, etc.); the detail gives the full name.
  const raw = await download(`${API}/corporate-bodies/${id.split('/')[1]}?${FORMAT}`, `body-${id.split('/')[1]}`);
  const b = JSON.parse(raw.toString('utf8')).data?.[0];
  bodyHashes.push([id, hash(raw)]);
  if (!b || b.id !== id) throw new Error('Organisation européenne absente');
  if (existing) Object.assign(existing, b, { code: existing.label });
  else bodies.push(b);
  if (bodyHashes.length % 50 === 0) console.log(`${bodyHashes.length}/${required.size} noms officiels contrôlés.`);
}
const groupLabels = new Map(bodies.filter(b => b.classification === 'def/ep-entities/EU_POLITICAL_GROUP').map(b => [b.code ?? b.label, b.prefLabel?.fr ?? b.label]));
const anSource = source(AN, 'Assemblée nationale', 'Députés en exercice · mandats actifs GP et PARPOL (AMO10)', anRaw);
const senateSource = source(SENATE, 'Sénat', 'Annuaire des sénateurs actifs · champ groupe', senateRaw);
const epSource = source(CURRENT, 'Parlement européen', 'Députés en exercice · pays et groupe parlementaire', currentRaw);
const epPartySource = { url: `${API}/meps`, publisher: 'Parlement européen', locator: `Profils /meps/{id} · NATIONAL_POLITICAL_GROUP · ${members.length} documents ; empreinte de la collection`, retrievedAt: day, sha256: hash(JSON.stringify(members.sort((a, b) => a.id.localeCompare(b.id)).map(m => [m.id, m.sha256]))) };
const bodySource = source(BODIES, 'Parlement européen', 'Organisations en exercice · noms des groupes et partis nationaux', bodiesRaw);
const bodyDetailsSource = { url: `${API}/corporate-bodies`, publisher: 'Parlement européen', locator: 'Détails /corporate-bodies/{id} · noms français ; empreinte de la collection', retrievedAt: day, sha256: hash(JSON.stringify(bodyHashes.sort(([a], [b]) => a.localeCompare(b)))) };
const funding = JSON.parse(fundingRaw.toString('utf8'));
const pdfRaw = await download(funding.source.url, 'senate-funding-2026');
if (hash(pdfRaw) !== funding.source.sha256) throw new Error('Le PDF sénatorial a changé : vérifier à nouveau son annexe avant publication');
if (funding.buckets.reduce((n, b) => n + b.seats, 0) !== 348) throw new Error('Annexe financière sénatoriale non conforme');

const groupsAN = assemblyEntries(actors, organs, 'GP', day);
const partiesAN = assemblyEntries(actors, organs, 'PARPOL', day);
const groupsSenate = senateEntries(senators);
const unknownSenate = groupsSenate.filter(m => m.status === 'unknown').length;
const compositions = [
  composition('assemblee', 'groups', 'all', groupsAN, 577, 'Membres et apparentés décomptés une seule fois, selon leur mandat de groupe actif.', [`${groupsAN.length} députés dans l’archive ; les ${577 - groupsAN.length} sièges restants ne sont pas décrits. Une absence de ligne ne prouve pas une vacance.`], [anSource]),
  composition('assemblee', 'parties', 'all', partiesAN, 577, 'Rattachements déclarés pour le financement public des partis, dans le référentiel des députés en exercice. Ils ne prouvent pas une adhésion.', ['Un groupe, une coalition et un parti restent distincts. Les rattachements absents ou ambigus restent en gris.'], [anSource]),
  composition('senat', 'groups', 'all', groupsSenate, 348, 'Groupes indiqués dans l’annuaire officiel des sénateurs actifs, apparentés et rattachés compris.', unknownSenate ? [`${unknownSenate} nouveaux sénateurs n’ont pas encore de groupe renseigné dans la source. Ils restent distincts des non-inscrits.`] : [], [senateSource]),
  { institution: 'senat', mode: 'parties', scope: 'all', total: 348, listed: 348, asOf: funding.asOf, period: 'Financement public 2026', basis: 'Rattachements de financement déclarés aux partis. Ils ne prouvent pas une adhésion.', notes: ['Cet état daté précède le renouvellement sénatorial de 2026. Il ne décrit pas les rattachements des nouveaux sénateurs.'], buckets: funding.buckets, sources: [{ ...funding.source, retrievedAt: day }] },
];
for (const scope of ['all', 'france']) {
  const selected = scope === 'france' ? members.filter(m => m.country === 'FR') : members;
  const total = scope === 'france' ? 81 : 720;
  const groups = selected.map(m => ({ person: m.id, id: m.group ?? null, name: groupLabels.get(m.group) ?? m.group ?? 'Groupe non renseigné', status: m.group === 'NI' ? 'unaffiliated' : m.group ? 'known' : 'unknown' }));
  const notes = scope === 'france' ? ['Périmètre limité aux élus représentant la France, sans extrapolation aux autres pays.'] : [`${selected.length} députés dans la source sur ${total} sièges. Les sièges non décrits restent en gris, sans présumer leur vacance.`];
  compositions.push(composition('parlement_europeen', 'groups', scope, groups, total, 'Groupes parlementaires européens déclarés dans la liste des députés en exercice.', notes, [epSource, bodySource, bodyDetailsSource]));
  compositions.push(composition('parlement_europeen', 'parties', scope, europeanPartyEntries(selected, bodies), total, 'Partis ou formations nationales déclarés dans les profils officiels ; les groupes européens restent distincts. Le code pays distingue les formations nationales.', notes, [epSource, epPartySource, bodySource, bodyDetailsSource]));
}
await mkdir('data', { recursive: true });
const output = resolve('data/parliament-composition.json');
await writeFile(`${output}.tmp`, `${JSON.stringify({ version: 1, retrievedAt: day, compositions }, null, 2)}\n`);
await rename(`${output}.tmp`, output);
console.log(compositions.map(c => ({ institution: c.institution, mode: c.mode, scope: c.scope, seats: c.total, listed: c.listed, entries: c.buckets.length })));
