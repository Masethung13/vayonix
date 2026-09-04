import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Abt from './components/Abt';
import Mission from './components/Mission';
import Ourvalues from './components/Ourvalues';
import Whatwedo from './components/Whatwedo';
import Services from './components/Services';
import Workingprocess from './components/Workingprocess';
import Whychooseus from './components/Whychooseus';
import ServicePg from './components/ServicePg';
import ContactPg from './components/ContactPg';
import BlogsPg from './components/BlogsPg';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import { useScrollReveal } from './hooks/useScrollReveal';
import './styles/ScrollReveal.css';
import './App.css';
import CreativeCursor from './components/CreativeCursor';

// Auto scroll to top on route change or smooth scroll to hash
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

// Home Page Composite Layout
function HomePage() {
  return (
    <>
      <Home />
      <Whatwedo />
      <Services />
      <Workingprocess />
      <Whychooseus />
    </>
  );
}

// Dedicated About Page Composite Layout
function AboutPage() {
  return (
    <>
      <Abt />
      <Mission />
      <Ourvalues />
    </>
  );
}

function AppContent() {
  useScrollReveal(0.12);

  useEffect(() => {
    const savedTheme = localStorage.getItem('vayonix_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.body.className = `theme-${savedTheme}`;
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <CreativeCursor />
      <Header />
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePg />} />
          <Route path="/blogs" element={<BlogsPg />} />
          <Route path="/blog" element={<BlogsPg />} />
          <Route path="/contact" element={<ContactPg />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/terms" element={<TermsOfService />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />

      {/* Circular Theme Expanding Wave Overlays */}
      <div className="darkCircle" aria-hidden="true" />
      <div className="lightCircle" aria-hidden="true" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
