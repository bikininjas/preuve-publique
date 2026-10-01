// Minimal HTML helpers for institutional pages whose only machine-readable
// form is HTML (Sénat scrutin lists). Deliberately narrow: strip tags,
// decode the entities these pages actually use, collapse whitespace. A page
// whose structure changed will be rejected downstream by strict patterns
// rather than silently producing garbled text.

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', deg: '°',
  eacute: 'é', egrave: 'è', ecirc: 'ê', agrave: 'à', acirc: 'â', ccedil: 'ç',
  icirc: 'î', iuml: 'ï', ocirc: 'ô', ugrave: 'ù', ucirc: 'û', uuml: 'ü',
  euml: 'ë', laquo: '«', raquo: '»', hellip: '…', ndash: '–', mdash: '—',
  oelig: 'œ', euro: '€', deg2: '°',
  Eacute: 'É', Egrave: 'È', Ecirc: 'Ê', Agrave: 'À', Acirc: 'Â',
  Ccedil: 'Ç', Icirc: 'Î', Ocirc: 'Ô', Ugrave: 'Ù', Ucirc: 'Û',
};

export function decodeEntities(text) {
  return String(text).replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (match, entity) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const code = Number.parseInt(entity.slice(2), 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    if (entity.startsWith('#')) {
      const code = Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity] ?? match;
  });
}

export function stripTags(html) {
  return String(html).replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
}

export function textOf(html) {
  return decodeEntities(stripTags(html)).replace(/\s+/g, ' ').trim();
}

export function titleTag(html) {
  const match = String(html).match(/<title>([\s\S]*?)<\/title>/i);
  return match ? textOf(match[1]) : null;
}
