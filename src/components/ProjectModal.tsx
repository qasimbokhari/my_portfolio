import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Project } from "../types";

interface ProjectModalProps {
  selectedProject: Project;
  onClose: () => void;
}

export default function ProjectModal({ selectedProject, onClose }: ProjectModalProps) {
  const [videoOrientations, setVideoOrientations] = useState<Record<string, "vertical" | "horizontal">>({});
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

  // Lock body scroll and handle focus trapping on mount
  useEffect(() => {
    const lastActiveElement = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector(".modal-close") as HTMLElement;
      if (closeBtn) {
        closeBtn.focus();
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      if (lastActiveElement) {
        lastActiveElement.focus();
      }
    };
  }, []);

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
      onClose();
    }
  };

  return (
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
        onClick={onClose}
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
            const isForceMuted = selectedProject.forceMuted;
            return (
              <div key={vIdx} className="modal-video-item">
                <video
                  src={vid}
                  controls={!isForceMuted}
                  playsInline
                  preload="metadata"
                  muted={isForceMuted}
                  {...{ referrerPolicy: "no-referrer" }}
                  className={orientation === "vertical" ? "video-vertical" : "video-horizontal"}
                  onLoadedMetadata={(e) => handleLoadedMetadata(vid, e)}
                  onVolumeChange={isForceMuted ? (e) => {
                    const video = e.currentTarget;
                    video.muted = true;
                    video.volume = 0;
                  } : undefined}
                  onPlay={isForceMuted ? (e) => {
                    const video = e.currentTarget;
                    video.muted = true;
                    video.volume = 0;
                  } : undefined}
                  onTimeUpdate={isForceMuted ? (e) => {
                    const video = e.currentTarget;
                    if (video.volume > 0 || !video.muted) {
                      video.muted = true;
                      video.volume = 0;
                    }
                  } : undefined}
                />
                {isForceMuted && (
                  <p className="modal-video-caption">
                    Video muted due to licensed background music
                  </p>
                )}
              </div>
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
  );
}
