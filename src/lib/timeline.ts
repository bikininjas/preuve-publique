import type { DossierTimelineEvent } from "./types.ts";

/**
 * Lecture défensive d'une chronologie stockée en JSONB : une étape illisible
 * est écartée, jamais devinée — la même règle que les protagonistes et les
 * prémisses. Un tableau absent, d'un autre type, ou dont les champs
 * obligatoires manquent, rend une liste vide d'entrées valides.
 */
export function parseTimelineEvents(value: unknown): DossierTimelineEvent[] {
  if (!Array.isArray(value)) {
    return [];
  }
  const events: DossierTimelineEvent[] = [];
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      continue;
    }
    const record = entry as Record<string, unknown>;
    const date = readString(record.date);
    const title = readString(record.title);
    const description = readString(record.description);
    if (date === null || title === null || description === null) {
      continue;
    }
    events.push({
      date,
      title,
      description,
      evidence_ref: readString(record.evidence_ref),
    });
  }
  return events;
}

function readString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}
