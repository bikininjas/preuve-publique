import { SeoPage } from '@/components/seo-page';
import type { SearchParamsRecord } from '@/lib/params';
import { pageMetadata, SEO_PAGES } from '@/lib/seo';
import Link from 'next/link';
import { pollOptions } from '@/lib/polls/data';
import { candidateProfiles } from '@/lib/candidates/data';
import { Empty } from '@/components/ui';

export const dynamic='force-dynamic';
export default async function CandidatesPage() {
  const [options,profiles]=await Promise.all([pollOptions().catch(()=>null),candidateProfiles().catch(()=>null)]);
  return <main><SeoPage path="/presidentielle-2027/candidats" /><Link href="/presidentielle-2027/sondages" className="text-link">← Les sondages</Link>
    <div className="page-intro"><div className="eyebrow">Présidentielle 2027</div><h1>Personnes testées</h1>
      <p className="lead">Fiches des personnes citées dans les sondages : rattachements datés, votes personnels et sources.</p></div>
    <nav className="presidential-tabs" aria-label="Présidentielle 2027"><Link href="/presidentielle-2027/sondages">Sondages</Link><Link href="/presidentielle-2027/candidats" aria-current="page">Personnes testées</Link><Link href="/presidentielle-2027/comparer">Comparer les pièces</Link></nav>
    <div className="profile-reading-key"><p>Figurer dans un sondage n’établit ni une candidature officielle ni un programme pour 2027.</p>
      <Link className="button" href="/presidentielle-2027/comparer">Comparer sur un sous-thème →</Link></div>
    {profiles===null?<Empty>Le registre des correspondances est temporairement indisponible. Les fiches signaleront cette limite.</Empty>:null}
    {options?<div className="candidate-directory">{options.candidates.map((candidate)=>{
      const profile=profiles?.find((p)=>p.provider==='sondax' && p.candidate_external_id===candidate.id);
      return <article className="panel" key={candidate.id}><h2><Link href={`/presidentielle-2027/candidats/${candidate.id}`}>{candidate.name}</Link></h2>
        <p>{profile?'Identité recoupée avec le référentiel de l’Assemblée nationale.':profiles?'Correspondance institutionnelle non documentée dans ce registre.':'Vérification de la correspondance indisponible.'}</p>
        <Link className="text-link" href={`/presidentielle-2027/candidats/${candidate.id}`}>Positions, rattachements et sources →</Link></article>;
    })}</div>:<Empty>La liste des personnes testées est temporairement indisponible.</Empty>}
  </main>;
}

export async function generateMetadata({searchParams}:{searchParams:Promise<SearchParamsRecord>}) {
  return pageMetadata('/presidentielle-2027/candidats',SEO_PAGES['/presidentielle-2027/candidats'],await searchParams);
}
