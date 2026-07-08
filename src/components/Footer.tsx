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
    <footer className="bg-[#080808] px-6 md:px-14 py-20 border-t border-white/5">
      {/* Newsletter Signup Section */}
      <div className="max-w-4xl mx-auto mb-20 text-center">
        <h3 className="font-display text-3xl md:text-4xl text-white font-light mb-4 italic">
          Get first <em>access</em>.
        </h3>
        <p className="font-sans text-sm md:text-base text-silver font-light leading-relaxed mb-10 max-w-2xl mx-auto">
          New work, seasonal discounts, and open shoot dates — straight to your inbox. No spam, unsubscribe anytime.
        </p>
        
        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-transparent border-b border-white/20 text-white px-4 py-4 text-sm focus:border-gold focus:border-b-2 outline-none transition-all duration-300 placeholder:text-silver/40"
            disabled={submitting}
          />
          <button
            type="submit"
            disabled={submitting}
            className="border border-gold/30 text-gold hover:border-gold hover:bg-gold hover:text-black px-8 py-4 text-[10px] uppercase tracking-widest cursor-pointer transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {submitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        
        {error && (
          <p className="text-[10px] text-red-400 mt-4">{error}</p>
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
