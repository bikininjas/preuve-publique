/**
 * Extract the Sénat's own per-group counts from one official scrutin page.
 * The group identifier and name come from that page; neither is a party.
 * Reject a changed layout or any disagreement with the published result.
 */
import { textOf } from './html.mjs';

const POSITION_LABELS = [/^Pour\s*:/i, /^Contre\s*:/i, /^Abstentions?\s*:/i, /pris part au vote\s*:/i];
const POSITION_KEYS = ['pour', 'contre', 'abstention', 'non_votant'];

function countsFromItems(block, itemPattern, countPattern) {
  const items = [...block.matchAll(itemPattern)].map((match) => match[1]);
  if (items.length !== 4) throw new Error(`Quatre positions attendues, ${items.length} trouvées`);
  return Object.fromEntries(items.map((item, index) => {
    const label = textOf(item);
    const count = item.match(countPattern);
    if (!POSITION_LABELS[index].test(label) || !count) throw new Error(`Position sénatoriale inconnue : ${label.slice(0, 70)}`);
    return [POSITION_KEYS[index], Number(count[1])];
  }));
}

export function parseSenatGroupVotes(html) {
  const resultMarker = html.search(/R(?:&eacute;|é)sultat du scrutin/i);
  const groupMarker = html.indexOf('Analyse par groupes politiques');
  if (resultMarker < 0 || groupMarker < resultMarker) throw new Error('Résultat ou analyse par groupes absent');
  const resultBlock = html.slice(resultMarker, groupMarker);
  const totals = {};
  for (const match of resultBlock.matchAll(/<strong class="display-4[^"]*">(\d+)<\/strong>\s*([^<]+)<\/li>/g)) {
    const label = textOf(match[2]).toLowerCase();
    if (label === 'pour' || label === 'contre') totals[label] = Number(match[1]);
  }
  const resultItems = [...resultBlock.matchAll(/<li class="list-inline-item fs-sm">([\s\S]*?)<\/li>/g)];
  if (resultItems.length !== 2) throw new Error('Abstentions ou non-participations officielles absentes');
  const rest = resultItems.map((match) => ({ label: textOf(match[1]), count: match[1].match(/<span class="fw-semibold">(\d+)<\/span>/)?.[1] }));
  if (!/^Abstentions?\s*:/i.test(rest[0].label) || !/pris part au vote\s*:/i.test(rest[1].label)
      || rest.some((item) => item.count === undefined) || totals.pour === undefined || totals.contre === undefined) {
    throw new Error('Décompte officiel incomplet');
  }
  totals.abstention = Number(rest[0].count);
  totals.non_votant = Number(rest[1].count);

  const end = html.indexOf('</section>', groupMarker);
  if (end < 0) throw new Error('Fin de l’analyse par groupes absente');
  const block = html.slice(groupMarker, end);
  const groups = [];
  const ids = new Set();
  for (const match of block.matchAll(/<div id="accordion-scrutin-([^"]+)" class="accordion-header">([\s\S]*?)<\/ul>/g)) {
    const groupRef = match[1];
    if (!/^[A-Za-z0-9_-]{1,32}$/.test(groupRef) || ids.has(groupRef)) throw new Error(`Groupe sénatorial ambigu : ${groupRef}`);
    ids.add(groupRef);
    const title = match[2].match(/<h3 class="accordion-title fs-5">([\s\S]*?)<\/h3>/);
    const heading = title ? textOf(title[1]) : '';
    const label = heading.match(/^(.*?)\s*:\s*(\d+)\s*(?:sénateurs?)?$/i);
    if (!label || !label[1].trim()) throw new Error(`Nom ou taille du groupe sénatorial absent : ${heading}`);
    const counts = countsFromItems(match[2], /<li class="list-inline-item d-inline-flex[^>]*>([\s\S]*?)<\/li>/g,
      /<span class="ms-1 fw-semibold">(\d+)<\/span>/);
    const members = Number(label[2]);
    if (POSITION_KEYS.reduce((sum, key) => sum + counts[key], 0) !== members) {
      throw new Error(`Décompte du groupe ${groupRef} différent de son effectif`);
    }
    groups.push({ group_ref: groupRef, group_name: label[1].trim(), members, ...counts });
  }
  if (!groups.length) throw new Error('Aucun groupe sénatorial reconnu');
  for (const key of POSITION_KEYS) {
    const sum = groups.reduce((total, group) => total + group[key], 0);
    if (sum !== totals[key]) throw new Error(`Écart avec le total officiel pour ${key} : ${sum} / ${totals[key]}`);
  }
  return { groups, official: totals };
}
