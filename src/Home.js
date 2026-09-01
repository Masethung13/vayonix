import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import heroBg from './assets/hero-bg.jpg';

const Home = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [counts, setCounts] = useState({ launched: 0, satisfaction: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

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

  return (
    <div
      className="home-container"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Ambience & Canvas Starfield */}
      <div className="cosmic-bg">
        <img src={heroBg} alt="Space Rocket Launch Scene" className="hero-bg-img" />
        <div className="cosmic-overlay"></div>
        <div className="stars-container">
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="star star-4"></div>
          <div className="star star-5"></div>
          <div className="shooting-star shooting-star-1"></div>
          <div className="shooting-star shooting-star-2"></div>
        </div>
      </div>

      {/* Main Aligned Wrapper */}
      <div className="home-wrapper">
        <section className="hero-main">
          {/* =================================================================
              LEFT CONTENT COLUMN
              ================================================================= */}
          <div
            className="hero-left-content"
            style={{
              transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0)`,
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
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="service-icon-wrap">
                    {service.icon}
                  </div>
                  <span className="service-title">{service.name}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons Row */}
            <div className="cta-action-row animate-fade-in-delayed">
              <a href="#launch" className="primary-launch-btn">
                <span>Let's Launch Your Brand</span>
                <span className="btn-arrow">→</span>
              </a>

              <button
                className="watch-story-btn"
                onClick={() => setVideoModalOpen(true)}
                aria-label="Watch our story"
              >
                <div className="play-icon-circle">
                  <div className="play-ripple"></div>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
                <div className="watch-text-wrap">
                  <span className="watch-title">Watch Our Story</span>
                  <span className="watch-subtitle">See how we work</span>
                </div>
              </button>
            </div>
          </div>

          {/* =================================================================
              RIGHT VISUAL COLUMN (Floating 3D Scene with Parallax)
              ================================================================= */}
          <div
            className="hero-right-visual"
            style={{
              transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 0)`,
            }}
          >
            {/* Top Right Floating Mission Stats Card */}
            <div className="floating-mission-card animate-float-card">
              <span className="mission-title">Your Growth, Our Mission</span>
              <div className="mission-stats-row">
                <div className="mission-stat">
                  <span className="stat-num">{counts.launched}+</span>
                  <span className="stat-label">Projects Launched</span>
                </div>
                <div className="mission-stat-divider"></div>
                <div className="mission-stat">
                  <span className="stat-num accent-purple">{counts.satisfaction}%</span>
                  <span className="stat-label">Client Satisfaction</span>
                </div>
              </div>
            </div>

            {/* 3D Floating Interactive Badges with Organic Gravity Keyframes */}
            <div className="floating-icon icon-bullseye animate-float-target" title="Target Marketing">
              <div className="icon-3d-inner bullseye-glow">
                <span className="emoji-icon">🎯</span>
              </div>
            </div>

            <div className="floating-icon icon-chart animate-float-chart" title="Growth Analytics">
              <div className="icon-3d-inner chart-glow">
                <span className="emoji-icon">📊</span>
              </div>
            </div>

            <div className="floating-icon icon-instagram animate-float-insta" title="Instagram Marketing">
              <div className="icon-3d-inner insta-glow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-badge-icon">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
            </div>

            <div className="floating-icon icon-google-ads animate-float-ads" title="Google Ads">
              <div className="icon-3d-inner ads-glow">
                <svg viewBox="0 0 24 24" fill="none" className="svg-badge-icon">
                  <polygon points="12 2 22 20 2 20 12 2" fill="url(#adsGrad)" />
                  <defs>
                    <linearGradient id="adsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="floating-icon icon-facebook animate-float-fb" title="Social Advertising">
              <div className="icon-3d-inner fb-glow">
                <svg viewBox="0 0 24 24" fill="currentColor" className="svg-badge-icon">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
            </div>

            {/* Glowing Rocket Engine Ambient Core */}
            <div className="rocket-ambient-core animate-engine-pulse"></div>
          </div>
        </section>
      </div>

      {/* Video Modal Preview */}
      {videoModalOpen && (
        <div className="video-modal-backdrop" onClick={() => setVideoModalOpen(false)}>
          <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setVideoModalOpen(false)}>✕</button>
            <div className="video-content-preview">
              <div className="preview-header">
                <h3>DigitalGrow Agency Reel</h3>
                <p>Scaling brands beyond limits with rocket speed 🚀</p>
              </div>
              <div className="video-placeholder">
                <div className="video-play-pulse">▶</div>
                <span>Interactive Agency Showcase</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
