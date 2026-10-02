/** Resolve palette collisions within a roster, independently of visible series. */
export function pollSeriesColor(candidate: string, roster: string[]): string {
  const used = new Set<number>();
  for (const id of [...roster].sort()) {
    let hash = 0;
    for (const character of id) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
    let index = hash % 16;
    while (used.size < 16 && used.has(index)) index = (index + 1) % 16;
    used.add(index);
    if (id === candidate) return `var(--poll-series-${index + 1})`;
  }
  return 'var(--teal)';
}

export function candidateInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return `${parts[0]?.[0] ?? ''}${parts.length > 1 ? parts.at(-1)?.[0] ?? '' : ''}`;
}
