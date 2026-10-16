"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chiffres du registre, comptés à l'affichage. Les valeurs sont passées par le
 * serveur : rien n'est calculé côté navigateur, seulement animé. Un chiffre qui
 * ne s'anime pas (une moyenne, par exemple) passe par `display` : il s'affiche
 * tel qu'il a été calculé, sans défilement.
 */
function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (node === null || value === 0) {
      setShown(value);
      return;
    }
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setShown(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) {
        return;
      }
      observer.disconnect();
      const started = performance.now();
      const duration = 780;
      const step = (now: number) => {
        const progress = Math.min(1, (now - started) / duration);
        setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) {
          frame = requestAnimationFrame(step);
        }
      };
      frame = requestAnimationFrame(step);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}

export default function StatBand({
  stats,
}: {
  stats: { label: string; value?: number; suffix?: string; display?: string; hint?: string }[];
}) {
  return (
    <div className="pp-stats pp-marks">
      {stats.map((stat) => (
        <div key={stat.label} className="pp-stat">
          <p className="pp-stat-value text-ink" title={stat.hint}>
            {stat.display !== undefined ? (
              stat.display
            ) : (
              <>
                <CountUp value={stat.value ?? 0} />
                {stat.suffix ?? ""}
              </>
            )}
          </p>
          <p className="pp-stat-label mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
