// Replay every pagination page, including the terminating page. A first-page
// fingerprint alone does not establish conformity of the entire collection.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { readManifest, readJsonl } from './staging.mjs';
import { activityDate } from './pe.mjs';
import { decisionToRecord } from '../importers/pe-votes.mjs';
import { textToRecord } from '../importers/pe-texts.mjs';

export async function verifyEuropeanArchive(dir, same) {
  const manifest = readManifest(dir);
  const kind = manifest.importer === 'pe-votes' ? 'vote' : 'adopted_text';
  const sources = readJsonl(join(dir, 'sources.jsonl'));
  const staged = readJsonl(join(dir, 'evidence.jsonl'));
  const groups = new Map(), meetings = new Map();
  const until = manifest.options?.until ?? new Date().toISOString().slice(0, 10);
  if (!manifest.raw?.length || !staged.length || !sources.length) throw new Error('Archive européenne vide.');
  for (const raw of manifest.raw) {
    const url = new URL(raw.url);
    const relative = raw.file?.replaceAll('\\', '/');
    if (url.origin !== 'https://data.europarl.europa.eu' || !/^\/api\/v2\/(meetings(?:\/MTG-PL-\d{4}-\d{2}-\d{2}\/decisions)?|adopted-texts)$/.test(url.pathname)
      || !relative?.startsWith('raw/') || relative.split('/').includes('..') || !resolve(dir, relative).startsWith(resolve(dir) + (process.platform === 'win32' ? '\\' : '/'))) throw new Error('Source européenne ou chemin non autorisé.');
    const body = readFileSync(join(dir, relative));
    if (body.length !== raw.bytes || createHash('sha256').update(body).digest('hex') !== raw.sha256) throw new Error('Page européenne modifiée.');
    const json = body.length ? JSON.parse(body.toString('utf8')) : { data: [] };
    if (!Array.isArray(json.data)) throw new Error('Collection européenne non reconnue.');
    const offset = Number(url.searchParams.get('offset'));
    if (url.searchParams.get('limit') !== '50' || !Number.isSafeInteger(offset) || offset < 0) throw new Error('Pagination européenne invalide.');
    const isMeetings = url.pathname === '/api/v2/meetings';
    if (url.pathname.endsWith('/adopted-texts') && url.searchParams.get('sort-by') !== 'doc-id:asc') throw new Error('Tri des textes européens non déterministe.');
    const collection = new URL(url); collection.searchParams.delete('limit'); collection.searchParams.delete('offset');
    const key = collection.href;
    const pages = groups.get(key) ?? [];
    pages.push({ ...raw, data: json.data, offset, isMeetings, total:json.meta?.total }); groups.set(key, pages);
    if (isMeetings) for (const meeting of json.data) {
      if (meetings.has(meeting.activity_id)) throw new Error('Séance européenne dupliquée entre pages.');
      meetings.set(meeting.activity_id, meeting);
    }
  }
  if (kind === 'vote' && !Number(manifest.options?.['max-sittings'] ?? 0)) for (const meeting of meetings.values()) {
    if (meeting.had_activity_type === 'def/ep-activities/PLENARY_SITTING' && activityDate(meeting) >= (manifest.options?.since ?? '2017-01-01') && activityDate(meeting) <= until
      && !groups.has(`https://data.europarl.europa.eu/api/v2/meetings/${meeting.activity_id}/decisions`)) throw new Error('Une séance plénière manque au corpus européen.');
  }
  const replay = new Map(), verifiedSources = new Map();
  for (const [key, pages] of groups) {
    pages.sort((a,b) => a.offset-b.offset);
    if (pages.some((p,i) => p.offset !== i*50 || (i < pages.length-1 && p.data.length !== 50)) || pages.at(-1).data.length >= 50) throw new Error('Pages européennes manquantes ou pagination incomplète.');
    if (Number.isSafeInteger(pages[0].total) && (pages.some(p=>p.total!==pages[0].total) || pages.reduce((n,p)=>n+p.data.length,0)!==pages[0].total)) throw new Error('Le total annoncé par la source européenne ne correspond pas aux pages reçues.');
    if (pages[0].isMeetings) continue;
    const source = sources.find(s => s.url === key);
    if (!source || source.sha256 !== pages[0].sha256) throw new Error('Empreinte de source européenne discordante.');
    const checkedSource = { ...source, snapshot_pages: pages.map(p => ({ url:p.url, sha256:p.sha256, bytes:p.bytes })) };
    verifiedSources.set(key, checkedSource);
    const sitting = kind === 'vote' ? key.match(/\/meetings\/(MTG-PL-[^/]+)\/decisions$/)?.[1] : null;
    const meeting = meetings.get(sitting);
    if (kind === 'vote' && (!meeting || !activityDate(meeting) || activityDate(meeting) > until)) throw new Error('Séance européenne absente ou future.');
    for (const item of pages.flatMap(p => p.data)) {
      if (kind === 'vote' && item.type !== 'Vote') continue;
      if (kind === 'adopted_text' && item.document_date > until) continue;
      const record = kind === 'vote' ? decisionToRecord(item, { sitting, sittingDate:activityDate(meeting),sourceUrl:key,sourceTitle:source.document_title,retrievedAt:source.retrieved_at }) : textToRecord(item,{sourceUrl:key,retrievedAt:source.retrieved_at});
      if (record.occurred_at > until || replay.has(record.external_id)) throw new Error('Pièce européenne future ou dupliquée.');
      replay.set(record.external_id, record);
    }
  }
  const eligible=[], seen=new Set();
  for (const record of staged) {
    const original=replay.get(record.external_id), source=verifiedSources.get(record.source?.url);
    if (!original || !source || seen.has(record.external_id) || !same(record,original)) throw new Error('Pièce européenne différente des pages officielles.');
    seen.add(record.external_id); eligible.push({record,source});
  }
  if (seen.size !== replay.size) throw new Error('Le staging européen omet des pièces présentes dans ses pages.');
  return {eligible,institution:'parlement_europeen',kind,archiveCount:manifest.raw.length,score:0.99};
}
