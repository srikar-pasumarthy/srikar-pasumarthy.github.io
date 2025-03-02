import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Animated particle field component
function ParticleField({ count = 5000 }) {
  const points = useRef();
  
  // Generate random points in 3D space
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  // Animation loop
  useFrame((state) => {
    const { clock } = state;
    points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
    points.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <Points ref={points} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00E5FF"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Main 3D background component
export default function HeroBackground() {
  return (
    <div className="hero-background">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
      <style jsx>{`
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}