import { useState, useRef, useCallback } from 'react';
import { projects } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';
import AnimatedTitle from './AnimatedTitle';

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
  const quantity = projects.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const startX = useRef(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % quantity);
  }, [quantity]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + quantity) % quantity);
  }, [quantity]);

  const goTo = (index) => {
    setCurrentIndex(index);
  };

  // --- Drag to Spin Logic ---
  const handleDragStart = (clientX) => {
    setIsDragging(true);
    startX.current = clientX;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX.current;
    // Scale pixel movement to degrees (e.g., 200px drag = 40 degrees rotation)
    setDragOffset(diff * 0.2); 
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Snap threshold
    if (dragOffset > 15) {
      handlePrev();
    } else if (dragOffset < -15) {
      handleNext();
    }
    setDragOffset(0);
  };

  // Mouse Handlers
  const onMouseDown = (e) => handleDragStart(e.clientX);
  const onMouseMove = (e) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => handleDragEnd();

  // Touch Handlers
  const onTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  // Calculate the rotation
  const baseRotateY = -(360 / quantity) * currentIndex;
  const currentRotateY = baseRotateY + dragOffset;

  return (
    <section className="section projects-section reveal" id="projects" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal">Projects & Research</span>
        <AnimatedTitle text="Things I've Built" className="section-title" />
        <p className="section-subtitle reveal">
          Each project is a journey of solving real-world problems with code. Click and drag to spin.
        </p>

        <div 
          className="carousel-stage"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Left Arrow */}
          <button 
            className="carousel-arrow carousel-arrow-left" 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }} 
            aria-label="Previous"
          >
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div
            className="carousel-inner"
            style={{ 
              '--quantity': quantity,
              transform: `perspective(1000px) rotateX(-8deg) rotateY(${currentRotateY}deg)`,
              // Remove transition while dragging so it follows mouse instantly
              transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            {projects.map((project, i) => {
              const isActive = i === currentIndex;
              return (
                <a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`carousel-card ${isActive ? 'active' : ''}`}
                  style={{ '--index': i }}
                  // Prevent link drag from interfering with our drag-to-spin
                  onDragStart={(e) => e.preventDefault()} 
                  onClick={(e) => {
                    // If they just dragged, prevent the link click
                    if (Math.abs(dragOffset) > 5) e.preventDefault();
                  }}
                >
                  <div className="carousel-card-graphic">
                    <div className="graphic-layer grid-layer" />
                    <div className="graphic-layer orb-layer" />
                  </div>
                  <div className="carousel-card-overlay" />
                  <div className="carousel-card-content">
                    <div className="carousel-card-top">
                      <span className="carousel-card-subtitle">{project.subtitle}</span>
                      <ExternalLinkIcon />
                    </div>
                    <h3 className="carousel-card-title">{project.title}</h3>
                    <p className="carousel-card-desc">{project.description}</p>
                    <div className="carousel-card-tags">
                      {project.tech.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button 
            className="carousel-arrow carousel-arrow-right" 
            onClick={(e) => { e.stopPropagation(); handleNext(); }} 
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Dots */}
          <div className="carousel-dots" onClick={(e) => e.stopPropagation()}>
            {projects.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
