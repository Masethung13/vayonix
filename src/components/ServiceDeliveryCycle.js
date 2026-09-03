import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/ServiceDeliveryCycle.css';

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

// 4 Service Delivery Stages with Authentic Service-Related Content
export const SERVICE_STAGES = [
  {
    id: '01',
    badge: 'Stage 01 / Strategy',
    shortLabel: 'Strategy',
    title: 'Omni-Channel Discovery & Tech Architecture',
    desc: 'Deep audience segmentation, competitor intelligence, and comprehensive tech stack mapping to architect your custom scalable growth roadmap.',
    deliverables: [
      'Audience & Competitor Intelligence',
      'Full-Stack Architecture Blueprint',
      'Conversion Funnel & KPI Roadmap',
      'Technical SEO & Growth Strategy',
    ],
    accent: '#38bdf8',
  },
  {
    id: '02',
    badge: 'Stage 02 / Creative & Engineering',
    shortLabel: 'Build',
    title: 'High-Converting Web & App Engineering',
    desc: 'Developing responsive web platforms, mobile applications, and high-converting landing experiences engineered with sub-second speeds and fluid interactions.',
    deliverables: [
      'Next.js & React Web Platforms',
      'High-Converting Landing Pages',
      'Scalable APIs & Microservices',
      'Mobile iOS & Android Applications',
    ],
    accent: '#818cf8',
  },
  {
    id: '03',
    badge: 'Stage 03 / Performance Media',
    shortLabel: 'Growth',
    title: 'Precision Performance Media & CRO',
    desc: 'Deploying hyper-targeted Meta, Google, and LinkedIn ad funnels with continuous multivariate creative A/B testing to slash acquisition costs and scale ROAS.',
    deliverables: [
      'Meta, Google & LinkedIn Ads',
      'Multivariate A/B Creative Testing',
      'Conversion Rate Optimization (CRO)',
      'High-Intent Lead Generation Funnels',
    ],
    accent: '#a855f7',
  },
  {
    id: '04',
    badge: 'Stage 04 / Automation & AI',
    shortLabel: 'Scale',
    title: 'Intelligent AI Automation & Compound Scaling',
    desc: 'Integrating AI chatbots, automated CRM drip pipelines, and real-time executive BI dashboards for compounding, autonomous monthly growth.',
    deliverables: [
      'Custom AI Chatbots & LLM Workflows',
      'Automated CRM Lead Routing',
      'Real-Time Executive BI Dashboards',
      '24/7 SLA DevOps & Cloud Monitoring',
    ],
    accent: '#ec4899',
  },
];

const ServiceDeliveryCycle = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const imagesRef = useRef([]);
  const lastStageRef = useRef(0);
  const frameObjRef = useRef({ frame: 0 });

  const [activeStage, setActiveStage] = useState(0);
  const [framesReady, setFramesReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set canvas fixed backbuffer resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 1280;
      canvas.height = 720;
    }
  }, []);

  // Preload all 80 frames
  useEffect(() => {
    const imgs = [];
    let loadedCount = 0;

    const handleImgLoad = () => {
      loadedCount++;
      if (loadedCount >= FRAME_COUNT - 5) {
        setFramesReady(true);
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const src = getFrameSrc(i);
      if (src) {
        img.src = src;
        img.onload = handleImgLoad;
      }
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  // Draw frame on canvas
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (img && img.complete) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  // Silky GSAP ScrollTrigger Pinned Animation
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) return;

    drawFrame(0);

    const frameObj = frameObjRef.current;
    frameObj.frame = 0;

    const mm = gsap.matchMedia(sectionRef);

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobileOrTablet: '(max-width: 1023px)',
      },
      (context) => {
        const { isDesktop } = context.conditions;
        const track = trackRef.current;
        const viewport = viewportRef.current;

        if (isDesktop && track && viewport) {
          // Dynamic calculation: centers any card (0, 1, 2, 3) directly in the viewport
          const calculateStageY = (stageIndex) => {
            const cards = track.querySelectorAll('.sdc-phase-card');
            if (!cards || cards.length === 0) return 0;

            const targetCard = cards[stageIndex];
            if (!targetCard) return 0;

            // Target card center relative to the top of track
            const cardCenter = targetCard.offsetTop + targetCard.clientHeight / 2;
            const viewportCenter = viewport.clientHeight / 2;
            
            // Translate track so cardCenter aligns exactly with viewportCenter
            return -(cardCenter - viewportCenter);
          };

          const tl = gsap.timeline({
            scrollTrigger: {
              id: 'sdc-scroll-timeline',
              trigger: section,
              start: 'top top+=75',
              end: '+=250%',
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress;

                // 1. Draw image frame
                const currentIdx = Math.min(Math.round(frameObj.frame), FRAME_COUNT - 1);
                drawFrame(currentIdx);

                // 2. Determine active stage (0, 1, 2, 3)
                const stageIdx = Math.min(
                  Math.floor(progress * SERVICE_STAGES.length),
                  SERVICE_STAGES.length - 1
                );

                if (stageIdx !== lastStageRef.current) {
                  lastStageRef.current = stageIdx;
                  setActiveStage(stageIdx);
                }
              },
            },
          });

          // Scrub 80 Frames
          tl.to(
            frameObj,
            {
              frame: FRAME_COUNT - 1,
              ease: 'none',
              duration: 1,
            },
            0
          );

          // Staged Glide: Holds cards steady in full center view, then slides cleanly
          tl.to(
            track,
            {
              keyframes: {
                '0%': { y: () => calculateStageY(0) },
                '20%': { y: () => calculateStageY(0) },
                '28%': { y: () => calculateStageY(1), ease: 'power2.inOut' },
                '45%': { y: () => calculateStageY(1) },
                '53%': { y: () => calculateStageY(2), ease: 'power2.inOut' },
                '70%': { y: () => calculateStageY(2) },
                '78%': { y: () => calculateStageY(3), ease: 'power2.inOut' },
                '100%': { y: () => calculateStageY(3) },
              },
              duration: 1,
              ease: 'none',
            },
            0
          );
        } else {
          // Mobile & Tablet Pinned Setup
          gsap.to(frameObj, {
            frame: FRAME_COUNT - 1,
            ease: 'none',
            scrollTrigger: {
              id: 'sdc-scroll-timeline',
              trigger: section,
              start: 'top top+=72',
              end: '+=180%',
              pin: true,
              scrub: 0.5,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress;

                const currentIdx = Math.min(Math.round(frameObj.frame), FRAME_COUNT - 1);
                drawFrame(currentIdx);

                const stageIdx = Math.min(
                  Math.floor(progress * SERVICE_STAGES.length),
                  SERVICE_STAGES.length - 1
                );

                if (stageIdx !== lastStageRef.current) {
                  lastStageRef.current = stageIdx;
                  setActiveStage(stageIdx);
                }
              },
            },
          });
        }

        ScrollTrigger.refresh();
      }
    );

    return () => mm.revert();
  }, [framesReady]);

  // Click on stage tab or card to jump smoothly into that stage
  const handleStageClick = (index) => {
    setActiveStage(index);
    lastStageRef.current = index;
    const st = ScrollTrigger.getById('sdc-scroll-timeline');
    if (st) {
      const stageCenterProgress = (index + 0.5) / SERVICE_STAGES.length;
      const targetScroll = st.start + stageCenterProgress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const activeStageData = SERVICE_STAGES[activeStage];

  return (
    <section className="sdc-section-wrapper" id="services-sequence" ref={sectionRef}>
      {/* 3D Dynamic Background Elements */}
      <div
        className="sdc-3d-bg-canvas"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
        }}
        aria-hidden="true"
      >
        <div className="sdc-ambient-glow sdc-glow-top" />
        <div className="sdc-ambient-glow sdc-glow-bottom" />

        <div className="sdc-3d-star sdc-star-1" style={{ transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0)` }}>✦</div>
        <div className="sdc-3d-star sdc-star-2" style={{ transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)` }}>✦</div>
        <div className="sdc-3d-star sdc-star-3" style={{ transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * 14}px, 0)` }}>✦</div>
        <div className="sdc-3d-star sdc-star-4" style={{ transform: `translate3d(${mousePos.x * 16}px, ${mousePos.y * -12}px, 0)` }}>✦</div>
        <div className="sdc-3d-star sdc-star-5" style={{ transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * 18}px, 0)` }}>✦</div>

        <div className="sdc-cyber-grid-overlay" />
      </div>

      <div className="sdc-main-container">
        {/* Header Block */}
        <div className="sdc-header-block">
          <div className="sdc-tag-pill">
            <span className="sdc-tag-spark">✦</span>
            <span className="sdc-tag-label">INTERACTIVE EXECUTION ENGINE</span>
          </div>
          <h2 className="sdc-main-title">
            Scroll To Watch Our <span className="sdc-title-grad">Service Delivery Cycle</span>
          </h2>
          <p className="sdc-subtitle">
            Every campaign and application moves through a rigorous 4-stage engineering pipeline scrubbed frame-by-frame.
          </p>
        </div>

        {/* 2-Column Split: Symmetrical Heights with Smooth Scroll-Hide Effect */}
        <div className="sdc-stage-grid">
          {/* Left Column: Canvas + Status */}
          <div className="sdc-canvas-col">
            <div className="sdc-canvas-frame">
              {/* Dynamic Aura Backlight */}
              <div
                className="sdc-canvas-aura-backlight"
                style={{
                  background: `radial-gradient(circle, ${activeStageData.accent}88 0%, rgba(56, 189, 248, 0.2) 50%, transparent 75%)`,
                }}
              />

              {/* 16:9 Canvas */}
              <canvas ref={canvasRef} className="sdc-sequence-canvas" />

              {/* Centered Floating Status Pill */}
              <div className="sdc-status-pill">
                <span
                  className="sdc-status-dot"
                  style={{
                    backgroundColor: activeStageData.accent,
                    boxShadow: `0 0 10px ${activeStageData.accent}`,
                  }}
                />
                <span>
                  PHASE {activeStageData.id} : {activeStageData.badge}
                </span>
              </div>
            </div>

            {/* Mobile Tab Switcher (< 1024px) */}
            <div className="sdc-mobile-tabs">
              {SERVICE_STAGES.map((stg, idx) => (
                <button
                  key={stg.id}
                  type="button"
                  className={`sdc-mobile-tab-btn ${activeStage === idx ? 'is-active' : ''}`}
                  style={{ '--tab-accent': stg.accent }}
                  onClick={() => handleStageClick(idx)}
                >
                  <span className="sdc-tab-num">{stg.id}</span>
                  <span className="sdc-tab-label">{stg.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Milestones with Clean Spacing & Scroll-Hide Effect */}
          <div className="sdc-milestones-viewport" ref={viewportRef}>
            <div className="sdc-milestones-track" ref={trackRef}>
              {SERVICE_STAGES.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <div
                    key={stage.id}
                    className={`sdc-phase-card ${isActive ? 'is-phase-active' : ''}`}
                    style={{ '--phase-accent': stage.accent }}
                    onClick={() => handleStageClick(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleStageClick(idx);
                      }
                    }}
                  >
                    <div className="sdc-phase-card-top">
                      <span className="sdc-phase-num">{stage.id}</span>
                      <span className="sdc-phase-badge">{stage.badge}</span>
                    </div>

                    <h3 className="sdc-phase-title">{stage.title}</h3>
                    <p className="sdc-phase-desc">{stage.desc}</p>

                    {/* Deliverables */}
                    <div className="sdc-phase-deliverables">
                      {stage.deliverables.map((item, dIdx) => (
                        <span key={dIdx} className="sdc-deliverable-chip">
                          <span className="sdc-chip-dot">✦</span> {item}
                        </span>
                      ))}
                    </div>

                    {/* Active Accent Indicator */}
                    <div className="sdc-phase-indicator-bar" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDeliveryCycle;