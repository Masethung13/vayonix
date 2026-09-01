import React, { useState, useRef } from 'react';
import '../styles/Footer.css';
import logo from '../assets/vayonix-logo1.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const ctaRef = useRef(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  // 3D dynamic mouse spotlight tracking on CTA Banner
  const handleMouseMove = (e) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <footer className="vyn-footer-section" id="contact">
      {/* Ambient Neon Backdrops */}
      <div className="vyn-footer-glow vyn-glow-top" />
      <div className="vyn-footer-glow vyn-glow-bottom" />

      <div className="vyn-footer-container">
        {/* =================================================================
            TOP CTA BANNER: "READY TO GROW YOUR BUSINESS?"
            ================================================================= */}
        <div
          className="vyn-cta-banner"
          ref={ctaRef}
          onMouseMove={handleMouseMove}
          style={{
            '--spotlight-x': `${mousePos.x}%`,
            '--spotlight-y': `${mousePos.y}%`,
          }}
        >
          {/* Dynamic Interactive Cursor Spotlight */}
          <div className="vyn-cta-spotlight" />

          {/* Ambient Wave Texture Overlay */}
          <div className="vyn-cta-wave-glow" />

          <div className="vyn-cta-content">
            <div className="vyn-cta-text-block">
              <h2 className="vyn-cta-title">
                Ready to Grow <span className="vyn-title-gradient">Your Business?</span>
              </h2>
              <p className="vyn-cta-subtitle">Let's build something amazing together.</p>
            </div>

            <a href="#contact" className="vyn-cta-btn">
              <span className="vyn-btn-text">Get A Free Consultation</span>
              <span className="vyn-cta-arrow">→</span>
              <div className="vyn-btn-glow-ring" />
            </a>
          </div>

          {/* Border Specular Sweep */}
          <div className="vyn-cta-shine" />
        </div>

        {/* =================================================================
            MAIN 5-COLUMN FOOTER GRID
            ================================================================= */}
        <div className="vyn-footer-main">
          {/* Column 1: Brand Logo & Socials */}
          <div className="vyn-footer-col vyn-brand-col">
            <a href="#home" className="vyn-footer-logo" aria-label="Vayonix Home">
              <div className="vyn-logo-wrapper">
                <div className="vyn-logo-glow-aura" />
                <img src={logo} alt="Vayonix Logo" className="vyn-footer-logo-img" />
              </div>
            </a>

            <p className="vyn-brand-desc">
              We are a digital innovation agency focused on driving growth, generating high-intent leads, and maximizing ROI for modern enterprises.
            </p>

            {/* Social Orbit Icon Buttons with Magnetic Spring Hover */}
            <div className="vyn-social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="vyn-social-btn" aria-label="Facebook">
                <div className="vyn-social-icon-glow" />
                <svg viewBox="0 0 24 24" fill="none" className="vyn-social-svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="vyn-social-btn" aria-label="Instagram">
                <div className="vyn-social-icon-glow" />
                <svg viewBox="0 0 24 24" fill="none" className="vyn-social-svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="vyn-social-btn" aria-label="LinkedIn">
                <div className="vyn-social-icon-glow" />
                <svg viewBox="0 0 24 24" fill="none" className="vyn-social-svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="vyn-social-btn" aria-label="Twitter">
                <div className="vyn-social-icon-glow" />
                <svg viewBox="0 0 24 24" fill="none" className="vyn-social-svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links with Interactive Sliders */}
          <div className="vyn-footer-col">
            <h3 className="vyn-col-title">Quick Links</h3>
            <ul className="vyn-link-list">
              <li><a href="#home"><span className="vyn-link-bullet">✦</span>Home</a></li>
              <li><a href="#about"><span className="vyn-link-bullet">✦</span>About Us</a></li>
              <li><a href="#services"><span className="vyn-link-bullet">✦</span>Services</a></li>
              <li><a href="#what-we-do"><span className="vyn-link-bullet">✦</span>Case Studies</a></li>
              <li><a href="#why-choose-us"><span className="vyn-link-bullet">✦</span>Process</a></li>
              <li><a href="#contact"><span className="vyn-link-bullet">✦</span>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Services with Interactive Sliders */}
          <div className="vyn-footer-col">
            <h3 className="vyn-col-title">Services</h3>
            <ul className="vyn-link-list">
              <li><a href="#what-we-do"><span className="vyn-link-bullet">✦</span>Web Development</a></li>
              <li><a href="#what-we-do"><span className="vyn-link-bullet">✦</span>App Development</a></li>
              <li><a href="#what-we-do"><span className="vyn-link-bullet">✦</span>SEO Optimization</a></li>
              <li><a href="#what-we-do"><span className="vyn-link-bullet">✦</span>Social Media Marketing</a></li>
              <li><a href="#what-we-do"><span className="vyn-link-bullet">✦</span>Content Marketing</a></li>
              <li><a href="#what-we-do"><span className="vyn-link-bullet">✦</span>Analytics & Reporting</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us with Glowing Hover Cards */}
          <div className="vyn-footer-col">
            <h3 className="vyn-col-title">Contact Us</h3>
            <ul className="vyn-contact-list">
              <li className="vyn-contact-item">
                <div className="vyn-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>+1 (234) 567 8900</span>
              </li>
              <li className="vyn-contact-item">
                <div className="vyn-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>hello@vayonix.com</span>
              </li>
              <li className="vyn-contact-item">
                <div className="vyn-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <span>123 Digital Innovation Way, New York, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter with Advanced Input Focus Aura */}
          <div className="vyn-footer-col vyn-newsletter-col">
            <h3 className="vyn-col-title">Newsletter</h3>
            <p className="vyn-news-desc">Stay updated with the latest digital trends, tech insights, and case studies.</p>

            <form onSubmit={handleSubscribe} className="vyn-subscribe-form">
              <div className="vyn-input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="vyn-email-input"
                />
                <button type="submit" className="vyn-send-btn" aria-label="Subscribe to newsletter">
                  <svg viewBox="0 0 24 24" fill="none" className="vyn-send-icon">
                    <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              {subscribed && <p className="vyn-sub-success">✦ Thank you for subscribing!</p>}
            </form>
          </div>
        </div>

        {/* =================================================================
            BOTTOM COPYRIGHT BAR
            ================================================================= */}
        <div className="vyn-footer-bottom">
          <p className="vyn-copyright-text">
            © {new Date().getFullYear()} <span className="vyn-brand-name">Vayonix</span>. All rights reserved.
          </p>
          <div className="vyn-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="vyn-legal-sep">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="vyn-legal-sep">•</span>
            <a href="#security">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
