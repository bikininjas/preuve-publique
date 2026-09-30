import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Supabase client bound to the request cookies, for server code (Server
 * Components, Server Actions, Route Handlers).
 *
 * Only the publishable key is used: reads are filtered by row level security,
 * and review writes are allowed by the `admin_review` policies (authenticated
 * role plus an address present in `admin_users`). No privileged key ever
 * reaches the web service.
 */

export class AuthUnavailableError extends Error {
  constructor(
    message = 'L’authentification n’est pas configurée : SUPABASE_URL et SUPABASE_PUBLISHABLE_KEY sont absentes.',
  ) {
    super(message);
    this.name = 'AuthUnavailableError';
  }
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_PUBLISHABLE_KEY?.trim());
}

/**
 * Public address of the deployment, for OAuth redirects: behind Cloud Run the
 * request arrives from a front-end, so the forwarded headers win in
 * production. Never built from user input.
 */
export function publicOrigin(request: Request): string {
  const url = new URL(request.url);
  const forwardedHost = request.headers.get('x-forwarded-host');
  if (process.env.NODE_ENV === 'production' && forwardedHost) {
    const proto = request.headers.get('x-forwarded-proto') ?? 'https';
    return `${proto}://${forwardedHost}`;
  }
  return url.origin;
}

export async function createClient() {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) throw new AuthUnavailableError();
  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // `proxy.ts` refreshes the session and writes the renewed token on
          // every /admin request, so nothing is lost.
        }
      },
    },
  });
}
