import React, { useState, useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import TerminalAnimation from './components/animations/TerminalAnimation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Work from './components/sections/Work';
import Projects from './components/sections/Projects';
import './styles/style.css';

export default function App() {
    const [showAnimation, setShowAnimation] = useState(true);
    const [animationCompleted, setAnimationCompleted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Add a slight delay before showing content to ensure smooth animation
        const loadTimer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);
        
        return () => clearTimeout(loadTimer);
    }, []);

    const handleAnimationComplete = () => {
        // Add a slight delay before transitioning for a smoother effect
        setTimeout(() => {
            setShowAnimation(false);
            
            // Add another slight delay before showing content
            setTimeout(() => {
                setAnimationCompleted(true);
            }, 300);
        }, 500);
    };

    const mainContentStyle = {
        opacity: animationCompleted ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        display: animationCompleted ? 'block' : 'none',
    };

    return (
        <div className={isLoaded ? 'app-loaded' : 'app-loading'}>
            {showAnimation && (
                <TerminalAnimation onAnimationComplete={handleAnimationComplete} />
            )}
            
            <div style={mainContentStyle}>
                <Navigation />
                <main>
                    <Hero />
                    <About />
                    <Work />
                    <Projects />
                </main>
            </div>
        </div>
    );
}