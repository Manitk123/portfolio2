import { useState, useEffect } from 'react';
import { navLinks } from '../data';
import MagneticElement from './MagneticElement';
import LineSidebar from './LineSidebar';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 60) {
        // Set scrolled to true whenever we are past the top threshold
        setScrolled(true);
      } else {
        // Only revert to the top nav when we reach the very top (Hero section)
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

  // Update global body class for layout shifting
  useEffect(() => {
    if (scrolled) {
      document.body.classList.add('is-scrolled');
    } else {
      document.body.classList.remove('is-scrolled');
    }
  }, [scrolled]);

  const handleLinkClick = (e, href) => {
    if (e) e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      if (window.lenis) {
        window.lenis.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSidebarClick = (index) => {
    const link = navLinks[index];
    if (link) {
      handleLinkClick(null, link.href);
    }
  };

  // Find the currently active index for the sidebar
  const activeIndex = Math.max(0, navLinks.findIndex(link => link.href === activeSection));

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <MagneticElement strength={0.2} radius={30}>
          <a href="#home" className="nav-logo" onClick={(e) => handleLinkClick(e, '#home')}>
            <div className="mk-logo-wrapper soft-logo">
              mk
            </div>
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

      {/* Sidebar Navigation */}
      <div className={`sidebar-container ${scrolled ? 'visible' : ''}`}>
        <div className="sidebar-logo">
          <a href="#home" className="nav-logo" onClick={(e) => handleLinkClick(e, '#home')}>
            <div className="mk-logo-wrapper soft-logo">
              mk
            </div>
          </a>
        </div>
        <LineSidebar
          items={navLinks.map(link => link.label)}
          accentColor="#7eb1b4"
          textColor="#4a4a4a"
          markerColor="#9e9e9e"
          showIndex
          showMarker
          proximityRadius={100}
          maxShift={30}
          falloff="smooth"
          markerLength={50}
          markerGap={0}
          tickScale={0.5}
          scaleTick
          itemGap={20}
          fontSize={0.9}
          smoothing={100}
          defaultActive={activeIndex}
          onItemClick={handleSidebarClick}
        />
        <div className="sidebar-footer">
          <a
            href={`${import.meta.env.BASE_URL}Manit_resume_SD.pdf`}
            className="nav-resume-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </>
  );
}
