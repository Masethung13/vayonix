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
import { useScrollReveal } from './hooks/useScrollReveal';
import './styles/ScrollReveal.css';
import './App.css';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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

  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicePg />} />
          <Route path="/blogs" element={<BlogsPg />} />
          <Route path="/blog" element={<BlogsPg />} />
          <Route path="/contact" element={<ContactPg />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
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
