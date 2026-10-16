"use client";

import { Dices } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { pickRandomDossierSlug } from "@/lib/random-dossier";

/**
 * Bouton « Dossier aléatoire » du hero : tire un slug parmi les dossiers publiés
 * (liste fournie par le serveur, tirage fait côté client) et route aussitôt.
 * Pendant la redirection, le libellé cède la place à `[... TIRS DE SCELLÉ ...]`
 * et le bouton est neutralisé — pas de double clic, pas de double tirage.
 */
export default function RandomDossierButton({ slugs }: { slugs: string[] }) {
  const router = useRouter();
  const [drawing, setDrawing] = useState(false);

  if (slugs.length === 0) {
    return null;
  }

  function draw() {
    if (drawing) {
      return;
    }
    const slug = pickRandomDossierSlug(slugs);
    if (slug === null) {
      return;
    }
    setDrawing(true);
    router.push(`/dossiers/${slug}`);
  }

  return (
    <button
      type="button"
      className="pp-btn"
      onClick={draw}
      disabled={drawing}
      aria-busy={drawing}
    >
      <Dices size={14} aria-hidden="true" />
      {drawing ? "[... TIRS DE SCELLÉ ...]" : "[DOSSIER ALÉATOIRE]"}
    </button>
  );
}
