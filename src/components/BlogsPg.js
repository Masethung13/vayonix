import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import ScrollTitle from './ScrollTitle';
import ThemeToggle from './ThemeToggle';
import '../styles/BlogsPg.css';

// Import rich showcase assets & service artwork
import bannerBg from '../assets/abt-banner-bg.jpg';
import blogHeroLaptop from '../assets/blog-hero-laptop.jpg';
import vayonixLogo from '../assets/vayonix-logo-og.png';
import imgWebDev from '../assets/services/Web-Full-Stack Development.png';
import imgMobileApp from '../assets/services/Mobile-App.png';
import imgSeo from '../assets/services/seo-img.avif';
import imgSocial from '../assets/services/Social-Media Marketing.jpg';
import imgContent from '../assets/services/Content-Marketing.jpg';
import imgEmail from '../assets/services/Email-Marketing.jpg';
import imgAnalytics from '../assets/services/Analytics.jpg';
import imgVideo from '../assets/services/video-editor.avif';

// Service-Based Blog Posts Data Matrix (Author: Team Vayonix, No Dates/Times)
const initialBlogPosts = [
  {
    id: 1,
    title: 'Web & Full-Stack Development: Scaling High-Concurrency React & Node Architectures',
    category: 'Web Development',
    author: {
      name: 'Team Vayonix',
      role: 'Full-Stack Engineering',
      avatar: vayonixLogo
    },
    image: imgWebDev,
    excerpt: 'How we engineer ultra-fast React and Next.js applications, robust microservice APIs, and secure zero-latency cloud infrastructure built for massive scale.',
    featured: true,
    tags: ['React.js', 'Next.js', 'High-Speed APIs', 'Cloud Scale']
  },
  {
    id: 2,
    title: 'Mobile App Engineering: Crafting 60fps Native Experiences on iOS & Android',
    category: 'Mobile App',
    author: {
      name: 'Team Vayonix',
      role: 'Mobile App Specialists',
      avatar: vayonixLogo
    },
    image: imgMobileApp,
    excerpt: 'Building cross-platform and native mobile apps with sub-second launch times, fluid gesture interactions, offline data sync, and bank-grade biometrics.',
    featured: false,
    tags: ['iOS & Android', '60fps Native', 'Offline Sync', 'Biometrics']
  },
  {
    id: 3,
    title: 'Algorithmic SEO Playbook: Semantic Clustering & First-Page Search Dominance',
    category: 'SEO',
    author: {
      name: 'Team Vayonix',
      role: 'SEO & Organic Growth',
      avatar: vayonixLogo
    },
    image: imgSeo,
    excerpt: 'Dominate organic search results with deep technical audits, semantic entity clustering, high-authority backlinks, and Core Web Vitals speed optimization.',
    featured: false,
    tags: ['Technical SEO', 'Entity Clustering', 'Backlinks', 'Core Web Vitals']
  },
  {
    id: 4,
    title: 'Social Media Marketing: Viral Content Strategy & High-Engagement Communities',
    category: 'Social Media',
    author: {
      name: 'Team Vayonix',
      role: 'Social Media Strategists',
      avatar: vayonixLogo
    },
    image: imgSocial,
    excerpt: 'Scale brand authority and cultivate active followers across Instagram, TikTok, LinkedIn, and YouTube through trendjacking, short-form reels, and influencer funnels.',
    featured: false,
    tags: ['Short-Form Video', 'Reels & TikTok', 'Community Growth', 'Influencer Funnels']
  },
  {
    id: 5,
    title: 'Content Marketing & Brand Resonance: Persuasive Storytelling That Drives Conversion',
    category: 'Content Marketing',
    author: {
      name: 'Team Vayonix',
      role: 'Content & Brand Architects',
      avatar: vayonixLogo
    },
    image: imgContent,
    excerpt: 'Create captivating thought leadership whitepapers, persuasive sales copy, and viral lead magnets that educate prospects and establish undeniable industry leadership.',
    featured: false,
    tags: ['Thought Leadership', 'Lead Magnets', 'Tone-of-Voice', 'Conversion Copy']
  },
  {
    id: 6,
    title: 'Email Marketing & CRM Automation: Lifecycle Flows That Multiply Customer Lifetime Value',
    category: 'CRM & Automation',
    author: {
      name: 'Team Vayonix',
      role: 'CRM & Automation Leads',
      avatar: vayonixLogo
    },
    image: imgEmail,
    excerpt: 'Build high-converting behavioral trigger automations, smart customer segmentation, and personalized SMS sequences that generate consistent repeat revenue on autopilot.',
    featured: false,
    tags: ['Trigger Automations', 'Smart Segmentation', 'Inbox Deliverability', 'Omnichannel CRM']
  },
  {
    id: 7,
    title: 'Analytics & Performance Telemetry: Turning Raw Marketing Metrics into Predictable Revenue',
    category: 'Analytics',
    author: {
      name: 'Team Vayonix',
      role: 'Data & Telemetry Engineers',
      avatar: vayonixLogo
    },
    image: imgAnalytics,
    excerpt: 'Eliminate revenue blindspots with multi-touch attribution, server-side tracking, and custom executive BI dashboards that turn raw marketing data into profitable growth.',
    featured: false,
    tags: ['Attribution Modeling', 'Custom BI Dashboards', 'Server-Side GTM', 'Predictive LTV']
  },
  {
    id: 8,
    title: 'Video Production & Motion Editing: Cinematic Commercial Ads That Stop the Scroll',
    category: 'Video Production',
    author: {
      name: 'Team Vayonix',
      role: 'Creative Video Directors',
      avatar: vayonixLogo
    },
    image: imgVideo,
    excerpt: 'Produce cinematic commercial films, 3D motion graphics, VFX animations, and high-energy social ads that capture immediate attention and inspire massive action.',
    featured: false,
    tags: ['Commercial Ads', '3D Motion & VFX', 'Reels & TikToks', 'Audio Mastering']
  }
];

const categories = [
  { id: 'All', label: 'All Services', icon: '▦' },
  { id: 'Web Development', label: 'Web Development', icon: '💻' },
  { id: 'Mobile App', label: 'Mobile App', icon: '📱' },
  { id: 'SEO', label: 'SEO', icon: '🔍' },
  { id: 'Social Media', label: 'Social Media', icon: '📢' },
  { id: 'Content Marketing', label: 'Content Marketing', icon: '✍' },
  { id: 'CRM & Automation', label: 'CRM & Automation', icon: '📩' },
  { id: 'Analytics', label: 'Analytics', icon: '📊' },
  { id: 'Video Production', label: 'Video Production', icon: '🎬' }
];

const BlogsPg = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

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

  // Sync theme changes across tabs/components
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

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 2;
    const y = (clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const resetTilt = () => {
    setTilt({ x: 0, y: 0 });
  };

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollY > 220);
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState({ type: '', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!cleanEmail) {
      setSubscribeStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setSubscribeStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setSubscribeStatus({ type: '', message: '' });

    try {
      // 1. Save subscriber email to Firebase Firestore
      const firestorePromise = addDoc(collection(db, 'subscribers'), {
        email: cleanEmail,
        source: 'blogs_newsletter',
        status: 'active',
        createdAt: serverTimestamp()
      });

      // 2. Dispatch via FormSubmit AJAX to send reply mail to user + notification to hello.vayonixinfotech@gmail.com
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
          _subject: 'Thank You for Subscribing to Vayonix Growth Dispatch!',
          _autoresponse: `Thank you for subscribing to Vayonix Infotech's Growth Dispatch!

You are now subscribed to our weekly breakdown of algorithmic trends, case studies, conversion frameworks, and modern full-stack web/AI insights.

Need help building your next digital product or scaling your brand?
• WhatsApp: +91 90920 07731
• Email: hello.vayonixinfotech@gmail.com
• Website: https://vayonix-info.web.app

Best regards,
The Vayonix Infotech Team`,
          _template: 'table',
          _captcha: 'false',
          'Subscriber Email': cleanEmail,
          'Subscription Type': 'Blog Growth Dispatch',
          'Date & Time': new Date().toLocaleString()
        })
      });

      const [, formSubmitResponse] = await Promise.all([firestorePromise, formSubmitPromise]);
      const formSubmitData = await formSubmitResponse.json().catch(() => ({}));

      if (formSubmitResponse.ok || formSubmitData.success) {
        setSubscribed(true);
        setEmailInput('');
        setSubscribeStatus({
          type: 'success',
          message: "✦ You're on the VIP list! A confirmation email has been sent to your inbox."
        });

        setTimeout(() => {
          setSubscribed(false);
          setSubscribeStatus({ type: '', message: '' });
        }, 7000);
      } else {
        throw new Error(formSubmitData.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Blog Newsletter Subscription Error:', error);
      setSubscribeStatus({
        type: 'error',
        message: 'Could not complete subscription. Please email us at hello.vayonixinfotech@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    return initialBlogPosts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredPost = initialBlogPosts.find((p) => p.featured) || initialBlogPosts[0];

  // Auto reveal newly filtered cards and elements immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.blog-article-card[data-reveal], .blog-featured-article-card, .blog-no-results-box');
      elements.forEach((el) => {
        if (el) el.classList.add('is-revealed');
      });
    }, 40);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  return (
    <div className="blog-page-wrapper" onMouseMove={handleMouseMove}>

      {/* =====================================================================
          1. CINEMATIC BREADCRUMBS BANNER (Matches Abt.js Exactly)
          ===================================================================== */}
      <section className="blog-top-banner">
        <div className="blog-banner-bg-wrap">
          <img
            src={bannerBg}
            alt="Vayonix Insights & Growth Strategies"
            className="blog-banner-bg-img"
          />
          <div className="blog-banner-dark-overlay" />
          <div className="blog-banner-radial-glow" />
        </div>

        <div className="blog-banner-container" data-reveal="fade-up">
          <h1 className="blog-banner-title">Our Blogs</h1>
          <div className="blog-breadcrumbs">
            <Link to="/" className="blog-crumb-link">Home</Link>
            <span className="blog-crumb-sep">›</span>
            <span className="blog-crumb-current">Our Blogs</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. HERO SHOWCASE SECTION (Exact Match to User Reference Screenshot)
          ===================================================================== */}
      <section className="blog-hero-section">

        {/* 3D Background Canvas with Parallax Stars */}
        <div
          className="blog-3d-loop-canvas"
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
          }}
          aria-hidden="true"
        >
          <div className="blog-glow blog-glow-1" />
          <div className="blog-glow blog-glow-2" />

          <div className="blog-3d-star-prism star-1" style={{ transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0)` }}>✦</div>
          <div className="blog-3d-star-prism star-2" style={{ transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)` }}>✦</div>
          <div className="blog-3d-star-prism star-3" style={{ transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * 14}px, 0)` }}>✦</div>
          <div className="blog-3d-star-prism star-4" style={{ transform: `translate3d(${mousePos.x * 16}px, ${mousePos.y * -12}px, 0)` }}>✦</div>
        </div>

        <div className="blog-main-container">

          {/* Top Hero Split Grid: Left Headlines + Right 3D Laptop Pedestal Visual */}
          <div className="blog-hero-split-grid">

            {/* Left Column: Headlines, Description & Search Bar */}
            <div className="blog-hero-left-content" data-reveal="fade-right">

              {/* Tag Pill Matching Reference Screenshot */}
              <div className="blog-tag-pill" data-reveal="fade-up">
                <span className="blog-tag-spark">✦</span>
                <span className="blog-tag-label">OUR BLOG</span>
                <span className="blog-tag-spark">✦</span>
              </div>

              {/* Multi-Line Headline with ScrollTitle Transformation */}
              <ScrollTitle
                as="h2"
                isHero={true}
                className="blog-hero-heading"
                lines={[
                  [
                    { text: 'Insights', type: 'normal' },
                    { text: 'That', type: 'normal' },
                    { text: 'Inspire.', type: 'gradient' }
                  ],
                  [
                    { text: 'Strategies', type: 'normal' },
                    { text: 'That', type: 'normal' },
                    { text: 'Deliver.', type: 'accent' }
                  ]
                ]}
              />

              {/* Subtext Description */}
              <p className="blog-sub-description" data-reveal="fade-up" data-reveal-delay="100">
                Stay ahead with expert insights, proven strategies, and the latest digital marketing trends.
              </p>

              {/* Interactive Futuristic Search Matrix Bar */}
              <div className="blog-search-bar-wrap" data-reveal="fade-up" data-reveal-delay="150">
                <div className="blog-search-input-box">
                  <span className="blog-search-icon">🔍</span>
                  <input
                    type="text"
                    className="blog-search-input"
                    placeholder="Search articles, keywords, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="blog-clear-search-btn"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search query"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button className="blog-search-action-btn" aria-label="Search">
                  <span>Search</span>
                  <span className="blog-search-btn-icon">→</span>
                </button>
              </div>

            </div>

            {/* Right Column: 3D Laptop Pedestal Visual with 3D Tilt */}
            <div className="blog-hero-visual-col" data-reveal="fade-left">
              <div
                className="blog-laptop-pedestal-frame"
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translate3d(${mousePos.x * 6}px, ${mousePos.y * 6}px, 0)`
                }}
              >
                <div className="blog-pedestal-glow-aura" />
                <div className="blog-pedestal-image-box">
                  <img
                    src={blogHeroLaptop}
                    alt="Cybernetic 3D Laptop with Growth Graphics on Pedestal"
                    className="blog-laptop-photo"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* =================================================================
              3. CATEGORY FILTER NAVIGATION BAR (Matches Screenshot Pills)
              ================================================================= */}
          <div className="blog-category-filter-bar" data-reveal="fade-up">
            <div className="blog-filter-pills-list">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    className={`blog-filter-pill-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span className="blog-pill-icon">{cat.icon}</span>
                    <span className="blog-pill-label">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =================================================================
              4. FEATURED TRENDING ARTICLE HIGHLIGHT (When "All" is active)
              ================================================================= */}
          {activeCategory === 'All' && !searchQuery && (
            <div className="blog-featured-article-card" data-reveal="fade-up">
              <div className="blog-featured-badge" data-reveal="fade-up">★ FEATURED ANALYSIS</div>

              <div className="blog-featured-grid">
                <div className="blog-featured-image-wrap" data-reveal="zoom-in">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="blog-featured-img"
                  />
                  <div className="blog-featured-cat-tag">{featuredPost.category}</div>
                </div>

                <div className="blog-featured-content-wrap" data-reveal="fade-left">
                  <h3 className="blog-featured-title">
                    <a href="#article" className="blog-title-link">{featuredPost.title}</a>
                  </h3>

                  <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>

                  <div className="blog-tags-row">
                    {featuredPost.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="blog-tag-capsule">#{tag}</span>
                    ))}
                  </div>

                  <div className="blog-card-footer-row">
                    <div className="blog-author-group">
                      <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="blog-author-avatar" />
                      <div className="blog-author-info">
                        <div className="blog-author-name">{featuredPost.author.name}</div>
                        <div className="blog-author-role">{featuredPost.author.role}</div>
                      </div>
                    </div>

                    <a href="#article" className="blog-read-action-btn">
                      <span>Explore Service</span>
                      <span className="blog-read-arrow">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              5. DYNAMIC ARTICLES GRID WITH SCROLLTITLE SECTION HEADING
              ================================================================= */}
          <div className="blog-articles-section">

            <div className="blog-section-header-row" data-reveal="fade-up">
              <div className="blog-section-title-wrap">
                <ScrollTitle
                  as="h3"
                  className="blog-grid-heading"
                  lines={[
                    [
                      { text: 'Explore', type: 'normal' },
                      { text: 'Our', type: 'normal' },
                      { text: 'Latest', type: 'gradient' },
                      { text: 'Insights', type: 'accent' }
                    ]
                  ]}
                />
              </div>

              <div className="blog-results-count" data-reveal="fade-left">
                Showing <strong>{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'Article' : 'Articles'}
                {activeCategory !== 'All' && <span className="blog-active-filter-tag">in {activeCategory}</span>}
              </div>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="blog-no-results-box" data-reveal="fade-up">
                <div className="blog-no-results-icon">🔍</div>
                <h3 className="blog-no-results-title">No matching articles found</h3>
                <p className="blog-no-results-desc">Try clearing your search query or choosing a different category filter.</p>
                <button
                  className="blog-reset-filters-btn"
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="blog-articles-grid">
                {filteredPosts.map((post, pIdx) => (
                  <article
                    key={post.id}
                    className="blog-article-card"
                    data-reveal="fade-up"
                    data-reveal-delay={((pIdx % 3) * 100).toString()}
                  >
                    <div className="blog-card-top-beam" />

                    {/* Thumbnail Image */}
                    <div className="blog-card-thumb-wrap">
                      <img src={post.image} alt={post.title} className="blog-card-thumb-img" />
                      <div className="blog-card-cat-badge">{post.category}</div>
                    </div>

                    {/* Content */}
                    <div className="blog-card-body-wrap">
                      <h3 className="blog-card-title">
                        <a href="#article" className="blog-card-title-link">{post.title}</a>
                      </h3>

                      <p className="blog-card-desc">{post.excerpt}</p>

                      <div className="blog-tags-row">
                        {post.tags.slice(0, 2).map((tag, tIdx) => (
                          <span key={tIdx} className="blog-tag-capsule">#{tag}</span>
                        ))}
                      </div>

                      <div className="blog-card-bottom-row">
                        <div className="blog-author-group">
                          <img src={post.author.avatar} alt={post.author.name} className="blog-author-avatar-sm" />
                          <div className="blog-author-name-sm">{post.author.name}</div>
                        </div>

                        <a href="#article" className="blog-card-read-link">
                          <span>Read</span>
                          <span className="blog-arrow-symbol">→</span>
                        </a>
                      </div>

                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>

          {/* =================================================================
              6. NEWSLETTER / CYBER GROWTH SUBSCRIBE SECTION WITH SCROLLTITLE
              ================================================================= */}
          <div className="blog-newsletter-card" data-reveal="fade-up">
            <div className="blog-newsletter-glow" />
            <div className="blog-newsletter-content">
              <div className="blog-tag-pill" data-reveal="fade-up">
                <span className="blog-tag-spark">✦</span>
                <span className="blog-tag-label">GROWTH DISPATCH</span>
              </div>

              {/* ScrollTitle for Newsletter Headline */}
              <ScrollTitle
                as="h2"
                className="blog-newsletter-scroll-title"
                lines={[
                  [
                    { text: 'Get', type: 'normal' },
                    { text: 'High-Impact', type: 'gradient' },
                    { text: 'Marketing', type: 'normal' },
                    { text: 'Strategies', type: 'accent' }
                  ],
                  [
                    { text: 'Sent', type: 'normal' },
                    { text: 'Straight', type: 'normal' },
                    { text: 'to', type: 'normal' },
                    { text: 'Your', type: 'normal' },
                    { text: 'Inbox', type: 'gradient' }
                  ]
                ]}
              />

              <p className="blog-newsletter-sub" data-reveal="fade-up" data-reveal-delay="100">
                Join 15,000+ founders, marketers, and growth engineers receiving our weekly breakdown of algorithmic trends, case studies, and conversion frameworks.
              </p>

              {subscribed ? (
                <div className="blog-subscribe-success-msg" data-reveal="zoom-in">
                  <span>✓ {subscribeStatus.message || "You're on the VIP list! Check your inbox for our latest growth report."}</span>
                </div>
              ) : (
                <form className="blog-newsletter-form" onSubmit={handleSubscribe} noValidate data-reveal="fade-up" data-reveal-delay="150">
                  <div className="blog-newsletter-input-group">
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      placeholder="Enter your work email address..."
                      className={`blog-newsletter-input ${subscribeStatus.type === 'error' ? 'blog-input-invalid' : ''}`}
                      value={emailInput}
                      onChange={(e) => {
                        setEmailInput(e.target.value);
                        if (subscribeStatus.type) setSubscribeStatus({ type: '', message: '' });
                      }}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`blog-newsletter-btn ${isSubmitting ? 'is-loading' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="blog-btn-spinner" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe Free</span>
                          <span className="vyn-btn-arrow-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 19" className="vyn-btn-arrow-svg">
                              <path d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z" />
                            </svg>
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                  {subscribeStatus.type === 'error' && (
                    <p className="blog-newsletter-error-msg">{subscribeStatus.message}</p>
                  )}
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          7. RIGHT BOTTOM FLOATING ACTION CLUSTER (SCROLL-TO-TOP & THEME TOGGLE)
          Exact Match to Home Page
          ===================================================================== */}
      <div className="floating-action-cluster">
        {/* Bottom to Top Button */}
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
        <ThemeToggle />
      </div>

    </div>
  );
};

export default BlogsPg;
