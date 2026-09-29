import { createClient } from '@supabase/supabase-js';

export type Evidence = { id: string; title: string; occurred_at: string; kind: string; institution: string | null; source_url: string; excerpt: string | null };

export async function getEvidence(): Promise<Evidence[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return [];
  const db = createClient(url, key, { auth: { persistSession: false } });
  const { data, error } = await db.from('evidence').select('id,title,occurred_at,kind,institution,source_url,excerpt').eq('status','published').order('occurred_at',{ ascending:false }).limit(12);
  if (error) throw new Error('Impossible de charger les éléments publiés.');
  return data ?? [];
}
