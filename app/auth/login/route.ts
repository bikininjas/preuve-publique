import { NextResponse } from 'next/server';
import { createClient, isSupabaseConfigured, publicOrigin } from '@/lib/supabase/server';
import { safeAdminPath } from '@/lib/params';

export const dynamic = 'force-dynamic';

/**
 * Starts the Google sign-in. The PKCE verifier is stored in a cookie by the
 * server client, and the callback route completes the exchange.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = publicOrigin(request);
  const next = safeAdminPath(url.searchParams.get('next'), '/admin');
  const noStore = { 'cache-control': 'no-store' } as const;

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/admin/login?error=indisponible`, { status: 303, headers: noStore });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
      queryParams: { prompt: 'select_account' },
    },
  });
  if (error || !data?.url) {
    return NextResponse.redirect(`${origin}/admin/login?error=indisponible`, { status: 303, headers: noStore });
  }
  return NextResponse.redirect(data.url, { status: 303, headers: noStore });
}
