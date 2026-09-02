import React, { useState, useRef, useEffect } from 'react';
import '../styles/Whatwedo.css';
import AnimatedNumber from './AnimatedNumber';

// Local fallbacks
import teamImgFallback from '../assets/about-team-main.jpg';
import saasImgFallback from '../assets/case-study-saas.jpg';
import cyberImgFallback from '../assets/case-study-cyber.jpg';

const Whatwedo = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [tiltTop, setTiltTop] = useState({ x: 0, y: 0 });
  const [tiltLeft, setTiltLeft] = useState({ x: 0, y: 0 });
  const [tiltRight, setTiltRight] = useState({ x: 0, y: 0 });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const [scrollRatio, setScrollRatio] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // High quality images matching reference screenshot
  const teamImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85';
  const dataImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=85';
  const designImage = 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=85';

  // Smooth Scroll Trigger Calculation for Word-by-Word Title Illumination
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (titleRef.current) {
            const rect = titleRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Triggers as title enters viewport until center of screen
            const startThreshold = windowHeight * 0.88;
            const endThreshold = windowHeight * 0.38;
            const progress = (startThreshold - rect.top) / (startThreshold - endThreshold);
            setScrollRatio(Math.max(0, Math.min(1, progress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Intersection Observer for section entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  // 3D Parallax Tilt Helpers
  const handleTilt = (e, setTilt) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: y * -12 });
  };

  const resetTilt = (setTilt) => {
    setTilt({ x: 0, y: 0 });
  };

  // Close video modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsVideoModalOpen(false);
    };
    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVideoModalOpen]);

  // 4 Main Feature Cards
  const features = [
    {
      id: 1,
      title: 'Strategy-First',
      desc: 'We plan with purpose and execute with precision.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-feat-icon">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Innovative Solutions',
      desc: 'Creative digital solutions tailored to your brand.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-feat-icon">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Design That Connects',
      desc: 'Visually stunning designs that engage & convert.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-feat-icon">
          <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 2l7.586 7.586" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Growth Focused',
      desc: 'Driving real results that scale your business.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-feat-icon">
          <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className={`wwd-exact-section ${inView ? 'wwd-in-view' : ''}`}
      id="what-we-do"
      ref={sectionRef}
    >
      {/* =================================================================
          3D DYNAMIC BACKGROUND CANVAS (ORBITING SPHERES, 3D RINGS & NEON SPLINES)
          ================================================================= */}
      <div
        className="wwd-3d-bg-canvas"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
        }}
        aria-hidden="true"
      >
        {/* Ambient Radial Deep Auras */}
        <div className="wwd-exact-glow wwd-exact-glow-purple" />
        <div className="wwd-exact-glow wwd-exact-glow-magenta" />
        <div className="wwd-exact-glow wwd-exact-glow-cyan" />

        {/* Floating 3D Morphic Spheres with Specular Highlights */}
        <div className="wwd-3d-orb wwd-3d-orb-1" style={{ transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)` }}>
          <div className="wwd-orb-specular" />
          <div className="wwd-orb-core-glow" />
        </div>

        <div className="wwd-3d-orb wwd-3d-orb-2" style={{ transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0)` }}>
          <div className="wwd-orb-specular" />
          <div className="wwd-orb-core-glow" />
        </div>

        <div className="wwd-3d-orb wwd-3d-orb-3" style={{ transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * 16}px, 0)` }}>
          <div className="wwd-orb-specular" />
          <div className="wwd-orb-core-glow" />
        </div>

        <div className="wwd-3d-orb wwd-3d-orb-4" style={{ transform: `translate3d(${mousePos.x * 16}px, ${mousePos.y * -14}px, 0)` }}>
          <div className="wwd-orb-specular" />
        </div>

        {/* 3D Cyber Wireframe Rings */}
        <div className="wwd-3d-ring-wrapper ring-pos-1">
          <svg viewBox="0 0 160 160" className="wwd-3d-ring-svg">
            <ellipse cx="80" cy="80" rx="70" ry="32" stroke="url(#wwdRingGrad1)" strokeWidth="2.5" fill="none" />
            <ellipse cx="80" cy="80" rx="45" ry="20" stroke="url(#wwdRingGrad2)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            <defs>
              <linearGradient id="wwdRingGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="wwdRingGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="wwd-3d-ring-wrapper ring-pos-2">
          <svg viewBox="0 0 160 160" className="wwd-3d-ring-svg ring-reverse">
            <ellipse cx="80" cy="80" rx="65" ry="28" stroke="url(#wwdRingGrad3)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
            <defs>
              <linearGradient id="wwdRingGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Dynamic Glowing Neon Splines */}
        <svg className="wwd-neon-splines-layer" viewBox="0 0 1440 900" fill="none">
          <path
            d="M -50,220 C 320,80 620,520 1120,180 C 1300,60 1420,140 1520,200"
            stroke="url(#wwdSplineGradA)"
            strokeWidth="2.5"
            strokeDasharray="10 8"
            className="wwd-spline-flow-1"
          />
          <path
            d="M 50,780 C 450,560 850,880 1250,520 C 1380,400 1480,480 1550,550"
            stroke="url(#wwdSplineGradB)"
            strokeWidth="2"
            className="wwd-spline-flow-2"
          />
          <defs>
            <linearGradient id="wwdSplineGradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="wwdSplineGradB" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="wwd-exact-container">
        {/* =================================================================
            TOP MAIN SECTION: 2-COLUMN SPLIT (LEFT INFO / RIGHT VISUAL GRID)
            ================================================================= */}
        <div className="wwd-exact-grid">

          {/* ===============================================================
              LEFT COLUMN: BADGE, HEADINGS, 2X2 FEATURE TILES & CTA BUTTONS
              =============================================================== */}
          <div className="wwd-left-pane" data-reveal="fade-right">
            {/* Top Pill Tag */}
            <div className="wwd-tag-pill" data-reveal="fade-up">
              <span className="wwd-tag-text">About Us</span>
            </div>

            {/* Main Title with Scroll-Triggered Word-by-Word Color Transformation */}
            <h2 className="wwd-hero-title" ref={titleRef}>
              {(() => {
                const titleLines = [
                  [
                    { text: 'A', type: 'normal' },
                    { text: 'Creative', type: 'normal' },
                    { text: 'Digital', type: 'normal' },
                  ],
                  [
                    { text: 'Agency', type: 'normal' },
                    { text: 'Focused', type: 'normal' },
                    { text: 'on', type: 'accent' },
                  ],
                  [
                    { text: 'Real', type: 'gradient' },
                    { text: 'Results', type: 'gradient' },
                  ],
                ];

                let globalIndex = 0;
                const totalWords = 8;

                return titleLines.map((lineWords, lineIdx) => (
                  <span key={lineIdx} className="wwd-title-line">
                    {lineWords.map((word, wordIdx) => {
                      const idx = globalIndex++;
                      const start = idx / (totalWords + 1.2);
                      const end = (idx + 1.8) / (totalWords + 1.2);
                      const progress = Math.max(0, Math.min(1, (scrollRatio - start) / (end - start)));
                      const isLit = progress > 0.35;

                      return (
                        <span
                          key={wordIdx}
                          className={`wwd-scroll-word wwd-word-${word.type} ${isLit ? 'is-lit' : 'is-unlit'}`}
                          style={{
                            opacity: 0.22 + progress * 0.78,
                            transform: `translate3d(0, ${(1 - progress) * 5}px, 0)`,
                            filter: `blur(${(1 - progress) * 1.2}px)`,
                            transition: 'color 0.3s ease, text-shadow 0.3s ease, filter 0.2s ease, opacity 0.2s ease',
                          }}
                        >
                          {word.text}
                        </span>
                      );
                    })}
                  </span>
                ));
              })()}
            </h2>

            {/* Subtitle Description */}
            <p className="wwd-subtext">
              We combine creativity, technology, and strategy to deliver high-performance
              digital solutions that drive measurable growth and meaningful impact.
            </p>

            {/* 2x2 Feature Cards Grid */}
            <div className="wwd-features-2x2">
              {features.map((item) => (
                <div
                  key={item.id}
                  className={`wwd-feature-tile ${activeFeature === item.id ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveFeature(item.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <div className="wwd-tile-icon-box">
                    {item.icon}
                    <div className="wwd-tile-icon-glow" />
                  </div>
                  <div className="wwd-tile-text">
                    <h3 className="wwd-tile-title">{item.title}</h3>
                    <p className="wwd-tile-desc">{item.desc}</p>
                  </div>
                  <div className="wwd-tile-border-shimmer" />
                </div>
              ))}
            </div>

            {/* CTAs Row */}
            <div className="wwd-cta-row">
              {/* Primary Action Button with Glowing Aura */}
              <a href="#contact" className="wwd-primary-btn">
                <span className="wwd-btn-label">Let's Work Together</span>
                <div className="wwd-btn-arrow-wrap">
                  <svg viewBox="0 0 16 16" fill="none" className="wwd-btn-arrow-svg">
                    <path
                      d="M3.33 8H12.67M12.67 8L8.67 4M12.67 8L8.67 12"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="wwd-btn-glow" />
              </a>

              {/* Watch Story Video Trigger Button */}
              <button
                type="button"
                className="wwd-watch-story-btn"
                onClick={() => setIsVideoModalOpen(true)}
                aria-label="Watch our 2 min story video"
              >
                <div className="wwd-play-circle">
                  <div className="wwd-play-pulse-ring" />
                  <div className="wwd-play-pulse-ring-2" />
                  <svg viewBox="0 0 24 24" fill="none" className="wwd-play-svg">
                    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="wwd-watch-text-col">
                  <span className="wwd-watch-title">Watch Our Story</span>
                  <span className="wwd-watch-duration">2 min overview</span>
                </div>
              </button>
            </div>
          </div>

          {/* ===============================================================
              RIGHT COLUMN: VISUAL COMPOSITION (TOP MAIN + 2 BOTTOM CARDS)
              =============================================================== */}
          <div className="wwd-right-pane" data-reveal="fade-left">

            {/* TOP CARD: Team Collaboration with Floating Stats Pill */}
            <div
              className="wwd-visual-card wwd-top-team-card"
              onMouseMove={(e) => handleTilt(e, setTiltTop)}
              onMouseLeave={() => resetTilt(setTiltTop)}
              style={{
                transform: `perspective(1000px) rotateX(${tiltTop.y}deg) rotateY(${tiltTop.x}deg)`,
              }}
            >
              <div className="wwd-card-img-wrap">
                <img
                  src={teamImage}
                  onError={(e) => { e.target.src = teamImgFallback; }}
                  alt="Creative digital agency team collaborating"
                  className="wwd-card-img"
                />
                <div className="wwd-card-gradient-sheen" />
              </div>

              {/* Floating Glass Pill: 120+ Projects Delivered Across 15+ Industries */}
              <div className="wwd-floating-stat-pill">
                <div className="wwd-stat-avatar-circle">
                  <svg viewBox="0 0 24 24" fill="none" className="wwd-users-svg">
                    <path
                      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="wwd-stat-pill-info">
                  <div className="wwd-stat-pill-count">
                    <AnimatedNumber value="120+" />
                  </div>
                  <div className="wwd-stat-pill-heading">Projects Delivered</div>
                  <div className="wwd-stat-pill-sub">
                    Across <AnimatedNumber value="15+" /> Industries
                  </div>
                </div>
                <div className="wwd-pill-glow" />
              </div>

              {/* Card Ambient Glow Border */}
              <div className="wwd-card-border-glow" />
            </div>

            {/* BOTTOM 2-COLUMN CARDS ROW */}
            <div className="wwd-bottom-cards-row">

              {/* Bottom Left Card: Data-Driven Approach */}
              <div
                className="wwd-visual-card wwd-mini-card"
                onMouseMove={(e) => handleTilt(e, setTiltLeft)}
                onMouseLeave={() => resetTilt(setTiltLeft)}
                style={{
                  transform: `perspective(1000px) rotateX(${tiltLeft.y}deg) rotateY(${tiltLeft.x}deg)`,
                }}
              >
                <div className="wwd-card-img-wrap">
                  <img
                    src={dataImage}
                    onError={(e) => { e.target.src = saasImgFallback; }}
                    alt="Analytics data dashboard on laptop"
                    className="wwd-card-img"
                  />
                  <div className="wwd-card-gradient-sheen" />
                </div>

                {/* Glass Bottom Info Overlay */}
                <div className="wwd-mini-glass-footer">
                  <div className="wwd-footer-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" className="wwd-mini-footer-icon">
                      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                      <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" fill="currentColor" />
                      <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="wwd-footer-text">
                    <h4 className="wwd-footer-title">Data-Driven Approach</h4>
                    <p className="wwd-footer-desc">Insights that fuel smarter decisions and better results.</p>
                  </div>
                </div>

                <div className="wwd-card-border-glow" />
              </div>

              {/* Bottom Right Card: Creative Excellence */}
              <div
                className="wwd-visual-card wwd-mini-card"
                onMouseMove={(e) => handleTilt(e, setTiltRight)}
                onMouseLeave={() => resetTilt(setTiltRight)}
                style={{
                  transform: `perspective(1000px) rotateX(${tiltRight.y}deg) rotateY(${tiltRight.x}deg)`,
                }}
              >
                <div className="wwd-card-img-wrap">
                  <img
                    src={designImage}
                    onError={(e) => { e.target.src = cyberImgFallback; }}
                    alt="Creative UI design workstation monitor"
                    className="wwd-card-img"
                  />
                  <div className="wwd-card-gradient-sheen" />
                </div>

                {/* Glass Bottom Info Overlay */}
                <div className="wwd-mini-glass-footer">
                  <div className="wwd-footer-icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" className="wwd-mini-footer-icon">
                      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
                      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
                      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="wwd-footer-text">
                    <h4 className="wwd-footer-title">Creative Excellence</h4>
                    <p className="wwd-footer-desc">Eye-catching visuals that leave a lasting impression.</p>
                  </div>
                </div>

                <div className="wwd-card-border-glow" />
              </div>

            </div>

          </div>

        </div>

        {/* =================================================================
            BOTTOM FULL-WIDTH UNIFIED METRICS & TESTIMONIAL BANNER BAR
            ================================================================= */}
        <div className="wwd-bottom-stats-banner" data-reveal="fade-up">

          {/* 3 Interactive Metrics */}
          <div className="wwd-stats-group">

            {/* Metric 1: 98% Happy Clients */}
            <div className="wwd-stat-cell">
              <div className="wwd-stat-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" className="wwd-stat-cell-svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 14C8.5 15.5 10 16.5 12 16.5C14 16.5 15.5 15.5 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="9" cy="9.5" r="1.2" fill="currentColor" />
                  <circle cx="15" cy="9.5" r="1.2" fill="currentColor" />
                </svg>
              </div>
              <div className="wwd-stat-cell-info">
                <div className="wwd-stat-cell-num">
                  <AnimatedNumber value="98%" />
                </div>
                <div className="wwd-stat-cell-label">Happy Clients</div>
              </div>
            </div>

            {/* Metric 2: 250+ Projects Completed */}
            <div className="wwd-stat-cell">
              <div className="wwd-stat-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" className="wwd-stat-cell-svg">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="wwd-stat-cell-info">
                <div className="wwd-stat-cell-num">
                  <AnimatedNumber value="250+" />
                </div>
                <div className="wwd-stat-cell-label">Projects Completed</div>
              </div>
            </div>

            {/* Metric 3: 15+ Industry Awards */}
            <div className="wwd-stat-cell">
              <div className="wwd-stat-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" className="wwd-stat-cell-svg">
                  <path d="M8 21H16M12 17V21M6 4H18V8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 6H3C3 8.5 4.5 10 6 10.5M18 6H21C21 8.5 19.5 10 18 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="wwd-stat-cell-info">
                <div className="wwd-stat-cell-num">
                  <AnimatedNumber value="15+" />
                </div>
                <div className="wwd-stat-cell-label">Industry Awards</div>
              </div>
            </div>

          </div>

          {/* Testimonial Quote Block */}
          <div className="wwd-quote-block">
            <div className="wwd-quote-symbol">
              <svg viewBox="0 0 24 24" fill="none" className="wwd-quote-svg">
                <path
                  d="M10 11H6C4.89543 11 4 10.1046 4 9V7C4 5.89543 4.89543 5 6 5H8C9.10457 5 10 5.89543 10 7V11ZM10 11C10 13.7614 7.76142 16 5 16M20 11H16C14.8954 11 14 10.1046 14 9V7C14 5.89543 14.8954 5 16 5H18C19.1046 5 20 5.89543 20 7V11ZM20 11C20 13.7614 17.7614 16 15 16"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="wwd-quote-content">
              <p className="wwd-quote-text">
                "Their creativity, attention to detail, and strategic approach made a real difference to our brand."
              </p>
              <span className="wwd-quote-author">— Alex Morgan, CEO of Visionary Co.</span>
            </div>
          </div>

          <div className="wwd-banner-ambient-light" />
        </div>

      </div>

      {/* =================================================================
          INTERACTIVE VIDEO MODAL POPUP
          ================================================================= */}
      {isVideoModalOpen && (
        <div className="wwd-modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="wwd-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              className="wwd-modal-close-btn"
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="wwd-modal-header">
              <h3>Vayonix Agency — Driving Real Impact</h3>
              <p>2-minute overview of our creative & engineering process</p>
            </div>
            <div className="wwd-modal-video-box">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0"
                title="Vayonix Story Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="wwd-modal-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Whatwedo;
