import Link from 'next/link';
import { setReviewStatus } from '@/app/admin/actions';
import { createClient } from '@/lib/supabase/server';
import { ALLOWED_TRANSITIONS } from '@/lib/admin';
import { first,pageParam,type SearchParamsRecord } from '@/lib/params';
import { FlashNotice } from '@/components/flash-notice';
import { Empty,Pager,StatusBadge } from '@/components/ui';
import type { RowStatus } from '@/lib/types';

export const dynamic='force-dynamic';
export const metadata={title:'Relecture des mesures et positions'};
const TABLES=['policy_measures','policy_measure_evidence','candidate_connections'] as const;
const LABELS={policy_measures:'Questions et dispositifs',policy_measure_evidence:'Pièces reliées aux mesures',candidate_connections:'Rattachements et soutiens'};
export default async function MeasureReview({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  const params=await searchParams;
  const requested=first(params.table);
  const table=TABLES.find((t)=>t===requested) ?? 'policy_measures';
  const page=pageParam(params.page);
  const href=(target:number)=>`/admin/measures?table=${table}&page=${target}`;
  const db=await createClient();
  const {data,error,count}=await db.from(table).select('*',{count:'exact'}).order('id').range((page-1)*30,page*30-1);
  return <><h2>Mesures, pièces et rattachements</h2><p>Lire le dispositif exact, vérifier l’auteur, l’édition électorale, le repère précis et la chronologie. Publier une mesure et ses rapprochements séparément. Un rapprochement documentaire ne constitue pas un verdict de cohérence.</p>
    <FlashNotice params={params}/><nav className="pills">{TABLES.map((t)=><Link key={t} className={table===t?'active':''} href={`/admin/measures?table=${t}`}>{LABELS[t]}</Link>)}</nav>
    {error?<Empty>La file des mesures est indisponible.</Empty>:!data?.length?<Empty>Aucune entrée dans cette file.</Empty>:<div className="candidate-measures">{data.map((row)=><article className="panel" key={row.id}><StatusBadge status={row.status as RowStatus}/>
      <h3>{row.question ?? row.actor_name ?? row.role}</h3><p>{row.description ?? row.rationale ?? `${row.relation} · ${row.started_at} – ${row.ended_at ?? 'fin non renseignée'}`}</p>
      {row.evidence_id?<><Link href={`/admin/pieces/${row.evidence_id}`}>Ouvrir la pièce à vérifier →</Link><p>Mesure : <code>{row.measure_id}</code> · Auteur : <code>{row.actor_id ?? 'pièce de contexte'}</code> · Méthode : {row.method} · Confiance : {row.confidence ?? 'à renseigner via l’import'}.</p>{row.program_edition?<p>Programme : {row.program_edition} · {row.program_election} · {row.program_published_at}</p>:null}</>:null}
      {row.source_url?<p><a href={row.source_url} target="_blank" rel="noopener noreferrer">Source originale ↗</a> · {row.source_locator}</p>:null}
      <details><summary>Toutes les données de l’entrée</summary><pre style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{JSON.stringify(row,null,2)}</pre></details>
      <div className="candidate-form">{ALLOWED_TRANSITIONS[row.status as RowStatus].map((status)=><form action={setReviewStatus} key={status}><input type="hidden" name="table" value={table}/><input type="hidden" name="id" value={row.id}/><input type="hidden" name="status" value={status}/><input type="hidden" name="back" value={href(page)}/><button className="button secondary">{status==='reviewed'?'Marquer comme relu':status==='published'?'Publier':'Revenir au brouillon'}</button></form>)}</div>
    </article>)}</div>}
    <Pager page={page} pageCount={Math.max(1,Math.ceil((count??0)/30))} hrefFor={href}/>
  </>;
}
