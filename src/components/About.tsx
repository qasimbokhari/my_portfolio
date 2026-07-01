export default function About() {
  const services = [
    "Cinematography",
    "Photography",
    "Premiere Pro",
    "After Effects",
    "Lightroom",
    "Photoshop & Illustrator",
    "Weddings",
    "Brand Campaigns",
    "Music Videos",
    "Documentary Films",
  ];

  return (
    <section id="about">
      <div className="about-container reveal">
        {/* Left column for desktop */}
        <div className="about-left-col">
          {/* 3. Image Block */}
          <div className="about-image-block">
            <div className="about-image-wrap">
              <img
                src="https://media.qasim.live/photos/pp.jpg"
                alt="Qasim Bokhari"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
            </div>
          </div>

          {/* 4. Statistics Block */}
          <div className="about-stats-block">
            <div className="about-stats">
              <div>
                <span className="stat-num">2+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div>
                <span className="stat-num">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div>
                <span className="stat-num">PKR</span>
                <span className="stat-label">Best Rates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column for desktop */}
        <div className="about-right-col">
          {/* 1. Header Block */}
          <div className="about-header-block">
            <span className="section-label">About Me</span>
            <h2>
              Behind<br />
              the <em>Lens</em>
            </h2>
          </div>

          {/* 2. Biography Block */}
          <div className="about-bio-block">
            <p>
              My name is Qasim Bokhari. I am a cinematographer, photographer, and editor from Islamabad, and over the past two years I have built a body of work that spans weddings, brand campaigns, music videos, and documentary-style projects.
            </p>
            <p>
              I work hands-on across the full Adobe Creative Suite, from editing in Premiere Pro and motion work in After Effects to color grading in Lightroom and visual design in Photoshop and Illustrator. Behind every project is a professional team and the equipment to match, ready for productions of any scale.
            </p>
            <p>
              If you are looking for someone who brings the same level of care to every project regardless of size, I would love to work with you.
            </p>
            <p>
              Based in Islamabad. Available across Pakistan.
            </p>
          </div>

          {/* 5. Tags Block */}
          <div className="about-tags-block">
            <div className="about-services">
              {services.map((service, idx) => (
                <span key={idx} className="service-pill">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
