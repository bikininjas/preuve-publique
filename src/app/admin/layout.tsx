import Link from "next/link";

import { currentAdmin } from "@/server/supabase/admin.ts";

export const dynamic = "force-dynamic";

/* L'espace de rédaction ne s'indexe pas : il n'est pas public. */
export const metadata = {
  robots: { index: false, follow: false },
};

/**
 * Coquille de l'espace de rédaction : sobre, sans la navigation publique, mais
 * avec la même règle affichée — rien ne se publie sans les quatre conditions.
 */
export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const admin = await currentAdmin();

  return (
    <div className="space-y-6">
      <header className="space-y-2 border border-grid bg-surface px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="pp-meta text-muted">Preuve publique · espace de rédaction</p>
          <div className="flex items-center gap-2">
            <Link className="pp-tap pp-meta text-seal hover:underline" href="/">
              Voir le site →
            </Link>
            {admin !== null ? (
              <span className="pp-meta text-muted">
                connecté : {admin.email ?? admin.id.slice(0, 8)}
              </span>
            ) : (
              <span className="pp-meta text-muted">non connecté</span>
            )}
          </div>
        </div>
        <p className="pp-tight max-w-[70ch] text-muted">
          L&apos;écriture passe par la session et la RLS : seuls les comptes inscrits
          dans <span className="font-mono text-ink">admin_users</span> peuvent créer,
          modifier ou publier. La publication est refusée par le validateur si la
          triangulation minimale n&apos;est pas réunie.
        </p>
      </header>
      {children}
    </div>
  );
}
