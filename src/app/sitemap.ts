import type { MetadataRoute } from "next";

import { buildSitemapEntries } from "@/lib/seo";
import { listPublishedDossiers } from "@/server/services/dossier.service";

export const dynamic = "force-dynamic";

/**
 * Plan de site lu à la requête — comme les pages. Si la lecture échoue, on
 * sort les pages fixes et les catégories, jamais un dossier non vérifié et
 * jamais une erreur : un plan de site incomplet vaut mieux qu'un 500.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listed = await listPublishedDossiers();
  const dossiers = listed.ok ? listed.value : [];
  return buildSitemapEntries(dossiers);
}
