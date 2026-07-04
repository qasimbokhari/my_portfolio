import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { useEffect } from "react";

export default function App() {
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
      {/* Immersive cinematic entrance loading screen */}
      <LoadingScreen />

      {/* Persistent global header navigation */}
      <Header />

      <main>
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
      </main>

      {/* Complete copyright and social indexing */}
      <Footer />

      {/* Floating fast-action contact links */}
      <WhatsAppButton />
    </div>
  );
}
