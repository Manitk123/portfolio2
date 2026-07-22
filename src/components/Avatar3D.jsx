import React, { useEffect, useRef, Suspense, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const funAnimations = ['Dance', 'Jump', 'Running', 'Walking', 'WalkJump', 'Wave', 'Yes', 'Idle', 'No', 'Roundabout'];

function ScrollAnimatedModel({ url }) {
  const outerGroup = useRef();
  const circleCenterGroup = useRef();
  const innerGroup = useRef();
  const currentActionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, outerGroup);

  useEffect(() => {
    // Apply theme color material to the model to blend with the site
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#7eb1b4', // Sage green from index.css
          roughness: 0.4,
          metalness: 0.6,
        });
      }
    });
  }, [scene]);

  useEffect(() => {
    if (!actions) return;

    // Initialize first animation
    if (!currentActionRef.current) {
      currentActionRef.current = actions['Walking'] || Object.values(actions)[0];
      currentActionRef.current?.reset().fadeIn(0.5).play();
    }

    let interval;

    if (isHovered) {
      // Wave when hovered
      const waveAction = actions['Wave'];
      if (waveAction && currentActionRef.current !== waveAction) {
        waveAction.reset().fadeIn(0.2).play();
        currentActionRef.current?.fadeOut(0.2);
        currentActionRef.current = waveAction;
      }
    } else {
      // Rapidly switch animations to keep it continuously doing something
      interval = setInterval(() => {
        const nextAnimName = funAnimations[Math.floor(Math.random() * funAnimations.length)];
        
        if (nextAnimName === 'Roundabout') {
          const runAction = actions['Running'];
          if (runAction && currentActionRef.current !== runAction) {
            runAction.reset().fadeIn(0.2).play();
            currentActionRef.current?.fadeOut(0.2);
            currentActionRef.current = runAction;
          }

          // Animate a circular run
          if (innerGroup.current && circleCenterGroup.current) {
            // Move outward and turn to face the circle tangent
            gsap.to(innerGroup.current.position, { z: 1.2, duration: 0.3, ease: "power1.inOut" });
            gsap.to(innerGroup.current.rotation, { y: Math.PI / 2, duration: 0.3, ease: "power1.inOut" });
            
            // Spin the center to create the roundabout
            gsap.to(circleCenterGroup.current.rotation, { 
              y: circleCenterGroup.current.rotation.y + Math.PI * 2, 
              duration: 1.8, 
              ease: "none",
              delay: 0.1
            });

            // Move back to the center when done
            setTimeout(() => {
              if (innerGroup.current) {
                gsap.to(innerGroup.current.position, { z: 0, duration: 0.3, ease: "power1.inOut" });
                gsap.to(innerGroup.current.rotation, { y: 0, duration: 0.3, ease: "power1.inOut" });
              }
            }, 2000); 
          }
        } else {
          const nextAction = actions[nextAnimName];
          if (nextAction && currentActionRef.current !== nextAction) {
            nextAction.reset().fadeIn(0.5).play();
            currentActionRef.current?.fadeOut(0.5);
            currentActionRef.current = nextAction;
          }
        }
      }, 2500); // Fast interval so it's always doing something new!
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [actions, isHovered]);

  useEffect(() => {
    if (!outerGroup.current) return;
    
    // Only animate floating up and down based on scroll, removed rotation
    const ctx = gsap.context(() => {
      gsap.fromTo(outerGroup.current.position, 
        { y: -1.5 },
        {
          y: -0.5,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={outerGroup} position={[0, -1.5, 0]} rotation={[0, 0, 0]} scale={0.4}>
      <group ref={circleCenterGroup}>
        <group 
          ref={innerGroup}
          onPointerEnter={(e) => { e.stopPropagation(); setIsHovered(true); }}
          onPointerLeave={() => setIsHovered(false)}
        >
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

// Preload the model
useGLTF.preload('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/RobotExpressive/RobotExpressive.glb');

export default function Avatar3D() {
  const modelUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/RobotExpressive/RobotExpressive.glb';
  
  return (
    <div
      className="avatar-container"
      style={{
        // Removed pointerEvents: 'none' to allow hover interaction
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-5, 5, 5]} intensity={1.2} castShadow />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <ScrollAnimatedModel url={modelUrl} />
        </Suspense>
      </Canvas>
    </div>
  );
}
