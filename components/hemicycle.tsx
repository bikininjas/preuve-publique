'use client';

import { useId, useState } from 'react';
import { filterSeatBuckets, hemicyclePoints, seatColours, type SeatBucket } from '@/lib/hemicycle';

export function Hemicycle({ buckets, total, label }: { buckets: SeatBucket[]; total: number; label: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const id = useId();
  const active = buckets.find(b => b.id === selected);
  const points = hemicyclePoints(buckets);
  const colours = seatColours(buckets);
  const legend = (items: SeatBucket[]) => items.map(b => <li key={b.id}>
    <button type="button" aria-pressed={selected === b.id} onClick={() => setSelected(selected === b.id ? null : b.id)}>
      <span className={`seat-swatch${b.status === 'unknown' ? ' unknown' : ''}`} style={{ background: colours.get(b.id) }} aria-hidden="true" />
      <span>{b.name}</span><strong>{b.seats.toLocaleString('fr-FR')}</strong>
      <small>{(b.seats / total * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} %</small>
    </button>
  </li>);
  const filtered = filterSeatBuckets(buckets, query);
  const fold = !query.trim() && buckets.length > 12;
  const visible = fold ? [...buckets.filter(b => b.status === 'known').slice(0, 8), ...buckets.filter(b => b.status !== 'known')] : filtered;
  const remaining = fold ? buckets.filter(b => b.status === 'known').slice(8) : [];
  return <div className="hemicycle-reading">
    <div className="hemicycle-visual">
      <svg viewBox="0 0 640 350" role="img" aria-labelledby={`${id}-title ${id}-description`}>
        <title id={`${id}-title`}>{label} : {total} sièges</title>
        <desc id={`${id}-description`}>Un point représente un siège. Les effectifs et les catégories non renseignées sont détaillés dans la liste chiffrée. Les formations suivent le volume décroissant ; les données manquantes restent à part, sans placement politique.</desc>
        {buckets.map(b => <g key={b.id} opacity={selected && selected !== b.id ? .18 : 1}>
          <title>{b.name} : {b.seats} sièges</title>
          {points.filter(p => p.bucketId === b.id).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.radius} fill={colours.get(b.id)} className={b.status === 'unknown' ? 'seat-unknown' : undefined} />)}
        </g>)}
        <text x="320" y="270" textAnchor="middle" className="hemicycle-total">{active?.seats ?? total}</text>
        <text x="320" y="298" textAnchor="middle" className="hemicycle-unit">{active ? `sur ${total} sièges` : 'sièges représentés'}</text>
      </svg>
      <p className="hemicycle-key">1 point = 1 siège · Sélectionnez une formation dans la liste.</p>
      <p className="hemicycle-selection" role="status">{active ? <>{active.name} : <strong>{active.seats} sièges</strong> sur {total}.</> : 'Toutes les formations sont affichées.'}</p>
      {active && <button className="hemicycle-reset" type="button" onClick={() => setSelected(null)}>Afficher toutes les formations</button>}
    </div>
    <div className="hemicycle-legend"><h4>Effectifs et part des sièges</h4>
      {buckets.length > 12 && <label className="hemicycle-search" htmlFor={`${id}-search`}>Chercher une formation dans la légende<input id={`${id}-search`} type="search" maxLength={80} value={query} onChange={e => setQuery(e.target.value)} placeholder="Nom, initiales ou code pays…" /></label>}
      <ul>{legend(visible)}</ul>
      {!filtered.length && <p className="hemicycle-key">Aucune formation pour cette recherche.</p>}
      {remaining.length > 0 && <details><summary>Voir les {remaining.length} autres formations</summary><ul>{legend(remaining)}</ul></details>}
    </div>
  </div>;
}
