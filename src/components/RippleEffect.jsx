import { useEffect } from 'react';

export default function RippleEffect() {
  useEffect(() => {
    const handleClick = (e) => {
      // Don't create ripple on right clicks or touch events (to avoid double ripples if we add touch specifically)
      if (e.button !== 0) return;

      const ripple = document.createElement('div');
      ripple.className = 'click-ripple';
      
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
