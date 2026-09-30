import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Session refresh for the review space (Next.js calls this from `proxy.ts`
 * before /admin pages render). It verifies the access token and, when it is
 * close to expiry, exchanges the refresh token and stores the renewed session
 * cookies — the only place a Server Component cannot write them itself.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) response.cookies.set(name, value, options);
        // Cache-Control / Expires / Pragma: a cached response carrying a
        // Set-Cookie header would leak one session to another visitor.
        for (const [header, headerValue] of Object.entries(headers ?? {})) {
          response.headers.set(header, headerValue);
        }
      },
    },
  });

  // Verifies the JWT signature and refreshes the session when needed.
  await supabase.auth.getClaims();
  return response;
}
