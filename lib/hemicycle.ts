export type SeatBucket = {
  id: string;
  name: string;
  seats: number;
  status: 'known' | 'unaffiliated' | 'unknown';
};

export type SeatPoint = { x: number; y: number; radius: number; bucketId: string };

export function filterSeatBuckets(buckets: SeatBucket[], query: string): SeatBucket[] {
  const term = query.trim();
  const code = term.toUpperCase();
  if (/^[A-Z]{2}$/.test(code) && buckets.some(b => b.name.endsWith(`(${code})`))) return buckets.filter(b => b.name.endsWith(`(${code})`));
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr-FR');
  const normalized = normalize(term);
  const acronymMatches = buckets.filter(b => {
    const words = b.name.replace(/\s+\([A-Z]{2}\)$/, '').split(/\s+/).filter(Boolean);
    const initials = words.map(w => w[0]).join('');
    const short = words.filter(w => !['de', 'des', 'du', 'et', 'la', 'le', 'les'].includes(w.toLowerCase())).map(w => w[0]).join('');
    return normalize(initials) === normalized || normalize(short) === normalized;
  });
  if (/^[A-Z]{2,6}$/.test(code) && acronymMatches.length) return acronymMatches;
  return buckets.filter(b => normalize(b.name).includes(normalized));
}

/** Exact integer seats, ordered by angle. The layout does not assign political positions. */
export function hemicyclePoints(buckets: SeatBucket[]): SeatPoint[] {
  if (buckets.some(b => !Number.isSafeInteger(b.seats) || b.seats < 0)) throw new Error('Effectif invalide');
  if (new Set(buckets.map(b => b.id)).size !== buckets.length) throw new Error('Formation répétée');
  const total = buckets.reduce((sum, b) => sum + b.seats, 0);
  if (total > 1000) throw new Error('Effectif hors périmètre');
  if (!total) return [];
  const rows = Math.max(1, Math.ceil(Math.sqrt(total) / 3));
  const radii = Array.from({ length: rows }, (_, i) => rows === 1 ? 240 : 120 + i * 160 / (rows - 1));
  const weight = radii.reduce((a, b) => a + b, 0);
  const quotas = radii.map(r => total * r / weight);
  const counts = quotas.map(Math.floor);
  const remainder = total - counts.reduce((a, b) => a + b, 0);
  const priority = quotas.map((q, index) => ({ index, fraction: q - counts[index] }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index);
  for (const row of priority.slice(0, remainder)) counts[row.index]++;
  const spacing = Math.min(...radii.map((r, i) => counts[i] > 1 ? Math.PI * r / (counts[i] - 1) : 80));
  const radius = Math.min(8, spacing * .36, rows > 1 ? 160 / (rows - 1) * .36 : 8);
  const points = radii.flatMap((r, row) => Array.from({ length: counts[row] }, (_, i) => {
    const angle = counts[row] === 1 ? Math.PI / 2 : Math.PI - i * Math.PI / (counts[row] - 1);
    return { x: 320 + r * Math.cos(angle), y: 320 - r * Math.sin(angle), radius, angle, row };
  })).sort((a, b) => b.angle - a.angle || a.row - b.row);
  let offset = 0;
  return buckets.flatMap(b => points.slice(offset, offset += b.seats)
    .map(p => ({ x: p.x, y: p.y, radius: p.radius, bucketId: b.id })));
}

export function seatColour(bucket: SeatBucket): string {
  if (bucket.status === 'unknown') return '#7b8b98';
  if (bucket.status === 'unaffiliated') return '#b0bac2';
  const name = bucket.name.replace(/\s+\([A-Z]{2}\)$/, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return `hsl(${hash % 360} 60% 52%)`;
}

/** Distinct leading colours within a chart; colours do not encode political families. */
export function seatColours(buckets: SeatBucket[]): Map<string, string> {
  const palette = ['#5289dc', '#30aa89', '#d26aad', '#e59b40', '#d94b57', '#82ac36', '#9a77d9', '#40b3c2', '#cc8759', '#a0a1df', '#bd985c', '#52a283'];
  let known = 0;
  return new Map(buckets.map(b => [b.id, b.status === 'known' ? known < palette.length ? palette[known++] : `hsl(${(known++ * 137.508) % 360} 60% 52%)` : seatColour(b)]));
}
