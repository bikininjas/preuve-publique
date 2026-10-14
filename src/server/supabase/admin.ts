import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Session de rédaction, côté serveur.
 *
 * Le client porte le jeton de l'utilisateur connecté : toutes les écritures
 * passent donc par la RLS, avec les politiques réservées aux administrateurs.
 * Aucune clé de service n'intervient ici — le conteneur ne la reçoit jamais.
 */
export async function supabaseSession() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (url === undefined || key === undefined || url.length === 0 || key.length === 0) {
    return null;
  }
  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(entries) {
        for (const entry of entries) {
          try {
            cookieStore.set(entry.name, entry.value, entry.options);
          } catch {
            // Rendu en lecture seule (page serveur) : la session est déjà posée
            // par l'action de connexion, l'échec d'écriture ici est sans effet.
          }
        }
      },
    },
  });
}

export type AdminIdentity = { id: string; email: string | null };

/**
 * Renvoie l'identité de l'administrateur connecté, ou null. L'appartenance à la
 * liste `admin_users` est vérifiée en base, pas dans le code : retirer une ligne
 * retire l'accès, sans redéploiement.
 */
export async function currentAdmin(): Promise<AdminIdentity | null> {
  const client = await supabaseSession();
  if (client === null) {
    return null;
  }
  const { data } = await client.auth.getUser();
  if (data.user === null || data.user === undefined) {
    return null;
  }
  const { data: row } = await client
    .from("admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (row === null) {
    return null;
  }
  return { id: data.user.id, email: data.user.email ?? null };
}
