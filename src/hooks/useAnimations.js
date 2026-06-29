import { useEffect, useRef, useState } from 'react';

/**
 * Hook for scroll-triggered reveal animations with stagger support.
 * Returns a ref to attach to the container element.
 * Children with class 'reveal' will animate in sequence.
 */
export function useScrollReveal(options = {}) {
  const {
    threshold = 0.15,
    staggerDelay = 80,
    rootMargin = '0px 0px -50px 0px',
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find all reveal children
            const reveals = entry.target.querySelectorAll('.reveal');
            reveals.forEach((child, i) => {
              setTimeout(() => {
                child.classList.add('revealed');
              }, i * staggerDelay);
            });
            // Also animate the container itself if it has the class
            if (entry.target.classList.contains('reveal')) {
              entry.target.classList.add('revealed');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, staggerDelay, rootMargin]);

  return ref;
}

/**
 * Hook for parallax scrolling effect.
 * Returns a ref and the current parallax offset value.
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const diff = (centerY - windowCenter) * speed;
      setOffset(diff);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset];
}

/**
 * Hook that tracks mouse position relative to a container.
 * Returns a ref and normalized mouse position {x, y} from -1 to 1.
 */
export function useMousePosition() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
      });
    };

    const handleLeave = () => setPos({ x: 0, y: 0 });

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return [ref, pos];
}
