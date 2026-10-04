import Link from 'next/link';
import { first, type SearchParamsRecord } from '@/lib/params';
import { CHAMBERS, getComposition, type CompositionMode } from '@/lib/parliament-composition';
import { formatDate } from '@/lib/labels';
import { Hemicycle } from './hemicycle';

export function ParliamentComposition({ mode, params }: { mode: CompositionMode; params: SearchParamsRecord }) {
  const institution = CHAMBERS.find(c => c.id === first(params.institution)) ?? CHAMBERS[0];
  const scope = institution.id === 'parlement_europeen' && first(params.scope) === 'france' ? 'france' : 'all';
  const path = mode === 'groups' ? '/groupes' : '/partis';
  const href = (chamber: string, target = path, targetScope = scope) => {
    const q = new URLSearchParams({ institution: chamber });
    if (chamber === 'parlement_europeen' && targetScope === 'france') q.set('scope', 'france');
    if (target === path && mode === 'parties') for (const key of ['q', 'page']) {
      const value = first(params[key]);
      if (value) q.set(key, value.slice(0, 80));
    }
    return `${target}?${q}#composition`;
  };
  const data = getComposition(institution.id, mode, scope);
  const humanSource = institution.id === 'assemblee'
    ? { url: 'https://data.assemblee-nationale.fr/acteurs/deputes-en-exercice', title: 'Référentiel officiel des députés' }
    : institution.id === 'senat'
      ? mode === 'parties' && data ? { url: data.sources[0].url, title: 'Annexe officielle des rattachements de financement' } : { url: 'https://www.senat.fr/senateurs/grp.html', title: 'Groupes politiques du Sénat' }
      : { url: 'https://www.europarl.europa.eu/meps/fr/full-list/all', title: 'Annuaire officiel des eurodéputés' };
  return <section className="parliament-composition" id="composition" aria-labelledby="composition-title" data-institution={institution.id}>
    <div className="composition-heading"><div><span className="eyebrow">Comprendre les rapports de force</span><h2 id="composition-title">{mode === 'groups' ? 'La répartition par groupe' : 'Les rattachements aux partis'}</h2></div>
      <Link href={href(institution.id, mode === 'groups' ? '/partis' : '/groupes')}>{mode === 'groups' ? 'Voir par parti →' : 'Voir par groupe →'}</Link>
    </div>
    <nav className="chamber-picker" aria-label="Assemblée de l’hémicycle">{CHAMBERS.map(c => <Link key={c.id} href={href(c.id)} aria-current={c.id === institution.id ? 'true' : undefined}>{c.name}</Link>)}</nav>
    {institution.id === 'parlement_europeen' && <nav className="composition-scope" aria-label="Périmètre européen"><Link href={href(institution.id, path, 'all')} aria-current={scope === 'all' ? 'true' : undefined}>Parlement entier</Link><Link href={href(institution.id, path, 'france')} aria-current={scope === 'france' ? 'true' : undefined}>Délégation française</Link></nav>}
    {data ? <>
      <div className="composition-context"><h3>{institution.name}{scope === 'france' ? ' · Délégation française' : ''}</h3><p>{data.period} · état au <time dateTime={data.asOf}>{formatDate(data.asOf)}</time> · {data.total.toLocaleString('fr-FR')} sièges · {data.listed.toLocaleString('fr-FR')} personnes décrites dans la source</p><p>{data.basis}</p></div>
      {data.notes.map(note => <p className="composition-note" key={note}>{note}</p>)}
      <Hemicycle key={`${institution.id}-${scope}`} buckets={data.buckets} total={data.total} label={`${institution.name} — ${mode === 'groups' ? 'groupes' : 'partis'}`} />
      <p className="hemicycle-order">Formations classées par effectif décroissant ; données manquantes à part, en gris. La disposition et les couleurs n’attribuent aucune orientation politique.</p>
      <div className="composition-sources"><a href={humanSource.url} target="_blank" rel="noopener noreferrer">{humanSource.title} ↗</a><span>Sources consultées le {formatDate(data.sources[0].retrievedAt.slice(0, 10))}.</span><details><summary>Sources des décomptes et traçabilité</summary>{data.sources.map(s => <div key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.publisher} · {s.locator} ↗</a><code>SHA-256 : {s.sha256}</code></div>)}</details></div>
    </> : <p className="empty">La composition sourcée est indisponible pour ce périmètre.</p>}
  </section>;
}
