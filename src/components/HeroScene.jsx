import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedTorusKnot() {
  const meshRef = useRef();

  // Custom shader material for iridescent green glass look
  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#6D9B7B'),
      metalness: 0.3,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 1.5,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMapIntensity: 2,
      emissive: new THREE.Color('#2D5B5A'),
      emissiveIntensity: 0.15,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} material={material} scale={1.8}>
        <torusKnotGeometry args={[1, 0.35, 200, 32, 3, 5]} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#B2C48A"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#B2C48A" />
        <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#6D9B7B" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#B2C48A" />

        <AnimatedTorusKnot />
        <ParticleField />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
