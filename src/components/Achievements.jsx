import { useEffect, useRef, useState } from 'react';
import { achievements, certifications } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease out quart
              const eased = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(eased * target);

              setCount(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={counterRef} className="achievement-value">
      {count}{suffix}
    </span>
  );
}

// Badge/checkmark icon
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="certification-icon">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function Achievements() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section achievements-section reveal" id="achievements" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal">Achievements</span>
        <h2 className="section-title reveal">By The Numbers</h2>

        <div className="achievements-grid">
          {achievements.map((item) => (
            <div
              key={item.label}
              className="achievement-card reveal"
            >
              <AnimatedCounter target={item.value} suffix={item.suffix} />
              <p className="achievement-label">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="certifications-list reveal">
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--white)',
            marginBottom: 'var(--space-sm)',
          }}>
            Certifications
          </h3>
          {certifications.map((cert) => (
            <div
              key={cert}
              className="certification-item reveal"
            >
              <CheckIcon />
              <span>{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
