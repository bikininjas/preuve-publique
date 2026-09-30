import { NextResponse } from 'next/server';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

/**
 * Connexion technique locale, pour déboguer l'espace de relecture sans passer
 * par Google. Elle n'existe qu'en développement : en production la route
 * répond 404. Même ici, elle exige `DEV_ADMIN_EMAIL` et `DEV_ADMIN_PASSWORD`
 * (compte créé à la main, inscrit dans la liste d'administration) et utilise
 * exactement les mêmes règles que le reste du site : clé publishable, RLS,
 * politiques de revue. Aucune clé privilégiée n'est nécessaire.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Introuvable', { status: 404 });
  }
  const email = process.env.DEV_ADMIN_EMAIL?.trim();
  const password = process.env.DEV_ADMIN_PASSWORD;
  const failure = () => NextResponse.redirect(new URL('/admin/login?error=dev', request.url), 303);
  if (!isSupabaseConfigured() || !email || !password) {
    return NextResponse.redirect(new URL('/admin/login?error=indisponible', request.url), 303);
  }
  // Un envoi venu d'un autre site (formulaire croisé) est refusé ; curl et les
  // navigations directes n'envoient pas l'en-tête.
  const fetchSite = request.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin' && fetchSite !== 'none') return failure();

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return failure();
  return NextResponse.redirect(new URL('/admin', request.url), 303);
}
