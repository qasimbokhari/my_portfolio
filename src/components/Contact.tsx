import { useState, FormEvent } from "react";
import { Mail, Phone, Instagram, MapPin, CheckCircle, AlertTriangle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // If honeypot is filled, silently simulate success to fool bots without sending EmailJS requests
    if (website) {
      setSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setProjectType("");
      setMessage("");
      setWebsite("");
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email address, and project details.");
      return;
    }

    setSubmitting(true);

    const templateParams = {
      from_name: name,
      name: name,
      from_email: email,
      email: email,
      phone: phone,
      project_type: projectType,
      projectType: projectType,
      message: message,
    };

    emailjs.send(
      "service_8i3bn9k",
      "template_hgvudqa",
      templateParams,
      "IJ9TmEaoO9A4r_DL4"
    )
    .then((response) => {
      console.log("EmailJS Success:", response.status, response.text);
      setSubmitting(false);
      setSuccess(true);
      
      // Reset state fields
      setName("");
      setPhone("");
      setEmail("");
      setProjectType("");
      setMessage("");
    })
    .catch((err) => {
      console.error("EmailJS Error:", err);
      setSubmitting(false);
      setError("Something went wrong while sending your message. Please try again or reach out directly at qasimbokhari2005@gmail.com");
    });
  };

  return (
    <section id="contact">
      <div className="contact-inner reveal">
        <div className="contact-header">
          <span className="section-label">Get In Touch</span>
          <h2>
            Let's Make<br />
            Something <em>Cinematic</em>
          </h2>
          <p>Free consultation on all inquiries</p>
        </div>

        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-info">
            <h3>Reach me directly</h3>
            
            <div className="contact-detail">
              <div className="contact-item">
                <span className="contact-item-label flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  Phone
                </span>
                <a href="tel:+923365261531" className="contact-item-val">
                  +92 336 526 1531
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-item-label flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  Email
                </span>
                <a href="mailto:qasimbokhari2005@gmail.com" className="contact-item-val">
                  qasimbokhari2005@gmail.com
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-item-label flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5" />
                  Instagram
                </span>
                <a href="https://instagram.com/qasim.arw" target="_blank" rel="noopener noreferrer" className="contact-item-val">
                  @qasim.arw
                </a>
              </div>

              <div className="contact-item">
                <span className="contact-item-label flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  Location
                </span>
                <span className="contact-item-val">
                  Islamabad, Pakistan
                </span>
              </div>
            </div>

            {/* Cinematic rates guarantee badge */}
            <div className="contact-badge">
              <p>
                "Cinematic quality at rates that make sense for the Pakistani market."
              </p>
            </div>
          </div>

          {/* Right: Modern Contact Form */}
          <div className="contact-form">
            {success ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <CheckCircle className="w-12 h-12 text-gold mb-6 animate-bounce" />
                <h4 className="font-display text-2xl text-gold italic mb-4">Message Received</h4>
                <p className="font-sans text-sm text-silver font-light leading-relaxed max-w-[320px]">
                  Thank you for reaching out. I will review your project details and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-8 border border-gold-dim text-gold hover:border-gold px-6 py-2.5 text-[10px] uppercase tracking-widest cursor-pointer"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Honeypot field for bot protection */}
                <div style={{ position: "absolute", left: "-5000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                {error && (
                  <div className="p-4 bg-gold/10 border border-gold-dim border-l-2 border-l-gold text-silver text-xs flex items-center gap-2 mb-6">
                    <AlertTriangle className="w-4 h-4 text-gold shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ahmad Ali"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +92 300 000 0000"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. you@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    placeholder="Wedding / Commercial / Music Video / Other"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Tell Me About Your Project
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Date, location, brief concept..."
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="form-submit cursor-pointer"
                >
                  {submitting ? "Sending..." : "Book a Free Consultation"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
