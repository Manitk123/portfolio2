import React from 'react';
import { designs } from '../data';
import { useScrollReveal } from '../hooks/useAnimations';
import AnimatedTitle from './AnimatedTitle';
import BounceCards from './BounceCards';

// Helper to chunk the array into rows
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const transformStyles = [
  "rotate(5deg) translate(-150px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(70px)",
  "rotate(-5deg) translate(150px)"
];

export default function DesignWork() {
  const sectionRef = useScrollReveal();
  
  // Create rows of 5 items to match BounceCards transformStyles
  const designRows = chunkArray(designs, 5);

  return (
    <section className="section design-section reveal" id="design" ref={sectionRef}>
      <div className="section-inner">
        <span className="section-label reveal">UI/UX & Graphics</span>
        <AnimatedTitle text="My Design Work" className="section-title" />
        <p className="section-subtitle reveal">
          A collection of {designs.length} UI screens and Figma posts.
        </p>

        <div className="design-bounce-wrapper" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4rem 2rem', marginTop: '4rem' }}>
          {designRows.map((row, rowIndex) => {
            const images = row.map(d => d.image || "https://placehold.co/600x400/1a1a1a/444444?text=Design");
            return (
              <BounceCards
                key={`bounce-row-${rowIndex}`}
                className="custom-bounceCards"
                images={images}
                containerWidth={500}
                containerHeight={250}
                animationDelay={0.5 + rowIndex * 0.2}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.5)"
                transformStyles={transformStyles}
                enableHover={true}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
