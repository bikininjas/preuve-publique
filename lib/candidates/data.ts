import { createClient } from '@supabase/supabase-js';
import { DataUnavailableError } from '@/lib/data';
import type { Evidence } from '@/lib/types';
import type { CandidateProfile,CandidateConnection,CandidateVote,PolicyMeasure,MeasureEvidence } from './types';

function client() {
  if(!process.env.SUPABASE_URL || !process.env.SUPABASE_PUBLISHABLE_KEY) throw new DataUnavailableError();
  return createClient(process.env.SUPABASE_URL,process.env.SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:false}});
}
const PROFILE_COLUMNS='slug,provider,candidate_external_id,actor_id,name,actor_external_id,source_url,source_locator,retrieved_at,source_sha256';
export async function candidateProfiles():Promise<CandidateProfile[]> {
  const {data,error}=await client().from('candidate_profiles').select(PROFILE_COLUMNS).eq('status','published').order('name').limit(100);
  if(error) throw new DataUnavailableError();
  return data as CandidateProfile[];
}
export async function candidateConnections(slugs:string[]):Promise<CandidateConnection[]> {
  if(!slugs.length) return [];
  const {data,error}=await client().from('candidate_connections').select('id,candidate_slug,actor_id,actor_name,relation,started_at,ended_at,source_url,source_locator,retrieved_at')
    .eq('status','published').in('candidate_slug',slugs.slice(0,3)).order('started_at',{ascending:false}).limit(200);
  if(error) throw new DataUnavailableError();
  return data as CandidateConnection[];
}
export async function candidateVotes(slugs:string[],keywords:readonly string[],page=1):Promise<{total:number;votes:CandidateVote[]}> {
  const {data,error}=await client().rpc('candidate_vote_comparison',{_candidates:slugs.slice(0,3),_keywords:[...keywords],_limit:15,_offset:(page-1)*15});
  if(error || !data || !Array.isArray(data.votes)) throw new DataUnavailableError();
  return data;
}
export async function policyMeasures(subject:string):Promise<{measures:PolicyMeasure[];links:MeasureEvidence[]}> {
  const db=client();
  const {data:measures,error}=await db.from('policy_measures').select('*').eq('status','published').eq('subject',subject).order('slug').limit(30);
  if(error) throw new DataUnavailableError();
  if(!measures.length) return {measures:[],links:[]};
  const {data:links,error:linkError}=await db.from('policy_measure_evidence').select('*').eq('status','published').in('measure_id',measures.map((m)=>m.id)).limit(200);
  if(linkError) throw new DataUnavailableError();
  if(!links.length) return {measures:measures as PolicyMeasure[],links:[]};
  const {data:pieces,error:pieceError}=await db.from('evidence').select('*').eq('status','published').in('id',[...new Set(links.map((l)=>l.evidence_id))]).limit(200);
  if(pieceError) throw new DataUnavailableError();
  const byId=new Map(pieces.map((piece)=>[piece.id,piece as Evidence]));
  return {measures:measures as PolicyMeasure[],links:links.flatMap((link)=>{
    const evidence=byId.get(link.evidence_id);
    return evidence?[{...link,evidence} as MeasureEvidence]:[];
  })};
}
