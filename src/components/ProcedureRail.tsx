"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Index de procédure : le plan du dossier, numéroté comme un dossier de greffe,
 * qui suit le lecteur pendant le défilement. Les numéros sont ceux de la
 * séquence réelle des sections — pas une décoration.
 *
 * Le rail n'apparaît que sur grand écran (le CSS le réserve aux largeurs où il
 * y a la place) ; ailleurs, le sommaire horizontal du dossier reste seul.
 */
export default function ProcedureRail({
  entries,
}: {
  entries: { href: string; label: string }[];
}) {
  const [active, setActive] = useState<string>(entries[0]?.href ?? "");
  const watching = useRef<Set<string>>(new Set());
  const key = entries.map((entry) => entry.href).join("|");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }
    const targets = entries
      .map((entry) => document.querySelector<HTMLElement>(entry.href))
      .filter((node): node is HTMLElement => node !== null);
    if (targets.length === 0) {
      return;
    }

    const seen = watching.current;
    const observer = new IntersectionObserver(
      (observations) => {
        for (const observation of observations) {
          const id = `#${observation.target.id}`;
          if (observation.isIntersecting) {
            seen.add(id);
          } else {
            seen.delete(id);
          }
        }
        const first = entries.find((entry) => seen.has(entry.href));
        if (first !== undefined) {
          setActive(first.href);
        }
      },
      { rootMargin: "-72px 0px -62% 0px", threshold: 0 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
    // `key` résume les entrées : l'observateur se rattache une fois par plan.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <aside className="pp-rail" aria-label="Index de procédure">
      <p className="pp-rail__title">Index de procédure</p>
      <ol>
        {entries.map((entry, index) => (
          <li key={entry.href}>
            <a href={entry.href} data-active={active === entry.href ? "true" : "false"}>
              <span className="pp-rail__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")} /
              </span>
              <span>{entry.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
