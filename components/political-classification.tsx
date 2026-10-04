import Link from 'next/link';
import { CLASSIFICATION_BASIS_LABELS, politicalClassification, politicalClassifications, type PoliticalKind } from '@/lib/political-classifications';

type Identity = { name: string; kind: PoliticalKind; chamber?: string; externalId?: string | null; asOf?: string; officialNames?: readonly string[] };

/** Always show the source context beside the label, including in historical vote charts. */
export function PoliticalBadge({ linked = true, ...identity }: Identity & { linked?: boolean }) {
  const entry = politicalClassification(identity);
  const text = entry ? `${entry.label} · ${entry.context}` : 'Repère absent de notre référentiel sourcé';
  const title = entry ? `${CLASSIFICATION_BASIS_LABELS[entry.basis]} de ${entry.names[0]} · ${entry.source.publisher} · ${entry.source.locator}` : 'Aucune source recoupée pour cette identité exacte. Cela ne signifie pas qu’aucune classification officielle existe.';
  return linked ? <Link className={`political-badge${entry ? '' : ' undocumented'}`} href="/methode#classifications-politiques" title={title}>{text}</Link>
    : <span className={`political-badge${entry ? '' : ' undocumented'}`} title={title}>{text}</span>;
}

export function PoliticalClassificationDetails(identity: Identity) {
  const entries = politicalClassifications(identity);
  return <details className="political-details">
    <summary>Repère politique : sources et contexte</summary>
    {entries.length ? entries.map((entry) => <div key={entry.context}>
      <span className="political-badge">{entry !== entries[0] ? 'Ancien repère : ' : ''}{entry.label} · {entry.context}</span>
      {identity.kind === 'group' ? <p>Groupe cité dans la source : <strong>{entry.names[0]}</strong>.</p> : null}
      <p>{CLASSIFICATION_BASIS_LABELS[entry.basis]} · <a href={entry.source.url} target="_blank" rel="noopener noreferrer">{entry.source.publisher} ↗</a> · {entry.source.publishedAt}.<br />{entry.source.locator}.</p>
      {entry.judicialReview ? <p><a href={entry.judicialReview.url} target="_blank" rel="noopener noreferrer">Contrôle du Conseil d’État du {entry.judicialReview.publishedAt} ↗</a> : légalité de la grille électorale dans ce contexte.</p> : null}
    </div>) : <p>Aucune source recoupée pour cette identité exacte dans notre référentiel. Cette absence ne signifie pas qu’aucune classification officielle existe. Aucun classement n’est déduit d’un nom, d’un parti membre ou des votes.</p>}
    <p className="hint">Ce repère porte sur la source datée ; il ne qualifie pas les votes ni l’appartenance de chaque personne. <Link href="/methode#classifications-politiques">Sources et limites →</Link></p>
  </details>;
}
