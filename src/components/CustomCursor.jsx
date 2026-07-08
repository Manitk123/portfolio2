import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    // Detect touch device - disable custom cursor if true
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    }
    
    // QuickSetters for high performance
    const xToCursor = gsap.quickTo(cursorRef.current, 'x', { duration: 0.1, ease: 'power3' });
    const yToCursor = gsap.quickTo(cursorRef.current, 'y', { duration: 0.1, ease: 'power3' });
    
    const onMouseMove = (e) => {
      // Offset by half of width/height
      xToCursor(e.clientX - 4);
      yToCursor(e.clientY - 4);
    };
    
    const handleMouseEnter = (e) => {
      const target = e.target.closest('.interactive, a, button, .tag');
      if (target) {
        gsap.to(cursorRef.current, {
          scale: 2,
          opacity: 0.5,
          duration: 0.2
        });
      }
    };
    
    const handleMouseLeave = (e) => {
      const target = e.target.closest('.interactive, a, button, .tag');
      if (target) {
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });
    
    const handleMouseLeaveWindow = () => {
        gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
    };
    const handleMouseEnterWindow = () => {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
    };
    
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor-dot" />
  );
}
