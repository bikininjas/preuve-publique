/** Propriété GA4 de preuve-publique.fr — identifiant public, sans secret. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-51KCVCRGC4";

/** Clé de stockage local du choix de mesure d'audience. */
export const ANALYTICS_CONSENT_KEY = "pp-analytics-consent";

export type AnalyticsConsent = "granted" | "denied";

/** Relit le choix mémorisé ; `null` si la personne n'a pas encore tranché. */
export function parseConsent(raw: string | null): AnalyticsConsent | null {
  return raw === "granted" || raw === "denied" ? raw : null;
}

/** Un identifiant de mesure GA4 commence par « G- » (GT- est un tag Google, pas GA4). */
export function isValidMeasurementId(id: string): boolean {
  return /^G-[A-Z0-9]{6,20}$/.test(id);
}
