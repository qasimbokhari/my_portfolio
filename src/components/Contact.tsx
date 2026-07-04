import { useState, FormEvent, useEffect, useRef } from "react";
import { Mail, Phone, Instagram, MapPin, CheckCircle, AlertTriangle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [activeTab, setActiveTab] = useState<"form" | "booking">("form");
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Dropdown states
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "Wedding", label: "Wedding Film" },
    { value: "Commercial", label: "Commercial & Brand Video" },
    { value: "Music Video", label: "Music Video" },
    { value: "Documentary", label: "Documentary Film" },
    { value: "Other", label: "Other Creative Project" }
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Honeypot check
    if (website) {
      setSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setProjectType("");
      setPreferredDate("");
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
      preferred_date: preferredDate,
      message: message,
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      console.log("EmailJS Success:", response.status, response.text);
      setSubmitting(false);
      setSuccess(true);
      
      // Reset fields
      setName("");
      setPhone("");
      setEmail("");
      setProjectType("");
      setPreferredDate("");
      setMessage("");
    })
    .catch((err) => {
      console.error("EmailJS Error:", err);
      setSubmitting(false);
      setError("Something went wrong. Please try again or reach out directly at contact@qasim.live");
    });
  };

  return (
    <section id="contact">
      <div className="contact-inner reveal">
        {/* Section Header */}
        <div className="contact-header">
          <span className="section-label">Connect</span>
          <h2>
            Start Your <em>Project</em>
          </h2>
          <p>Tell me about your vision, and let's bring it to life</p>
        </div>

        {/* Cinematic Underline Tabs Selection */}
        <div className="flex justify-center items-center gap-8 md:gap-10 mb-24 md:mb-28 contact-tabs-container">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`font-sans text-[11px] uppercase tracking-[0.25em] pb-2 cursor-pointer transition-all duration-300 border-b-2 ${
              activeTab === "form"
                ? "border-gold text-gold font-medium"
                : "border-transparent text-silver hover:text-white"
            }`}
          >
            Inquiry Form
          </button>
          <span className="text-white/10 font-light text-sm select-none">/</span>
          <button
            type="button"
            onClick={() => setActiveTab("booking")}
            className={`font-sans text-[11px] uppercase tracking-[0.25em] pb-2 cursor-pointer transition-all duration-300 border-b-2 ${
              activeTab === "booking"
                ? "border-gold text-gold font-medium"
                : "border-transparent text-silver hover:text-white"
            }`}
          >
            Direct Booking
          </button>
        </div>

        {/* Tab 1: Inquiry Form and Direct Details */}
        {activeTab === "form" && (
          <div className="contact-grid">
            {/* Left Column: Reach Me Directly */}
            <div className="contact-info">
              <h3>Reach Me Directly</h3>
              <div className="contact-detail">
                {/* Phone */}
                <a 
                  href="https://wa.me/923395261532" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block no-underline"
                >
                  <span className="block contact-item-label">Phone & WhatsApp</span>
                  <span className="block font-display text-[13px] sm:text-lg md:text-xl lg:text-2xl text-white group-hover:text-gold transition-colors duration-300 font-light tracking-wide">
                    +92 339 526 1532
                  </span>
                </a>
                
                {/* Email */}
                <a 
                  href="mailto:contact@qasim.live" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block no-underline"
                >
                  <span className="block contact-item-label">Email Address</span>
                  <span className="block font-display text-[13px] sm:text-lg md:text-xl lg:text-2xl text-white group-hover:text-gold transition-colors duration-300 font-light tracking-wide break-all">
                    contact@qasim.live
                  </span>
                </a>
                
                {/* Instagram */}
                <a 
                  href="https://instagram.com/qasim.arw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block no-underline"
                >
                  <span className="block contact-item-label">Instagram</span>
                  <span className="block font-display text-[13px] sm:text-lg md:text-xl lg:text-2xl text-white group-hover:text-gold transition-colors duration-300 font-light tracking-wide">
                    @qasim.arw
                  </span>
                </a>
                
                {/* Location */}
                <div className="group block">
                  <span className="block contact-item-label">Location</span>
                  <span className="block font-display text-[13px] sm:text-lg md:text-xl lg:text-2xl text-white font-light tracking-wide">
                    Islamabad, Pakistan
                  </span>
                </div>
              </div>

              {/* Rates & Guarantee Badge */}
              <div className="contact-badge">
                <p>
                  "Cinematic quality at rates that make sense for the Pakistani market."
                </p>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="contact-form">
              {success ? (
                <div aria-live="polite" role="status" className="text-center py-12 flex flex-col items-center justify-center bg-transparent rounded-none">
                  <CheckCircle className="w-12 h-12 text-gold mb-6 animate-pulse" />
                  <h4 className="font-display text-2xl text-gold italic mb-4">Message Received</h4>
                  <p className="font-sans text-sm text-silver font-light leading-relaxed max-w-[320px] mx-auto">
                    Thank you for reaching out. I will review your project details and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-8 border border-gold/30 text-gold hover:border-gold px-6 py-2.5 text-[10px] uppercase tracking-widest cursor-pointer transition-all duration-300 rounded-none bg-transparent hover:bg-gold hover:text-black font-medium"
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
                    <div aria-live="assertive" role="alert" className="p-4 bg-gold/10 border border-gold-dim border-l-2 border-l-gold text-silver text-xs flex items-center gap-2 mb-6">
                      <AlertTriangle className="w-4 h-4 text-gold shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Form Rows */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ahmad Ali"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone / WhatsApp</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +92 300 000 0000"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. you@example.com"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" ref={dropdownRef}>
                      <label className="form-label">Project Type</label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          aria-expanded={isDropdownOpen}
                          className="form-input text-left flex justify-between items-center bg-transparent cursor-pointer border-b border-white/[0.12] focus:border-gold py-3 w-full outline-none transition-all duration-300"
                        >
                          <span className={projectType ? "text-white" : "text-silver"}>
                            {projectType ? options.find(o => o.value === projectType)?.label : "Select a project type"}
                          </span>
                          <svg className={`h-4 w-4 fill-current text-gold transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </button>
                        
                        {isDropdownOpen && (
                          <div className="absolute z-50 left-0 right-0 mt-1 bg-[#111111] border border-gold/30 shadow-2xl overflow-hidden rounded-none">
                            {options.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setProjectType(opt.value);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-xs uppercase tracking-[0.15em] font-sans hover:bg-gold hover:text-black transition-colors duration-200 ${projectType === opt.value ? 'bg-gold/15 text-gold' : 'text-silver'}`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferred-date" className="form-label">Preferred Date</label>
                      <input
                        id="preferred-date"
                        name="preferred-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="form-input bg-transparent text-white cursor-pointer [color-scheme:dark]"
                      />
                    </div>

                    <div className="form-group flex items-end pb-2">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-silver/40 italic leading-relaxed">
                        * Dates are subject to schedule availability.
                      </p>
                    </div>
                  </div>

                  <div className="form-group mb-10">
                    <label htmlFor="message" className="form-label">Tell Me About Your Project</label>
                    <textarea
                      id="message"
                      name="message"
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
                    className="form-submit"
                  >
                    <span>{submitting ? "Sending..." : "Book a Free Consultation"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Cal.com Embed */}
        {activeTab === "booking" && (
          <div className="w-full max-w-[850px] mx-auto animate-[fadeIn_0.5s_ease-out] flex flex-col items-center justify-center py-24 border border-white/[0.03] bg-[#0a0a0a] rounded">
            <p className="text-silver text-sm font-light mb-8 text-center max-w-[420px] px-6">
              Click below to view my live availability and book a consultation directly.
            </p>
            <a
              href="https://cal.com/qasim-bokhari"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold/30 text-gold hover:border-gold px-8 py-3 text-xs uppercase tracking-widest cursor-pointer transition-all duration-300 bg-transparent hover:bg-gold hover:text-black font-medium no-underline"
            >
              Open Booking Calendar
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
