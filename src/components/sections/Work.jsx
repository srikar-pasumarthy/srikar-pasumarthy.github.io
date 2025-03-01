import React from 'react';
import { workExperiences } from '../../data/workExperience';

export default function Work() {
    return (
      <section id="work" className="section work-section">
        <div className="section-content">
          <div className="mega-title">work</div>
          
          <div className="work-items">
            {workExperiences.map(job => (
              <div key={job.id} className="work-item">
                <h3 className="work-title">{job.title}</h3>
                <div className="work-company">{job.company}</div>
                <div className="work-period">{job.period}</div>
                
                <ul className="work-responsibilities">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
                
                <div className="tech-tags">
                  {job.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }