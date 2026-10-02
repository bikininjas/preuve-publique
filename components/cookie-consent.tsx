'use client';

import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY } from '@/lib/theme';

const COOKIE = 'preuve-publique-cookie-consent';
const STORAGE = COOKIE;
type Choice = 'accepted' | 'refused' | null;

function storedChoice(): Choice {
  try {
    const value = localStorage.getItem(STORAGE);
    return value === 'accepted' || value === 'refused' ? value : null;
  } catch { return null; }
}

function saveChoice(choice: Exclude<Choice, null>) {
  try {
    localStorage.setItem(STORAGE, choice);
    if (choice === 'refused') localStorage.removeItem(THEME_STORAGE_KEY);
  } catch { /* The choice still applies for this page. */ }
  document.cookie = `${COOKIE}=${choice}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
}

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice>(null);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setChoice(storedChoice());
  }, []);
  const decide = (value: Exclude<Choice, null>) => { saveChoice(value); setChoice(value); setOpen(false); };
  if (choice && !open) return null;
  return (
    <section className="cookie-consent" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <div>
        <p className="eyebrow">Vos choix</p>
        <h2 id="cookie-title">Des cookies essentiels, rien de plus.</h2>
        <p>Le site ne charge aucun traceur publicitaire ni mesure d’audience. Votre choix permet seulement de mémoriser le thème choisi ; vous pouvez le modifier à tout moment.</p>
      </div>
      <div className="cookie-actions">
        <button className="button secondary" type="button" onClick={() => decide('refused')}>Refuser</button>
        <button className="button" type="button" onClick={() => decide('accepted')}>Accepter</button>
      </div>
    </section>
  );
}

export function CookiePreferencesButton() {
  const [open, setOpen] = useState(false);
  const decide = (value: Exclude<Choice, null>) => { saveChoice(value); setOpen(false); };
  return <>
    <button className="footer-cookie-button" type="button" onClick={() => setOpen(true)}>Gérer les cookies</button>
    {open ? <section className="cookie-consent" role="dialog" aria-modal="false" aria-labelledby="cookie-settings-title">
      <div><p className="eyebrow">Vos choix</p><h2 id="cookie-settings-title">Préférences cookies</h2><p>Le site ne charge aucun traceur. Accepter autorise seulement la mémorisation de votre thème.</p></div>
      <div className="cookie-actions"><button className="button secondary" type="button" onClick={() => decide('refused')}>Refuser</button><button className="button" type="button" onClick={() => decide('accepted')}>Accepter</button></div>
    </section> : null}
  </>;
}
