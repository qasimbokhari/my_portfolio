import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Project } from "../types";
import { projectsData } from "../data/portfolioData";

interface ProjectItemProps {
  project: Project;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, setSelectedProject }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of this project item relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll translation for subtle, premium parallax
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const y = prefersReduced ? "0%" : parallaxY;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedProject(project);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={() => setSelectedProject(project)}
      onKeyDown={handleKeyDown}
      className="project-item focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
      tabIndex={0}
      role="button"
      aria-label={`View project: ${project.title}`}
    >
      <motion.div style={{ y }} className="project-thumb-wrapper">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="project-thumb"
          referrerPolicy="no-referrer"
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
      </motion.div>
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
          tabIndex={-1}
        >
          <span className="project-cta-line"></span>
          View Project
        </a>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [videoOrientations, setVideoOrientations] = useState<Record<string, "vertical" | "horizontal">>({});

  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  // Lock body scroll and track focus states
  useEffect(() => {
    if (selectedProject) {
      // Save the currently focused element
      lastActiveElementRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      // Focus the close button once the modal is rendered
      const timer = setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector(".modal-close") as HTMLElement;
        if (closeBtn) {
          closeBtn.focus();
        }
      }, 50);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      // Restore focus when modal closes
      if (lastActiveElementRef.current) {
        lastActiveElementRef.current.focus();
        lastActiveElementRef.current = null;
      }
    }
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

  // Sync URL hash with selectedProject state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#portfolio/")) {
        const idOrSlug = hash.replace("#portfolio/", "");
        const found = projectsData.find((p) => {
          const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            String(p.id) === idOrSlug ||
            slug === idOrSlug ||
            idOrSlug === `${p.id}-${slug}`
          );
        });

        if (found) {
          setSelectedProject((current) => (current?.id === found.id ? current : found));
        } else {
          setSelectedProject((current) => (current === null ? null : null));
        }
      } else {
        setSelectedProject((current) => (current === null ? null : null));
      }
    };

    // Initial check on load
    handleHashChange();

    window.addEventListener("popstate", handleHashChange);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("popstate", handleHashChange);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Update URL hash when selectedProject state changes
  useEffect(() => {
    if (selectedProject) {
      const slug = selectedProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const targetHash = `#portfolio/${selectedProject.id}-${slug}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState({ isModal: true }, "", targetHash);
      }
    } else {
      if (window.location.hash.startsWith("#portfolio/")) {
        if (window.history.state && window.history.state.isModal) {
          window.history.back();
        } else {
          window.history.pushState(null, "", window.location.pathname + window.location.search);
        }
      }
    }
  }, [selectedProject]);

  const handleModalKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      if (!modalRef.current) return;

      const focusableSelector = 'button, [href], input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';
      const focusableElements = Array.from(
        modalRef.current.querySelectorAll(focusableSelector)
      ) as HTMLElement[];

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    } else if (e.key === "Escape") {
      setSelectedProject(null);
    }
  };

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
          <ProjectItem
            key={project.id}
            project={project}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
            className="project-modal open"
            role="dialog"
            aria-modal="true"
            onKeyDown={handleModalKeyDown}
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
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onContextMenu={(e) => e.preventDefault()}
                  draggable={false}
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
                      {...{ referrerPolicy: "no-referrer" }}
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
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
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
