import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

function GalaxyScene() {
  const innerRef = useRef();
  const outerRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (innerRef.current) {
      innerRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      innerRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
    
    if (outerRef.current) {
      // Smooth interpolation for mouse movement (parallax effect)
      outerRef.current.rotation.x += (mouse.current.y * 0.15 - outerRef.current.rotation.x) * 0.05;
      outerRef.current.rotation.y += (mouse.current.x * 0.15 - outerRef.current.rotation.y) * 0.05;
      
      const scrollY = window.scrollY;
      outerRef.current.position.y = scrollY * 0.005;
    }
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={80} scale={30} size={8} speed={0.4} opacity={0.3} color="#b2c48a" />
        <Sparkles count={50} scale={50} size={15} speed={0.2} opacity={0.15} color="#2d5b5a" />
      </group>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: 'var(--charcoal-deep)', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <GalaxyScene />
      </Canvas>
    </div>
  );
}
