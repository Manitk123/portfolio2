import { personalInfo, summary, education } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';
import TypewriterText from './TypewriterText';

export default function About() {
  const sectionRef = useScrollReveal();

  const techLogos = ['React', 'Next.js', 'Python', 'Node.js', 'Docker', 'Firebase', 'PostgreSQL'];

  return (
    <section id="about" className="section about reveal" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal">About Me</span>
        <h2 className="section-title reveal">Know Me More</h2>

        <div className="about-grid">
          <div className="about-image-container reveal">
            <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Manit Kumar" className="about-image" />
          </div>

          <div className="about-text-content">
            <p className="about-description">
              <TypewriterText text={summary} delay={300} speed={15} />
            </p>

            <div className="about-details reveal">
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

            <div className="about-tech-strip reveal">
              {techLogos.map((tech) => (
                <span key={tech} className="about-tech-icon">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
