import React, { useState, useEffect } from 'react';

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('hero');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            
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
    
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth'
            });
            
            setMenuOpen(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    return (
        <header className="header-persistent">
            <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
                <div className="navbar-container">
                    {/* Logo */}
                    <div className="navbar-logo" onClick={scrollToTop}>
                        <span className="logo-text">SP</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="navbar-links">
                        <a 
                            href="#work" 
                            className={`navbar-link ${activeSection === 'work' ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('work');
                            }}
                        >
                            Work
                        </a>
                        <a 
                            href="#projects" 
                            className={`navbar-link ${activeSection === 'projects' ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('projects');
                            }}
                        >
                            Projects
                        </a>
                    </div>
                    
                    {/* Mobile Menu Toggle */}
                    <button 
                        className="mobile-menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className={`menu-bar ${menuOpen ? 'open' : ''}`}></div>
                    </button>
                </div>
                
                {/* Mobile Navigation Overlay */}
                <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-links">
                        <a 
                            href="#work" 
                            className={`mobile-menu-link ${activeSection === 'work' ? 'active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('work');
                            }}
                        >
                            Work
                        </a>
                        <a 
                            href="#projects" 
                            className={`mobile-menu-link ${activeSection === 'projects' ? 'active' : ''}`}
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
        </header>
    );
}