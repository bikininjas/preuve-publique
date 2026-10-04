import { getEvidencePage } from '@/lib/data';
import { EvidenceCard } from '@/components/evidence-card';
import { Empty, Pager } from '@/components/ui';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Votes d’adoption définitive' };
export default async function FinalVotes({searchParams}:{searchParams:Promise<{page?:string}>}) {
  const params=await searchParams;const page=Math.max(1,Number.parseInt(params.page??'1',10)||1);
  let result:Awaited<ReturnType<typeof getEvidencePage>>|null=null;
  try{result=await getEvidencePage({kind:'vote',limit:24,offset:(page-1)*24});}catch{}
  return <><div className="queue-intro"><h2>Votes d’adoption définitive</h2><p>Le dernier vote nécessaire à l’adoption de la loi, avec son sujet, le résultat et la source. La promulgation peut intervenir ensuite, après le contrôle constitutionnel éventuel.</p></div>{result?.items.length ? <><p>{result.total} votes publiés · les sources sont consultables directement.</p><div className="grid">{result.items.map(item=><EvidenceCard item={item} key={item.id}/>)}</div><Pager page={page} pageCount={Math.max(1,Math.ceil(result.total/24))} hrefFor={p=>'/admin/scrutins?page='+p}/></> : <Empty>{result ? 'Aucun vote d’adoption définitive documenté.' : 'Les données sont temporairement indisponibles.'}</Empty>}</>;
}
