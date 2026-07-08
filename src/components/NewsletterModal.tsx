import { useState, useEffect, useRef, FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

const STORAGE_KEY_DISMISS = "newsletter_modal_dismissed";
const STORAGE_KEY_SUBSCRIBED = "newsletter_modal_subscribed";
const DISMISS_DAYS = 7;

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check if modal should be shown based on localStorage
  const shouldShowModal = () => {
    if (typeof window === "undefined") return false;

    // If user has subscribed, never show again
    const subscribed = localStorage.getItem(STORAGE_KEY_SUBSCRIBED);
    if (subscribed === "true") return false;

    // If user dismissed, check if 7 days have passed
    const dismissed = localStorage.getItem(STORAGE_KEY_DISMISS);
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const daysSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < DISMISS_DAYS) return false;
    }

    return true;
  };

  // Exit intent detection
  useEffect(() => {
    if (!shouldShowModal()) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        console.log("Exit intent triggered");
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  // Fallback triggers for mobile (timer or scroll depth)
  useEffect(() => {
    if (!shouldShowModal() || isOpen) return;

    let timerTriggered = false;
    let scrollTriggered = false;

    // 5-second timer for testing (was 15 seconds)
    const timer = setTimeout(() => {
      if (!scrollTriggered && !isOpen) {
        console.log("Timer triggered");
        timerTriggered = true;
        setIsOpen(true);
      }
    }, 5000);

    // 50% scroll depth
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50 && !timerTriggered && !isOpen) {
        console.log("Scroll triggered");
        scrollTriggered = true;
        setIsOpen(true);
        document.removeEventListener("scroll", handleScroll);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY_DISMISS, Date.now().toString());
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitting(true);

    fetch("/api/newsletter-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to subscribe");
        }
        return response.json();
      })
      .then(() => {
        setSubmitting(false);
        // Mark as subscribed so modal never shows again
        localStorage.setItem(STORAGE_KEY_SUBSCRIBED, "true");
        localStorage.removeItem(STORAGE_KEY_DISMISS);
        trackEvent("Newsletter", "Signup", "Modal");
        setIsOpen(false);
        navigate("/newsletter-confirmation");
        setEmail("");
      })
      .catch((err) => {
        console.error("Newsletter signup error:", err);
        setSubmitting(false);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10 bg-black/95 backdrop-blur-xl"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="newsletter-modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1] }}
            className="relative bg-[#080808] border border-gold/30 max-w-4xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative top border */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-8 right-8 text-silver hover:text-gold transition-colors duration-300 cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="p-12 md:p-20 text-center">
              <h2
                id="newsletter-modal-title"
                className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-light mb-6 italic leading-tight"
              >
                Get first <em>access</em>.
              </h2>
              <p className="font-sans text-base md:text-lg text-silver font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                New work, seasonal discounts, and open shoot dates — straight to your inbox. No spam, unsubscribe anytime.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-white/30 text-white px-4 py-5 text-base focus:border-gold focus:border-b-2 outline-none transition-all duration-300 placeholder:text-silver/40"
                    disabled={submitting}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full border border-gold/40 text-gold hover:border-gold hover:bg-gold hover:text-black px-10 py-5 text-[11px] uppercase tracking-widest cursor-pointer transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Subscribing..." : "Subscribe"}
                </button>

                {error && (
                  <p className="text-[11px] text-red-400">{error}</p>
                )}

                <button
                  type="button"
                  onClick={handleClose}
                  className="text-[11px] text-silver/50 hover:text-silver transition-colors duration-300 cursor-pointer uppercase tracking-wider"
                >
                  No thanks
                </button>
              </form>
            </div>

            {/* Decorative bottom border */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
