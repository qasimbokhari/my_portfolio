import React, { useState, useEffect } from "react";

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
          Qasim Bokhari · Islamabad
        </p>
        
        <h1 className="hero-title">
          I make the video content your brand's Instagram is <em>missing</em>.
        </h1>
        
        <p className="hero-sub">
          Product films, brand reels, and commercial video production — for restaurants, retail, and growing brands who need content that converts.
        </p>
        
        <a
          href="https://wa.me/923395261532?text=Hi%20Qasim%2C%20I%E2%80%99d%20like%20to%20get%20a%20quote%20for%20a%20video%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta"
        >
          Get a Quote
        </a>
      </div>
    </section>
  );
}
