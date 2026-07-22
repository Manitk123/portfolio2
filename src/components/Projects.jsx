import { projects } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';
import AnimatedTitle from './AnimatedTitle';
import Folder from './Folder';
import './Projects.css'; // Optional: if we need specific styles

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section projects-section reveal" id="projects" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal">Projects & Research</span>
        <AnimatedTitle text="Things I've Built" className="section-title" />
        <p className="section-subtitle reveal">
          Each project is a journey of solving real-world problems with code. Click the folders to open.
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => {
            // Pick a color for each folder based on the portfolio's color scheme
            const colors = ["#7eb1b4", "#a4c6c4", "#b4bda8", "#d1c69f", "#e8d8b0"];
            const color = colors[index % colors.length];

            const paper1 = (
              <div className="folder-paper-content">
                <span className="folder-paper-subtitle">{project.subtitle}</span>
                <h4 className="folder-paper-title">{project.title}</h4>
                <p className="folder-paper-desc">{project.description}</p>
              </div>
            );

            const paper2 = (
              <div className="folder-paper-content folder-paper-tech">
                <h4>Tech Stack</h4>
                <div className="folder-tags">
                  {project.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            );

            const paper3 = (
              <div className="folder-paper-content folder-paper-link">
                <h4>Links</h4>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="folder-link-btn">
                  View Project <ExternalLinkIcon />
                </a>
              </div>
            );

            return (
              <div key={project.title} className="project-folder-wrapper">
                <Folder 
                  size={1.1} 
                  color={color} 
                  items={[paper1, paper2, paper3]} 
                />
                <h3 className="project-folder-label">{project.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
