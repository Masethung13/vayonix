import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/vayonix-logo1.png';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isAboutPage = location.pathname === '/about';
  const isServicesPage = location.pathname === '/services';
  const isBlogsPage = location.pathname === '/blogs' || location.pathname === '/blog';
  // const isDedicatedPage = isAboutPage || isServicesPage || isBlogsPage;

  const navLinks = [
    { name: 'Home', path: '/', isHash: false },
    { name: 'About Us', path: '/about', isHash: false },
    { name: 'Services', path: '/services', isHash: false },
    { name: 'Blogs', path: '/blogs', isHash: false },
    { name: 'Contact', path: '/contact' , isHash: false },
  ];

  // Ultra-smooth scroll detection & progress interpolation
  useEffect(() => {
    let animationFrameId = null;

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const winScroll =
          window.scrollY ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          (document.scrollingElement && document.scrollingElement.scrollTop) ||
          0;

        const docHeight = Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
          document.documentElement.offsetHeight,
          document.body.offsetHeight
        );

        const winHeight = window.innerHeight || document.documentElement.clientHeight;
        const totalScroll = docHeight - winHeight;

        if (totalScroll > 0) {
          const progress = (winScroll / totalScroll) * 100;
          setScrollProgress(Math.min(100, Math.max(0, progress)));
        } else {
          setScrollProgress(0);
        }

        setScrolled(winScroll > 15);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial computation

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  return (
    <>
      {/* 🚀 Top-Fixed Viewport Laser Progress Line (Ultra-Smooth Animation) */}
      <div className="header-scroll-progress-container" aria-hidden="true">
        {/* Ambient Underglow Bloom */}
        <div
          className="header-progress-ambient-bloom"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Primary Laser Core Bar */}
        <div
          className="header-scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Continuous Flowing Plasma Energy Beam */}
          <div className="header-progress-laser-pulse" />

          {/* Supernova Diamond Prism Star Tip */}
          <div
            className={`header-progress-prism-edge ${
              scrollProgress > 1 ? 'is-visible' : ''
            }`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="prism-spark-svg">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <div className="prism-glow-burst" />
          </div>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-container">
          {/* Brand Logo with 3D Radiant Glow on Hover */}
          <Link to="/" className="header-logo-link" aria-label="Vayonix Home">
            <div className="header-logo-wrapper">
              <div className="logo-glow-aura" />
              <img src={logo} alt="Vayonix Logo" className="header-logo-img" />
            </div>
          </Link>

          {/* Clean Open Modern Navigation */}
          <nav className="header-nav">
            <ul className="nav-list">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/about'
                    ? isAboutPage
                    : link.path === '/services'
                    ? isServicesPage
                    : link.path === '/blogs'
                    ? isBlogsPage
                    : link.path === '/'
                    ? location.pathname === '/' && !location.hash
                    : false;

                return (
                  <li key={link.name} className="nav-item">
                    {link.isHash ? (
                      <a
                        href={link.path}
                        className={`nav-link ${isActive ? 'active' : ''}`}
                      >
                        <span className="nav-link-title">{link.name}</span>
                        <span className="nav-hover-bar" />
                        <span className="nav-glow-bloom" />
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className={`nav-link ${isActive ? 'active' : ''}`}
                      >
                        <span className="nav-link-title">{link.name}</span>
                        <span className="nav-hover-bar" />
                        <span className="nav-glow-bloom" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Interactive CTA Button */}
          <div className="header-action">
            <Link to="/about" className="cta-button">
              <span>Get Started</span>
              <svg
                className="cta-arrow-icon"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="btn-glow-aura" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-line line-1" />
              <span className="hamburger-line line-2" />
              <span className="hamburger-line line-3" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            {navLinks.map((link, idx) => {
              const isActive =
                link.path === '/about'
                  ? isAboutPage
                  : link.path === '/services'
                  ? isServicesPage
                  : link.path === '/'
                  ? location.pathname === '/' && !location.hash
                  : false;

              return (
                <li
                  key={link.name}
                  className="mobile-nav-item"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  {link.isHash ? (
                    <a
                      href={link.path}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="mobile-active-badge">Active</span>}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="mobile-active-badge">Active</span>}
                    </Link>
                  )}
                </li>
              );
            })}
            <li className="mobile-nav-item mobile-cta-item">
              <Link
                to="/about"
                className="cta-button mobile-cta"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Get Started</span>
                <svg
                  className="cta-arrow-icon"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;