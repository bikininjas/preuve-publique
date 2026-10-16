"use client";

import { useState } from "react";

import { PREMISE_STATUS_LABELS } from "@/lib/labels";
import type { Premise, PremiseStatus } from "@/lib/types";

const STATUSES: PremiseStatus[] = [
  "VRAI",
  "VRAI_DETOURNE",
  "CONFUSION_CONCEPTUELLE",
  "ANACHRONISME_CONCEPTUEL",
  "DOUBLE_STANDARD",
  "BIAIS_METHODOLOGIQUE",
  "BIAIS_DE_SELECTION",
  "COMPLOTISME",
  "BIAIS_ESSENTIALISTE",
  "FAUX",
];

const INPUT = "mt-1 min-h-[44px] w-full border border-grid bg-canvas px-3 text-ink";
const TEXTAREA = "mt-1 w-full border border-grid bg-canvas px-3 py-2 text-ink";
const FIELD = "pp-meta text-muted";

/**
 * Éditeur de briques d'affirmation : lignes ajoutables, déplaçables et
 * supprimables, statut choisi dans une liste. Le résultat part dans un champ
 * caché au format attendu par l'action serveur — le validateur Zod reste la
 * seule autorité sur ce qui est enregistré.
 */
export default function PremisesEditor({ initial }: { initial: Premise[] }) {
  const [rows, setRows] = useState<Premise[]>(
    initial.length > 0 ? initial : [{ claim_part: "", status: "FAUX", detail: "" }],
  );

  function update(index: number, patch: Partial<Premise>) {
    setRows((current) =>
      current.map((row, position) => (position === index ? { ...row, ...patch } : row)),
    );
  }

  function move(index: number, direction: -1 | 1) {
    setRows((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) {
        return current;
      }
      const copy = [...current];
      const [row] = copy.splice(index, 1);
      if (row === undefined) {
        return current;
      }
      copy.splice(target, 0, row);
      return copy;
    });
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="premises" value={JSON.stringify(rows)} />

      {rows.map((row, index) => (
        <fieldset key={index} className="space-y-3 border border-gridsoft p-3">
          <legend className="pp-meta px-1 text-muted">Brique {index + 1}</legend>

          <label className="block">
            <span className={FIELD}>Ce que dit l&apos;affirmation, sur ce point</span>
            <input
              className={INPUT}
              value={row.claim_part}
              onChange={(event) => update(index, { claim_part: event.target.value })}
              placeholder="Ex. : le sigle NSDAP contient le mot « socialiste »"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label>
              <span className={FIELD}>Statut de cette brique</span>
              <select
                className={INPUT}
                value={row.status}
                onChange={(event) =>
                  update(index, { status: event.target.value as PremiseStatus })
                }
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {PREMISE_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-wrap items-end gap-2">
              <button
                type="button"
                className="pp-btn"
                onClick={() => move(index, -1)}
                disabled={index === 0}
              >
                ↑ Monter
              </button>
              <button
                type="button"
                className="pp-btn"
                onClick={() => move(index, 1)}
                disabled={index === rows.length - 1}
              >
                ↓ Descendre
              </button>
              <button
                type="button"
                className="pp-btn"
                onClick={() =>
                  setRows((current) => current.filter((_, position) => position !== index))
                }
                disabled={rows.length === 1}
              >
                ✕ Retirer
              </button>
            </div>
          </div>

          <label className="block">
            <span className={FIELD}>Pourquoi ce statut, en une phrase vérifiable</span>
            <textarea
              className={TEXTAREA}
              rows={2}
              value={row.detail}
              onChange={(event) => update(index, { detail: event.target.value })}
            />
          </label>
        </fieldset>
      ))}

      <button
        type="button"
        className="pp-btn"
        onClick={() =>
          setRows((current) => [...current, { claim_part: "", status: "FAUX", detail: "" }])
        }
      >
        + Ajouter une brique
      </button>
    </div>
  );
}
