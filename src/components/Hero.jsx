import { useEffect, useRef } from 'react';
import { personalInfo, navLinks } from '../data';
import HeroScene from './HeroScene';

// SVG Starburst component
function Starburst() {
  return (
    <div className="hero-starburst">
      <svg viewBox="0 0 40 40" fill="currentColor">
        <path d="M20 0l2.5 15.5L40 20l-17.5 2.5L20 40l-2.5-17.5L0 20l17.5-4.5z" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Parallax fade effect on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const fadeRatio = Math.max(1 - scrollY / 700, 0);
      
      const content = heroRef.current.querySelector('.hero-content');
      const canvas = heroRef.current.querySelector('.hero-canvas');
      const indicator = heroRef.current.querySelector('.hero-scroll-indicator');
      
      if (content) content.style.opacity = fadeRatio;
      if (canvas) canvas.style.opacity = fadeRatio;
      if (indicator) indicator.style.opacity = fadeRatio * fadeRatio; // fade faster
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Animate name lines appearing
    const nameLines = nameRef.current?.querySelectorAll('.hero-name-line');
    if (nameLines) {
      nameLines.forEach((line, i) => {
        setTimeout(() => {
          line.style.transform = 'translateY(0)';
          line.style.opacity = '1';
          line.style.transition = `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`;
        }, 800 + i * 200);
      });
    }

    // Animate title
    if (titleRef.current) {
      setTimeout(() => {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transform = 'translateY(0)';
        titleRef.current.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
      }, 1400);
    }
  }, []);

  return (
    <section className="hero grid-bg" id="home" ref={heroRef}>
      <HeroScene />

      <Starburst />

      <div className="hero-content">
        <h1 className="hero-name" ref={nameRef}>
          <span className="hero-name-line">{personalInfo.firstName}</span>
          <span className="hero-name-line">{personalInfo.lastName}</span>
        </h1>
        <p
          className="hero-title"
          ref={titleRef}
          style={{ transform: 'translateY(20px)' }}
        >
          {personalInfo.tagline}
        </p>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
