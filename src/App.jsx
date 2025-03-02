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

    const mainContentStyle = {
        opacity: animationCompleted ? 1 : 0,
        transform: animationCompleted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
        display: animationCompleted ? 'block' : 'none',
    };

    const loadingScreenStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0F1119',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
        opacity: preloading ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: preloading ? 'all' : 'none',
    };

    return (
        <>
            {/* Preloading screen */}
            <div style={loadingScreenStyle}>
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
                <div style={mainContentStyle}>
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
            
            {/* Styled loading animation */}
            <style jsx>{`
                .loading-animation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                
                .loading-bar {
                    width: 150px;
                    height: 3px;
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                    overflow: hidden;
                    position: relative;
                }
                
                .loading-bar::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 30%;
                    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
                    animation: loading 1.5s infinite;
                }
                
                .loading-text {
                    font-family: 'Manrope', sans-serif;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    letter-spacing: 0.1em;
                }
                
                @keyframes loading {
                    0% {
                        left: -30%;
                    }
                    100% {
                        left: 100%;
                    }
                }
                
                .app-loading {
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }
                
                .app-loaded {
                    opacity: 1;
                    transition: opacity 0.5s ease-in-out;
                }
            `}</style>
            
            {/* Global cursor style */}
            <style jsx global>{`
                html {
                    cursor: default;
                }
                
                /* Custom cursor styling */
                .custom-cursor {
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: rgba(0, 229, 255, 0.3);
                    mix-blend-mode: difference;
                    pointer-events: none;
                    transform: translate(-50%, -50%);
                    z-index: 9999;
                    transition: width 0.2s, height 0.2s, background-color 0.2s;
                }
                
                .custom-cursor-dot {
                    position: fixed;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background-color: var(--primary-color);
                    pointer-events: none;
                    transform: translate(-50%, -50%);
                    z-index: 10000;
                    transition: transform 0.1s;
                }
            `}</style>
        </>
    );
}