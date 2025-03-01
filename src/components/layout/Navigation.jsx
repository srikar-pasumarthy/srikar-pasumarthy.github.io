import React, { useState, useEffect } from 'react';

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('hero');
    
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'work', 'projects'];
            const scrollPosition = window.scrollY + 100; // Add offset for better detection
            
            for (const section of sections) {
                const element = document.getElementById(section);
                if (!element) continue;
                
                const offset = element.offsetTop;
                const height = element.offsetHeight;
                
                if (scrollPosition >= offset && scrollPosition < offset + height) {
                    setActiveSection(section);
                    break;
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    return (
        <nav className="nav">
            <div className="nav-links">
                <a 
                    href="#work" 
                    className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('work');
                    }}
                >
                    Work
                </a>
                <a 
                    href="#projects" 
                    className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('projects');
                    }}
                >
                    Projects
                </a>
            </div>
        </nav>
    );
}