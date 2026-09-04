import React, { useState, useEffect } from 'react';

const ThemeToggle = ({ id = "dn-toggle" }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vayonix_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const handleSync = () => {
      const current = localStorage.getItem('vayonix_theme') || 'dark';
      setTheme(current);
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('theme_change', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('theme_change', handleSync);
    };
  }, []);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const buttonEl = e.currentTarget;
    const rect = buttonEl.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    const updateTheme = () => {
      setTheme(nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
      document.body.className = `theme-${nextTheme} ${nextTheme}`;
      localStorage.setItem('vayonix_theme', nextTheme);
      window.dispatchEvent(new Event('theme_change'));
    };

    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        updateTheme();
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          {
            clipPath: clipPath
          },
          {
            duration: 750,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    } else {
      // Fallback expanding circular ripple wave
      const wave = document.createElement('div');
      wave.className = `theme-ripple-wave ${nextTheme === 'dark' ? 'to-dark' : 'to-light'}`;
      wave.style.setProperty('--circle-x', `${x}px`);
      wave.style.setProperty('--circle-y', `${y}px`);
      document.body.appendChild(wave);
      updateTheme();
      setTimeout(() => {
        if (wave && wave.parentNode) {
          wave.parentNode.removeChild(wave);
        }
      }, 800);
    }
  };

  return (
    <div
      className="toggleWrapper"
      onClick={handleToggle}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleToggle(e);
        }
      }}
    >
      <input
        className="input"
        id={id}
        type="checkbox"
        checked={theme === 'dark'}
        onChange={() => {}}
        aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
      />
      <label className="toggle" htmlFor={id} onClick={(e) => e.stopPropagation()}>
        <span className="toggle__handler">
          <span className="crater crater--1"></span>
          <span className="crater crater--2"></span>
          <span className="crater crater--3"></span>
        </span>
        <span className="star star--1"></span>
        <span className="star star--2"></span>
        <span className="star star--3"></span>
        <span className="star star--4"></span>
        <span className="star star--5"></span>
        <span className="star star--6"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
