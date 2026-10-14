import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema.ts";

/**
 * Connexions de la partie serveur.
 *
 * Deux clients, deux usages, jamais mélangés :
 *
 * 1. `supabaseServer()` — API HTTP (PostgREST, Storage) avec la clé
 *    publishable, sans session : c'est le client du site, et le RLS décide de
 *    tout ce qui sort. Aucune socket PostgreSQL persistante.
 * 2. `privilegedDb()` — connexion `postgres` + Drizzle, réservée aux scripts
 *    (migrations, seed, contrôles). Elle exige `DB_PG_URL` (ou
 *    `DATABASE_POOLER_URL`) et ne doit **jamais** entrer dans le conteneur web.
 *
 * Sur Cloud Run, chaque conteneur ouvre au plus `max` connexions (Supavisor en
 * mode transaction sur le port 6543) : `prepare: false` est obligatoire, sinon
 * les requêtes préparées traversent le pooler avec une session qui n'existe
 * plus.
 */

export type SupabaseEnv = { url: string; key: string };

/** Variables acceptées : les nôtres, et les noms NEXT_PUBLIC_* du déploiement. */
export function supabaseEnv(): SupabaseEnv | null {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key =
    process.env.SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "";
  if (url.length === 0 || key.length === 0) {
    return null;
  }
  return { url, key };
}

let httpClient: SupabaseClient | null = null;

/** Client HTTP public, ou `null` si Supabase n'est pas configuré. */
export function supabaseServer(): SupabaseClient | null {
  const env = supabaseEnv();
  if (env === null) {
    httpClient = null;
    return null;
  }
  if (httpClient === null) {
    httpClient = createClient(env.url, env.key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return httpClient;
}

export function requireSupabase(): SupabaseClient {
  const client = supabaseServer();
  if (client === null) {
    throw new Error("Supabase n'est pas configuré (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY).");
  }
  return client;
}

/**
 * Client d'écriture (Storage, imports) : exige une clé privilégiée, donc
 * disponible seulement hors du conteneur web. Retourne `null` plutôt que de
 * lever, pour que l'appelant décide de la suite.
 */
export function supabaseAdmin(): SupabaseClient | null {
  const env = supabaseEnv();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (env === null || serviceKey.length === 0) {
    return null;
  }
  return createClient(env.url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

type Privileged = {
  db: PostgresJsDatabase<typeof schema>;
  client: ReturnType<typeof postgres>;
};

let cached: Privileged | null = null;

function connectionUrl(): string {
  const url = process.env.DB_PG_URL ?? process.env.DATABASE_POOLER_URL ?? "";
  if (url.length === 0) {
    throw new Error(
      "DB_PG_URL (ou DATABASE_POOLER_URL) est absente : les scripts privilégiés ne peuvent pas se connecter.",
    );
  }
  return url;
}

export function privilegedDb(): PostgresJsDatabase<typeof schema> {
  if (cached === null) {
    const client = postgres(connectionUrl(), {
      prepare: false,
      max: 5,
      idle_timeout: 20,
    });
    cached = { db: drizzle(client, { schema }), client };
  }
  return cached.db;
}

export async function closePrivilegedDb(): Promise<void> {
  if (cached !== null) {
    await cached.client.end();
    cached = null;
  }
}
