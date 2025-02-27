import React from 'react';
import { workExperiences } from '../../data/workExperience';

export default function Work() {
    return (
        <section id="work" className="section">
            <div className="section-content">
                <h2>Work Experience</h2>
                
                {workExperiences.map(job => (
                    <div key={job.id} className="work-item">
                        <h3>{job.title}</h3>
                        <p>{job.company} • {job.period}</p>
                        <p>{job.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}