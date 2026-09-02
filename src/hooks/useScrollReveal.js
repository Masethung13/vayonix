import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollReveal Hook
 * Automatically watches all elements with `data-reveal="fade-up"`, `data-reveal="fade-left"`,
 * `data-reveal="fade-right"`, `data-reveal="zoom-in"`, or `.reveal-*` classes
 * and triggers smooth entrance animations every time they scroll into view or dynamic filters change.
 */
export const useScrollReveal = (threshold = 0.05) => {
  let location = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    location = useLocation();
  } catch (e) {
    location = null;
  }

  const pathname = location?.pathname || '';

  useEffect(() => {
    const selector = '[data-reveal], .reveal-fade-up, .reveal-fade-down, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in';

    let isMounted = true;
    let observer = null;

    // Immediately reveal elements that are inside or near the current viewport
    const revealInViewElements = () => {
      if (!isMounted) return;
      const elements = document.querySelectorAll(selector);
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      elements.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // If element is in viewport, reveal it immediately
        if (rect.top < windowHeight * 0.98 && rect.bottom > -50) {
          el.classList.add('is-revealed');
        }
        if (observer) {
          observer.observe(el);
        }
      });
    };

    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (!isMounted) return;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
            } else {
              // Smoothly remove class when scrolled far away so it re-animates when scrolled back
              const rect = entry.target.getBoundingClientRect();
              const windowHeight = window.innerHeight || document.documentElement.clientHeight || 800;
              if (rect.top > windowHeight || rect.bottom < 0) {
                entry.target.classList.remove('is-revealed');
              }
            }
          });
        },
        {
          threshold,
          rootMargin: '0px 0px 40px 0px',
        }
      );

      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el && observer) {
          observer.observe(el);
        }
      });

      // Run multiple initial passes so headers/banners and filtered items are never black or delayed
      revealInViewElements();
      requestAnimationFrame(revealInViewElements);
      const timer1 = setTimeout(revealInViewElements, 60);
      const timer2 = setTimeout(revealInViewElements, 200);

      window.addEventListener('scroll', revealInViewElements, { passive: true });
      window.addEventListener('resize', revealInViewElements, { passive: true });

      return () => {
        isMounted = false;
        clearTimeout(timer1);
        clearTimeout(timer2);
        window.removeEventListener('scroll', revealInViewElements);
        window.removeEventListener('resize', revealInViewElements);
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      };
    } catch (e) {
      // Fallback in case of any error: reveal all elements
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => el.classList.add('is-revealed'));
    }
  }, [threshold, pathname]);
};

export default useScrollReveal;
