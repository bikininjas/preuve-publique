import Link from 'next/link';
import { PartySubjectChart, PartyVoteChart } from '@/components/party-vote-chart';
import { GroupSubjectChart, GroupVoteChart } from '@/components/group-vote-chart';
import { Empty } from '@/components/ui';
import { getGroupVoteDashboard, getPartyVoteDashboard, getTopicCounts } from '@/lib/data';
import { first, type SearchParamsRecord } from '@/lib/params';
import { topicSlug } from '@/lib/labels';
import { categoryKeywords, VOTE_SUBJECT_GROUPS } from '@/lib/vote-subjects';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Votes par thème, parti et groupe' };

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<SearchParamsRecord> }) {
  const senate = first((await searchParams).institution) === 'senat';
  const allSubjects: Array<{ id: string; keywords: string[] }> = VOTE_SUBJECT_GROUPS.flatMap(
    (category) => category.subjects.map((subject) => ({ id: subject.id, keywords: [...subject.keywords] })),
  );
  const subjects = [
    ...VOTE_SUBJECT_GROUPS.map((category) => ({ id: category.id, keywords: categoryKeywords(category) })),
    ...allSubjects,
  ];
  const [topics, partyDashboards, groupDashboards] = await Promise.all([
    getTopicCounts().catch(() => null),
    senate ? Promise.resolve([] as Array<readonly [string, Awaited<ReturnType<typeof getPartyVoteDashboard>> | null]>) : Promise.all(subjects.map(async ({ id, keywords }) => {
      try { return [id, await getPartyVoteDashboard(keywords)] as const; }
      catch { return [id, null] as const; }
    })),
    senate ? Promise.all(subjects.map(async ({ id, keywords }) => {
      try { return [id, await getGroupVoteDashboard(keywords)] as const; }
      catch { return [id, null] as const; }
    })) : Promise.resolve([] as Array<readonly [string, Awaited<ReturnType<typeof getGroupVoteDashboard>> | null]>),
  ]);
  const items = topics ?? [];
  const unavailable = topics === null;
  const partyById = new Map(partyDashboards);
  const groupById = new Map(groupDashboards);
  const total = items.reduce((sum, item) => sum + item.pieces, 0);

  return (
    <main className="theme-explorer">
      <div className="page-intro reading-intro"><div className="eyebrow">Explorer par sujet</div>
      <h1>Voir les votes.<br /><em>{senate ? 'Groupe par groupe.' : 'Parti par parti.'}</em></h1>
      <p className="lead">{senate ?
        'Pour, contre, abstention : explorez les décomptes officiels du Sénat par groupe parlementaire. Passez du thème au scrutin exact, avec sa date et sa source.' :
        <>
        Les bulletins individuels de députés, regroupés en trois catégories et {allSubjects.length} sous-thèmes.
        Passez d’une vue d’ensemble au scrutin exact, avec sa date et sa source.</>}
      </p></div>

      <nav className="pills" aria-label="Choisir une institution pour les graphiques"><Link className={!senate ? 'active' : ''} href="/categories">Assemblée · partis</Link><Link className={senate ? 'active' : ''} href="/categories?institution=senat">Sénat · groupes</Link></nav>
      <nav className="theme-jumps" aria-label="Aller à une catégorie">{VOTE_SUBJECT_GROUPS.map((category, index) => <a href={`#theme-${category.id}`} key={category.id}><span>{String(index + 1).padStart(2, '0')}</span><strong>{category.label}</strong><small>{category.subjects.length} sous-thèmes <b aria-hidden="true">↓</b></small></a>)}</nav>
      <p className="hint chart-reading-note">Les sujets peuvent se recouper : leurs totaux ne s’additionnent pas. Chaque barre décrit les positions enregistrées, jamais une opinion sur tout le thème. {senate ? 'Un groupe parlementaire n’est pas un parti.' : 'Le rattachement à un parti repose sur une affiliation datée.'}</p>

      <div className="category-vote-overview">
        {VOTE_SUBJECT_GROUPS.map((category) => <section className="theme-section" id={`theme-${category.id}`} key={category.id}>
          {senate ? groupById.get(category.id) ? <GroupVoteChart title={category.label} dashboard={groupById.get(category.id)!} href={`/scrutins?institution=senat&category=${category.id}`} groupHref={(ref) => `/scrutins?institution=senat&category=${category.id}&group=${ref}#group-details`} previewLimit={8} /> : <Empty>Les votes par groupe pour « {category.label} » sont indisponibles.</Empty>
            : partyById.get(category.id) ? <PartyVoteChart title={category.label} dashboard={partyById.get(category.id)!} href={`/scrutins?category=${category.id}`} partyHref={(partyId) => `/scrutins?category=${category.id}&party=${partyId}#party-details`} previewLimit={8} /> : <Empty>Les votes par parti pour « {category.label} » sont indisponibles.</Empty>}
          <details className="subtheme-disclosure"><summary><span><strong>Aller plus loin : {category.subjects.length} sous-thèmes</strong><small>{category.subjects.map((subject) => subject.label).join(' · ')}</small></span><span className="disclosure-plus" aria-hidden="true">+</span></summary>
          <div className="party-subject-grid">{category.subjects.map((subject) => {
            const group = groupById.get(subject.id);
            const party = partyById.get(subject.id);
            return senate && group ? <GroupSubjectChart key={subject.id} title={subject.label} subjectId={subject.id} dashboard={group} />
              : !senate && party ? <PartySubjectChart key={subject.id} title={subject.label} subjectId={subject.id} dashboard={party} />
                : <div key={subject.id} className="party-subject-chart"><h3><Link href={`/scrutins?${senate ? 'institution=senat&' : ''}subject=${subject.id}`}>{subject.label} ↗</Link></h3><p>Graphique indisponible pour le moment.</p></div>;
          })}</div>
          </details>
        </section>)}
      </div>

      <div className="section-heading category-source-heading"><div><div className="eyebrow">Classement des institutions</div><h2>Rubriques publiées par les sources</h2></div></div>
      <p className="hint">Ces rubriques proviennent aujourd’hui des dossiers du Sénat. Elles sont distinctes de nos catégories de navigation. Les décomptes de groupe ne permettent pas d’identifier le parti de chaque sénateur.</p>

      {unavailable ? (
        <Empty>La base documentaire n’est pas accessible pour le moment.</Empty>
      ) : items.length ? (
        <>
          <p className="resultline">
            {items.length} rubrique{items.length > 1 ? 's' : ''} · {total.toLocaleString('fr-FR')} pièces publiées
          </p>
          <div className="topic-grid">
            {items.map((item, index) => (
              <Link className="topic-tile" href={`/categories/${topicSlug(item.topic)}`} key={item.topic}>
                <span>{String(index + 1).padStart(2, '0')} / RUBRIQUE SOURCE</span>
                <strong>{item.topic}</strong>
                <small>{item.pieces.toLocaleString('fr-FR')} pièce{item.pieces > 1 ? 's' : ''} publiée{item.pieces > 1 ? 's' : ''}<b>↗</b></small>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Empty>
          Aucune rubrique publiée pour l’instant : les rubriques viennent des sources et n’apparaissent ici qu’avec la
          première pièce publiée qui les porte.
        </Empty>
      )}
    </main>
  );
}
