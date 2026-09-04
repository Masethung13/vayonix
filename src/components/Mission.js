import React, { useState, useEffect, useRef } from 'react';
import ScrollTitle from './ScrollTitle';
import '../styles/Mission.css';
import officeImg from '../assets/office.png';

const Mission = () => {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredPillar, setHoveredPillar] = useState(null);

  // Parallax Mouse Movement for 3D Background & Showcase Stage
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

  // 3 Pillars Content
  const pillars = [
    {
      id: 'vision',
      title: 'Our Vision',
      desc: 'To be the most trusted digital marketing agency known for innovation, transparency, and result-driven strategies.',
      icon: (
        <svg viewBox="0 0 48 48" className="mission-pillar-svg" fill="none">
          <ellipse cx="24" cy="24" rx="20" ry="12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="24" cy="24" r="7.5" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
          <path d="M 12 17 Q 24 11 36 17" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
        </svg>
      ),
    },
    {
      id: 'mission',
      title: 'Our Mission',
      desc: 'To deliver data-driven marketing solutions that help businesses grow, engage, and convert in the digital world.',
      icon: (
        <svg viewBox="0 0 48 48" className="mission-pillar-svg" fill="none">
          <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="24" cy="24" r="13" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 2" />
          <circle cx="24" cy="24" r="7" stroke="currentColor" strokeWidth="2.4" />
          <circle cx="24" cy="24" r="2.8" fill="currentColor" />
          <line x1="39" y1="9" x2="26" y2="22" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <polyline points="39,15 39,9 33,9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'goal',
      title: 'Our Goal',
      desc: 'To empower brands with creative strategies and measurable results that ensure sustainable growth and long-term success.',
      icon: (
        <svg viewBox="0 0 48 48" className="mission-pillar-svg" fill="none">
          <path d="M 6 42 L 20 18 L 30 32 L 36 24 L 44 42 Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
          <line x1="20" y1="18" x2="20" y2="6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 20 6 L 34 11 L 20 16 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="6" r="2" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section className="mission-section-wrapper" id="mission" ref={sectionRef}>

      {/* =====================================================================
          3D DYNAMIC BACKGROUND CANVAS (Glowing Halos & 3D Moving Stars)
          ===================================================================== */}
      <div
        className="mission-3d-bg-canvas"
        style={{
          transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 0)`,
        }}
        aria-hidden="true"
      >
        <div className="mission-glow mission-glow-cyan" />
        <div className="mission-glow mission-glow-purple" />
        <div className="mission-glow mission-glow-pink" />

        {/* 3D Floating Twinkle Star Elements with Moving Loop Animations */}
        <div className="mission-3d-star-prism star-1" style={{ transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)` }}>✦</div>
        <div className="mission-3d-star-prism star-2" style={{ transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0)` }}>✦</div>
        <div className="mission-3d-star-prism star-3" style={{ transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * 16}px, 0)` }}>✦</div>
        <div className="mission-3d-star-prism star-4" style={{ transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * -14}px, 0)` }}>✦</div>
        <div className="mission-3d-star-prism star-5" style={{ transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * 20}px, 0)` }}>✦</div>
        <div className="mission-3d-star-prism star-6" style={{ transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 25}px, 0)` }}>✦</div>
        <div className="mission-3d-star-prism star-7" style={{ transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -22}px, 0)` }}>✦</div>
        <div className="mission-3d-star-prism star-8" style={{ transform: `translate3d(${mousePos.x * 26}px, ${mousePos.y * -18}px, 0)` }}>✦</div>
      </div>

      <div className="mission-main-container">

        {/* =====================================================================
            TOP SPLIT: SEAMLESS 3D ROCKET STAGE (LEFT) & HEADINGS (RIGHT)
            ===================================================================== */}
        <div className="mission-top-grid">

          {/* Left Column: Futuristic 3D Glass Office Showcase */}
          <div className="mission-visual-column" data-reveal="fade-right">
            <div
              className="mission-office-stage"
              style={{
                transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg) translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)`,
              }}
            >
              {/* Multi-tier Neon Ambient Backlight Aura */}
              <div className="mission-stage-ambient-glow" />
              <div className="mission-stage-ambient-glow-secondary" />

              {/* Main Glass Frame Pedestal */}
              <div className="mission-stage-glass-card">
                {/* Cyber Geometric Corner Accents */}
                <div className="mission-card-corner corner-tl" />
                <div className="mission-card-corner corner-tr" />
                <div className="mission-card-corner corner-bl" />
                <div className="mission-card-corner corner-br" />

                {/* Inner Image Container with Glass Sheen & Vignette */}
                <div className="mission-stage-image-wrapper">
                  <img
                    src={officeImg}
                    alt="Vayonix Global Office & Headquarters"
                    className="mission-stage-image"
                    loading="lazy"
                  />
                  {/* Dynamic Specular Shimmer Sweep Effect */}
                  <div className="mission-stage-specular-sheen" />
                  {/* Subtle Gradient Shadow Vignette */}
                  <div className="mission-stage-inner-vignette" />
                </div>

                {/* Bottom Floating Stats / Info Badge */}
                <div className="mission-stage-bottom-card">
                  <div className="mission-stage-bottom-icon">
                    <span>✦</span>
                  </div>
                  <div className="mission-stage-bottom-text">
                    <span className="mission-stage-bottom-title">Vayonix Infotech</span>
                    <span className="mission-stage-bottom-sub">Digital Innovation & Strategic Hub</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Typographic Headline & Story */}
          <div className="mission-content-column" data-reveal="fade-left">

            {/* Glowing Tag Badge */}
            <div className="mission-tag-pill">
              <span className="mission-tag-spark">✦</span>
              <span className="mission-tag-label">OUR MISSION</span>
            </div>

            {/* Main Headline with Smooth Word-by-Word ScrollTitle */}
            <ScrollTitle
              className="mission-main-title"
              lines={[
                [{ text: 'Empowering', type: 'normal' }, { text: 'Brands.', type: 'normal' }],
                [{ text: 'Creating', type: 'normal' }, { text: 'Impact.', type: 'gradient' }],
              ]}
            />

            {/* Mission Narrative Body */}
            <p className="mission-body-description">
              Our mission is to help businesses unlock their full potential through
              innovative digital marketing solutions. We strive to create measurable
              results that drive growth and build meaningful connections.
            </p>
          </div>
        </div>

        {/* =====================================================================
            BOTTOM ROW: CENTERED ONE-LINE PILLARS WITH LEFT & RIGHT GLOWING LINES
            ===================================================================== */}
        <div className="mission-pillars-center-track" data-reveal="fade-up">

          {/* Top Divider Header with Left and Right Glowing Accent Lines */}
          <div className="mission-track-header-bar">
            <div className="mission-track-line mission-track-line-left">
              <div className="mission-track-line-pulse" />
            </div>

            <div className="mission-track-center-badge">
              <span className="mission-badge-spark">✦</span>
              <span className="mission-badge-text">STRATEGIC PILLARS</span>
              <span className="mission-badge-spark">✦</span>
            </div>

            <div className="mission-track-line mission-track-line-right">
              <div className="mission-track-line-pulse" />
            </div>
          </div>

          <div className="mission-pillars-row">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                className={`mission-pillar-center-item ${hoveredPillar === idx ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredPillar(idx)}
                onMouseLeave={() => setHoveredPillar(null)}
              >
                {/* Minimal Centered Line-Art Icon with Glow Aura */}
                <div className="mission-pillar-icon-wrapper">
                  <div className="mission-pillar-icon-aura" />
                  {pillar.icon}
                </div>

                {/* Centered Pillar Title */}
                <h3 className="mission-pillar-title">{pillar.title}</h3>

                {/* Centered Pillar Description */}
                <p className="mission-pillar-desc">{pillar.desc}</p>

                {/* Centered Glowing Accent Underline */}
                <div className="mission-pillar-hover-line" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Mission;
