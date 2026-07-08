import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleNewsletterSubmit = (e: FormEvent) => {
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
        trackEvent("Newsletter", "Signup", "Footer");
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
    <footer className="bg-[#080808] px-6 md:px-14 py-16 border-t border-white/5">
      {/* Newsletter Signup Section */}
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <h3 className="font-display text-xl md:text-2xl text-white font-light mb-3 italic">
          Get first access to new work, offers & availability
        </h3>
        <p className="font-sans text-xs md:text-sm text-silver font-light leading-relaxed mb-8">
          Occasional emails — new portfolio drops, limited-time discounts, and open shoot dates. No spam, unsubscribe anytime.
        </p>
        
        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent border border-white/[0.12] text-white px-4 py-3 text-sm focus:border-gold outline-none transition-all duration-300"
            disabled={submitting}
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-gold text-black hover:bg-white px-6 py-3 text-[10px] uppercase tracking-widest cursor-pointer transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        
        {error && (
          <p className="text-[10px] text-red-400 mt-3">{error}</p>
        )}
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-4 text-center">
        <div className="footer-logo font-display text-xl md:text-2xl font-light tracking-[0.1em] text-[#f0ede8] md:text-left md:justify-self-start">
          Qasim Bokhari
        </div>
        
        <div className="footer-links flex gap-6 md:gap-8 justify-center items-center md:justify-self-center">
          <a
            href="https://instagram.com/qasim.arw"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.15em] text-silver hover:text-gold no-underline transition-colors duration-300 cursor-pointer uppercase font-medium"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/923395261532"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.15em] text-silver hover:text-gold no-underline transition-colors duration-300 cursor-pointer uppercase font-medium"
            onClick={() => trackEvent("Contact", "WhatsApp Click", "Footer CTA")}
          >
            WhatsApp
          </a>
          <a
            href="mailto:contact@qasim.live"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.15em] text-silver hover:text-gold no-underline transition-colors duration-300 cursor-pointer uppercase font-medium"
          >
            Email
          </a>
        </div>
        
        <div className="footer-copy text-[10px] tracking-[0.2em] text-silver uppercase md:text-right md:justify-self-end">
          © {currentYear} · Islamabad · All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
