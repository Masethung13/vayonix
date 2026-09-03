import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollTitle from './ScrollTitle';
import AnimatedNumber from './AnimatedNumber';
import useScrollReveal from '../hooks/useScrollReveal';
import Whatweoffer from './Whatweoffer';
import '../styles/ServicePg.css';
import bannerBg from '../assets/abt-banner-bg.jpg';
import serviceDarkImg from '../assets/service-dark.jpg';
import serviceLightImg from '../assets/service-light1.jpg';

// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 80;

// Helper to resolve 80 image frame paths dynamically from /assets/gsap/
const getFrameSrc = (index) => {
  const padded = String(index).padStart(3, '0');
  try {
    return require(`../assets/gsap/ezgif-frame-${padded}.jpg`);
  } catch (e) {
    return null;
  }
};

// 4 Service Delivery Stages Scrubbed with the 80-frame sequence
const servicePhases = [
  {
    id: '01',
    badge: 'Stage 01 / Strategy',
    title: 'Omni-Channel Market Discovery',
    desc: 'Deep audience segmentation, competitor intelligence, and comprehensive keyword mapping to architect your tailored acquisition roadmap.',
    accent: '#38bdf8'
  },
  {
    id: '02',
    badge: 'Stage 02 / Creative & UX',
    title: 'High-Converting Digital Real Estate',
    desc: 'Developing high-converting landing pages, interactive 3D assets, and persuasive copy designed to maximize visitor-to-lead ratios.',
    accent: '#818cf8'
  },
  {
    id: '03',
    badge: 'Stage 03 / Performance Ads',
    title: 'Multi-Network Media Scaling',
    desc: 'Deploying laser-targeted Meta, Google, and LinkedIn ad funnels with continuous A/B creative testing to slash acquisition costs.',
    accent: '#a855f7'
  },
  {
    id: '04',
    badge: 'Stage 04 / Automation & AI',
    title: 'Automated Retention & ROI Scaling',
    desc: 'Integrating AI-driven lead routing, automated CRM drip sequences, and real-time revenue analytics for compounding monthly growth.',
    accent: '#ec4899'
  }
];

const metricsStats = [
  {
    number: '200+',
    caption: 'Happy Clients',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    number: '500+',
    caption: 'Projects Completed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    )
  },
  {
    number: '150%',
    caption: 'Avg. Traffic Increase',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    )
  },
  {
    number: '98%',
    caption: 'Client Satisfaction',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" />
        <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2a1 1 0 0 1-1-1v-2.34" />
        <path d="M6 3h12v7a6 6 0 0 1-12 0V3z" />
      </svg>
    )
  }
];

const ServicePg = () => {
  useScrollReveal(0.08);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // GSAP 80-Frame Sequence State & Refs
  const sequenceSectionRef = useRef(null);
  const sequenceCanvasRef = useRef(null);
  const milestonesViewportRef = useRef(null);
  const milestonesTrackRef = useRef(null);
  const imagesRef = useRef([]);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [activeSeqPhase, setActiveSeqPhase] = useState(0);

  // Theme synchronization with LocalStorage & Document Element
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vayonix_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme}`;
    localStorage.setItem('vayonix_theme', theme);
    window.dispatchEvent(new Event('theme_change'));
  }, [theme]);

  // Sync theme changes across tabs/components
  useEffect(() => {
    const handleThemeSync = () => {
      const currentTheme = localStorage.getItem('vayonix_theme') || 'dark';
      setTheme(currentTheme);
    };
    window.addEventListener('theme_change', handleThemeSync);
    window.addEventListener('storage', handleThemeSync);
    return () => {
      window.removeEventListener('theme_change', handleThemeSync);
      window.removeEventListener('storage', handleThemeSync);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleTilt = (e) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }
      setShowScrollTop(scrollY > 220);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // PRELOAD 80 GSAP FRAMES INTO MEMORY BUFFER
  // =========================================================================
  useEffect(() => {
    const loadedImgs = [];
    let loadedCount = 0;

    const handleImgLoad = () => {
      loadedCount++;
      if (loadedCount >= FRAME_COUNT - 5) {
        setFramesLoaded(true);
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const src = getFrameSrc(i);
      if (src) {
        img.src = src;
        img.onload = handleImgLoad;
      }
      loadedImgs.push(img);
    }
    imagesRef.current = loadedImgs;
  }, []);

  // Draw current frame onto 16:9 canvas
  const renderSequenceFrame = (frameIndex) => {
    const canvas = sequenceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];

    if (img && img.complete) {
      canvas.width = 1280;
      canvas.height = 720;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  // =========================================================================
  // GSAP MATCHMEDIA FOR DESKTOP (PINNED + TRANSLATE) & MOBILE (PINNED + IN-PLACE OVERLAY)
  // =========================================================================
  useEffect(() => {
    const mm = gsap.matchMedia(sequenceSectionRef);

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        const { isDesktop } = context.conditions;
        const section = sequenceSectionRef.current;
        const canvas = sequenceCanvasRef.current;
        const viewport = milestonesViewportRef.current;
        const track = milestonesTrackRef.current;

        if (!section || !canvas) return;

        renderSequenceFrame(0);
        const frameObj = { frame: 0 };

        if (isDesktop && viewport && track) {
          // 🚀 DESKTOP: PINNED 80-FRAME SEQUENCE + AUTO-TRANSLATING TRACK
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top top+=70',
              end: '+=280%',
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const currentIdx = Math.min(Math.round(frameObj.frame), FRAME_COUNT - 1);
                renderSequenceFrame(currentIdx);

                const phaseIndex = Math.min(
                  Math.floor(self.progress * servicePhases.length),
                  servicePhases.length - 1
                );
                setActiveSeqPhase(phaseIndex);
              },
            },
          });

          // Scrub 80 Frames
          tl.to(
            frameObj,
            {
              frame: FRAME_COUNT - 1,
              snap: 'frame',
              ease: 'none',
              duration: 1,
            },
            0
          );

          // Translate milestones track to 100% reveal Phase 04
          tl.to(
            track,
            {
              y: () => {
                const scrollDistance = track.scrollHeight - viewport.clientHeight;
                return -Math.max(0, scrollDistance);
              },
              ease: 'none',
              duration: 1,
            },
            0
          );
        } else {
          // 📱 MOBILE / TABLET: PINNED IN-PLACE OVERLAY CARDS + FRAME SCRUB
          gsap.to(frameObj, {
            frame: FRAME_COUNT - 1,
            snap: 'frame',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top+=30',
              end: '+=220%',
              pin: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const currentIdx = Math.min(Math.round(frameObj.frame), FRAME_COUNT - 1);
                renderSequenceFrame(currentIdx);

                // Smoothly swap overlapping active card in place
                const phaseIndex = Math.min(
                  Math.floor(self.progress * servicePhases.length),
                  servicePhases.length - 1
                );
                setActiveSeqPhase(phaseIndex);
              },
            },
          });
        }

        ScrollTrigger.refresh();
      }
    );

    return () => mm.revert();
  }, [framesLoaded]);

  return (
    <div className="svc-page-wrapper" onMouseMove={handleMouseMove}>

      {/* =====================================================================
          1. TOP BANNER: HERO HEADER WITH CINEMATIC BREADCRUMBS
          ===================================================================== */}
      <section className="svc-top-banner">
        <div className="svc-banner-bg-wrap">
          <img
            src={bannerBg}
            alt="Vayonix digital agency services background"
            className="svc-banner-bg-img"
          />
          <div className="svc-banner-dark-overlay" />
          <div className="svc-banner-radial-glow" />
        </div>

        <div className="svc-banner-container" data-reveal="fade-up">
          <h1 className="svc-banner-title">Our Services</h1>
          <div className="svc-breadcrumbs">
            <Link to="/" className="svc-crumb-link">Home</Link>
            <span className="svc-crumb-sep">/</span>
            <span className="svc-crumb-current">Our Services</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. HERO SHOWCASE SECTION
          ===================================================================== */}
      <section className="svc-hero-section">

        {/* 3D Background Canvas with 8 Parallax Stars & Neon Splines */}
        <div
          className="svc-3d-loop-canvas"
          style={{
            transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 0)`,
          }}
          aria-hidden="true"
        >
          <div className="svc-glow svc-glow-1" />
          <div className="svc-glow svc-glow-2" />
          <div className="svc-glow svc-glow-3" />

          {/* 8 Multi-Depth 3D Moving Twinkle Star Prisms */}
          <div className="svc-3d-star-prism svc-star-1" style={{ transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)` }}>✦</div>
          <div className="svc-3d-star-prism svc-star-2" style={{ transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0)` }}>✦</div>
          <div className="svc-3d-star-prism svc-star-3" style={{ transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * 16}px, 0)` }}>✦</div>
          <div className="svc-3d-star-prism svc-star-4" style={{ transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * -14}px, 0)` }}>✦</div>
          <div className="svc-3d-star-prism svc-star-5" style={{ transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * 20}px, 0)` }}>✦</div>
          <div className="svc-3d-star-prism svc-star-6" style={{ transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 25}px, 0)` }}>✦</div>
          <div className="svc-3d-star-prism svc-star-7" style={{ transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -22}px, 0)` }}>✦</div>
          <div className="svc-3d-star-prism svc-star-8" style={{ transform: `translate3d(${mousePos.x * 26}px, ${mousePos.y * -18}px, 0)` }}>✦</div>

          {/* Flowing Vector Neon Splines */}
          <svg className="svc-neon-splines-svg" viewBox="0 0 1200 800" fill="none">
            <path
              d="M 100,200 C 350,50 650,450 1100,180"
              stroke="url(#svcSplineGrad1)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              className="svc-spline-anim-1"
            />
            <path
              d="M 200,650 C 500,400 800,750 1150,450"
              stroke="url(#svcSplineGrad2)"
              strokeWidth="2"
              className="svc-spline-anim-2"
            />
            <defs>
              <linearGradient id="svcSplineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="svcSplineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="svc-main-container">

          {/* Top Split: Left Content + Right Image Frame */}
          <div className="svc-hero-split-grid">

            {/* Left Column: Headlines, CTAs */}
            <div className="svc-hero-left-content" data-reveal="fade-right">

              <span className="svc-hero-spark-decor">✦</span>

              <div className="svc-tag-pill" data-reveal="fade-up">
                <span className="svc-tag-spark">✦</span>
                <span className="svc-tag-label">OUR SERVICES</span>
              </div>

              <ScrollTitle
                as="h2"
                isHero={true}
                className="svc-hero-heading"
                lines={[
                  [
                    { text: 'Powerful', type: 'normal' },
                    { text: 'Digital', type: 'normal' }
                  ],
                  [
                    { text: 'Marketing', type: 'accent' },
                    { text: 'Services', type: 'gradient' }
                  ],
                  [
                    { text: 'That', type: 'normal' },
                    { text: 'Drive', type: 'normal' },
                    { text: 'Results', type: 'gradient' }
                  ]
                ]}
              />

              <p className="svc-sub-description" data-reveal="fade-up">
                From strategy to execution, we provide end-to-end digital marketing solutions that help your brand grow, engage, and convert like never before.
              </p>

              <div className="svc-cta-row" data-reveal="fade-up">
                <a href="#services-sequence" className="svc-primary-btn">
                  <span className="svc-btn-text">Explore All Services</span>
                  <span className="svc-btn-arrow">→</span>
                  <div className="svc-btn-shimmer" />
                </a>
              </div>

            </div>

            {/* Right Column: Glass Card Frame with 3D Tilt */}
            <div className="svc-hero-visual-col" data-reveal="fade-left">
              <div
                className="svc-glass-card-frame"
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)`
                }}
              >
                <div className="svc-card-glow-aura" />
                <div className="svc-card-image-box">
                  <img
                    src={theme === 'light' ? serviceLightImg : serviceDarkImg}
                    alt="Digital Marketing Services Showcase"
                    className="svc-big-photo"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================================
          🔥 GSAP SCROLLTRIGGER 80-FRAME SERVICE PIPELINE SEQUENCE
          ===================================================================== */}
      <section className="svc-gsap-sequence-section" id="services-sequence" ref={sequenceSectionRef}>
        <div className="svc-sequence-ambient-glow glow-top" />
        <div className="svc-sequence-ambient-glow glow-bottom" />

        <div className="svc-sequence-container">
          
          {/* Header */}
          <div className="svc-sequence-header">
            <div className="svc-tag-pill">
              <span className="svc-tag-spark">✦</span>
              <span className="svc-tag-label">INTERACTIVE EXECUTION ENGINE</span>
            </div>
            <h2 className="svc-sequence-title">
              Scroll To Watch Our <span className="svc-grad-cyber-sweep">Service Delivery Cycle</span>
            </h2>
            <p className="svc-sequence-subtitle">
              Every campaign and application moves through a rigorous 4-stage engineering pipeline scrubbed frame-by-frame.
            </p>
          </div>

          {/* 2-Column Split: Canvas (Left) + Sliding/Stacked Milestones (Right) */}
          <div className="svc-sequence-stage-grid">
            
            {/* Left: 80-Frame HTML5 Canvas */}
            <div className="svc-sequence-canvas-col">
              <div className="svc-sequence-canvas-frame">
                <div
                  className="svc-canvas-aura-backlight"
                  style={{
                    background: `radial-gradient(circle, ${servicePhases[activeSeqPhase].accent}88 0%, rgba(56, 189, 248, 0.2) 50%, transparent 75%)`,
                  }}
                />
                
                <canvas ref={sequenceCanvasRef} className="svc-sequence-canvas" />

                {/* Floating Status Pill */}
                <div className="svc-sequence-status-pill">
                  <span
                    className="status-dot"
                    style={{
                      backgroundColor: servicePhases[activeSeqPhase].accent,
                      boxShadow: `0 0 10px ${servicePhases[activeSeqPhase].accent}`,
                    }}
                  />
                  <span>
                    PHASE {servicePhases[activeSeqPhase].id} : {servicePhases[activeSeqPhase].badge}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Milestones Viewport (Sliding on Desktop / Overlapping in Place on Mobile) */}
            <div className="svc-sequence-milestones-viewport" ref={milestonesViewportRef}>
              <div className="svc-sequence-milestones-track" ref={milestonesTrackRef}>
                {servicePhases.map((phase, idx) => {
                  const isActive = activeSeqPhase === idx;
                  return (
                    <div
                      key={phase.id}
                      className={`svc-seq-phase-card ${isActive ? 'is-phase-active' : ''}`}
                      style={{ '--phase-accent': phase.accent }}
                    >
                      <div className="phase-card-top">
                        <span className="phase-num">{phase.id}</span>
                        <span className="phase-badge">{phase.badge}</span>
                      </div>
                      <h3 className="phase-title">{phase.title}</h3>
                      <p className="phase-desc">{phase.desc}</p>
                      <div className="phase-indicator-bar" />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================================
          3. "WHAT WE OFFER" SECTION (Dedicated Alternating Zig-Zag Component)
          ===================================================================== */}
      <Whatweoffer />

      {/* =====================================================================
          4. FULL-WIDTH GLOWING CYBER METRICS BANNER
          ===================================================================== */}
      <div className="svc-main-container">
        <div className="svc-cyber-metrics-card" data-reveal="fade-up">

          <div className="svc-metrics-inner-grid">
            {metricsStats.map((stat, idx) => (
              <div key={idx} className="svc-cyber-stat-item" data-reveal="zoom-in">
                <div className="svc-stat-icon-aura">
                  {stat.icon}
                </div>
                <div className="svc-stat-info">
                  <div className="svc-stat-number">
                    <AnimatedNumber value={stat.number} duration={1800} delay={idx * 150} once={false} />
                  </div>
                  <div className="svc-stat-caption">{stat.caption}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Radiant Laser Wave Spline */}
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="svc-metrics-wave-svg">
            <path
              d="M0,80 C300,120 600,20 900,90 C1050,110 1150,60 1200,80 L1200,120 L0,120 Z"
              fill="url(#svcWaveGradient)"
              opacity="0.5"
            />
            <path
              d="M0,90 C350,40 700,110 1000,50 C1100,30 1180,70 1200,60"
              fill="none"
              stroke="rgba(192, 132, 252, 0.85)"
              strokeWidth="2.5"
              filter="drop-shadow(0 0 8px rgba(168, 85, 247, 0.9))"
            />
            <defs>
              <linearGradient id="svcWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                <stop offset="50%" stopColor="rgba(168, 85, 247, 0.7)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.4)" />
              </linearGradient>
            </defs>
          </svg>

        </div>
      </div>

      {/* =====================================================================
          5. FLOATING ACTION CLUSTER (SCROLL-TO-TOP & THEME SWITCHER)
          ===================================================================== */}
      <div className="floating-action-cluster">
        <button
          className={`scroll-to-top-btn ${showScrollTop ? 'btn-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title={`Scroll to top (${Math.round(scrollProgress)}%)`}
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

        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          <div className={`theme-icon-slider ${theme === 'light' ? 'light-active' : ''}`}>
            <span className="theme-icon sun-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </span>
            <span className="theme-icon moon-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
          </div>
          <span className="theme-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>

    </div>
  );
};

export default ServicePg;