"use server";

import { revalidatePath } from "next/cache";
import { createHash } from "node:crypto";
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

/**
 * Protagonistes saisis une ligne par entrée :
 *   Nom | TYPE | ROLE | URL | note facultative
 * TYPE ∈ PERSONNE, ORGANISATION, LIEU, TEXTE ; ROLE ∈ SUJET, AUTEUR.
 * Une ligne mal formée arrête l'enregistrement plutôt que d'entrer à moitié.
 */
function parseProtagonists(form: FormData, dossierId: string): unknown[] {
  const brut = text(form, "protagonists");
  if (brut.length === 0) {
    return [];
  }
  const kinds = ["PERSONNE", "ORGANISATION", "LIEU", "TEXTE"];
  const roles = ["SUJET", "AUTEUR"];
  const entrees: unknown[] = [];
  for (const ligne of brut.split("\n")) {
    const propre = ligne.trim();
    if (propre.length === 0 || propre.startsWith("#")) {
      continue;
    }
    const [nom, kind, role, url, note] = propre.split("|").map((partie) => partie.trim());
    if (nom === undefined || nom.length === 0) {
      continue;
    }
    if (kind === undefined || !kinds.includes(kind.toUpperCase())) {
      problem(`/admin/dossiers/${dossierId}`, `Type de protagoniste inconnu : ${kind ?? "(vide)"}.`);
    }
    if (role === undefined || !roles.includes(role.toUpperCase())) {
      problem(`/admin/dossiers/${dossierId}`, `Rôle de protagoniste inconnu : ${role ?? "(vide)"}.`);
    }
    if (url !== undefined && url.length > 0 && !/^https?:\/\//.test(url)) {
      problem(`/admin/dossiers/${dossierId}`, `Référence attendue en http(s) : ${url}.`);
    }
    entrees.push({
      name: nom,
      kind: kind.toUpperCase(),
      role: role.toUpperCase(),
      reference_url: url !== undefined && url.length > 0 ? url : null,
      note: note !== undefined && note.length > 0 ? note : null,
    });
  }
  return entrees;
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

/** Illustration : URL http(s) ou chemin local (/illustrations/…), sinon refus explicite. */
function illustrationUrl(form: FormData, dossierId: string): string | null {
  const value = nullable(form, "illustration_url");
  if (value !== null && !/^(https?:\/\/|\/)/.test(value)) {
    problem(
      `/admin/dossiers/${dossierId}`,
      "Illustration refusée : URL http(s) ou chemin commençant par / attendu.",
    );
  }
  return value;
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
      protagonists: parseProtagonists(form, id),
      consensus_score: whole(form, "consensus_score", 0),
      premises: checkedPremises.data,
      illustration_url: illustrationUrl(form, id),
      illustration_credit: nullable(form, "illustration_credit"),
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
    author_reference_url: nullable(form, "author_reference_url"),
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
      author_reference_url: nullable(form, "author_reference_url"),
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
      "id, slug, claim_title, verdict, verdict_summary, category, consensus_score, premises, protagonists, is_published, published_at, dossier_sources (id, spectrum, source_name, author_or_institution, publication_date, quote_kind, exact_quote, context_explanation, original_url, author_reference_url, archive_storage_path, archive_sha256, archive_binary_sha256, display_order)",
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
    protagonists: row.protagonists ?? [],
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

/**
 * Illustration : le fichier est déposé dans le bucket public `illustrations`
 * avec la session de l'administrateur (RLS : is_admin()), puis l'URL publique
 * est inscrite sur le dossier. Le nom du fichier est l'empreinte de ses octets :
 * un remplacement produit une nouvelle URL, jamais un cache douteux.
 */
export async function uploadIllustrationAction(form: FormData) {
  const { client } = await requireAdmin();
  const id = text(form, "id");
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    problem(`/admin/dossiers/${id}`, "Illustration refusée : choisissez un fichier image.");
  }
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };
  const extension = extensions[file.type];
  if (extension === undefined) {
    problem(
      `/admin/dossiers/${id}`,
      "Illustration refusée : formats acceptés JPEG, PNG ou WebP.",
    );
  }
  if (file.size > 4 * 1024 * 1024) {
    problem(`/admin/dossiers/${id}`, "Illustration refusée : 4 Mo maximum.");
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const hash = createHash("sha256").update(bytes).digest("hex");
  const path = `${id}/${hash.slice(0, 20)}.${extension}`;
  const { error: uploadError } = await client.storage
    .from("illustrations")
    .upload(path, bytes, { contentType: file.type, upsert: true });
  if (uploadError !== null) {
    problem(`/admin/dossiers/${id}`, `Dépôt refusé : ${uploadError.message}`);
  }
  const { data: publicUrl } = client.storage.from("illustrations").getPublicUrl(path);
  const { error } = await client
    .from("dossiers")
    .update({
      illustration_url: publicUrl.publicUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error !== null) {
    problem(`/admin/dossiers/${id}`, `Enregistrement refusé : ${error.message}`);
  }
  refresh();
  done(
    `/admin/dossiers/${id}`,
    "Illustration déposée : elle s'affiche en tête du dossier. Vérifiez le crédit.",
  );
}
