import { personalInfo, summary, education } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';
import TypewriterText from './TypewriterText';

export default function About() {
  const sectionRef = useScrollReveal();

  const techLogos = ['React', 'Next.js', 'Python', 'Node.js', 'Docker', 'Firebase', 'PostgreSQL'];

  return (
    <section id="about" className="section about reveal" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal" style={revealStyle(0)}>About Me</span>
        <h2 className="section-title reveal" style={revealStyle(1)}>Know Me More</h2>

        <div className="about-grid">
          <div className="about-image-container reveal" style={revealStyle(2)}>
            <img src="/profile.jpg" alt="Manit Kumar" className="about-image" />
          </div>

          <div className="about-text-content">
            <p className="about-description" style={revealStyle(3)}>
              <TypewriterText text={summary} delay={300} speed={15} />
            </p>

            <div className="about-details reveal" style={revealStyle(4)}>
              <div className="about-detail-item">
                <span className="about-detail-label">Education</span>
                <span className="about-detail-value">{education.degree}</span>
              </div>
              <div className="about-detail-item">
                <span className="about-detail-label">Institution</span>
                <span className="about-detail-value">{education.institution}</span>
              </div>
              <div className="about-detail-item">
                <span className="about-detail-label">Specialization</span>
                <span className="about-detail-value">{education.specialization}</span>
              </div>
              <div className="about-detail-item">
                <span className="about-detail-label">Expected</span>
                <span className="about-detail-value">{education.expected}</span>
              </div>
            </div>

            <div className="about-tech-strip reveal" style={revealStyle(5)}>
              {techLogos.map((tech) => (
                <span key={tech} className="about-tech-icon">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-in .reveal,
        .reveal.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}

function revealStyle(index) {
  return { transitionDelay: `${index * 0.1}s` };
}
