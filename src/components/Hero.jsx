import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current || !nameRef.current) return;

    // Split text logic is handled in the render via mapping over characters
    const charInners = heroRef.current.querySelectorAll('.hero-char-inner');
    const charWrappers = heroRef.current.querySelectorAll('.hero-char-wrapper');
    const titleInners = heroRef.current.querySelectorAll('.hero-title-inner');
    const titleWrappers = heroRef.current.querySelectorAll('.hero-title-wrapper');

    // 1. Entrance animation (from left, character by character)
    gsap.set(charInners, { x: -300, opacity: 0, filter: 'blur(10px)' });
    gsap.set(titleInners, { x: -300, opacity: 0, filter: 'blur(10px)' });

    const tl = gsap.timeline();

    tl.to(charInners, {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      stagger: 0.05,
      duration: 1.2,
      ease: 'back.out(1.2)'
    }).to(titleInners, {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      stagger: 0.02,
      duration: 1.2,
      ease: 'back.out(1.2)'
    }, "-=0.8");

    // 2. Scroll animation (moves right, character by character on scroll)
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.to([charWrappers, titleWrappers], {
        x: 500, // Move to the right
        opacity: 0,
        filter: 'blur(20px)',
        stagger: 0.01,
        ease: 'power1.inOut'
      })
    });

    return () => {
      tl.kill();
      st.kill();
    };
  }, []);

  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <section className="hero" id="home" ref={heroRef} style={{ overflow: 'hidden' }}>
      <div className="hero-content">
        <h1 className="hero-name" ref={nameRef}>
          {fullName.split('').map((char, i) => (
            <span
              key={i}
              className="hero-char-wrapper"
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              <span className="hero-char-inner" style={{ display: 'inline-block' }}>
                {char === ' ' ? ' ' : char}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-title" ref={titleRef}>
          {personalInfo.tagline.split('').map((char, i) => (
            <span
              key={i}
              className="hero-title-wrapper"
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              <span className="hero-title-inner" style={{ display: 'inline-block' }}>
                {char === ' ' ? ' ' : char}
              </span>
            </span>
          ))}
        </p>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
