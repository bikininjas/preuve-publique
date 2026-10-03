'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function ReadingProgress() {
  const pathname = usePathname();
  const chrome = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = chrome.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.max(0, Math.min(1, window.scrollY / height)) : 0;
      element.style.setProperty('--reading-progress', progress.toFixed(4));
      element.toggleAttribute('data-show-top', window.scrollY > Math.max(450, window.innerHeight * 0.75));
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    document.addEventListener('visibilitychange', schedule);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [pathname]);

  const returnToTop = () => {
    document.getElementById('contenu')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  return <div ref={chrome} className="reading-chrome">
    <div className="reading-progress-track" aria-hidden="true"><div /></div>
    <button type="button" className="reading-back-top" onClick={returnToTop} aria-label="Revenir en haut de la page" title="Revenir en haut de la page">
      <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" focusable="false"><circle className="reading-ring-track" cx="22" cy="22" r="19" /><circle className="reading-ring-value" cx="22" cy="22" r="19" pathLength="100" /><path className="reading-arrow" d="m16 21 6-6 6 6M22 15v14" /></svg>
    </button>
  </div>;
}
