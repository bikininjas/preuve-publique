'use server';

import { redirect } from 'next/navigation';
import { ALLOWED_TRANSITIONS, getAdminSession } from '@/lib/admin';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { isUuid, safeAdminPath } from '@/lib/params';
import { ROW_STATUSES } from '@/lib/types';
import type { RowStatus } from '@/lib/types';

const REVIEW_TABLES = ['evidence', 'evidence_links', 'policy_measures', 'policy_measure_evidence', 'candidate_connections'] as const;
type ReviewTable = (typeof REVIEW_TABLES)[number];

function withParams(path: string, values: Record<string, string>): string {
  // `path` may already carry a query string (the queue filters); merge instead
  // of appending a second '?' — that bug swallowed the confirmation notice.
  const [base, query] = path.split('?');
  const search = new URLSearchParams(query);
  for (const [key, value] of Object.entries(values)) search.set(key, value);
  const result = search.toString();
  return result ? `${base}?${result}` : base;
}

/**
 * Editorial transition, mirroring `ingestion/lib/db.mjs`: draft → reviewed,
 * reviewed → published | draft, published → reviewed. The reviewer is the
 * connected address.
 *
 * This is convenience, not the security boundary: the database re-checks the
 * allowlist and the "reviewer identified" rule through row level security, so
 * a forged request writes nothing.
 */
export async function setReviewStatus(formData: FormData) {
  const tableValue = String(formData.get('table') ?? '');
  const id = String(formData.get('id') ?? '');
  const statusValue = String(formData.get('status') ?? '');
  const back = safeAdminPath(formData.get('back'));
  const isTable = (value: string): value is ReviewTable => (REVIEW_TABLES as readonly string[]).includes(value);
  const isStatus = (value: string): value is RowStatus => (ROW_STATUSES as readonly string[]).includes(value);

  if (!isTable(tableValue) || !isStatus(statusValue) || !isUuid(id)) {
    redirect(withParams(back, { error: 'demande' }));
  }
  const table: ReviewTable = tableValue;
  const status: RowStatus = statusValue;

  const session = await getAdminSession();
  if (session.status !== 'admin') redirect('/admin/login?error=session');
  const db = await createClient();

  const current = await db.from(table).select('id,status').eq('id', id).maybeSingle();
  if (current.error || !current.data) redirect(withParams(back, { error: 'introuvable', id }));
  const from = current.data.status as RowStatus;
  if (from === status) redirect(withParams(back, { ok: 'inchange', id }));
  if (!ALLOWED_TRANSITIONS[from]?.includes(status)) {
    redirect(withParams(back, { error: 'transition', from, to: status }));
  }

  const payload =
    status === 'draft'
      ? { status, reviewed_by: null, reviewed_at: null }
      : { status, reviewed_by: session.email, reviewed_at: new Date().toISOString() };

  const { data, error } = await db.from(table).update(payload).eq('id', id).select('id,status').maybeSingle();
  if (error || !data) redirect(withParams(back, { error: 'maj', id }));
  redirect(withParams(back, { ok: status, id }));
}

/** Ends the session; the public pages never depend on it. */
export async function signOut() {
  if (isSupabaseConfigured()) {
    try {
      const db = await createClient();
      await db.auth.signOut();
    } catch {
      // Best effort: even if the provider is unreachable, the user leaves the
      // review space and the proxy will drop the stale session.
    }
  }
  redirect('/admin/login?ok=deconnexion');
}
