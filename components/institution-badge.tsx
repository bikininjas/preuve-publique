import { institutionLabel } from '@/lib/labels';
import type { Institution } from '@/lib/types';

/** The name conveys the distinction even without the institution's colour. */
export function InstitutionBadge({ institution }: { institution: Institution | null }) {
  if (!institution) return null;
  return <span className="institution-badge" data-institution={institution}>{institutionLabel(institution)}</span>;
}
