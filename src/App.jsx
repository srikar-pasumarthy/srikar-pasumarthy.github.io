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
                <Hero />
                <About />
                <Work />
                <Projects />
            </div>
        </>
    );
}