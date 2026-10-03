import { SeoPage } from '@/components/seo-page';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';
import { Empty,Pager } from '@/components/ui';
import { CandidateVoteTable,MeasureCards } from '@/components/candidates/evidence';
import { candidateProfiles,candidateVotes,policyMeasures } from '@/lib/candidates/data';
import { comparisonCandidates } from '@/lib/candidates/method';
import { pollOptions } from '@/lib/polls/data';
import { first,pageParam,type SearchParamsRecord } from '@/lib/params';
import { VOTE_SUBJECT_GROUPS,findVoteSubject } from '@/lib/vote-subjects';

export const dynamic='force-dynamic';
export default async function ComparePage({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  const query=await searchParams;
  const subject=findVoteSubject(first(query.subject)) ?? findVoteSubject('retraites')!;
  const page=pageParam(query.page);
  const [profiles,options]=await Promise.all([candidateProfiles().catch(()=>null),pollOptions().catch(()=>null)]);
  if(!options) return <main><SeoPage path="/presidentielle-2027/comparer" /><Empty>La comparaison est temporairement indisponible.</Empty></main>;
  const raw=query.candidate;
  const slugs=comparisonCandidates(Array.isArray(raw)?raw:raw?[raw]:[],options.candidates.map((c)=>c.id));
  const identities=slugs.map((slug)=>profiles?.find((p)=>p.candidate_external_id===slug && p.provider==='sondax') ?? {slug,name:options.candidates.find((c)=>c.id===slug)!.name,actor_id:null});
  const [votes,measures]=await Promise.all([slugs.length && profiles?candidateVotes(slugs,subject.keywords,page).catch(()=>null):Promise.resolve(null),policyMeasures(subject.id).catch(()=>null)]);
  const href=(target:number)=>{const params=new URLSearchParams({subject:subject.id,page:String(target)});slugs.forEach((s)=>params.append('candidate',s));return `/presidentielle-2027/comparer?${params}#votes`;};
  return <main><SeoPage path="/presidentielle-2027/comparer" /><Link className="text-link" href="/presidentielle-2027/candidats">← Les personnes testées</Link><div className="page-intro"><div className="eyebrow">Pièces communes · Même méthode pour tous</div><h1>Comparer sur une question</h1><p className="lead">Choisir jusqu’à trois personnes et lire leurs pièces sur le même sous-thème.</p></div>
    <form method="get" className="candidate-form panel"><label>Sous-thème<select name="subject" defaultValue={subject.id}>{VOTE_SUBJECT_GROUPS.map((g)=><optgroup label={g.label} key={g.id}>{g.subjects.map((s)=><option key={s.id} value={s.id}>{s.label}</option>)}</optgroup>)}</select></label>
      {[0,1,2].map((i)=><label key={i}>Personne {i+1}<select name="candidate" defaultValue={slugs[i]??''}><option value="">Choisir une personne</option>{options.candidates.map((c)=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>)}<button className="button">Comparer les pièces →</button></form>
    <div className="profile-reading-key"><p>Les colonnes portent sur les mêmes questions et les mêmes scrutins. Un bulletin manquant n’est ni une abstention ni une absence. La sélection n’établit aucune candidature officielle. Aucun score, classement ou orientation idéologique n’est calculé.</p><p>Les mots du titre servent à retrouver des scrutins, pas à qualifier leur direction. Un vote sur un texte entier ne vaut pas vote sur chacune de ses dispositions.</p></div>
    {!slugs.length?<Empty>Choisissez deux ou trois personnes pour explorer leurs différences ; une seule permet aussi de consulter son corpus.</Empty>:<>
      <div className="candidate-comparison-grid">{identities.map((identity)=><article className="panel" key={identity.slug}><h2><Link href={`/presidentielle-2027/candidats/${identity.slug}?subject=${subject.id}`}>{identity.name}</Link></h2><p>{identity.actor_id?'Identité recoupée avec le référentiel AN.':'Correspondance institutionnelle non documentée ou indisponible ; aucun vote n’est inféré.'}</p><Link href={`/presidentielle-2027/candidats/${identity.slug}?subject=${subject.id}`}>Rattachements datés, sondages et sources →</Link></article>)}</div>
      <section><h2>{subject.label} : mesures documentées</h2>{measures?<MeasureCards profiles={identities} {...measures}/>:<Empty>Les fiches de mesures sont temporairement indisponibles.</Empty>}</section>
      <section id="votes"><h2>Les mêmes scrutins, personne par personne</h2><p>Corpus nominatif vérifié de l’Assemblée, à partir de 2017. Scrutins où au moins une personne sélectionnée dispose d’un bulletin, triés par date décroissante. Les autres scrutins et institutions restent hors de ce tableau.</p>{votes?<><p>{votes.total} scrutin(s) dans cette sélection.</p><CandidateVoteTable profiles={identities} votes={votes.votes}/><Pager page={page} pageCount={Math.max(1,Math.ceil(votes.total/15))} hrefFor={href}/></>:<Empty>Les bulletins de la comparaison sont indisponibles.</Empty>}</section>
    </>}
  </main>;
}

export async function generateMetadata({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  return pageMetadata('/presidentielle-2027/comparer',SEO_PAGES['/presidentielle-2027/comparer'],await searchParams);
}
