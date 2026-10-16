import type { Metadata } from "next";

import CategoryChips from "@/components/CategoryChips";
import DossierCard from "@/components/DossierCard";
import TelemetryBand from "@/components/TelemetryBand";
import { formatAverageConsensus, registryFigures } from "@/lib/figures";
import { categoryCounts, listPublishedDossiers } from "@/server/services/dossier.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tous les dossiers",
  description:
    "Le registre complet des vérifications publiées, classées par catégorie, avec le nombre de pièces et les empreintes de chaque dossier.",
};

export default async function DossiersPage() {
  const [listed, counts] = await Promise.all([listPublishedDossiers(), categoryCounts()]);
  const dossiers = listed.ok ? listed.value : [];
  const figures = registryFigures(dossiers);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="pp-meta text-muted">Registre</p>
        <h1 className="pp-h1 font-serif text-ink">Tous les dossiers</h1>
        <p className="pp-tight text-muted">
          {dossiers.length} dossier{dossiers.length > 1 ? "s" : ""} publié
          {dossiers.length > 1 ? "s" : ""}, classé{dossiers.length > 1 ? "s" : ""} par
          catégorie. Chaque fiche annonce ses pièces et ses empreintes.
        </p>
      </header>

      <TelemetryBand
        items={[
          { label: "Dossiers publiés", value: String(figures.dossiers) },
          { label: "Pièces recoupées", value: String(figures.pieces) },
          {
            label: "Empreintes",
            value: `${figures.fingerprints}/${figures.pieces}`,
            title:
              "Pièces portant une empreinte SHA-256 vérifiable — les autres n'en ont pas encore, et le site le dit pièce par pièce.",
          },
          {
            label: "Piliers documentés",
            value: String(figures.pillars),
            title:
              "Somme des piliers documentés de chaque dossier : six au maximum par dossier, comptés dans les sources.",
          },
          {
            label: "Moyenne des scores éditoriaux",
            value: formatAverageConsensus(figures.averageConsensus),
            title:
              "Indicateur éditorial : la moyenne des scores fixés par la rédaction, dossier par dossier.",
          },
        ]}
      />

      <CategoryChips counts={counts.ok ? counts.value : undefined} />

      {!listed.ok ? (
        <p className="border-2 border-falsebd bg-falsebg px-4 py-3 text-falsebd">
          {listed.message} Aucune donnée locale ne remplace une lecture échouée.
        </p>
      ) : dossiers.length === 0 ? (
        <p className="border border-dashed border-gridsoft px-4 py-6 text-muted">
          Aucun dossier publié pour le moment.
        </p>
      ) : (
        <div className="pp-lighttable grid gap-3 md:grid-cols-2">
          {dossiers.map((dossier) => (
            <DossierCard key={dossier.id} dossier={dossier} />
          ))}
        </div>
      )}
    </div>
  );
}
