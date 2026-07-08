import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedTitle({ text, className = "", as: Component = "h2" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.char');

    gsap.set(chars, {
      opacity: 0,
      y: 40,
      scale: 1.2,
      filter: 'blur(10px)'
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      },
      once: true
    });

    return () => st.kill();
  }, []);

  // Simple split that handles `<br/>` elements if passed as array, 
  // but to keep it simple we just accept `text` as a string.
  return (
    <Component className={`animated-title ${className}`} ref={containerRef}>
      {text.split('').map((char, i) => {
        if (char === '\n') {
          return <br key={i} />;
        }
        return (
          <span
            key={i}
            className="char"
            style={{
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        );
      })}
    </Component>
  );
}
