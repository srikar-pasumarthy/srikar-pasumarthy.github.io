import React, { useState, useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import TerminalAnimation from './components/animations/TerminalAnimation';
import HeroAbout from './components/sections/HeroAbout';
import Work from './components/sections/Work';
import Projects from './components/sections/Projects';
import { Suspense } from 'react';
import './styles/main.css';

export default function App() {
    const [showAnimation, setShowAnimation] = useState(true);
    const [animationCompleted, setAnimationCompleted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [preloading, setPreloading] = useState(true);

    useEffect(() => {
        const preloadTimer = setTimeout(() => {
            setPreloading(false);
        }, 1000);
        
        return () => clearTimeout(preloadTimer);
    }, []);

    useEffect(() => {
        if (!preloading) {
            const loadTimer = setTimeout(() => {
                setIsLoaded(true);
            }, 500);
            
            return () => clearTimeout(loadTimer);
        }
    }, [preloading]);

    const handleAnimationComplete = () => {
        setTimeout(() => {
            setShowAnimation(false);
            
            setTimeout(() => {
                setAnimationCompleted(true);
                
                window.scrollTo(0, 0);
            }, 400);
        }, 500);
    };

    const mainContentClasses = animationCompleted 
        ? 'main-content main-content-visible' 
        : 'main-content';

    const loadingScreenClasses = preloading 
        ? 'loading-screen loading-screen-visible' 
        : 'loading-screen';

    return (
        <>
            {/* Preloading screen */}
            <div className={loadingScreenClasses}>
                <div className="loading-animation">
                    <div className="loading-bar"></div>
                    <div className="loading-text">Loading...</div>
                </div>
            </div>
            
            <div className={isLoaded ? 'app-loaded' : 'app-loading'}>
                {/* Terminal animation */}
                {showAnimation && (
                    <TerminalAnimation onAnimationComplete={handleAnimationComplete} />
                )}
                
                {/* Main content */}
                <div className={mainContentClasses}>
                    <Navigation />
                    <Suspense fallback={<div>Loading...</div>}>
                        <main>
                            <HeroAbout />
                            <Work />
                            <Projects />
                        </main>
                    </Suspense>
                </div>
            </div>
        </>
    );
}