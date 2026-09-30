import { ALLOWED_TRANSITIONS } from '@/lib/admin';
import { setReviewStatus } from '@/app/admin/actions';
import type { RowStatus } from '@/lib/types';

const BUTTON_LABELS: Record<RowStatus, string> = {
  draft: 'Remettre en brouillon',
  reviewed: 'Marquer relu',
  published: 'Publier',
};

/**
 * One form per allowed transition. The transition graph is the same as the
 * CLI's; the database checks it again on write.
 */
export function ReviewActions({
  table,
  id,
  status,
  back,
}: {
  table: 'evidence' | 'evidence_links';
  id: string;
  status: RowStatus;
  back: string;
}) {
  return (
    <div className="actions">
      {ALLOWED_TRANSITIONS[status].map((target) => (
        <form action={setReviewStatus} key={target}>
          <input type="hidden" name="table" value={table} />
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="status" value={target} />
          <input type="hidden" name="back" value={back} />
          <button className={`mini ${target}`} type="submit">
            {BUTTON_LABELS[target]}
          </button>
        </form>
      ))}
    </div>
  );
}
