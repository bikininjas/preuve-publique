import { redirect } from 'next/navigation';
import { signOut } from '@/app/admin/actions';
import { AdminNav } from '@/components/admin-nav';
import { getAdminSession } from '@/lib/admin';
import './admin.css';

export const dynamic = 'force-dynamic';

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
        <div className="eyebrow">Administration</div>
        <h1>Non configuré</h1>
        <p className="empty">
          Cet accès n’est pas disponible pour le moment.
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
          Votre session n’est pas autorisée à accéder à cet espace.
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
          <h1>Administration</h1>
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
      <AdminNav />
      {children}
    </main>
  );
}
