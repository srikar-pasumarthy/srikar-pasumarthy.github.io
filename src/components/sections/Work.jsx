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
          {/* Left side: Timeline */}
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
          
          {/* Right side: Job details */}
          <div className="work-details glass-card">
            <div className="work-details-inner">
              <div className="work-header">
                <h2 className="work-title">{activeJobData.title}</h2>
                <div className="work-company">
                  <span className="company-name">{activeJobData.company}</span>
                  <span className="work-period">{activeJobData.period}</span>
                </div>
              </div>
              
              <div className="work-content">
                <h3 className="responsibilities-title">Responsibilities</h3>
                <ul className="work-responsibilities">
                  {activeJobData.responsibilities.map((responsibility, index) => (
                    <li key={index} className="responsibility-item">
                      {responsibility}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="work-footer">
                <h3 className="technologies-title">Technologies</h3>
                <div className="tech-tags">
                  {activeJobData.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .work-section {
          background-color: var(--dark-bg);
          min-height: 100vh;
        }
        
        .mega-title {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .mega-title.fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .work-container {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
          margin-top: 4rem;
        }
        
        /* Timeline styling */
        .work-timeline {
          position: relative;
          padding-right: 2rem;
        }
        
        .timeline-item {
          position: relative;
          padding-bottom: 3rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        
        .timeline-point {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-normal);
          z-index: 2;
        }
        
        .timeline-point-inner {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--primary-color);
          transform: scale(0.5);
          opacity: 0.5;
          transition: all var(--transition-normal);
        }
        
        .timeline-point.active .timeline-point-inner {
          transform: scale(1);
          opacity: 1;
          box-shadow: 0 0 15px var(--primary-color);
        }
        
        .timeline-point:hover .timeline-point-inner {
          transform: scale(0.8);
          opacity: 0.8;
        }
        
        .timeline-connector-container {
          position: absolute;
          top: 24px;
          left: 12px;
          height: calc(100% - 24px);
          width: 1px;
          transform: translateX(-50%);
        }
        
        .timeline-connector {
          height: 0;
          width: 1px;
          background: linear-gradient(to bottom, var(--primary-color), transparent);
          transition: height 0.6s ease;
        }
        
        .timeline-connector.active {
          height: 100%;
        }
        
        .timeline-content {
          margin-left: 1rem;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius-sm);
          cursor: pointer;
          transition: all var(--transition-normal);
          opacity: 0.6;
        }
        
        .timeline-content.active {
          opacity: 1;
        }
        
        .timeline-content:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .timeline-title {
          font-size: 1.2rem;
          margin: 0 0 0.2rem 0;
        }
        
        .timeline-period {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0;
        }
        
        /* Job details styling */
        .work-details {
          padding: 0;
          transition: all var(--transition-normal);
          height: fit-content;
        }
        
        .work-details-inner {
          padding: 2.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .work-header {
          margin-bottom: 2rem;
          position: relative;
        }
        
        .work-header::after {
          content: '';
          position: absolute;
          bottom: -1rem;
          left: 0;
          width: 50px;
          height: 2px;
          background: var(--primary-color);
        }
        
        .work-title {
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(90deg, #fff, #e0e0e0);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .work-company {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-secondary);
        }
        
        .company-name {
          font-size: 1.2rem;
          color: var(--primary-color);
        }
        
        .work-period {
          font-style: italic;
        }
        
        .work-content {
          margin-bottom: 2rem;
        }
        
        .responsibilities-title, .technologies-title {
          font-size: 1.1rem;
          margin: 0 0 1rem 0;
          color: var(--text-secondary);
        }
        
        .work-responsibilities {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .responsibility-item {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        
        .responsibility-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary-color);
        }
        
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }
        
        .tech-tag {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.4rem 0.8rem;
          border-radius: var(--border-radius-sm);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        
        @media (max-width: 992px) {
          .work-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .work-timeline {
            display: flex;
            overflow-x: auto;
            padding-bottom: 1rem;
            padding-right: 0;
          }
          
          .timeline-item {
            padding-bottom: 0;
            padding-right: 2rem;
            flex-direction: row;
            align-items: center;
          }
          
          .timeline-connector-container {
            top: 50%;
            left: 24px;
            height: 1px;
            width: calc(100% - 24px);
            transform: translateY(-50%);
          }
          
          .timeline-connector {
            height: 1px;
            width: 0;
            background: linear-gradient(to right, var(--primary-color), transparent);
          }
          
          .timeline-connector.active {
            width: 100%;
            height: 1px;
          }
        }
      `}</style>
    </section>
  );
}