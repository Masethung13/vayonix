import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import ThemeToggle from './ThemeToggle';
import '../styles/NotFoundPg.css';

const NotFoundPg = () => {
  useScrollReveal(0.08);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Subtle 3D Mouse Parallax
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Scroll Progress Detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollY > 150);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.round((scrollY / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="nf-page-wrapper" onMouseMove={handleMouseMove}>
      {/* =====================================================================
          1. AMBIENT BACKGROUND & FLOATING COSMIC ORBS
          ===================================================================== */}
      <div className="nf-ambient-bg" aria-hidden="true">
        <div
          className="nf-glow-orb nf-orb-1"
          style={{ transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)` }}
        />
        <div
          className="nf-glow-orb nf-orb-2"
          style={{ transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 0)` }}
        />
        <div
          className="nf-glow-orb nf-orb-3"
          style={{ transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)` }}
        />

        {/* 3D Floating Prism Stars */}
        <div className="nf-star nf-star-1" style={{ transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)` }}>✦</div>
        <div className="nf-star nf-star-2" style={{ transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 24}px, 0)` }}>✦</div>
        <div className="nf-star nf-star-3" style={{ transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * 18}px, 0)` }}>✦</div>
        <div className="nf-star nf-star-4" style={{ transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * -16}px, 0)` }}>✦</div>
        <div className="nf-star nf-star-5" style={{ transform: `translate3d(${mousePos.x * -26}px, ${mousePos.y * 22}px, 0)` }}>✦</div>
        <div className="nf-star nf-star-6" style={{ transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 26}px, 0)` }}>✦</div>
      </div>

      {/* =====================================================================
          2. MAIN 404 CONTENT HERO
          ===================================================================== */}
      <div className="nf-hero-container">
        {/* Status Pill Badge */}
        <div className="nf-status-badge" data-reveal="fade-down">
          <span className="nf-status-pulse" />
          <span>Error 404 // Hyperspace Anomaly</span>
        </div>

        {/* Holographic 404 Portal Scene */}
        <div className="nf-portal-scene" data-reveal="zoom-in">
          {/* Orbit Rings */}
          <div className="nf-orbit-rings" aria-hidden="true">
            <div className="nf-orbit-ellipse nf-orbit-1" />
            <div className="nf-orbit-ellipse nf-orbit-2" />
            <div className="nf-orbit-ellipse nf-orbit-3" />
          </div>

          {/* Central Cosmic Singularity */}
          <div className="nf-center-singularity" aria-hidden="true" />

          {/* 3D Parallax Massive 404 Typography */}
          <div
            className="nf-digits-wrap"
            style={{
              transform: `translate3d(${mousePos.x * 16}px, ${mousePos.y * 12}px, 0) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`,
            }}
          >
            <span className="nf-digit nf-digit-4-left">4</span>
            <span className="nf-digit nf-digit-0">0</span>
            <span className="nf-digit nf-digit-4-right">4</span>
          </div>

          {/* Hologram Laser Scanning Sweep */}
          <div className="nf-scan-line" aria-hidden="true" />
        </div>

        {/* Copy & Explanation */}
        <h1 className="nf-main-heading" data-reveal="fade-up">
          Lost in the <span className="nf-highlight-text">Digital Cosmos</span>
        </h1>

        <p className="nf-description" data-reveal="fade-up" data-reveal-delay="100">
          The coordinates you navigated to do not exist or have drifted into hyperspace. Let's recalibrate your trajectory back to safety.
        </p>

        {/* Action Buttons Row */}
        <div className="nf-actions-row" data-reveal="fade-up" data-reveal-delay="200">
          {/* Uiverse Signature Action Button */}
          <Link to="/" className="vyn-uiverse-btn">
            <span>Return to Home Base</span>
            <span className="vyn-btn-arrow-circle">
              <svg className="vyn-btn-arrow-svg" viewBox="0 0 12 14">
                <path d="M1 13L11 3M11 3H3M11 3V11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </span>
          </Link>

          <Link to="/services" className="nf-secondary-btn">
            <span>Explore Our Services</span>
          </Link>

          <Link to="/contact" className="nf-secondary-btn">
            <span>Report Broken Link</span>
          </Link>
        </div>

        {/* =====================================================================
            3. QUICK RECOVERY JUMP GRID
            ===================================================================== */}
        <div className="nf-recovery-section" data-reveal="fade-up" data-reveal-delay="300">
          <div className="nf-recovery-title">
            <span>✦</span>
            <span>Quick Navigation Beacons</span>
            <span>✦</span>
          </div>

          <div className="nf-recovery-grid">
            <Link to="/" className="nf-recovery-card">
              <div className="nf-card-glow" />
              <span className="nf-card-num">NAV // 01</span>
              <h3 className="nf-card-name">
                <span>Home Base</span>
                <span className="nf-card-arrow">↗</span>
              </h3>
              <p className="nf-card-desc">Return to our agency overview and core highlights.</p>
            </Link>

            <Link to="/about" className="nf-recovery-card">
              <div className="nf-card-glow" />
              <span className="nf-card-num">NAV // 02</span>
              <h3 className="nf-card-name">
                <span>About Us</span>
                <span className="nf-card-arrow">↗</span>
              </h3>
              <p className="nf-card-desc">Discover our vision, team DNA, and brand story.</p>
            </Link>

            <Link to="/services" className="nf-recovery-card">
              <div className="nf-card-glow" />
              <span className="nf-card-num">NAV // 03</span>
              <h3 className="nf-card-name">
                <span>Services</span>
                <span className="nf-card-arrow">↗</span>
              </h3>
              <p className="nf-card-desc">Web, mobile apps, SEO, AI, and growth marketing.</p>
            </Link>

            <Link to="/blogs" className="nf-recovery-card">
              <div className="nf-card-glow" />
              <span className="nf-card-num">NAV // 04</span>
              <h3 className="nf-card-name">
                <span>Blogs</span>
                <span className="nf-card-arrow">↗</span>
              </h3>
              <p className="nf-card-desc">Read high-impact tech, design, and growth insights.</p>
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================================
          4. FLOATING ACTION CLUSTER (THEME TOGGLE & SCROLL-TO-TOP)
          ===================================================================== */}
      <div className="floating-action-cluster">
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

        {/* Theme Toggle Button */}
        <ThemeToggle id="notfound-theme-toggle" />
      </div>
    </div>
  );
};

export default NotFoundPg;

