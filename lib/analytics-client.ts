import { analyticsMeasurementId, analyticsPage, CONSENT_MAX_AGE_MS, parseConsent } from './consent.ts';

type AnalyticsWindow = Window & {
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
} & Partial<Record<`ga-disable-${string}`, boolean>>;

let activeId: string | null = null;
let lastPath: string | null = null;
let lastLocation = '';
const SCRIPT_ID = 'preuve-publique-analytics';

/** Called exclusively after an affirmative, unexpired choice. */
export function trackPage(measurementId: string, pathname: string, rawConsent: string | null) {
  if (!parseConsent(rawConsent)?.analytics) return;
  const id = analyticsMeasurementId(measurementId);
  const page = analyticsPage(pathname);
  if (!id || !page) return;
  const analyticsWindow = window as unknown as AnalyticsWindow;
  const location = `${window.location.origin}${page.path}`;

  if (!activeId) {
    activeId = id;
    analyticsWindow[`ga-disable-${id}`] = false;
    analyticsWindow.dataLayer = [];
    analyticsWindow.gtag = function () { analyticsWindow.dataLayer?.push(arguments); };
    analyticsWindow.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    });
    analyticsWindow.gtag('consent', 'update', { analytics_storage: 'granted' });
    analyticsWindow.gtag('set', 'ads_data_redaction', true);
    analyticsWindow.gtag('set', 'url_passthrough', false);
    analyticsWindow.gtag('js', new Date());
    analyticsWindow.gtag('config', id, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      debug_mode: ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname),
      page_location: location,
      page_referrer: '',
      page_title: page.title,
      cookie_expires: CONSENT_MAX_AGE_MS / 1000,
      cookie_update: false,
      cookie_path: '/',
      cookie_flags: 'SameSite=Lax;Secure',
    });
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
  }
  if (activeId !== id || lastPath === pathname) return;
  analyticsWindow.gtag?.('set', { page_location: location, page_title: page.title, page_referrer: lastLocation });
  analyticsWindow.gtag?.('event', 'page_view', {
    send_to: id, page_location: location, page_title: page.title, page_referrer: lastLocation,
  });
  lastPath = pathname;
  lastLocation = location;
}

/** No request to Google on refusal. Reload afterwards to unload an active tag. */
export function stopAnalytics(): boolean {
  const analyticsWindow = window as unknown as AnalyticsWindow;
  if (activeId) analyticsWindow[`ga-disable-${activeId}`] = true;
  document.getElementById(SCRIPT_ID)?.remove();
  if (analyticsWindow.dataLayer) analyticsWindow.dataLayer.length = 0;
  analyticsWindow.gtag = undefined;
  const domains = window.location.hostname.split('.');
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0];
    if (name !== '_ga' && !name.startsWith('_ga_')) continue;
    const expired = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = expired;
    for (let i = 0; i < domains.length - 1; i++) {
      const domain = domains.slice(i).join('.');
      document.cookie = `${expired}; Domain=${domain}`;
      document.cookie = `${expired}; Domain=.${domain}`;
    }
  }
  return activeId !== null;
}
