import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BounceCards.css';

gsap.registerPlugin(ScrollTrigger);

export default function BounceCards({
  className = '',
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    { rotate: 10, x: -170, y: -30 },
    { rotate: 5, x: -85, y: -7 },
    { rotate: -3, x: 0, y: 0 },
    { rotate: -10, x: 85, y: -15 },
    { rotate: 2, x: 170, y: 6 }
  ],
  enableHover = true
}) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationStagger, easeType, animationDelay]);

  // Pre-calculate pushed transforms to save JS execution time during rapid hovers
  const hoverTransforms = useMemo(() => {
    return images.map((_, hoveredIdx) => {
      return images.map((_, i) => {
        if (i === hoveredIdx) {
          // The hovered card loses rotation and stands out
          return { rotate: 0, x: transformStyles[i]?.x || 0, y: transformStyles[i]?.y || 0, scale: 1.15, zIndex: 10 };
        }
        // Others get pushed away horizontally
        const offsetX = i < hoveredIdx ? -160 : 160;
        return {
          rotate: transformStyles[i]?.rotate || 0,
          x: (transformStyles[i]?.x || 0) + offsetX,
          y: transformStyles[i]?.y || 0,
          scale: 0.95,
          zIndex: 1
        };
      });
    });
  }, [images, transformStyles]);

  const pushSiblings = hoveredIdx => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    const targetTransforms = hoverTransforms[hoveredIdx];

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      
      const distance = Math.abs(hoveredIdx - i);
      const delay = distance * 0.05;

      gsap.to(target, {
        x: targetTransforms[i].x,
        y: targetTransforms[i].y,
        rotation: targetTransforms[i].rotate,
        scale: targetTransforms[i].scale,
        zIndex: targetTransforms[i].zIndex,
        duration: 0.4,
        ease: 'back.out(1.4)',
        delay: i === hoveredIdx ? 0 : delay,
        overwrite: 'auto'
      });
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);

    images.forEach((_, i) => {
      const target = q(`.card-${i}`);
      gsap.killTweensOf(target);
      gsap.to(target, {
        x: transformStyles[i]?.x || 0,
        y: transformStyles[i]?.y || 0,
        rotation: transformStyles[i]?.rotate || 0,
        scale: 1,
        zIndex: 2,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto'
      });
    });
  };

  return (
    <div
      className={`bounceCardsContainer ${className}`}
      ref={containerRef}
      style={{
        position: 'relative',
        width: containerWidth,
        height: containerHeight
      }}
    >
      {images.map((src, idx) => {
        const initialStyle = transformStyles[idx] || { x: 0, y: 0, rotate: 0 };
        return (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            key={idx}
            className={`card card-${idx}`}
            style={{
              display: 'block',
              // Use GSAP-compatible initial styles
              transform: `translate(${initialStyle.x}px, ${initialStyle.y}px) rotate(${initialStyle.rotate}deg)`,
              zIndex: 2
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            <img className="image" src={src} alt={`card-${idx}`} loading="lazy" decoding="async" />
          </a>
        );
      })}
    </div>
  );
}
