import Link from 'next/link';
import { EvidenceCard } from '@/components/evidence-card';
import { Empty, Pager } from '@/components/ui';
import { getEvidencePage } from '@/lib/data';
import { enumParam, first, pageParam, type SearchParamsRecord } from '@/lib/params';
import { INSTITUTIONS, type Institution } from '@/lib/types';
import { institutionLabel } from '@/lib/labels';
import { findVoteSubject, voteSubjectFilter, VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Scrutins officiels' };
const PAGE_SIZE = 18;

export default async function ScrutinsPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const institution = enumParam<Institution>(params.institution, INSTITUTIONS);
  const terms = (first(params.q) ?? '').trim().slice(0, 120);
  const subject = findVoteSubject(first(params.subject));
  const page = pageParam(params.page);
  let result: Awaited<ReturnType<typeof getEvidencePage>> | null = null;
  try { result = await getEvidencePage({ kind: 'vote', institution, terms: terms || undefined, titleFilter: subject ? voteSubjectFilter(subject) : undefined, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }); } catch { /* explicit empty state below */ }
  const hrefFor = (target: number, selectedSubject: string | null = subject?.id ?? null, selectedInstitution: Institution | null = institution ?? null) => {
    const query = new URLSearchParams();
    if (selectedInstitution) query.set('institution', selectedInstitution);
    if (selectedSubject) query.set('subject', selectedSubject);
    if (terms) query.set('q', terms);
    if (target > 1) query.set('page', String(target));
    return `/scrutins${query.size ? `?${query}` : ''}`;
  };
  return <main>
    <div className="page-intro compact"><div className="eyebrow">La base des votes</div><h1>Partir du sujet.<br /><em>Retrouver le vote.</em></h1><p className="lead">Choisissez un sujet, puis une institution. Les titres courts indiquent le texte concerné ; un repère précise si le vote porte sur le texte entier, un article, un amendement ou une motion. L’intitulé exact reste sur chaque fiche.</p></div>

    <section className="subject-directory" aria-labelledby="subjects-heading">
      <div className="subject-directory-head"><div><div className="eyebrow">01 / Choisir un sujet</div><h2 id="subjects-heading">Quel sujet cherchez-vous ?</h2></div><Link className={!subject ? 'subject-reset active' : 'subject-reset'} href={hrefFor(1, null)}>Tous les sujets ↗</Link></div>
      <div className="subject-directory-grid">{VOTE_SUBJECT_GROUPS.map((group) => <div className="subject-group" key={group.label}><h3>{group.label}</h3><div className="subject-links">{group.subjects.map((entry) => <Link className={subject?.id === entry.id ? 'active' : ''} href={hrefFor(1, entry.id)} key={entry.id}>{entry.label}<span aria-hidden>↗</span></Link>)}</div></div>)}</div>
      <div className="mobile-subject-directory">{VOTE_SUBJECT_GROUPS.map((group) => <details key={group.label} open={group.subjects.some((entry) => entry.id === subject?.id)}><summary>{group.label}<span>{group.subjects.length} sujets</span></summary><div className="subject-links">{group.subjects.map((entry) => <Link className={subject?.id === entry.id ? 'active' : ''} href={hrefFor(1, entry.id)} key={entry.id}>{entry.label}<span aria-hidden>↗</span></Link>)}</div></details>)}</div>
      <p className="hint">Ces repères cherchent des mots dans l’intitulé officiel : ils ne couvrent pas tous les scrutins et ne disent rien du sens du vote. <Link href="/categories">Voir aussi les rubriques fournies par les sources →</Link></p>
    </section>

    <div className="filter-heading"><div className="eyebrow">02 / Affiner</div><h2>Institution et mots clés</h2></div>
    <nav className="pills" aria-label="Filtrer par institution"><Link className={!institution ? 'active' : ''} href={hrefFor(1, subject?.id ?? null, null)}>Toutes les institutions</Link>{INSTITUTIONS.filter((value) => value !== 'legifrance').map((value) => <Link className={institution === value ? 'active' : ''} href={hrefFor(1, subject?.id ?? null, value)} key={value}>{institutionLabel(value)}</Link>)}</nav>
    <form className="searchbar" method="get" action="/scrutins"><input type="hidden" name="institution" value={institution ?? ''} /><input type="hidden" name="subject" value={subject?.id ?? ''} /><label className="sr-only" htmlFor="vote-search">Rechercher un scrutin</label><input id="vote-search" type="search" name="q" defaultValue={terms} placeholder="Texte, mesure ou numéro de scrutin…" /><button className="button" type="submit">Rechercher ↗</button></form>
    {result ? <><div className="list-heading"><h2>{subject ? subject.label : terms ? `Résultats pour « ${terms} »` : 'Tous les scrutins'}</h2><span>{result.total.toLocaleString('fr-FR')} fiche{result.total > 1 ? 's' : ''}</span></div>{subject && terms ? <p className="resultline">Avec les mots « {terms} »</p> : null}{result.items.length ? <div className="cards">{result.items.map((item) => <EvidenceCard item={item} key={item.id} />)}</div> : <Empty>Aucun scrutin publié ne correspond à ces filtres. Essayez un autre sujet ou retirez un filtre.</Empty>}<Pager page={page} pageCount={Math.max(1, Math.ceil(result.total / PAGE_SIZE))} hrefFor={hrefFor} /></> : <Empty>La base des scrutins est indisponible pour le moment.</Empty>}
    <p className="section-foot">Les positions de groupe ne sont affichées que lorsqu’elles figurent dans la source. <Link href="/methode">Comprendre la méthode →</Link></p>
  </main>;
}
