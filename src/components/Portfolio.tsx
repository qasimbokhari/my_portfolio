import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Project } from "../types";
import { projectsData } from "../data/portfolioData";

const ProjectModal = lazy(() => import("./ProjectModal"));

const getSrcSet = (url: string) => {
  const lastDot = url.lastIndexOf(".");
  if (lastDot === -1) return undefined;
  const base = url.substring(0, lastDot);
  return `${base}-480w.webp 480w, ${base}-960w.webp 960w, ${base}-1600w.webp 1600w`;
};

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
        {/* Note: Resized width-suffixed files must be generated and uploaded to the R2 bucket at the same path before this takes effect. */}
        <img
          src={project.thumbnail}
          srcSet={getSrcSet(project.thumbnail)}
          sizes="(max-width: 480px) 100vw, (max-width: 767px) 50vw, 100vw"
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
          <Suspense fallback={null}>
            <ProjectModal
              selectedProject={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
}
