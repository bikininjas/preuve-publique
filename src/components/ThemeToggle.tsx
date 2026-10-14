"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "preuve-publique-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");
  }, []);

  function apply(next: Theme) {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* stockage refusé : le thème vaut pour la visite en cours */
    }
  }

  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => apply(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Passer au thème papier" : "Passer au thème chambre noire"}
      title={theme === "dark" ? "Thème papier d'archive" : "Thème chambre noire"}
      className="inline-flex items-center gap-2 border border-grid px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition hover:bg-surface2"
    >
      <Icon size={13} aria-hidden="true" />
      {theme === "dark" ? "PAPIER" : "NOIRE"}
    </button>
  );
}
