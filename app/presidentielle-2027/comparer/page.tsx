import { SeoPage } from '@/components/seo-page';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';
import { Empty,Pager } from '@/components/ui';
import { CandidateVoteTable,MeasureCards } from '@/components/candidates/evidence';
import { candidateProfiles,candidateVotes,policyMeasures } from '@/lib/candidates/data';
import { comparisonCandidates } from '@/lib/candidates/method';
import { comparisonHref, comparisonPeriod } from '@/lib/candidates/comparison';
import { ComparisonCoverage } from '@/components/candidates/comparison-coverage';
import { pollOptions } from '@/lib/polls/data';
import { first,pageParam,type SearchParamsRecord } from '@/lib/params';
import { VOTE_SUBJECT_GROUPS,findVoteSubject } from '@/lib/vote-subjects';
import { formatDate } from '@/lib/labels';

export const dynamic='force-dynamic';
export default async function ComparePage({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  const query=await searchParams;
  const subject=findVoteSubject(first(query.subject)) ?? findVoteSubject('retraites')!;
  const page=pageParam(query.page);
  const period=comparisonPeriod(query);
  const [profiles,options]=await Promise.all([candidateProfiles().catch(()=>null),pollOptions().catch(()=>null)]);
  if(!options) return <main><SeoPage path="/presidentielle-2027/comparer" /><Empty>La comparaison est temporairement indisponible.</Empty></main>;
  const raw=query.candidate;
  const slugs=comparisonCandidates(Array.isArray(raw)?raw:raw?[raw]:[],options.candidates.map((c)=>c.id));
  const identities=slugs.map((slug)=>profiles?.find((p)=>p.candidate_external_id===slug && p.provider==='sondax') ?? {slug,name:options.candidates.find((c)=>c.id===slug)!.name,actor_id:null});
  const [votes,measures]=await Promise.all([slugs.length && profiles && !period.error?candidateVotes(slugs,subject.keywords,page,period).catch(()=>null):Promise.resolve(null),policyMeasures(subject.id).catch(()=>null)]);
  const href=(target:number)=>`${comparisonHref(subject.id,slugs,period,target)}#votes`;
  return <main><SeoPage path="/presidentielle-2027/comparer" /><Link className="text-link" href="/presidentielle-2027/candidats">← Les personnes testées</Link><div className="page-intro"><div className="eyebrow">Présidentielle 2027</div><h1>Comparer les pièces</h1><p className="lead">Choisissez jusqu’à trois personnes pour consulter les mêmes scrutins et sous-thèmes.</p></div>
    <nav className="presidential-tabs" aria-label="Présidentielle 2027"><Link href="/presidentielle-2027/sondages">Sondages</Link><Link href="/presidentielle-2027/candidats">Personnes testées</Link><Link href="/presidentielle-2027/comparer" aria-current="page">Comparer les pièces</Link></nav>
    <p className="hint"><Link href="/preparer-mon-vote">Préparer mon vote : choisir mes sujets et garder mes questions →</Link></p>
    <form method="get" className="candidate-form panel"><label>Sous-thème<select name="subject" defaultValue={subject.id}>{VOTE_SUBJECT_GROUPS.map((g)=><optgroup label={g.label} key={g.id}>{g.subjects.map((s)=><option key={s.id} value={s.id}>{s.label}</option>)}</optgroup>)}</select></label>
      {[0,1,2].map((i)=><label key={i}>Personne {i+1}<select name="candidate" defaultValue={slugs[i]??''}><option value="">Choisir une personne</option>{options.candidates.map((c)=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label>)}
      <fieldset className="comparison-period"><legend>La même période pour toutes les personnes</legend><label>Du<input type="date" name="from" min="2017-01-01" defaultValue={first(query.from) ?? ''} /></label><label>Au, inclus<input type="date" name="to" min="2017-01-01" defaultValue={first(query.to) ?? ''} /></label><p className="hint">Sans date : tout le corpus disponible depuis 2017. Ce filtre porte sur les scrutins, pas sur les programmes.</p></fieldset>
      <button className="button">Comparer les pièces →</button></form>
    {period.error ? <p className="notice" role="alert">{period.error} Corrigez la période pour afficher les bulletins.</p> : null}
    <div className="profile-reading-key"><p>Les colonnes portent sur les mêmes questions et les mêmes scrutins. Un bulletin manquant n’est ni une abstention ni une absence. La sélection n’établit aucune candidature officielle. Aucun score, classement ou orientation idéologique n’est calculé.</p><p>Les mots du titre servent à retrouver des scrutins, pas à qualifier leur direction. Un vote sur un texte entier ne vaut pas vote sur chacune de ses dispositions.</p></div>
    {!slugs.length?<Empty>Choisissez deux ou trois personnes pour explorer leurs différences ; une seule permet aussi de consulter son corpus.</Empty>:<>
      <div className="candidate-comparison-grid">{identities.map((identity)=><article className="panel" key={identity.slug}><h2><Link href={`/presidentielle-2027/candidats/${identity.slug}?subject=${subject.id}`}>{identity.name}</Link></h2><p>{identity.actor_id?'Identité recoupée avec le référentiel AN.':'Correspondance institutionnelle non documentée ou indisponible ; aucun vote n’est inféré.'}</p><Link href={`/presidentielle-2027/candidats/${identity.slug}?subject=${subject.id}`}>Rattachements datés, sondages et sources →</Link></article>)}</div>
      {!period.error ? <ComparisonCoverage identities={identities} votes={votes?.votes ?? null} links={measures?.links ?? null} profilesAvailable={profiles !== null} /> : null}
      <section><h2>{subject.label} : mesures documentées</h2>{measures?<MeasureCards profiles={identities} {...measures}/>:<Empty>Les fiches de mesures sont temporairement indisponibles.</Empty>}</section>
      <section id="votes"><h2>Les mêmes scrutins, personne par personne</h2><p>Corpus nominatif vérifié de l’Assemblée, à partir de 2017. Scrutins où au moins une personne sélectionnée dispose d’un bulletin, triés par date décroissante. Les autres scrutins et institutions restent hors de ce tableau.</p>{!period.error && (period.from || period.to) ? <p className="hint">Période commune : {period.from ? formatDate(period.from) : 'depuis 2017'} → {period.to ? formatDate(period.to) : 'jusqu’au dernier scrutin disponible'}, dates incluses. <Link href={`${comparisonHref(subject.id,slugs,{})}#votes`} prefetch={false}>Retirer les dates</Link></p> : null}{period.error ? <Empty>La période est invalide : aucun bulletin n’est affiché.</Empty> : votes?<><p>{votes.total} scrutin(s) dans cette sélection.</p>{votes.total > 0 && !votes.votes.length ? <Empty>Cette page dépasse les résultats disponibles. <Link href={href(1)} prefetch={false}>Revenir à la première page</Link>.</Empty> : <CandidateVoteTable profiles={identities} votes={votes.votes}/>}<Pager page={page} pageCount={Math.max(1,Math.ceil(votes.total/15))} hrefFor={href}/></>:<Empty>Les bulletins de la comparaison sont indisponibles.</Empty>}</section>
      <details className="comparison-question"><summary>Une question commune à poser pour aller plus loin</summary><p>Adaptez ce brouillon, puis copiez-le dans votre carnet ou votre message. Le site ne l’enregistre pas et ne l’envoie à personne.</p><label>Ma question documentaire<textarea rows={7} defaultValue={`Sur le sujet « ${subject.label} », quel changement précis proposez-vous pour 2027 ?\nQuel document officiel présente cette proposition, avec sa date, sa page et ses conditions d’application ?\nSi vous avez participé à l’un des scrutins de cette comparaison, quelle justification publique permet d’en comprendre le dispositif et votre vote ?\nQuelles limites ou objections votre proposition devrait-elle prendre en compte ?\n\nMême question pour : ${identities.map((identity)=>identity.name).join(', ')}.`} /></label><p className="hint">Conservez la même question et la même exigence de source pour chaque personne. Une réponse reste à authentifier et à contextualiser avant publication.</p></details>
    </>}
  </main>;
}

export async function generateMetadata({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  return pageMetadata('/presidentielle-2027/comparer',SEO_PAGES['/presidentielle-2027/comparer'],await searchParams);
}
