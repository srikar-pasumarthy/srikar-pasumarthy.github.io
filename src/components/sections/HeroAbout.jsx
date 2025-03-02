import React from 'react';

export default function HeroAbout() {
  const imagePaths = [
    "/photos/pfp.jpg",
    "/photos/iceland.jpg",
    "/photos/tottenham.jpg"
  ];

  return (
    <section className="hero-section" id="hero">
      <div className="section-content">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Hi, I'm Srikar <span role="img" aria-label="wave">👋</span></h1>    
            <div className="about-text" style={{ marginTop: '2rem' }}>
              <p>
                I am currently a Software Engineer on the FI eTrading team at Truist Financial. [NEEDS WORK]
              </p>
              <p>
              When I'm not coding, you'll find me reading books, experimenting with new recipes, 
              travelling the world, or ruining my day watching Tottenham Hotspurs play [NEEDS WORK]
              </p>
            </div>
          </div>
          
          <div className="hero-animation">
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
    </section>
  );
}