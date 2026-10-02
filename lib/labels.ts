import type { Evidence, EvidenceKind, Institution, LinkMethod, LinkRelation, RowStatus } from '@/lib/types';

/** Respect the documented precision; the SQL month-start is only a sort key. */
export function formatEvidenceDate(evidence: Evidence): string {
  const indicator = evidence.kind === 'indicator' ? evidence.detail?.indicator as { publication_month?: unknown } | undefined : undefined;
  const month = indicator?.publication_month;
  if (typeof month === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(month) && evidence.occurred_at === `${month}-01`) {
    return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month}-01T00:00:00Z`));
  }
  return formatDate(evidence.occurred_at);
}

/**
 * Libellés français partagés par le site public et l'espace de relecture.
 * Un libellé de `relation` ne dit jamais plus que ce que le lien contient :
 * `related` signale un lien documentaire, pas un soutien ni une contradiction.
 */

export const KIND_LABELS: Record<EvidenceKind, string> = {
  program: 'Programme',
  statement: 'Déclaration',
  amendment: 'Amendement',
  vote: 'Scrutin',
  adopted_text: 'Texte adopté',
  indicator: 'Indicateur',
  judicial_event: 'Étape judiciaire',
};

export const INSTITUTION_LABELS: Record<Institution, string> = {
  assemblee: 'Assemblée nationale',
  senat: 'Sénat',
  parlement_europeen: 'Parlement européen',
  legifrance: 'Légifrance',
};

export const STATUS_LABELS: Record<RowStatus, string> = {
  draft: 'Brouillon',
  reviewed: 'Relu',
  published: 'Publié',
};

export const RELATION_LABELS: Record<LinkRelation, string> = {
  related: 'Lien documentaire',
  same_proposal: 'Même dossier ou proposition',
  legislative_outcome: 'Devenir du texte',
};

export const METHOD_LABELS: Record<LinkMethod, string> = {
  deterministic: 'Rapprochement déterministe (référence commune)',
  llm: 'Proposition de modèle, relue par un humain',
  human: 'Établi manuellement',
};

export const RELATION_NOTES: Record<LinkRelation, string> = {
  related: 'Signale un lien documentaire entre deux pièces, rien de plus : ni soutien, ni contradiction.',
  same_proposal: 'Les deux pièces portent la même référence de dossier ou de proposition, publiée par l’institution.',
  legislative_outcome: 'Relie un vote ou un amendement au devenir documenté du texte, sans affirmer de causalité.',
};

export function kindLabel(kind: string): string {
  return KIND_LABELS[kind as EvidenceKind] ?? kind;
}

export function institutionLabel(institution: string | null): string {
  if (!institution) return 'France / Union européenne';
  return INSTITUTION_LABELS[institution as Institution] ?? institution;
}

export function statusLabel(status: string): string {
  return STATUS_LABELS[status as RowStatus] ?? status;
}

export const RUN_STATUS_LABELS: Record<string, string> = {
  running: 'En cours',
  ok: 'Terminé',
  partial: 'Partiel',
  error: 'Erreur',
};

export function runStatusLabel(status: string): string {
  return RUN_STATUS_LABELS[status] ?? status;
}

export function relationLabel(relation: string): string {
  return RELATION_LABELS[relation as LinkRelation] ?? relation;
}

const POSITION_LABELS: Record<string, string> = {
  pour: 'Pour',
  contre: 'Contre',
  abstention: 'Abstention',
  'non-votant': 'Non-votant',
};

/** Position publiée par l'institution pour un groupe, jamais une déduction. */
export function positionLabel(value: string | null | undefined): string {
  if (!value) return 'Non publiée';
  return POSITION_LABELS[String(value).toLowerCase()] ?? String(value);
}

/** « Police et sécurité » → « police-et-securite » : adresse stable d'une rubrique. */
export function topicSlug(topic: string): string {
  return topic
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Retrouve le libellé exact à partir de l'adresse : jamais deviné, seulement retrouvé. */
export function findTopicBySlug(topics: string[], slug: string): string | null {
  return topics.find((topic) => topicSlug(topic) === slug) ?? null;
}

export function methodLabel(method: string): string {
  return METHOD_LABELS[method as LinkMethod] ?? method;
}

/** A calendar date (`occurred_at`, `published_at`): no timezone shift. */
export function formatDate(value: string | null | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** A provenance timestamp: shown in UTC, always explicit. */
export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return `${date.toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' })} UTC`;
}

export function truncate(text: string | null | undefined, length = 220): string {
  if (!text) return '';
  const clean = text.trim();
  return clean.length > length ? `${clean.slice(0, length - 1).trimEnd()}…` : clean;
}
