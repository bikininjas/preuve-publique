import type { DossierTimelineEvent } from "@/lib/types";

/**
 * Chaîne de custode : la chronologie de l'instruction, en frise d'archive
 * judiciaire — un axe pointillé, des étapes datées, chacune rattachable à la
 * pièce qui la documente (`evidence_ref`).
 *
 * Un dossier sans chronologie ne reçoit pas de frise vide : la section ne
 * s'affiche pas du tout (rendu conditionnel discret).
 */
export default function ChainOfCustodyTimeline({
  events,
}: {
  events: DossierTimelineEvent[];
}) {
  if (events.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="chaine-de-custode" className="border border-grid bg-surface">
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-grid px-4 py-3">
        <h2
          id="chaine-de-custode"
          className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink"
        >
          {"// Chaîne de custode & chronologie de l'instruction"}
        </h2>
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
          {events.length} étape{events.length > 1 ? "s" : ""} consignée
          {events.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <ol className="pp-custody">
          {events.map((event) => (
            <li key={`${event.date}-${event.title}`}>
              <span className="pp-custody__node" aria-hidden="true" />
              <div className="pp-custody__card">
                <p className="pp-custody__date">[{event.date}]</p>
                <p className="pp-custody__title">{event.title}</p>
                <p className="pp-custody__desc pp-tight text-muted">{event.description}</p>
                {event.evidence_ref !== null && event.evidence_ref !== "" ? (
                  <p className="pp-custody__ref">{event.evidence_ref}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
