import React, { useEffect, useRef, useState } from 'react';
import '../styles/Services.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollTitle from './ScrollTitle';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    id: '01',
    title: 'Custom Web Design & UI/UX',
    tagline: 'Architecting Digital Real Estate That Dominates Markets',
    desc: 'We design and engineer bespoke web platforms tailored to your brand. From lightning-fast Next.js/React frontends to ultra-clean responsive UI/UX, we ensure every visitor converts into a high-value customer.',
    features: [
      'Modern React & Next.js Architecture',
      'Mobile-First Responsive Layouts',
      'Interactive Micro-Animations & 3D',
      'High-Speed Core Web Vitals',
    ],
    badge: 'Web Architecture',
    accentColor: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '02',
    title: 'Full-Stack Mobile App Development',
    tagline: 'Native & Cross-Platform iOS and Android Ecosystems',
    desc: 'Scalable, beautiful mobile apps engineered with modern Flutter & React Native. We deliver seamless push notification pipelines, offline capabilities, secure APIs, and intuitive user journeys.',
    features: [
      'iOS & Android Dual Deployment',
      'Fluid 60FPS Native Performance',
      'Secure Authentication & Cloud Sync',
      'App Store & Play Store Optimization',
    ],
    badge: 'Mobile Engineering',
    accentColor: '#38bdf8',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '03',
    title: 'Performance Marketing & SEO Growth',
    tagline: 'Data-Driven Multi-Channel Client Acquisition',
    desc: 'Stop burning ad budget on guesswork. We build scalable customer acquisition funnels, laser-targeted Meta & Google ad campaigns, and rank-1 SEO strategies that drive measurable ROI.',
    features: [
      'Google & Meta Ads Scaling',
      'Technical & On-Page SEO Domination',
      'Conversion Rate Optimization (CRO)',
      'Real-Time ROI Analytics Tracking',
    ],
    badge: 'Growth Marketing',
    accentColor: '#ec4899',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '04',
    title: 'AI Automation & Custom SaaS',
    tagline: 'Future-Proofing Your Operations With Intelligent Systems',
    desc: 'Supercharge operational efficiency and launch scalable software products. We integrate cutting-edge AI agents, automated CRM workflows, and custom backend infrastructure built for hyper-growth.',
    features: [
      'Custom AI Agents & Workflows',
      'SaaS Product Architecture',
      'Automated CRM & Lead Pipelines',
      'Scalable Cloud Infrastructure',
    ],
    badge: 'AI & Cloud',
    accentColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const cubeRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cube = cubeRef.current;
      if (!section || !cube) return;

      const totalLayers = servicesList.length;

      // 1. Initial State: Layer 0 active, Layers 1-3 hidden
      servicesList.forEach((_, i) => {
        gsap.set(`.text-layer-${i}`, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 40,
          pointerEvents: i === 0 ? 'auto' : 'none',
        });
      });

      // 2. Master Pinned Timeline: Pin the entire section for 4 scroll units
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${(totalLayers - 1) * 100}%`, // 300% scroll distance for 4 layers
          pin: true,
          scrub: 0.8, // Smooth momentum scroll scrub
          snap: {
            snapTo: 1 / (totalLayers - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: 'power1.inOut',
          },
          onUpdate: (self) => {
            const progress = self.progress;
            const currentIdx = Math.min(
              Math.round(progress * (totalLayers - 1)),
              totalLayers - 1
            );
            setActiveCard(currentIdx);
          },
        },
      });

      // 3. Build step-by-step 3D cube rotation + text transitions for each layer
      for (let i = 0; i < totalLayers - 1; i++) {
        const next = i + 1;
        const targetRotation = next * 90; // 90deg, 180deg, 270deg

        // Step transition: Layer i -> Layer next
        tl.to(
          cube,
          {
            rotateX: targetRotation,
            ease: 'power2.inOut',
            duration: 1,
          },
          i
        );

        // Fade OUT current text layer
        tl.to(
          `.text-layer-${i}`,
          {
            opacity: 0,
            y: -40,
            pointerEvents: 'none',
            ease: 'power2.inOut',
            duration: 0.7,
          },
          i
        );

        // Fade IN next text layer
        tl.fromTo(
          `.text-layer-${next}`,
          {
            opacity: 0,
            y: 40,
            pointerEvents: 'none',
          },
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            ease: 'power2.inOut',
            duration: 0.7,
          },
          i + 0.3
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section className="pinned-services-section" id="services" ref={sectionRef}>
      <div className="services-ambient-glow services-glow-1" />
      <div className="services-ambient-glow services-glow-2" />

      <div className="pinned-services-container">
        
        {/* Top Header Banner */}
        <div className="services-header-clean" data-reveal="fade-up">
          <div className="services-tag-badge">
            <span className="tag-sparkle">✦</span>
            <span className="tag-title">Our Premium Capabilities</span>
          </div>
          <ScrollTitle
            as="h2"
            className="services-main-heading"
            lines={[
              [
                { text: 'Engineering', type: 'normal' },
                { text: 'High-Impact', type: 'normal' },
                { text: 'Solutions', type: 'normal' },
              ],
              [
                { text: 'That', type: 'gradient' },
                { text: 'Fuel', type: 'gradient' },
                { text: 'Growth', type: 'gradient' },
              ],
            ]}
          />
        </div>

        {/* =================================================================
            2-COLUMN STAGE: LEFT (4 TEXT LAYERS) + RIGHT (3D CUBE ROTATOR)
            ================================================================= */}
        <div className="services-stage-body">
          
          {/* 1. LEFT SIDE: 4 TEXT LAYERS */}
          <div className="services-text-viewport">
            {servicesList.map((service, index) => (
              <div
                key={service.id}
                className={`service-text-layer text-layer-${index}`}
              >
                <div className="clean-service-header">
                  <span className="clean-service-num">{service.id}</span>
                  <span className="clean-service-badge">{service.badge}</span>
                </div>

                <h3 className="clean-service-title">{service.title}</h3>
                <h4
                  className="clean-service-tagline"
                  style={{ color: service.accentColor }}
                >
                  {service.tagline}
                </h4>
                <p className="clean-service-desc">{service.desc}</p>

                <div className="clean-features-list">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="clean-feature-row">
                      <span
                        className="clean-feature-bullet"
                        style={{ color: service.accentColor }}
                      >
                        ✦
                      </span>
                      <span className="clean-feature-text">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="clean-service-action">
                  <a href="#contact" className="clean-action-btn">
                    <span>Explore Capability</span>
                    <span className="clean-btn-arrow">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* 2. RIGHT SIDE: 3D CUBE TARGET */}
          <div className="services-cube-viewport">
            <div className="cube-scene-wrapper">
              <div
                className="clean-cube-aura"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${servicesList[activeCard].accentColor}77 0%, rgba(56, 189, 248, 0.18) 50%, transparent 80%)`,
                }}
              />

              {/* 3D Rotator Box */}
              <div className="cube-3d-stage">
                <div className="cube-3d-rotator" ref={cubeRef}>
                  {servicesList.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`cube-face face-${idx + 1}`}
                      style={{ '--face-accent': item.accentColor }}
                    >
                      <div className="face-image-container">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="face-bg-image"
                          loading="lazy"
                        />
                        <div className="face-glass-overlay" />
                        <div className="face-content">
                          <div className="face-top-row">
                            <span className="face-badge-pill">{item.badge}</span>
                            <span className="face-num-pill">{item.id}</span>
                          </div>
                          <h4 className="face-title">{item.title}</h4>
                          <p className="face-tagline">{item.tagline}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Status Pill */}
              <div className="clean-canvas-pill">
                <span
                  className="pill-dot"
                  style={{
                    backgroundColor: servicesList[activeCard].accentColor,
                    boxShadow: `0 0 10px ${servicesList[activeCard].accentColor}`,
                  }}
                />
                <span>
                  {servicesList[activeCard].id} / {servicesList[activeCard].badge}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Services;