import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ScrollTitle from './ScrollTitle';
import '../styles/BlogsPg.css';

// Import rich showcase assets
import bannerBg from '../assets/abt-banner-bg.jpg';
import blogHeroLaptop from '../assets/blog-hero-laptop.jpg';
import imgSeo from '../assets/blog-card-seo.jpg';
import imgAi from '../assets/blog-card-ai.jpg';
import imgSaas from '../assets/case-study-saas.jpg';
import imgFintech from '../assets/case-study-fintech.jpg';
import imgCyber from '../assets/case-study-cyber.jpg';
import imgAnalytics from '../assets/service-purple-rocket.jpg';

// Comprehensive Blog Posts Data Matrix
const initialBlogPosts = [
  {
    id: 1,
    title: 'The 2026 Algorithmic SEO Playbook: Semantic Clustering & Entity Dominance',
    category: 'SEO',
    readTime: '6 min read',
    date: 'Sep 02, 2026',
    author: {
      name: 'Alex Vance',
      role: 'Chief SEO Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    image: imgSeo,
    excerpt: 'Discover how machine learning rankers process contextual topical entities over traditional keyword density, and how to build high-authority topic clusters.',
    featured: true,
    tags: ['Technical SEO', 'Entity Search', 'Core Web Vitals']
  },
  {
    id: 2,
    title: 'Autonomous Growth Telemetry: Harnessing AI Predictive Modeling for Peak ROAS',
    category: 'Analytics',
    readTime: '8 min read',
    date: 'Aug 28, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Head of Data Science',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    image: imgAi,
    excerpt: 'Server-side attribution modeling and predictive cohort LTV analysis are replacing third-party cookies. Here is how modern growth teams deploy edge telemetry.',
    featured: false,
    tags: ['AI Modeling', 'Attribution', 'Telemetry']
  },
  {
    id: 3,
    title: 'Viral Social Engineering: Creating Short-Form Funnels That Convert Cold Viewers',
    category: 'Social Media',
    readTime: '5 min read',
    date: 'Aug 22, 2026',
    author: {
      name: 'Marcus Chen',
      role: 'Viral Media Director',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    image: imgSaas,
    excerpt: 'Stop relying on random viral hits. Learn the 3-second hook retention framework that systematically guides TikTok and Reels viewers into your commercial pipeline.',
    featured: false,
    tags: ['Short-Form', 'TikTok Reels', 'Retention']
  },
  {
    id: 4,
    title: 'High-Ticket PPC Bid Architectures: Scaled Multi-Platform Omnichannel Funnels',
    category: 'PPC',
    readTime: '7 min read',
    date: 'Aug 18, 2026',
    author: {
      name: 'Sarah Jenkins',
      role: 'Performance Lead',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    image: imgFintech,
    excerpt: 'How we generated over $14.2M in client pipeline revenue through programmatic DSP bidding matrices, high-intent search ads, and algorithmic retargeting.',
    featured: false,
    tags: ['Google Ads', 'Programmatic', 'Retargeting']
  },
  {
    id: 5,
    title: 'Persuasive Brand Resonance: Building Domain Authority That Crushes Competitors',
    category: 'Content Marketing',
    readTime: '9 min read',
    date: 'Aug 12, 2026',
    author: {
      name: 'David Sterling',
      role: 'Brand Architect',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80'
    },
    image: imgCyber,
    excerpt: 'Why generic blog articles fail and how in-depth whitepapers, executive commentary, and proprietary research reports drive enterprise sales cycles.',
    featured: false,
    tags: ['Thought Leadership', 'Whitepapers', 'Brand']
  },
  {
    id: 6,
    title: 'Next-Gen Scaling Frameworks: Zero-Latency Cloud Infrastructure for High Traffic',
    category: 'Growth Strategy',
    readTime: '6 min read',
    date: 'Aug 05, 2026',
    author: {
      name: 'Alex Vance',
      role: 'Chief SEO Strategist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    image: imgAnalytics,
    excerpt: 'A comprehensive technical audit on scaling modern React and Next.js web applications to handle 500,000+ concurrent users with sub-100ms response times.',
    featured: false,
    tags: ['Edge Hosting', 'React', 'Infrastructure']
  }
];

const categories = [
  { id: 'All', label: 'All Posts', icon: '▦' },
  { id: 'SEO', label: 'SEO', icon: '🔍' },
  { id: 'Social Media', label: 'Social Media', icon: '📱' },
  { id: 'PPC', label: 'PPC', icon: '🎯' },
  { id: 'Content Marketing', label: 'Content Marketing', icon: '✍' },
  { id: 'Analytics', label: 'Analytics', icon: '📈' },
  { id: 'Growth Strategy', label: 'Growth Strategy', icon: '🚀' }
];

const BlogsPg = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
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
                  <div className="blog-meta-row">
                    <span className="blog-meta-date">📅 {featuredPost.date}</span>
                    <span className="blog-meta-dot">•</span>
                    <span className="blog-meta-time">⏱ {featuredPost.readTime}</span>
                  </div>

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
                      <span>Read Article</span>
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
                      
                      <div className="blog-meta-row">
                        <span className="blog-meta-date">📅 {post.date}</span>
                        <span className="blog-meta-dot">•</span>
                        <span className="blog-meta-time">⏱ {post.readTime}</span>
                      </div>

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
                  <span>✓ You're on the VIP list! Check your inbox for our latest growth report.</span>
                </div>
              ) : (
                <form className="blog-newsletter-form" onSubmit={handleSubscribe} data-reveal="fade-up" data-reveal-delay="150">
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email address..."
                    className="blog-newsletter-input"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <button type="submit" className="blog-newsletter-btn">
                    <span>Subscribe Free</span>
                    <span className="blog-btn-arrow">→</span>
                  </button>
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
        {/* Bottom to Top Button with Circular SVG Scroll Progress Loader */}
        <button
          className={`scroll-to-top-btn ${showScrollTop ? 'btn-visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          title={`Scroll to top (${Math.round(scrollProgress)}%)`}
        >
          {/* Circular SVG Progress Ring */}
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

          {/* Centered Upward Arrow Icon */}
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

          {/* Ambient Glow */}
          <div className="scroll-btn-glow" />
        </button>

        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          <div className={`theme-icon-slider ${theme === 'light' ? 'light-active' : 'dark-active'}`}>
            {/* Sun Icon */}
            <div className="theme-icon sun-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" fill="#f59e0b"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>

            {/* Moon Icon */}
            <div className="theme-icon moon-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#f59e0b"></path>
              </svg>
            </div>
          </div>
          <span className="theme-label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>

    </div>
  );
};

export default BlogsPg;
