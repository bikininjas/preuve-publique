/** Group/party memberships are evaluated separately; ambiguity never becomes affiliation. */
export const list = value => value == null ? [] : Array.isArray(value) ? value : [value];
export const reference = value => typeof value === 'object' ? value?.['#text'] : value;
export const active = (period, day) => Boolean(period?.start && period.start <= day && (!period.end || period.end >= day));

export function uniqueMembership(memberships, day) {
  const ids = new Set(memberships.filter(m => active(m, day)).map(m => m.id).filter(Boolean));
  return ids.size === 1 ? [...ids][0] : null;
}

export function countSeats(entries, capacity) {
  if (!Number.isSafeInteger(capacity) || capacity < 1 || capacity > 1000) throw new Error('Capacité invalide');
  const seen = new Set();
  const buckets = new Map();
  for (const entry of entries) {
    if (!entry.person || seen.has(entry.person)) throw new Error('Personne absente ou répétée');
    seen.add(entry.person);
    const id = entry.id ?? 'unknown';
    const name = entry.name ?? 'Rattachement non renseigné';
    const status = entry.status ?? (entry.id ? 'known' : 'unknown');
    const previous = buckets.get(id);
    if (previous && (previous.name !== name || previous.status !== status)) throw new Error('Formation ambiguë');
    buckets.set(id, { id, name, status, seats: (previous?.seats ?? 0) + 1 });
  }
  if (seen.size > capacity) throw new Error('Effectif supérieur au nombre de sièges');
  if (seen.size < capacity) buckets.set('not-listed', { id: 'not-listed', name: 'Sièges non décrits dans la source', status: 'unknown', seats: capacity - seen.size });
  return [...buckets.values()].sort((a, b) => Number(a.status === 'unknown') - Number(b.status === 'unknown') || b.seats - a.seats || a.name.localeCompare(b.name, 'fr'));
}

export function assemblyEntries(actors, organs, type, day) {
  const labels = new Map(organs.filter(o => o.codeType === type).map(o => [reference(o.uid), o.libelle]));
  return actors.filter(a => list(a.mandats?.mandat).some(m => m.typeOrgane === 'ASSEMBLEE' && active({ start: m.dateDebut, end: m.dateFin }, day)))
    .map(a => {
      const id = uniqueMembership(list(a.mandats?.mandat).filter(m => m.typeOrgane === type).map(m => ({ id: reference(m.organes?.organeRef), start: m.dateDebut, end: m.dateFin })), day);
      const name = labels.get(id);
      return { person: reference(a.uid), id: name ? id : null, name: name ?? (type === 'GP' ? 'Groupe non renseigné' : 'Rattachement de financement non renseigné'), status: !name ? 'unknown' : /^(non inscrit|sans parti)$/i.test(name) ? 'unaffiliated' : 'known' };
    });
}

export function senateEntries(senators) {
  return senators.map(s => {
    const g = s.groupe;
    const pending = !g || g.code === 'AUCUN' || /nouveaux s[ée]nateurs/i.test(g.libelle);
    return { person: s.matricule, id: pending ? 'pending-group' : g.code, name: pending ? 'Groupe non encore renseigné (nouveaux sénateurs)' : g.libelle.replace(/^Groupe /, ''), status: pending ? 'unknown' : g.code === 'NI' || /ne figurant/.test(g.libelle) ? 'unaffiliated' : 'known' };
  });
}

export function europeanPartyEntries(members, bodies) {
  const labels = new Map(bodies.map(b => [b.id, b.prefLabel?.fr ?? b.prefLabel?.en ?? b.label]));
  return members.map(m => {
    const id = m.party.length === 1 ? m.party[0] : null;
    const label = labels.get(id);
    const unaffiliated = label && /^(indépendant(?:e)?s?|independents?|non[- ]attached|sans parti)$/i.test(label.trim());
    return { person: m.id, id: label ? `${id}:${m.country}` : null, name: label ? `${label} (${m.country})` : 'Parti national non renseigné ou ambigu', status: !label ? 'unknown' : unaffiliated ? 'unaffiliated' : 'known' };
  });
}
