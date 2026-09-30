import { NextResponse } from 'next/server';
import { createClient, isSupabaseConfigured, publicOrigin } from '@/lib/supabase/server';
import { safeAdminPath } from '@/lib/params';

export const dynamic = 'force-dynamic';

/**
 * Completes the Google sign-in: exchanges the authorization code for a
 * session, then checks the address against the administration list. A signed
 * in account that is not on the list is signed straight back out.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = publicOrigin(request);
  const next = safeAdminPath(url.searchParams.get('next'), '/admin');
  const code = url.searchParams.get('code');
  const noStore = { 'cache-control': 'no-store' } as const;

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(`${origin}/admin/login?error=indisponible`, { status: 303, headers: noStore });
  }
  if (!code) {
    return NextResponse.redirect(`${origin}/admin/login?error=code`, { status: 303, headers: noStore });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(`${origin}/admin/login?error=echange`, { status: 303, headers: noStore });
  }

  const email = (data.user?.email ?? '').toLowerCase();
  const { data: allowed } = await supabase
    .from('admin_users')
    .select('email')
    .eq('email', email)
    .eq('active', true)
    .maybeSingle();
  if (!allowed) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/admin/login?error=non_autorise`, { status: 303, headers: noStore });
  }

  return NextResponse.redirect(`${origin}${next}`, { status: 303, headers: noStore });
}
