/**
 * Recalage d'une infobulle ancrée à un élément : elle part du bord gauche de
 * son hôte, mais une infobulle large sur un hôte proche du bord droit sortait
 * de l'écran (donc élargissait la page). On calcule la position la plus à
 * gauche possible qui reste entièrement visible, jamais plus loin qu'une marge.
 */

/** Marge minimale avec les bords du viewport, en pixels. */
export const TOOLTIP_MARGIN = 12;

/** Largeur maximale souhaitée d'une infobulle, en pixels. */
export const TOOLTIP_MAX_WIDTH = 544;

/**
 * Position du bord gauche de l'infobulle, en coordonnées du viewport :
 * ancrée sur l'hôte si elle tient, ramenée dans la fenêtre sinon.
 */
export function clampTooltipLeft(
  hostLeft: number,
  tooltipWidth: number,
  viewportWidth: number,
  margin: number = TOOLTIP_MARGIN,
): number {
  const max = viewportWidth - margin - tooltipWidth;
  return Math.max(margin, Math.min(hostLeft, max));
}

/** Largeur maximale utilisable pour une infobulle dans un viewport donné. */
export function tooltipMaxWidth(
  viewportWidth: number,
  margin: number = TOOLTIP_MARGIN,
): number {
  return Math.min(viewportWidth - margin * 2, TOOLTIP_MAX_WIDTH);
}
