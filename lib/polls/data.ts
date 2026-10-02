import { createClient } from '@supabase/supabase-js';
import type { PollOptions, PollPage, PollQuery } from './types.ts';

export class PollDataUnavailableError extends Error {
  constructor() { super('Les sondages sont indisponibles. Réessayez plus tard.'); }
}

function client() {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new PollDataUnavailableError();
  // Same public, server-side read model as lib/data.ts. RLS applies to every RPC.
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function listPolls(query: PollQuery): Promise<PollPage> {
  const { data, error } = await client().rpc('poll_list', {
    _institute: query.institute, _candidate: query.candidate, _party: query.party, _round: query.round,
    _start: query.startDate, _end: query.endDate, _configuration: query.configuration,
    _limit: query.limit, _offset: (query.page - 1) * query.limit,
  });
  if (error || !data || !Array.isArray(data.polls)) throw new PollDataUnavailableError();
  return { ...(data as Omit<PollPage, 'page' | 'limit'>), page: query.page, limit: query.limit };
}

export async function pollOptions(): Promise<PollOptions> {
  const { data, error } = await client().rpc('poll_options');
  if (error || !data || !Array.isArray(data.configurations)) throw new PollDataUnavailableError();
  return data as PollOptions;
}

export function pollApiError(error: unknown): Response {
  return Response.json({ error: error instanceof PollDataUnavailableError ? error.message : 'Les sondages sont indisponibles.' },
    { status: 503, headers: { 'Cache-Control': 'no-store' } });
}

export const POLL_HEADERS = { 'Cache-Control': 'public, max-age=60, s-maxage=300', 'X-Content-Type-Options': 'nosniff' };
