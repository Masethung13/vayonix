import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import heroBg from '../assets/hero-bg.png';
import heroBgLight from '../assets/hero-bg-light.png';
import SocialOrbit from './SocialOrbit';
import ThemeToggle from './ThemeToggle';

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Theme State (Dark / Light) with LocalStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vayonix_theme') || 'dark';
  });

  const heroRef = useRef(null);

  // Apply theme to document element on change
  useEffect(() => {
    const handleSync = () => {
      setTheme(localStorage.getItem('vayonix_theme') || 'dark');
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

  // Subtle Interactive Mouse Parallax Effect
  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const services = [
    {
      id: 1,
      name: 'Digital Marketing',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
    },
    {
      id: 2,
      name: 'Web Design',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <line x1="2" y1="7" x2="22" y2="7" />
          <circle cx="5" cy="5" r="0.75" fill="currentColor" />
          <circle cx="8" cy="5" r="0.75" fill="currentColor" />
          <circle cx="11" cy="5" r="0.75" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 3,
      name: 'App Development',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
        </svg>
      ),
    },
    {
      id: 4,
      name: 'SEO & Branding',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 7.4H22l-6 4.5 2.3 7.1-6.3-4.6-6.3 4.6 2.3-7.1-6-4.5h7.6z" />
        </svg>
      ),
    },
  ];

  const currentBg = theme === 'light' ? heroBgLight : heroBg;

  return (
    <div
      className="home-container"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Full Size Background Image */}
      <div className="cosmic-bg">
        <img
          src={currentBg}
          alt="Digital Marketing Hero Background"
          className="hero-bg-img"
          key={theme}
        />
        {theme === 'dark' && (
          <div className="stars-container">
            <div className="star star-1"></div>
            <div className="star star-2"></div>
            <div className="star star-3"></div>
            <div className="shooting-star shooting-star-1"></div>
          </div>
        )}
      </div>

      {/* =================================================================
          TOP RIGHT POSITIONED SOCIAL ORBIT ANIMATION (Restored Old Position)
          ================================================================= */}
      <div
        className="home-top-right-orbit"
        data-reveal="fade-left"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
        }}
      >
        <SocialOrbit />
      </div>

      {/* Main Edge-to-Edge Content Layout */}
      <div className="home-wrapper">
        <section className="hero-main">
          {/* =================================================================
              LEFT CORNER CONTENT
              ================================================================= */}
          <div
            className="hero-left-content"
            data-reveal="fade-right"
            style={{
              transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`,
            }}
          >
            {/* Top Announcement Badge */}
            <div className="announcement-badge animate-fade-down" data-reveal="fade-up">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">We Build Brands. We Grow Businesses.</span>
            </div>

            {/* Main Bold Headline */}
            <h1 className="hero-heading" data-reveal="fade-right">
              <span className="heading-line-1 animate-slide-right-1">DIGITAL MARKETING</span>
              <span className="heading-line-2 animate-slide-right-2">WEB DESIGN &amp;</span>
              <span className="heading-line-3 animate-slide-right-3">APP DEVELOPMENT</span>
              <span className="heading-script animate-scale-in">
                All in One Solution
                <svg className="script-underline" viewBox="0 0 240 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 14C52 4 142 3 236 12" stroke="url(#scriptGrad)" strokeWidth="2.8" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="scriptGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="hero-subtext" data-reveal="fade-up" data-reveal-delay="100">
              We help businesses launch, grow, and scale online with result-driven digital strategies,
              stunning websites, and powerful mobile apps.
            </p>

            {/* 4 Feature Badges Grid */}
            <div className="services-grid" data-reveal="fade-up" data-reveal-delay="200">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="service-card"
                  style={{ animationDelay: `${0.25 + index * 0.08}s` }}
                >
                  <div className="service-icon-wrap">
                    {service.icon}
                  </div>
                  <span className="service-title">{service.name}</span>
                </div>
              ))}
            </div>

            {/* CTA & Stats Card Row */}
            <div className="cta-action-row" data-reveal="fade-up" data-reveal-delay="300">
              <Link to="/contact" className="primary-launch-btn">
                <span>Let's Launch Your Brand</span>
                <span className="vyn-btn-arrow-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 19" className="vyn-btn-arrow-svg">
                    <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
                  </svg>
                </span>
              </Link>

            </div>
          </div>
        </section>
      </div>

      {/* =================================================================
          RIGHT BOTTOM FLOATING ACTION CLUSTER (SCROLL-TO-TOP & THEME TOGGLE)
          ================================================================= */}
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

export default Home;
