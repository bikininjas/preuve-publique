import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOut } from '@/app/admin/actions';
import { Empty, Notice } from '@/components/ui';
import { getAdminSession } from '@/lib/admin';
import { first, type SearchParamsRecord } from '@/lib/params';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Connexion à l’espace de relecture' };

const ERRORS: Record<string, string> = {
  indisponible: 'L’authentification n’est pas disponible sur ce déploiement pour le moment.',
  code: 'La connexion n’a pas pu être vérifiée. Recommencez depuis cette page.',
  echange: 'La connexion n’a pas pu être vérifiée. Recommencez depuis cette page.',
  non_autorise: 'Accès refusé.',
  session: 'Votre session a expiré avant l’action. Reconnectez-vous.',
  attendre: 'Trop de tentatives. Réessayez dans quelques minutes.',
  dev: 'La connexion locale de débogage a échoué.',
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const session = await getAdminSession();
  if (session.status === 'admin') redirect('/admin');
  const params = await searchParams;
  const error = first(params.error);
  // Connexion technique de débogage : jamais montrée en production.
  const devEmail = process.env.DEV_ADMIN_EMAIL?.trim();
  const devAvailable = process.env.NODE_ENV !== 'production' && Boolean(devEmail && process.env.DEV_ADMIN_PASSWORD);

  return (
    <main className="narrow">
      <div className="eyebrow">Accès réservé / Équipe de relecture</div>
      <h1>Un espace pour<br /><em>vérifier avant de publier.</em></h1>

      {session.status === 'unconfigured' ? (
        <Empty>
          Cet accès n’est pas disponible pour le moment.
        </Empty>
      ) : (
        <>
          <p className="lead">
            L’accès est réservé aux personnes déjà autorisées. La connexion Google sert uniquement à vérifier le droit
            d’accès ; aucune liste d’adresses ni donnée d’administration n’est rendue publique.
          </p>
          {first(params.ok) === 'deconnexion' ? <Notice kind="ok">Vous êtes déconnecté.</Notice> : null}
          {error ? <Notice>{ERRORS[error] ?? 'Connexion impossible.'}</Notice> : null}
          {session.status === 'not_allowed' ? (
            <Notice>
              <p>Accès refusé.</p>
              <form action={signOut}>
                <button className="button secondary" type="submit">
                  Fermer cette session Google
                </button>
              </form>
            </Notice>
          ) : null}
          <p>
            <a className="button" href="/auth/login?next=/admin">
              Se connecter avec Google
            </a>
          </p>
          <p className="hint">
            Les droits sont vérifiés côté serveur avant chaque accès. Une session non autorisée ne peut ni lire ni écrire.
          </p>
          {devAvailable ? (
            <div className="dev-signin">
              <form method="post" action="/auth/dev">
                <button className="button secondary" type="submit">
                  Connexion locale (débogage)
                </button>
              </form>
              <p className="hint">
                Ce raccourci n’existe qu’en développement et suit les mêmes règles d’autorisation.
              </p>
            </div>
          ) : null}
        </>
      )}

      <p>
        <Link className="quiet" href="/">
          ← Retour au site public
        </Link>
      </p>
    </main>
  );
}
