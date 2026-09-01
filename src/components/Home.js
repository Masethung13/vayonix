import React, { useState, useEffect, useRef } from 'react';
import '../styles/Home.css';
import heroBg from '../assets/hero-bg.png';
import heroBgLight from '../assets/hero-bg-light.png';
import SocialOrbit from './SocialOrbit';

const Home = () => {
  const [counts, setCounts] = useState({ launched: 0, satisfaction: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Theme State (Dark / Light) with LocalStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vayonix_theme') || 'dark';
  });

  const heroRef = useRef(null);

  // Apply theme to document element on change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme}`;
    localStorage.setItem('vayonix_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Smooth Animated Numbers on Mount
  useEffect(() => {
    const duration = 1800;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        launched: Math.floor(progress * 250),
        satisfaction: Math.floor(progress * 98),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({ launched: 250, satisfaction: 98 });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Scroll Progress and Bottom-to-Top Button Visibility
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowScrollTop(window.scrollY > 220);
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
            style={{
              transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`,
            }}
          >
            {/* Top Announcement Badge */}
            <div className="announcement-badge animate-fade-down">
              <span className="badge-icon">🚀</span>
              <span className="badge-text">We Build Brands. We Grow Businesses.</span>
            </div>

            {/* Main Bold Headline */}
            <h1 className="hero-heading">
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
            <p className="hero-subtext animate-fade-in-delayed">
              We help businesses launch, grow, and scale online with result-driven digital strategies,
              stunning websites, and powerful mobile apps.
            </p>

            {/* 4 Feature Badges Grid */}
            <div className="services-grid animate-fade-in-delayed">
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
            <div className="cta-action-row animate-fade-in-delayed">
              <a href="#launch" className="primary-launch-btn">
                <span>Let's Launch Your Brand</span>
                <span className="btn-arrow">→</span>
              </a>

              {/* Your Growth, Our Mission Stats Card */}
              <div className="inline-mission-card">
                <span className="mission-title">Your Growth, Our Mission</span>
                <div className="mission-stats-row">
                  <div className="mission-stat">
                    <span className="stat-num">{counts.launched}+</span>
                    <span className="stat-label">Projects Launched</span>
                  </div>
                  <div className="mission-stat-divider"></div>
                  <div className="mission-stat">
                    <span className="stat-num">{counts.satisfaction}%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =================================================================
          RIGHT BOTTOM FLOATING ACTION CLUSTER (SCROLL-TO-TOP & THEME TOGGLE)
          ================================================================= */}
      <div className="floating-action-cluster">
        {/* Bottom to Top Button with Circular SVG Scroll Progress Loader */}
        <button
          className={`scroll-to-top-btn ${showScrollTop ? 'btn-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title={`Scroll to top (${Math.round(scrollProgress)}%)`}
        >
          {/* Circular SVG Progress Ring */}
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

          {/* Centered Upward Arrow Icon */}
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

          {/* Ambient Glow */}
          <div className="scroll-btn-glow" />
        </button>

        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          <div className={`theme-icon-slider ${theme === 'light' ? 'light-active' : 'dark-active'}`}>
            {/* Sun Icon */}
            <div className="theme-icon sun-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" fill="#f59e0b"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>

            {/* Moon Icon */}
            <div className="theme-icon moon-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#f59e0b"></path>
              </svg>
            </div>
          </div>
          <span className="theme-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
