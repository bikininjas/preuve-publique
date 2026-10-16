import { buildRssFeed } from "@/lib/seo";
import { listPublishedDossiers } from "@/server/services/dossier.service";

export const dynamic = "force-dynamic";

/** Le flux ne sert que les dossiers publiés — exactement comme le site. */
export async function GET(): Promise<Response> {
  const listed = await listPublishedDossiers();
  const dossiers = listed.ok ? listed.value : [];
  return new Response(buildRssFeed(dossiers), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=60, s-maxage=60",
    },
  });
}
