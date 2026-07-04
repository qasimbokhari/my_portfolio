import React, { useState, useEffect } from "react";
import { trackEvent } from "../utils/analytics";

export default function Hero() {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 480px)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 480px)");
    
    const handler = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <section id="hero">
      {/* Background Video Wrap */}
      <div className="hero-video-wrap">
        {isMobile ? (
          <video
            src="https://media.qasim.live/wild.mp4"
            className="hero-background-video mobile-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://media.qasim.live/photos/thumb03-1600w.webp"
            {...{ referrerPolicy: "no-referrer", fetchPriority: "high" }}
          />
        ) : (
          <video
            src="https://media.qasim.live/hero_video.mp4"
            className="hero-background-video desktop-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="https://media.qasim.live/photos/thum01-1600w.webp"
            {...{ referrerPolicy: "no-referrer", fetchPriority: "high" }}
          />
        )}
      </div>

      {/* Cinematic Letterbox borders */}
      <div className="hero-bar-top" />
      <div className="hero-bar-bottom" />

      <div className="hero-content">
        <p className="hero-eyebrow">
          Based in Islamabad | Available Nationwide
        </p>
        
        <h1 className="hero-title">
          Qasim<br />
          <em>Bokhari</em>
        </h1>
        
        <p className="hero-sub">
          Commercial &amp; Brand Films &nbsp;·&nbsp; Photography &nbsp;·&nbsp; Motion Graphics &nbsp;·&nbsp; Branding &nbsp;·&nbsp; Event &amp; Wedding Cinematography
        </p>
        
        <a
          href="https://wa.me/923395261532?text=Hi%20Qasim%2C%20I%E2%80%99d%20like%20to%20book%20a%20shoot%20or%20get%20a%20quote%20for%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta"
          onClick={() => trackEvent("Contact", "WhatsApp Click", "Hero CTA")}
        >
          Book a Shoot / Get a Quote
        </a>
      </div>
    </section>
  );
}
