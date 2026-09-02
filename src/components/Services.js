import React, { useEffect, useRef, useState } from 'react';
import '../styles/Services.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollTitle from './ScrollTitle';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 80;

// Helper to resolve frame image paths
const getFrameSrc = (index) => {
  const padded = String(index).padStart(3, '0');
  try {
    return require(`../assets/gsap/ezgif-frame-${padded}.jpg`);
  } catch (e) {
    return null;
  }
};

const Services = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef([]);

  const servicesList = [
    {
      id: '01',
      title: 'Custom Web Design & UI/UX',
      tagline: 'Architecting Digital Real Estate That Dominates Markets',
      desc: 'We design and engineer bespoke web platforms tailored to your brand. From lightning-fast Next.js/React frontends to ultra-clean responsive UI/UX, we ensure every visitor converts into a high-value customer.',
      features: ['Modern React & Next.js Architecture', 'Mobile-First Responsive Layouts', 'Interactive Micro-Animations & 3D', 'High-Speed Core Web Vitals'],
      badge: 'Web Architecture'
    },
    {
      id: '02',
      title: 'Full-Stack Mobile App Development',
      tagline: 'Native & Cross-Platform iOS and Android Ecosystems',
      desc: 'Scalable, beautiful mobile apps engineered with modern Flutter & React Native. We deliver seamless push notification pipelines, offline capabilities, secure APIs, and intuitive user journeys.',
      features: ['iOS & Android Dual Deployment', 'Fluid 60FPS Native Performance', 'Secure Authentication & Cloud Sync', 'App Store & Play Store Optimization'],
      badge: 'Mobile Engineering'
    },
    {
      id: '03',
      title: 'Performance Marketing & SEO Growth',
      tagline: 'Data-Driven Multi-Channel Client Acquisition',
      desc: 'Stop burning ad budget on guesswork. We build scalable customer acquisition funnels, laser-targeted Meta & Google ad campaigns, and rank-1 SEO strategies that drive measurable ROI.',
      features: ['Google & Meta Ads Scaling', 'Technical & On-Page SEO Domination', 'Conversion Rate Optimization (CRO)', 'Real-Time ROI Analytics Tracking'],
      badge: 'Growth Marketing'
    },
    {
      id: '04',
      title: 'AI Automation & Custom SaaS',
      tagline: 'Future-Proofing Your Operations With Intelligent Systems',
      desc: 'Supercharge operational efficiency and launch scalable software products. We integrate cutting-edge AI agents, automated CRM workflows, and custom backend infrastructure built for hyper-growth.',
      features: ['Custom AI Agents & Workflows', 'SaaS Product Architecture', 'Automated CRM & Lead Pipelines', 'Scalable Cloud Infrastructure'],
      badge: 'AI & Cloud'
    },
  ];

  // Preload all 80 frames for 60fps instant scrub
  useEffect(() => {
    const loadedImgs = [];
    let count = 0;

    const handleLoad = () => {
      count++;
      if (count >= FRAME_COUNT - 5) {
        setImagesLoaded(true);
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const src = getFrameSrc(i);
      if (src) {
        img.src = src;
        img.onload = handleLoad;
      }
      loadedImgs.push(img);
    }
    imagesRef.current = loadedImgs;
  }, []);

  // Draw current frame onto canvas maintaining aspect ratio
  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];

    if (img && img.complete) {
      canvas.width = 1280;
      canvas.height = 720;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  };

  // GSAP ScrollTrigger Sequence Setup
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    // Initial first frame render
    renderFrame(0);

    const frameObj = { frame: 0 };

    // GSAP ScrollTrigger for smooth frame scrubbing across the section scroll
    const frameTimeline = gsap.to(frameObj, {
      frame: FRAME_COUNT - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: '.clean-services-list',
        start: 'top 65%',
        end: 'bottom 65%',
        scrub: 0.3,
        onUpdate: () => {
          const currentIdx = Math.round(frameObj.frame);
          renderFrame(currentIdx);
        },
      },
    });

    // Animate each service item one-by-one with smooth focus highlight as you scroll
    const serviceItems = gsap.utils.toArray('.clean-service-item');
    serviceItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActiveCard(index),
        onEnterBack: () => setActiveCard(index),
        toggleClass: { targets: item, className: 'is-in-focus' },
      });
    });

    return () => {
      frameTimeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  return (
    <section className="clean-services-section" id="services" ref={sectionRef}>
      <div className="services-ambient-glow services-glow-1" />
      <div className="services-ambient-glow services-glow-2" />

      <div className="clean-services-container">
        {/* Top Header */}
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
          <p className="services-sub-heading">
            Explore our core specializations. Scroll through to see each capability come to life.
          </p>
        </div>

        {/* Open Dual Layout: Scrolling Services Left + Static Fixed Canvas Right */}
        <div className="clean-services-body">
          {/* =================================================================
              LEFT SIDE: STREAM OF SERVICES (Scrolling Naturally One by One)
              ================================================================= */}
          <div className="clean-services-list" data-reveal="fade-right">
            {servicesList.map((service, index) => {
              const isFocused = activeCard === index;
              return (
                <div
                  key={service.id}
                  className={`clean-service-item ${isFocused ? 'is-in-focus' : ''}`}
                  data-reveal="fade-right"
                  data-reveal-delay={`${index * 100}`}
                >
                  <div className="clean-service-header">
                    <span className="clean-service-num">{service.id}</span>
                    <span className="clean-service-badge">{service.badge}</span>
                  </div>

                  <h3 className="clean-service-title">{service.title}</h3>
                  <h4 className="clean-service-tagline">{service.tagline}</h4>
                  <p className="clean-service-desc">{service.desc}</p>

                  <div className="clean-features-list">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="clean-feature-row">
                        <span className="clean-feature-bullet">✦</span>
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
              );
            })}
          </div>

          {/* =================================================================
              RIGHT SIDE: STATIC FIXED / STICKY CANVAS (Locked in Viewport Center)
              ================================================================= */}
          <div className="clean-canvas-sticky-col" data-reveal="fade-left">
            <div className="clean-canvas-wrapper">
              <div className="clean-canvas-aura" />
              
              {/* Frameless Smooth HTML5 Canvas */}
              <canvas ref={canvasRef} className="clean-gsap-canvas" />

              {/* Floating Minimalist Phase Pill */}
              <div className="clean-canvas-pill">
                <span className="pill-dot"></span>
                <span>{servicesList[activeCard].id} / {servicesList[activeCard].badge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
