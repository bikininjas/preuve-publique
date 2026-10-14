"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { currentAdmin, supabaseSession } from "@/server/supabase/admin.ts";
import { clearDossierCache } from "@/server/services/dossier.service.ts";
import { premiseSchema } from "@/server/validators/dossier.schema.ts";
import { dossierSchema } from "@/server/validators/dossier.schema.ts";
import { withDerivedProofHashes } from "@/server/validators/dossier.schema.ts";

/**
 * Actions d'administration.
 *
 * Chaque action vérifie d'abord la session : une action serveur est un point
 * d'entrée public, elle ne fait jamais confiance au formulaire qui l'appelle.
 * Les écritures passent par la session (donc par la RLS) et non par une
 * connexion privilégiée.
 */

function text(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function nullable(form: FormData, name: string): string | null {
  const value = text(form, name);
  return value.length === 0 ? null : value;
}

function whole(form: FormData, name: string, fallback: number): number {
  const parsed = Number.parseInt(text(form, name), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function problem(target: string, message: string): never {
  redirect(`${target}?probleme=${encodeURIComponent(message)}`);
}

function done(target: string, message: string): never {
  redirect(`${target}?ok=${encodeURIComponent(message)}`);
}

function refresh() {
  clearDossierCache();
  revalidatePath("/");
  revalidatePath("/dossiers");
  revalidatePath("/admin");
}

async function requireAdmin() {
  const admin = await currentAdmin();
  if (admin === null) {
    redirect("/admin?probleme=" + encodeURIComponent("Session expirée : reconnectez-vous."));
  }
  const client = await supabaseSession();
  if (client === null) {
    redirect("/admin?probleme=" + encodeURIComponent("Supabase n'est pas configuré sur ce serveur."));
  }
  return { admin, client };
}

export async function signInAction(form: FormData) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (url === undefined || key === undefined) {
    problem("/admin", "Supabase n'est pas configuré sur ce serveur.");
  }
  const email = text(form, "email");
  const password = String(form.get("password") ?? "");
  if (email.length === 0 || password.length === 0) {
    problem("/admin", "Courriel et mot de passe requis.");
  }
  const client = await supabaseSession();
  if (client === null) {
    problem("/admin", "Supabase n'est pas configuré sur ce serveur.");
  }
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error !== null) {
    // Le message d'origine est repris tel quel : mieux vaut un refus explicite
    // qu'une formulation vague qui ferait douter du mot de passe saisi.
    problem("/admin", `Connexion refusée : ${error.message}`);
  }
  revalidatePath("/admin");
  redirect("/admin?ok=" + encodeURIComponent("Connecté."));
}

export async function signOutAction() {
  const client = await supabaseSession();
  if (client !== null) {
    await client.auth.signOut();
  }
  revalidatePath("/admin");
  redirect("/admin");
}

export async function createDossierAction(form: FormData) {
  const { client } = await requireAdmin();
  const slug = text(form, "slug")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (slug.length === 0) {
    problem("/admin", "Le titre doit produire un identifiant d'URL non vide.");
  }
  const claim = text(form, "claim_title");
  if (claim.length === 0) {
    problem("/admin", "L'affirmation à vérifier est obligatoire.");
  }
  const { data, error } = await client
    .from("dossiers")
    .insert({
      slug,
      claim_title: claim,
      category: text(form, "category"),
      verdict: text(form, "verdict"),
      verdict_summary:
        text(form, "verdict_summary").length > 0
          ? text(form, "verdict_summary")
          : "Résumé à écrire.",
      consensus_score: whole(form, "consensus_score", 0),
      premises: [],
      is_published: false,
      published_at: null,
    })
    .select("id")
    .single();
  if (error !== null) {
    problem("/admin", `Création refusée : ${error.message}`);
  }
  refresh();
  done(`/admin/dossiers/${data.id}`, "Brouillon créé. Ajoutez des pièces, puis publiez.");
}

export async function updateDossierAction(form: FormData) {
  const { client } = await requireAdmin();
  const id = text(form, "id");
  let premises: unknown = [];
  const rawPremises = text(form, "premises");
  if (rawPremises.length > 0) {
    try {
      premises = JSON.parse(rawPremises);
    } catch {
      problem(`/admin/dossiers/${id}`, "Le bloc « anatomie » n'est pas un JSON valide.");
    }
  }
  const checkedPremises = z.array(premiseSchema).safeParse(premises);
  if (!checkedPremises.success) {
    problem(
      `/admin/dossiers/${id}`,
      `Anatomie refusée : ${checkedPremises.error.issues[0]?.message ?? "format inattendu"}.`,
    );
  }
  const { error } = await client
    .from("dossiers")
    .update({
      claim_title: text(form, "claim_title"),
      slug: text(form, "slug"),
      category: text(form, "category"),
      verdict: text(form, "verdict"),
      verdict_summary: text(form, "verdict_summary"),
      consensus_score: whole(form, "consensus_score", 0),
      premises: checkedPremises.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error !== null) {
    problem(`/admin/dossiers/${id}`, `Enregistrement refusé : ${error.message}`);
  }
  refresh();
  done(`/admin/dossiers/${id}`, "Dossier enregistré.");
}

export async function addSourceAction(form: FormData) {
  const { client } = await requireAdmin();
  const dossierId = text(form, "dossier_id");
  const { error } = await client.from("dossier_sources").insert({
    dossier_id: dossierId,
    spectrum: text(form, "spectrum"),
    source_name: text(form, "source_name"),
    author_or_institution: text(form, "author_or_institution"),
    publication_date: nullable(form, "publication_date"),
    quote_kind: text(form, "quote_kind"),
    exact_quote: text(form, "exact_quote"),
    context_explanation: text(form, "context_explanation"),
    original_url: nullable(form, "original_url"),
    display_order: whole(form, "display_order", 1),
  });
  if (error !== null) {
    problem(`/admin/dossiers/${dossierId}`, `Pièce refusée : ${error.message}`);
  }
  refresh();
  done(`/admin/dossiers/${dossierId}`, "Pièce ajoutée. Les empreintes se calculent à la lecture.");
}

export async function updateSourceAction(form: FormData) {
  const { client } = await requireAdmin();
  const dossierId = text(form, "dossier_id");
  const id = text(form, "id");
  const { error } = await client
    .from("dossier_sources")
    .update({
      spectrum: text(form, "spectrum"),
      source_name: text(form, "source_name"),
      author_or_institution: text(form, "author_or_institution"),
      publication_date: nullable(form, "publication_date"),
      quote_kind: text(form, "quote_kind"),
      exact_quote: text(form, "exact_quote"),
      context_explanation: text(form, "context_explanation"),
      original_url: nullable(form, "original_url"),
      display_order: whole(form, "display_order", 1),
      // Toute modification de citation invalide l'empreinte publiée : elle est
      // recalculée, jamais conservée à l'identique.
      archive_sha256: null,
    })
    .eq("id", id);
  if (error !== null) {
    problem(`/admin/dossiers/${dossierId}`, `Enregistrement refusé : ${error.message}`);
  }
  refresh();
  done(`/admin/dossiers/${dossierId}`, "Pièce enregistrée : son empreinte a été recalculée.");
}

export async function deleteSourceAction(form: FormData) {
  const { client } = await requireAdmin();
  const dossierId = text(form, "dossier_id");
  const { error } = await client.from("dossier_sources").delete().eq("id", text(form, "id"));
  if (error !== null) {
    problem(`/admin/dossiers/${dossierId}`, `Suppression refusée : ${error.message}`);
  }
  refresh();
  done(`/admin/dossiers/${dossierId}`, "Pièce supprimée.");
}

export async function deleteDossierAction(form: FormData) {
  const { client } = await requireAdmin();
  const { error } = await client.from("dossiers").delete().eq("id", text(form, "id"));
  if (error !== null) {
    problem("/admin", `Suppression refusée : ${error.message}`);
  }
  refresh();
  done("/admin", "Dossier supprimé.");
}

/**
 * Publication : le validateur de triangulation décide, pas l'auteur du dossier.
 * S'il refuse, la liste des manques est affichée telle quelle.
 */
export async function publishAction(form: FormData) {
  const { client } = await requireAdmin();
  const id = text(form, "id");
  const { data: row, error } = await client
    .from("dossiers")
    .select(
      "id, slug, claim_title, verdict, verdict_summary, category, consensus_score, premises, is_published, published_at, dossier_sources (id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, archive_storage_path, archive_sha256, archive_binary_sha256, display_order)",
    )
    .eq("id", id)
    .maybeSingle();
  if (error !== null || row === null) {
    problem(`/admin/dossiers/${id}`, `Lecture refusée : ${error?.message ?? "dossier introuvable"}.`);
  }
  const candidate = withDerivedProofHashes({
    id: row.id,
    slug: row.slug,
    claim_title: row.claim_title,
    verdict: row.verdict,
    verdict_summary: row.verdict_summary,
    category: row.category,
    consensus_score: row.consensus_score,
    premises: row.premises,
    is_published: true,
    published_at: row.published_at ?? new Date().toISOString(),
    sources: (row.dossier_sources ?? []).sort(
      (left, right) => left.display_order - right.display_order,
    ),
  });
  const checked = dossierSchema.safeParse(candidate);
  if (!checked.success) {
    const details = checked.error.issues
      .map((issue) => issue.message)
      .slice(0, 6)
      .join(" · ");
    problem(`/admin/dossiers/${id}`, `Publication refusée — ${details}`);
  }
  const { error: updateError } = await client
    .from("dossiers")
    .update({
      is_published: true,
      published_at: candidate.published_at,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (updateError !== null) {
    problem(`/admin/dossiers/${id}`, `Publication refusée : ${updateError.message}`);
  }
  refresh();
  done(`/admin/dossiers/${id}`, "Dossier publié : il est visible sur le site public.");
}

export async function unpublishAction(form: FormData) {
  const { client } = await requireAdmin();
  const id = text(form, "id");
  const { error } = await client
    .from("dossiers")
    .update({ is_published: false, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error !== null) {
    problem(`/admin/dossiers/${id}`, `Dépublication refusée : ${error.message}`);
  }
  refresh();
  done(`/admin/dossiers/${id}`, "Dossier repassé en brouillon.");
}
