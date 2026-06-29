import { useState, FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Testimonial } from "../types";
import { initialTestimonials } from "../data/portfolioData";
import { X, Star } from "lucide-react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setError("Please fill in both your name and review text.");
      return;
    }

    const newReview: Testimonial = {
      id: Date.now(),
      text: text.trim(),
      author: name.trim(),
      role: role.trim() || "Independent Creator"
    };

    setTestimonials((prev) => [...prev, newReview]);
    setSuccess(true);
    setError("");
    
    // Clear form
    setName("");
    setRole("");
    setText("");
    setRating(5);

    setTimeout(() => {
      setIsModalOpen(false);
      setSuccess(false);
    }, 2000);
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
            className="testimonial-submit-btn clickable"
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
                className="review-modal-close clickable"
              >
                <X className="w-5 h-5 inline mr-2" /> Close
              </button>

              <h3>
                Share your <em>Experience</em>
              </h3>

              {success ? (
                <div className="text-center py-10 border border-gold-dim bg-gold/5 animate-pulse">
                  <p className="font-display text-lg italic text-gold">
                    Review submitted successfully.<br />
                    Adding it directly to the stage...
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
                      className="form-input clickable"
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
                      className="form-input clickable"
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
                          className="text-gold cursor-none clickable"
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
                      className="form-textarea clickable"
                    />
                  </div>

                  <button
                    type="submit"
                    className="form-submit clickable"
                  >
                    Submit Review
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
