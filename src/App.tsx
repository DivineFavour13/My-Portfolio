import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import Hero from './components/sections/Hero';
import Transition from './components/sections/Transition';
import BentoGrid from './components/sections/BentoGrid';
import FeaturedProjects from './components/sections/FeaturedProjects';
import BlogPreview from './components/sections/BlogPreview';
import Footer from './components/sections/Footer';
import ProjectsPage from './pages/Projects';
import ArticlesPage from './pages/Articles';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Home page component
function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <Transition />
      <BentoGrid />
      <FeaturedProjects />
      <BlogPreview />
      <Footer />
    </motion.main>
  );
}

// Main App component
function App() {
  useEffect(() => {
    // Preload fonts
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }, []);
  
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-background text-foreground">
        {/* Custom cursor */}
        <CustomCursor />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Page content with animations */}
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
