import React, { useState, useEffect, useRef } from 'react';
import ScrollTitle from './ScrollTitle';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/Whatweoffer.css';

// Import rich showcase assets for each service
import imgWebDev from '../assets/abt-dual-monitor.jpg';
import imgMobileApp from '../assets/abt-team-laptop.jpg';
import imgSeo from '../assets/service-icon-seo.jpg';
import imgSocial from '../assets/service-icon-social.jpg';
import imgContent from '../assets/case-study-saas.jpg';
import imgEmail from '../assets/case-study-fintech.jpg';
import imgAnalytics from '../assets/service-purple-rocket.jpg';
import imgVideo from '../assets/case-study-cyber.jpg';

const timelineServices = [
  {
    number: '01',
    step: 'STEP 01',
    title: 'Web & Full-Stack Development',
    tagline: 'Engineering Scale, Security & Zero-Latency Performance.',
    desc: 'We engineer ultra-fast Next.js and React architectures, robust microservice APIs, and secure zero-latency cloud infrastructure built for high concurrency and conversion acceleration.',
    image: imgWebDev,
    pills: [
      { icon: '⚡', label: 'React js & Python' },
      { icon: '🔌', label: 'High-Speed APIs' },
      { icon: '☁', label: 'Edge Hosting' },
      { icon: '🛡', label: 'Enterprise Security' }
    ],
    link: '/#contact'
  },
  {
    number: '02',
    step: 'STEP 02',
    title: 'Mobile App',
    tagline: 'Native 60fps Performance & Fluid Micro-Interactions.',
    desc: 'Our mobile engineers craft native and cross-platform apps for iOS and Android with sub-second launch speeds, biometric authentication, and seamless offline data synchronization.',
    image: imgMobileApp,
    pills: [
      { icon: '📱', label: 'iOS & Android' },
      { icon: '⚡', label: '60fps Native' },
      { icon: '🔄', label: 'Offline Sync' },
      { icon: '🔒', label: 'Biometrics' }
    ],
    link: '/#contact'
  },
  {
    number: '03',
    step: 'STEP 03',
    title: 'Search Engine Optimization (SEO)',
    tagline: 'Rank #1 for High-Value Commercial Keywords.',
    desc: 'Dominate organic search results with deep technical audits, semantic entity clustering, high-authority backlink architecture, and core web vitals speed optimization.',
    image: imgSeo,
    pills: [
      { icon: '🔍', label: 'Technical SEO' },
      { icon: '📊', label: 'Entity Clustering' },
      { icon: '🌐', label: 'Authority Backlinks' },
      { icon: '🚀', label: 'Core Web Vitals' }
    ],
    link: '/#contact'
  },
  {
    number: '04',
    step: 'STEP 04',
    title: 'Social Media Marketing',
    tagline: 'Viral Content Strategy & High-Engagement Communities.',
    desc: 'We scale brand authority and cultivate rabid followers across Instagram, TikTok, LinkedIn, and YouTube through trendjacking, short-form video reels, and multi-channel influencer funnels.',
    image: imgSocial,
    pills: [
      { icon: '🎬', label: 'Short-Form Video' },
      { icon: '👥', label: 'Community Growth' },
      { icon: '📢', label: 'Influencer Funnels' },
      { icon: '📈', label: 'Social Telemetry' }
    ],
    link: '/#contact'
  },
  {
    number: '05',
    step: 'STEP 05',
    title: 'Content Marketing & Brand Resonance',
    tagline: 'Persuasive Storytelling That Turns Prospects Into Clients.',
    desc: 'Create captivating long-form whitepapers, conversion copy, and viral lead magnets that educate, establish domain leadership, and systematically nurture cold prospects.',
    image: imgContent,
    pills: [
      { icon: '✍', label: 'Thought Leadership' },
      { icon: '📖', label: 'Lead Magnets' },
      { icon: '🎨', label: 'Tone-of-Voice' },
      { icon: '🔄', label: 'Multi-Format Repurposing' }
    ],
    link: '/#contact'
  },
  {
    number: '06',
    step: 'STEP 06',
    title: 'Email Marketing & CRM Automation',
    tagline: 'Automated Lifecycle Flows That Drive Repeat Revenue.',
    desc: 'Build high-converting behavioral email automations, personalized SMS sequences, and VIP loyalty nurture flows that multiply customer lifetime value on autopilot.',
    image: imgEmail,
    pills: [
      { icon: '📩', label: 'Trigger Automations' },
      { icon: '👥', label: 'Smart Segmentation' },
      { icon: '🔥', label: 'Inbox Deliverability' },
      { icon: '💬', label: 'Omnichannel CRM' }
    ],
    link: '/#contact'
  },
  {
    number: '07',
    step: 'STEP 07',
    title: 'Analytics & Performance Telemetry',
    tagline: 'Clear Predictive Business Intelligence & Attribution.',
    desc: 'Eliminate revenue blindspots with multi-touch attribution, server-side tracking, and custom executive BI dashboards that turn raw marketing metrics into profitable decisions.',
    image: imgAnalytics,
    pills: [
      { icon: '📊', label: 'Attribution Modeling' },
      { icon: '📈', label: 'Custom BI Dashboards' },
      { icon: '⚙', label: 'Server-Side GTM' },
      { icon: '🔮', label: 'Predictive Cohort LTV' }
    ],
    link: '/#contact'
  },
  {
    number: '08',
    step: 'STEP 08',
    title: 'Video Production & Motion Editing',
    tagline: 'High-Impact Cinematic Ads That Stop the Scroll.',
    desc: 'Produce cinematic commercial films, 3D motion graphics, VFX animations, and high-energy social ads that capture immediate attention and inspire massive action.',
    image: imgVideo,
    pills: [
      { icon: '🎥', label: 'Commercial Ads' },
      { icon: '✨', label: '3D Motion & VFX' },
      { icon: '📱', label: 'Reels & TikToks' },
      { icon: '🎧', label: 'Audio Mastering' }
    ],
    link: '/#contact'
  }
];

const Whatweoffer = () => {
  // Activate continuous scroll reveal animations for fade-left, fade-right, fade-up
  useScrollReveal(0.08);

  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNodes, setActiveNodes] = useState({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle subtle interactive mouse parallax for background 3D elements
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress of scroll through the timeline container
      const startOffset = windowHeight * 0.55;
      const totalScrollableDistance = rect.height;
      const scrolled = startOffset - rect.top;

      let pct = (scrolled / totalScrollableDistance) * 100;
      pct = Math.min(100, Math.max(0, pct));
      setScrollProgress(pct);

      // Check which nodes are active
      const rows = timelineRef.current.querySelectorAll('.wwo-timeline-row');
      const newActive = {};
      rows.forEach((row, idx) => {
        const rowRect = row.getBoundingClientRect();
        if (rowRect.top < windowHeight * 0.6) {
          newActive[idx] = true;
        }
      });
      setActiveNodes(newActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="wwo-section-wrapper"
      id="services-grid"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic 3D Moving Background Elements with Parallax Depth Layers */}
      <div className="wwo-3d-bg-canvas" aria-hidden="true">
        {/* Layer 1: 3D Crystal Diamonds */}
        <div
          className="wwo-3d-elem wwo-3d-diamond elem-1"
          style={{ transform: `translate3d(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px, 0)` }}
        >
          <div className="wwo-diamond-face" />
        </div>

        <div
          className="wwo-3d-elem wwo-3d-diamond elem-2"
          style={{ transform: `translate3d(${mousePos.x * -0.9}px, ${mousePos.y * -0.9}px, 0)` }}
        >
          <div className="wwo-diamond-face" />
        </div>

        <div
          className="wwo-3d-elem wwo-3d-diamond elem-3"
          style={{ transform: `translate3d(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px, 0)` }}
        >
          <div className="wwo-diamond-face" />
        </div>

        <div
          className="wwo-3d-elem wwo-3d-diamond elem-4"
          style={{ transform: `translate3d(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px, 0)` }}
        >
          <div className="wwo-diamond-face" />
        </div>

        {/* Layer 2: 3D Multi-Point Stars */}
        <div
          className="wwo-3d-elem wwo-3d-star elem-star-1"
          style={{ transform: `translate3d(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px, 0)` }}
        >
          <span className="wwo-star-sparkle">✦</span>
        </div>

        <div
          className="wwo-3d-elem wwo-3d-star elem-star-2"
          style={{ transform: `translate3d(${mousePos.x * -1.1}px, ${mousePos.y * -1.1}px, 0)` }}
        >
          <span className="wwo-star-sparkle">✦</span>
        </div>

        <div
          className="wwo-3d-elem wwo-3d-star elem-star-3"
          style={{ transform: `translate3d(${mousePos.x * 0.9}px, ${mousePos.y * 0.9}px, 0)` }}
        >
          <span className="wwo-star-sparkle">✦</span>
        </div>

        <div
          className="wwo-3d-elem wwo-3d-star elem-star-4"
          style={{ transform: `translate3d(${mousePos.x * -0.85}px, ${mousePos.y * -0.85}px, 0)` }}
        >
          <span className="wwo-star-sparkle">✦</span>
        </div>

        {/* Layer 3: 3D Holographic Orbit Rings & Crosshairs */}
        <div
          className="wwo-3d-elem wwo-3d-ring elem-ring-1"
          style={{ transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)` }}
        />

        <div
          className="wwo-3d-elem wwo-3d-ring elem-ring-2"
          style={{ transform: `translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0)` }}
        />

        <div
          className="wwo-3d-elem wwo-3d-crosshair elem-cross-1"
          style={{ transform: `translate3d(${mousePos.x * 1.3}px, ${mousePos.y * 1.3}px, 0)` }}
        >
          +
        </div>

        <div
          className="wwo-3d-elem wwo-3d-crosshair elem-cross-2"
          style={{ transform: `translate3d(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px, 0)` }}
        >
          +
        </div>
      </div>

      <div className="wwo-container">

        {/* Section Header Block */}
        <div className="wwo-header-block" data-reveal="fade-up">
          <div className="wwo-tag-pill">
            <span className="wwo-tag-spark">✦</span>
            <span className="wwo-tag-label">WHAT WE OFFER</span>
          </div>

          <ScrollTitle
            as="h2"
            className="wwo-section-title"
            lines={[
              [
                { text: 'Our', type: 'normal' },
                { text: 'Digital', type: 'normal' },
                { text: 'Marketing', type: 'accent' },
                { text: 'Services', type: 'gradient' }
              ]
            ]}
          />

          <div className="wwo-ornament-line">
            <div className="wwo-ornament-bar" />
            <div className="wwo-ornament-diamond">◇</div>
            <div className="wwo-ornament-bar" />
          </div>
        </div>

        {/* Central Vertical Laser Timeline */}
        <div className="wwo-timeline-container" ref={timelineRef}>

          {/* Vertical Dual-Rail Spine with Real-Time Laser Progression */}
          <div className="wwo-timeline-spine-track">
            <div
              className="wwo-timeline-spine-fill"
              style={{ height: `${scrollProgress}%` }}
            >
              {/* High-Lumen Diamond Flare Beacon */}
              <div className="wwo-timeline-laser-beacon">
                <div className="wwo-beacon-diamond" />
              </div>
            </div>
          </div>

          {/* Timeline Rows List */}
          <div className="wwo-timeline-rows-list">
            {timelineServices.map((svc, idx) => {
              const isEven = idx % 2 === 1; // Row 1 (0): Image Left, Card Right. Row 2 (1): Card Left, Image Right.
              const isActive = activeNodes[idx];

              return (
                <div key={svc.number} className="wwo-timeline-row">

                  {/* Left Slot */}
                  <div
                    className="wwo-timeline-slot-left"
                    data-reveal="fade-right"
                  >
                    {!isEven ? (
                      /* Left Image Pedestal Frame with Corner Tech Brackets */
                      <div className="wwo-image-card-wrap">
                        <div className="wwo-image-bracket bracket-tl" />
                        <div className="wwo-image-bracket bracket-tr" />
                        <div className="wwo-image-bracket bracket-bl" />
                        <div className="wwo-image-bracket bracket-br" />
                        <img
                          src={svc.image}
                          alt={svc.title}
                          className="wwo-image-elem"
                        />
                      </div>
                    ) : (
                      /* Left Content Card */
                      <div className="wwo-content-card-box">
                        <div className="wwo-card-top-beam" />
                        <div className="wwo-step-badge">{svc.step}</div>
                        <h3 className="wwo-card-main-title">{svc.title}</h3>
                        <div className="wwo-card-tagline">{svc.tagline}</div>
                        <p className="wwo-card-paragraph">{svc.desc}</p>

                        <div className="wwo-pill-capsules-wrap">
                          {svc.pills.map((pill, pIdx) => (
                            <div key={pIdx} className="wwo-pill-capsule">
                              <span className="wwo-capsule-icon">{pill.icon}</span>
                              <span>{pill.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="wwo-action-link-row">
                          <a href={svc.link} className="wwo-learn-more-action">
                            <span>CONTACT US</span>
                            <span className="wwo-learn-arrow-symbol">→</span>
                          </a>
                        </div>
                        <div className="wwo-card-shimmer" />
                      </div>
                    )}
                  </div>

                  {/* Center Slot: 3D Diamond Prismatic Crystal Step Node with Laser Connector Arms */}
                  <div
                    className="wwo-timeline-slot-center"
                    data-reveal="zoom-in"
                  >
                    <div className="wwo-diamond-prism-wrap">
                      <div className="wwo-diamond-outer-ring" />
                      <div className={`wwo-timeline-diamond-badge ${isActive ? 'is-active' : ''}`}>
                        <span className="wwo-node-num">{svc.number}</span>
                      </div>
                      <span className="wwo-node-spark-icon">✦</span>
                      <div className={`wwo-connector-arm ${!isEven ? 'arm-right' : 'arm-left'}`} />
                    </div>
                  </div>

                  {/* Right Slot */}
                  <div
                    className="wwo-timeline-slot-right"
                    data-reveal="fade-left"
                  >
                    {!isEven ? (
                      /* Right Content Card */
                      <div className="wwo-content-card-box">
                        <div className="wwo-card-top-beam" />
                        <div className="wwo-step-badge">{svc.step}</div>
                        <h3 className="wwo-card-main-title">{svc.title}</h3>
                        <div className="wwo-card-tagline">{svc.tagline}</div>
                        <p className="wwo-card-paragraph">{svc.desc}</p>

                        <div className="wwo-pill-capsules-wrap">
                          {svc.pills.map((pill, pIdx) => (
                            <div key={pIdx} className="wwo-pill-capsule">
                              <span className="wwo-capsule-icon">{pill.icon}</span>
                              <span>{pill.label}</span>
                            </div>
                          ))}
                        </div>

                        <div className="wwo-action-link-row">
                          <a href={svc.link} className="wwo-learn-more-action">
                            <span>CONTACT US</span>
                            <span className="wwo-learn-arrow-symbol">→</span>
                          </a>
                        </div>
                        <div className="wwo-card-shimmer" />
                      </div>
                    ) : (
                      /* Right Image Pedestal Frame with Corner Tech Brackets */
                      <div className="wwo-image-card-wrap">
                        <div className="wwo-image-bracket bracket-tl" />
                        <div className="wwo-image-bracket bracket-tr" />
                        <div className="wwo-image-bracket bracket-bl" />
                        <div className="wwo-image-bracket bracket-br" />
                        <img
                          src={svc.image}
                          alt={svc.title}
                          className="wwo-image-elem"
                        />
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Whatweoffer;
