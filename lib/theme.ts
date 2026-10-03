export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'preuve-publique-theme';

// Run in the document head before the body paints; keep public pages cacheable.
export const THEME_INIT_SCRIPT = `try{document.documentElement.dataset.theme=localStorage.getItem('${THEME_STORAGE_KEY}')==='light'?'light':'dark'}catch{}`;
