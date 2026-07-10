import { useState, useEffect } from 'react';
import { navLinks } from '../data';
import MagneticElement from './MagneticElement';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 60 && currentScrollY > lastScrollY) {
        // Scrolling down past threshold -> shrink
        setScrolled(true);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 60) {
        // Scrolling up or at top -> proper shape
        setScrolled(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <MagneticElement strength={0.2} radius={30}>
        <a href="#home" className="nav-logo" onClick={(e) => handleLinkClick(e, '#home')}>
          MK.
        </a>
      </MagneticElement>

      <div
        className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </div>

      <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <MagneticElement key={link.label} strength={0.2} radius={30}>
            <a
              href={link.href}
              className={`nav-link ${activeSection === link.href ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          </MagneticElement>
        ))}
        <MagneticElement strength={0.3} radius={40}>
          <a
            href={`${import.meta.env.BASE_URL}Manit_resume_SD.pdf`}
            className="nav-resume-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </MagneticElement>
      </div>
    </nav>
  );
}
