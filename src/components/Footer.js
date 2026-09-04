import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/Footer.css';
import logo from '../assets/vayonix-footer-img.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); // type: 'success' | 'error' | ''

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!cleanEmail) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // 1. Save subscriber email to Firebase Firestore
      const firestorePromise = addDoc(collection(db, 'subscribers'), {
        email: cleanEmail,
        source: 'footer_newsletter',
        status: 'active',
        createdAt: serverTimestamp()
      });

      // 2. Dispatch via FormSubmit AJAX to send reply mail to the user + notification to hello.vayonixinfotech@gmail.com
      const formSubmitPromise = fetch('https://formsubmit.co/ajax/hello.vayonixinfotech@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          email: cleanEmail,
          Email: cleanEmail,
          _replyto: cleanEmail,
          _subject: 'Thank You for Subscribing to Vayonix Infotech!',
          _autoresponse: `Thank you for subscribing to Vayonix Infotech!

We are thrilled to welcome you to our community. You will now receive our exclusive insights on digital transformation, high-converting web and mobile engineering, AI automations, and growth marketing strategies.

Need help building your next digital product or scaling your brand?
• WhatsApp: +91 90920 07731
• Email: hello.vayonixinfotech@gmail.com
• Website: https://vayonix-info.web.app

Best regards,
The Vayonix Infotech Team`,
          _template: 'table',
          _captcha: 'false',
          'Subscriber Email': cleanEmail,
          'Subscription Type': 'Newsletter',
          'Date & Time': new Date().toLocaleString()
        })
      });

      const [, formSubmitResponse] = await Promise.all([firestorePromise, formSubmitPromise]);
      const formSubmitData = await formSubmitResponse.json().catch(() => ({}));

      if (formSubmitResponse.ok || formSubmitData.success) {
        setStatus({
          type: 'success',
          message: '✦ Thank you for subscribing! A confirmation email has been sent to your inbox.'
        });
        setEmail('');
      } else {
        throw new Error(formSubmitData.message || 'Form submission failed');
      }

      // Auto-clear success message after 7 seconds
      setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 7000);
    } catch (error) {
      console.error('Footer Newsletter Subscription Error:', error);
      setStatus({
        type: 'error',
        message: 'Could not complete subscription. Please email us at hello.vayonixinfotech@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="vyn-footer-section" id="contact">
      {/* Ambient Neon Backdrops */}
      <div className="vyn-footer-glow vyn-glow-top" />
      <div className="vyn-footer-glow vyn-glow-bottom" />

      <div className="vyn-footer-container">
        {/* =================================================================
            MAIN 5-COLUMN FOOTER GRID
            ================================================================= */}
        <div className="vyn-footer-main">
          {/* Column 1: Brand Logo & Socials */}
          <div className="vyn-footer-col vyn-brand-col" data-reveal="fade-right">
            <Link to="/" className="vyn-footer-logo" aria-label="Vayonix Home">
              <div className="vyn-logo-wrapper">
                <div className="vyn-logo-glow-aura" />
                <img src={logo} alt="Vayonix Logo" className="vyn-footer-logo-img" />
              </div>
            </Link>

            <p className="vyn-brand-desc">
              We are a digital innovation agency focused on driving growth, generating high-intent leads, and maximizing ROI for modern enterprises.
            </p>

            {/* Social Orbit Icon Buttons */}
            <div className="vyn-social-row">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/vayonix._.infotech?igsi=MTJvdDAzb3YwN3B2OQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="vyn-social-btn vyn-social-instagram"
                aria-label="Instagram"
                title="Follow us on Instagram"
              >
                <div className="vyn-social-icon-glow" />
                <svg viewBox="0 0 24 24" fill="none" className="vyn-social-svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919092007731"
                target="_blank"
                rel="noopener noreferrer"
                className="vyn-social-btn vyn-social-whatsapp"
                aria-label="WhatsApp"
                title="Chat with us on WhatsApp"
              >
                <div className="vyn-social-icon-glow" />
                <svg viewBox="0 0 24 24" fill="currentColor" className="vyn-social-svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>

              {/* Direct Email */}
              <a
                href="mailto:hello.vayonixinfotech@gmail.com"
                className="vyn-social-btn vyn-social-email"
                aria-label="Direct Email"
                title="Email hello.vayonixinfotech@gmail.com"
              >
                <div className="vyn-social-icon-glow" />
                <svg viewBox="0 0 24 24" fill="none" className="vyn-social-svg">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="vyn-social-btn vyn-social-linkedin"
                aria-label="LinkedIn"
                title="Connect on LinkedIn"
              >
                <div className="vyn-social-icon-glow" />
                <svg viewBox="0 0 24 24" fill="none" className="vyn-social-svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="4" cy="2" r="2" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (All Active App Routes) */}
          <div className="vyn-footer-col" data-reveal="fade-up" data-reveal-delay="100">
            <h3 className="vyn-col-title">Quick Links</h3>
            <ul className="vyn-link-list">
              <li>
                <Link to="/">
                  <span className="vyn-link-bullet">✦</span>Home
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <span className="vyn-link-bullet">✦</span>About Us
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <span className="vyn-link-bullet">✦</span>Our Services
                </Link>
              </li>
              <li>
                <Link to="/blogs">
                  <span className="vyn-link-bullet">✦</span>Blogs & Articles
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <span className="vyn-link-bullet">✦</span>Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (Direct Route Links) */}
          <div className="vyn-footer-col" data-reveal="fade-up" data-reveal-delay="200">
            <h3 className="vyn-col-title">Services</h3>
            <ul className="vyn-link-list">
              <li>
                <Link to="/services">
                  <span className="vyn-link-bullet">✦</span>Web Design & UI/UX
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <span className="vyn-link-bullet">✦</span>Mobile App Development
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <span className="vyn-link-bullet">✦</span>Search Engine Optimization
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <span className="vyn-link-bullet">✦</span>Paid Ads & Lead Scaling
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <span className="vyn-link-bullet">✦</span>AI & Workflow Automation
                </Link>
              </li>
              <li>
                <Link to="/services">
                  <span className="vyn-link-bullet">✦</span>Branding & 3D Creative
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="vyn-footer-col" data-reveal="fade-up" data-reveal-delay="300">
            <h3 className="vyn-col-title">Contact Us</h3>
            <ul className="vyn-contact-list">
              {/* Direct Email */}
              <li className="vyn-contact-item">
                <div className="vyn-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <a href="mailto:hello.vayonixinfotech@gmail.com" className="vyn-contact-link">
                  hello.vayonixinfotech@gmail.com
                </a>
              </li>

              {/* WhatsApp / Phone */}
              <li className="vyn-contact-item">
                <div className="vyn-contact-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <a
                  href="https://wa.me/919092007731"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vyn-contact-link"
                >
                  +91 90920 07731
                </a>
              </li>

              {/* Instagram */}
              <li className="vyn-contact-item">
                <div className="vyn-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <a
                  href="https://www.instagram.com/vayonix._.infotech?igsi=MTJvdDAzb3YwN3B2OQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vyn-contact-link"
                >
                  @vayonix._.infotech
                </a>
              </li>

              {/* Rapid Support Note */}
              <li className="vyn-contact-item">
                <div className="vyn-contact-icon">
                  <svg viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="vyn-contact-text">Available for Projects Worldwide</span>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="vyn-footer-col vyn-newsletter-col" data-reveal="fade-left">
            <h3 className="vyn-col-title">Newsletter</h3>
            <p className="vyn-news-desc">Stay updated with the latest digital trends, tech insights, and case studies.</p>

            <form onSubmit={handleSubscribe} className="vyn-subscribe-form" noValidate>
              <div className="vyn-input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status.type) setStatus({ type: '', message: '' });
                  }}
                  disabled={isSubmitting}
                  required
                  className={`vyn-email-input ${status.type === 'error' ? 'vyn-input-invalid' : ''}`}
                />
                <button
                  type="submit"
                  className={`vyn-send-btn ${isSubmitting ? 'is-loading' : ''}`}
                  disabled={isSubmitting}
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    <div className="vyn-btn-spinner" aria-label="Submitting..." />
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" className="vyn-send-icon">
                      <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Status Notifications */}
              {status.message && (
                <p className={status.type === 'success' ? 'vyn-sub-success' : 'vyn-sub-error'}>
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* =================================================================
            BOTTOM COPYRIGHT BAR
            ================================================================= */}
        <div className="vyn-footer-bottom" data-reveal="fade-up">
          <p className="vyn-copyright-text">
            © {new Date().getFullYear()} <span className="vyn-brand-name">Vayonix</span>. All rights reserved.
          </p>
          <div className="vyn-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="vyn-legal-sep">•</span>
            <Link to="/terms-of-service">Terms of Service</Link>
            <span className="vyn-legal-sep">•</span>
            <Link to="/about">About Agency</Link>
            <span className="vyn-legal-sep">•</span>
            <Link to="/contact">Get in Touch</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
