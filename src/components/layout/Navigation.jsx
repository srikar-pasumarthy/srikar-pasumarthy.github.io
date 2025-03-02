import React, { useState, useEffect } from 'react';

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    // Handle scroll effects and active section
    useEffect(() => {
        const handleScroll = () => {
            // Check if page is scrolled for navbar background change
            setScrolled(window.scrollY > 50);
            
            // Determine active section
            const sections = ['hero', 'work', 'projects'];
            const scrollPosition = window.scrollY + 100;
            
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
    
    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            setMenuOpen(false);
        }
    };
    
    return (
        <nav className={`nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo" onClick={() => scrollToSection('hero')}>
                    <span className="logo-text">SP</span>
                </div>
                
                <div className="nav-links desktop-nav">
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
                
                <button 
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className={`menu-bar ${menuOpen ? 'open' : ''}`}></div>
                </button>
            </div>
            
            {/* Mobile navigation overlay */}
            <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
                <div className="mobile-nav-links">
                    <a 
                        href="#work" 
                        className={`mobile-nav-link ${activeSection === 'work' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('work');
                        }}
                    >
                        Work
                    </a>
                    <a 
                        href="#projects" 
                        className={`mobile-nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('projects');
                        }}
                    >
                        Projects
                    </a>
                </div>
            </div>
        </nav>
    );
}