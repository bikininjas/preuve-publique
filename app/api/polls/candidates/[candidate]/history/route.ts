import { listPolls, pollApiError, POLL_HEADERS } from '@/lib/polls/data';
import { parsePollQuery, PollQueryError } from '@/lib/polls/query';
import { POLL_PROVIDERS } from '@/lib/polls/providers';

export async function GET(request: Request, { params }: { params: Promise<{ candidate: string }> }) {
  try {
    const { candidate } = await params;
    if (!/^[a-z0-9][a-z0-9_-]{0,100}$/.test(candidate)) throw new PollQueryError('Identifiant de candidat invalide.');
    const query = parsePollQuery(new URL(request.url).searchParams);
    if (query.candidate && query.candidate !== candidate) throw new PollQueryError('Le filtre candidat contredit le chemin.');
    query.candidate = candidate;
    const page = await listPolls(query);
    const measurements = page.polls.flatMap((poll) => poll.scenarios.flatMap((scenario) =>
      scenario.results.filter((result) => result.candidate_external_id === candidate).map((result) => ({
        ...result, pollId: poll.id, provider: poll.source_provider, externalId: poll.external_id,
        institute: poll.institute, fieldworkStart: poll.fieldwork_start, fieldworkEnd: poll.fieldwork_end,
        sampleSize: poll.sample_size, sourceUrl: poll.source_url, wikipediaRevision: poll.wikipedia_revision,
        datasetUrl: poll.dataset_url, datasetSha256: poll.dataset_sha256, retrievedAt: poll.retrieved_at,
        round: scenario.round, scenarioNumber: scenario.scenario_number, configuration: scenario.configuration_key,
        scenarioSampleSize: scenario.scenario_sample_size, candidates: scenario.results.map((r) => ({ id: r.candidate_external_id, name: r.candidate_name })),
      }))));
    return Response.json({ candidate, measurements, totalPolls: page.total, page: page.page, limit: page.limit,
      lastSuccess: page.lastSuccess, providers: POLL_PROVIDERS, methodology: 'Mesures publiées, sans moyenne. Les configurations sont distinctes ; la date est la fin du terrain.' }, { headers: POLL_HEADERS });
  } catch (error) {
    if (error instanceof PollQueryError) return Response.json({ error: error.message }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
    return pollApiError(error);
  }
}
