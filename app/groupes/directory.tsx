'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { GroupDirectoryEntry } from '@/lib/data';

const normalized = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr-FR');

export function GroupDirectory({ groups }: { groups: GroupDirectoryEntry[] }) {
  const [query, setQuery] = useState('');
  const [period, setPeriod] = useState<'all' | 'recent' | 'archive'>('all');
  const visible = useMemo(() => {
    const term = normalized(query.trim());
    return groups.filter((group) => {
      if (period === 'recent' && group.last_vote < '2024-07-01') return false;
      if (period === 'archive' && group.last_vote >= '2024-07-01') return false;
      const officialLabels = [group.display_name, ...group.official_names].join(' ');
      const acronyms = `${officialLabels.includes('Nouvelle Union Populaire écologique et sociale') ? ' NUPES' : ''}${officialLabels.includes('Nouveau Front Populaire') ? ' NFP' : ''}`;
      return !term || normalized(officialLabels + acronyms).includes(term);
    });
  }, [groups, period, query]);

  return <section id="annuaire" className="group-directory">
    <div className="group-directory-heading"><div><span className="eyebrow">02 / Annuaire</span><h2>Retrouvez leur trace.</h2><p>Positions majoritaires de groupe sur les scrutins publiés, du plus récent au plus ancien.</p></div><span className="group-directory-total">{groups.length.toLocaleString('fr-FR')} regroupements</span></div>
    <div className="group-directory-tools">
      <label className="group-search"><span>Rechercher un groupe ou un ancien nom</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex. Socialistes, MoDem, NUPES…" /></label>
      <div className="group-periods" role="group" aria-label="Période de publication des votes">
        <button type="button" aria-pressed={period === 'all'} onClick={() => setPeriod('all')}>Tous</button>
        <button type="button" aria-pressed={period === 'recent'} onClick={() => setPeriod('recent')}>Depuis 2024</button>
        <button type="button" aria-pressed={period === 'archive'} onClick={() => setPeriod('archive')}>Archives</button>
      </div>
    </div>
    <div className="group-directory-legend"><span>{visible.length} résultat{visible.length > 1 ? 's' : ''} · dernier scrutin en premier</span><span><i className="group-legend-for" /> Majorité pour <i className="group-legend-against" /> contre <i className="group-legend-abstain" /> abstention</span></div>
    {visible.length ? <div className="group-directory-grid">{visible.map((group, index) => {
      const positions = group.pour + group.contre + group.abstention;
      const aliases = group.official_names.length > 1;
      return <Link href={`/groupes/${group.actor_id}`} className="group-directory-card" key={group.actor_id}>
        <div className="group-card-top"><span>{String(index + 1).padStart(2, '0')} / {group.last_vote.slice(0, 4)}</span><span>{group.identity_count} identifiant{group.identity_count > 1 ? 's' : ''} officiel{group.identity_count > 1 ? 's' : ''}</span></div>
        <div className="group-card-core"><div><h3>{group.display_name}</h3><p>{group.display_name === 'Non inscrit' ? 'Catégorie administrative des députés sans groupe, avec un identifiant par législature' : aliases ? group.official_names.join(' · ') : group.identity_count > 1 ? 'Même intitulé officiel à plusieurs périodes' : 'Intitulé officiel unique dans les votes publiés'}</p></div><strong>{group.vote_count.toLocaleString('fr-FR')}<small>scrutins</small></strong></div>
        <div className="group-card-chart"><div className="group-card-chart-track" role="img" aria-label={`Sur ${positions} positions majoritaires : ${group.pour} pour, ${group.contre} contre, ${group.abstention} abstentions`}>
          {positions > 0 ? <><span className="group-chart-for" style={{ width: `${group.pour / positions * 100}%` }} /><span className="group-chart-against" style={{ width: `${group.contre / positions * 100}%` }} /><span className="group-chart-abstain" style={{ width: `${group.abstention / positions * 100}%` }} /></> : null}
        </div><div className="group-card-chart-labels"><span>Pour {group.pour}</span><span>Contre {group.contre}</span><span>Abst. {group.abstention}</span></div></div>
        <div className="group-card-bottom"><span>Votes publiés {group.first_vote.slice(0, 4)}–{group.last_vote.slice(0, 4)}</span><strong>Voir la fiche <span aria-hidden="true">↗</span></strong></div>
      </Link>;
    })}</div> : <div className="group-directory-empty">Aucun groupe ne correspond à cette recherche. Essayez un autre nom ou une autre période.</div>}
    <p className="group-directory-caveat">Les barres représentent uniquement les positions majoritaires publiées de ces organes sur les scrutins de la base. Elles ne mesurent ni la présence ni l’adhésion d’un parti.</p>
  </section>;
}
