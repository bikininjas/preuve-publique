import { NextResponse } from "next/server";

import { supabaseSession } from "@/server/supabase/admin.ts";

export const dynamic = "force-dynamic";

/**
 * L'origine publique de la requête : derrière le proxy de Cloud Run, `host`
 * et `x-forwarded-proto` portent le domaine réel — recontruire l'URL depuis
 * `request.url` donnerait l'adresse d'écoute interne (`0.0.0.0`).
 */
function siteOrigin(request: Request): string {
  const headers = request.headers;
  const host = headers.get("x-forwarded-host") ?? headers.get("host") ?? new URL(request.url).host;
  const proto =
    headers.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
  return `${proto}://${host}`;
}

/**
 * Retour d'autorisation OAuth (Google). Le code d'autorisation est échangé
 * contre une session — flow PKCE de `@supabase/ssr`, le vérificateur ayant été
 * posé en cookie avant la redirection — puis le navigateur repart vers la page
 * demandée. Toute erreur est dite telle quelle : jamais de session supposée.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const nextParam = url.searchParams.get("next") ?? "/admin";
  /* Seules les destinations internes sont suivies : pas de redirection ouverte. */
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/admin";

  const origin = siteOrigin(request);

  if (code === null || code.length === 0) {
    return NextResponse.redirect(
      `${origin}/admin?probleme=${encodeURIComponent(
        "Retour Google sans code d'autorisation : connexion interrompue.",
      )}`,
    );
  }

  const client = await supabaseSession();
  if (client === null) {
    return NextResponse.redirect(
      `${origin}/admin?probleme=${encodeURIComponent("Supabase n'est pas configuré sur ce serveur.")}`,
    );
  }

  const { error } = await client.auth.exchangeCodeForSession(code);
  if (error !== null) {
    return NextResponse.redirect(
      `${origin}/admin?probleme=${encodeURIComponent(`Échange de session refusé : ${error.message}`)}`,
    );
  }

  return NextResponse.redirect(`${origin}${next}?ok=${encodeURIComponent("Connecté.")}`);
}
