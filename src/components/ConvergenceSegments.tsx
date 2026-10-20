/**
 * Indicateur segmenté de l'indice de convergence : des blocs égaux, séparés
 * d'un filet, comme les pistes d'un audit ou les blocs d'une empreinte.
 *
 * Un bloc allumé vaut 5 points ; le nombre exact est écrit à côté, en chasse
 * fixe, et repris dans le libellé accessible. L'indice est **éditorial** : le
 * composant ne prétend jamais mesurer la couverture documentaire, qui se
 * compte, elle, pièce par pièce.
 */
const DEFAULT_SEGMENTS = 20;

export default function ConvergenceSegments({
  score,
  segments = DEFAULT_SEGMENTS,
  className = "",
}: {
  score: number;
  segments?: number;
  className?: string;
}) {
  const bounded = Math.min(100, Math.max(0, Math.round(score)));
  const cells = Math.max(1, Math.round(segments));
  const lit = Math.round((bounded / 100) * cells);

  return (
    <span
      className={`pp-track ${className}`}
      role="img"
      aria-label={`Indice de convergence affiché : ${bounded} sur 100, soit ${lit} blocs allumés sur ${cells}`}
      title={`Indice de convergence affiché : ${bounded} sur 100 — score éditorial, la couverture documentaire se compte`}
    >
      {Array.from({ length: cells }, (_, index) => (
        <span
          key={index}
          className="pp-track__cell"
          data-on={index < lit}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
