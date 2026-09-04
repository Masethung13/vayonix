import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/vayonix-logo-og.png';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  const isAboutPage = location.pathname === '/about';
  const isServicesPage = location.pathname === '/services';
  const isBlogsPage = location.pathname === '/blogs' || location.pathname === '/blog';
  const isContactPage = location.pathname === '/contact';
  const isHomePage = location.pathname === '/' && !location.hash;

  const navLinks = [
    {
      name: 'Home',
      path: '/',
      desc: 'Overview & Highlights',
      isHash: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      name: 'About Us',
      path: '/about',
      desc: 'Who We Are & Our Mission',
      isHash: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      name: 'Services',
      path: '/services',
      desc: 'Digital & Growth Solutions',
      isHash: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      name: 'Blogs',
      path: '/blogs',
      desc: 'Articles & Tech Insights',
      isHash: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <line x1="9" y1="11" x2="15" y2="11" />
        </svg>
      ),
    },
    {
      name: 'Contact',
      path: '/contact',
      desc: 'Start Your Project',
      isHash: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  // Prevent body scrolling when mobile/tablet menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-locked');
    } else {
      document.body.classList.remove('menu-locked');
    }
    return () => {
      document.body.classList.remove('menu-locked');
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Ultra-smooth scroll detection & smart show/hide on scroll direction
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
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
            const progress = (currentScrollY / totalScroll) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
          } else {
            setScrollProgress(0);
          }

          setScrolled(currentScrollY > 15);

          // Smart Hide on Scroll Down / Ultra-Smooth Reveal on Scroll Up & Top
          if (!mobileMenuOpen) {
            // If near top of page (e.g. scrolling up to top), ensure header is always visible
            if (currentScrollY <= 40) {
              setVisible(true);
            } else {
              const diff = currentScrollY - lastScrollY.current;
              // Scrolling down significantly -> smoothly slide away
              if (diff > 8) {
                setVisible(false);
              } 
              // Scrolling up smoothly -> reveal header
              else if (diff < -6) {
                setVisible(true);
              }
            }
          }

          lastScrollY.current = Math.max(0, currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname, mobileMenuOpen]);

  const checkIsActive = (path) => {
    if (path === '/about') return isAboutPage;
    if (path === '/services') return isServicesPage;
    if (path === '/blogs') return isBlogsPage;
    if (path === '/contact') return isContactPage;
    if (path === '/') return isHomePage;
    return false;
  };

  return (
    <>
      {/* 🚀 Top-Fixed Viewport Laser Progress Line */}
      <div className="header-scroll-progress-container" aria-hidden="true">
        <div
          className="header-progress-ambient-bloom"
          style={{ width: `${scrollProgress}%` }}
        />
        <div
          className="header-scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        >
          <div className="header-progress-laser-pulse" />
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

      <header
        className={`site-header ${scrolled ? 'header-scrolled' : ''} ${
          visible || mobileMenuOpen ? 'header-visible' : 'header-hidden'
        } ${mobileMenuOpen ? 'header-menu-active' : ''}`}
      >
        <div className="header-container">
          {/* Brand Logo */}
          <Link
            to="/"
            className="header-logo-link"
            aria-label="Vayonix Home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="header-logo-wrapper">
              <div className="logo-glow-aura" />
              <img src={logo} alt="Vayonix Logo" className="header-logo-img" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            <ul className="nav-list">
              {navLinks.map((link) => {
                const isActive = checkIsActive(link.path);
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

          {/* Header Action & Mobile Hamburger */}
          <div className="header-action">
            <Link to="/contact" className="cta-button desktop-cta">
              <span>Get Started</span>
              <span className="vyn-btn-arrow-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 19" className="vyn-btn-arrow-svg">
                  <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
                </svg>
              </span>
            </Link>

            {/* Futuristic Animated Hamburger Toggle Button */}
            <button
              type="button"
              className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="toggle-btn-glow" />
              <div className="hamburger-box">
                <span className="hamburger-line line-1" />
                <span className="hamburger-line line-2" />
                <span className="hamburger-line line-3" />
              </div>
            </button>
          </div>
        </div>

        {/* =========================================================================
            Futuristic Mobile & Tablet Glassmorphic Navigation Drawer
            ========================================================================= */}
        <div
          className={`mobile-backdrop-overlay ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="drawer-ambient-glow glow-1" />
          <div className="drawer-ambient-glow glow-2" />

          <div className="mobile-nav-content">
            {/* Navigation Cards List */}
            <nav className="mobile-nav-menu" aria-label="Mobile Navigation">
              <ul className="mobile-nav-list">
                {navLinks.map((link, idx) => {
                  const isActive = checkIsActive(link.path);

                  return (
                    <li
                      key={link.name}
                      className="mobile-nav-item"
                      style={{ '--item-index': idx }}
                    >
                      {link.isHash ? (
                        <a
                          href={link.path}
                          className={`mobile-nav-card ${isActive ? 'active' : ''}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="nav-card-icon-box">
                            {link.icon}
                          </div>
                          <div className="nav-card-info">
                            <span className="nav-card-title">{link.name}</span>
                            <span className="nav-card-desc">{link.desc}</span>
                          </div>
                          <div className="nav-card-arrow">
                            {isActive ? (
                              <span className="nav-card-active-dot" />
                            ) : (
                              <svg viewBox="0 0 16 16" fill="none">
                                <path
                                  d="M6 12L10 8L6 4"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </a>
                      ) : (
                        <Link
                          to={link.path}
                          className={`mobile-nav-card ${isActive ? 'active' : ''}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="nav-card-icon-box">
                            {link.icon}
                          </div>
                          <div className="nav-card-info">
                            <span className="nav-card-title">{link.name}</span>
                            <span className="nav-card-desc">{link.desc}</span>
                          </div>
                          <div className="nav-card-arrow">
                            {isActive ? (
                              <span className="nav-card-active-dot" />
                            ) : (
                              <svg viewBox="0 0 16 16" fill="none">
                                <path
                                  d="M6 12L10 8L6 4"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom Section: Quick Contact & Social Strip */}
            <div className="mobile-drawer-footer">
              <div className="mobile-quick-socials">
                <span className="social-strip-label">Connect with us</span>
                <div className="social-pill-group">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-social-icon-btn"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-social-icon-btn"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-social-icon-btn"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-social-icon-btn"
                    aria-label="Twitter / X"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to maintain page layout flow with fixed header */}
      <div className="header-spacer" aria-hidden="true" />
    </>
  );
};

export default Header;