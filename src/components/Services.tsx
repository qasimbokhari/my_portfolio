import React from "react";

export default function Services() {
  const categories = [
    {
      title: "Commercial & Brand Films",
      packages: [
        {
          name: "Starter Package",
          price: "PKR 25,000 – 45,000",
          desc: "A single-day shoot, ideal for a product promo, short brand video, or single social media campaign. Includes filming, basic editing, and 1-2 final deliverables (e.g., a 30-60 second video)."
        },
        {
          name: "Growth Package",
          price: "PKR 60,000 – 120,000",
          desc: "Multi-shot or multi-location brand film with more complex storytelling. Includes pre-production planning, filming, professional editing, color grading, and 2-4 deliverables (long + short cuts for different platforms)."
        },
        {
          name: "Full Campaign",
          price: "Custom Quote",
          desc: "Multi-day shoots, multiple deliverables, motion graphics integration, and campaign-level content for brands running larger launches or seasonal pushes."
        }
      ]
    },
    {
      title: "Photography",
      packages: [
        {
          name: "Product/Brand Photography",
          price: "PKR 15,000 – 35,000",
          desc: "Studio or on-location product/brand photography, includes editing and retouching. Priced per session (typically 20-40 final images)."
        },
        {
          name: "Event/Corporate Photography",
          price: "PKR 20,000 – 50,000",
          desc: "Full coverage of corporate events, launches, or brand activations, includes edited high-res gallery."
        }
      ]
    },
    {
      title: "Motion Graphics & Editing",
      packages: [
        {
          name: "Basic Motion Graphics",
          price: "PKR 10,000 – 25,000",
          desc: "Logo animation, text overlays, or simple animated graphics added to existing footage."
        },
        {
          name: "Advanced Motion Design",
          price: "PKR 30,000 – 70,000",
          desc: "Custom animated explainer content, complex graphics packages, or animated ad campaigns."
        }
      ]
    },
    {
      title: "Branding Support",
      packages: [
        {
          name: "Brand Content Package",
          price: "PKR 40,000 – 90,000",
          desc: "Combined photography + video + basic motion graphics, designed to give a brand a consistent visual identity across platforms — ideal for new businesses building their first content library."
        }
      ]
    },
    {
      title: "Events & Weddings",
      isSecondary: true,
      packages: [
        {
          name: "Event Coverage",
          price: "PKR 30,000 – 60,000",
          desc: "Full-day event or wedding cinematography and photography, edited highlight reel and photo gallery included."
        }
      ]
    },
    {
      title: "Ongoing Retainers",
      packages: [
        {
          name: "Monthly Content Partner",
          price: "Custom Quote (typically PKR 80,000+/mo)",
          desc: "Ongoing monthly content production — a set number of videos, photos, and graphics delivered consistently, ideal for brands that need regular social content without hiring in-house."
        }
      ]
    }
  ];

  const microProject = {
    title: "Freelance & Micro Projects",
    price: "PKR 5,000 – 15,000",
    examples: ["Instagram reel edit", "Single product photo", "Short promo clip", "One-off logo animation", "Quick color grading"],
    pricingInfo: "Flat rate per task, quoted based on scope — tell me what you need and I'll give you a quick, fair price, usually within the same day.",
    bestFor: "Individuals, small businesses, or anyone needing a single deliverable without booking a full shoot or package."
  };

  return (
    <section id="services">
      <div className="services-container reveal">
        <div className="services-header">
          <span className="section-label">Offerings</span>
          <h2>
            Services &amp; <em>Pricing</em>
          </h2>
          <p className="services-intro">
            Full-service media production — commercial video, photography, branding, and motion graphics — at some of the most competitive rates in Pakistan, without compromising on quality. Every package below can be customized to your project.
          </p>
        </div>

        <div className="services-grid">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className={`service-category-card ${cat.isSecondary ? "secondary-offering" : ""}`}>
              <h3 className="category-title">
                <span className="category-num">0{catIdx + 1}</span> {cat.title}
                {cat.isSecondary && <span className="secondary-label">Secondary</span>}
              </h3>
              <div className="packages-list">
                {cat.packages.map((pkg, pkgIdx) => (
                  <div key={pkgIdx} className="package-item">
                    <div className="package-header">
                      <span className="package-name">{pkg.name}</span>
                      <span className="package-price">{pkg.price}</span>
                    </div>
                    <p className="package-desc">{pkg.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Freelance & Micro Projects full width or special placement */}
          <div className="service-category-card micro-project-card">
            <h3 className="category-title">
              <span className="category-num">07</span> {microProject.title}
            </h3>
            <div className="packages-list">
              <div className="package-item">
                <div className="package-header">
                  <span className="package-name">Micro Project Rate</span>
                  <span className="package-price">{microProject.price}</span>
                </div>
                <div className="micro-details-grid">
                  <div>
                    <span className="detail-label">Examples:</span>
                    <div className="micro-examples">
                      {microProject.examples.map((ex, exIdx) => (
                        <span key={exIdx} className="example-tag">{ex}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="detail-label">Best For:</span>
                    <p className="package-desc" style={{ marginTop: "4px" }}>{microProject.bestFor}</p>
                  </div>
                </div>
                <div className="micro-pricing-info">
                  <span className="detail-label">Pricing structure:</span>
                  <p className="package-desc" style={{ marginTop: "4px" }}>{microProject.pricingInfo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="services-footer">
          <p className="services-closing">
            Every project is scoped around your specific goals — the ranges above are a starting guide. Reach out for a custom quote, and I'll make sure you're getting premium production value at some of the most competitive rates in the market.
          </p>
          <a
            href="https://wa.me/923395261532?text=Hi%20Qasim%2C%20I%E2%80%99d%20like%20to%20get%20a%20custom%20quote%20for%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="form-submit inline-block text-center no-underline max-w-[320px] mx-auto cursor-pointer"
            style={{ display: "inline-block", marginTop: "40px" }}
          >
            <span>Get a Custom Quote (WhatsApp)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
