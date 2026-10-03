import { SeoPage } from '@/components/seo-page';
import { publicPollOptions as pollOptions, documentMetadata } from '@/lib/seo-content';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Empty,Pager } from '@/components/ui';
import { CandidateVoteTable,MeasureCards } from '@/components/candidates/evidence';
import { CandidatePollCards } from '@/components/candidates/poll-cards';
import { listPolls } from '@/lib/polls/data';
import { candidateProfiles,candidateConnections,candidateVotes,policyMeasures } from '@/lib/candidates/data';
import { CONNECTION_LABELS,connectionActive } from '@/lib/candidates/method';
import { VOTE_SUBJECT_GROUPS,findVoteSubject } from '@/lib/vote-subjects';
import { first,pageParam,type SearchParamsRecord } from '@/lib/params';
import { formatDate } from '@/lib/labels';
import { candidateInitials } from '@/lib/polls/presentation';

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
    <header className="presidential-hero candidate-hero"><div className="candidate-hero-identity"><div className="candidate-monogram" aria-hidden="true">{candidateInitials(nominee.name)}</div><div><div className="eyebrow">Personne testée · Présidentielle 2027</div><h1>{nominee.name}</h1><span className="candidate-identity-status">{profile?'Identité institutionnelle recoupée':profiles?'Identité institutionnelle non recoupée':'Registre des identités indisponible'}</span></div></div>
      <Link className="button" href={`/presidentielle-2027/comparer?candidate=${candidate}&subject=${subject.id}`}>Comparer les pièces ↗</Link>
    </header>
    <div className="candidate-stats"><div><strong>{polls?.total.toLocaleString('fr-FR') ?? '—'}</strong><span>Sondages où cette personne est testée</span></div><div><strong>{profiles===null?'—':votes?.total.toLocaleString('fr-FR') ?? '—'}</strong><span>Scrutins personnels · {subject.label}</span></div><div><strong>{profiles===null?'—':connections?.length.toLocaleString('fr-FR') ?? '—'}</strong><span>Rattachements datés dans le registre, historique compris</span></div></div>
    <nav className="presidential-tabs" aria-label="Sections de la fiche"><a href="#sondages-candidat">Sondages</a><a href="#positions-candidat">Questions & propositions</a><a href="#votes-personnels">Votes personnels</a><a href="#identite-candidat">Identité & sources</a></nav>
    <p className="candidate-caveat">Une présence dans un sondage ne confirme pas une candidature. Un rattachement financier, une adhésion et un soutien électoral sont des faits distincts. Les votes d’un parti ne remplacent pas ceux d’une personne.</p>
    <div className="candidate-workspace"><aside className="candidate-rail">
    <section id="identite-candidat" className="panel candidate-identity-panel"><span className="eyebrow">Le référentiel</span><h2>Identité &<br />rattachements</h2>{profile?<><p>Identité recoupée : {profile.name} · <code>{profile.actor_external_id}</code>. Référentiel récupéré le {formatDate(profile.retrieved_at)}.</p>
      <a href={profile.source_url} target="_blank" rel="noopener noreferrer">Référentiel officiel ↗</a><details><summary>Repère et empreinte</summary><p>{profile.source_locator}</p><code>{profile.source_sha256}</code></details></>:<p>{profiles?'Aucune correspondance institutionnelle documentée pour cette personne.':'Le registre des correspondances est indisponible.'} Aucun vote personnel ou parti n’est attribué par ressemblance de nom.</p>}
      <p className="hint">Les rattachements AN de financement ne prouvent ni une adhésion ni un soutien pour 2027. Les dates sont celles du référentiel ; une fin non renseignée ne constitue pas une vérification actuelle.</p>
      {connections===null?<Empty>Les rattachements sont temporairement indisponibles.</Empty>:connections.length?<><h3>Liens dont la fin n’est pas dépassée au {formatDate(day)}</h3>
        {current.length?current.map((c)=><div className="candidate-connection" key={c.id}><span>{CONNECTION_LABELS[c.relation]}</span><strong>{c.actor_name}</strong><p>Du {formatDate(c.started_at)} au {c.ended_at?formatDate(c.ended_at):'terme non renseigné'} · <a href={c.source_url} target="_blank" rel="noopener noreferrer">Source ↗</a></p></div>):<p>Aucun lien couvrant cette date dans le référentiel importé.</p>}
        <details><summary>Historique complet · {connections.length} liens</summary>{connections.map((c)=><p key={c.id}>{CONNECTION_LABELS[c.relation]} · {c.actor_name} · {formatDate(c.started_at)} – {c.ended_at?formatDate(c.ended_at):'fin non renseignée'}<br/>{c.source_locator} · <a href={c.source_url} target="_blank" rel="noopener noreferrer">Source ↗</a></p>)}</details>
      </>:<p>Aucun rattachement documenté dans ce registre.</p>}
      <p>Aucun statut de candidature officielle, d’adhésion ou de soutien électoral 2027 n’est renseigné par cet import.</p>
    </section>
    <section className="panel candidate-party-panel"><span className="eyebrow">Un autre périmètre</span><h2>Les votes des partis</h2><p>Ces liens ouvrent l’ensemble du corpus du parti. Ils n’attribuent pas ses votes à {nominee.name} et ne limitent pas le corpus à la période de son rattachement.</p>
      <div className="subject-links">{[...new Map((connections??[]).filter((c)=>c.relation==='financial_attachment').map((c)=>[c.actor_id,c])).values()].map((c)=><Link key={c.actor_id} href={`/scrutins?institution=assemblee&subject=${subject.id}&party=${c.actor_id}#party-details`}>{c.actor_name} · {subject.label} ↗</Link>)}</div>
      {!connections?.some((c)=>c.relation==='financial_attachment')?<p>Aucun parti de rattachement documenté. <Link href={`/scrutins?institution=assemblee&subject=${subject.id}`}>Explorer les votes par parti sur ce sujet →</Link></p>:null}</section>
    </aside><div className="candidate-content">
    <section id="sondages-candidat"><div className="presidential-section-head"><div><span className="eyebrow">Mesures individuelles · Par hypothèse</span><h2>Dans les derniers sondages</h2></div><Link className="text-link" href="/presidentielle-2027/sondages">Tous les sondages ↗</Link></div><p className="hint">Les trois terrains les plus récents du corpus pour cette personne. Chaque pourcentage appartient à une configuration distincte : dépliez-la pour lire la liste testée.</p>
      {polls?<CandidatePollCards polls={polls.polls} candidate={candidate}/>:<Empty>Les mesures de sondage sont temporairement indisponibles.</Empty>}
      <p className="hint">Données : <a href="https://sondax.fr/" target="_blank" rel="noopener noreferrer">Sondax, d’après Wikipédia</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Les valeurs restent des mesures individuelles par configuration.</p></section>
    <section id="positions-candidat" className="candidate-subject-panel"><span className="eyebrow">Des questions aux pièces</span><h2>Quelles positions sur…</h2><form method="get" action="#positions-candidat" className="candidate-form"><label>Sous-thème<select name="subject" defaultValue={subject.id}>{VOTE_SUBJECT_GROUPS.map((group)=><optgroup key={group.id} label={group.label}>{group.subjects.map((s)=><option key={s.id} value={s.id}>{s.label}</option>)}</optgroup>)}</select></label><button className="button">Voir les pièces →</button></form></section>
    <section className="candidate-evidence-section"><div className="presidential-section-head"><div><span className="eyebrow">{subject.label}</span><h2>Questions & propositions</h2></div></div><p>Un programme antérieur reste identifié par son élection. Aucun programme 2027 n’est déduit d’un ancien document.</p>{measures?<MeasureCards profiles={[identity]} {...measures}/>:<Empty>Les fiches de mesures sont temporairement indisponibles.</Empty>}</section>
    <section id="votes-personnels" className="candidate-evidence-section"><div className="presidential-section-head"><div><span className="eyebrow">Bulletins nominatifs · {subject.label}</span><h2>Les votes personnels</h2></div>{votes?<span className="presidential-count">{votes.total} scrutin(s)</span>:null}</div><p>Repérage exploratoire par mots dans le titre officiel. Le dispositif et le périmètre exact sont à lire pour comprendre le sens du vote. Le corpus commence en 2017 et reste incomplet.</p>
      {votes?<><CandidateVoteTable profiles={[identity]} votes={votes.votes}/><Pager page={page} pageCount={Math.max(1,Math.ceil(votes.total/15))} hrefFor={href}/></>:<Empty>Les bulletins personnels sont temporairement indisponibles.</Empty>}</section>
    </div></div>
  </main>;
}

export async function generateMetadata({params,searchParams}:{params:Promise<{candidate:string}>;searchParams:Promise<SearchParamsRecord>}) {
  const {candidate} = await params;
  return documentMetadata(`/presidentielle-2027/candidats/${candidate}`,await searchParams);
}
