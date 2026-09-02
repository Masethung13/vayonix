import React, { useState, useEffect, useRef } from 'react';
import '../styles/Workingprocess.css';
import ScrollTitle from './ScrollTitle';

const Workingprocess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  const processSteps = [
    {
      step: 'Step 01',
      num: '01',
      title: 'Tailored Solutions',
      desc: 'In-depth discovery and business modeling to architect custom digital strategies mapped directly to your commercial goals.',
    },
    {
      step: 'Step 02',
      num: '02',
      title: 'Project Planning',
      desc: 'Comprehensive roadmap development, sprint architecture, and technical milestone definition for frictionless delivery.',
    },
    {
      step: 'Step 03',
      num: '03',
      title: 'Content Creation',
      desc: 'High-fidelity UI/UX design, persuasive storytelling, and multimedia asset production crafted to captivate audiences.',
    },
    {
      step: 'Step 04',
      num: '04',
      title: 'Seamless Execution',
      desc: 'High-velocity deployment, multi-channel rollout, and continuous data-driven optimization for compounding ROI.',
    },
  ];

  // Silky smooth scroll trigger for timeline steps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-step-index'));
            if (!isNaN(index)) {
              setActiveStep(index);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0.15,
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [processSteps.length]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Parallax for 3D Background Elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="wp-section-wrapper" id="working-process" ref={sectionRef}>
      {/* =================================================================
          3D DYNAMIC BACKGROUND CANVAS: ISOMETRIC CUBES, QUANTUM RINGS & SPLINES
          ================================================================= */}
      <div
        className="wp-3d-bg-canvas"
        style={{
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
        }}
        aria-hidden="true"
      >
        {/* Ambient Neon Backdrops */}
        <div className="wp-bg-glow wp-glow-left" />
        <div className="wp-bg-glow wp-glow-right" />

        {/* 3D Isometric Cyber Cube 1 */}
        <div className="wp-3d-cube-item cube-pos-1" style={{ transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)` }}>
          <svg viewBox="0 0 100 115" className="wp-iso-cube-svg">
            <polygon points="50,5 95,30 50,55 5,30" className="cube-face cube-top" />
            <polygon points="5,30 50,55 50,110 5,85" className="cube-face cube-left" />
            <polygon points="50,55 95,30 95,85 50,110" className="cube-face cube-right" />
          </svg>
          <div className="cube-ambient-glow" />
        </div>

        {/* 3D Isometric Cyber Cube 2 */}
        <div className="wp-3d-cube-item cube-pos-2" style={{ transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0)` }}>
          <svg viewBox="0 0 100 115" className="wp-iso-cube-svg cube-rev">
            <polygon points="50,5 95,30 50,55 5,30" className="cube-face cube-top" />
            <polygon points="5,30 50,55 50,110 5,85" className="cube-face cube-left" />
            <polygon points="50,55 95,30 95,85 50,110" className="cube-face cube-right" />
          </svg>
          <div className="cube-ambient-glow" />
        </div>

        {/* 3D Hexagonal Quantum Ring */}
        <div className="wp-3d-hex-ring-item hex-pos-1">
          <svg viewBox="0 0 140 140" className="wp-hex-ring-svg">
            <polygon points="70,10 125,40 125,100 70,130 15,100 15,40" stroke="url(#wpHexGrad1)" strokeWidth="2" fill="none" />
            <polygon points="70,30 105,50 105,90 70,110 35,90 35,50" stroke="url(#wpHexGrad2)" strokeWidth="1.5" strokeDasharray="5 5" fill="none" />
            <defs>
              <linearGradient id="wpHexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="wpHexGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="wp-main-container">
        <div className="wp-split-grid">

          {/* =================================================================
              LEFT COLUMN: HEADINGS & 3D HOLOGRAPHIC GEOMETRIC WIREFRAME
              ================================================================= */}
          <div className="wp-left-content" data-reveal="fade-right">
            {/* Tag Badge */}
            <div className="wp-tag-pill" data-reveal="fade-up">
              <span className="wp-spark-icon">✦</span>
              <span className="wp-tag-label">Working Process</span>
            </div>

            {/* Main Headline with Smooth Word-by-Word Scroll Illumination */}
            <ScrollTitle
              as="h2"
              className="wp-main-heading"
              lines={[
                [
                  { text: 'Shaping', type: 'normal' },
                  { text: 'the', type: 'normal' },
                  { text: 'Future', type: 'normal' },
                ],
                [
                  { text: 'Through', type: 'accent' },
                  { text: 'Step-by-Step', type: 'gradient' },
                  { text: 'Innovation', type: 'gradient' },
                ],
              ]}
            />

            {/* Subtitle */}
            <p className="wp-sub-text" data-reveal="fade-up" data-reveal-delay="100">
              Our proven execution framework transforms complex challenges into seamless, scalable, and high-impact digital realities.
            </p>

            {/* 3D Wireframe Holographic Geometry Mesh */}
            <div className="wp-3d-wireframe-container" data-reveal="fade-up" data-reveal-delay="150">
              <div className="wp-wireframe-glow-halo" />
              <div className="wp-3d-cube-stage">
                {/* Multi-layered Animated Wireframe Geometric Mesh */}
                <svg viewBox="0 0 280 280" fill="none" className="wp-wireframe-svg">
                  {/* Outer Isometric Facets */}
                  <polygon
                    points="140,20 250,85 250,215 140,280 30,215 30,85"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="wp-wire-outer"
                  />
                  {/* Internal Dimensional Connections */}
                  <line x1="140" y1="20" x2="140" y2="150" stroke="currentColor" strokeWidth="1.6" />
                  <line x1="250" y1="85" x2="140" y2="150" stroke="currentColor" strokeWidth="1.6" />
                  <line x1="30" y1="85" x2="140" y2="150" stroke="currentColor" strokeWidth="1.6" />
                  <line x1="140" y1="150" x2="140" y2="280" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
                  <line x1="140" y1="150" x2="250" y2="215" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />
                  <line x1="140" y1="150" x2="30" y2="215" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" />

                  {/* Inner Concentric Lattice */}
                  <polygon
                    points="140,65 210,105 210,185 140,225 70,185 70,105"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="2 2"
                    className="wp-wire-inner"
                  />
                  <circle cx="140" cy="150" r="28" stroke="currentColor" strokeWidth="1.8" className="wp-core-pulse" />
                  <circle cx="140" cy="150" r="5" fill="currentColor" className="wp-core-dot" />
                </svg>
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: DYNAMIC TIMELINE STEPS WITH SMOOTH GLIDING PILL
              ================================================================= */}
          <div className="wp-right-timeline" data-reveal="fade-left">
            <div className="wp-timeline-list">
              {processSteps.map((stepItem, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={stepItem.num}
                    data-step-index={index}
                    ref={(el) => (stepRefs.current[index] = el)}
                    className={`wp-timeline-row ${isActive ? 'is-active-step' : ''}`}
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Vertical Step Pill Badge */}
                    <div className="wp-step-capsule-badge">
                      <span className="wp-capsule-text">{stepItem.step}</span>
                    </div>

                    {/* Step Content Block */}
                    <div className="wp-step-content-body">
                      <h3 className="wp-step-title">{stepItem.title}</h3>
                      <p className="wp-step-description">{stepItem.desc}</p>

                      {/* Horizontal Progress Track Line with Glowing Dot */}
                      <div className="wp-step-track-line">
                        <div className="wp-track-fill" />
                        <div className="wp-track-node-dot" />
                      </div>
                    </div>
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

export default Workingprocess;
