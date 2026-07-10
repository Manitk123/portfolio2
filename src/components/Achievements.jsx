import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements, certifications } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

// Extra detail for flip card backs
const achievementDetails = {
  'LeetCode Problems': 'Top percentile globally — consistent daily practice',
  'Projects Built': 'From SaaS platforms to security research tools',
  'Internships': 'UI/UX Design + Full-Stack Software Development',
};

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
              ease: 'back.out(1.7)',
              onUpdate: () => {
                setCount(Math.floor(obj.val));
              },
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

function FlipCard({ item }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="flip-card-inner">
        {/* Back = default visible (number + label) */}
        <div className="flip-card-back">
          <div className="flip-card-border-anim" />
          <div className="flip-card-back-content">
            <AnimatedCounter target={item.value} suffix={item.suffix} />
            <p className="achievement-label">{item.label}</p>
          </div>
        </div>

        {/* Front = revealed on hover/tap */}
        <div className="flip-card-front">
          <div className="flip-card-front-content">
            <p className="flip-card-detail">
              {achievementDetails[item.label] || item.label}
            </p>
            <span className="flip-card-cta">Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
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
  const certCardsRef = useRef([]);

  useEffect(() => {
    const cards = certCardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;

        gsap.fromTo(card,
          {
            x: isLeft ? -100 : 100,
            opacity: 0,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <section className="section achievements-section reveal" id="achievements" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal">Achievements</span>
        <AnimatedTitle text="By The Numbers" className="section-title" />

        <div className="achievements-grid">
          {achievements.map((item) => (
            <FlipCard key={item.label} item={item} />
          ))}
        </div>

        <div className="certifications-area reveal">
          <h3 className="certifications-heading">Certifications</h3>
          <div className="certifications-grid">
            {certifications.map((cert, i) => {
              const CardTag = cert.link ? 'a' : 'div';
              return (
                <CardTag
                  key={i}
                  href={cert.link || undefined}
                  target={cert.link ? '_blank' : undefined}
                  rel={cert.link ? 'noopener noreferrer' : undefined}
                  className="cert-glow-card"
                  ref={(el) => { certCardsRef.current[i] = el; }}
                >
                  <div className="cert-glow-card-inner">
                    <div className="cert-glow-icon">
                      <CheckIcon />
                    </div>
                    <div className="cert-glow-content">
                      <h4 className="cert-glow-title">{cert.title}</h4>
                      <span className="cert-glow-provider">{cert.provider}</span>
                    </div>
                    {cert.link && (
                      <div className="cert-glow-arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </CardTag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
