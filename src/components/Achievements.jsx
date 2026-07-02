import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
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
            
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2,
              ease: "back.out(1.7)",
              onUpdate: () => {
                setCount(Math.floor(obj.val));
              }
            });
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

        <div className="certifications-grid reveal">
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            color: 'var(--white)',
            marginBottom: 'var(--space-md)',
            gridColumn: '1 / -1'
          }}>
            Certifications
          </h3>
          {certifications.map((cert, i) => {
            const CardTag = cert.link ? 'a' : 'div';
            return (
              <CardTag
                key={i}
                href={cert.link || undefined}
                target={cert.link ? "_blank" : undefined}
                rel={cert.link ? "noopener noreferrer" : undefined}
                className="certification-card"
              >
                <div className="cert-card-icon">
                  <CheckIcon />
                </div>
                <div className="cert-card-content">
                  <h4 className="cert-title">{cert.title}</h4>
                  <span className="cert-provider">{cert.provider}</span>
                </div>
                {cert.link && (
                  <div className="cert-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </div>
                )}
              </CardTag>
            );
          })}
        </div>
      </div>
    </section>
  );
}
