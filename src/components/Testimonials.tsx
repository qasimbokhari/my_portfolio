import { useState, useEffect, FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Testimonial } from "../types";
import { initialTestimonials } from "../data/portfolioData";
import { X, Star } from "lucide-react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch approved reviews from API on mount
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_REVIEWS_API_URL;
        if (!apiUrl) {
          console.warn("VITE_REVIEWS_API_URL not set, using initial testimonials only");
          return;
        }
        const response = await fetch(`${apiUrl}/reviews`);
        if (response.ok) {
          const apiReviews = await response.json();
          // Map API response to Testimonial format (API uses 'name', frontend uses 'author')
          const mappedReviews = apiReviews.map((r: any) => ({
            id: r.id,
            text: r.text,
            author: r.name,
            role: r.role,
            rating: r.rating
          }));
          // Merge: initialTestimonials first, then API reviews
          setTestimonials([...initialTestimonials, ...mappedReviews]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews from API:", error);
        // Silently fall back to initialTestimonials
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError("Please fill in both your name and review text.");
      return;
    }

    const apiUrl = import.meta.env.VITE_REVIEWS_API_URL;
    if (!apiUrl) {
      setError("Review service not configured.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim() || "Independent Creator",
          text: text.trim(),
          rating
        })
      });

      if (response.ok) {
        setSuccess(true);
        // Clear form
        setName("");
        setRole("");
        setText("");
        setRating(5);

        setTimeout(() => {
          setIsModalOpen(false);
          setSuccess(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials">
      <div className="testimonials-inner reveal">
        <div className="testimonials-header flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="section-label">Client Trust</span>
            <h2>
              Words From the<br />
              <em>Creators</em>
            </h2>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="testimonial-submit-btn cursor-pointer"
          >
            Write a Review
          </button>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <p className="testimonial-text">
                "{t.text}"
              </p>
              <div className="testimonial-author">
                <span className="testimonial-name">{t.author}</span>
                <span className="testimonial-role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal Portal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="review-modal open"
          >
            <div className="review-modal-content">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="review-modal-close cursor-pointer"
              >
                <X className="w-5 h-5 inline mr-2" /> Close
              </button>

              <h3>
                Share your <em>Experience</em>
              </h3>

              {success ? (
                <div className="text-center py-10 border border-gold-dim bg-gold/5 animate-pulse">
                  <p className="font-display text-lg italic text-gold">
                    Thanks for your review — it'll appear on the site once approved.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="review-form">
                  {error && (
                    <div className="p-3 text-xs bg-gold/10 border-l-2 border-gold text-silver mb-4">
                      {error}
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Bilal Shah"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Role / Company
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Producer, Creative Labs"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Rating
                    </label>
                    <div className="flex gap-2 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="text-gold cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating ? "fill-gold text-gold" : "text-[#555555]"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Review Content
                    </label>
                    <textarea
                      required
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Tell us about the project quality, timeline, and collaboration experience..."
                      className="form-textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="form-submit cursor-pointer"
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
