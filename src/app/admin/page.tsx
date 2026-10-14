import Link from "next/link";

import { createDossierAction, signInAction, signOutAction } from "@/app/admin/actions";
import { currentAdmin, supabaseSession } from "@/server/supabase/admin.ts";
import { CATEGORY_LABELS, CATEGORY_ORDER, VERDICT_LABELS } from "@/lib/labels";
import { VERDICT_VALUES } from "@/server/validators/dossier.schema.ts";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ ok?: string; probleme?: string }>;
};

function Banner({ ok, probleme }: { ok?: string; probleme?: string }) {
  if (probleme !== undefined) {
    return (
      <p className="border-2 border-falsebd bg-falsebg px-4 py-3 text-falsebd">{probleme}</p>
    );
  }
  if (ok !== undefined) {
    return (
      <p className="border-2 border-truebd bg-truebg px-4 py-3 text-truebd">{ok}</p>
    );
  }
  return null;
}

export default async function AdminPage({ searchParams }: PageProps) {
  const { ok, probleme } = await searchParams;
  const admin = await currentAdmin();
  const client = await supabaseSession();

  if (admin === null || client === null) {
    return (
      <div className="space-y-4">
        <Banner ok={ok} probleme={probleme} />
        <form action={signInAction} className="max-w-md space-y-3 border border-grid bg-surface p-4">
          <h1 className="pp-h3 font-serif text-ink">Connexion</h1>
          <label className="block">
            <span className="pp-meta text-muted">Courriel</span>
            <input
              className="mt-1 min-h-[44px] w-full border border-grid bg-canvas px-3 text-ink"
              type="email"
              name="email"
              autoComplete="username"
              required
            />
          </label>
          <label className="block">
            <span className="pp-meta text-muted">Mot de passe</span>
            <input
              className="mt-1 min-h-[44px] w-full border border-grid bg-canvas px-3 text-ink"
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </label>
          <button className="pp-btn pp-btn--ink w-full" type="submit">
            Se connecter
          </button>
          <p className="pp-tight text-muted">
            Les comptes sont ceux de Supabase Auth. Un compte sans ligne dans
            <span className="font-mono"> admin_users</span> peut se connecter mais
            n&apos;a aucun droit d&apos;écriture : la RLS refuse.
          </p>
        </form>
      </div>
    );
  }

  const { data } = await client
    .from("dossiers")
    .select("id, slug, claim_title, category, verdict, is_published, published_at, dossier_sources (id)")
    .order("created_at", { ascending: false });
  const rows = (data ?? []) as {
    id: string;
    slug: string;
    claim_title: string;
    category: keyof typeof CATEGORY_LABELS;
    verdict: keyof typeof VERDICT_LABELS;
    is_published: boolean;
    published_at: string | null;
    dossier_sources: { id: string }[];
  }[];

  return (
    <div className="space-y-6">
      <Banner ok={ok} probleme={probleme} />

      <section className="space-y-3 border border-grid bg-surface p-4">
        <h1 className="pp-h3 font-serif text-ink">Nouveau dossier</h1>
        <p className="pp-tight text-muted">
          Le dossier naît en brouillon : il n&apos;apparaît nulle part sur le site
          tant que le validateur ne l&apos;a pas accepté.
        </p>
        <form action={createDossierAction} className="grid gap-3 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="pp-meta text-muted">Affirmation vérifiée</span>
            <input
              className="mt-1 min-h-[44px] w-full border border-grid bg-canvas px-3 text-ink"
              name="claim_title"
              placeholder="Ex. : les rues de Paris sont plus sûres qu'en 2015"
              required
            />
          </label>
          <label>
            <span className="pp-meta text-muted">Identifiant d&apos;URL (déduit si vide)</span>
            <input
              className="mt-1 min-h-[44px] w-full border border-grid bg-canvas px-3 font-mono text-ink"
              name="slug"
              placeholder="exemple-de-slug"
            />
          </label>
          <label>
            <span className="pp-meta text-muted">Catégorie</span>
            <select
              className="mt-1 min-h-[44px] w-full border border-grid bg-canvas px-3 text-ink"
              name="category"
              defaultValue="POLITIQUE"
            >
              {CATEGORY_ORDER.map((category) => (
                <option key={category} value={category}>
                  {CATEGORY_LABELS[category]}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="pp-meta text-muted">Verdict visé</span>
            <select
              className="mt-1 min-h-[44px] w-full border border-grid bg-canvas px-3 text-ink"
              name="verdict"
              defaultValue="FAUX"
            >
              {VERDICT_VALUES.map((verdict) => (
                <option key={verdict} value={verdict}>
                  {VERDICT_LABELS[verdict]}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="pp-meta text-muted">Score de consensus (0-100)</span>
            <input
              className="mt-1 min-h-[44px] w-full border border-grid bg-canvas px-3 font-mono text-ink"
              name="consensus_score"
              type="number"
              min={0}
              max={100}
              defaultValue={0}
            />
          </label>
          <button className="pp-btn pp-btn--ink sm:col-span-2" type="submit">
            Créer le brouillon
          </button>
        </form>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="pp-h3 font-serif text-ink">Dossiers ({rows.length})</h2>
          <form action={signOutAction}>
            <button className="pp-btn" type="submit">
              Se déconnecter
            </button>
          </form>
        </div>

        {rows.length === 0 ? (
          <p className="border border-dashed border-gridsoft px-4 py-6 text-muted">
            Aucun dossier en base pour le moment.
          </p>
        ) : (
          <ul className="grid gap-2">
            {rows.map((row) => {
              const pieces = row.dossier_sources?.length ?? 0;
              return (
                <li
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-2 border border-grid bg-surface px-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-serif text-lg text-ink">{row.claim_title}</p>
                    <p className="pp-meta text-muted">
                      {CATEGORY_LABELS[row.category]} · {VERDICT_LABELS[row.verdict]} ·{" "}
                      {String(pieces).padStart(2, "0")} pièces ·{" "}
                      {row.is_published ? "publié" : "brouillon"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link className="pp-btn" href={`/admin/dossiers/${row.id}`}>
                      Modifier
                    </Link>
                    {row.is_published ? (
                      <Link className="pp-tap pp-meta text-seal hover:underline" href={`/dossiers/${row.slug}`}>
                        Voir →
                      </Link>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
