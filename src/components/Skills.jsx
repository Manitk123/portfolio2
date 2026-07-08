import { useState, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { skills } from '../data';
import AnimatedTitle from './AnimatedTitle';

// SVG icons for each skill category
const skillIcons = {
  code: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  layers: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  brain: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.5 2.1-1.2 2.8A4 4 0 0 1 18 12a4 4 0 0 1-2.3 3.6A4 4 0 0 1 14 22h-4a4 4 0 0 1-1.7-7.6A4 4 0 0 1 6 12a4 4 0 0 1 3.2-3.2A4 4 0 0 1 8 6a4 4 0 0 1 4-4z" />
      <path d="M12 2v20" />
    </svg>
  ),
  database: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  terminal: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  shield: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const ANGLE_STEP = 360 / 6; // 60° per category

export default function Skills() {
  const sectionRef = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const activeSkill = skills[activeIndex];
  const baseRotation = -activeIndex * ANGLE_STEP;

  return (
    <section className="section skills-section reveal" id="skills" ref={sectionRef}>
      <div className="section-inner asymmetric-grid">
        <span className="section-label reveal">What I Offer</span>
        <AnimatedTitle text="Technical Arsenal" className="section-title" />

        <div className="rotary-wrapper reveal">
          {/* The dial */}
          <div className="rotary-dial">
            {/* Outer metallic ring */}
            <div className="rotary-outer-ring" style={{ transform: `rotate(${baseRotation}deg)`, transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
              {/* Inner metallic ring */}
              <div className="rotary-inner-ring" style={{ transform: `rotate(${-baseRotation}deg)`, transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
                {/* Center display - shows selected items */}
                <div className="rotary-center">
                  <div className="rotary-center-icon">
                    {skillIcons[activeSkill.icon]}
                  </div>
                  <h3 className="rotary-center-title">{activeSkill.category}</h3>
                  <div className="rotary-center-items">
                    {activeSkill.items.map((item) => (
                      <span key={item} className="rotary-center-item">{item}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Separator lines */}
              <hr className="rotary-line rotary-line-1" />
              <hr className="rotary-line rotary-line-2" />
              <hr className="rotary-line rotary-line-3" />

              {/* Labels around the perimeter */}
              {skills.map((skill, i) => {
                const angle = -90 + i * ANGLE_STEP;
                return (
                  <button
                    key={skill.category}
                    className={`rotary-label ${activeIndex === i ? 'active' : ''}`}
                    style={{ '--angle': `${angle}deg` }}
                    onClick={() => handleSelect(i)}
                    aria-label={`Select ${skill.category}`}
                  >
                    <span className="rotary-label-text" style={{ '--counter-angle': `${-angle - baseRotation}deg` }}>
                      {skillIcons[skill.icon]}
                    </span>
                  </button>
                );
              })}

              {/* Light indicator */}
              <div className="rotary-light" style={{ transform: `rotate(-90deg)` }}>
                <span />
              </div>

              {/* Dot indicator */}
              <div className="rotary-dot" style={{ transform: `rotate(-90deg)` }}>
                <span />
              </div>
            </div>
          </div>

          {/* Category name buttons below */}
          </div>

      </div>
    </section>
  );
}
