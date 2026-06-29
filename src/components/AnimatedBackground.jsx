import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';

function GalaxyScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.01;
      
      // Subtle parallax based on scroll
      const scrollY = window.scrollY;
      groupRef.current.position.y = scrollY * 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Stars background, not congested (1500 count) */}
      <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
      
      {/* Glowing animated nebula particles */}
      <Sparkles count={80} scale={30} size={8} speed={0.4} opacity={0.3} color="#b2c48a" />
      <Sparkles count={50} scale={50} size={15} speed={0.2} opacity={0.15} color="#2d5b5a" />
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
