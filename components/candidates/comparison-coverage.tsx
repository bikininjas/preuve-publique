import { comparisonCoverage } from '@/lib/candidates/comparison';
import type { CandidateIdentity, CandidateVote, MeasureEvidence } from '@/lib/candidates/types';
import { formatDate } from '@/lib/labels';

export function ComparisonCoverage({ identities, votes, links, profilesAvailable }: {
  identities: CandidateIdentity[]; votes: CandidateVote[] | null; links: MeasureEvidence[] | null; profilesAvailable: boolean;
}) {
  const coverage = comparisonCoverage(identities, votes, links);
  const dates = votes?.map((vote) => vote.occurred_at).sort() ?? [];
  return <section className="comparison-coverage" aria-labelledby="coverage-title">
    <div className="eyebrow">Avant d’interpréter les différences</div>
    <h2 id="coverage-title">Ce que l’on sait. Ce qui manque.</h2>
    <p>Ces repères décrivent les documents disponibles dans cette sélection. Une lacune du corpus ne qualifie ni une personne ni ses positions.</p>
    <div className="candidate-table-scroll"><table className="coverage-table">
      <caption>Bulletins : {votes === null ? 'lecture indisponible' : `${votes.length} scrutin(s) sur cette page`}{dates.length ? `, du ${formatDate(dates[0])} au ${formatDate(dates.at(-1)!)}` : ''}. Les comptes changent avec la page.</caption>
      <thead><tr><th scope="col">Pièces disponibles</th>{coverage.map((person) => <th scope="col" key={person.slug}>{person.name}</th>)}</tr></thead>
      <tbody>
        <tr><th scope="row">Identité dans le référentiel AN</th>{coverage.map((person) => <td key={person.slug}>{!profilesAvailable ? 'Lecture indisponible' : person.actor_id ? 'Recoupée et sourcée' : 'Non recoupée dans ce corpus'}</td>)}</tr>
        <tr><th scope="row">Bulletins personnels de cette page</th>{coverage.map((person) => <td key={person.slug}>{person.documented === null ? 'Lecture indisponible' : <><strong>{person.documented} disponible(s)</strong><span>{person.missing} non disponible(s)</span></>}</td>)}</tr>
        <tr><th scope="row">Pièces de programme 2027 reliées aux mesures de ce sous-thème</th>{coverage.map((person) => <td key={person.slug}>{links === null || !profilesAvailable ? 'Lecture indisponible' : !person.actor_id ? 'Correspondance nécessaire pour relier les pièces' : person.programs2027 ? `${person.programs2027} pièce(s) reliée(s) et validée(s)` : 'Aucune pièce reliée et validée'}</td>)}</tr>
        <tr><th scope="row">Déclarations reliées aux mesures de ce sous-thème</th>{coverage.map((person) => <td key={person.slug}>{links === null || !profilesAvailable ? 'Lecture indisponible' : !person.actor_id ? 'Correspondance nécessaire pour relier les pièces' : person.statements ? `${person.statements} pièce(s) reliée(s) et validée(s)` : 'Aucune pièce reliée et validée'}</td>)}</tr>
      </tbody>
    </table></div>
    <p className="hint">Les programmes et déclarations concernent les fiches de mesures publiées ci-dessous (au plus 30 mesures et 200 liens). « Aucune pièce reliée » ne signifie pas « aucun programme » ou « aucune déclaration ». Un non-votant enregistré possède un bulletin documenté ; un bulletin manquant n’est pas une absence.</p>
  </section>;
}
