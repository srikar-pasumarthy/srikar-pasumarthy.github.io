import React from 'react';

const imagePlaceholders = [
  "",
  "",
  ""
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-content">
        <div className="mega-title">about</div>
        
        <div className="about-content">
          <div className="stacked-images">
            {imagePlaceholders.map((src, index) => (
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
          
          <div className="about-text">
            <p>
              // TODO: ABOUT ME TEXT
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}