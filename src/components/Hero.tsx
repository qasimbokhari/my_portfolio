import React from "react";

export default function Hero() {
  return (
    <section id="hero">
      {/* Background Video Wrap */}
      <div className="hero-video-wrap">
        <video
          src="https://pub-3b7f468f2890447292a956c1c03cef0e.r2.dev/hero_video.mp4"
          className="hero-background-video desktop-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <video
          src="https://pub-3b7f468f2890447292a956c1c03cef0e.r2.dev/wild.mp4"
          className="hero-background-video mobile-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
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
        
        <a href="#portfolio" className="hero-cta clickable">
          View Portfolio
        </a>
      </div>
    </section>
  );
}
