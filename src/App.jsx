import React, { useState, useEffect } from 'react';
import Navigation from './components/layout/Navigation';
import HeroAbout from './components/sections/HeroAbout';
import Work from './components/sections/Work';
import Projects from './components/sections/Projects';
import { Suspense } from 'react';
import './styles/main.css';

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simple loading effect
        const loadTimer = setTimeout(() => {
            setIsLoaded(true);
        }, 500);
        
        return () => clearTimeout(loadTimer);
    }, []);

    return (
        <>
            <Navigation />
            
            <div className={isLoaded ? 'app-loaded' : 'app-loading'}>
                <div className="main-content main-content-visible">
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