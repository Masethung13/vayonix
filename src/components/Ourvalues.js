import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollTitle from './ScrollTitle';
import '../styles/Ourvalues.css';
import ctaPedestalDark from '../assets/values-cta-pedestal-dark.jpg';
import ctaPedestalLight from '../assets/values-cta-pedestal-light.jpg';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// =====================================================================
// Static Data (Defined outside component to prevent re-creation & ESLint warnings)
// =====================================================================

// 1. Four Core Values Data
const VALUES_DATA = [
  {
    id: 'integrity',
    title: 'Integrity',
    desc: 'We believe in honesty, transparency, and ethical practices in everything.',
    icon: (
      <svg viewBox="0 0 54 54" className="ov-icon-svg" fill="none">
        <polygon points="27,4 49,18 27,50 5,18" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="27,4 38,18 27,50 16,18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
        <line x1="5" y1="18" x2="49" y2="18" stroke="currentColor" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    id: 'innovation',
    title: 'Innovation',
    desc: 'We embrace creativity and innovation to deliver unique solutions.',
    icon: (
      <svg viewBox="0 0 54 54" className="ov-icon-svg" fill="none">
        <path d="M 27 6 A 14 14 0 0 0 16 28 C 18 31 19 33 19 37 L 35 37 C 35 33 36 31 38 28 A 14 14 0 0 0 27 6 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
        <line x1="22" y1="42" x2="32" y2="42" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="24" y1="47" x2="30" y2="47" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 24 24 L 27 18 L 30 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    desc: 'We work together with our clients as partners for success.',
    icon: (
      <svg viewBox="0 0 54 54" className="ov-icon-svg" fill="none">
        <circle cx="27" cy="16" r="7" stroke="currentColor" strokeWidth="2.4" fill="currentColor" fillOpacity="0.2" />
        <path d="M 17 40 C 17 31 37 31 37 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="13" cy="22" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M 6 42 C 6 35 18 35 19 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="41" cy="22" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M 48 42 C 48 35 36 35 35 40" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'excellence',
    title: 'Excellence',
    desc: 'We are committed to delivering outstanding results every time.',
    icon: (
      <svg viewBox="0 0 54 54" className="ov-icon-svg" fill="none">
        <rect x="9" y="32" width="7" height="14" rx="2" stroke="currentColor" strokeWidth="2.2" />
        <rect x="23" y="24" width="7" height="22" rx="2" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.15" />
        <rect x="37" y="14" width="7" height="32" rx="2" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.3" />
        <path d="M 10 24 L 24 14 L 43 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="35,7 43,7 43,15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

// 2. Four Process Steps Data
const PROCESS_DATA = [
  {
    step: '01',
    title: 'Discover',
    tagline: 'Phase 01 / Deep Analysis',
    desc: 'We analyze your business, uncover high-impact market opportunities, and understand your core goals.',
    accent: '#38bdf8',
    icon: (
      <svg viewBox="0 0 48 48" className="ov-icon-svg" fill="none">
        <circle cx="21" cy="21" r="13" stroke="currentColor" strokeWidth="2.4" fill="currentColor" fillOpacity="0.1" />
        <line x1="31" y1="31" x2="42" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="21" cy="21" r="6" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Strategize',
    tagline: 'Phase 02 / Strategic Roadmap',
    desc: 'We create a data-driven strategy tailored for you, architecting every conversion touchpoint.',
    accent: '#818cf8',
    icon: (
      <svg viewBox="0 0 48 48" className="ov-icon-svg" fill="none">
        <path d="M 12 40 L 36 40 C 34 32 30 28 29 25 C 33 22 34 16 30 10 C 27 6 22 6 18 10 C 15 13 15 18 12 21 C 10 23 11 27 15 27 C 14 31 13 36 12 40 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
        <circle cx="24" cy="14" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Execute',
    tagline: 'Phase 03 / High-Precision Build',
    desc: 'We implement the strategy with engineering precision, fluid micro-interactions, and high aesthetics.',
    accent: '#a855f7',
    icon: (
      <svg viewBox="0 0 48 48" className="ov-icon-svg" fill="none">
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2.4" fill="currentColor" fillOpacity="0.15" />
        <path d="M 24 6 L 24 11 M 24 37 L 24 42 M 6 24 L 11 24 M 37 24 L 42 24 M 11 11 L 15 15 M 33 33 L 37 37 M 11 37 L 15 33 M 33 15 L 37 11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <polyline points="21,24 24,21 27,24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="24" y1="21" x2="24" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Optimize',
    tagline: 'Phase 04 / Relentless Scaling',
    desc: 'We monitor, analyze, and optimize for maximum ROI, ensuring sustainable long-term market dominance.',
    accent: '#ec4899',
    icon: (
      <svg viewBox="0 0 48 48" className="ov-icon-svg" fill="none">
        <rect x="8" y="28" width="6" height="14" rx="2" stroke="currentColor" strokeWidth="2.2" />
        <rect x="18" y="20" width="6" height="22" rx="2" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.2" />
        <rect x="28" y="12" width="6" height="30" rx="2" stroke="currentColor" strokeWidth="2.2" fill="currentColor" fillOpacity="0.35" />
        <path d="M 32 14 Q 40 10 44 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <polyline points="37,4 44,4 44,11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const Ourvalues = () => {
  const sectionRef = useRef(null);
  const processPinRef = useRef(null);
  const processTrackRef = useRef(null);
  const progressBarRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredValue, setHoveredValue] = useState(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // Theme State (Dark / Light) with LocalStorage persistence & live sync
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
    return () => {
      window.removeEventListener('theme_change', handleThemeSync);
      window.removeEventListener('storage', handleThemeSync);
    };
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP ScrollTrigger: Horizontal Timeline & Step Illumination
  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinContainer = processPinRef.current;
      const track = processTrackRef.current;
      const progressBar = progressBarRef.current;

      if (!pinContainer || !track) return;

      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        // Master Pinned Scroll Timeline for Process Section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainer,
            start: 'top top+=60',
            end: '+=240%', // Dedicated scroll distance to scrub through all 4 steps
            pin: true,
            scrub: 0.8,
            snap: {
              snapTo: [0, 0.33, 0.66, 1], // Clean magnetic snap to each step
              duration: { min: 0.2, max: 0.4 },
              ease: 'power1.inOut',
            },
            onUpdate: (self) => {
              const progress = self.progress;

              // Update the continuous glowing progress bar fill
              if (progressBar) {
                gsap.set(progressBar, {
                  scaleX: progress,
                  transformOrigin: 'left center',
                });
              }

              // Determine current active step (0, 1, 2, 3)
              const currentIdx = Math.min(
                Math.round(progress * 3),
                3
              );
              setActiveProcessStep(currentIdx);
            },
          },
        });

        // Step-by-Step Card Illuminations & Scale Momentum
        PROCESS_DATA.forEach((_, idx) => {
          if (idx > 0) {
            tl.to(
              `.ov-proc-card-${idx}`,
              {
                opacity: 1,
                y: 0,
                scale: 1.03,
                duration: 0.6,
                ease: 'power2.out',
              },
              (idx - 0.5) * 0.8
            );
          }
        });
      } else {
        // Mobile & Tablet: Scroll Triggers per card
        const cards = gsap.utils.toArray('.ov-process-step-item');
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 75%',
            end: 'bottom 45%',
            onEnter: () => setActiveProcessStep(i),
            onEnterBack: () => setActiveProcessStep(i),
            toggleClass: { targets: card, className: 'is-illuminated' },
          });
        });
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section className="ov-section-wrapper" id="our-values" ref={sectionRef}>
      
      {/* =====================================================================
          3D DYNAMIC BACKGROUND CANVAS
          ===================================================================== */}
      <div
        className="ov-3d-bg-canvas"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
        }}
        aria-hidden="true"
      >
        <div className="ov-glow ov-glow-cyan" />
        <div className="ov-glow ov-glow-purple" />
        <div className="ov-glow ov-glow-pink" />

        {/* 3D Floating Twinkle Star Elements */}
        <div className="ov-3d-star-prism star-1" style={{ transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)` }}>✦</div>
        <div className="ov-3d-star-prism star-2" style={{ transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0)` }}>✦</div>
        <div className="ov-3d-star-prism star-3" style={{ transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * 16}px, 0)` }}>✦</div>
        <div className="ov-3d-star-prism star-4" style={{ transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * -14}px, 0)` }}>✦</div>
        <div className="ov-3d-star-prism star-5" style={{ transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * 20}px, 0)` }}>✦</div>
        <div className="ov-3d-star-prism star-6" style={{ transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 25}px, 0)` }}>✦</div>
        <div className="ov-3d-star-prism star-7" style={{ transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -22}px, 0)` }}>✦</div>
        <div className="ov-3d-star-prism star-8" style={{ transform: `translate3d(${mousePos.x * 26}px, ${mousePos.y * -18}px, 0)` }}>✦</div>
      </div>

      <div className="ov-main-container">
        
        {/* =====================================================================
            BLOCK 1: OUR VALUES (Seamless Cardless Tier)
            ===================================================================== */}
        <div className="ov-seamless-block" data-reveal="fade-up">
          <div className="ov-seamless-header-row">
            <div className="ov-block-header">
              <div className="ov-tag-pill">
                <span className="ov-tag-spark">✦</span>
                <span className="ov-tag-label">OUR VALUES</span>
              </div>
              <ScrollTitle
                className="ov-block-title"
                lines={[
                  [{ text: 'The', type: 'normal' }, { text: 'Principles', type: 'normal' }, { text: 'That', type: 'normal' }],
                  [{ text: 'Drive', type: 'normal' }, { text: 'Our', type: 'normal' }, { text: 'Success', type: 'gradient' }],
                ]}
              />
            </div>

            <div className="ov-header-flow-decor">
              <div className="ov-decor-line" />
              <div className="ov-decor-spark">✦</div>
            </div>
          </div>

          <div className="ov-seamless-items-grid">
            {VALUES_DATA.map((val, idx) => (
              <div
                key={val.id}
                className={`ov-seamless-item ${hoveredValue === idx ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredValue(idx)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <div className="ov-item-icon-node">
                  <div className="ov-node-aura" />
                  {val.icon}
                </div>
                <h3 className="ov-item-title">{val.title}</h3>
                <p className="ov-item-desc">{val.desc}</p>
                <div className="ov-item-hover-line" />
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider Line */}
        <div className="ov-tier-divider" />

        {/* =====================================================================
            BLOCK 2: OUR PROCESS (GSAP Scroll-Driven Horizontal Timeline)
            ===================================================================== */}
        <div className="ov-process-pinned-wrapper" ref={processPinRef}>
          <div className="ov-seamless-block ov-process-block" ref={processTrackRef}>
            
            {/* Top Row: Header on Left + Live Active Phase Tag on Right */}
            <div className="ov-seamless-header-row">
              <div className="ov-block-header">
                <div className="ov-tag-pill">
                  <span className="ov-tag-spark">✦</span>
                  <span className="ov-tag-label">OUR PROCESS</span>
                </div>
                <ScrollTitle
                  className="ov-block-title"
                  lines={[
                    [{ text: 'How', type: 'normal' }, { text: 'We', type: 'normal' }, { text: 'Work', type: 'normal' }],
                    [{ text: 'For', type: 'normal' }, { text: 'Your', type: 'normal' }, { text: 'Success', type: 'gradient' }],
                  ]}
                />
              </div>

              {/* Dynamic Live Phase Status Pill */}
              <div className="ov-process-live-status">
                <span
                  className="ov-status-dot"
                  style={{
                    backgroundColor: PROCESS_DATA[activeProcessStep].accent,
                    boxShadow: `0 0 10px ${PROCESS_DATA[activeProcessStep].accent}`,
                  }}
                />
                <span className="ov-status-text">
                  {PROCESS_DATA[activeProcessStep].tagline}
                </span>
              </div>
            </div>

            {/* Continuous Glowing Progress Track & Step Nodes */}
            <div className="ov-process-track-container">
              
              {/* Continuous Base Track */}
              <div className="ov-process-continuous-line">
                {/* Laser Progress Fill Scrubbed by GSAP */}
                <div className="ov-process-line-fill" ref={progressBarRef} />
                <div className="ov-process-line-pulse" />
              </div>

              {/* 4 Pinned / Scrubbed Process Step Items */}
              <div className="ov-seamless-items-grid ov-process-grid">
                {PROCESS_DATA.map((proc, idx) => {
                  const isActive = activeProcessStep === idx;
                  const isCompleted = activeProcessStep >= idx;

                  return (
                    <div
                      key={proc.step}
                      className={`ov-seamless-item ov-process-step-item ov-proc-card-${idx} ${
                        isActive ? 'is-illuminated' : ''
                      } ${isCompleted ? 'is-completed' : ''}`}
                      style={{ '--proc-accent': proc.accent }}
                      onClick={() => {
                        const isDesktop = window.innerWidth >= 1024;
                        if (isDesktop && processPinRef.current) {
                          const st = ScrollTrigger.getById(processPinRef.current);
                          if (st) {
                            st.scroll(st.start + (idx / 3) * (st.end - st.start));
                          }
                        }
                      }}
                    >
                      {/* Ambient Halo Glow */}
                      <div className="ov-card-ambient-glow" />

                      {/* Step Number Badge Node */}
                      <div className="ov-process-step-badge">
                        <span className="ov-step-digit">{proc.step}</span>
                        <div className="ov-step-halo" />
                      </div>

                      {/* Icon Node */}
                      <div className="ov-item-icon-node">
                        <div className="ov-node-aura" />
                        {proc.icon}
                      </div>

                      {/* Title with Line-by-Line Illumination */}
                      <h3 className="ov-item-title">{proc.title}</h3>

                      {/* Description */}
                      <p className="ov-item-desc">{proc.desc}</p>

                      {/* Expanding Glowing Accent Underline */}
                      <div className="ov-item-hover-line" />
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        </div>

        {/* Section Divider Line */}
        <div className="ov-tier-divider" />

        {/* =====================================================================
            BLOCK 3: CTA HERO BANNER (Seamless Floating Layout)
            ===================================================================== */}
        <div className="ov-cta-seamless-wrapper" data-reveal="fade-up">
          <div className="ov-cta-split-layout">
            <div className="ov-cta-content-col">
              <ScrollTitle
                className="ov-cta-headline"
                lines={[
                  [{ text: 'Let’s', type: 'normal' }, { text: 'Build', type: 'normal' }, { text: 'Something', type: 'normal' }],
                  [{ text: 'Extraordinary', type: 'gradient' }, { text: 'Together!', type: 'gradient' }],
                ]}
              />
              <p className="ov-cta-subtext">
                Ready to take your brand to the next level? We're here to turn
                your ideas into measurable results.
              </p>

              <a href="#contact" className="ov-cta-consult-btn">
                <span className="ov-btn-label">Get A Free Consultation</span>
                <span className="ov-btn-arrow">→</span>
                <div className="ov-btn-shimmer" />
              </a>
            </div>

            <div className="ov-cta-visual-col">
              <div
                className="ov-cta-pedestal-stage"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePos.y * -6}deg) rotateY(${mousePos.x * 6}deg) translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0)`,
                }}
              >
                <div className="ov-pedestal-ambient-glow" />
                
                <div className="ov-pedestal-seamless-blend">
                  <img
                    src={theme === 'light' ? ctaPedestalLight : ctaPedestalDark}
                    alt="Success Growth Arrow on 3D Pedestal"
                    className="ov-pedestal-img"
                    loading="lazy"
                  />
                  <div className="ov-pedestal-vignette" />
                </div>

                <div className="ov-cta-spark spark-p1">✦</div>
                <div className="ov-cta-spark spark-p2">✦</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Ourvalues;