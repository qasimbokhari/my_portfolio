import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import { projectsData } from "../data/portfolioData";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [videoOrientations, setVideoOrientations] = useState<Record<string, "vertical" | "horizontal">>({});

  const handleLoadedMetadata = (videoUrl: string, e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const isVertical = video.videoHeight > video.videoWidth;
    setVideoOrientations((prev) => {
      const current = isVertical ? "vertical" : "horizontal";
      if (prev[videoUrl] === current) return prev;
      return {
        ...prev,
        [videoUrl]: current,
      };
    });
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="portfolio">
      <div className="portfolio-intro reveal">
        <span className="section-label">Selected Work</span>
        <h2>
          Stories Worth<br />
          <em>Telling</em>
        </h2>
      </div>

      <div className="project-reel">
        {projectsData.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="project-item"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="project-thumb"
              referrerPolicy="no-referrer"
            />
            <div className="project-overlay">
              <span className="project-cat">{project.category}</span>
              <h2 className="project-title">
                {project.title.split(" ").map((word, wIdx) => {
                  if (wIdx % 2 === 1) return <em key={wIdx}>{word} </em>;
                  return <span key={wIdx}>{word} </span>;
                })}
              </h2>
              <p className="project-desc">{project.description}</p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedProject(project);
                }}
                className="project-cta"
              >
                <span className="project-cta-line"></span>
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
            className="project-modal open"
          >
            <button
              className="modal-close"
              onClick={() => setSelectedProject(null)}
            >
              × Close
            </button>
            <div className="modal-hero">
              <div className="modal-video-wrap">
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  style={{ filter: "brightness(0.5)" }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="modal-hero-content">
                <span className="modal-cat">{selectedProject.category}</span>
                <h2 className="modal-title">{selectedProject.title}</h2>
              </div>
            </div>
            
            <div className="modal-body">
              {selectedProject.longDescription.split("\n\n").map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            {selectedProject.videos && selectedProject.videos.length > 0 && (
              <div className="modal-video-list">
                {selectedProject.videos.map((vid, vIdx) => {
                  const orientation = videoOrientations[vid] || "horizontal";
                  const isAfterRain = selectedProject.title === "After Rain";
                  return (
                    <video
                      key={vIdx}
                      src={vid}
                      controls
                      playsInline
                      preload="metadata"
                      muted={isAfterRain}
                      className={orientation === "vertical" ? "video-vertical" : "video-horizontal"}
                      onLoadedMetadata={(e) => handleLoadedMetadata(vid, e)}
                      onVolumeChange={isAfterRain ? (e) => {
                        const video = e.currentTarget;
                        video.muted = true;
                        video.volume = 0;
                      } : undefined}
                      onPlay={isAfterRain ? (e) => {
                        const video = e.currentTarget;
                        video.muted = true;
                        video.volume = 0;
                      } : undefined}
                      onTimeUpdate={isAfterRain ? (e) => {
                        const video = e.currentTarget;
                        if (video.volume > 0 || !video.muted) {
                          video.muted = true;
                          video.volume = 0;
                        }
                      } : undefined}
                    />
                  );
                })}
              </div>
            )}

            {selectedProject.gallery && selectedProject.gallery.length > 0 && (
              <div className="modal-gallery">
                {selectedProject.gallery.map((imgUrl, iIdx) => (
                  <img
                    key={iIdx}
                    src={imgUrl}
                    alt={`${selectedProject.title} frame ${iIdx}`}
                    className="modal-gallery-img"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
