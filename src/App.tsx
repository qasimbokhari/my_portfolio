import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import QuoteConfirmation from "./pages/QuoteConfirmation";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import ReactGA from "react-ga4";

function AppContent() {
  const location = useLocation();

  // Initialize GA4 only in production
  useEffect(() => {
    if (import.meta.env.PROD) {
      ReactGA.initialize("G-WXVYRP16CK");
    }
  }, []);

  // Track pageviews on route changes
  useEffect(() => {
    if (import.meta.env.PROD) {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }
  }, [location.pathname]);

  // Intersection observer for reveal animations
  useEffect(() => {
    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll(".reveal, .project-item");

    if (prefersReduced) {
      elements.forEach((el) => {
        el.classList.add("in-view", "visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view", "visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080808] selection:bg-gold selection:text-black">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-gold text-black px-4 py-2 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Immersive cinematic entrance loading screen */}
      <LoadingScreen />

      {/* Persistent global header navigation */}
      <Header />

      <Routes>
        <Route path="/" element={
          <main id="main-content">
            {/* Fullscreen hero section with deferred loop video */}
            <Hero />

            {/* Portfolio reel section containing high-resolution video and photo preview galleries */}
            <Portfolio />

            {/* Dynamic step-by-step commercial video workflow */}
            <HowItWorks />

            {/* Structured packages, pricing tiers, and customized quotes panel */}
            <Services />

            {/* Dynamic biographies and statistics summary */}
            <About />

            {/* Interactive customer ratings and feedback submit panel */}
            <Testimonials />

            {/* Client consultations and booking interface */}
            <Contact />

            {/* Direct booking calendar embed */}
            <Booking />
          </main>
        } />
        <Route path="/quote-confirmation" element={<QuoteConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Complete copyright and social indexing */}
      <Footer />

      {/* Floating fast-action contact links */}
      <WhatsAppButton />

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
