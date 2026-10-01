import type { ReactNode } from 'react';
import { institutionLabel, kindLabel, statusLabel } from '@/lib/labels';
import { EVIDENCE_KINDS, INSTITUTIONS, ROW_STATUSES } from '@/lib/types';

/** Toolbar form and fields shared by every list page (public and admin). */

export function FilterForm({ action, children }: { action: string; children: ReactNode }) {
  return (
    <form className="toolbar" method="get" action={action}>
      {children}
      <button className="button" type="submit">
        Filtrer
      </button>
    </form>
  );
}

function Field({ label, children, grow }: { label: string; children: ReactNode; grow?: boolean }) {
  return (
    <label className={`field${grow ? ' grow' : ''}`}>
      {label}
      {children}
    </label>
  );
}

export function SearchField({
  value,
  label = 'Recherche',
  placeholder = 'titre, extrait…',
}: {
  value: string;
  label?: string;
  placeholder?: string;
}) {
  return (
    <Field label={label} grow>
      <input type="search" name="q" defaultValue={value} placeholder={placeholder} />
    </Field>
  );
}

export function KindSelect({ value }: { value?: string }) {
  return (
    <Field label="Type">
      <select name="kind" defaultValue={value ?? ''}>
        <option value="">Tous</option>
        {EVIDENCE_KINDS.map((kind) => (
          <option value={kind} key={kind}>
            {kindLabel(kind)}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function InstitutionSelect({ value }: { value?: string }) {
  return (
    <Field label="Institution">
      <select name="institution" defaultValue={value ?? ''}>
        <option value="">Toutes</option>
        {INSTITUTIONS.map((institution) => (
          <option value={institution} key={institution}>
            {institutionLabel(institution)}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function StatusSelect({ value }: { value: string }) {
  return (
    <Field label="Statut">
      <select name="status" defaultValue={value}>
        <option value="all">Tous</option>
        {ROW_STATUSES.map((status) => (
          <option value={status} key={status}>
            {statusLabel(status)}
          </option>
        ))}
      </select>
    </Field>
  );
}

/** Rubriques publiées par les sources : la liste vient du comptage public, jamais d'un vocabulaire local. */
export function TopicSelect({ value, topics }: { value?: string; topics: Array<{ topic: string; pieces: number }> }) {
  if (!topics.length) return null;
  return (
    <Field label="Rubrique">
      <select name="topic" defaultValue={value ?? ''}>
        <option value="">Toutes</option>
        {topics.map((row) => (
          <option value={row.topic} key={row.topic}>
            {row.topic} ({row.pieces})
          </option>
        ))}
      </select>
    </Field>
  );
}
