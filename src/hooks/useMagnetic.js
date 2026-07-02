import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function useMagnetic(strength = 0.5, radius = 50) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const xTo = gsap.quickTo(el, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(el, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Pull element if within radius
      if (distance < radius) {
        xTo(distanceX * strength);
        yTo(distanceY * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, radius]);

  return ref;
}
