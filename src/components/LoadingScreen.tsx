import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Elegant deliberate delay to establish majestic mood and build layout frames
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] } }}
          className="fixed inset-0 bg-[#080808] z-[10000] flex items-center justify-center pointer-events-all"
        >
          <div className="loading-content text-center">
            <h1 className="loading-title font-display text-5xl md:text-8xl font-light text-[#f0ede8] leading-[1.1]">
              Qasim<br />
              <em className="not-italic text-gold italic">Bokhari</em>
            </h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
