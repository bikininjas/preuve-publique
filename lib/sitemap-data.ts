import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { DataUnavailableError } from '@/lib/data';

/** Keyset pagination: respects the API row cap without repeating or skipping IDs. */
export async function publishedPieceIds(): Promise<string[]> {
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  const db = createClient(url,key,{auth:{persistSession:false}});
  const ids: string[] = [];
  let cursor: string | undefined;
  // A single sitemap has at most 50,000 URLs. Fail explicitly before exceeding it.
  while (ids.length < 49000) {
    let query = db.from('evidence').select('id').eq('status','published').order('id').limit(1000);
    if (cursor) query = query.gt('id',cursor);
    const {data,error} = await query;
    if (error) throw new DataUnavailableError();
    if (!data?.length) return ids;
    ids.push(...data.map(row => row.id as string));
    cursor = ids.at(-1);
  }
  throw new Error('Le corpus nécessite un index de sitemaps avant de dépasser 49 000 pièces.');
}
