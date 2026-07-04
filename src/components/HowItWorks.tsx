import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      label: "Consult",
      headline: "Tell me your vision",
      copy: "We start with a call or WhatsApp chat so I understand your brand, goals, and what kind of content will actually move the needle — whether that's a brand film, a photoshoot, or a full campaign."
    },
    {
      num: "02",
      label: "Create",
      headline: "I bring it to life",
      copy: "I personally lead the shoot and creative direction, bringing in my production team when a project needs extra hands — cameras, motion graphics, or additional crew. One accountable lead, full production capability."
    },
    {
      num: "03",
      label: "Deliver",
      headline: "Get content that performs",
      copy: "You receive polished, ready-to-use content — video, photos, graphics — edited and optimized for wherever it's going: Instagram, YouTube, ad campaigns, or your website."
    },
    {
      num: "04",
      label: "Grow together",
      headline: "Ongoing content, one trusted lead",
      copy: "Many clients keep working with me for ongoing shoots and campaigns — no re-explaining your brand each time, since I already know it."
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
