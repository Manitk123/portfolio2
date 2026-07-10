import React from 'react';
import AnimatedBackground from './AnimatedBackground';

export default function GlobalBackground() {
  return (
    <div className="global-bg-wrapper">
      <div className="global-border-anim" />
      
      <div className="global-border-overlay">
        <AnimatedBackground />
        
        {/* Animated gradient mesh background */}
        <div className="hero-mesh-bg global-mesh">
          <div className="hero-mesh-orb hero-mesh-orb-1" />
          <div className="hero-mesh-orb hero-mesh-orb-2" />
          <div className="hero-mesh-orb hero-mesh-orb-3" />
          <div className="hero-mesh-orb hero-mesh-orb-4" />
        </div>

        {/* Floating CSS particles */}
        <div className="hero-particles global-particles">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--size': `${Math.random() * 3 + 1}px`,
                '--delay': `${Math.random() * 8}s`,
                '--duration': `${Math.random() * 10 + 8}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
