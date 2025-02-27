import React from 'react';
import { projects } from '../../data/projects';

export default function Projects() {
    return (
        <section id="projects" className="section">
            <div className="section-content">
                <h2>Featured Projects</h2>
                
                <div className="project-grid">
                    {projects.map(project => (
                        <div key={project.id} className="project-item">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            
                            {project.technologies && project.technologies.length > 0 && (
                                <div className="technologies">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            )}
                            
                            {/* You can add links to GitHub/demo directly here */}
                            {(project.githubUrl || project.demoUrl) && (
                                <div className="project-links">
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">GitHub</a>
                                    )}
                                    {project.demoUrl && (
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">Live Demo</a>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}