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
        <>
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
            
            <style jsx>{`
                .nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1000;
                    transition: all 0.3s ease;
                    padding: 1.5rem 0;
                }
                
                .nav.scrolled {
                    background: rgba(15, 17, 25, 0.85);
                    backdrop-filter: blur(8px);
                    padding: 1rem 0;
                    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1);
                }
                
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 5%;
                }
                
                .nav-logo {
                    cursor: pointer;
                    z-index: 1001;
                }
                
                .logo-text {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.8rem;
                    font-weight: 600;
                    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                .desktop-nav {
                    display: flex;
                    gap: 2.5rem;
                }
                
                .nav-link {
                    font-family: 'Manrope', sans-serif;
                    color: var(--text-primary);
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 400;
                    position: relative;
                    padding: 0.5rem 0;
                    transition: color 0.3s ease;
                }
                
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: var(--primary-color);
                    transition: width 0.3s ease;
                }
                
                .nav-link:hover {
                    color: var(--primary-color);
                }
                
                .nav-link.active::after {
                    width: 100%;
                }
                
                /* Mobile menu toggle */
                .menu-toggle {
                    display: none;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    width: 30px;
                    height: 24px;
                    position: relative;
                    z-index: 1001;
                }
                
                .menu-bar {
                    width: 100%;
                    height: 2px;
                    background-color: var(--text-primary);
                    position: relative;
                    transition: all 0.3s ease;
                }
                
                .menu-bar::before,
                .menu-bar::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background-color: var(--text-primary);
                    transition: all 0.3s ease;
                }
                
                .menu-bar::before {
                    top: -8px;
                }
                
                .menu-bar::after {
                    bottom: -8px;
                }
                
                .menu-bar.open {
                    background-color: transparent;
                }
                
                .menu-bar.open::before {
                    transform: rotate(45deg);
                    top: 0;
                    background-color: var(--primary-color);
                }
                
                .menu-bar.open::after {
                    transform: rotate(-45deg);
                    bottom: 0;
                    background-color: var(--primary-color);
                }
                
                /* Mobile navigation overlay */
                .mobile-nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: var(--dark-bg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.5s ease;
                    pointer-events: none;
                }
                
                .mobile-nav.open {
                    opacity: 1;
                    visibility: visible;
                    pointer-events: all;
                }
                
                .mobile-nav-links {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                    text-align: center;
                }
                
                .mobile-nav-link {
                    font-family: 'Space Grotesk', sans-serif;
                    color: var(--text-primary);
                    text-decoration: none;
                    font-size: 2rem;
                    transition: all 0.3s ease;
                }
                
                .mobile-nav-link:hover,
                .mobile-nav-link.active {
                    color: var(--primary-color);
                    transform: scale(1.05);
                }
                
                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .desktop-nav {
                        display: none;
                    }
                    
                    .menu-toggle {
                        display: block;
                    }
                }
            `}</style>
        </>
    );
}