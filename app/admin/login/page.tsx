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
  code: 'La réponse du fournisseur était incomplète : aucun code d’autorisation reçu.',
  echange: 'L’échange de jeton a échoué. Réessayez : l’ouverture de session repart de zéro.',
  non_autorise: 'Cette adresse Google n’est pas autorisée pour l’instant.',
  session: 'Votre session a expiré avant l’action. Reconnectez-vous.',
  dev: 'La connexion locale de débogage a échoué (compte technique absent, mot de passe désynchronisé, ou adresse hors de la liste d’administration).',
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
          L’authentification n’est pas configurée sur ce déploiement : renseignez <code>SUPABASE_URL</code> et{' '}
          <code>SUPABASE_PUBLISHABLE_KEY</code>, puis activez le fournisseur Google dans le projet Supabase.
        </Empty>
      ) : (
        <>
          <p className="lead">
            L’accès est réservé. La connexion se fait avec Google ; l’adresse est ensuite vérifiée contre la liste
            d’administration de la base. Aucune donnée Google n’est conservée : seule l’adresse sert à vérifier l’accès.
          </p>
          {first(params.ok) === 'deconnexion' ? <Notice kind="ok">Vous êtes déconnecté.</Notice> : null}
          {error ? <Notice>{ERRORS[error] ?? 'Connexion impossible.'}</Notice> : null}
          {session.status === 'not_allowed' ? (
            <Notice>
              <p>
                L’adresse <b>{session.email}</b> n’est pas dans la liste d’administration. Pour l’instant, une seule
                adresse est autorisée.
              </p>
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
            Les adresses autorisées vivent dans la table <code>admin_users</code> (ajout par SQL pour l’instant). Une
            adresse absente de la liste ne peut rien voir ni rien écrire, même connectée.
          </p>
          {devAvailable ? (
            <div className="dev-signin">
              <form method="post" action="/auth/dev">
                <button className="button secondary" type="submit">
                  Connexion locale (débogage)
                </button>
              </form>
              <p className="hint">
                Compte technique <code>{devEmail}</code> défini dans <code>.env.local</code> ; ce raccourci n’existe
                qu’en développement et suit les mêmes règles que Google (RLS + liste d’administration).
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
