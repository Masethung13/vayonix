import React, { useEffect, useRef, useState } from 'react';
import '../styles/Services.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollTitle from './ScrollTitle';

import uiUxImg from '../assets/ui-ux1.png';
import androidAppImg from '../assets/android-app-img.webp';
import seoImg from '../assets/seo-img.avif';
import seoDarkImg from '../assets/seo-dark.png';
import adsImg from '../assets/ads-img.jpg';

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
    image: uiUxImg,
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
    image: androidAppImg,
  },
  {
    id: '03',
    title: 'Search Engine Optimization (SEO)',
    tagline: 'Dominate Top Search Rankings & Compound Inbound Leads',
    desc: 'Dominate organic search results with deep technical audits, semantic keyword clustering, high-authority backlink architecture, and core web vitals speed optimization that drive scalable organic traffic.',
    features: [
      'Technical & On-Page SEO',
      'Keyword Clustering & Search Intent',
      'Authority Backlink Building',
      'Core Web Vitals Speed Optimization',
    ],
    badge: 'SEO & Search',
    accentColor: '#ec4899',
    image: seoImg,
    darkImage: seoDarkImg,
  },
  {
    id: '04',
    title: 'Paid Ads & Performance Promotion',
    tagline: 'High-ROI Multi-Platform Paid Ads & Viral Campaigns',
    desc: 'Stop burning ad budget on guesswork. We build laser-targeted Meta, Google, TikTok, and YouTube ad campaigns with high-converting copy, scroll-stopping creatives, and ruthless ROI optimization.',
    features: [
      'Google Search & Performance Max Ads',
      'Meta (Facebook & Instagram) Scaling',
      'Audience Retargeting & Funnel Growth',
      'High-Converting Creative Ad Design',
    ],
    badge: 'Ads Promotion',
    accentColor: '#10b981',
    image: adsImg,
  },
];

const Services = () => {
  const outerWrapperRef = useRef(null); // Stable outer root
  const pinnedSectionRef = useRef(null); // Pinned target
  const cubeRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  // Dynamic Theme Synchronization (Dark / Light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vayonix_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    const handleThemeSync = () => {
      const currentTheme = localStorage.getItem('vayonix_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    };
    window.addEventListener('theme_change', handleThemeSync);
    window.addEventListener('storage', handleThemeSync);
    return () => {
      window.removeEventListener('theme_change', handleThemeSync);
      window.removeEventListener('storage', handleThemeSync);
    };
  }, []);

  useEffect(() => {
    // Wrap inside gsap.context so all animations and pin-spacers revert on unmount
    const ctx = gsap.context(() => {
      const pinnedSection = pinnedSectionRef.current;
      const cube = cubeRef.current;
      if (!pinnedSection || !cube) return;

      const totalLayers = servicesList.length;

      // 1. Initial State for all 4 Layers
      servicesList.forEach((_, i) => {
        gsap.set(`.text-layer-${i}`, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 30,
          pointerEvents: i === 0 ? 'auto' : 'none',
        });
      });

      // 2. Pinned Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedSection,
          start: 'top top',
          end: `+=${(totalLayers - 1) * 100}%`,
          pin: true,
          scrub: 0.8,
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

      // 3. Step-by-Step 3D Cube Rotation & Text Layer Crossfade
      for (let i = 0; i < totalLayers - 1; i++) {
        const next = i + 1;
        const targetRotation = next * 90;

        tl.to(
          cube,
          {
            rotateX: targetRotation,
            ease: 'power2.inOut',
            duration: 1,
          },
          i
        );

        tl.to(
          `.text-layer-${i}`,
          {
            opacity: 0,
            y: -30,
            pointerEvents: 'none',
            ease: 'power2.inOut',
            duration: 0.7,
          },
          i
        );

        tl.fromTo(
          `.text-layer-${next}`,
          {
            opacity: 0,
            y: 30,
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
    }, outerWrapperRef); // Scope to outerWrapperRef

    return () => {
      // Revert completely restores the DOM tree before React unmounts it
      ctx.revert();
    };
  }, []);

  return (
    // Stable outer wrapper prevents React from losing track of children
    <div className="services-outer-wrapper" ref={outerWrapperRef}>
      <section className="pinned-services-section" id="services" ref={pinnedSectionRef}>
        <div className="services-ambient-glow services-glow-1" />
        <div className="services-ambient-glow services-glow-2" />

        <div className="pinned-services-container">
          {/* Top Header Banner */}
          <div className="services-header-clean">
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
              2-COLUMN STAGE: LEFT (TEXT LAYERS) + RIGHT (3D CUBE SHOWCASE)
              ================================================================= */}
          <div className="services-stage-body">
            {/* 1. TEXT VIEWPORT (Left) */}
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
                      <span className="vyn-btn-arrow-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 19" className="vyn-btn-arrow-svg">
                          <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. 3D CUBE VIEWPORT (Right) */}
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
                    {servicesList.map((item, idx) => {
                      const displayImg = item.darkImage
                        ? (theme === 'dark' ? item.darkImage : item.image)
                        : item.image;

                      return (
                        <div
                          key={item.id}
                          className={`cube-face face-${idx + 1}`}
                          style={{ '--face-accent': item.accentColor }}
                        >
                          <div className="face-image-container">
                            <img
                              src={displayImg}
                              alt={item.title}
                              className="face-bg-image"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;