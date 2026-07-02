import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for scroll-triggered reveal animations with stagger support.
 * Returns a ref to attach to the container element.
 * Children with class 'reveal' will animate in sequence using GSAP.
 */
export function useScrollReveal(options = {}) {
  const {
    staggerDelay = 0.15
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveals = el.querySelectorAll('.reveal');
    const targets = [];
    if (el.classList.contains('reveal')) {
      targets.push(el);
    }
    if (reveals.length > 0) {
      targets.push(...Array.from(reveals));
    }
    if (targets.length === 0) {
      targets.push(el);
    }
    
    // Set initial states based on class
    targets.forEach(target => {
      let xOffset = 0;
      let yOffset = 40;
      let scale = 0.98;
      
      if (target.classList.contains('reveal-left')) {
        xOffset = -60;
        yOffset = 0;
        scale = 1;
      } else if (target.classList.contains('reveal-right')) {
        xOffset = 60;
        yOffset = 0;
        scale = 1;
      }
      
      gsap.set(target, { x: xOffset, y: yOffset, opacity: 0, scale });
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        console.log("ScrollTrigger onEnter Fired for:", el.id || el.className);
        gsap.to(targets, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: staggerDelay,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: () => console.log("Animation complete for:", el.id || el.className)
        });
      },
      once: true
    });

    return () => {
      st.kill();
    };
  }, [staggerDelay]);

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
