import { listPolls, pollApiError, POLL_HEADERS } from '@/lib/polls/data';
import { parsePollQuery, PollQueryError } from '@/lib/polls/query';
import { POLL_PROVIDERS } from '@/lib/polls/providers';

export async function GET(request: Request) {
  try {
    const query = parsePollQuery(new URL(request.url).searchParams);
    return Response.json({ ...await listPolls(query), providers: POLL_PROVIDERS }, { headers: POLL_HEADERS });
  } catch (error) {
    if (error instanceof PollQueryError) return Response.json({ error: error.message }, { status: 400, headers: { 'Cache-Control': 'no-store' } });
    return pollApiError(error);
  }
}
