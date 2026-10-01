import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOut } from '@/app/admin/actions';
import { getAdminSession } from '@/lib/admin';

export const dynamic = 'force-dynamic';

const ADMIN_LINKS = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/review', label: '01 · Pièces' },
  { href: '/admin/links', label: '02 · Rapprochements' },
  { href: '/admin/runs', label: '03 · Imports' },
  { href: '/admin/publication', label: '04 · Publication' },
  { href: '/', label: 'Voir le site ↗' },
];

/**
 * Gate for the review space. Server-side check on every request: no session →
 * sign-in page, signed-in address not on the administration list → refusal
 * page. The database enforces the same rule on every read and write.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (session.status === 'signed_out') redirect('/admin/login?next=/admin');

  if (session.status === 'unconfigured') {
    return (
      <main className="narrow">
        <div className="eyebrow">Espace de relecture</div>
        <h1>Non configuré</h1>
        <p className="empty">
          Ce déploiement n’a pas de base configurée (<code>SUPABASE_URL</code>, <code>SUPABASE_PUBLISHABLE_KEY</code>).
        </p>
      </main>
    );
  }

  if (session.status === 'not_allowed') {
    return (
      <main className="narrow">
        <div className="eyebrow">Accès refusé</div>
        <h1>Cette adresse n’est pas autorisée.</h1>
        <p className="lead">
          {session.email ? (
            <>
              L’adresse <b>{session.email}</b> n’est pas dans la liste d’administration.
            </>
          ) : (
            'Votre session n’est pas rattachée à une adresse autorisée.'
          )}{' '}
          Les autorisations se gèrent dans la table{' '}
          <code>admin_users</code>.
        </p>
        <form action={signOut}>
          <button className="button secondary" type="submit">
            Se déconnecter
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin">
      <div className="admin-head">
        <div>
          <div className="eyebrow">Preuve Publique / Administration</div>
          <h1>Atelier de relecture</h1>
        </div>
        <div className="admin-who">
          <span>
            Compte connecté : <b>{session.email}</b>
          </span>
          <form action={signOut}>
            <button className="mini" type="submit">
              Se déconnecter
            </button>
          </form>
        </div>
      </div>
      <nav className="admin-nav">
        {ADMIN_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
      {children}
    </main>
  );
}
