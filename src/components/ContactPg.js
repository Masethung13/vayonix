import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase';
import ScrollTitle from '../components/ScrollTitle';
import useScrollReveal from '../hooks/useScrollReveal';
import '../styles/ContactPg.css';
import bannerBg from '../assets/abt-banner-bg.jpg';

const serviceOptions = [
  'Web Development & UX',
  'Paid Ads Scaling (Meta / Google)',
  'SEO & Organic Growth',
  'AI & CRM Automation',
  'Branding & 3D Creative',
  'Other Inquiries'
];

const contactCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    badge: 'Direct Email',
    title: 'Email Our Team',
    detail: 'hello.vayonixinfotech@gmail.com',
    actionText: 'Send Email',
    actionHref: 'mailto:hello.vayonixinfotech@gmail.com',
    accent: '#38bdf8'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    badge: 'Instant Call / WhatsApp',
    title: 'Speak With Strategy Leads',
    detail: '+91 90920 07731',
    actionText: 'Call Now',
    actionHref: 'tel:+919092007731',
    accent: '#a855f7'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    badge: 'SLA Guarantee',
    title: 'Rapid Turnaround',
    detail: 'Under 24 Business Hours',
    actionText: 'Fill Inquiry Form',
    actionHref: '#contact-form-section',
    accent: '#ec4899'
  }
];

const ContactPg = () => {
  useScrollReveal(0.08);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    selectedService: serviceOptions[0],
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Theme synchronization with LocalStorage & Document Element
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vayonix_theme') || document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = `theme-${theme}`;
    localStorage.setItem('vayonix_theme', theme);
    window.dispatchEvent(new Event('theme_change'));
  }, [theme]);

  useEffect(() => {
    const handleThemeSync = () => {
      const currentTheme = localStorage.getItem('vayonix_theme') || 'dark';
      setTheme(currentTheme);
    };
    window.addEventListener('theme_change', handleThemeSync);
    window.addEventListener('storage', handleThemeSync);
    return () => {
      window.removeEventListener('theme_change', handleThemeSync);
      window.removeEventListener('storage', handleThemeSync);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }
      setShowScrollTop(scrollY > 220);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Field Level Validation
  const validateField = (name, value) => {
    let errorMsg = '';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneClean = value.replace(/\D/g, ''); // Clean non-digits with zero ESLint warnings

    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMsg = 'Full name is required.';
        } else if (value.trim().length < 3) {
          errorMsg = 'Name must be at least 3 characters.';
        }
        break;

      case 'email':
        if (!value.trim()) {
          errorMsg = 'Email address is required.';
        } else if (!emailRegex.test(value.trim())) {
          errorMsg = 'Please enter a valid email address.';
        }
        break;

      case 'phone':
        if (value.trim()) {
          if (!/^[6-9]\d{9}$/.test(phoneClean.slice(-10))) {
            errorMsg = 'Please enter a valid 10-digit Indian mobile number (e.g. 9092007731).';
          }
        }
        break;

      case 'message':
        if (!value.trim()) {
          errorMsg = 'Please provide some project details or questions.';
        } else if (value.trim().length < 10) {
          errorMsg = 'Message must be at least 10 characters long.';
        }
        break;

      default:
        break;
    }
    return errorMsg;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission Handler (Firebase + FormSubmit AJAX Email)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      toast.error('Please fix the errors in the form before submitting.', {
        position: 'top-right',
        autoClose: 3500,
        theme: theme === 'dark' ? 'dark' : 'light'
      });
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Sending your message & dispatching inquiry...', {
      theme: theme === 'dark' ? 'dark' : 'light'
    });

    try {
      // 1. SAVE TO FIREBASE FIRESTORE
      const firestorePromise = addDoc(collection(db, 'contacts'), {
        fullName: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || 'Not Provided',
        serviceInterest: formData.selectedService,
        message: formData.message.trim(),
        recipientEmail: 'hello.vayonixinfotech@gmail.com',
        sourceUrl: window.location.href,
        status: 'new',
        createdAt: serverTimestamp()
      });

      // 2. DISPATCH VIA FORMSUBMIT AJAX DIRECTLY TO hello.vayonixinfotech@gmail.com
      const formSubmitPromise = fetch('https://formsubmit.co/ajax/hello.vayonixinfotech@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          Name: formData.name.trim(),
          Email: formData.email.trim().toLowerCase(),
          Phone: formData.phone.trim() || 'Not Provided',
          Service_Interested: formData.selectedService,
          Project_Requirements: formData.message.trim(),
          _subject: `New Vayonix Inquiry: ${formData.name} (${formData.selectedService})`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      await Promise.all([firestorePromise, formSubmitPromise]);

      toast.update(toastId, {
        render: 'Message sent successfully! Our strategy team will reach out within 24 hours.',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        theme: theme === 'dark' ? 'dark' : 'light'
      });

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        selectedService: serviceOptions[0],
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Submission Error:', error);
      toast.update(toastId, {
        render: 'Failed to send automatically. Please call us at +91 9092007731 or email hello.vayonixinfotech@gmail.com',
        type: 'error',
        isLoading: false,
        autoClose: 6000,
        theme: theme === 'dark' ? 'dark' : 'light'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cnt-page-wrapper" onMouseMove={handleMouseMove}>
      
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === 'dark' ? 'dark' : 'light'}
      />

      {/* =====================================================================
          1. TOP BANNER
          ===================================================================== */}
      <section className="cnt-top-banner">
        <div className="cnt-banner-bg-wrap">
          <img
            src={bannerBg}
            alt="Vayonix digital agency contact background"
            className="cnt-banner-bg-img"
          />
          <div className="cnt-banner-dark-overlay" />
          <div className="cnt-banner-radial-glow" />
        </div>

        <div className="cnt-banner-container" data-reveal="fade-up">
          <h1 className="cnt-banner-title">Contact Us</h1>
          <div className="cnt-breadcrumbs">
            <Link to="/" className="cnt-crumb-link">Home</Link>
            <span className="cnt-crumb-sep">/</span>
            <span className="cnt-crumb-current">Contact Us</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. CONTACT HERO & FAST REACH CARDS
          ===================================================================== */}
      <section className="cnt-hero-section">
        <div
          className="cnt-3d-loop-canvas"
          style={{
            transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 0)`,
          }}
          aria-hidden="true"
        >
          <div className="cnt-glow cnt-glow-1" />
          <div className="cnt-glow cnt-glow-2" />
          <div className="cnt-glow cnt-glow-3" />

          <div className="cnt-3d-star-prism cnt-star-1" style={{ transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)` }}>✦</div>
          <div className="cnt-3d-star-prism cnt-star-2" style={{ transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0)` }}>✦</div>
          <div className="cnt-3d-star-prism cnt-star-3" style={{ transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * 16}px, 0)` }}>✦</div>
          <div className="cnt-3d-star-prism cnt-star-4" style={{ transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * -14}px, 0)` }}>✦</div>
          <div className="cnt-3d-star-prism cnt-star-5" style={{ transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * 20}px, 0)` }}>✦</div>
          <div className="cnt-3d-star-prism cnt-star-6" style={{ transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 25}px, 0)` }}>✦</div>

          <svg className="cnt-neon-splines-svg" viewBox="0 0 1200 800" fill="none">
            <path
              d="M 50,150 C 350,50 750,550 1150,120"
              stroke="url(#cntSplineGrad1)"
              strokeWidth="2.5"
              strokeDasharray="8 6"
              className="cnt-spline-anim-1"
            />
            <path
              d="M 100,680 C 450,420 850,780 1180,480"
              stroke="url(#cntSplineGrad2)"
              strokeWidth="2"
              className="cnt-spline-anim-2"
            />
            <defs>
              <linearGradient id="cntSplineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="cntSplineGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#ec4899" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="cnt-main-container">
          <div className="cnt-header-center" data-reveal="fade-up">
            <div className="cnt-tag-pill">
              <span className="cnt-tag-spark">✦</span>
              <span className="cnt-tag-label">LET'S CONNECT</span>
            </div>

            <ScrollTitle
              as="h2"
              isHero={true}
              className="cnt-hero-heading"
              lines={[
                [
                  { text: "Let's", type: 'normal' },
                  { text: 'Build', type: 'accent' },
                  { text: 'Something', type: 'gradient' }
                ],
                [
                  { text: 'Extraordinary', type: 'gradient' },
                  { text: 'Together', type: 'normal' }
                ]
              ]}
            />

            <p className="cnt-sub-description">
              Ready to accelerate your revenue pipeline or build bespoke digital infrastructure? Connect directly with our strategy team in India or submit your project details below.
            </p>
          </div>

          <div className="cnt-cards-grid">
            {contactCards.map((card, idx) => (
              <div
                key={idx}
                className="cnt-action-card"
                style={{ '--card-accent': card.accent }}
                data-reveal="fade-up"
              >
                <div className="cnt-card-glow-aura" />
                <div className="cnt-card-top">
                  <div className="cnt-card-icon">{card.icon}</div>
                  <span className="cnt-card-badge">{card.badge}</span>
                </div>
                <h3 className="cnt-card-title">{card.title}</h3>
                <p className="cnt-card-detail">{card.detail}</p>
                <a href={card.actionHref} className="cnt-card-link-btn">
                  <span>{card.actionText}</span>
                  <span className="cnt-card-arrow">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE FORM & DIRECT CORPORATE SIDEBAR
          ===================================================================== */}
      <section className="cnt-form-section" id="contact-form-section">
        <div className="cnt-main-container">
          <div className="cnt-form-split-layout">
            
            {/* Left Column: Glass Form Container */}
            <div className="cnt-form-glass-box" data-reveal="fade-right">
              <div className="cnt-form-box-aura" />

              <div className="cnt-form-head">
                <span className="cnt-form-pill-tag">PROJECT ESTIMATION & INQUIRY</span>
                <h3 className="cnt-form-title">
                  Send Us A <span className="cnt-grad-text">Project Brief</span>
                </h3>
                <p className="cnt-form-desc">
                  Fill in your requirements. All submissions are automatically saved and delivered to our senior consulting directors.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="cnt-interactive-form" noValidate>
                
                {/* Row 1: Name & Email */}
                <div className="cnt-form-row">
                  <div className="cnt-input-group">
                    <label className="cnt-input-label">
                      Full Name <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className={`cnt-input-field ${errors.name ? 'is-field-invalid' : ''}`}
                    />
                    {errors.name && <span className="cnt-field-error-text">{errors.name}</span>}
                  </div>

                  <div className="cnt-input-group">
                    <label className="cnt-input-label">
                      Email Address <span className="req-star">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="rahul@company.com"
                      className={`cnt-input-field ${errors.email ? 'is-field-invalid' : ''}`}
                    />
                    {errors.email && <span className="cnt-field-error-text">{errors.email}</span>}
                  </div>
                </div>

                {/* Row 2: Indian Mobile Number (Full-Width Clean Layout) */}
                <div className="cnt-input-group">
                  <label className="cnt-input-label">
                    Mobile Number (India)
                  </label>
                  <div className="cnt-phone-prefix-wrap">
                    <span className="cnt-flag-prefix">🇮🇳 +91</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="90920 07731"
                      maxLength="15"
                      className={`cnt-input-field cnt-phone-input ${errors.phone ? 'is-field-invalid' : ''}`}
                    />
                  </div>
                  {errors.phone && <span className="cnt-field-error-text">{errors.phone}</span>}
                </div>

                {/* Row 3: Service Selection Chips */}
                <div className="cnt-input-group">
                  <label className="cnt-input-label">Select Primary Service Requirement</label>
                  <div className="cnt-services-pill-wrap">
                    {serviceOptions.map((svc) => (
                      <button
                        type="button"
                        key={svc}
                        className={`cnt-svc-chip ${formData.selectedService === svc ? 'is-chip-active' : ''}`}
                        onClick={() => setFormData((prev) => ({ ...prev, selectedService: svc }))}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 4: Message Box */}
                <div className="cnt-input-group">
                  <label className="cnt-input-label">
                    Project Goals & Requirements <span className="req-star">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your objectives, current challenges, expected timeline, and target audience..."
                    className={`cnt-input-field cnt-textarea-field ${errors.message ? 'is-field-invalid' : ''}`}
                  />
                  {errors.message && <span className="cnt-field-error-text">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`cnt-submit-btn ${isSubmitting ? 'is-btn-loading' : ''}`}
                >
                  <span className="cnt-btn-text">
                    {isSubmitting ? 'Submitting & Emailing Brief...' : 'Submit Project Brief'}
                  </span>
                  <span className="cnt-btn-arrow">→</span>
                  <div className="cnt-btn-shimmer" />
                </button>
              </form>
            </div>

            {/* Right Column: Direct Corporate Channels & SLA Guarantee */}
            <div className="cnt-sidebar-col" data-reveal="fade-left">
              
              {/* Direct Channels Card */}
              <div className="cnt-sidebar-glass-card">
                <h4 className="cnt-side-title">Direct Corporate Channels</h4>
                <p className="cnt-side-desc">
                  Have an urgent requirement or prefer direct communication? Connect immediately with our technical heads:
                </p>

                <div className="cnt-channel-list">
                  <a href="mailto:hello.vayonixinfotech@gmail.com" className="cnt-channel-item">
                    <div className="cnt-ch-icon-wrap email-aura">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div className="cnt-ch-text">
                      <span className="ch-sub">Direct Email Inbox</span>
                      <span className="ch-val">hello.vayonixinfotech@gmail.com</span>
                    </div>
                  </a>

                  <a href="tel:+919092007731" className="cnt-channel-item">
                    <div className="cnt-ch-icon-wrap phone-aura">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="cnt-ch-text">
                      <span className="ch-sub">Direct Line / WhatsApp</span>
                      <span className="ch-val">+91 90920 07731</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* SLA & NDA Guarantee Card */}
              <div className="cnt-sidebar-glass-card cnt-guarantee-card">
                <div className="cnt-guarantee-head">
                  <span className="cnt-guarantee-spark">✦</span>
                  <h5>The Vayonix Assurance</h5>
                </div>
                <ul className="cnt-guarantee-list">
                  <li>
                    <span className="list-dot" />
                    <span><strong>100% Confidentiality:</strong> Strict non-disclosure protection for your intellectual property.</span>
                  </li>
                  <li>
                    <span className="list-dot" />
                    <span><strong>Tailored Architecture:</strong> Zero cookie-cutter packages; every strategy is customized to your ROI metrics.</span>
                  </li>
                  <li>
                    <span className="list-dot" />
                    <span><strong>24-Hour SLA:</strong> Dedicated strategic response from senior engineering leads within one business day.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          4. FLOATING ACTION CLUSTER
          ===================================================================== */}
      <div className="floating-action-cluster">
        <button
          className={`scroll-to-top-btn ${showScrollTop ? 'btn-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title={`Scroll to top (${Math.round(scrollProgress)}%)`}
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

        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          <div className={`theme-icon-slider ${theme === 'light' ? 'light-active' : ''}`}>
            <span className="theme-icon sun-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </span>
            <span className="theme-icon moon-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </span>
          </div>
          <span className="theme-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>

    </div>
  );
};

export default ContactPg;