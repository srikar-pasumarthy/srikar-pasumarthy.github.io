import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import TerminalAnimation from './TerminalAnimation';

export default function Experience() {
    const [showAnimation, setShowAnimation] = useState(true);
    const [animationCompleted, setAnimationCompleted] = useState(false);

    useEffect(() => {
        setShowAnimation(true);
        setAnimationCompleted(false);
    }, []);

    const handleAnimationComplete = () => {
        setShowAnimation(false);
        setAnimationCompleted(true);
    };

    const mainContentStyle = {
        opacity: animationCompleted ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
    };

    return (
        <>
            {showAnimation && (
                <TerminalAnimation onAnimationComplete={handleAnimationComplete} />
            )}
            
            <div style={mainContentStyle}>
                <Navigation />
                
                {/* Hero Section */}
                <div className="content">
                    <h1 className="title">Hi, I'm<br />Srikar Pasumarthy</h1>
                    <p className="subtitle">Software Engineer</p>
                </div>

                {/* About Section */}
                <section id="about" className="section">
                    <div className="section-content">
                        <h2>About Me</h2>
                        <p>I'm a passionate software engineer with a focus on building elegant, user-centric solutions. 
                        When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.</p>
                    </div>
                </section>

                {/* Work Section */}
                <section id="work" className="section">
                    <div className="section-content">
                        <h2>Work Experience</h2>
                        <div className="work-item">
                            <h3>Senior Software Engineer</h3>
                            <p>Tech Company • 2022 - Present</p>
                            <p>Led development of scalable web applications using React and Node.js. 
                            Implemented critical features that improved user engagement by 40%.</p>
                        </div>
                        <div className="work-item">
                            <h3>Full Stack Developer</h3>
                            <p>StartupCo • 2020 - 2022</p>
                            <p>Developed and maintained multiple client-facing applications. 
                            Collaborated with cross-functional teams to deliver high-quality software solutions.</p>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="section">
                    <div className="section-content">
                        <h2>Featured Projects</h2>
                        <div className="project-grid">
                            <div className="project-item">
                                <h3>Project One</h3>
                                <p>A machine learning application that predicts user behavior 
                                using Python and TensorFlow.</p>
                            </div>
                            <div className="project-item">
                                <h3>Project Two</h3>
                                <p>Real-time chat application built with WebSocket and React.</p>
                            </div>
                            <div className="project-item">
                                <h3>Project Three</h3>
                                <p>E-commerce platform with integrated payment processing.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}