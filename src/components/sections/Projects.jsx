import React, { useState, useEffect } from 'react';
import { projects } from '../../data/projects';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  const categories = ['All', 'Machine Learning', 'Web Dev', 'Misc.'];
  
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === activeFilter);
      setFilteredProjects(filtered);
    }
  }, [activeFilter]);
  
  return (
    <section id="projects" className="section projects-section">
      <div className="section-content">
        <div className="mega-title">projects</div>
        
        <div className="filter-controls">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="project-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-item">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-links">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
                )}
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}