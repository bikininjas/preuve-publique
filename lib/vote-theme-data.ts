import 'server-only';
import { unstable_cache } from 'next/cache';
import { getGroupVoteDashboard, getPartyVoteDashboard } from '@/lib/data';
import { categoryKeywords, VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

// Public RLS reads only. Argument keys include the controlled taxonomy and database
// identity. No user session or privileged client enters this shared five-minute cache.
const publicDatabase = process.env.SUPABASE_URL ?? 'unconfigured';
const cachedPartyDashboard = unstable_cache(getPartyVoteDashboard, ['party-theme-v1', publicDatabase], { revalidate: 300 });
const cachedGroupDashboard = unstable_cache(getGroupVoteDashboard, ['group-theme-v1', publicDatabase], { revalidate: 300 });

export const voteThemeEntries = [
  ...VOTE_SUBJECT_GROUPS.map((category) => ({ id: category.id, keywords: categoryKeywords(category) })),
  ...VOTE_SUBJECT_GROUPS.flatMap((category) => category.subjects.map((subject) => ({ id: subject.id, keywords: [...subject.keywords] }))),
];

// Bounded concurrency avoids a burst of dozens of simultaneous PostgREST calls.
async function loadEntries<T>(fetcher: (keywords: string[]) => Promise<T>, entries: typeof voteThemeEntries) {
  const results: Array<readonly [string, T | null]> = [];
  for (let start = 0; start < entries.length; start += 4) {
    const batch = await Promise.all(entries.slice(start, start + 4).map(async ({ id, keywords }) => {
      try { return [id, await fetcher(keywords)] as const; }
      catch { return [id, null] as const; } // Failed queries are not cached as empty data.
    }));
    results.push(...batch);
  }
  return new Map(results);
}

export function getPartyThemes(ids?: string[]) {
  return loadEntries(cachedPartyDashboard, ids ? voteThemeEntries.filter((entry) => ids.includes(entry.id)) : voteThemeEntries);
}

export function getGroupThemes() {
  return loadEntries(cachedGroupDashboard, voteThemeEntries);
}

export const getAllPartyVotes = unstable_cache(() => getPartyVoteDashboard(['']), ['all-party-votes-v1', publicDatabase], { revalidate: 300 });
