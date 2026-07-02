import { useScrollReveal } from '../hooks/useAnimations';
import { skills } from '../data';

// SVG icons for each skill category
const skillIcons = {
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  layers: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  brain: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.5 2.1-1.2 2.8A4 4 0 0 1 18 12a4 4 0 0 1-2.3 3.6A4 4 0 0 1 14 22h-4a4 4 0 0 1-1.7-7.6A4 4 0 0 1 6 12a4 4 0 0 1 3.2-3.2A4 4 0 0 1 8 6a4 4 0 0 1 4-4z" />
      <path d="M12 2v20" />
    </svg>
  ),
  database: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  terminal: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  shield: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

function SkillCard({ skill }) {
  return (
    <div className="accordion-card">
      <div className="accordion-card-inner">
        <div className="accordion-header">
          <div className="accordion-icon">
            {skillIcons[skill.icon]}
          </div>
          <h3 className="accordion-title">{skill.category}</h3>
        </div>

        <div className="accordion-content">
          <div className="accordion-items">
            {skill.items.map((item) => (
              <span key={item} className="accordion-item">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import FakeTerminal from './FakeTerminal';

export default function Skills() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section skills-section reveal" id="skills" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal">What I Offer</span>
        <h2 className="section-title reveal">Technical Arsenal</h2>

        <div className="accordion-container reveal">
          {skills.map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </div>
        
        <FakeTerminal />
      </div>
    </section>
  );
}
