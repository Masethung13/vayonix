import React, { useState, useEffect, useRef } from 'react';
import '../styles/Whatwedo.css';
import fashionImg from '../assets/case-study-fashion.jpg';
import saasImg from '../assets/case-study-saas.jpg';
import clinicImg from '../assets/case-study-clinic.jpg';
import fintechImg from '../assets/case-study-fintech.jpg';
import realestateImg from '../assets/case-study-realestate.jpg';
import cyberImg from '../assets/case-study-cyber.jpg';

const Whatwedo = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // 6 Service-Specific Case Studies
  const caseStudies = [
    {
      id: 'cs-web',
      badge: 'WEB DEVELOPMENT',
      title: 'Custom E-Commerce Platform',
      image: fashionImg,
      stats: [
        { value: '+210%', label: 'Checkout Conversion' },
        { value: '+165%', label: 'Revenue Growth' },
      ],
    },
    {
      id: 'cs-app',
      badge: 'APP DEVELOPMENT',
      title: 'Fintech Mobile Application',
      image: fintechImg,
      stats: [
        { value: '500K+', label: 'Active App Users' },
        { value: '4.9★', label: 'Store Rating' },
      ],
    },
    {
      id: 'cs-seo',
      badge: 'SEO OPTIMIZATION',
      title: 'Global SaaS SEO Scaling',
      image: saasImg,
      stats: [
        { value: '+320%', label: 'Organic Traffic' },
        { value: '#1 Rank', label: 'For 85+ Keywords' },
      ],
    },
    {
      id: 'cs-mktg',
      badge: 'DIGITAL MARKETING',
      title: 'Omnichannel Ad Campaigns',
      image: realestateImg,
      stats: [
        { value: '4.8x', label: 'Average ROAS' },
        { value: '+250K', label: 'Qualified Leads' },
      ],
    },
    {
      id: 'cs-ai',
      badge: 'AI AUTOMATION',
      title: 'Enterprise Support AI Bot',
      image: cyberImg,
      stats: [
        { value: '-75%', label: 'Response Time' },
        { value: '+180%', label: 'Workflow Efficiency' },
      ],
    },
    {
      id: 'cs-uiux',
      badge: 'UI/UX & WEB APP',
      title: 'Medical Healthcare Portal',
      image: clinicImg,
      stats: [
        { value: '+190%', label: 'Online Bookings' },
        { value: '99.2%', label: 'Client Satisfaction' },
      ],
    },
  ];

  // Tripled array for seamless, glitch-free infinite looping
  const totalOriginal = caseStudies.length; // 6
  const clonedSlides = [...caseStudies, ...caseStudies, ...caseStudies]; // 18 items
  
  const [slideIndex, setSlideIndex] = useState(totalOriginal); // Start in middle set (index 6)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  
  const autoPlayRef = useRef(null);
  const viewportRef = useRef(null);

  // Dynamic slides per view detection
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  // Smooth Auto-Play Loop
  useEffect(() => {
    if (isPaused || isDragging) return;

    autoPlayRef.current = setInterval(() => {
      setIsTransitioning(true);
      setSlideIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(autoPlayRef.current);
  }, [isPaused, isDragging]);

  // Seamless Infinite Reset when hitting clone boundary (Zero jump / No rewind bug)
  const handleTransitionEnd = () => {
    if (slideIndex >= totalOriginal * 2) {
      // Reached end of middle set -> instantly jump to start of middle set without animation
      setIsTransitioning(false);
      setSlideIndex(slideIndex - totalOriginal);
    } else if (slideIndex < totalOriginal) {
      // Reached start of middle set -> instantly jump to end of middle set without animation
      setIsTransitioning(false);
      setSlideIndex(slideIndex + totalOriginal);
    }
  };

  // Re-enable smooth transitions after instant jump
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setSlideIndex((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    setIsTransitioning(true);
    setSlideIndex((prev) => prev - 1);
  };

  const goToSlide = (idx) => {
    setIsTransitioning(true);
    setSlideIndex(totalOriginal + idx);
  };

  // Mouse / Touch Drag Handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsPaused(false);

    if (dragOffset < -50) {
      handleNextSlide();
    } else if (dragOffset > 50) {
      handlePrevSlide();
    }
    setDragOffset(0);
  };

  // 6 Services
  const services = [
    {
      id: 1,
      title: 'Web Development',
      desc: 'High-performance React & Next.js web applications engineered for speed, conversion, and scalability.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-icon-svg">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 21H16M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 8L9 11L6 14M11 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 2,
      title: 'App Development',
      desc: 'Native iOS and Android mobile solutions built with modern Flutter & React Native for seamless performance.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-icon-svg">
          <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
          <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M9 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 3,
      title: 'SEO Optimization',
      desc: 'Rank higher on Google, capture high-intent buyers, and grow organic traffic that consistently converts.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-icon-svg">
          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 14L12 9L16 13L21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 6H21V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Social Media Marketing',
      desc: 'Engage target audiences, build brand loyalty, and amplify reach across all major social media platforms.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-icon-svg">
          <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" />
          <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" />
          <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="currentColor" strokeWidth="2" />
          <path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 5,
      title: 'Content Marketing',
      desc: 'Create valuable, persuasive copy and multimedia content that attracts, educates, and turns visitors into leads.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-icon-svg">
          <path d="M12 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.5 3.5L20.5 7.5L7 21H3V17L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 6,
      title: 'Analytics & Reporting',
      desc: 'Track performance, analyze user behavior, and make smarter, data-driven decisions to optimize ROI.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="wwd-icon-svg">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 12A10 10 0 0 0 12 2V12H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  // Active original index for pagination indicator
  const activeDotIndex = ((slideIndex % totalOriginal) + totalOriginal) % totalOriginal;

  return (
    <section className="wwd-section" id="what-we-do">
      <div className="wwd-ambient-glow wwd-glow-top" />
      <div className="wwd-ambient-glow wwd-glow-bottom" />

      <div className="wwd-container">
        {/* =================================================================
            PART 1: "WHAT WE DO" - 3 COLUMNS SQUARE CARDS WITH MOVING COLOR AURA
            ================================================================= */}
        <div className="wwd-header-block">
          <div className="wwd-tag-badge">
            <span className="wwd-sparkle">✦</span>
            <span className="wwd-tag-text">What We Do</span>
          </div>
          <h2 className="wwd-main-title">
            Results-Driven <span className="wwd-title-gradient">Digital Solutions</span>
          </h2>
          <div className="wwd-divider-accent">
            <span className="wwd-divider-line"></span>
            <span className="wwd-divider-diamond">✦</span>
            <span className="wwd-divider-line"></span>
          </div>
        </div>

        {/* 3-Column Square Box Grid */}
        <div className="wwd-square-grid">
          {services.map((service, index) => {
            const isHovered = hoveredCard === index;
            return (
              <div
                key={service.id}
                className={`wwd-square-card ${isHovered ? 'wwd-card-hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Continuous Moving Color Aura Shimmer Inside Card */}
                <div className="wwd-moving-color-aura" />
                <div className="wwd-continuous-shimmer-sweep" />

                {/* Luminous Icon Circle */}
                <div className="wwd-icon-circle">
                  {service.icon}
                  <div className="wwd-icon-glow" />
                </div>

                <h3 className="wwd-card-title">{service.title}</h3>
                <p className="wwd-card-desc">{service.desc}</p>

                <div className="wwd-card-footer">
                  <a href="#contact" className="wwd-learn-btn">
                    <span>LEARN MORE</span>
                    <span className="wwd-btn-arrow">→</span>
                  </a>
                </div>

                {/* Ambient Specular Hover Shine */}
                <div className="wwd-card-shine" />
              </div>
            );
          })}
        </div>

        {/* =================================================================
            PART 2: "CASE STUDIES" - 100% BUG-FREE INFINITE AUTO-LOOP SLIDER
            ================================================================= */}
        <div
          className="wwd-case-section"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!isDragging) setIsPaused(false);
          }}
        >
          <div className="wwd-case-header">
            <div className="wwd-case-tag-wrap">
              <span className="wwd-sparkle">✦</span>
              <span className="wwd-tag-text">Case Studies</span>
            </div>
            <div className="wwd-case-title-row">
              <h2 className="wwd-case-title">
                Real Results. <span className="wwd-title-gradient">Real Impact.</span>
              </h2>

              {/* Slider Controls (Next / Prev Arrows + View All Button) */}
              <div className="wwd-slider-controls">
                <button
                  className="wwd-slide-nav-btn"
                  onClick={handlePrevSlide}
                  aria-label="Previous case study slide"
                >
                  ←
                </button>
                <button
                  className="wwd-slide-nav-btn"
                  onClick={handleNextSlide}
                  aria-label="Next case study slide"
                >
                  →
                </button>
                <a href="#contact" className="wwd-view-all-btn">
                  <span>View All Case Studies</span>
                  <span className="wwd-arrow-circle">→</span>
                </a>
              </div>
            </div>
            <div className="wwd-divider-accent">
              <span className="wwd-divider-line"></span>
              <span className="wwd-divider-diamond">✦</span>
              <span className="wwd-divider-line"></span>
            </div>
          </div>

          {/* Interactive Draggable Carousel Viewport with Left/Right Opacity Vignettes */}
          <div className="wwd-carousel-outer-wrapper">
            {/* Left and Right Opacity Gradient Vignettes */}
            <div className="wwd-carousel-edge-fade edge-fade-left" />
            <div className="wwd-carousel-edge-fade edge-fade-right" />

            <div
              className={`wwd-carousel-viewport ${isDragging ? 'is-dragging' : ''}`}
              ref={viewportRef}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div
                className="wwd-carousel-track"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(calc(-${slideIndex * (100 / slidesToShow)}% + ${dragOffset}px))`,
                  transition: isTransitioning && !isDragging
                    ? 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                    : 'none',
                }}
              >
                {clonedSlides.map((cs, cIdx) => (
                  <div
                    key={`${cs.id}-clone-${cIdx}`}
                    className="wwd-carousel-slide"
                    style={{ flex: `0 0 calc(100% / ${slidesToShow})` }}
                  >
                    <div className="wwd-case-card">
                      {/* Background Image Container with Hover Zoom & Gradient Sheen */}
                      <div className="wwd-case-img-wrap">
                        <img src={cs.image} alt={cs.title} className="wwd-case-img" />
                        <div className="wwd-case-gradient-overlay" />
                      </div>

                      {/* Top Badge & Circle Arrow Button */}
                      <div className="wwd-case-top-bar">
                        <span className="wwd-case-badge">{cs.badge}</span>
                        <div className="wwd-case-arrow-btn">
                          <svg viewBox="0 0 16 16" fill="none" className="wwd-arrow-icon">
                            <path
                              d="M3.33 8H12.67M12.67 8L8.67 4M12.67 8L8.67 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="wwd-case-card-title">{cs.title}</h3>

                      {/* Dual Metric Numbers */}
                      <div className="wwd-case-stats-row">
                        {cs.stats.map((stat, sIdx) => (
                          <div key={sIdx} className="wwd-case-stat-item">
                            <div className="wwd-case-stat-val">{stat.value}</div>
                            <div className="wwd-case-stat-lbl">{stat.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Hover Aura Border */}
                      <div className="wwd-case-glow-border" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="wwd-carousel-pagination">
            {caseStudies.map((_, idx) => (
              <button
                key={idx}
                className={`wwd-pag-dot ${activeDotIndex === idx ? 'dot-active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Whatwedo;
