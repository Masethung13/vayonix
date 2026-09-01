import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import logo from '../assets/vayonix-logo1.png';

const Header = () => {
  const [activeNav, setActiveNav] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  // Scroll detection for compact navbar style & scroll progress loader
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Calculate percentage for header progress loader
      if (totalScroll > 0) {
        const progress = (currentScrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      setScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">

        {/* Brand Logo with 3D Radiant Glow on Hover */}
        <a href="#home" className="header-logo-link" aria-label="Vayonix Home">
          <div className="header-logo-wrapper">
            <div className="logo-glow-aura" />
            <img src={logo} alt="Vayonix Logo" className="header-logo-img" />
          </div>
        </a>

        {/* Clean Open Modern Navigation (No Box Container) */}
        <nav className="header-nav">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeNav === link.name;
              return (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveNav(link.name)}
                  >
                    <span className="nav-link-title">{link.name}</span>
                    <span className="nav-hover-bar" />
                    <span className="nav-glow-bloom" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Advanced Interactive CTA Button */}
        <div className="header-action">
          <a href="#get-started" className="cta-button">
            <span className="cta-button-text">Get Started</span>
            <div className="cta-icon-circle">
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
            </div>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>
        </div>
      </div>

      {/* Sleek Futuristic Glowing Laser Scroll Progress Loader */}
      <div className="header-scroll-progress-container" aria-hidden="true">
        {/* Ambient Underglow Bloom */}
        <div
          className="header-progress-ambient-bloom"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Primary Laser Core Bar with Cyber Diamond Prism Edge */}
        <div
          className="header-scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Continuous Flowing Plasma Energy Pulse */}
          <div className="header-progress-laser-pulse" />
          
          {/* Glowing Diamond Prism Star Tip */}
          <div className="header-progress-prism-edge">
            <svg viewBox="0 0 24 24" fill="currentColor" className="prism-spark-svg">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <div className="prism-glow-burst" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link, idx) => (
            <li
              key={link.name}
              className="mobile-nav-item"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <a
                href={link.href}
                className={`mobile-nav-link ${activeNav === link.name ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(link.name);
                  setMobileMenuOpen(false);
                }}
              >
                <span>{link.name}</span>
                {activeNav === link.name && <span className="mobile-active-badge">Active</span>}
              </a>
            </li>
          ))}
          <li className="mobile-nav-item mobile-cta-item">
            <a
              href="#get-started"
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
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
