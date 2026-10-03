'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_TARGETS = '.page-intro, .document-heading, .section-heading, .topic-tile, .evidence-card, .party-profile-card, .editorial-feature, .group-editorial-hero, .polls-hero, .candidate-hero, .presidential-entry-grid > .panel';

/** Decorative enhancement only: server-rendered content is always visible. */
export function VisualEffects({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isPublic = !/^\/(admin|auth)(\/|$)/.test(pathname);

  useEffect(() => {
    const surface = root.current;
    if (!surface || !isPublic) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine)');
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    let hero = surface.querySelector<HTMLElement>('.evidence-hero');
    let decor = hero?.querySelector<HTMLElement>('.hero-atmosphere');
    let frame = 0;
    let heroVisible = false;
    let revealObserver: IntersectionObserver | undefined;
    let heroObserver: IntersectionObserver | undefined;

    const updateParallax = () => {
      frame = 0;
      if (!hero || !decor || !heroVisible || reducedMotion.matches || !desktop.matches || document.hidden) return;
      const offset = Math.max(0, Math.min(600, window.scrollY));
      decor.style.setProperty('--parallax-near', `${(offset * 0.12).toFixed(1)}px`);
      decor.style.setProperty('--parallax-far', `${(offset * -0.06).toFixed(1)}px`);
    };
    const scheduleParallax = () => {
      if (!frame && heroVisible && desktop.matches && !reducedMotion.matches && !document.hidden) {
        frame = window.requestAnimationFrame(updateParallax);
      }
    };
    const clearMotion = () => {
      revealObserver?.disconnect();
      heroObserver?.disconnect();
      window.cancelAnimationFrame(frame);
      frame = 0;
      heroVisible = false;
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      decor?.style.removeProperty('--parallax-near');
      decor?.style.removeProperty('--parallax-far');
    };
    const configureMotion = () => {
      clearMotion();
      if (reducedMotion.matches || typeof IntersectionObserver === 'undefined') return;

      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealObserver?.unobserve(entry.target);
          if (seen.has(entry.target)) return;
          seen.add(entry.target);
          // Never delay or obscure an anchor target or a keyboard interaction.
          if (entry.target.contains(document.activeElement) || window.location.hash) return;
          const animation = entry.target.animate([
            { opacity: 0.65, transform: 'translateY(14px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 480, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: 0.08 });
      surface.querySelectorAll(REVEAL_TARGETS).forEach((element) => {
        if (!seen.has(element)) revealObserver?.observe(element);
      });

      if (hero && decor && desktop.matches) {
        heroObserver = new IntersectionObserver(([entry]) => {
          heroVisible = entry.isIntersecting;
          scheduleParallax();
        });
        heroObserver.observe(hero);
      }
    };
    const onFocus = (event: FocusEvent) => {
      animations.forEach((animation) => {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        if (target instanceof Element && event.target instanceof Node && target.contains(event.target)) {
          animation.cancel();
          animations.delete(animation);
        }
      });
    };

    // Query changes and streamed pages can replace content without remounting a layout.
    const contentObserver = new MutationObserver((mutations) => {
      const nextHero = surface.querySelector<HTMLElement>('.evidence-hero');
      if (nextHero !== hero) {
        clearMotion();
        hero = nextHero;
        decor = hero?.querySelector<HTMLElement>('.hero-atmosphere');
        configureMotion();
      }
      if (reducedMotion.matches) return;
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          revealObserver?.unobserve(node);
          node.querySelectorAll(REVEAL_TARGETS).forEach((element) => revealObserver?.unobserve(element));
        });
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(REVEAL_TARGETS) && !seen.has(node)) revealObserver?.observe(node);
          node.querySelectorAll(REVEAL_TARGETS).forEach((element) => {
            if (!seen.has(element)) revealObserver?.observe(element);
          });
        });
      });
    });

    configureMotion();
    contentObserver.observe(surface, { childList: true, subtree: true });
    reducedMotion.addEventListener('change', configureMotion);
    desktop.addEventListener('change', configureMotion);
    window.addEventListener('scroll', scheduleParallax, { passive: true });
    window.addEventListener('resize', scheduleParallax, { passive: true });
    document.addEventListener('visibilitychange', scheduleParallax);
    surface.addEventListener('focusin', onFocus);
    return () => {
      clearMotion();
      contentObserver.disconnect();
      reducedMotion.removeEventListener('change', configureMotion);
      desktop.removeEventListener('change', configureMotion);
      window.removeEventListener('scroll', scheduleParallax);
      window.removeEventListener('resize', scheduleParallax);
      document.removeEventListener('visibilitychange', scheduleParallax);
      surface.removeEventListener('focusin', onFocus);
    };
  }, [pathname, isPublic]);

  return <div ref={root} className={isPublic ? 'visual-surface' : undefined}>{children}</div>;
}
