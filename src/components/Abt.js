import React, { useState, useEffect, useRef } from 'react';
import '../styles/Abt.css';
import aboutMainImg from '../assets/about-team-main.jpg';
import aboutSmallImg from '../assets/about-team-small.jpg';

const Abt = () => {
  const [scrollProgress, setScrollProgress] = useState(0.5);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const imageCardRef = useRef(null);

  // Intersection Observer for Scroll Trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth Scroll Parallax Calculation for Interior Image
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
              const rawProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
              const clamped = Math.max(0, Math.min(1, rawProgress));
              setScrollProgress(clamped);
            }
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

  // 3D Perspective Mouse Tilt & Cursor Follower on Left Image Frame
  const handleImageMouseMove = (e) => {
    if (!imageCardRef.current) return;
    const rect = imageCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 10, y: y * -10 });
  };

  const handleImageMouseEnter = () => {
    setIsHovered(true);
  };

  const handleImageMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  // Interior Image downward parallax calculation
  const interiorTranslateY = (scrollProgress - 0.5) * 70;

  const features = [
    { id: 1, text: 'Creativity Meets Strategy' },
    { id: 2, text: 'Innovative Development' },
    { id: 3, text: 'Design. Develop. Deliver.' },
    { id: 4, text: 'Unleashing Digital Power.' },
  ];

  return (
    <section className={`abt-section ${inView ? 'abt-in-view' : ''}`} id="about" ref={sectionRef}>
      <div className="abt-ambient-glow abt-glow-left" />
      <div className="abt-ambient-glow abt-glow-right" />

      <div className="abt-container">
        {/* =================================================================
            LEFT SIDE: DUAL-ARCH FRAME WITH SMOOTH INTERIOR IMAGE DOWNWARD GLIDE
            ================================================================= */}
        <div className="abt-left-col">
          <div
            className={`abt-image-wrapper ${inView ? 'image-loaded' : ''}`}
            ref={imageCardRef}
            onMouseMove={handleImageMouseMove}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${mouseOffset.y}deg) rotateY(${mouseOffset.x}deg) scale(${isHovered ? 1.02 : 1})`,
            }}
          >
            {/* Ambient Background Aura */}
            <div className="abt-img-aura" />

            {/* Unique Dual-Arched Shaped Mask Container */}
            <div className="abt-arch-mask">
              {/* Interior Image that smoothly moves downward on scroll */}
              <img
                src={aboutMainImg}
                alt="Vayonix Creative Digital Agency Team Collaborating"
                className="abt-main-img"
                style={{
                  transform: `translate3d(0, ${interiorTranslateY}px, 0) scale(${isHovered ? 1.08 : 1.04})`,
                }}
              />
              <div className="abt-img-shine-overlay" />
            </div>

            {/* Floating Decorative Glow Orb */}
            <div className="abt-floating-orb" />
          </div>
        </div>

        {/* =================================================================
            RIGHT SIDE: COMPANY CONTENT & INTERACTIVE METRICS
            ================================================================= */}
        <div className="abt-right-col">
          {/* Subtitle Badge */}
          <div className="abt-tag-wrap">
            <span className="abt-sparkle">✦</span>
            <span className="abt-tag-text">Who We Are</span>
          </div>

          {/* Main Headline */}
          <h2 className="abt-heading">
            A Creative Digital Agency{' '}
            <span className="abt-heading-accent">Focused <span className="abt-accent-gradient">on Real Results</span></span>
          </h2>

          {/* Descriptive Body Copy */}
          <p className="abt-description">
            We are a forward-thinking digital agency specializing in custom web design, high-performance mobile apps, and data-driven marketing strategies. We transform ambitious ideas into high-converting digital realities that accelerate your brand's growth and scale your business.
          </p>

          {/* 4-Item Checklist Card */}
          <div className="abt-checklist-card">
            <div className="abt-checklist-grid">
              {features.map((feature) => (
                <div key={feature.id} className="abt-check-item">
                  <div className="abt-check-icon-wrap">
                    <svg viewBox="0 0 20 20" fill="none" className="abt-check-svg">
                      <circle cx="10" cy="10" r="9" className="abt-check-circle" fill="url(#abtBrandCheckGrad)" />
                      <path
                        d="M6 10.2L8.8 13L14 7.5"
                        stroke="#ffffff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient id="abtBrandCheckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" className="abt-grad-stop-1" stopColor="var(--abt-grad-1)" />
                          <stop offset="100%" className="abt-grad-stop-2" stopColor="var(--abt-grad-2)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="abt-check-text">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Dual Card: Thumbnail Image + 92% Stat */}
          <div className="abt-stat-card">
            {/* Left Thumbnail Box */}
            <div className="abt-thumb-box">
              <img
                src={aboutSmallImg}
                alt="Vayonix Team Collaborating on Laptops"
                className="abt-thumb-img"
              />
              <div className="abt-thumb-sheen" />
            </div>

            {/* Right Metric Box */}
            <div className="abt-metric-box">
              <div className="abt-metric-number">98%</div>
              <div className="abt-metric-label">
                Satisfied Clients<br />Returning Often
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="abt-cta-wrap">
            <a href="#services" className="abt-discover-btn">
              <span className="abt-btn-text">Discover More</span>
              <div className="abt-btn-arrow-circle">
                <svg
                  className="abt-arrow-svg"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Abt;
