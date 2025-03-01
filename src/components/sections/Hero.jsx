import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Hero3DAnimation = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth / 2, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    if (mountRef.current && !mountRef.current.hasChildNodes()) {
      mountRef.current.appendChild(renderer.domElement);
    }
    
    const geometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
    const material = new THREE.MeshNormalMaterial({
      wireframe: true
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    camera.position.z = 12;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width / 2, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
    };
  }, []);
  
  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      <div className="section-content">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hi, I'm Srikar <span role="img" aria-label="wave">👋</span></h1>
            <div className="mega-title">Software Engineer</div>
            <p className="hero-subtitle">Building innovative solutions through code</p>
          </div>
          <div className="hero-animation">
            <Hero3DAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}