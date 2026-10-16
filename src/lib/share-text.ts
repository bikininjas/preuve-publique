/**
 * Texte de partage d'un dossier : un paragraphe court, sourcé et vérifiable,
 * prêt à être collé sur X, Facebook ou un forum.
 *
 * Le texte n'est assemblé qu'à partir des données publiées du dossier — titre,
 * verdict, institutions des pièces, lien canonique. Les deux pièces retenues
 * sont les plus institutionnelles du dossier, à institutions distinctes quand
 * c'est possible : deux pièces du même auteur ne feraient pas deux démentis.
 * Rien n'est ajouté pour la formule.
 */

import { VERDICT_STAMPS } from "./labels.ts";
import type { Dossier, DossierSource, PoliticalSpectrum } from "./types.ts";

/** Adresse publique canonique du site : c'est elle qui est copiée, pas l'hôte courant. */
export const SITE_URL = "https://preuve-publique.fr";

/**
 * Autorité d'un pilier pour un partage : données d'administration d'abord,
 * puis archives primaires, recherche à comité de lecture, institutions — les
 * piliers d'opinion ferment la marche.
 */
const PILLAR_AUTHORITY: Record<PoliticalSpectrum, number> = {
  DONNEES_BRUTES_OFFICIELLES: 0,
  ARCHIVE_PRIMAIRE: 1,
  CONSENSUS_ACADEMIQUE: 2,
  CENTRE: 3,
  GAUCHE: 4,
  DROITE_LIBERALE_CONSERVATRICE: 5,
};

/** Verdicts qui confirment l'affirmation : la phrase ne dit pas « démenti ». */
const CONFIRMING_VERDICTS: ReadonlySet<string> = new Set(["VRAI"]);

/** URL canonique d'un dossier (sans double slash si `siteUrl` en porte un). */
export function canonicalDossierUrl(slug: string, siteUrl: string = SITE_URL): string {
  return `${siteUrl.replace(/\/+$/, "")}/dossiers/${slug}`;
}

/**
 * Les deux pièces qui portent le démenti : les plus institutionnelles du
 * dossier, la seconde à institution différente quand le dossier le permet.
 */
export function pickHeadlineSources(sources: DossierSource[]): DossierSource[] {
  const ranked = [...sources].sort(
    (left, right) =>
      PILLAR_AUTHORITY[left.spectrum] - PILLAR_AUTHORITY[right.spectrum] ||
      left.display_order - right.display_order,
  );
  const first = ranked[0];
  if (first === undefined) {
    return [];
  }
  const second = ranked.find(
    (source) => source !== first && source.author_or_institution !== first.author_or_institution,
  );
  return [first, ...(second === undefined ? [] : [second])];
}

/** Noms d'institutions, sans vide ni doublon, dans l'ordre des pièces. */
function institutionNames(sources: DossierSource[]): string[] {
  const names: string[] = [];
  for (const source of sources) {
    const name = source.author_or_institution.trim();
    if (name !== "" && !names.includes(name)) {
      names.push(name);
    }
  }
  return names;
}

/** Énumération française : « A », « A et B », « A, B et C ». */
function joinFrench(items: string[]): string {
  if (items.length <= 1) {
    return items[0] ?? "";
  }
  return `${items.slice(0, -1).join(", ")} et ${items[items.length - 1] ?? ""}`;
}

/** Phrase unique copiée par le bouton de partage. */
export function buildShareText(dossier: Dossier, siteUrl: string = SITE_URL): string {
  const sentences: string[] = [];

  const title = dossier.claim_title.trim();
  // Le point final n'est ajouté que si le titre n'est pas déjà ponctué.
  const punctuated = /[.!?…»]$/.test(title);
  sentences.push(`${VERDICT_STAMPS[dossier.verdict]} : ${title}${punctuated ? "" : "."}`);

  const names = institutionNames(pickHeadlineSources(dossier.sources));
  if (names.length > 0) {
    const verb = CONFIRMING_VERDICTS.has(dossier.verdict) ? "Confirmé par" : "Démenti par";
    sentences.push(`${verb} ${joinFrench(names)}.`);
  }

  sentences.push(`Preuve et sources : ${canonicalDossierUrl(dossier.slug, siteUrl)}`);
  return sentences.join(" ");
}
