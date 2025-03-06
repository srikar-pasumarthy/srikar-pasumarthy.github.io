import React, { useState, useEffect } from 'react';

export default function HeroAbout() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const imagePaths = [
    "images/pfp-min.jpg",
    "images/iceland-min.jpg",
    "images/tottenham-min.jpg"
  ];

  return (
    <section className="hero-section" id="hero">
      {/* Gradient background overlay */}
      <div className="hero-gradient"></div>
      
      <div className="section-content">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Srikar</span> <span role="img" aria-label="wave">👋</span>
            </h1>
            
            <div className="about-text">
              <p>
                I am currently a Software Engineer on the FI eTrading team at Truist Financial, 
                optimizing bond trading algorithms and developing analytics dashboards
              </p>
              <p>
                When I'm not coding, you'll find me reading books, experimenting with new recipes, 
                travelling the world, or ruining my day watching Tottenham Hotspurs play :)
              </p>
            </div>
            
            <div className="hero-cta">
              <a href="#work" className="cta-button">Explore My Work</a>
              <a href="#projects" className="cta-link">See Projects</a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="stacked-images">
              {imagePaths.map((src, index) => (
                <div 
                  key={index} 
                  className={`stacked-image stacked-image-${index+1}`}
                  style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}