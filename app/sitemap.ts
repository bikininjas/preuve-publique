import type { MetadataRoute } from 'next';
import { unstable_cache } from 'next/cache';
import { getGroupDirectory, getTopicCounts } from '@/lib/data';
import { topicSlug } from '@/lib/labels';
import { isUuid } from '@/lib/params';
import { pollOptions } from '@/lib/polls/data';
import { SEO_PAGES } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { publishedPieceIds } from '@/lib/sitemap-data';
import { getAllPartyVotes } from '@/lib/vote-theme-data';
import { VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';

// No guessed lastModified: the source/vote date is not the page's update date.
const cachedSitemap = unstable_cache(async (): Promise<MetadataRoute.Sitemap> => {
  const paths = new Set(Object.keys(SEO_PAGES));
  paths.add('/confidentialite');
  if (process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY) {
    const [pieces,topics,groups,parties,options] = await Promise.all([
      publishedPieceIds(),getTopicCounts(),getGroupDirectory(),getAllPartyVotes(),pollOptions(),
    ]);
    for (const id of pieces) if (isUuid(id)) paths.add(`/pieces/${id}`);
    for (const row of topics) {
      const slug = topicSlug(row.topic);
      if (slug) paths.add(`/categories/${slug}`);
    }
    for (const row of groups) if (isUuid(row.actor_id)) paths.add(`/groupes/${row.actor_id}`);
    for (const row of parties.parties) if (isUuid(row.party_id)) paths.add(`/partis/${row.party_id}`);
    for (const candidate of options.candidates) if (/^[a-z0-9][a-z0-9-]{0,79}$/.test(candidate.id)) paths.add(`/presidentielle-2027/candidats/${candidate.id}`);
    // Curated lexical themes are finite and linked by the public navigation.
    for (const institution of ['', 'assemblee','senat']) {
      const prefix = institution ? `institution=${institution}&` : '';
      for (const category of VOTE_SUBJECT_GROUPS) {
        paths.add(`/scrutins?${prefix}category=${category.id}`);
        for (const subject of category.subjects) paths.add(`/scrutins?${prefix}subject=${subject.id}`);
      }
    }
  }
  return [...paths].map(path => ({url:`${SITE_URL}${path}`}));
}, ['public-sitemap-v2',process.env.SUPABASE_URL ?? 'unconfigured'],{revalidate:3600});

export default async function sitemap() { return cachedSitemap(); }
