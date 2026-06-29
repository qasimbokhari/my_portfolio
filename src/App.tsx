import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Disable right click to protect cinematographer's premium copyright stills and raw media
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable standard dragging of premium assets
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.nodeName === "IMG" ||
        target.nodeName === "VIDEO" ||
        target.classList.contains("media-shield")
      ) {
        e.preventDefault();
      }
    };

    // Prevent key combinations commonly used to inspect and extract raw high-res media files
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "J" || e.key === "j")) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "C" || e.key === "c")) {
        const activeTag = document.activeElement?.tagName;
        if (activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
          e.preventDefault();
        }
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "A" || e.key === "a")) {
        const activeTag = document.activeElement?.tagName;
        if (activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
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

    const observeElements = () => {
      const elements = document.querySelectorAll(".reveal, .project-item");
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
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
