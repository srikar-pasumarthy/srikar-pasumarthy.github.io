import React, { useState, useRef, useEffect } from 'react';
import { workExperiences } from '../../data/workExperience';

const TimelineConnector = ({ isActive }) => {
  return (
    <div className="timeline-connector-container">
      <div className={`timeline-connector ${isActive ? 'active' : ''}`}></div>
    </div>
  );
};

const TimelinePoint = ({ isActive, onClick }) => {
  return (
    <div 
      className={`timeline-point ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="timeline-point-inner"></div>
    </div>
  );
};

export default function Work() {
  const [activeJob, setActiveJob] = useState(workExperiences[0].id);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const activeJobData = workExperiences.find(job => job.id === activeJob);

  return (
    <section id="work" className="section work-section" ref={sectionRef}>
      <div className="bg-gradient"></div>
      <div className="section-content">
        <div className={`mega-title ${isInView ? 'fade-in' : ''}`}>work</div>
        
        <div className="work-container">
          <div className="work-timeline">
            {workExperiences.map((job, index) => (
              <div key={job.id} className="timeline-item">
                <TimelinePoint 
                  isActive={job.id === activeJob} 
                  onClick={() => setActiveJob(job.id)}
                />
                
                <div 
                  className={`timeline-content ${job.id === activeJob ? 'active' : ''}`}
                  onClick={() => setActiveJob(job.id)}
                >
                  <h3 className="timeline-title">{job.company}</h3>
                  <p className="timeline-period">{job.period}</p>
                </div>
                
                {index < workExperiences.length - 1 && (
                  <TimelineConnector isActive={job.id === activeJob} />
                )}
              </div>
            ))}
          </div>
          
          <div className="work-details glass-card">
            <div className="work-details-inner">
              <div className="work-header">
                <h2 className="work-title">{activeJobData.title}</h2>
                <div className="work-company">
                  <span className="company-name">{activeJobData.company}</span>
                  <span className="work-period">{activeJobData.period}</span>
                </div>
                
                <div className="tech-tags">
                  {activeJobData.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="blue-divider"></div>
              
              <div className="work-content">
                <ul className="work-responsibilities">
                  {activeJobData.responsibilities.map((responsibility, index) => (
                    <li key={index} className="responsibility-item">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}