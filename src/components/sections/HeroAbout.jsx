import React, { useState, useEffect } from 'react';

export default function HeroAbout() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const imagePaths = [
    "/photos/pfp.jpg",
    "/photos/iceland.jpg",
    "/photos/tottenham.jpg"
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
            
            <div className="hero-subtitle">
              Building elegant software solutions
            </div>
            
            <div className="about-text">
              <p>
                I am currently a Software Engineer on the FI eTrading team at Truist Financial, 
                optimizing bond trading algorithms and developing analytics dashboards.
              </p>
              <p>
                When I'm not coding, you'll find me reading books, experimenting with new recipes, 
                travelling the world, or ruining my day watching Tottenham Hotspurs play
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
                  className="stacked-image"
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
      
      <style jsx>{`
        .hero-section {
          position: relative;
          background-color: var(--dark-bg);
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        
        .hero-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 10% 20%, rgba(0, 229, 255, 0.1), transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(179, 136, 255, 0.1), transparent 40%);
          pointer-events: none;
        }
        
        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3rem;
          min-height: 80vh;
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          margin-bottom: 1rem;
          line-height: 1.1;
        }
        
        .highlight {
          color: var(--primary-color);
        }
        
        .hero-subtitle {
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          margin-bottom: 2rem;
          color: var(--text-secondary);
          font-weight: 300;
        }
        
        .about-text {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 2.5rem;
          color: var(--text-secondary);
        }
        
        .about-text p {
          margin-bottom: 1rem;
        }
        
        .hero-cta {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        
        .cta-button {
          background: var(--primary-color);
          border: none;
          color: #111;
          font-weight: 500;
          padding: 0.8rem 2rem;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 229, 255, 0.3);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 25px rgba(0, 229, 255, 0.4);
        }
        
        .cta-link {
          color: var(--text-primary);
          text-decoration: none;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .cta-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
        }
        
        .cta-link:hover {
          color: var(--primary-color);
        }
        
        .cta-link:hover::after {
          width: 100%;
        }
        
        .hero-visual {
          position: relative;
          height: 100%;
          width: 100%;
        }
        
        .stacked-images {
          position: relative;
          height: 70vh;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .stacked-image {
          position: absolute;
          width: 70%;
          height: 60%;
          border: 5px solid #555;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
        }
        
        .stacked-image:nth-child(1) {
          top: 10%;
          left: 10%;
          transform: rotate(-5deg);
          z-index: 3;
          border-color: var(--primary-color);
        }
        
        .stacked-image:nth-child(2) {
          top: 25%;
          left: 20%;
          transform: rotate(3deg);
          z-index: 2;
          border-color: var(--secondary-color);
        }
        
        .stacked-image:nth-child(3) {
          top: 40%;
          left: 30%;
          transform: rotate(-2deg);
          z-index: 1;
        }
        
        .stacked-images:hover .stacked-image:nth-child(1) {
          transform: translateY(-10px) rotate(-7deg);
        }
        
        .stacked-images:hover .stacked-image:nth-child(2) {
          transform: translateY(-5px) rotate(5deg);
        }
        
        .stacked-images:hover .stacked-image:nth-child(3) {
          transform: translateY(-3px) rotate(-4deg);
        }
        
        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 2rem 0;
          }
          
          .stacked-images {
            height: 50vh;
            margin: 0 auto;
          }
          
          .hero-text {
            text-align: center;
          }
          
          .hero-cta {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}