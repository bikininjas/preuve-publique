// Only explicit legislative decisions close the navette. Promulgation is not
// required: a final adoption can still await constitutional review/publication.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { requestBuffer } from './http.mjs';
import { saveRaw, writeManifest, readManifest } from './staging.mjs';
import { parseZip } from '../importers/an-dossiers.mjs';
const accepted = new Set(['TSORTF01', 'TSORTF02', 'TSORTF03', 'TSORTF18']);
const day = value => typeof value === 'string' ? value.slice(0, 10) : '';
const chamber = code => /^AN/.test(code) || /-AN-/.test(code) ? 'assemblee' : /^SN/.test(code) || /-SN-/.test(code) ? 'senat' : null;
function decisions(node, result = []) {
  if (Array.isArray(node)) node.forEach(n => decisions(n, result));
  else if (node && typeof node === 'object') {
    if (/-DEBATS(?:-(?:AN|SN))?-DEC$/.test(node.codeActe ?? '') && chamber(node.codeActe)) result.push(node);
    Object.values(node).forEach(n => decisions(n, result));
  }
  return result;
}
export function finalAdoption(dossier, source) {
  const acts = decisions(dossier.actesLegislatifs).filter(a => day(a.dateActe));
  acts.sort((a, b) => day(a.dateActe).localeCompare(day(b.dateActe)) || Number(chamber(a.codeActe) === 'assemblee') - Number(chamber(b.codeActe) === 'assemblee'));
  const last = acts.at(-1);
  if (!last || !accepted.has(last.statutConclusion?.fam_code)) return null;
  // Day-only timestamps do not establish which chamber voted last that day.
  // Keep this ambiguous procedure outside the selection until a precise source.
  if (acts.some(a => a !== last && day(a.dateActe) === day(last.dateActe) && chamber(a.codeActe) !== chamber(last.codeActe))
    && !/^ANLD-/.test(last.codeActe)) return null;
  // Constitutional bills require a congress/referendum: exclude them here.
  if (/constitutionnel/i.test(dossier.titreDossier?.titre ?? '')) return null;
  const institution = chamber(last.codeActe);
  let method;
  if (/^ANLD-/.test(last.codeActe)) method = 'lecture_definitive';
  else if (/^CMP-DEBATS-/.test(last.codeActe)) {
    const cmp = acts.filter(a => /^CMP-DEBATS-/.test(a.codeActe));
    const both = ['assemblee', 'senat'].every(c => accepted.has(cmp.filter(a => chamber(a.codeActe) === c).at(-1)?.statutConclusion?.fam_code));
    if (both) method = 'accord_cmp_deux_chambres';
  } else if (last.statutConclusion?.fam_code === 'TSORTF03'
    && acts.some(a => chamber(a.codeActe) !== institution && day(a.dateActe) <= day(last.dateActe) && accepted.has(a.statutConclusion?.fam_code))) method = 'adoption_conforme';
  if (!method || !/^https:\/\/data\.assemblee-nationale\.fr\//.test(source.url) || !/^[a-f0-9]{64}$/.test(source.sha256)) return null;
  const rawRefs = last.voteRefs?.voteRef;
  const voteRefs = (Array.isArray(rawRefs) ? rawRefs : [rawRefs]).filter(v => typeof v === 'string');
  return { verified: true, method, institution, dossier_id: dossier.uid, decision_id: last.uid,
    decision_code: last.codeActe, occurred_at: day(last.dateActe), vote_refs: voteRefs,
    senat_dossier: dossier.titreDossier?.senatChemin?.match(/\/dossier-legislatif\/([^/.]+)\.html/)?.[1] ?? null,
    source_url: source.url, source_sha256: source.sha256, retrieved_at: source.retrieved_at,
    source_locator: `Dossier ${dossier.uid}, acte ${last.uid} (${last.codeActe})` };
}

export function attachFinalAdoptions(entries, proofs) {
  return entries.map(entry => {
    const record = entry.record ?? entry;
    const refs = record.detail?.refs ?? [];
    const proof = proofs.find(p => p.institution === record.institution && p.occurred_at === record.occurred_at
      && (record.institution === 'assemblee' ? p.vote_refs.includes(record.external_id)
        : p.senat_dossier && refs.some(r => r.type === 'senat:dossier' && r.value === p.senat_dossier)));
    if (!proof) {
      if (!record.detail?.final_adoption) return entry;
      const { final_adoption, ...detail } = record.detail;
      const clean = { ...record, detail };
      return entry.record ? { ...entry, record: clean } : clean;
    }
    const mapped = { ...record, detail: { ...record.detail, final_adoption: proof } };
    return entry.record ? { ...entry, record: mapped } : mapped;
  });
}

export async function fetchFinalAdoptions(dir) {
  const url = 'https://data.assemblee-nationale.fr/static/openData/repository/17/loi/dossiers_legislatifs/Dossiers_Legislatifs.json.zip';
  const download = await requestBuffer(url, { timeoutMs: 300000 });
  const raw = saveRaw(dir, 'final-adoptions.json.zip', download.body);
  writeManifest(dir, { ...readManifest(dir), final_adoption_source: { url, ...raw, retrieved_at: download.fetchedAt } });
}

export async function readFinalAdoptions(dir) {
  const source = readManifest(dir).final_adoption_source;
  if (!source) return []; // Custom/test staging without a dossier is strict LD only.
  if (!/^https:\/\/data\.assemblee-nationale\.fr\/static\/openData\/repository\/17\/loi\/dossiers_legislatifs\/Dossiers_Legislatifs.json.zip$/.test(source.url)
    || source.file !== 'raw/final-adoptions.json.zip' && source.file !== 'raw\\final-adoptions.json.zip') throw new Error('Source de procédure invalide.');
  const buffer = readFileSync(join(dir, source.file));
  if (createHash('sha256').update(buffer).digest('hex') !== source.sha256 || buffer.length !== source.bytes) throw new Error('Archive de procédure modifiée.');
  const proofs = [];
  const result = await parseZip(buffer, (_, text) => {
    const d = JSON.parse(text).dossierParlementaire;
    if (d) { const proof = finalAdoption(d, source); if (proof) proofs.push(proof); }
  });
  if (result.errors.length || !result.entries) throw new Error('Archive de procédure illisible.');
  return proofs;
}
