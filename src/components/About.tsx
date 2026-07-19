export default function About() {
  const services = [
    "Creative Direction",
    "Branding",
    "Commercial Video",
    "Photography",
    "Motion Graphics",
    "Premiere Pro",
    "After Effects",
    "Lightroom",
    "Photoshop & Illustrator",
    "Wedding Cinematography",
    "Documentary Films"
  ];

  return (
    <section id="about" className="site-section">
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
                className="protected-img"
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
              I lead every project.<br />
              My team helps me <em>deliver it at scale</em>.
            </h2>
          </div>

          {/* 2. Biography Block */}
          <div className="about-bio-block">
            <p>
              I'm Qasim Bokhari, a creative director and media producer based in Islamabad. I own the full creative pipeline — from initial concept and strategy through execution and final delivery. My approach is completely hands-on: whether I'm directing a shoot, color grading, or designing in the Adobe Creative Suite, the creative vision stays entirely with me.
            </p>
            <p>
              For large-scale projects, I leverage a trusted production team equipped to handle complex multi-cam setups and high-end motion design without ever compromising on quality control. I bring the same level of care and precision to every brand I partner with, regardless of scale.
            </p>
            <p>
              Let's create something impactful together.
            </p>
            <p>
              Based in Islamabad. Available nationwide.
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
