'use client';

import { useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

const THEME_CHANGE_EVENT = 'preuve-publique-theme-change';
const getTheme = (): Theme => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
const getServerTheme = (): Theme => 'dark';

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      document.documentElement.dataset.theme = event.newValue === 'light' ? 'light' : 'dark';
      onChange();
    }
  };
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const dark = theme === 'dark';

  function toggleTheme() {
    const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // The switch still works when persistent storage is unavailable.
    }
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button className="theme-toggle" type="button" role="switch" aria-checked={dark}
      aria-label="Thème sombre" title={`Activer le thème ${dark ? 'clair' : 'sombre'}`} onClick={toggleTheme}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark ? <path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>}
      </svg>
      <span className="theme-label" aria-hidden="true">{dark ? 'Sombre' : 'Clair'}</span>
      <span className="theme-track" aria-hidden="true"><span /></span>
    </button>
  );
}
