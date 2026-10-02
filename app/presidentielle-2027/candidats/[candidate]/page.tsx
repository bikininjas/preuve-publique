import { SeoPage } from '@/components/seo-page';
import { publicPollOptions as pollOptions, documentMetadata } from '@/lib/seo-content';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Empty,Pager } from '@/components/ui';
import { CandidateVoteTable,MeasureCards } from '@/components/candidates/evidence';
import { listPolls } from '@/lib/polls/data';
import { candidateProfiles,candidateConnections,candidateVotes,policyMeasures } from '@/lib/candidates/data';
import { CONNECTION_LABELS,connectionActive } from '@/lib/candidates/method';
import { VOTE_SUBJECT_GROUPS,findVoteSubject } from '@/lib/vote-subjects';
import { first,pageParam,type SearchParamsRecord } from '@/lib/params';
import { formatDate } from '@/lib/labels';
import { pollDate,pollScore } from '@/lib/polls/format';

export const dynamic='force-dynamic';
export default async function CandidatePage({params,searchParams}:{params:Promise<{candidate:string}>;searchParams:Promise<SearchParamsRecord>}) {
  const {candidate}=await params;
  if(!/^[a-z0-9][a-z0-9-]{0,79}$/.test(candidate)) notFound();
  const query=await searchParams;
  const subject=findVoteSubject(first(query.subject)) ?? findVoteSubject('retraites')!;
  const page=pageParam(query.page);
  const [options,profiles]=await Promise.all([pollOptions().catch(()=>null),candidateProfiles().catch(()=>null)]);
  if(!options) return <main><SeoPage path={`/presidentielle-2027/candidats/${candidate}`} /><Empty>Les fiches candidates sont temporairement indisponibles.</Empty></main>;
  const nominee=options.candidates.find((c)=>c.id===candidate);
  if(!nominee) notFound();
  const profile=profiles?.find((p)=>p.provider==='sondax' && p.candidate_external_id===candidate);
  const identity=profile ?? {slug:candidate,name:nominee.name,actor_id:null};
  const [connections,votes,measures,polls]=await Promise.all([
    profile?candidateConnections([profile.slug]).catch(()=>null):Promise.resolve([]),
    profile?candidateVotes([profile.slug],subject.keywords,page).catch(()=>null):Promise.resolve({votes:[],total:0}),
    policyMeasures(subject.id).catch(()=>null),
    listPolls({candidate,institute:null,party:null,round:null,startDate:null,endDate:null,configuration:null,page:1,limit:3}).catch(()=>null),
  ]);
  const day=new Date().toISOString().slice(0,10);
  const current=connections?.filter((c)=>connectionActive(c,day)) ?? [];
  const href=(target:number)=>`/presidentielle-2027/candidats/${candidate}?subject=${subject.id}&page=${target}#votes-personnels`;
  return <main className="candidate-profile"><SeoPage path={`/presidentielle-2027/candidats/${candidate}`} /><Link className="text-link" href="/presidentielle-2027/candidats">← Toutes les personnes testées</Link>
    <div className="page-intro"><div className="eyebrow">Personne testée · Présidentielle 2027</div><h1>{nominee.name}</h1><p className="lead">Des intentions de vote aux propositions et décisions documentées.</p></div>
    <div className="profile-reading-key"><p>Une présence dans un sondage ne confirme pas une candidature. Un rattachement financier, une adhésion et un soutien électoral sont des faits distincts. Les votes d’un parti ne remplacent pas ceux d’une personne.</p>
      <Link href={`/presidentielle-2027/comparer?candidate=${candidate}&subject=${subject.id}`}>Ajouter une autre personne à la comparaison →</Link></div>
    <section className="panel"><h2>Identité et rattachements datés</h2>{profile?<><p>Identité recoupée : {profile.name} · <code>{profile.actor_external_id}</code>. Référentiel récupéré le {formatDate(profile.retrieved_at)}.</p>
      <a href={profile.source_url} target="_blank" rel="noopener noreferrer">Référentiel officiel ↗</a><details><summary>Repère et empreinte</summary><p>{profile.source_locator}</p><code>{profile.source_sha256}</code></details></>:<p>{profiles?'Aucune correspondance institutionnelle documentée pour cette personne.':'Le registre des correspondances est indisponible.'} Aucun vote personnel ou parti n’est attribué par ressemblance de nom.</p>}
      <p className="hint">Les rattachements AN de financement ne prouvent ni une adhésion ni un soutien pour 2027. Les dates sont celles du référentiel ; une fin non renseignée ne constitue pas une vérification actuelle.</p>
      {connections===null?<Empty>Les rattachements sont temporairement indisponibles.</Empty>:connections.length?<><h3>Liens dont la fin n’est pas dépassée au {formatDate(day)}</h3>
        {current.length?current.map((c)=><p key={c.id}><strong>{CONNECTION_LABELS[c.relation]} : {c.actor_name}</strong><br/>Du {formatDate(c.started_at)} au {c.ended_at?formatDate(c.ended_at):'terme non renseigné'} · <a href={c.source_url} target="_blank" rel="noopener noreferrer">Source ↗</a></p>):<p>Aucun lien couvrant cette date dans le référentiel importé.</p>}
        <details><summary>Historique complet · {connections.length} liens</summary>{connections.map((c)=><p key={c.id}>{CONNECTION_LABELS[c.relation]} · {c.actor_name} · {formatDate(c.started_at)} – {c.ended_at?formatDate(c.ended_at):'fin non renseignée'}<br/>{c.source_locator} · <a href={c.source_url} target="_blank" rel="noopener noreferrer">Source ↗</a></p>)}</details>
      </>:<p>Aucun rattachement documenté dans ce registre.</p>}
      <p>Aucun statut de candidature officielle, d’adhésion ou de soutien électoral 2027 n’est renseigné par cet import.</p>
    </section>
    <section className="panel"><h2>Derniers sondages où cette personne est testée</h2>{polls?polls.polls.map((poll)=><div key={poll.id} className="candidate-poll"><strong>{poll.institute} · Terrain du {pollDate(poll.fieldwork_start)} au {pollDate(poll.fieldwork_end)}</strong><p className="hint">Échantillon total : {poll.sample_size?.toLocaleString('fr-FR') ?? 'non renseigné'}.</p>
      {poll.scenarios.map((scenario)=><p key={`${scenario.round}/${scenario.scenario_number}`}>Tour {scenario.round} · {pollScore(scenario.results.find((r)=>r.candidate_external_id===candidate)!.score)} · Configuration : {scenario.results.map((r)=>r.candidate_name).join(' · ')}<br/>Libellé de parti Sondax : {scenario.results.find((r)=>r.candidate_external_id===candidate)?.party ?? 'non renseigné'} · <a href={poll.source_url} target="_blank" rel="noopener noreferrer">Source ↗</a></p>)}</div>):<Empty>Les mesures de sondage sont temporairement indisponibles.</Empty>}
      <p className="hint">Données : <a href="https://sondax.fr/" target="_blank" rel="noopener noreferrer">Sondax, d’après Wikipédia</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Les valeurs restent des mesures individuelles par configuration.</p><Link href="/presidentielle-2027/sondages">Explorer les configurations, périodes, instituts et traces d’import →</Link></section>
    <section className="panel"><h2>Explorer un sous-thème</h2><form method="get" className="candidate-form"><label>Sous-thème<select name="subject" defaultValue={subject.id}>{VOTE_SUBJECT_GROUPS.map((group)=><optgroup key={group.id} label={group.label}>{group.subjects.map((s)=><option key={s.id} value={s.id}>{s.label}</option>)}</optgroup>)}</select></label><button className="button">Voir les pièces →</button></form></section>
    <section><h2>{subject.label} : questions et propositions</h2><p>Un programme antérieur reste identifié par son élection. Aucun programme 2027 n’est déduit d’un ancien document.</p>{measures?<MeasureCards profiles={[identity]} {...measures}/>:<Empty>Les fiches de mesures sont temporairement indisponibles.</Empty>}</section>
    <section id="votes-personnels"><h2>Votes personnels · {subject.label}</h2><p>Repérage exploratoire par mots dans le titre officiel. Le dispositif et le périmètre exact sont à lire pour comprendre le sens du vote. Le corpus commence en 2017 et reste incomplet.</p>
      {votes?<><p>{votes.total} scrutin(s) avec un bulletin personnel documenté dans cette sélection.</p><CandidateVoteTable profiles={[identity]} votes={votes.votes}/><Pager page={page} pageCount={Math.max(1,Math.ceil(votes.total/15))} hrefFor={href}/></>:<Empty>Les bulletins personnels sont temporairement indisponibles.</Empty>}</section>
    <section className="panel"><h2>Explorer séparément les votes des partis</h2><p>Ces liens ouvrent l’ensemble du corpus du parti. Ils n’attribuent pas ses votes à {nominee.name} et ne limitent pas le corpus à la période de son rattachement.</p>
      <div className="subject-links">{[...new Map((connections??[]).filter((c)=>c.relation==='financial_attachment').map((c)=>[c.actor_id,c])).values()].map((c)=><Link key={c.actor_id} href={`/scrutins?institution=assemblee&subject=${subject.id}&party=${c.actor_id}#party-details`}>{c.actor_name} · {subject.label} ↗</Link>)}</div>
      {!connections?.some((c)=>c.relation==='financial_attachment')?<p>Aucun parti de rattachement documenté. <Link href={`/scrutins?institution=assemblee&subject=${subject.id}`}>Explorer les votes par parti sur ce sujet →</Link></p>:null}</section>
  </main>;
}

export async function generateMetadata({params,searchParams}:{params:Promise<{candidate:string}>;searchParams:Promise<SearchParamsRecord>}) {
  const {candidate} = await params;
  return documentMetadata(`/presidentielle-2027/candidats/${candidate}`,await searchParams);
}
