import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import ThemeToggle from './ThemeToggle';
import '../styles/LegalPg.css';
import bannerBg from '../assets/abt-banner-bg.jpg';

const PrivacyPolicy = () => {
  useScrollReveal(0.08);

  // Scroll Progress & Scroll-to-Top Button
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollY > 250);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(100, Math.round((scrollY / totalScroll) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="lgl-page-wrapper">
      {/* =====================================================================
          1. TOP HERO BANNER
          ===================================================================== */}
      <section className="lgl-top-banner">
        <div className="lgl-banner-bg-wrap">
          <img
            src={bannerBg}
            alt="Vayonix legal and privacy background"
            className="lgl-banner-bg-img"
          />
          <div className="lgl-banner-dark-overlay" />
        </div>

        <div className="lgl-banner-container" data-reveal="fade-up">
          <div className="lgl-banner-badge">
            <span>✦</span>
            <span>Legal Documentation</span>
          </div>
          <h1 className="lgl-banner-title">Privacy Policy</h1>
          <div className="lgl-breadcrumbs">
            <Link to="/" className="lgl-crumb-link">Home</Link>
            <span className="lgl-crumb-sep">/</span>
            <span>Legal</span>
            <span className="lgl-crumb-sep">/</span>
            <span className="lgl-crumb-current">Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. MAIN CONTENT SECTION
          ===================================================================== */}
      <section className="lgl-main-section">
        <div className="lgl-container">
          {/* STICKY SIDEBAR */}
          <aside className="lgl-sidebar" data-reveal="fade-right">
            {/* Document Switcher */}
            <div className="lgl-sidebar-card lgl-switch-card">
              <h3 className="lgl-sidebar-title">
                <span>✦</span> Legal Documents
              </h3>
              <Link to="/privacy-policy" className="lgl-switch-btn active">
                <span>Privacy Policy</span>
                <span>→</span>
              </Link>
              <Link to="/terms-of-service" className="lgl-switch-btn">
                <span>Terms of Service</span>
                <span>→</span>
              </Link>
            </div>

            {/* Quick Table of Contents */}
            <div className="lgl-sidebar-card">
              <h3 className="lgl-sidebar-title">
                <span>✦</span> Table of Contents
              </h3>
              <nav className="lgl-toc-nav">
                <a href="#overview" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>1. Overview & Scope</span>
                </a>
                <a href="#data-collection" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>2. Information Collected</span>
                </a>
                <a href="#data-usage" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>3. How We Use Data</span>
                </a>
                <a href="#client-confidentiality" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>4. Confidentiality & NDA</span>
                </a>
                <a href="#cookies-analytics" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>5. Cookies & Tracking</span>
                </a>
                <a href="#security-storage" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>6. Security & Storage</span>
                </a>
                <a href="#user-rights" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>7. Your Legal Rights</span>
                </a>
                <a href="#contact-privacy" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>8. Privacy Inquiries</span>
                </a>
              </nav>
            </div>

            {/* Fast Reach Legal Card */}
            <div className="lgl-sidebar-card lgl-contact-card">
              <h3 className="lgl-sidebar-title" style={{ justifyContent: 'center' }}>
                <span>✦</span> Questions?
              </h3>
              <p className="lgl-contact-desc">
                Have questions regarding how your corporate data, assets, or inquiries are managed?
              </p>
              <a href="mailto:hello.vayonixinfotech@gmail.com" className="lgl-contact-btn">
                Email Legal Team
              </a>
            </div>
          </aside>

          {/* MAIN DOCUMENT BODY */}
          <article className="lgl-content-body" data-reveal="fade-up">
            <header className="lgl-doc-header">
              <div className="lgl-last-updated">Last Updated: September 2026 • Version 2.4</div>
              <p className="lgl-doc-lead">
                At <strong>Vayonix Infotech</strong> ("Vayonix", "we", "our", or "us"), we are dedicated to safeguarding your privacy and protecting all digital assets, proprietary business information, and personal data entrusted to us when exploring our website or partnering on digital solutions.
              </p>
            </header>

            {/* Section 1 */}
            <section id="overview" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">01</span>
                Overview & Scope
              </h2>
              <p>
                This Privacy Policy articulates our practices regarding the collection, transmission, processing, storage, and safeguarding of information gathered through our official platform (<Link to="/" style={{ color: 'var(--lgl-accent-cyan)' }}>vayonix.com</Link>), client inquiry portals, discovery consultation calls, and commercial service contracts.
              </p>
              <p>
                By accessing our website or engaging Vayonix for custom web design, mobile software engineering, SEO acceleration, performance marketing, or AI workflows, you acknowledge and agree to the policies detailed herein.
              </p>

              <div className="lgl-callout-box">
                <div className="lgl-callout-title">
                  <span>✦</span> Zero-Data-Selling Pledge
                </div>
                <p className="lgl-callout-desc">
                  Vayonix maintains a strict policy: we never sell, lease, monetize, or broker your personal information or proprietary business data to third-party data brokers, marketers, or advertisers under any circumstances.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="data-collection" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">02</span>
                Information We Collect
              </h2>
              <p>
                Depending on how you interact with our digital agency services, we collect information in the following categories:
              </p>
              <ul className="lgl-bullet-list">
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <div>
                    <strong>Direct Inquiry Data:</strong> Full name, corporate email address (<span style={{ color: 'var(--lgl-accent-cyan)' }}>e.g., hello.vayonixinfotech@gmail.com</span>), direct phone or WhatsApp number, service scope preferences, project budget parameters, and technical requirements provided via our contact forms.
                  </div>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <div>
                    <strong>Project Materials & Assets:</strong> Wireframes, design guidelines, brand assets, source code repositories, API credentials, and marketing analytics submitted for project execution under mutual non-disclosure.
                  </div>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <div>
                    <strong>Automated Diagnostic Telemetry:</strong> Anonymized browser metadata, screen dimensions, operating system type, approximate geo-location, page interaction timelines, and referring domains collected to optimize front-end performance and Core Web Vitals.
                  </div>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="data-usage" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">03</span>
                How We Use Your Data
              </h2>
              <p>
                All data collected is utilized solely to deliver high-performance digital products and exceptional agency service:
              </p>
              <ul className="lgl-bullet-list">
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span>Reviewing project briefs and generating accurate technical roadmaps and price proposals.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span>Executing custom web applications, native and cross-platform mobile apps, and search optimization architectures.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span>Maintaining regular communication via email, WhatsApp, and project management portals throughout the delivery cycle.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span>Monitoring server performance, preventing malicious exploits, and maintaining platform uptime.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="client-confidentiality" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">04</span>
                Client Confidentiality & NDA Protection
              </h2>
              <p>
                We treat every client concept, enterprise database architecture, business logic model, and intellectual property with military-grade confidentiality:
              </p>
              <div className="lgl-callout-box">
                <div className="lgl-callout-title">
                  <span>✦</span> Non-Disclosure Agreement (NDA) Guarantee
                </div>
                <p className="lgl-callout-desc">
                  Prior to code implementation or file sharing, we readily execute mutual or client-provided NDAs. Your proprietary algorithms, designs, and strategic trade secrets remain 100% confidential and are never repurposed.
                </p>
              </div>
              <p>
                Access to client codebases and production credentials is strictly gated via multi-factor authentication and role-based permissions restricted exclusively to assigned lead engineers.
              </p>
            </section>

            {/* Section 5 */}
            <section id="cookies-analytics" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">05</span>
                Cookies & Analytical Tracking
              </h2>
              <p>
                Our platform utilizes essential cookies and lightweight telemetry to ensure fluid navigation, retain your selected visual theme (Dark Mode / Light Luxury Gold), and assess aggregated traffic metrics.
              </p>
              <p>
                You retain full authority to disable non-essential cookies via your browser preferences without impeding core access to our site's content and service descriptions.
              </p>
            </section>

            {/* Section 6 */}
            <section id="security-storage" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">06</span>
                Security Architecture & Storage
              </h2>
              <p>
                We employ industry-standard cryptographic protocols to protect information during transit and at rest:
              </p>
              <ul className="lgl-bullet-list">
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Transport Layer Security:</strong> All web traffic is routed over strict HTTPS / TLS 1.3 encryption.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Cloud Infrastructure:</strong> Contact inquiries and forms are processed securely via Google Firebase Cloud Firestore with granular access control rules.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Periodic Security Audits:</strong> Continuous vulnerability scanning and dependency audits prevent injection attacks and data leakage.</span>
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="user-rights" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">07</span>
                Your Legal Rights (GDPR / CCPA)
              </h2>
              <p>
                Regardless of your geographic location, Vayonix upholds your digital autonomy and rights:
              </p>
              <ul className="lgl-bullet-list">
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Right to Access:</strong> Request a comprehensive export of all personal data held concerning you.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Right to Erasure:</strong> Request permanent deletion of all stored inquiries and contact records ("Right to be Forgotten").</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Right to Rectification:</strong> Promptly correct or update any inaccurate contact or corporate details.</span>
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="contact-privacy" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">08</span>
                Privacy Inquiries & Compliance Contact
              </h2>
              <p>
                To exercise any of your privacy rights, file a compliance query, or discuss mutual data processing terms, reach our governance team directly:
              </p>

              <div className="lgl-contact-grid">
                <div className="lgl-contact-item-box">
                  <div className="lgl-contact-lbl">Official Inquiries Email</div>
                  <a href="mailto:hello.vayonixinfotech@gmail.com" className="lgl-contact-val">
                    hello.vayonixinfotech@gmail.com
                  </a>
                </div>

                <div className="lgl-contact-item-box">
                  <div className="lgl-contact-lbl">Instant Support / WhatsApp</div>
                  <a href="https://wa.me/919092007731" target="_blank" rel="noopener noreferrer" className="lgl-contact-val">
                    +91 90920 07731
                  </a>
                </div>

                <div className="lgl-contact-item-box">
                  <div className="lgl-contact-lbl">Official Instagram</div>
                  <a href="https://www.instagram.com/vayonix._.infotech?igsi=MTJvdDAzb3YwN3B2OQ==" target="_blank" rel="noopener noreferrer" className="lgl-contact-val">
                    @vayonix._.infotech
                  </a>
                </div>
              </div>
            </section>
          </article>
        </div>
      </section>

      {/* FLOATING ACTION CLUSTER (SCROLL-TO-TOP) */}
      <div className="floating-action-cluster">
        <button
          className={`scroll-to-top-btn ${showScrollTop ? 'btn-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title={`Scroll to top (${scrollProgress}%)`}
        >
          <svg className="scroll-progress-svg" viewBox="0 0 48 48">
            <circle className="scroll-progress-track" cx="24" cy="24" r="20" />
            <circle
              className="scroll-progress-bar"
              cx="24"
              cy="24"
              r="20"
              style={{
                strokeDasharray: 125.66,
                strokeDashoffset: 125.66 - (scrollProgress / 100) * 125.66,
              }}
            />
          </svg>
          <div className="scroll-arrow-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" className="scroll-arrow-svg">
              <path
                d="M12 19V5M5 12L12 5L19 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="scroll-btn-glow" />
        </button>

        {/* Theme Toggle Component with Sun & Moon and Expanding Wave */}
        <ThemeToggle id="privacy-theme-toggle" />
      </div>
    </div>
  );
};

export default PrivacyPolicy;

