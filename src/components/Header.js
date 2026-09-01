import React, { useState } from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [activeNav, setActiveNav] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo & Name */}
        <a href="#home" className="header-logo-link">
          <div className="header-logo-wrapper">
            <img src={logo} alt="DigitalGrow Logo" className="header-logo-img" />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="header-nav">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isActive = activeNav === link.name;
              return (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveNav(link.name)}
                  >
                    {link.name}
                    {isActive && <span className="active-indicator" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Call to Action Button */}
        <div className="header-action">
          <a href="#get-started" className="cta-button">
            <span>Get Started</span>
            <svg
              className="cta-arrow-icon"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.name} className="mobile-nav-item">
              <a
                href={link.href}
                className={`mobile-nav-link ${activeNav === link.name ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(link.name);
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="mobile-nav-item mobile-cta-item">
            <a
              href="#get-started"
              className="cta-button mobile-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Get Started</span>
              <svg
                className="cta-arrow-icon"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
