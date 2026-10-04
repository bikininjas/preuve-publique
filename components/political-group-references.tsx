import directory from '@/lib/judicial-entities.json';
import { PoliticalBadge, PoliticalClassificationDetails } from './political-classification';

export function PoliticalGroupReferences() {
  return <section className="panel" id="reperes-groupes">
    <h2>Repères politiques au Sénat et au Parlement européen</h2>
    <p>Les orientations ci-dessous reposent sur des déclarations de groupes ou des descriptions institutionnelles datées. Elles ne reprennent pas les nuances électorales des partis français. Ce répertoire ne fournit pas de votes supplémentaires.</p>
    {['Sénat', 'Parlement européen'].map(chamber => <div key={chamber}>
      <h3>{chamber}</h3><div className="political-reference-grid">{directory.entities.filter(entity => entity.kind === 'group' && 'chamber' in entity && entity.chamber === chamber).map(entity => <article key={entity.id}>
        <h3>{entity.label}</h3><PoliticalBadge name={entity.label} kind="group" chamber={chamber} />
        <PoliticalClassificationDetails name={entity.label} kind="group" chamber={chamber} />
      </article>)}</div>
    </div>)}
  </section>;
}
