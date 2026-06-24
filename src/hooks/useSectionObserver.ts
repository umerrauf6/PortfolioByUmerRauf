import { useEffect } from 'react';
import { useGalaxyStore, type SectionId } from '../store/useGalaxyStore';

const SECTION_IDS: SectionId[] = ['hero', 'about', 'skills', 'projects', 'contact'];

/**
 * Reads window.scrollY on every scroll event and compares the vertical
 * midpoint of the viewport against each section's bounding box.
 * This works regardless of section height (even 300vh sticky sections).
 * Re-runs when appLoaded flips true so newly-mounted sections are detectable.
 */
export function useSectionObserver() {
  const setSection = useGalaxyStore((s) => s.setSection);
  const appLoaded  = useGalaxyStore((s) => s.appLoaded);

  useEffect(() => {
    let rafId: number;
    let lastSection: SectionId | null = null;

    const detect = () => {
      const mid = window.scrollY + window.innerHeight * 0.5;
      const isTransitioning = useGalaxyStore.getState().isTransitioning;
      if (isTransitioning) return;

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (mid >= top && mid < bottom) {
          if (lastSection !== id) {
            lastSection = id;
            setSection(id);
          }
          break;
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(detect);
    };

    // Run once immediately so hero fires on first load,
    // and again after appLoaded so newly-mounted sections register.
    detect();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSection, appLoaded]);  // re-run when sections mount after loading animation
}
