import { supabaseServer } from "../../db/index.ts";
import { publishedSeedDossiers, REFERENCE_DOSSIER } from "../../db/seed-fallback.ts";
import { searchSeedDossiers } from "../../lib/search.ts";
import type {
  DataResult,
  Dossier,
  DossierCategory,
  Protagonist,
  ProtagonistKind,
  ProtagonistRole,
  DossierSource,
  PoliticalSpectrum,
  Premise,
  PremiseStatus,
  QuoteKind,
  VerdictStatus,
} from "../../lib/types.ts";
import { parseTimelineEvents } from "../../lib/timeline.ts";
import { log } from "../middleware/logger.ts";
import { withDerivedProofHashes } from "../validators/dossier.schema.ts";

/**
 * Lecture publique des dossiers.
 *
 * Deux chemins, jamais mélangés :
 * - Supabase configuré → lecture via PostgREST avec la clé publishable, donc
 *   sous RLS : seuls les dossiers publiés (et leurs sources) sont rendus ;
 * - Supabase absent → dossiers de référence locaux, signalés par
 *   `origin: "seed"` (le site l'affiche, il ne le fait pas passer pour la base).
 *
 * Une erreur de lecture n'est jamais remplacée par des données locales : elle
 * est rendue telle quelle pour que la page l'affiche.
 *
 * Les empreintes de citation sont calculées ici (et non stockées en dur) : ce
 * que le site affiche est exactement ce qui a été haché.
 */

const CACHE_TTL_MS = 60_000;

type CacheEntry = { expiresAt: number; value: unknown };

const cache = new Map<string, CacheEntry>();

function readCache<T>(key: string): T | null {
  const hit = cache.get(key);
  if (hit === undefined) {
    return null;
  }
  if (hit.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }
  return hit.value as T;
}

function writeCache(key: string, value: unknown): void {
  if (cache.size > 200) {
    cache.clear();
  }
  cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, value });
}

/** Réservé aux tests et aux scripts d'administration. */
export function clearDossierCache(): void {
  cache.clear();
}

const SELECT_DOSSIER = `
  id, slug, claim_title, verdict, verdict_summary, category, protagonists, consensus_score, premises,
  timeline, is_published, published_at, illustration_url, illustration_credit,
  dossier_sources (
    id, spectrum, source_name, author_or_institution, publication_date,
    quote_kind, exact_quote, context_explanation, original_url,
    archive_storage_path, archive_sha256, archive_binary_sha256, display_order, author_reference_url
  )
`;

const VERDICTS: VerdictStatus[] = [
  "VRAI",
  "FAUX",
  "TROMPEUR",
  "INSTRUMENTALISATION_SEMANTIQUE",
  "HORS_CONTEXTE",
  "ANACHRONISME_HISTORIQUE",
  "GENERALISATION_ABUSIVE",
  "CONSPIRATIONNISTE",
];

const SPECTRA: PoliticalSpectrum[] = [
  "ARCHIVE_PRIMAIRE",
  "CONSENSUS_ACADEMIQUE",
  "GAUCHE",
  "CENTRE",
  "DROITE_LIBERALE_CONSERVATRICE",
  "DONNEES_BRUTES_OFFICIELLES",
];

const PREMISE_STATUSES: PremiseStatus[] = [
  "VRAI",
  "VRAI_DETOURNE",
  "CONFUSION_CONCEPTUELLE",
  "ANACHRONISME_CONCEPTUEL",
  "DOUBLE_STANDARD",
  "BIAIS_METHODOLOGIQUE",
  "BIAIS_DE_SELECTION",
  "COMPLOTISME",
  "BIAIS_ESSENTIALISTE",
  "FAUX",
];

const QUOTE_KINDS: QuoteKind[] = ["CITATION_EXACTE", "FAIT_DOCUMENTE"];

const PROTAGONIST_KINDS: ProtagonistKind[] = ["PERSONNE", "ORGANISATION", "LIEU", "TEXTE"];
const PROTAGONIST_ROLES: ProtagonistRole[] = ["SUJET", "AUTEUR"];

/** Un protagoniste illisible est écarté, jamais deviné. */
function parseProtagonists(value: unknown): Protagonist[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const protagonists: Protagonist[] = [];
  for (const entry of value) {
    if (!isRecord(entry)) {
      continue;
    }
    const name = asString(entry.name);
    const kind = asString(entry.kind);
    const role = asString(entry.role);
    if (
      name === null ||
      kind === null ||
      role === null ||
      !PROTAGONIST_KINDS.includes(kind as ProtagonistKind) ||
      !PROTAGONIST_ROLES.includes(role as ProtagonistRole)
    ) {
      continue;
    }
    protagonists.push({
      name,
      kind: kind as ProtagonistKind,
      role: role as ProtagonistRole,
      reference_url: asString(entry.reference_url),
      note: asString(entry.note),
    });
  }
  return protagonists;
}

const CATEGORIES: DossierCategory[] = [
  "HISTOIRE",
  "POLITIQUE",
  "ECONOMIE",
  "SOCIETE",
  "FAITS_DIVERS",
  "SANTE",
  "ENVIRONNEMENT",
  "INTERNATIONAL",
  "RELIGION",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function parsePremises(value: unknown): Premise[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const premises: Premise[] = [];
  for (const entry of value) {
    if (!isRecord(entry)) {
      continue;
    }
    const claim = asString(entry.claim_part);
    const status = asString(entry.status);
    const detail = asString(entry.detail);
    if (claim === null || status === null || detail === null) {
      continue;
    }
    if (!PREMISE_STATUSES.includes(status as PremiseStatus)) {
      continue;
    }
    premises.push({ claim_part: claim, status: status as PremiseStatus, detail });
  }
  return premises;
}

function parseSource(value: unknown): DossierSource | null {
  if (!isRecord(value)) {
    return null;
  }
  const spectrum = asString(value.spectrum);
  const quoteKind = asString(value.quote_kind) ?? "FAIT_DOCUMENTE";
  if (spectrum === null || !SPECTRA.includes(spectrum as PoliticalSpectrum)) {
    return null;
  }
  const sourceName = asString(value.source_name);
  const author = asString(value.author_or_institution);
  const quote = asString(value.exact_quote);
  const context = asString(value.context_explanation);
  if (sourceName === null || author === null || quote === null || context === null) {
    return null;
  }
  const hex = (input: unknown): string | null => {
    const candidate = asString(input);
    return candidate !== null && /^[0-9a-f]{64}$/.test(candidate) ? candidate : null;
  };
  return {
    id: asString(value.id) ?? `${spectrum}-${sourceName}`,
    spectrum: spectrum as PoliticalSpectrum,
    source_name: sourceName,
    author_or_institution: author,
    publication_date: asString(value.publication_date),
    quote_kind: QUOTE_KINDS.includes(quoteKind as QuoteKind)
      ? (quoteKind as QuoteKind)
      : "FAIT_DOCUMENTE",
    exact_quote: quote,
    context_explanation: context,
    original_url: asString(value.original_url),
    author_reference_url: asString(value.author_reference_url),
    archive_storage_path: asString(value.archive_storage_path),
    archive_sha256: hex(value.archive_sha256),
    archive_binary_sha256: hex(value.archive_binary_sha256),
    display_order: typeof value.display_order === "number" ? value.display_order : 100,
  };
}

function parseDossier(value: unknown): Dossier | null {
  if (!isRecord(value)) {
    return null;
  }
  const slug = asString(value.slug);
  const title = asString(value.claim_title);
  const verdict = asString(value.verdict);
  const summary = asString(value.verdict_summary);
  const category = asString(value.category);
  if (
    slug === null ||
    title === null ||
    verdict === null ||
    summary === null ||
    category === null ||
    !CATEGORIES.includes(category as DossierCategory)
  ) {
    return null;
  }
  if (!VERDICTS.includes(verdict as VerdictStatus)) {
    return null;
  }
  const rawSources = Array.isArray(value.dossier_sources) ? value.dossier_sources : [];
  const sources = rawSources
    .map(parseSource)
    .filter((source): source is DossierSource => source !== null)
    .sort((left, right) => left.display_order - right.display_order);
  const score = value.consensus_score;
  const dossier: Dossier = {
    id: asString(value.id) ?? slug,
    slug,
    claim_title: title,
    verdict: verdict as VerdictStatus,
    verdict_summary: summary,
    category: category as DossierCategory,
    protagonists: parseProtagonists(value.protagonists),
    consensus_score: typeof score === "number" && score >= 0 && score <= 100 ? score : 0,
    premises: parsePremises(value.premises),
    timeline: parseTimelineEvents(value.timeline),
    is_published: value.is_published === true,
    published_at: asString(value.published_at),
    illustration_url: asString(value.illustration_url),
    illustration_credit: asString(value.illustration_credit),
    sources,
  };
  return withDerivedProofHashes(dossier);
}

async function loadDossierRows(
  builder: PromiseLike<{ data: unknown; error: { message: string } | null }>,
  label: string,
): Promise<DataResult<unknown>> {
  const { data, error } = await builder;
  if (error !== null) {
    log.error("lecture supabase en echec", { label, error: error.message });
    return { ok: false, message: `${label} : ${error.message}` };
  }
  return { ok: true, origin: "supabase", value: data };
}

function parseRows(rows: unknown): DataResult<Dossier[]> {
  const list = Array.isArray(rows) ? rows : [];
  const dossiers = list
    .map(parseDossier)
    .filter((dossier): dossier is Dossier => dossier !== null);
  if (dossiers.length !== list.length) {
    return {
      ok: false,
      message:
        "Une ligne de dossier est illisible (verdict ou champ obligatoire inattendu) : elle n'est pas affichée.",
    };
  }
  return { ok: true, origin: "supabase", value: dossiers };
}

export async function listPublishedDossiers(): Promise<DataResult<Dossier[]>> {
  const client = supabaseServer();
  if (client === null) {
    return {
      ok: true,
      origin: "seed",
      value: publishedSeedDossiers().map(withDerivedProofHashes),
    };
  }
  const cached = readCache<DataResult<Dossier[]>>("dossiers:list");
  if (cached !== null) {
    return cached;
  }
  const result = await loadDossierRows(
    client
      .from("dossiers")
      .select(SELECT_DOSSIER)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .order("display_order", { referencedTable: "dossier_sources", ascending: true }),
    "Lecture des dossiers publiés",
  );
  if (!result.ok) {
    return result;
  }
  const parsed = parseRows(result.value);
  if (parsed.ok) {
    writeCache("dossiers:list", parsed);
  }
  return parsed;
}

export async function getPublishedDossier(
  slug: string,
): Promise<DataResult<Dossier | null>> {
  const client = supabaseServer();
  if (client === null) {
    const found = publishedSeedDossiers()
      .map(withDerivedProofHashes)
      .find((dossier) => dossier.slug === slug);
    return { ok: true, origin: "seed", value: found ?? null };
  }
  const key = `dossiers:slug:${slug}`;
  const cached = readCache<DataResult<Dossier | null>>(key);
  if (cached !== null) {
    return cached;
  }
  const result = await loadDossierRows(
    client
      .from("dossiers")
      .select(SELECT_DOSSIER)
      .eq("is_published", true)
      .eq("slug", slug)
      .order("display_order", { referencedTable: "dossier_sources", ascending: true })
      .maybeSingle(),
    "Lecture du dossier",
  );
  if (!result.ok) {
    return result;
  }
  if (result.value === null) {
    const missing: DataResult<Dossier | null> = { ok: true, origin: "supabase", value: null };
    writeCache(key, missing);
    return missing;
  }
  const dossier = parseDossier(result.value);
  if (dossier === null) {
    return {
      ok: false,
      message:
        "Le dossier existe mais une donnée obligatoire est illisible : il n'est pas affiché plutôt que d'être montré à moitié.",
    };
  }
  const value: DataResult<Dossier | null> = { ok: true, origin: "supabase", value: dossier };
  writeCache(key, value);
  return value;
}

/**
 * Recherche : RPC `search_dossiers_hybrid` (plein texte française + RRF
 * vectoriel) quand Supabase est configuré, recherche locale sinon. La fonction
 * SQL ne renvoie que les identifiants classés ; les sources sont ensuite lues
 * par la même requête que partout ailleurs, pour que l'affichage soit identique.
 */
export async function searchPublishedDossiers(
  query: string,
): Promise<DataResult<Dossier[]>> {
  const trimmed = query.trim();
  const client = supabaseServer();
  if (client === null) {
    return {
      ok: true,
      origin: "seed",
      value: searchSeedDossiers(trimmed).map(withDerivedProofHashes),
    };
  }
  if (trimmed.length === 0) {
    return listPublishedDossiers();
  }
  const key = `dossiers:search:${trimmed.toLowerCase()}`;
  const cached = readCache<DataResult<Dossier[]>>(key);
  if (cached !== null) {
    return cached;
  }

  const ranked = await client.rpc("search_dossiers_hybrid", {
    query_text: trimmed,
    match_count: 20,
  });
  if (ranked.error !== null) {
    log.error("recherche hybride en echec", { error: ranked.error.message });
    return { ok: false, message: `Recherche : ${ranked.error.message}` };
  }
  const rows = Array.isArray(ranked.data) ? ranked.data : [];
  const slugs: string[] = [];
  for (const row of rows) {
    if (isRecord(row)) {
      const slug = asString(row.slug);
      if (slug !== null && !slugs.includes(slug)) {
        slugs.push(slug);
      }
    }
  }
  if (slugs.length === 0) {
    const empty: DataResult<Dossier[]> = { ok: true, origin: "supabase", value: [] };
    writeCache(key, empty);
    return empty;
  }

  const hydrated = await loadDossierRows(
    client
      .from("dossiers")
      .select(SELECT_DOSSIER)
      .eq("is_published", true)
      .in("slug", slugs)
      .order("display_order", { referencedTable: "dossier_sources", ascending: true }),
    "Lecture des dossiers trouvés",
  );
  if (!hydrated.ok) {
    return hydrated;
  }
  const parsed = parseRows(hydrated.value);
  if (!parsed.ok) {
    return parsed;
  }
  const bySlug = new Map(parsed.value.map((dossier) => [dossier.slug, dossier]));
  const ordered: Dossier[] = [];
  for (const slug of slugs) {
    const dossier = bySlug.get(slug);
    if (dossier !== undefined) {
      ordered.push(dossier);
    }
  }
  const value: DataResult<Dossier[]> = { ok: true, origin: "supabase", value: ordered };
  writeCache(key, value);
  return value;
}

/**
 * Dossiers publiés d'une catégorie. Le filtrage se fait ici plutôt qu'en SQL
 * parce que la liste complète est déjà en cache pour l'accueil : une seule
 * requête sert tout le site.
 */
export async function listPublishedByCategory(
  category: DossierCategory,
): Promise<DataResult<Dossier[]>> {
  const all = await listPublishedDossiers();
  if (!all.ok) {
    return all;
  }
  return {
    ok: true,
    origin: all.origin,
    value: all.value.filter((dossier) => dossier.category === category),
  };
}

/** Nombre de dossiers publiés par catégorie (les catégories vides comptent 0). */
export async function categoryCounts(): Promise<DataResult<Record<DossierCategory, number>>> {
  const all = await listPublishedDossiers();
  if (!all.ok) {
    return all;
  }
  const counts = {} as Record<DossierCategory, number>;
  for (const category of CATEGORIES) {
    counts[category] = 0;
  }
  for (const dossier of all.value) {
    counts[dossier.category] += 1;
  }
  return { ok: true, origin: all.origin, value: counts };
}

/** Le dossier mis en avant sur l'accueil : le premier publié, sinon null. */
export async function featuredDossier(): Promise<DataResult<Dossier | null>> {
  const all = await listPublishedDossiers();
  if (!all.ok) {
    return all;
  }
  const ordered = [...all.value].sort((left, right) =>
    left.slug === REFERENCE_DOSSIER.slug ? -1 : right.slug === REFERENCE_DOSSIER.slug ? 1 : 0,
  );
  return { ok: true, origin: all.origin, value: ordered[0] ?? null };
}
