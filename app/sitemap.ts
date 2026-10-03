import type { MetadataRoute } from 'next';
import { unstable_cache } from 'next/cache';
import { getGroupDirectory, getPublishedPieceIndex, getTopicCounts } from '@/lib/data';
import { topicSlug } from '@/lib/labels';
import { isUuid } from '@/lib/params';
import { pollOptions } from '@/lib/polls/data';
import { SITE_URL } from '@/lib/site';
import { getAllPartyVotes } from '@/lib/vote-theme-data';

/**
 * sitemap.xml : les pages fixes du site, puis les fiches réellement publiées
 * lues en rôle public (RLS : seul ce qui est publié apparaît). Aucune adresse
 * n'est devinée — chaque section ne liste que ce que la base renvoie, et une
 * section momentanément indisponible disparaît au lieu d'inventer des pages.
 *
 * `force-dynamic` : le build n'a pas les variables Supabase, la liste est donc
 * construite à la requête et non figée au déploiement. Le résultat est mis en
 * cache une heure pour amortir les passages répétés des moteurs.
 */
export const dynamic = 'force-dynamic';

const PAGES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
  { url: `${SITE_URL}/scrutins`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${SITE_URL}/pieces`, changeFrequency: 'daily', priority: 0.8 },
  { url: `${SITE_URL}/categories`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${SITE_URL}/groupes`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${SITE_URL}/partis`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${SITE_URL}/methode`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/observatoire`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${SITE_URL}/presidentielle-2027`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${SITE_URL}/presidentielle-2027/candidats`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${SITE_URL}/presidentielle-2027/sondages`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${SITE_URL}/presidentielle-2027/comparer`, changeFrequency: 'monthly', priority: 0.4 },
];

/** Une lecture en échec retire sa section du sitemap ; elle n'écrit pas de fausse adresse. */
async function safe(build: () => Promise<MetadataRoute.Sitemap>): Promise<MetadataRoute.Sitemap> {
  try {
    return await build();
  } catch {
    return [];
  }
}

/** Fiches publiées : la date du document sert de repère de dernière modification. */
function pieceEntries(): Promise<MetadataRoute.Sitemap> {
  return safe(async () => (await getPublishedPieceIndex())
    .filter((piece) => isUuid(piece.id))
    .map((piece) => ({
      url: `${SITE_URL}/pieces/${piece.id}`,
      lastModified: piece.occurred_at,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })));
}

/** Rubriques publiées par la source, adressées par leur identifiant d'URL stable. */
function categoryEntries(): Promise<MetadataRoute.Sitemap> {
  return safe(async () => {
    const topics = await getTopicCounts();
    const slugs = [...new Set(topics.map((row) => topicSlug(row.topic)))].filter(Boolean);
    return slugs.map((slug) => ({
      url: `${SITE_URL}/categories/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));
  });
}

/** Fiches de groupes parlementaires de l'annuaire publié. */
function groupEntries(): Promise<MetadataRoute.Sitemap> {
  return safe(async () => {
    const groups = await getGroupDirectory();
    const seen = new Map<string, string>();
    for (const group of groups) if (isUuid(group.actor_id)) seen.set(group.actor_id, group.last_vote);
    return [...seen].map(([actorId, lastVote]) => ({
      url: `${SITE_URL}/groupes/${actorId}`,
      lastModified: lastVote,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
  });
}

/** Profils de vote des partis identifiés par des affiliations datées. */
function partyEntries(): Promise<MetadataRoute.Sitemap> {
  return safe(async () => {
    const dashboard = await getAllPartyVotes();
    const ids = [...new Set(dashboard.parties.map((party) => party.party_id))].filter(isUuid);
    return ids.map((partyId) => ({
      url: `${SITE_URL}/partis/${partyId}`,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));
  });
}

/** Personnes testées dans les sondages, avec la même adresse que la fiche. */
function candidateEntries(): Promise<MetadataRoute.Sitemap> {
  return safe(async () => {
    const options = await pollOptions();
    return options.candidates
      .filter((candidate) => /^[a-z0-9][a-z0-9-]{0,79}$/.test(candidate.id))
      .map((candidate) => ({
        url: `${SITE_URL}/presidentielle-2027/candidats/${candidate.id}`,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }));
  });
}

const cachedSitemap = unstable_cache(
  async (): Promise<MetadataRoute.Sitemap> => {
    const [pieces, categories, groups, parties, candidates] = await Promise.all([
      pieceEntries(), categoryEntries(), groupEntries(), partyEntries(), candidateEntries(),
    ]);
    return [...PAGES, ...pieces, ...categories, ...groups, ...parties, ...candidates];
  },
  ['sitemap-v1', process.env.SUPABASE_URL ?? 'unconfigured'],
  { revalidate: 3600 },
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return cachedSitemap();
}
