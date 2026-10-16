/**
 * Texte de partage d'un dossier : un paragraphe court, sourcé et vérifiable,
 * prêt à être collé sur X, Facebook ou un forum.
 *
 * Le texte n'est assemblé qu'à partir des données publiées du dossier — titre,
 * verdict, institutions des pièces, lien canonique. Le démenti nommé ne cite
 * que des institutions réellement habilitées à en porter un : administrations
 * et données brutes officielles, institutions (CENTRE) et recherche évaluée
 * par les pairs. Les archives primaires et les piliers d'opinion en sont
 * exclus : une archive signée du sujet de l'affirmation (« Adolf Hitler »,
 * « Muhammad al-Bukhari ») ou une tribune ne « démentissent » rien — elles
 * servent de pièces, et le paragraphe s'arrête au verdict quand le dossier
 * n'offre aucune institution à citer. Rien n'est inventé pour la formule.
 */

import { VERDICT_STAMPS } from "./labels.ts";
import type { Dossier, DossierSource, PoliticalSpectrum } from "./types.ts";

/** Adresse publique canonique du site : c'est elle qui est copiée, pas l'hôte courant. */
export const SITE_URL = "https://preuve-publique.fr";

/**
 * Piliers dont les pièces portent une institution qui peut être nommée dans un
 * démenti : données d'administration d'abord, puis institutions, puis recherche
 * évaluée par les pairs.
 */
const INSTITUTIONAL_PILLARS: PoliticalSpectrum[] = [
  "DONNEES_BRUTES_OFFICIELLES",
  "CENTRE",
  "CONSENSUS_ACADEMIQUE",
];

/** Longueur maximale d'un nom d'institution dans la phrase copiée. */
const NAME_LIMIT = 80;

/**
 * Au-delà de cette longueur, le nom ressemble à une notice bibliographique
 * (« Agence internationale de l'énergie, rapport annuel Global EV Outlook,
 * publié le… ») : préféré seulement faute de candidat plus court.
 */
const SHORT_NAME_LIMIT = 60;

/**
 * Une pièce portée par un entretien se cite par son média ou son auteur, pas
 * par la formule de l'entretien : « Propos recueillis par… » n'est pas une
 * institution qui démentit.
 */
const BYLINE = /\b(entretien|interview|propos recueillis)\b/i;

/** Verdicts qui confirment l'affirmation : la phrase ne dit pas « démenti ». */
const CONFIRMING_VERDICTS: ReadonlySet<string> = new Set(["VRAI"]);

/** Ponctuation qui rend le point de fin de phrase inutile. */
const SENTENCE_END = /[.!?…»]$/;

/** URL canonique d'un dossier (sans double slash si `siteUrl` en porte un). */
export function canonicalDossierUrl(slug: string, siteUrl: string = SITE_URL): string {
  return `${siteUrl.replace(/\/+$/, "")}/dossiers/${slug}`;
}

/**
 * Nom citable d'une institution, réduit sans rien fabriquer : la glose après
 * un tiret cadratin (« SSMSI — Service statistique ministériel… ») décrit la
 * pièce, pas l'institution ; les parenthèses et l'année de publication ne
 * tombent que si le nom dépasse la limite, et une coupe ultérieure se voit
 * (« … »). Aucune information n'est ajoutée, seul du bruit est retiré.
 */
export function institutionName(raw: string): string {
  let name = raw.trim();
  const dash = name.indexOf(" — ");
  if (dash > 0) {
    name = name.slice(0, dash);
  }
  name = name.replace(/\s+/g, " ").trim();
  if (name.length > NAME_LIMIT) {
    name = name.replace(/\s*\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
  }
  if (name.length > NAME_LIMIT) {
    /* Coupe sur un mot entier, jamais au milieu d'un nom. */
    let kept = "";
    for (const word of name.split(" ")) {
      const next = kept === "" ? word : `${kept} ${word}`;
      if (next.length > NAME_LIMIT) {
        break;
      }
      kept = next;
    }
    name = (kept === "" ? name.slice(0, NAME_LIMIT) : kept).replace(/[,\s/;:–—-]+$/, "");
    name = `${name}…`;
  }
  return name
    .replace(/,\s*(?:19|20)\d{2}\s*$/, "")
    .replace(/[.\s]+$/, "")
    .trim();
}

/**
 * Les institutions citées par le démenti : les deux pièces les plus
 * institutionnelles du dossier, à institutions distinctes quand c'est
 * possible — deux pièces du même auteur ne feraient pas deux démentis. Les
 * noms courts passent d'abord : une institution se cite par son nom, pas par
 * sa notice bibliographique.
 */
export function headlineInstitutions(sources: DossierSource[]): string[] {
  const candidates = sources
    .filter((source) => INSTITUTIONAL_PILLARS.includes(source.spectrum))
    .sort(
      (left, right) =>
        INSTITUTIONAL_PILLARS.indexOf(left.spectrum) - INSTITUTIONAL_PILLARS.indexOf(right.spectrum) ||
        left.display_order - right.display_order,
    )
    .filter((source) => !BYLINE.test(source.author_or_institution))
    .map((source) => institutionName(source.author_or_institution))
    .filter((name) => name !== "");

  /* Un nom déjà cité, ou qui contient une institution déjà citée (« Caroline
     Mir et Hamza El Jebbari, ADEME » après « ADEME »), ne compte pas pour un
     second démenti : c'est la même institution. */
  const collect = (accept: (name: string) => boolean): string[] => {
    const kept: string[] = [];
    for (const name of candidates) {
      if (!accept(name)) {
        continue;
      }
      if (
        kept.some(
          (one) =>
            name === one ||
            (one.length >= 4 && name.includes(one)) ||
            (name.length >= 4 && one.includes(name)),
        )
      ) {
        continue;
      }
      kept.push(name);
      if (kept.length === 2) {
        break;
      }
    }
    return kept;
  };

  const short = collect((name) => name.length <= SHORT_NAME_LIMIT);
  if (short.length === 2) {
    return short;
  }
  /* Pas deux noms courts : on reprend la sélection complète (les noms longs ne
     sont qu'un repli), sans dupliquer ce qui est déjà retenu. */
  const full = collect(() => true);
  return full.length > short.length ? full : short;
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
  sentences.push(`${VERDICT_STAMPS[dossier.verdict]} : ${title}${SENTENCE_END.test(title) ? "" : "."}`);

  const names = headlineInstitutions(dossier.sources);
  if (names.length > 0) {
    const verb = CONFIRMING_VERDICTS.has(dossier.verdict) ? "Confirmé par" : "Démenti par";
    const cited = joinFrench(names);
    sentences.push(`${verb} ${cited}${SENTENCE_END.test(cited) ? "" : "."}`);
  }

  sentences.push(`Preuve et sources : ${canonicalDossierUrl(dossier.slug, siteUrl)}`);
  return sentences.join(" ");
}
