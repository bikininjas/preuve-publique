import { publishedSeedDossiers } from "../db/seed-fallback.ts";
import type { Dossier } from "./types.ts";

/** Normalisation pour la recherche locale : accents et casse ignorés. */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function haystack(dossier: Dossier): string {
  const parts = [dossier.claim_title, dossier.verdict_summary];
  for (const source of dossier.sources) {
    parts.push(source.source_name, source.author_or_institution, source.exact_quote);
  }
  return normalize(parts.join(" \n "));
}

/**
 * Recherche locale (repli et tests) : chaque terme de la requête doit être
 * présent. Elle ne prend que des dossiers déjà publiés — même règle que la
 * lecture Supabase, qui applique en plus la recherche plein texte française
 * sur la colonne `search_tsv`.
 */
export function searchSeedDossiers(query: string, dossiers = publishedSeedDossiers()): Dossier[] {
  const terms = normalize(query)
    .split(/\s+/)
    .filter((term) => term.length > 1);
  if (terms.length === 0) {
    return dossiers;
  }
  return dossiers.filter((dossier) => {
    const text = haystack(dossier);
    return terms.every((term) => text.includes(term));
  });
}
