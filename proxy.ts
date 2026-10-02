import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';
import { SITE_URL } from '@/lib/site';

// Canonical host redirects happen before rendering. Session refresh is
// restricted to the review space; public visits never call Supabase Auth.
export async function proxy(request: NextRequest) {
  const host = (request.headers.get('x-forwarded-host') ?? request.headers.get('host') ?? '').split(',')[0].trim().split(':')[0].toLowerCase();
  if (process.env.NODE_ENV === 'production' && (host.endsWith('.run.app') || host === 'www.preuve-publique.fr')) {
    const target = new URL(SITE_URL);
    target.pathname = request.nextUrl.pathname;
    target.search = request.nextUrl.search;
    return NextResponse.redirect(target,308);
  }
  const admin = request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/admin/');
  const response = admin ? await updateSession(request) : NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', admin ? 'no-referrer' : 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  response.headers.set('Content-Security-Policy', "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'");
  if (admin) response.headers.set('Cache-Control', 'no-store, private');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|icon.svg|apple-icon|partage|opengraph-image).*)'],
};
