import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  
  useEffect(() => {
    // Detect touch device - disable custom cursor if true
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (followerRef.current) followerRef.current.style.display = 'none';
      return;
    }
    
    // QuickSetters for high performance
    const xToCursor = gsap.quickTo(cursorRef.current, 'x', { duration: 0.1, ease: 'power3' });
    const yToCursor = gsap.quickTo(cursorRef.current, 'y', { duration: 0.1, ease: 'power3' });
    
    const xToFollower = gsap.quickTo(followerRef.current, 'x', { duration: 0.3, ease: 'power3' });
    const yToFollower = gsap.quickTo(followerRef.current, 'y', { duration: 0.3, ease: 'power3' });

    let isHovering = false;
    let hoverTarget = null;
    let rafId = null;

    const onMouseMove = (e) => {
      // Offset by half of width/height
      xToCursor(e.clientX - 4);
      yToCursor(e.clientY - 4);
      
      if (!isHovering) {
        xToFollower(e.clientX - 16);
        yToFollower(e.clientY - 16);
      }
    };
    
    const followHoverTarget = () => {
        if(isHovering && hoverTarget) {
            const rect = hoverTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            xToFollower(centerX - (rect.width + 16) / 2);
            yToFollower(centerY - (rect.height + 16) / 2);
            rafId = requestAnimationFrame(followHoverTarget);
        }
    };

    const handleMouseEnter = (e) => {
      const target = e.target.closest('.interactive:not(.skill-column), a:not(.project-card):not(.certification-card), button, .tag, .footer-social-link');
      if (target) {
        isHovering = true;
        hoverTarget = target;
        
        const rect = target.getBoundingClientRect();
        const computedStyle = getComputedStyle(target);
        
        gsap.to(followerRef.current, {
          width: rect.width + 16,
          height: rect.height + 16,
          borderRadius: parseFloat(computedStyle.borderRadius) || 8,
          borderColor: 'rgba(144, 224, 239, 0.6)',
          backgroundColor: 'rgba(144, 224, 239, 0.05)',
          duration: 0.3,
          ease: 'power3.out'
        });
        
        gsap.to(cursorRef.current, {
          scale: 0.5,
          opacity: 0.5,
          duration: 0.2
        });
        
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(followHoverTarget);
      }
    };
    
    const handleMouseLeave = (e) => {
      const target = e.target.closest('.interactive:not(.skill-column), a:not(.project-card):not(.certification-card), button, .tag, .footer-social-link');
      if (target) {
        isHovering = false;
        hoverTarget = null;
        cancelAnimationFrame(rafId);
        
        gsap.to(followerRef.current, {
          width: 32,
          height: 32,
          borderRadius: '50%',
          borderColor: 'rgba(144, 224, 239, 0.3)',
          backgroundColor: 'transparent',
          duration: 0.3,
          ease: 'power3.out'
        });
        
        gsap.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2
        });
        
        if (e.clientX && e.clientY) {
            xToFollower(e.clientX - 16);
            yToFollower(e.clientY - 16);
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseEnter, { passive: true });
    document.addEventListener('mouseout', handleMouseLeave, { passive: true });
    
    const handleMouseLeaveWindow = () => {
        gsap.to([cursorRef.current, followerRef.current], { opacity: 0, duration: 0.3 });
    };
    const handleMouseEnterWindow = () => {
        gsap.to([cursorRef.current, followerRef.current], { opacity: 1, duration: 0.3 });
    };
    
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={followerRef} className="cursor-follower" />
      <div ref={cursorRef} className="cursor-dot" />
    </>
  );
}
