/**
 * Découpage d'un texte en segments, dont les **chiffres clés** — nombres,
 * montants, pourcentages, dates ISO — qui seront recouverts par le caviardage
 * du protocole à l'aveugle.
 *
 * Invariant non négociable : la concaténation des segments rend le texte
 * d'origine, caractère pour caractère. Le protocole masque visuellement ; il
 * n'efface ni ne réécrit rien (les valeurs restent dans la page).
 *
 * Un chiffre n'est retenu que s'il est *significatif* : au moins deux chiffres,
 * ou une unité qui le qualifie (« 5 % », « 10 ans »). Un « 3 » isolé ne devient
 * pas un secret d'État.
 */

export type TextSegment = { text: string; figure: boolean };

const NBSP = "\\u00a0\\u202f";
const NUMBER = `\\d+(?:[ ${NBSP}]\\d{3})*(?:[.,]\\d+)*`;
const UNIT =
  "(?:\\s?(?:%|€|Md€|M€|k€|milliards?|millions?|milliers?|points?|ans?))?";
const DATE = "\\d{4}-\\d{2}-\\d{2}";

const FIGURE_PATTERN = new RegExp(`${DATE}|${NUMBER}${UNIT}`, "g");

/** Vrai si le fragment représente un chiffre clé (et non un numéro de passage). */
export function isKeyFigure(fragment: string): boolean {
  const digits = fragment.match(/\d/g)?.length ?? 0;
  const hasUnit = /[%€]|\b(?:milliards?|millions?|milliers?|points?|ans?)\b/i.test(fragment);
  return digits >= 2 || hasUnit;
}

/** Segments du texte : prose et chiffres clés, dans l'ordre, sans perte. */
export function splitFigures(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const match of text.matchAll(FIGURE_PATTERN)) {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    if (!isKeyFigure(match[0])) {
      continue;
    }
    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start), figure: false });
    }
    segments.push({ text: match[0], figure: true });
    cursor = end;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), figure: false });
  }
  return segments;
}

/** Les seuls chiffres clés, dans l'ordre — utile aux tests et aux comptes. */
export function keyFigures(text: string): string[] {
  return splitFigures(text)
    .filter((segment) => segment.figure)
    .map((segment) => segment.text);
}

