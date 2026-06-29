import { useEffect, useRef } from 'react';
import { experience } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';

export default function Experience() {
  const sectionRef = useRef(null);
  const timelineFillRef = useRef(null);

  useEffect(() => {
    // Animate timeline fill on scroll
    const handleScroll = () => {
      if (!sectionRef.current || !timelineFillRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate how far we've scrolled through the section
      const scrolled = (windowHeight - rect.top) / (sectionHeight + windowHeight);
      const clampedScroll = Math.min(Math.max(scrolled, 0), 1);

      timelineFillRef.current.style.height = `${clampedScroll * 100}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const revealRef = useScrollReveal({ threshold: 0.2 });

  // Generate floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${Math.random() * 15 + 10}s`,
    drift: `${(Math.random() - 0.5) * 100}px`,
    delay: `${Math.random() * 10}s`,
    size: `${Math.random() * 2 + 1}px`,
  }));

  return (
    <section className="section experience-section" id="experience" ref={sectionRef}>
      {/* Floating particles background */}
      <div className="particles-bg">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              '--duration': p.duration,
              '--drift': p.drift,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="section-inner" ref={revealRef} style={{ position: 'relative', zIndex: 1 }}>
        <span className="section-label reveal">Experience</span>
        <h2 className="section-title reveal">Where I've Worked</h2>

        <div className="experience-timeline">
          <div className="experience-timeline-fill" ref={timelineFillRef} />

          {experience.map((exp, index) => (
            <div
              key={exp.company}
              className={`experience-card ${index % 2 === 0 ? 'reveal-left reveal' : 'reveal-right reveal'}`}
            >
              <div className="experience-dot" />
              <span className="experience-period">{exp.period}</span>
              <h3 className="experience-role">{exp.role}</h3>
              <p className="experience-company">{exp.company}</p>
              <div className="experience-bullets">
                {exp.bullets.map((bullet, i) => (
                  <p key={i} className="experience-bullet">{bullet}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
