import React, { useState, useEffect, useRef } from 'react';
import '../styles/Whychooseus.css';
import ScrollTitle from './ScrollTitle';

// Featured Project Assets
import pr1Dark from '../assets/pr1-dark.png';
import pr1Light from '../assets/pr1-light.png';
import contentMarketingImg from '../assets/services/Content-Marketing.jpg';

const Whychooseus = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [customerCount, setCustomerCount] = useState(0);
  const [uptimeCount, setUptimeCount] = useState('0.0');
  const [mbTilt, setMbTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Active theme tracking for seamless Dark/Light graphic switching
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vayonix_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const handleThemeSync = () => {
      const currentTheme = localStorage.getItem('vayonix_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    };

    window.addEventListener('theme_change', handleThemeSync);
    window.addEventListener('storage', handleThemeSync);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          handleThemeSync();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener('theme_change', handleThemeSync);
      window.removeEventListener('storage', handleThemeSync);
      observer.disconnect();
    };
  }, []);

  const handleMbTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMbTilt({ x: x * 8, y: y * -8 });
  };

  const resetMbTilt = () => {
    setMbTilt({ x: 0, y: 0 });
  };

  // Avatar photos for the 300+ Happy Customers pill
  const customerAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
  ];

  // 4 Best-in-Class Agency Pillars
  const features = [
    {
      id: 1,
      title: 'Dedicated Engineering & Support',
      desc: 'Proactive maintenance, 24/7 uptime monitoring, and continuous performance tuning so your platform scales effortlessly.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wcu-feat-svg">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 21H16M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 8L8 10L6 12M10 12H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 19L21 22M20 17L18.5 18.5L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Data-Driven Growth Strategy',
      desc: 'Advanced multi-touch attribution, predictive user analytics, and high-converting funnels engineered to maximize measurable ROI.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wcu-feat-svg">
          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 14L12 9L16 13L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7" cy="14" r="2" fill="currentColor" />
          <circle cx="12" cy="9" r="2" fill="currentColor" />
          <circle cx="16" cy="13" r="2" fill="currentColor" />
          <circle cx="21" cy="6" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Agile & Transparent Delivery',
      desc: 'Sprint-based velocity with continuous feedback loops, clear milestone reporting, and zero hidden costs.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wcu-feat-svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 4.21l1.5 2.6M16.5 4.21l-1.5 2.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Future-Proof AI Architecture',
      desc: 'Ultra-fast cloud infrastructure and custom intelligent AI automation workflows designed to outpace your competition.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wcu-feat-svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  // Scroll Trigger Animated Counters: Re-animates smoothly upon every viewport entry
  useEffect(() => {
    let animTimer = null;

    const startCounting = () => {
      if (animTimer) cancelAnimationFrame(animTimer);
      setCustomerCount(0);
      setUptimeCount('0.0');

      const duration = 1800; // 1.8 seconds
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easeOutExpo curve
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        setCustomerCount(Math.round(easeOut * 300));
        setUptimeCount((easeOut * 99.9).toFixed(1));

        if (progress < 1) {
          animTimer = requestAnimationFrame(updateCount);
        }
      };

      animTimer = requestAnimationFrame(updateCount);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounting();
          } else {
            if (animTimer) cancelAnimationFrame(animTimer);
            setCustomerCount(0);
            setUptimeCount('0.0');
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
      if (animTimer) cancelAnimationFrame(animTimer);
    };
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax for 3D Background Elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="wcu-section-wrapper" id="why-choose-us" ref={sectionRef}>
      {/* =================================================================
          3D DYNAMIC BACKGROUND CANVAS: DIAMOND OCTAHEDRONS, GYROSCOPES & SPLINES
          ================================================================= */}
      <div
        className="wcu-3d-bg-canvas"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
        }}
        aria-hidden="true"
      >
        {/* Ambient Neon Backdrops */}
        <div className="wcu-bg-glow wcu-glow-orange" />
        <div className="wcu-bg-glow wcu-glow-purple" />

        {/* 3D Floating Diamond Octahedron 1 */}
        <div className="wcu-3d-diamond diamond-pos-1" style={{ transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0)` }}>
          <svg viewBox="0 0 120 140" className="wcu-diamond-svg">
            <polygon points="60,5 110,60 60,85 10,60" className="diamond-face diamond-top" />
            <polygon points="10,60 60,85 60,135" className="diamond-face diamond-bot-l" />
            <polygon points="60,85 110,60 60,135" className="diamond-face diamond-bot-r" />
          </svg>
          <div className="diamond-glow-halo" />
        </div>

        {/* 3D Floating Diamond Octahedron 2 */}
        <div className="wcu-3d-diamond diamond-pos-2" style={{ transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)` }}>
          <svg viewBox="0 0 120 140" className="wcu-diamond-svg diamond-rev">
            <polygon points="60,5 110,60 60,85 10,60" className="diamond-face diamond-top" />
            <polygon points="10,60 60,85 60,135" className="diamond-face diamond-bot-l" />
            <polygon points="60,85 110,60 60,135" className="diamond-face diamond-bot-r" />
          </svg>
          <div className="diamond-glow-halo" />
        </div>

        {/* 3D Orbital Gyroscope Double Rings */}
        <div className="wcu-3d-gyro-wrapper gyro-pos-1">
          <svg viewBox="0 0 150 150" className="wcu-gyro-svg">
            <circle cx="75" cy="75" r="65" stroke="url(#wcuGyroGrad1)" strokeWidth="2.5" fill="none" className="gyro-ring-outer" />
            <circle cx="75" cy="75" r="42" stroke="url(#wcuGyroGrad2)" strokeWidth="1.8" strokeDasharray="6 4" fill="none" className="gyro-ring-inner" />
            <defs>
              <linearGradient id="wcuGyroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="wcuGyroGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Flowing Curved Neon Splines */}
        <svg className="wcu-neon-splines-layer" viewBox="0 0 1440 900" fill="none">
          <path
            d="M 20,280 C 380,80 720,480 1140,160 C 1280,60 1400,180 1500,240"
            stroke="url(#wcuSplineGrad1)"
            strokeWidth="2.5"
            strokeDasharray="9 7"
            className="wcu-spline-dash-1"
          />
          <path
            d="M -30,720 C 420,520 820,860 1220,480 C 1360,360 1460,420 1540,480"
            stroke="url(#wcuSplineGrad2)"
            strokeWidth="2"
            className="wcu-spline-dash-2"
          />
          <defs>
            <linearGradient id="wcuSplineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="wcuSplineGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#ec4899" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="wcu-main-container">
        <div className="wcu-split-grid">

          {/* =================================================================
              LEFT COLUMN: HEADINGS, 4 FEATURE CARDS & FLOATING PILL
              ================================================================= */}
          <div className="wcu-left-content" data-reveal="fade-right">
            {/* Tag Badge */}
            <div className="wcu-tag-pill" data-reveal="fade-up">
              <span className="wcu-spark-icon">✦</span>
              <span className="wcu-tag-label">Why Choose Us</span>
            </div>

            {/* Main Headline */}
            <ScrollTitle
              as="h2"
              className="wcu-main-heading"
              lines={[
                [
                  { text: "Here's", type: 'normal' },
                  { text: 'Why', type: 'normal' },
                  { text: 'Brands', type: 'normal' },
                ],
                [
                  { text: 'Trust', type: 'normal' },
                  { text: 'Our', type: 'gradient' },
                  { text: 'Expertise', type: 'gradient' },
                ],
              ]}
            />

            {/* Description */}
            <p className="wcu-sub-description" data-reveal="fade-up" data-reveal-delay="100">
              We merge high-velocity engineering, bespoke design systems, and hyper-targeted digital strategy to build transformative digital experiences that dominate search and drive record revenue.
            </p>

            {/* Feature Cards & Vertical Pill Container */}
            <div className="wcu-feature-deck-row" data-reveal="fade-up" data-reveal-delay="200">
              {/* 4-Feature Card Box */}
              <div className="wcu-dual-feature-card wcu-quad-card">
                {features.map((feat, idx) => (
                  <React.Fragment key={feat.id}>
                    <div
                      className={`wcu-feature-item ${hoveredFeature === feat.id ? 'is-hovered' : ''}`}
                      onMouseEnter={() => setHoveredFeature(feat.id)}
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <div className="wcu-feature-icon-box">
                        {feat.icon}
                        <div className="wcu-feat-icon-glow" />
                      </div>
                      <div className="wcu-feat-text">
                        <h3 className="wcu-feat-title">{feat.title}</h3>
                        <p className="wcu-feat-desc">{feat.desc}</p>
                      </div>
                    </div>
                    {idx < features.length - 1 && <div className="wcu-card-divider" />}
                  </React.Fragment>
                ))}

                {/* Ambient Specular Hover Shine */}
                <div className="wcu-card-specular-shine" />
              </div>

              {/* Middle Floating Vertical Pill Badges */}
              <div className="wcu-floating-pills-col">
                {/* Top Customer Avatar Capsule */}
                <div className="wcu-vertical-capsule">
                  <div className="wcu-avatar-plus-badge">+</div>
                  <div className="wcu-avatars-stack">
                    {customerAvatars.map((src, i) => (
                      <img key={i} src={src} alt="Customer avatar" className="wcu-avatar-circle-img" />
                    ))}
                  </div>
                  <div className="wcu-vertical-text">
                    <span>{customerCount}+ Happy Customers</span>
                  </div>
                </div>

                {/* Bottom Concentric Waves Badge (Smooth Loop Rotation) */}
                <div className="wcu-concentric-badge" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none" className="wcu-cyber-emblem-svg">
                    <g className="emblem-outer-ring">
                      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 8" opacity="0.75" />
                      <circle cx="50" cy="8" r="3" fill="currentColor" />
                      <circle cx="50" cy="92" r="3" fill="currentColor" />
                      <circle cx="8" cy="50" r="3" fill="currentColor" />
                      <circle cx="92" cy="50" r="3" fill="currentColor" />
                    </g>
                    <g className="emblem-middle-ring">
                      <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="3" strokeDasharray="5 5" opacity="0.9" />
                    </g>
                    <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="3.5" opacity="0.95" />
                    <circle cx="50" cy="50" r="7.5" fill="currentColor" className="emblem-core-dot" />
                  </svg>
                  <div className="wcu-wave-pulse" />
                </div>
              </div>

            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: ULTRA-MODERN 2-IMAGE DUAL SHOWCASE TEMPLATE
              ================================================================= */}
          <div className="wcu-right-visual" data-reveal="fade-left">
            <div
              className="wcu-dual-showcase-stage"
              data-active-theme={theme}
              onMouseMove={handleMbTilt}
              onMouseLeave={resetMbTilt}
              style={{
                transform: `perspective(1000px) rotateX(${mbTilt.y}deg) rotateY(${mbTilt.x}deg)`,
              }}
            >
              {/* Radiant Ambient Core Halo */}
              <div className="wcu-dual-ambient-glow" />

              {/* Decorative Geometric Orbit Ring */}
              <div className="wcu-dual-orbit-ring" />

              {/* Floating Cyber Orbital Rotating Emblem in Infinite Loop */}
              <div className="wcu-rotating-cyber-emblem" aria-hidden="true">
                <svg viewBox="0 0 100 100" fill="none" className="wcu-cyber-emblem-svg">
                  <g className="emblem-outer-ring">
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 8" opacity="0.75" />
                    <circle cx="50" cy="8" r="3" fill="currentColor" />
                    <circle cx="50" cy="92" r="3" fill="currentColor" />
                    <circle cx="8" cy="50" r="3" fill="currentColor" />
                    <circle cx="92" cy="50" r="3" fill="currentColor" />
                    <circle cx="20.3" cy="20.3" r="2.5" fill="currentColor" opacity="0.8" />
                    <circle cx="79.7" cy="79.7" r="2.5" fill="currentColor" opacity="0.8" />
                    <circle cx="79.7" cy="20.3" r="2.5" fill="currentColor" opacity="0.8" />
                    <circle cx="20.3" cy="79.7" r="2.5" fill="currentColor" opacity="0.8" />
                  </g>
                  <g className="emblem-middle-ring">
                    <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="3" strokeDasharray="5 5" opacity="0.9" />
                  </g>
                  <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="3.5" opacity="0.95" />
                  <circle cx="50" cy="50" r="7.5" fill="currentColor" className="emblem-core-dot" />
                </svg>
                <div className="wcu-emblem-glow" />
              </div>

              {/* CARD 1: PRIMARY MAIN SHOWCASE IMAGE (THEME AWARE) */}
              <div className="wcu-dual-card wcu-card-primary">
                <div className="wcu-card-img-wrapper">
                  <img
                    src={theme === 'light' ? pr1Light : pr1Dark}
                    alt="Vayonix Infotech Platform Showcase"
                    className="wcu-dual-img wcu-img-poster"
                  />
                  <div className="wcu-card-gradient-overlay" />
                </div>

                {/* Specular Shimmer */}
                <div className="wcu-card-shimmer" />
              </div>

              {/* CARD 2: SECONDARY OVERLAPPING ACCENT IMAGE */}
              <div className="wcu-dual-card wcu-card-secondary">
                <div className="wcu-card-img-wrapper">
                  <img
                    src={contentMarketingImg}
                    alt="High Tech Collaborative Strategy"
                    className="wcu-dual-img"
                  />
                  <div className="wcu-card-gradient-overlay" />
                </div>

                {/* Floating Metric Glass Badge with Scroll Trigger Count */}
                <div className="wcu-secondary-metric-badge">
                  <div className="wcu-metric-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" className="wcu-metric-icon">
                      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="wcu-metric-text-col">
                    <span className="wcu-metric-val">{uptimeCount}%</span>
                    <span className="wcu-metric-lbl">Uptime & Scalability</span>
                  </div>
                </div>

                {/* Specular Shimmer */}
                <div className="wcu-card-shimmer" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Whychooseus;
