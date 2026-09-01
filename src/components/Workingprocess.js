import React, { useState, useEffect, useRef } from 'react';
import '../styles/Workingprocess.css';

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

  // Scroll Trigger & Click detection to smoothly move active timeline step
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // When section is in viewport
      if (rect.top <= viewportHeight * 0.6 && rect.bottom >= viewportHeight * 0.2) {
        const totalHeight = rect.height;
        const scrollProgress = Math.max(0, Math.min(1, (viewportHeight * 0.5 - rect.top) / totalHeight));
        const stepIndex = Math.min(processSteps.length - 1, Math.floor(scrollProgress * processSteps.length));
        setActiveStep(stepIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [processSteps.length]);

  return (
    <section className="wp-section-wrapper" id="working-process" ref={sectionRef}>
      {/* Ambient Neon Backdrops */}
      <div className="wp-bg-glow wp-glow-left" />
      <div className="wp-bg-glow wp-glow-right" />

      <div className="wp-main-container">
        <div className="wp-split-grid">
          
          {/* =================================================================
              LEFT COLUMN: HEADINGS & 3D HOLOGRAPHIC GEOMETRIC WIREFRAME
              ================================================================= */}
          <div className="wp-left-content">
            {/* Tag Badge */}
            <div className="wp-tag-pill">
              <span className="wp-spark-icon">✦</span>
              <span className="wp-tag-label">Working Process</span>
            </div>

            {/* Main Headline */}
            <h2 className="wp-main-heading">
              Shaping the Future <br />
              Through <span className="wp-highlight-gradient">Step-by-Step Innovation</span>
            </h2>

            {/* Subtitle */}
            <p className="wp-sub-text">
              Our proven execution framework transforms complex challenges into seamless, scalable, and high-impact digital realities.
            </p>

            {/* 3D Wireframe Holographic Geometry Mesh */}
            <div className="wp-3d-wireframe-container">
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
          <div className="wp-right-timeline">
            <div className="wp-timeline-list">
              {processSteps.map((stepItem, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={stepItem.num}
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
