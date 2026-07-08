import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Footer from './components/Footer';
import GlobalBackground from './components/GlobalBackground';
import CustomCursor from './components/CustomCursor';
import RippleEffect from './components/RippleEffect';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  // Detect touch devices
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    };
    checkTouch();
    const mql = window.matchMedia('(pointer: coarse)');
    mql.addEventListener('change', checkTouch);
    return () => mql.removeEventListener('change', checkTouch);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerFunc = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFunc);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerFunc);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [loading]);

  return (
    <>
      {/* Only show custom cursor on non-touch devices */}
      {!isTouch && <CustomCursor />}
      {!isTouch && <RippleEffect />}
      <Loader onComplete={() => setLoading(false)} />
      <GlobalBackground />

      <div
        className="main-content"
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: loading ? 'none' : 'auto',
        }}
      >
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Footer />
      </div>
    </>
  );
}
