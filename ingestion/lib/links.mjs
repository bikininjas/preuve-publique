// Deterministic candidate links between pieces.
//
// Rule: two pieces published by two sources that carry the *same explicit
// documentary reference* (same dossier id, same procedure id, same document
// id) share that reference. The link states exactly that: a documentary
// link. It never means support, contradiction, or a broken promise, and it
// is written as draft for human review before publication.

const SAME_PROPOSAL_REF = /(dossier|propos|proposal|procedure|text)/i;

export function relationForRefType(type) {
  return SAME_PROPOSAL_REF.test(type) ? 'same_proposal' : 'related';
}

/**
 * @param {Array<{id: string, kind: string, institution: string|null, title: string, detail: object|null}>} items
 * @param {{maxPairsPerRef?: number}} [options] complete pairs per shared reference are
 *   capped: one dossier voted dozens of times would otherwise produce thousands of links.
 * @returns {{links: Array<object>, notes: string[]}}
 */
export function candidateLinks(items, { maxPairsPerRef = 25 } = {}) {
  const byRef = new Map();
  for (const item of items) {
    const refs = Array.isArray(item.detail?.refs) ? item.detail.refs : [];
    for (const ref of refs) {
      if (!ref?.type || !ref?.value) continue;
      const key = `${ref.type}::${ref.value}`;
      if (!byRef.has(key)) byRef.set(key, []);
      byRef.get(key).push(item);
    }
  }

  const candidates = new Map();
  const notes = [];
  for (const [key, group] of byRef) {
    if (group.length < 2) continue;
    const [type, value] = key.split('::');
    let emittedForRef = 0;
    let truncated = false;
    for (let i = 0; i < group.length; i += 1) {
      for (let j = i + 1; j < group.length; j += 1) {
        const a = group[i];
        const b = group[j];
        if (a.id === b.id) continue;
        if (emittedForRef >= maxPairsPerRef) { truncated = true; break; }
        const relation = relationForRefType(type);
        const [from, to] = a.id < b.id ? [a, b] : [b, a];
        const id = `${from.id}|${to.id}|${relation}`;
        if (candidates.has(id)) continue;
        candidates.set(id, {
          from_id: from.id,
          to_id: to.id,
          relation,
          // Identical explicit reference: the documentary link itself is not
          // uncertain. Human review still gates publication.
          confidence: 1,
          method: 'deterministic',
          rationale: `Référence documentaire identique dans les deux sources : ${type} = ${value}. `
            + 'Lien documentaire uniquement, sans jugement de position.',
          status: 'draft',
        });
        emittedForRef += 1;
      }
      if (truncated) break;
    }
    if (truncated) {
      notes.push(`${key} : ${group.length} pièces partagent cette référence, seules ${maxPairsPerRef} paires ont été proposées à la revue`);
    }
  }
  return { links: [...candidates.values()], notes };
}
