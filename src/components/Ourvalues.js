import React, { useState, useEffect, useRef } from 'react';
import ScrollTitle from './ScrollTitle';
import '../styles/Ourvalues.css';
import ctaPedestalDark from '../assets/values-cta-pedestal-dark.jpg';
import ctaPedestalLight from '../assets/values-cta-pedestal-light.jpg';

const Ourvalues = () => {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredProcess, setHoveredProcess] = useState(null);

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

  // 1. Four Core Values Data
  const valuesData = [
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
  const processData = [
    {
      step: '01',
      title: 'Discover',
      desc: 'We analyze your business and understand your goals.',
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
      desc: 'We create a data-driven strategy tailored for you.',
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
      desc: 'We implement the strategy with precision and creativity.',
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
      desc: 'We monitor, analyze, and optimize for maximum ROI.',
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

        {/* 3D Floating Twinkle Star Elements with Moving Loop Animations */}
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
          
          {/* Top Row: Header on Left + Section Flow Line */}
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

          {/* 4 Values Seamless Items Row */}
          <div className="ov-seamless-items-grid">
            {valuesData.map((val, idx) => (
              <div
                key={val.id}
                className={`ov-seamless-item ${hoveredValue === idx ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredValue(idx)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                {/* Minimal Luminous Icon Node */}
                <div className="ov-item-icon-node">
                  <div className="ov-node-aura" />
                  {val.icon}
                </div>

                {/* Title */}
                <h3 className="ov-item-title">{val.title}</h3>

                {/* Description */}
                <p className="ov-item-desc">{val.desc}</p>

                {/* Expanding Glowing Accent Underline */}
                <div className="ov-item-hover-line" />
              </div>
            ))}
          </div>

        </div>

        {/* Section Divider Line */}
        <div className="ov-tier-divider" />

        {/* =====================================================================
            BLOCK 2: OUR PROCESS (Seamless Step Track with Serpentine Spline)
            ===================================================================== */}
        <div className="ov-seamless-block" data-reveal="fade-up">
          
          {/* Top Row: Header on Left */}
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

            <div className="ov-header-flow-decor">
              <div className="ov-decor-line" />
              <div className="ov-decor-spark">✦</div>
            </div>
          </div>

          {/* 4 Process Step Items with Continuous Track */}
          <div className="ov-process-track-container">
            
            {/* Continuous Glowing Horizontal Line */}
            <div className="ov-process-continuous-line">
              <div className="ov-process-line-pulse" />
            </div>

            <div className="ov-seamless-items-grid ov-process-grid">
              {processData.map((proc, idx) => (
                <div
                  key={proc.step}
                  className={`ov-seamless-item ov-process-step-item ${hoveredProcess === idx ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredProcess(idx)}
                  onMouseLeave={() => setHoveredProcess(null)}
                >
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

                  {/* Title */}
                  <h3 className="ov-item-title">{proc.title}</h3>

                  {/* Description */}
                  <p className="ov-item-desc">{proc.desc}</p>

                  {/* Expanding Underline */}
                  <div className="ov-item-hover-line" />
                </div>
              ))}
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
            
            {/* Left Content Column */}
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

              {/* Consultation Action Button */}
              <a href="#contact" className="ov-cta-consult-btn">
                <span className="ov-btn-label">Get A Free Consultation</span>
                <span className="ov-btn-arrow">→</span>
                <div className="ov-btn-shimmer" />
              </a>
            </div>

            {/* Right 3D Pedestal Stage (Seamless Blend, No Box Frame) */}
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
