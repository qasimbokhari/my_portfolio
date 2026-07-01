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
            poster="https://media.qasim.live/photos/thumb03.jpg"
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
            poster="https://media.qasim.live/photos/thum01.jpg"
            {...{ referrerPolicy: "no-referrer", fetchPriority: "high" }}
          />
        )}
      </div>

      {/* Cinematic Letterbox borders */}
      <div className="hero-bar-top" />
      <div className="hero-bar-bottom" />

      <div className="hero-content">
        <p className="hero-eyebrow">
          Islamabad, Pakistan · Est. 2024
        </p>
        
        <h1 className="hero-title">
          Qasim<br />
          <em>Bokhari</em>
        </h1>
        
        <p className="hero-sub">
          Cinematographer &nbsp;·&nbsp; Photographer &nbsp;·&nbsp; Editor
        </p>
        
        <a href="#portfolio" className="hero-cta">
          View Portfolio
        </a>
      </div>
    </section>
  );
}
