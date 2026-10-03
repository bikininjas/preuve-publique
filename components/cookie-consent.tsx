'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { stopAnalytics, trackPage } from '@/lib/analytics-client';
import {
  analyticsMeasurementId, analyticsPage, CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY,
  createConsent, parseConsent,
} from '@/lib/consent';

let sessionChoice: string | null = null;
const LEGACY_CHOICE_KEY = 'preuve-publique-cookie-consent';

function getConsentSnapshot(): string | null {
  let raw = sessionChoice;
  try { raw ??= localStorage.getItem(CONSENT_STORAGE_KEY); } catch { /* Session choice only. */ }
  return parseConsent(raw) ? raw : null;
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === CONSENT_STORAGE_KEY || event.key === null) {
      sessionChoice = null;
      onChange();
    }
  };
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function CookieConsent() {
  const pathname = usePathname();
  const raw = useSyncExternalStore(subscribe, getConsentSnapshot, () => null);
  const consent = parseConsent(raw);
  const [measurementId, setMeasurementId] = useState<string | null>(null);
  const [configured, setConfigured] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const open = preferencesOpen || (configured && Boolean(measurementId) && !consent);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/analytics/config', { signal: controller.signal, credentials: 'omit', cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((value) => { setMeasurementId(analyticsMeasurementId(value.measurementId)); setConfigured(true); })
      .catch(() => { if (!controller.signal.aborted) setConfigured(true); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const choice = parseConsent(raw);
    if (!choice) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
        if (Date.now() < choice.expiresAt) schedule();
      }, Math.min(choice.expiresAt - Date.now(), 2_147_483_647));
    };
    schedule();
    return () => clearTimeout(timer);
  }, [raw]);

  useEffect(() => {
    if (!configured) return;
    if (measurementId && parseConsent(raw)?.analytics && analyticsPage(pathname)) {
      trackPage(measurementId, pathname, raw);
    } else if (stopAnalytics()) {
      // Removing a script alone cannot stop its timers or pending listeners.
      window.location.reload();
    }
  }, [configured, measurementId, pathname, raw]);

  useEffect(() => {
    if (preferencesOpen) dialog.current?.focus();
  }, [preferencesOpen]);

  function choose(analytics: boolean) {
    const reload = !analytics && stopAnalytics();
    sessionChoice = JSON.stringify(createConsent(analytics));
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, sessionChoice);
      localStorage.removeItem(LEGACY_CHOICE_KEY);
    } catch {
      // If persistence fails, remove an old agreement so a later reload cannot restore it.
      try { localStorage.removeItem(CONSENT_STORAGE_KEY); } catch { /* Storage unavailable. */ }
    }
    document.cookie = `${LEGACY_CHOICE_KEY}=; Max-Age=0; Path=/; SameSite=Lax${window.location.protocol === 'https:' ? '; Secure' : ''}`;
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    setPreferencesOpen(false);
    trigger.current?.focus();
    if (reload) window.location.reload();
  }

  function close() {
    setPreferencesOpen(false);
    trigger.current?.focus();
  }

  return (
    <>
      <button ref={trigger} type="button" className="cookie-preferences-link" onClick={() => setPreferencesOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
        Gérer mes cookies
      </button>
      {open ? (
        <div className="cookie-banner" role="dialog" aria-modal="false" aria-labelledby="cookie-title" aria-describedby="cookie-description" tabIndex={-1} ref={dialog} onKeyDown={(event) => { if (event.key === 'Escape' && consent) close(); }}>
          <div className="cookie-copy">
            <div className="eyebrow">Votre vie privée</div>
            <h2 id="cookie-title">La mesure d’audience, à votre choix.</h2>
            <p id="cookie-description">
              {measurementId ? 'Avec votre accord, preuve-publique et ses responsables utilisent Google Analytics pour connaître la fréquentation des pages et améliorer le site. Google reçoit des données de navigation et utilise des cookies. Le site reste accessible si vous refusez.' : 'La mesure d’audience Google Analytics est actuellement désactivée. Seuls les réglages nécessaires au site, comme votre thème et votre session de relecture, peuvent être conservés.'}
            </p>
            <p className="cookie-detail">{measurementId ? 'Votre choix est conservé 180 jours. Vous pouvez le modifier ou retirer votre accord à tout moment avec « Gérer mes cookies ».' : 'Consultez les informations sur les données personnelles et les cookies utilisés.'} <Link href="/confidentialite" prefetch={false}>Confidentialité et cookies</Link>.</p>
            {consent && measurementId ? <p className="cookie-current">Votre choix actuel : mesure d’audience {consent.analytics ? 'acceptée' : 'refusée'}.</p> : null}
          </div>
          <div className="cookie-actions">
            {measurementId ? <>
              <button type="button" onClick={() => choose(false)}>Tout refuser</button>
              <button type="button" onClick={() => choose(true)}>Tout accepter</button>
            </> : null}
            {consent || !measurementId ? <button className="cookie-close" type="button" onClick={close}>Fermer</button> : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
