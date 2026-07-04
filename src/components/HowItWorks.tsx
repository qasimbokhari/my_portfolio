import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      label: "Consult",
      headline: "Tell me your vision",
      copy: "We hop on a quick call or WhatsApp chat to talk through your brand, goals, and what kind of video will actually move the needle for you — whether it's a product film, a brand reel, or a full campaign."
    },
    {
      num: "02",
      label: "Shoot",
      headline: "We bring it to life",
      copy: "On shoot day, I handle everything — concept, direction, filming — so you don't have to think about the technical side. Just show up and let the brand speak."
    },
    {
      num: "03",
      label: "Deliver",
      headline: "Get content that performs",
      copy: "You receive polished, ready-to-post video content, edited and optimized for wherever it's going — Instagram, YouTube, your website, or ad campaigns."
    }
  ];

  return (
    <section id="how-it-works">
      <div className="how-it-works-container reveal">
        <div className="how-it-works-header">
          <span className="section-label">Process</span>
          <h2>
            How It <em>Works</em>
          </h2>
        </div>

        <div className="how-it-works-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-num">{step.num}</div>
              <div className="step-label">{step.label}</div>
              <h3 className="step-headline">{step.headline}</h3>
              <p className="step-copy">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
