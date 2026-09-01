import React, { useState, useEffect, useRef } from 'react';
import '../styles/Whychooseus.css';
import teamImg from '../assets/why-choose-team.jpg';

const Whychooseus = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const sectionRef = useRef(null);

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

  // Scroll Trigger Animated Counter: Re-animates smoothly upon viewport entry
  useEffect(() => {
    let animTimer = null;

    const startCounting = () => {
      setSatisfactionCount(0);
      setCustomerCount(0);

      const duration = 1800; // 1.8 seconds
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easeOutExpo curve
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        setSatisfactionCount(Math.round(easeOut * 98));
        setCustomerCount(Math.round(easeOut * 300));

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
          }
        });
      },
      { threshold: 0.25 }
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

  return (
    <section className="wcu-section-wrapper" id="why-choose-us" ref={sectionRef}>
      {/* Ambient Neon Backdrops */}
      <div className="wcu-bg-glow wcu-glow-orange" />
      <div className="wcu-bg-glow wcu-glow-purple" />

      <div className="wcu-main-container">
        <div className="wcu-split-grid">
          
          {/* =================================================================
              LEFT COLUMN: HEADINGS, 4 FEATURE CARDS & FLOATING PILL
              ================================================================= */}
          <div className="wcu-left-content">
            {/* Tag Badge */}
            <div className="wcu-tag-pill">
              <span className="wcu-spark-icon">✦</span>
              <span className="wcu-tag-label">Why Choose Us</span>
            </div>

            {/* Main Headline */}
            <h2 className="wcu-main-heading">
              Here's Why Brands <br />
              Trust <span className="wcu-highlight-gradient">Our Expertise</span>
            </h2>

            {/* Description */}
            <p className="wcu-sub-description">
              We merge high-velocity engineering, bespoke design systems, and hyper-targeted digital strategy to build transformative digital experiences that dominate search and drive record revenue.
            </p>

            {/* Feature Cards & Vertical Pill Container */}
            <div className="wcu-feature-deck-row">
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

                {/* Bottom Concentric Waves Badge */}
                <div className="wcu-concentric-badge" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none" className="wcu-wave-svg">
                    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                    <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2" opacity="0.7" />
                    <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2.2" />
                    <circle cx="16" cy="16" r="2.5" fill="currentColor" />
                  </svg>
                  <div className="wcu-wave-pulse" />
                </div>
              </div>

            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: LARGE CIRCULAR PORTAL IMAGE WITH SCROLL TRIGGER 92%
              ================================================================= */}
          <div className="wcu-right-visual">
            <div className="wcu-circular-portal-wrapper">
              
              {/* Outer Radiant Glowing Crescent Rings */}
              <div className="wcu-crescent-aura" />
              <div className="wcu-crescent-ring" />

              {/* Circular Team Image Container */}
              <div className="wcu-circle-img-frame">
                <img src={teamImg} alt="Vayonix expert team collaborating" className="wcu-portal-img" />
                <div className="wcu-img-soft-vignette" />
              </div>

              {/* Scroll Trigger Animated 92% Satisfied Clients Central Disc */}
              <div className="wcu-stats-disc">
                <div className="wcu-stats-disc-inner">
                  <span className="wcu-stats-number">{satisfactionCount}%</span>
                  <p className="wcu-stats-label">Satisfied Clients Returning Often</p>
                </div>
                <div className="wcu-disc-glow-ring" />
              </div>

              {/* Decorative Holographic Discs in Bottom Corner */}
              <div className="wcu-holographic-discs-accent">
                <div className="wcu-holo-disc disc-1" />
                <div className="wcu-holo-disc disc-2" />
                <div className="wcu-holo-disc disc-3" />
                <div className="wcu-holo-disc disc-4" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Whychooseus;
