import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const isLeft = i % 2 === 0;

        gsap.fromTo(card,
          {
            x: isLeft ? -120 : 120,
            y: 60,
            opacity: 0,
            scale: 0.85,
            rotateZ: isLeft ? -3 : 3,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Animate the trail line
        const trail = card.querySelector('.exp-trail');
        if (trail) {
          gsap.fromTo(trail,
            { scaleY: 0, transformOrigin: 'top center' },
            {
              scaleY: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section experience-section" id="experience" ref={sectionRef}>
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sticky-sidebar reveal">
          <span className="section-label">Experience</span>
          <AnimatedTitle text="Where I've Worked" className="section-title text-left" />
          <p className="sticky-desc">A timeline of my professional journey, highlighting key roles, contributions, and the impact I've made along the way.</p>
        </div>
        <div className="sticky-content">

        <div className="exp-zigzag">
          {experience.map((exp, index) => (
            <div
              key={exp.company}
              className={`exp-card-wrapper ${index % 2 === 0 ? 'exp-left' : 'exp-right'}`}
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              {/* Connecting trail */}
              {index > 0 && <div className="exp-trail" />}

              <div className="exp-card">
                {/* Engine glow */}
                <div className="exp-glow" />

                {/* Number badge */}
                <div className="exp-badge">{String(index + 1).padStart(2, '0')}</div>

                <span className="exp-period">{exp.period}</span>
                <h3 className="exp-role">{exp.role}</h3>
                <p className="exp-company">{exp.company}</p>
                <div className="exp-bullets">
                  {exp.bullets.map((bullet, i) => (
                    <p key={i} className="exp-bullet">{bullet}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
