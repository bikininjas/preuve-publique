import { sql } from "drizzle-orm";
import {
  boolean,
  customType,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Schéma Drizzle du modèle éditorial. La source de vérité reste
 * `supabase/migrations/` : ce fichier décrit le même modèle pour les scripts
 * privilégiés (seed, contrôles) et le typage.
 */

export const verdictStatus = pgEnum("verdict_status", [
  "VRAI",
  "FAUX",
  "TROMPEUR",
  "INSTRUMENTALISATION_SEMANTIQUE",
  "HORS_CONTEXTE",
  "ANACHRONISME_HISTORIQUE",
  "GENERALISATION_ABUSIVE",
]);

export const politicalSpectrum = pgEnum("political_spectrum", [
  "ARCHIVE_PRIMAIRE",
  "CONSENSUS_ACADEMIQUE",
  "GAUCHE",
  "CENTRE",
  "DROITE_LIBERALE_CONSERVATRICE",
  "DONNEES_BRUTES_OFFICIELLES",
]);

export const quoteKind = pgEnum("quote_kind", ["CITATION_EXACTE", "FAIT_DOCUMENTE"]);

export const dossierCategory = pgEnum("dossier_category", [
  "HISTOIRE",
  "POLITIQUE",
  "ECONOMIE",
  "SOCIETE",
  "FAITS_DIVERS",
  "SANTE",
  "ENVIRONNEMENT",
  "INTERNATIONAL",
  "RELIGION",
]);

const tsvector = customType<{ data: string; driverData: string }>({
  dataType() {
    return "tsvector";
  },
});

const vector = customType<{ data: string; driverData: string }>({
  dataType() {
    return "extensions.vector(1536)";
  },
});

export const dossiers = pgTable(
  "dossiers",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    slug: text("slug").notNull().unique(),
    claimTitle: text("claim_title").notNull(),
    verdict: verdictStatus("verdict").notNull(),
    verdictSummary: text("verdict_summary").notNull(),
    category: dossierCategory("category").notNull(),
    protagonists: jsonb("protagonists").notNull().default(sql`'[]'::jsonb`),
    consensusScore: smallint("consensus_score").notNull(),
    premises: jsonb("premises").notNull().default(sql`'[]'::jsonb`),
    timeline: jsonb("timeline").notNull().default(sql`'[]'::jsonb`),
    searchTsv: tsvector("search_tsv").generatedAlwaysAs(
      sql`setweight(to_tsvector('french', coalesce(claim_title, '')), 'A') || setweight(to_tsvector('french', coalesce(verdict_summary, '')), 'B')`,
    ),
    embedding: vector("embedding"),
    isPublished: boolean("is_published").notNull().default(false),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    illustrationUrl: text("illustration_url"),
    illustrationCredit: text("illustration_credit"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_dossiers_slug").on(table.slug),
    index("idx_dossiers_search_tsv").using("gin", table.searchTsv),
    index("idx_dossiers_category_published").on(table.category),
  ],
);

/**
 * Fiches d'archive déposées. L'adresse d'une fiche est son empreinte SHA-256,
 * et une contrainte en base vérifie que le contenu déposé la redonne : le
 * contrôle n'est pas seulement fait par le script, il tient aussi côté serveur.
 */
export const dossierSourceArchives = pgTable(
  "dossier_source_archives",
  {
    sha256: text("sha256").primaryKey(),
    sourceId: uuid("source_id")
      .notNull()
      .references(() => dossierSources.id, { onDelete: "cascade" }),
    dossierId: uuid("dossier_id")
      .notNull()
      .references(() => dossiers.id, { onDelete: "cascade" }),
    schema: text("schema").notNull(),
    content: text("content").notNull(),
    bytes: integer("bytes").notNull(),
    capturedAt: timestamp("captured_at", { withTimezone: true }).notNull(),
    captureKind: text("capture_kind").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_dossier_source_archives_source").on(table.sourceId),
    index("idx_dossier_source_archives_dossier").on(table.dossierId),
  ],
);

export const dossierSources = pgTable(
  "dossier_sources",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    dossierId: uuid("dossier_id")
      .notNull()
      .references(() => dossiers.id, { onDelete: "cascade" }),
    spectrum: politicalSpectrum("spectrum").notNull(),
    sourceName: text("source_name").notNull(),
    authorOrInstitution: text("author_or_institution").notNull(),
    publicationDate: date("publication_date"),
    quoteKind: quoteKind("quote_kind").notNull(),
    exactQuote: text("exact_quote").notNull(),
    contextExplanation: text("context_explanation").notNull(),
    originalUrl: text("original_url"),
    authorReferenceUrl: text("author_reference_url"),
    archiveStoragePath: text("archive_storage_path"),
    archiveSha256: text("archive_sha256"),
    archiveBinarySha256: text("archive_binary_sha256"),
    displayOrder: smallint("display_order").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_dossier_sources_dossier_id").on(table.dossierId),
    index("idx_dossier_sources_archive_sha256").on(table.archiveSha256),
  ],
);
