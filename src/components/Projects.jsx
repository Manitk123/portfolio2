import { useRef, useCallback } from 'react';
import { projects } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';

// Folder icon SVG
function FolderIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// External link icon SVG
function ExternalLinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  // 3D tilt effect on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  }, []);

  return (
    <a
      href={project.link}
      className={`project-card ${project.featured ? 'featured' : ''} reveal`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="project-header">
        <div className="project-icon">
          <FolderIcon />
        </div>
        <div className="project-link-icon">
          <ExternalLinkIcon />
        </div>
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-description">{project.description}</p>

      <div className="project-tags">
        {project.tech.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section projects-section reveal" id="projects" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal">Projects & Research</span>
        <h2 className="section-title reveal">Things I've Built</h2>

        <p className="section-subtitle reveal">
          Each project is a journey of solving real-world problems with code. Click to explore — links coming soon.
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
