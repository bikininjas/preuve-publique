import Link from 'next/link';
import { EvidenceCard } from '@/components/evidence-card';
import { PartyVoteChart } from '@/components/party-vote-chart';
import { Empty, Pager } from '@/components/ui';
import { getEvidencePage, getPartyVoteDashboard, getPartyVoteDetails } from '@/lib/data';
import { enumParam, first, isUuid, pageParam, type SearchParamsRecord } from '@/lib/params';
import { INSTITUTIONS, type Institution } from '@/lib/types';
import { formatDate, institutionLabel } from '@/lib/labels';
import { readerTitle } from '@/lib/reader';
import { categoryKeywords, findVoteCategory, findVoteSubject, voteCategoryFilter, voteSubjectFilter, VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Scrutins officiels' };
const PAGE_SIZE = 18;

export default async function ScrutinsPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const params = await searchParams;
  const institution = enumParam<Institution>(params.institution, INSTITUTIONS);
  const terms = (first(params.q) ?? '').trim().slice(0, 120);
  const subject = findVoteSubject(first(params.subject));
  const category = subject ? null : findVoteCategory(first(params.category));
  const page = pageParam(params.page);
  const partyId = isUuid(first(params.party)) ? first(params.party)! : null;
  const partyPage = pageParam(params.party_page);
  const keywords = subject ? [...subject.keywords] : category ? categoryKeywords(category) : [];
  let result: Awaited<ReturnType<typeof getEvidencePage>> | null = null;
  let dashboard: Awaited<ReturnType<typeof getPartyVoteDashboard>> | null = null;
  let partyDetails: Awaited<ReturnType<typeof getPartyVoteDetails>> | null = null;
  try { result = await getEvidencePage({ kind: 'vote', institution, terms: terms || undefined, titleFilter: subject ? voteSubjectFilter(subject) : category ? voteCategoryFilter(category) : undefined, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }); } catch { /* explicit empty state below */ }
  if ((subject || category) && (!institution || institution === 'assemblee')) {
    try { dashboard = await getPartyVoteDashboard(keywords); } catch { /* explicit state below */ }
  }
  if (partyId && (!institution || institution === 'assemblee')) {
    try { partyDetails = await getPartyVoteDetails(partyId, keywords, partyPage); } catch { /* explicit state below */ }
  }
  const hrefFor = (target: number, selectedSubject: string | null = subject?.id ?? null, selectedInstitution: Institution | null = institution ?? null, selectedCategory: string | null = category?.id ?? null, selectedParty: string | null = partyId) => {
    const query = new URLSearchParams();
    if (selectedInstitution) query.set('institution', selectedInstitution);
    if (selectedSubject) query.set('subject', selectedSubject);
    else if (selectedCategory) query.set('category', selectedCategory);
    if (selectedParty) query.set('party', selectedParty);
    if (terms) query.set('q', terms);
    if (target > 1) query.set('page', String(target));
    return `/scrutins${query.size ? `?${query}` : ''}`;
  };
  const partyPageHref = (target: number) => {
    const base = hrefFor(1);
    return `${base}${base.includes('?') ? '&' : '?'}party_page=${target}#party-details`;
  };
  return <main>
    <div className="page-intro compact"><div className="eyebrow">La base des votes</div><h1>Partir du sujet.<br /><em>Retrouver le vote.</em></h1><p className="lead">Choisissez un sujet, puis une institution. Les titres courts indiquent le texte concerné ; un repère précise si le vote porte sur le texte entier, un article, un amendement ou une motion. L’intitulé exact reste sur chaque fiche.</p></div>

    <section className="subject-directory" aria-labelledby="subjects-heading">
      <div className="subject-directory-head"><div><div className="eyebrow">01 / Choisir un sujet</div><h2 id="subjects-heading">Quel sujet cherchez-vous ?</h2></div><Link className={!subject && !category ? 'subject-reset active' : 'subject-reset'} href={hrefFor(1, null, institution, null)}>Tous les sujets ↗</Link></div>
      <div className="subject-directory-grid">{VOTE_SUBJECT_GROUPS.map((group) => <div className="subject-group" key={group.id}><h3><Link className="subject-category-link" href={hrefFor(1, null, institution, group.id)}>{group.label} ↗</Link></h3><div className="subject-links">{group.subjects.map((entry) => <Link className={subject?.id === entry.id ? 'active' : ''} href={hrefFor(1, entry.id, institution, null)} key={entry.id}>{entry.label}<span aria-hidden>↗</span></Link>)}</div></div>)}</div>
      <div className="mobile-subject-directory">{VOTE_SUBJECT_GROUPS.map((group) => <details key={group.id} open={category?.id === group.id || group.subjects.some((entry) => entry.id === subject?.id)}><summary>{group.label}<span>{group.subjects.length} sujets</span></summary><Link className="subject-category-link" href={hrefFor(1, null, institution, group.id)}>Vue d’ensemble de la catégorie ↗</Link><div className="subject-links">{group.subjects.map((entry) => <Link className={subject?.id === entry.id ? 'active' : ''} href={hrefFor(1, entry.id, institution, null)} key={entry.id}>{entry.label}<span aria-hidden>↗</span></Link>)}</div></details>)}</div>
      <p className="hint">Ces repères cherchent des mots dans l’intitulé officiel : ils ne couvrent pas tous les scrutins et ne disent rien du sens du vote. <Link href="/categories">Voir aussi les rubriques fournies par les sources →</Link></p>
    </section>

    <div className="filter-heading"><div className="eyebrow">02 / Affiner</div><h2>Institution et mots clés</h2></div>
    <nav className="pills" aria-label="Filtrer par institution"><Link className={!institution ? 'active' : ''} href={hrefFor(1, subject?.id ?? null, null)}>Toutes les institutions</Link>{INSTITUTIONS.filter((value) => value !== 'legifrance').map((value) => <Link className={institution === value ? 'active' : ''} href={hrefFor(1, subject?.id ?? null, value)} key={value}>{institutionLabel(value)}</Link>)}</nav>
    <form className="searchbar" method="get" action="/scrutins"><input type="hidden" name="institution" value={institution ?? ''} /><input type="hidden" name="subject" value={subject?.id ?? ''} /><input type="hidden" name="category" value={category?.id ?? ''} /><label className="sr-only" htmlFor="vote-search">Rechercher un scrutin</label><input id="vote-search" type="search" name="q" defaultValue={terms} placeholder="Texte, mesure ou numéro de scrutin…" /><button className="button" type="submit">Rechercher ↗</button></form>
    {dashboard ? <PartyVoteChart title={subject?.label ?? category?.label ?? ''} dashboard={dashboard} partyHref={(id) => `${hrefFor(1, subject?.id ?? null, institution ?? null, category?.id ?? null, id)}#party-details`} /> : subject || category ? <Empty>{institution && institution !== 'assemblee' ? 'Les bulletins nominatifs rattachés aux partis ne sont pas encore disponibles pour cette institution.' : 'Le graphique des votes par parti est indisponible pour le moment.'}</Empty> : null}
    {dashboard && terms ? <p className="hint">Le graphique couvre tout le sujet sélectionné ; la recherche « {terms} » affine seulement la liste ci-dessous.</p> : null}
    {partyId && (!institution || institution === 'assemblee') ? <section className="party-details" id="party-details"><div className="section-heading"><div><div className="eyebrow">Derrière les barres</div><h2>Scrutin par scrutin{partyDetails?.[0] ? ` · ${partyDetails[0].party_name}` : ''}</h2></div><Link className="text-link" href={hrefFor(1, subject?.id ?? null, institution ?? null, category?.id ?? null, null)}>Retirer le filtre parti →</Link></div><p className="hint">Pour, contre, abstention et non-vote sont les bulletins individuels officiellement enregistrés et attribuables à ce parti. La recherche libre ne modifie pas cette liste.</p>{partyDetails?.length ? <><div className="vote-list">{partyDetails.map((vote) => <article className="vote-row" key={vote.vote_id}><div><span className="count">Assemblée nationale · {formatDate(vote.occurred_at)}</span><h3><Link href={`/pieces/${vote.vote_id}`}>{readerTitle({ kind: 'vote', title: vote.title })}</Link></h3><a href={vote.source_url} target="_blank" rel="noopener noreferrer">Scrutin officiel ↗</a></div><div className="position-cell"><span>Bulletins rattachés au parti</span><strong>{vote.pour} pour · {vote.contre} contre</strong><small>{vote.abstention} abstentions · {vote.non_votant} non-votants</small></div></article>)}</div><Pager page={partyPage} pageCount={Math.max(1, Math.ceil(partyDetails[0].total_count / 15))} hrefFor={partyPageHref} /></> : <Empty>{partyDetails ? 'Aucun scrutin attribuable à ce parti dans ce périmètre.' : 'Le détail des votes de ce parti est indisponible.'}</Empty>}</section> : null}
    {result ? <><div className="list-heading"><h2>{subject?.label ?? category?.label ?? (terms ? `Résultats pour « ${terms} »` : 'Tous les scrutins')}</h2><span>{result.total.toLocaleString('fr-FR')} fiche{result.total > 1 ? 's' : ''}</span></div>{(subject || category) && terms ? <p className="resultline">Avec les mots « {terms} »</p> : null}{result.items.length ? <div className="cards">{result.items.map((item) => <EvidenceCard item={item} key={item.id} />)}</div> : <Empty>Aucun scrutin publié ne correspond à ces filtres. Essayez un autre sujet ou retirez un filtre.</Empty>}<Pager page={page} pageCount={Math.max(1, Math.ceil(result.total / PAGE_SIZE))} hrefFor={hrefFor} /></> : <Empty>La base des scrutins est indisponible pour le moment.</Empty>}
    <p className="section-foot">Les positions de groupe ne sont affichées que lorsqu’elles figurent dans la source. <Link href="/methode">Comprendre la méthode →</Link></p>
  </main>;
}
