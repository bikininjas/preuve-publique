import Link from 'next/link';
import { pollOptions } from '@/lib/polls/data';
import { candidateProfiles } from '@/lib/candidates/data';
import { Empty } from '@/components/ui';

export const dynamic='force-dynamic';
export const metadata={title:'Personnes testées : des sondages aux pièces'};
export default async function CandidatesPage() {
  const [options,profiles]=await Promise.all([pollOptions().catch(()=>null),candidateProfiles().catch(()=>null)]);
  return <main><Link href="/presidentielle-2027/sondages" className="text-link">← Les sondages</Link>
    <div className="page-intro"><div className="eyebrow">Présidentielle 2027 · Des sondages aux pièces</div><h1>Comprendre les positions</h1>
      <p className="lead">Retrouver les rattachements datés, les votes personnels et les pièces sur les mêmes questions.</p></div>
    <div className="profile-reading-key"><p>Ces personnes figurent dans des hypothèses de sondage. Cela n’établit ni une candidature officielle ni un programme pour 2027. Les sondages mesurent une intention de vote ; les pièces documentent les propositions et les décisions.</p>
      <Link className="button" href="/presidentielle-2027/comparer">Comparer sur un sous-thème →</Link></div>
    {profiles===null?<Empty>Le registre des correspondances est temporairement indisponible. Les fiches signaleront cette limite.</Empty>:null}
    {options?<div className="candidate-directory">{options.candidates.map((candidate)=>{
      const profile=profiles?.find((p)=>p.provider==='sondax' && p.candidate_external_id===candidate.id);
      return <article className="panel" key={candidate.id}><span className="eyebrow">Personne testée dans les sondages</span><h2><Link href={`/presidentielle-2027/candidats/${candidate.id}`}>{candidate.name}</Link></h2>
        <p>{profile?'Identité recoupée avec le référentiel de l’Assemblée nationale.':profiles?'Correspondance institutionnelle non documentée dans ce registre.':'Vérification de la correspondance indisponible.'}</p>
        <Link className="text-link" href={`/presidentielle-2027/candidats/${candidate.id}`}>Positions, rattachements et sources →</Link></article>;
    })}</div>:<Empty>La liste des personnes testées est temporairement indisponible.</Empty>}
  </main>;
}
