// Parlement européen — votes en plénière (API Open Data v2).
//
// One record per decision of type Vote taken in a sitting: the source
// states the outcome (ADOPTED / REJECTED), the method, and the aggregated
// counts. The per-member lists (had_voter_favor/against/abstention) are
// present in the responses but are NOT stored: individual positions need
// their own reviewed table before publication (see ingestion/README.md).

import { saveRaw, writeJsonl } from '../lib/staging.mjs';
import { buildEvidence, clampTitle, ValidationError } from '../lib/normalize.mjs';
import { PE_API, eliTail, pePaginate, pickLabel, activityDate } from '../lib/pe.mjs';

export const name = 'pe-votes';
export const description = 'Votes en plénière du Parlement européen (décisions par séance).';
export const defaults = { years: '2025,2026', 'min-delay-ms': '1500', 'max-sittings': '0' };
export const help = `Options :
  --years=2025,2026    années de séances plénières à importer
  --until=AAAA-MM-JJ   borne incluse (par défaut : aujourd’hui), exclut les séances futures
  --since=AAAA-MM-JJ   borne inférieure incluse, facultative
  --max-sittings=N     limite le nombre de séances traitées (0 = toutes)
  --min-delay-ms=N     espacement minimal entre requêtes (limite de l'API : ~500/5 min)`;

const PLENARY_SITTING = 'def/ep-activities/PLENARY_SITTING';

export function decisionToRecord(decision, { sitting, sittingDate, sourceUrl, sourceTitle, retrievedAt }) {
  const date = activityDate(decision) ?? sittingDate;
  const outcome = decision.decision_outcome ? String(decision.decision_outcome).split('/').pop() : null;
  const label = pickLabel(decision.activity_label) ?? '(libellé non fourni par la source)';
  const recordedIn = Array.isArray(decision.recorded_in_a_realization_of)
    ? decision.recorded_in_a_realization_of : [];
  const refs = recordedIn.map((value) => ({ type: 'pe:doc', value: eliTail(value) }));
  return buildEvidence({
    external_id: decision.activity_id,
    kind: 'vote',
    institution: 'parlement_europeen',
    title: `Vote du ${date} — ${clampTitle(label, 400)}`,
    excerpt: null,
    occurred_at: date,
    source_url: sourceUrl,
    source_locator: `${decision.activity_id} — ${outcome ?? 'résultat non fourni'}`,
    detail: {
      outcome,
      decision_method: decision.decision_method ?? null,
      favor: decision.number_of_votes_favor ?? null,
      against: decision.number_of_votes_against ?? null,
      abstentions: decision.number_of_votes_abstention ?? null,
      attendees: decision.number_of_attendees ?? null,
      eli_id: decision.id ?? null,
      recorded_in: recordedIn.map(eliTail),
      refs,
    },
    source: {
      url: sourceUrl,
      publisher: 'Parlement européen',
      document_title: sourceTitle,
      published_at: null,
      sha256: null,
      retrieved_at: retrievedAt,
    },
  });
}

export async function run({ options, stagingDir, log = () => {} }) {
  const years = String(options.years ?? defaults.years)
    .split(',').map((v) => Number.parseInt(v.trim(), 10)).filter((v) => Number.isFinite(v));
  if (!years.length) throw new Error('Aucune année valide dans --years.');
  const minDelayMs = Number.parseInt(options['min-delay-ms'] ?? defaults['min-delay-ms'], 10) || 0;
  const maxSittings = Number.parseInt(options['max-sittings'] ?? defaults['max-sittings'], 10) || 0;
  const until = String(options.until ?? new Date().toISOString().slice(0, 10));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(until)) throw new Error('--until exige une date ISO.');
  const since = options.since ?? '2017-01-01';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(since) || since > until) throw new Error('--since exige une date ISO antérieure à --until.');

  const evidence = [];
  const sources = [];
  const rawFiles = [];
  const notes = [];
  let sittingsDone = 0;
  let skippedDecisions = 0;

  for (const year of years) {
    log(`Séances plénières ${year}`);
    const meetingPages = await pePaginate(`${PE_API}/meetings?year=${year}`, { minDelayMs });
    for (const page of meetingPages) {
      const raw = saveRaw(stagingDir, `meetings-${year}-offset-${page.url.match(/offset=(\d+)/)?.[1] ?? '0'}.json`, page.body);
      rawFiles.push({ url: page.url, ...raw, fetched_at: page.fetchedAt, content_type: 'application/ld+json' });
    }
    const meetings = meetingPages.flatMap((page) => page.data)
      .filter((meeting) => meeting.had_activity_type === PLENARY_SITTING && activityDate(meeting) && activityDate(meeting) >= since && activityDate(meeting) <= until);
    log(`  ${meetings.length} séances plénières`);

    for (const meeting of meetings) {
      if (maxSittings && sittingsDone >= maxSittings) break;
      const sittingId = meeting.activity_id;
      const decisionsUrl = `${PE_API}/meetings/${sittingId}/decisions`;
      const pages = await pePaginate(decisionsUrl, { minDelayMs });
      const decisions = pages.flatMap((page) => page.data);
      const retrievedAt = pages[0]?.fetchedAt ?? new Date().toISOString();
      for (const page of pages) {
        const raw = saveRaw(stagingDir, `decisions-${sittingId}-offset-${page.url.match(/offset=(\d+)/)?.[1] ?? '0'}.json`, page.body);
        rawFiles.push({ url: page.url, ...raw, fetched_at: page.fetchedAt, content_type: 'application/ld+json' });
      }
      const votes = decisions.filter((decision) => decision.type === 'Vote');
      skippedDecisions += decisions.length - votes.length;
      const sourceTitle = `Décisions de la séance ${activityDate(meeting)} (${sittingId})`;
      sources.push({
        url: decisionsUrl,
        publisher: 'Parlement européen',
        document_title: sourceTitle,
        published_at: activityDate(meeting),
        sha256: pages[0]?.sha256 ?? null,
        retrieved_at: retrievedAt,
      });
      let kept = 0;
      for (const decision of votes) {
        try {
          evidence.push(decisionToRecord(decision, {
            sitting: sittingId,
            sittingDate: activityDate(meeting),
            sourceUrl: decisionsUrl,
            sourceTitle,
            retrievedAt,
          }));
          kept += 1;
        } catch (error) {
          if (error instanceof ValidationError) notes.push(`${decision.activity_id} non retenu : ${error.message}`);
          else throw error;
        }
      }
      sittingsDone += 1;
      log(`  ${sittingId} : ${votes.length} votes retenus (${decisions.length - votes.length} décisions non-votes ignorées)`);
      if (kept === 0 && votes.length === 0) notes.push(`${sittingId} : aucun vote renvoyé par l’API pour cette séance`);
    }
    if (maxSittings && sittingsDone >= maxSittings) break;
  }

  writeJsonl(`${stagingDir}/evidence.jsonl`, evidence);
  writeJsonl(`${stagingDir}/sources.jsonl`, sources);
  notes.push(`${skippedDecisions} décision(s) sans type Vote ignorée(s)`);
  return {
    counts: { evidence: evidence.length, sources: sources.length, actors: 0 },
    rawFiles,
    notes,
  };
}
