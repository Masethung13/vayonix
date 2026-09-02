import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 * Automatically watches all elements with `data-reveal="fade-up"`, `data-reveal="fade-left"`,
 * `data-reveal="fade-right"`, `data-reveal="zoom-in"`, or `.reveal-*` classes
 * and triggers smooth entrance animations every time they scroll into view.
 */
export const useScrollReveal = (threshold = 0.08) => {
  useEffect(() => {
    const selector = '[data-reveal], .reveal-fade-up, .reveal-fade-down, .reveal-fade-left, .reveal-fade-right, .reveal-zoom-in';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            // Smoothly remove class when scrolled far out so it re-triggers cleanly when scrolled back
            const rect = entry.target.getBoundingClientRect();
            if (rect.top > window.innerHeight || rect.bottom < 0) {
              entry.target.classList.remove('is-revealed');
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    // Watch for dynamic DOM updates
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold]);
};

export default useScrollReveal;
