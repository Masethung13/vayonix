import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import ThemeToggle from './ThemeToggle';
import '../styles/LegalPg.css';
import bannerBg from '../assets/abt-banner-bg.jpg';

const TermsOfService = () => {
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
            alt="Vayonix terms of service background"
            className="lgl-banner-bg-img"
          />
          <div className="lgl-banner-dark-overlay" />
        </div>

        <div className="lgl-banner-container" data-reveal="fade-up">
          <div className="lgl-banner-badge">
            <span>✦</span>
            <span>Commercial Terms & Policies</span>
          </div>
          <h1 className="lgl-banner-title">Terms of Service</h1>
          <div className="lgl-breadcrumbs">
            <Link to="/" className="lgl-crumb-link">Home</Link>
            <span className="lgl-crumb-sep">/</span>
            <span>Legal</span>
            <span className="lgl-crumb-sep">/</span>
            <span className="lgl-crumb-current">Terms of Service</span>
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
              <Link to="/privacy-policy" className="lgl-switch-btn">
                <span>Privacy Policy</span>
                <span>→</span>
              </Link>
              <Link to="/terms-of-service" className="lgl-switch-btn active">
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
                <a href="#acceptance" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>1. Acceptance of Terms</span>
                </a>
                <a href="#services-scope" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>2. Services & Engagements</span>
                </a>
                <a href="#milestones-payments" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>3. Milestones & Payments</span>
                </a>
                <a href="#ip-ownership" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>4. 100% IP Ownership</span>
                </a>
                <a href="#revisions-warranty" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>5. Revisions & Warranty</span>
                </a>
                <a href="#sla-commitments" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>6. SLA Turnaround</span>
                </a>
                <a href="#liability-disclaimer" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>7. Liability Limitations</span>
                </a>
                <a href="#governing-law" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>8. Governing Jurisdiction</span>
                </a>
                <a href="#contact-governance" className="lgl-toc-link">
                  <span className="lgl-toc-dot" />
                  <span>9. Corporate Inquiries</span>
                </a>
              </nav>
            </div>

            {/* Fast Reach Legal Card */}
            <div className="lgl-sidebar-card lgl-contact-card">
              <h3 className="lgl-sidebar-title" style={{ justifyContent: 'center' }}>
                <span>✦</span> Commercial Terms?
              </h3>
              <p className="lgl-contact-desc">
                Need customized enterprise service agreements, master service agreements (MSA), or statement of work (SOW) terms?
              </p>
              <a href="mailto:hello.vayonixinfotech@gmail.com" className="lgl-contact-btn">
                Contact Strategy Lead
              </a>
            </div>
          </aside>

          {/* MAIN DOCUMENT BODY */}
          <article className="lgl-content-body" data-reveal="fade-up">
            <header className="lgl-doc-header">
              <div className="lgl-last-updated">Last Updated: September 2026 • Version 2.4</div>
              <p className="lgl-doc-lead">
                Welcome to <strong>Vayonix Infotech</strong> ("Vayonix"). These Terms of Service ("Terms") govern your access to our website, digital consultation sessions, proposal evaluations, and all commercial engineering and marketing deliverables produced by our agency.
              </p>
            </header>

            {/* Section 1 */}
            <section id="acceptance" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">01</span>
                Acceptance of Terms
              </h2>
              <p>
                By accessing <Link to="/" style={{ color: 'var(--lgl-accent-cyan)' }}>vayonix.com</Link>, requesting a technical audit or proposal, or signing an authorized Statement of Work (SOW), you confirm that you are at least 18 years of age and legally authorized to enter into binding agreements on behalf of your corporate entity.
              </p>
              <p>
                If you do not agree with any provision set forth in these Terms, you must discontinue platform access and refrain from commissioning services through Vayonix.
              </p>
            </section>

            {/* Section 2 */}
            <section id="services-scope" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">02</span>
                Scope of Agency Services
              </h2>
              <p>
                Vayonix provides premium end-to-end digital engineering and growth architecture services, including:
              </p>
              <ul className="lgl-bullet-list">
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Custom Web Design & UI/UX:</strong> High-performance Next.js, React, and modern micro-animated web interfaces engineered for optimal conversion and sub-second load times.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Full-Stack Mobile Engineering:</strong> Native iOS, Android, and cross-platform Flutter/React Native application ecosystems.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Search Engine Optimization (SEO):</strong> Algorithmic audits, programmatic keyword architecture, backlink campaigns, and technical Core Web Vitals optimization.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Performance Marketing & Paid Ads:</strong> Data-backed customer acquisition across Meta Ads, Google Ads, and automated conversion funnels.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>AI & Workflow Automations:</strong> Custom CRM pipelines, automated lead scoring, and bespoke intelligent bots.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="milestones-payments" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">03</span>
                Milestone Billing & Payment Schedules
              </h2>
              <p>
                Unless explicitly stipulated in a personalized Statement of Work (SOW), project billing adheres to a transparent milestone model:
              </p>
              <ul className="lgl-bullet-list">
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Project Commencement Deposit:</strong> A scheduled upfront retainer (typically 30% to 50%) is required to allocate senior engineering resources and begin architecture sprint planning.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Interim Milestones:</strong> Incremental milestone disbursements tied to demonstrable sprint deliverables (e.g., Wireframe Approval, Beta Staging Deployment).</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Final Release:</strong> Remaining balance is cleared prior to live production migration, final source repository transfer, and domain DNS release.</span>
                </li>
              </ul>
              <p>
                All invoices are payable within 7 business days from issuance. Overdue accounts may cause temporary suspension of active sprint development until accounts are reconciled.
              </p>
            </section>

            {/* Section 4 */}
            <section id="ip-ownership" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">04</span>
                100% Intellectual Property Ownership
              </h2>
              <div className="lgl-callout-box">
                <div className="lgl-callout-title">
                  <span>✦</span> Complete IP Transfer Guarantee
                </div>
                <p className="lgl-callout-desc">
                  Upon receipt of final milestone payment, 100% of all intellectual property rights, bespoke source code, UI/UX designs, Figma assets, and custom illustrations created for the project are unconditionally assigned and transferred to the client.
                </p>
              </div>
              <p>
                Vayonix retains ownership of its pre-existing proprietary tools, modular starter boilerplates, and open-source libraries incorporated under permissive licenses (e.g., MIT, Apache 2.0). Vayonix reserves the standard industry right to display the completed work in agency portfolios unless prohibited under an executed NDA.
              </p>
            </section>

            {/* Section 5 */}
            <section id="revisions-warranty" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">05</span>
                Revisions & 30-Day Post-Launch Warranty
              </h2>
              <p>
                We believe in delivering perfection with zero compromises:
              </p>
              <ul className="lgl-bullet-list">
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Sprint Revisions:</strong> Up to two (2) complimentary rounds of revisions are included during each designated design and functional prototyping phase.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>30-Day Defect Warranty:</strong> Every web and mobile deployment includes 30 days of comprehensive post-launch bug fixing and technical support to ensure seamless stability.</span>
                </li>
                <li className="lgl-bullet-item">
                  <span className="lgl-bullet-spark">✦</span>
                  <span><strong>Out-of-Scope Requests:</strong> Functional changes requested after sign-off that expand beyond the agreed scope are quoted transparently via supplemental change orders.</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="sla-commitments" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">06</span>
                Service Level Commitments (SLA)
              </h2>
              <p>
                Our standard SLA commits our senior development and design team to respond to client communications within <strong>24 business hours</strong>. Critical production incidents for ongoing maintenance clients receive accelerated priority response within <strong>4 hours</strong>.
              </p>
            </section>

            {/* Section 7 */}
            <section id="liability-disclaimer" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">07</span>
                Limitation of Liability
              </h2>
              <p>
                In no event shall Vayonix Infotech, its directors, partners, or engineers be liable for indirect, punitive, incidental, or consequential damages (including loss of business profits, data corruption, or third-party platform API outages such as Google Cloud, AWS, or Apple Store policy changes) arising from the use of delivered software.
              </p>
              <p>
                Our aggregate financial liability in connection with any claim arising out of a specific project agreement shall not exceed the total fees actually paid to Vayonix under that specific Statement of Work.
              </p>
            </section>

            {/* Section 8 */}
            <section id="governing-law" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">08</span>
                Governing Jurisdiction & Dispute Resolution
              </h2>
              <p>
                These Terms and all commercial agreements entered into with Vayonix Infotech shall be governed by and construed in accordance with the laws of India, without giving effect to conflicts of law principles.
              </p>
              <p>
                Any dispute, controversy, or claim arising out of or relating to these Terms shall first be submitted to good-faith mutual mediation before proceeding to competent legal courts.
              </p>
            </section>

            {/* Section 9 */}
            <section id="contact-governance" className="lgl-section">
              <h2 className="lgl-sec-heading">
                <span className="lgl-sec-num">09</span>
                Corporate Inquiries & Legal Contact
              </h2>
              <p>
                For official correspondence, master service agreements, or formal inquiries regarding these Terms of Service, contact our executive office:
              </p>

              <div className="lgl-contact-grid">
                <div className="lgl-contact-item-box">
                  <div className="lgl-contact-lbl">Corporate Email</div>
                  <a href="mailto:hello.vayonixinfotech@gmail.com" className="lgl-contact-val">
                    hello.vayonixinfotech@gmail.com
                  </a>
                </div>

                <div className="lgl-contact-item-box">
                  <div className="lgl-contact-lbl">Direct Contact / WhatsApp</div>
                  <a href="https://wa.me/919092007731" target="_blank" rel="noopener noreferrer" className="lgl-contact-val">
                    +91 90920 07731
                  </a>
                </div>

                <div className="lgl-contact-item-box">
                  <div className="lgl-contact-lbl">Official Social Channel</div>
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
        <ThemeToggle id="terms-theme-toggle" />
      </div>
    </div>
  );
};

export default TermsOfService;

