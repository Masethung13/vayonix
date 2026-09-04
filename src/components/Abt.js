import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollTitle from './ScrollTitle';
import '../styles/Abt.css';
import bannerBg from '../assets/abt-banner-bg.jpg';
import abtBg from '../assets/abt-bg.png';
import abtBgLight from '../assets/abt-bg-light1.png';
import ThemeToggle from './ThemeToggle';

// Official Certification & Government Accreditation Logos
import logoMca from '../assets/mca.png';
import logoStartupIndia from '../assets/startup-india.png';
import logoStartupTn from '../assets/startup-tn.png';

const certifiedLogos = [
  { name: 'Ministry of Corporate Affairs', src: logoMca },
  { name: 'Startup India', src: logoStartupIndia },
  { name: 'Startup TN', src: logoStartupTn },
];

const Abt = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Theme State (Dark / Light) with LocalStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vayonix_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
  });

  // Apply theme to document element on change
  useEffect(() => {
    const handleSync = () => {
      const currentTheme = localStorage.getItem('vayonix_theme') || 'dark';
      setTheme(currentTheme);
    };
    window.addEventListener('theme_change', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('theme_change', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Bottom-to-Top Button Visibility & Progress
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 220);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.round((window.scrollY / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parallax mouse movement for 3D floating background spheres & neon splines
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth <= 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D Perspective Card Tilt
  const handleTilt = (e, setTilt) => {
    if (window.innerWidth <= 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const resetTilt = (setTilt) => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="abt-page-wrapper" id="about" ref={sectionRef}>

      {/* =====================================================================
          1. TOP BANNER: HERO HEADER WITH BREADCRUMB & CINEMATIC TEAM BACKGROUND
          ===================================================================== */}
      <section className="abt-top-banner">
        <div className="abt-banner-bg-wrap">
          <img
            src={bannerBg}
            alt="Vayonix digital agency creative team collaborating in glass boardroom"
            className="abt-banner-bg-img"
          />
          <div className="abt-banner-dark-overlay" />
          <div className="abt-banner-radial-glow" />
        </div>

        <div className="abt-banner-container" data-reveal="fade-up">
          <h1 className="abt-banner-title">About Us</h1>
          <nav className="abt-breadcrumbs" aria-label="Breadcrumb">
            <Link to="/" className="abt-crumb-link">Home</Link>
            <span className="abt-crumb-sep">›</span>
            <span className="abt-crumb-current">About Us</span>
          </nav>
        </div>
      </section>

      {/* =====================================================================
          2. MAIN SECTION: ABOUT US CONTENT & 3D FLOATING COMPOSITION CARDS
          ===================================================================== */}
      <section className="abt-main-section">
        {/* Continuous 3D Moving Loop Twinkle Star Prisms */}
        <div
          className="abt-3d-loop-canvas"
          style={{
            transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 0)`,
          }}
          aria-hidden="true"
        >
          {/* Ambient Deep Radial Glows */}
          <div className="abt-glow abt-glow-1" />
          <div className="abt-glow abt-glow-2" />
          <div className="abt-glow abt-glow-3" />

          {/* 3D Floating Twinkle Star Elements */}
          <div className="abt-3d-star-prism star-1" style={{ transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)` }}>✦</div>
          <div className="abt-3d-star-prism star-2" style={{ transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0)` }}>✦</div>
          <div className="abt-3d-star-prism star-3" style={{ transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * 16}px, 0)` }}>✦</div>
          <div className="abt-3d-star-prism star-4" style={{ transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * -14}px, 0)` }}>✦</div>
          <div className="abt-3d-star-prism star-5" style={{ transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * 20}px, 0)` }}>✦</div>
          <div className="abt-3d-star-prism star-6" style={{ transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 25}px, 0)` }}>✦</div>
          <div className="abt-3d-star-prism star-7" style={{ transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -22}px, 0)` }}>✦</div>
          <div className="abt-3d-star-prism star-8" style={{ transform: `translate3d(${mousePos.x * 26}px, ${mousePos.y * -18}px, 0)` }}>✦</div>

          {/* Flowing Vector Neon Splines */}
          <svg className="abt-neon-splines-svg" viewBox="0 0 1200 800" fill="none">
            <path
              d="M 100,200 C 350,50 650,450 1100,180"
              stroke="url(#abtSplineGrad1)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              className="abt-spline-anim-1"
            />
            <path
              d="M 200,650 C 500,400 800,750 1150,450"
              stroke="url(#abtSplineGrad2)"
              strokeWidth="2"
              className="abt-spline-anim-2"
            />
            <defs>
              <linearGradient id="abtSplineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="abtSplineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="abt-main-container">
          <div className="abt-content-grid">

            {/* ===============================================================
                LEFT COLUMN: HEADINGS, SUBTEXT, CTA & LOGO MARQUEE SLIDER
                =============================================================== */}
            <div className="abt-left-content" data-reveal="fade-right">

              {/* Glowing Tag Pill */}
              <div className="abt-tag-pill" data-reveal="fade-up">
                <span className="abt-tag-spark">✦</span>
                <span className="abt-tag-text">ABOUT US</span>
              </div>

              {/* Main Headline with Smooth Word-by-Word ScrollTitle */}
              <div data-reveal="fade-right">
                <ScrollTitle
                  className="abt-hero-heading"
                  lines={[
                    [{ text: 'We', type: 'normal' }, { text: 'Are', type: 'normal' }, { text: 'Creative', type: 'normal' }],
                    [{ text: 'Thinkers', type: 'normal' }, { text: '&', type: 'accent' }, { text: 'Digital', type: 'gradient' }],
                    [{ text: 'Growth', type: 'gradient' }, { text: 'Experts', type: 'gradient' }],
                  ]}
                />
              </div>

              {/* Subtext Description */}
              <p className="abt-sub-description" data-reveal="fade-up" data-reveal-delay="100">
                We blend creativity, technology, and strategy to deliver digital experiences that drive real results and grow your brand.
              </p>

              {/* Action CTA */}
              <div className="abt-cta-row" data-reveal="fade-up" data-reveal-delay="200">
                {/* Primary Pill Button: "Our Journey →" */}
                <a href="#mission" className="abt-primary-btn">
                  <span className="abt-btn-text">Our Journey</span>
                  <span className="vyn-btn-arrow-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 19" className="vyn-btn-arrow-svg">
                      <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
                    </svg>
                  </span>
                </a>
              </div>

              {/* Trust & Accreditations Section with Smooth Infinite Slides Ticker */}
              <div className="abt-trust-section" data-reveal="fade-up" data-reveal-delay="300">
                <span className="abt-trust-label">Associated With</span>

                <div className="abt-logo-slider-container">
                  <div className="abt-logo-track">
                    {/* Repeated items for seamless infinite auto-slide loop */}
                    {[...certifiedLogos, ...certifiedLogos, ...certifiedLogos, ...certifiedLogos].map((brand, idx) => (
                      <div key={idx} className="abt-brand-slide-card" title={brand.name}>
                        <img src={brand.src} alt={brand.name} className="abt-brand-img" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ===============================================================
                RIGHT COLUMN: 3D GLASS CARD CONTAINER AROUND BIG COMPOSITION IMAGE
                =============================================================== */}
            <div className="abt-right-composition" data-reveal="fade-left">
              <div
                className="abt-glass-card-frame"
                onMouseMove={(e) => handleTilt(e, setTilt)}
                onMouseLeave={() => resetTilt(setTilt)}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)`,
                }}
              >
                {/* Ambient Glow Aura Behind Card */}
                <div className="abt-card-glow-aura" />

                {/* Image Content Frame with Instant Theme Switch */}
                <div className="abt-card-image-box">
                  <img
                    src={theme === 'light' ? abtBgLight : abtBg}
                    alt="Vayonix digital growth experts showcase"
                    className="abt-big-photo"
                    key={theme}
                  />
                  <div className="abt-card-specular-light" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          3. RIGHT BOTTOM FLOATING ACTION CLUSTER (SCROLL-TO-TOP & THEME TOGGLE)
          ===================================================================== */}
      <div className="floating-action-cluster">
        {/* Bottom to Top Button */}
        <button
          className={`scroll-to-top-btn ${showScrollTop ? 'btn-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title={`Scroll to top (${scrollProgress}%)`}
        >
          <svg className="scroll-progress-svg" viewBox="0 0 48 48">
            <circle className="scroll-progress-track" cx="24" cy="24" r="20" />
            <circle
              className="scroll-progress-bar"
              cx="24"
              cy="24"
              r="20"
              style={{
                strokeDasharray: 125.66,
                strokeDashoffset: 125.66 - (scrollProgress / 100) * 125.66,
              }}
            />
          </svg>
          <div className="scroll-arrow-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" className="scroll-arrow-svg">
              <path
                d="M12 19V5M5 12L12 5L19 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="scroll-btn-glow" />
        </button>

        {/* Theme Toggle Component with Sun & Moon and Expanding Wave */}
        <ThemeToggle />
      </div>

    </div>
  );
};

export default Abt;
