export default function Navigation() {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="nav">
            <div className="nav-links">
                <a href="#about" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                }}>About</a>
                <a href="#work" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('work');
                }}>Work</a>
                <a href="#projects" className="nav-link" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                }}>Projects</a>
            </div>
        </nav>
    );
}