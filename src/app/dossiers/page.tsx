import type { Metadata } from "next";

import CategoryChips from "@/components/CategoryChips";
import DossierCard from "@/components/DossierCard";
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
        <div className="grid gap-3 md:grid-cols-2">
          {dossiers.map((dossier) => (
            <DossierCard key={dossier.id} dossier={dossier} />
          ))}
        </div>
      )}
    </div>
  );
}
