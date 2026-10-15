import { PROTAGONIST_LABELS } from "@/lib/labels";
import type { Protagonist } from "@/lib/types";

/**
 * Protagonistes du dossier : d'un côté ce qui est mis en cause, de l'autre les
 * auteurs des preuves. Chaque entrée renvoie à une référence vérifiable quand
 * il en existe une — et n'affiche simplement pas de lien sinon.
 */
export default function Protagonists({ protagonists }: { protagonists: Protagonist[] }) {
  if (protagonists.length === 0) {
    return null;
  }
  const sujets = protagonists.filter((protagonist) => protagonist.role === "SUJET");
  const auteurs = protagonists.filter((protagonist) => protagonist.role === "AUTEUR");

  const groupes: { titre: string; legende: string; membres: Protagonist[] }[] = [
    {
      titre: "Ce que l'affirmation met en cause",
      legende: "Personnes, organisations, lieux et textes cités par la rumeur ou le dossier.",
      membres: sujets,
    },
    {
      titre: "Qui porte les preuves",
      legende: "Auteurs et institutions dont les travaux sont recoupés ici.",
      membres: auteurs,
    },
  ];

  return (
    <section className="space-y-4 border border-grid bg-surface p-4 sm:p-5">
      <h2 className="pp-h3 font-serif text-ink">Protagonistes</h2>
      {groupes
        .filter((groupe) => groupe.membres.length > 0)
        .map((groupe) => (
          <div key={groupe.titre} className="space-y-2">
            <p className="pp-meta text-muted">{groupe.titre}</p>
            <p className="pp-tight text-muted">{groupe.legende}</p>
            <ul className="flex flex-wrap gap-2">
              {groupe.membres.map((membre) => {
                const contenu = (
                  <>
                    <span className="text-ink">{membre.name}</span>
                    <span className="pp-meta text-muted">{PROTAGONIST_LABELS[membre.kind]}</span>
                  </>
                );
                return (
                  <li key={`${membre.role}-${membre.name}`}>
                    {membre.reference_url === null ? (
                      <span className="pp-chip" title="Aucune référence publique vérifiée pour cette entrée.">
                        {contenu}
                      </span>
                    ) : (
                      <a
                        className="pp-chip"
                        href={membre.reference_url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {contenu}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      <p className="pp-tight text-muted">
        Les liens mènent à des références publiques (Wikipédia) : ils servent à situer les
        personnes et les textes, pas à établir les faits — les faits, eux, reposent sur les
        pièces et leurs empreintes.
      </p>
    </section>
  );
}
