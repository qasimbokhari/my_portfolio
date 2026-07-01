import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ["hero", "portfolio", "about", "testimonials", "contact"];
          let currentSection = "hero";
          
          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 200) {
                currentSection = section;
              }
            }
          }
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open-lock");
    } else {
      document.body.classList.remove("menu-open-lock");
    }
    return () => {
      document.body.classList.remove("menu-open-lock");
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const navItems = [
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={menuOpen ? "nav-open" : ""}>
      <a href="#hero" className="nav-logo" onClick={handleLinkClick}>
        QB
      </a>
      
      {/* Desktop Menu */}
      <ul className="nav-links desktop-only">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={activeSection === item.id ? "active" : ""}
              style={{ color: activeSection === item.id ? "var(--white)" : "" }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Toggle Button */}
      <button
        className="menu-toggle mobile-only"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          {navItems.map((item, idx) => (
            <li 
              key={item.id} 
              style={{ transitionDelay: `${0.1 + idx * 0.08}s` }}
              className={menuOpen ? "slide-in" : ""}
            >
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                onClick={handleLinkClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

