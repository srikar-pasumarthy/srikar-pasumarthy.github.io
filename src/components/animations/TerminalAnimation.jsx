import React, { useState, useEffect } from 'react';

const Typing = ({ text, delay = 0, speed = 50, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Typing effect
  useEffect(() => {
    const actualSpeed = speed / 2;
    
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        if (currentIndex < text.length) {
          const timer = setTimeout(() => {
            setDisplayText(prev => prev + text[currentIndex]);
            setCurrentIndex(currentIndex + 1);
          }, actualSpeed);
          
          return () => clearTimeout(timer);
        } else if (onComplete) {
          onComplete();
        }
      }, delay);
      
      return () => clearTimeout(delayTimer);
    } else {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + text[currentIndex]);
          setCurrentIndex(currentIndex + 1);
        }, actualSpeed);
        
        return () => clearTimeout(timer);
      } else if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, delay, onComplete, speed, text]);
  
  return (
    <span>
      {displayText}
      {currentIndex < text.length && 
        <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>}
    </span>
  );
};

const TerminalAnimation = ({ onAnimationComplete = () => {} }) => {
  const [showHistory, setShowHistory] = useState(true);
  const [showTypeClear, setShowTypeClear] = useState(false);
  const [showFirstLog, setShowFirstLog] = useState(false);
  const [showSecondLog, setShowSecondLog] = useState(false);
  const [typingCompleted, setTypingCompleted] = useState({
    cleat: false,
    clear: false,
    npmRun: false
  });
  
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  const BASE_PROMPT = "srikar@TunnuLaptop:$";
  
  const calculateDynamicValues = () => {
    const minFontSize = 12;
    const maxFontSize = 24;
    const minWidth = 320;
    const maxWidth = 1920;
    
    const fontSizeScale = Math.min(Math.max((windowSize.width - minWidth) / (maxWidth - minWidth), 0), 1);
    const fontSize = minFontSize + fontSizeScale * (maxFontSize - minFontSize);
    
    const minPadding = 20;
    const maxPadding = 120;
    const horizontalPadding = minPadding + fontSizeScale * (maxPadding - minPadding);
    
    const minHeight = 500;
    const maxHeight = 1080;
    const verticalScale = Math.min(Math.max((windowSize.height - minHeight) / (maxHeight - minHeight), 0), 1);
    const verticalPadding = minPadding + verticalScale * (maxPadding - minPadding);
    
    return {
      fontSize: `${fontSize}px`,
      padding: `${verticalPadding}px ${horizontalPadding}px`
    };
  };
  
  const dynamicStyles = calculateDynamicValues();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Animation sequence timers
  useEffect(() => {
    const timers = [
      { action: () => setShowTypeClear(true), delay: 1200 },
      { action: () => setShowHistory(false), delay: 3000 },
      { action: () => setShowFirstLog(true), delay: 5800 },
      { action: () => setShowSecondLog(true), delay: 7800 },
      { action: onAnimationComplete, delay: 8300 }
    ];
    
    const timeoutIds = timers.map(timer => 
      setTimeout(timer.action, timer.delay)
    );
    
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [onAnimationComplete]);
  
  // Determine number of columns for file listing based on window width
  const getFileListColumns = () => {
    if (windowSize.width < 500) return 1;
    if (windowSize.width < 768) return 2;
    if (windowSize.width < 1200) return 3;
    return 4;
  };
  
  return (
    <div className="terminal-animation" style={{
      fontFamily: 'monospace',
      backgroundColor: '#000',
      color: '#00ff00',
      padding: dynamicStyles.padding,
      height: '100vh',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      overflow: 'hidden',
      fontSize: dynamicStyles.fontSize,
      lineHeight: '1.5',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        maxHeight: '100%',
        overflow: 'hidden'
      }}>
        {showHistory && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ fontWeight: 'bold' }}>{BASE_PROMPT}</div>
              <div>git add .</div>
            </div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ fontWeight: 'bold' }}>{BASE_PROMPT}</div>
              <div>git commit -m "i think i fixed the bug?"</div>
            </div>
            
            <div>[main 87a5d9c] i think i fixed the bug?</div>
            <div>5 files changed, 27 insertions(+), 14 deletions(-)</div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ fontWeight: 'bold' }}>{BASE_PROMPT}</div>
              <Typing 
                text="cleat" 
                delay={150} 
                speed={5} 
                onComplete={() => setTypingCompleted(prev => ({...prev, cleat: true}))}
              />
            </div>
            
            {typingCompleted.cleat && showTypeClear && (
              <>
                <div>bash: cleat: command not found</div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ fontWeight: 'bold' }}>{BASE_PROMPT}</div>
                  <Typing 
                    text="clear" 
                    delay={150} 
                    speed={5}
                    onComplete={() => setTypingCompleted(prev => ({...prev, clear: true}))}
                  />
                </div>
              </>
            )}
          </div>
        )}
        
        {!showHistory && (
          <>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ fontWeight: 'bold' }}>{BASE_PROMPT}</div>
              <Typing 
                text="npm run dev" 
                delay={120} 
                speed={5}
                onComplete={() => setTypingCompleted(prev => ({...prev, npmRun: true}))}
              />
            </div>
            
            {typingCompleted.npmRun && showFirstLog && (
              <div>
                <div>{'>'} portfolio@0.1.0 dev</div>
                <div>{'>'} vite</div>
                <div style={{ color: '#3498db' }}>
                  VITE v5.0.0 ready in 124 ms
                </div>
                <div>
                  {showSecondLog && (
                    <div style={{ color: '#2ecc71' }}>
                      ➜ Local:   http://localhost:5173/
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        {showFirstLog && (
          <div style={{ 
            display: 'inline-block',
            height: '1.2em', 
            width: '10px', 
            backgroundColor: '#00ff00',
            animation: 'blink 1s infinite'
          }}></div>
        )}
      </div>
      
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          
          html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default TerminalAnimation;