import { pollApiError, pollOptions, POLL_HEADERS } from '@/lib/polls/data';

export async function GET() {
  try { return Response.json(await pollOptions(), { headers: POLL_HEADERS }); }
  catch (error) { return pollApiError(error); }
}
