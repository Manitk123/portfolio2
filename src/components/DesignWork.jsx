import React from 'react';
import { designs } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';
import AnimatedTitle from './AnimatedTitle';

// Helper to chunk the array into rows
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default function DesignWork() {
  const sectionRef = useScrollReveal();
  
  // Create rows of 7 items to ensure the hover dock effect doesn't break across lines
  const designRows = chunkArray(designs, 7);

  return (
    <section className="section design-section reveal" id="design" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal">UI/UX & Graphics</span>
        <AnimatedTitle text="My Design Work" className="section-title" />
        <p className="section-subtitle reveal">
          A collection of {designs.length} UI screens,and Figma posts.
        </p>

        <div className="design-dock-wrapper">
          {designRows.map((row, rowIndex) => (
            <div className="container-items" key={`row-${rowIndex}`}>
              {row.map((design, i) => (
                <a 
                  key={`item-${rowIndex}-${i}`} 
                  href={design.image}
                  className="item-color reveal" 
                  style={{ transitionDelay: `${(i % 10) * 0.05}s` }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img 
                    src={design.image} 
                    alt={design.title} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400/1a1a1a/444444?text=Design";
                    }}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
