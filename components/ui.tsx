import Link from 'next/link';
import type { ReactNode } from 'react';
import { runStatusLabel, statusLabel } from '@/lib/labels';

/**
 * Small building blocks shared by the public pages and the review space.
 * Everything here is a server component: no state, no client JavaScript.
 */

export function Notice({ kind = 'warn', children }: { kind?: 'ok' | 'warn'; children: ReactNode }) {
  return <div className={`notice ${kind}`}>{children}</div>;
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="empty">{children}</p>;
}

export function StatusBadge({ status }: { status: string }) {
  return <span className={`badge ${status}`}>{statusLabel(status)}</span>;
}

export function RunStatusBadge({ status }: { status: string }) {
  return <span className={`badge run-${status}`}>{runStatusLabel(status)}</span>;
}

export function DataTable({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {head.map((label) => (
            <th scope="col" key={label}>
              {label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export function Pager({
  page,
  pageCount,
  hrefFor,
}: {
  page: number;
  pageCount: number;
  hrefFor: (page: number) => string;
}) {
  if (pageCount <= 1) return null;
  return (
    <nav className="pager">
      {page > 1 ? <Link href={hrefFor(page - 1)}>← Précédent</Link> : <span />}
      <span>
        Page {page} sur {pageCount}
      </span>
      {page < pageCount ? <Link href={hrefFor(page + 1)}>Suivant →</Link> : <span />}
    </nav>
  );
}

export interface MetaEntry {
  term: string;
  children: ReactNode;
}

/** Definition grid used for provenance on both the public and the admin side. */
export function MetaList({ items }: { items: MetaEntry[] }) {
  return (
    <dl className="meta">
      {items.map((item, index) => (
        <div key={`${index}-${item.term}`}>
          <dt>{item.term}</dt>
          <dd>{item.children}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Verbatim excerpt: never reworded, always attributed to its source below. */
export function Citation({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <blockquote className="citation">
      <p>{children}</p>
      {footer ? <footer>{footer}</footer> : null}
    </blockquote>
  );
}

export function RawJson({ summary, value }: { summary: string; value: unknown }) {
  return (
    <details className="raw">
      <summary>{summary}</summary>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </details>
  );
}

export interface QueueProps<T> {
  /** Null when the read failed; the queue then shows a warning instead. */
  items: T[] | null;
  total: number;
  page: number;
  pageCount: number;
  noun: string;
  hrefFor: (page: number) => string;
  head: string[];
  renderRow: (item: T) => ReactNode;
  empty: ReactNode;
  failedText: string;
}

/**
 * A paginated review queue: count line, table, pager, empty and failure
 * states. Used by the pieces queue and the links queue.
 */
export function Queue<T>({ items, total, page, pageCount, noun, hrefFor, head, renderRow, empty, failedText }: QueueProps<T>) {
  if (!items) return <Notice>{failedText}</Notice>;
  if (!items.length) return <Empty>{empty}</Empty>;
  return (
    <>
      <p className="resultline">
        {total.toLocaleString('fr-FR')} {noun}
        {total > 1 ? 's' : ''} · page {page} sur {pageCount}
      </p>
      <DataTable head={head}>{items.map(renderRow)}</DataTable>
      <Pager page={page} pageCount={pageCount} hrefFor={hrefFor} />
    </>
  );
}
