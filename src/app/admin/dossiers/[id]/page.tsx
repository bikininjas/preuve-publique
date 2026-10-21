import Link from "next/link";
import { notFound } from "next/navigation";

import {
  addSourceAction,
  deleteDossierAction,
  deleteSourceAction,
  publishAction,
  unpublishAction,
  updateDossierAction,
  updateSourceAction,
  uploadIllustrationAction,
} from "@/app/admin/actions";
import { currentAdmin, supabaseSession } from "@/server/supabase/admin.ts";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  QUOTE_KIND_LABELS,
  SPECTRUM_CODES,
  SPECTRUM_LABELS,
  SPECTRUM_ORDER,
  VERDICT_LABELS,
} from "@/lib/labels";
import { QUOTE_KIND_VALUES, VERDICT_VALUES } from "@/server/validators/dossier.schema.ts";
import type { PoliticalSpectrum, Premise } from "@/lib/types";
import PremisesEditor from "@/components/PremisesEditor";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ok?: string; probleme?: string }>;
};

const INPUT = "mt-1 min-h-[44px] w-full border border-grid bg-canvas px-3 text-ink";
const TEXTAREA = "mt-1 w-full border border-grid bg-canvas px-3 py-2 text-ink";
const FIELD = "pp-meta text-muted";

export default async function AdminDossierPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { ok, probleme } = await searchParams;
  const admin = await currentAdmin();
  const client = await supabaseSession();
  if (admin === null || client === null) {
    return (
      <p className="border-2 border-falsebd bg-falsebg px-4 py-3 text-falseink">
        Session expirée.{" "}
        <Link className="underline" href="/admin">
          Se reconnecter
        </Link>
      </p>
    );
  }

  const { data } = await client
    .from("dossiers")
    .select(
      "id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score, premises, is_published, published_at, illustration_url, illustration_credit, dossier_sources (id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, author_reference_url, archive_sha256, display_order)",
    )
    .eq("id", id)
    .maybeSingle();
  if (data === null) {
    notFound();
  }

  const sources = [...(data.dossier_sources ?? [])].sort(
    (left, right) => left.display_order - right.display_order,
  );

  return (
    <div className="space-y-6">
      {probleme !== undefined ? (
        <p className="border-2 border-falsebd bg-falsebg px-4 py-3 text-falseink">{probleme}</p>
      ) : null}
      {ok !== undefined ? (
        <p className="border-2 border-truebd bg-truebg px-4 py-3 text-truebd">{ok}</p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="pp-h3 font-serif text-ink">{data.claim_title}</h1>
        <span className="pp-meta text-muted">
          {data.is_published ? "publié" : "brouillon"} · {sources.length} pièces
        </span>
      </div>

      {/* Publication : l'issue dépend du validateur, pas du bouton. */}
      <section className="flex flex-wrap items-center gap-3 border border-grid bg-surface px-4 py-3">
        {data.is_published ? (
          <>
            <form action={unpublishAction}>
              <input type="hidden" name="id" value={data.id} />
              <button className="pp-btn" type="submit">
                Repasser en brouillon
              </button>
            </form>
            <Link className="pp-tap pp-meta text-seal hover:underline" href={`/dossiers/${data.slug}`}>
              Voir la page publique →
            </Link>
          </>
        ) : (
          <form action={publishAction}>
            <input type="hidden" name="id" value={data.id} />
            <button className="pp-btn pp-btn--ink" type="submit">
              Publier (validateur de triangulation)
            </button>
          </form>
        )}
        <form action={deleteDossierAction} className="ml-auto">
          <input type="hidden" name="id" value={data.id} />
          <button className="pp-btn" type="submit">
            Supprimer le dossier
          </button>
        </form>
      </section>

      {/* Illustration : dépôt direct dans le bucket public, crédit affiché sous l'image. */}
      <section className="space-y-3 border border-grid bg-surface p-4">
        <h2 className="pp-h3 font-serif text-ink">Image d&apos;illustration</h2>
        <p className="pp-tight text-muted">
          Un fichier JPEG, PNG ou WebP (4 Mo max) : il est déposé dans le bucket public
          <span className="font-mono"> illustrations</span> et s&apos;affiche en tête du dossier
          public, sous le titre. Pensez au <span className="text-ink">crédit</span> (auteur,
          licence, source) : il est affiché sous l&apos;image, et il est obligatoire pour les
          images sous licence libre — Wikimedia Commons, Unsplash, etc.
        </p>
        {data.illustration_url !== null && data.illustration_url !== "" ? (
          <figure className="space-y-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="max-h-56 w-auto border border-grid object-cover"
              src={data.illustration_url}
              alt=""
            />
            <figcaption className="pp-meta text-muted">
              {data.illustration_credit ?? "crédit non renseigné"}
            </figcaption>
          </figure>
        ) : (
          <p className="pp-meta text-muted">Aucune image pour ce dossier.</p>
        )}
        <form action={uploadIllustrationAction} className="flex flex-wrap items-center gap-3">
          <input type="hidden" name="id" value={data.id} />
          <input
            className="pp-tap"
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp"
            required
          />
          <button className="pp-btn pp-btn--ink" type="submit">
            Téléverser l&apos;image
          </button>
        </form>
      </section>

      <form action={updateDossierAction} className="grid gap-3 border border-grid bg-surface p-4 sm:grid-cols-2">
        <input type="hidden" name="id" value={data.id} />
        <label className="sm:col-span-2">
          <span className={FIELD}>Affirmation vérifiée</span>
          <input className={INPUT} name="claim_title" defaultValue={data.claim_title} required />
        </label>
        <label>
          <span className={FIELD}>Identifiant d&apos;URL</span>
          <input className={`${INPUT} font-mono`} name="slug" defaultValue={data.slug} required />
        </label>
        <label>
          <span className={FIELD}>Catégorie</span>
          <select className={INPUT} name="category" defaultValue={data.category}>
            {CATEGORY_ORDER.map((category) => (
              <option key={category} value={category}>
                {CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={FIELD}>Verdict</span>
          <select className={INPUT} name="verdict" defaultValue={data.verdict}>
            {VERDICT_VALUES.map((verdict) => (
              <option key={verdict} value={verdict}>
                {VERDICT_LABELS[verdict]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={FIELD}>Score de consensus (0-100)</span>
          <input
            className={`${INPUT} font-mono`}
            name="consensus_score"
            type="number"
            min={0}
            max={100}
            defaultValue={data.consensus_score}
          />
        </label>
        <label className="sm:col-span-2">
          <span className={FIELD}>Résumé du verdict (2 à 3 phrases, affichées sur la fiche)</span>
          <textarea
            className={TEXTAREA}
            name="verdict_summary"
            rows={3}
            defaultValue={data.verdict_summary}
          />
        </label>
        <label>
          <span className={FIELD}>
            Illustration — URL http(s) ou chemin local (facultatif)
          </span>
          <input
            className={`${INPUT} font-mono`}
            name="illustration_url"
            defaultValue={data.illustration_url ?? ""}
            placeholder="/illustrations/… ou https://…"
          />
        </label>
        <label>
          <span className={FIELD}>Crédit de l&apos;illustration (auteur, licence, source)</span>
          <input
            className={INPUT}
            name="illustration_credit"
            defaultValue={data.illustration_credit ?? ""}
            placeholder="Photo : Auteur, Wikimedia Commons, CC BY-SA 4.0"
          />
        </label>
        <div className="sm:col-span-2">
          <span className={FIELD}>Anatomie du sophisme</span>
          <PremisesEditor initial={(data.premises ?? []) as Premise[]} />
        </div>
        <label className="sm:col-span-2">
          <span className={FIELD}>
            Protagonistes (une ligne par entrée : Nom | TYPE | ROLE | URL | note)
          </span>
          <textarea
            className={`${TEXTAREA} font-mono text-[13px]`}
            name="protagonists"
            rows={10}
            defaultValue={(data.protagonists ?? [])
              .map(
                (entree: {
                  name: string;
                  kind: string;
                  role: string;
                  reference_url: string | null;
                  note: string | null;
                }) =>
                  [entree.name, entree.kind, entree.role, entree.reference_url ?? "", entree.note ?? ""]
                    .join(" | ")
                    .replace(/ \| \| $/, " | | "),
              )
              .join("\n")}
          />
          <span className={FIELD}>
            TYPE : PERSONNE, ORGANISATION, LIEU, TEXTE — ROLE : SUJET (mis en cause) ou
            AUTEUR (porte la preuve). Les lignes commençant par # sont ignorées.
          </span>
        </label>
        <button className="pp-btn pp-btn--ink sm:col-span-2" type="submit">
          Enregistrer le dossier
        </button>
      </form>

      <section className="space-y-3">
        <h2 className="pp-h3 font-serif text-ink">Pièces à conviction ({sources.length})</h2>
        {SPECTRUM_ORDER.map((spectrum) => {
          const count = sources.filter((source) => source.spectrum === spectrum).length;
          return (
            <p key={spectrum} className="pp-meta text-muted">
              {SPECTRUM_CODES[spectrum]} · {SPECTRUM_LABELS[spectrum]} :{" "}
              <span className="text-ink">{String(count).padStart(2, "0")}</span>
            </p>
          );
        })}

        {sources.map((source) => (
          <details key={source.id} className="pp-fold">
            <summary>
              {SPECTRUM_CODES[source.spectrum as PoliticalSpectrum]} · {source.source_name} ·{" "}
              {source.publication_date ?? "date non documentée"}
            </summary>
            <form action={updateSourceAction} className="grid gap-3 p-3 sm:grid-cols-2">
              <input type="hidden" name="id" value={source.id} />
              <input type="hidden" name="dossier_id" value={data.id} />
              <label>
                <span className={FIELD}>Pilier</span>
                <select className={INPUT} name="spectrum" defaultValue={source.spectrum}>
                  {SPECTRUM_ORDER.map((entry) => (
                    <option key={entry} value={entry}>
                      {SPECTRUM_LABELS[entry]}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={FIELD}>Nature</span>
                <select className={INPUT} name="quote_kind" defaultValue={source.quote_kind}>
                  {QUOTE_KIND_VALUES.map((kind) => (
                    <option key={kind} value={kind}>
                      {QUOTE_KIND_LABELS[kind]}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={FIELD}>Nom de la source</span>
                <input className={INPUT} name="source_name" defaultValue={source.source_name} required />
              </label>
              <label>
                <span className={FIELD}>Auteur ou institution</span>
                <input
                  className={INPUT}
                  name="author_or_institution"
                  defaultValue={source.author_or_institution}
                  required
                />
              </label>
              <label>
                <span className={FIELD}>Date de publication</span>
                <input
                  className={`${INPUT} font-mono`}
                  name="publication_date"
                  type="date"
                  defaultValue={source.publication_date ?? ""}
                />
              </label>
              <label>
                <span className={FIELD}>Ordre d&apos;affichage</span>
                <input
                  className={`${INPUT} font-mono`}
                  name="display_order"
                  type="number"
                  min={0}
                  defaultValue={source.display_order}
                />
              </label>
              <label className="sm:col-span-2">
                <span className={FIELD}>Citation exacte ou fait documenté</span>
                <textarea
                  className={TEXTAREA}
                  name="exact_quote"
                  rows={4}
                  defaultValue={source.exact_quote}
                  required
                />
              </label>
              <label className="sm:col-span-2">
                <span className={FIELD}>Pourquoi cette pièce compte</span>
                <textarea
                  className={TEXTAREA}
                  name="context_explanation"
                  rows={3}
                  defaultValue={source.context_explanation}
                  required
                />
              </label>
              <label className="sm:col-span-2">
                <span className={FIELD}>URL d&apos;origine (https://…)</span>
                <input
                  className={`${INPUT} font-mono`}
                  name="original_url"
                  type="url"
                  defaultValue={source.original_url ?? ""}
                />
              </label>
              <label className="sm:col-span-2">
                <span className={FIELD}>Référence de l&apos;auteur ou de l&apos;institution</span>
                <input
                  className={`${INPUT} font-mono`}
                  name="author_reference_url"
                  type="url"
                  placeholder="https://fr.wikipedia.org/wiki/…"
                  defaultValue={source.author_reference_url ?? ""}
                />
              </label>
              <p className="pp-meta text-muted sm:col-span-2">
                empreinte actuelle :{" "}
                <span className="text-ink">
                  {source.archive_sha256 === null
                    ? "recalculée à l'enregistrement"
                    : `${source.archive_sha256.slice(0, 24)}…`}
                </span>
              </p>
              <button className="pp-btn pp-btn--ink" type="submit">
                Enregistrer la pièce
              </button>
            </form>
            <form action={deleteSourceAction} className="px-3 pb-3">
              <input type="hidden" name="id" value={source.id} />
              <input type="hidden" name="dossier_id" value={data.id} />
              <button className="pp-btn" type="submit">
                Supprimer la pièce
              </button>
            </form>
          </details>
        ))}

        <details className="pp-fold">
          <summary>Ajouter une pièce</summary>
          <form action={addSourceAction} className="grid gap-3 p-3 sm:grid-cols-2">
            <input type="hidden" name="dossier_id" value={data.id} />
            <label>
              <span className={FIELD}>Pilier</span>
              <select className={INPUT} name="spectrum" defaultValue="ARCHIVE_PRIMAIRE">
                {SPECTRUM_ORDER.map((entry) => (
                  <option key={entry} value={entry}>
                    {SPECTRUM_LABELS[entry]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={FIELD}>Nature</span>
              <select className={INPUT} name="quote_kind" defaultValue="CITATION_EXACTE">
                {QUOTE_KIND_VALUES.map((kind) => (
                  <option key={kind} value={kind}>
                    {QUOTE_KIND_LABELS[kind]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className={FIELD}>Nom de la source</span>
              <input className={INPUT} name="source_name" required />
            </label>
            <label>
              <span className={FIELD}>Auteur ou institution</span>
              <input className={INPUT} name="author_or_institution" required />
            </label>
            <label>
              <span className={FIELD}>Date de publication</span>
              <input className={`${INPUT} font-mono`} name="publication_date" type="date" />
            </label>
            <label>
              <span className={FIELD}>Ordre d&apos;affichage</span>
              <input
                className={`${INPUT} font-mono`}
                name="display_order"
                type="number"
                min={0}
                defaultValue={sources.length + 1}
              />
            </label>
            <label className="sm:col-span-2">
              <span className={FIELD}>Citation exacte ou fait documenté</span>
              <textarea className={TEXTAREA} name="exact_quote" rows={4} required />
            </label>
            <label className="sm:col-span-2">
              <span className={FIELD}>Pourquoi cette pièce compte</span>
              <textarea className={TEXTAREA} name="context_explanation" rows={3} required />
            </label>
            <label className="sm:col-span-2">
              <span className={FIELD}>URL d&apos;origine (https://…)</span>
              <input className={`${INPUT} font-mono`} name="original_url" type="url" />
            </label>
            <label className="sm:col-span-2">
              <span className={FIELD}>Référence de l&apos;auteur ou de l&apos;institution</span>
              <input
                className={`${INPUT} font-mono`}
                name="author_reference_url"
                type="url"
                placeholder="https://fr.wikipedia.org/wiki/…"
              />
            </label>
            <button className="pp-btn pp-btn--ink sm:col-span-2" type="submit">
              Ajouter la pièce
            </button>
          </form>
        </details>
      </section>
    </div>
  );
}
