import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. It runs before the
// review space renders and keeps the Supabase session fresh; the public
// pages never need a session and are not matched.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ['/admin/:path*'],
};
