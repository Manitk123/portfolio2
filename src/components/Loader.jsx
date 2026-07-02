import { useState, useEffect } from 'react';

export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [loadingText, setLoadingText] = useState("INITIALIZING...");

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate near the end
        const increment = prev < 70 ? Math.random() * 3 + 1 : Math.random() * 8 + 2;
        return Math.min(100, Math.floor(prev + increment));
      });
    }, 50);

    // Text Scrambler Effect
    const phases = ["INITIALIZING...", "LOADING_ASSETS...", "DECRYPTING...", "SYSTEM_READY"];
    let phaseIndex = 0;
    
    const textInterval = setInterval(() => {
      if (phaseIndex >= phases.length - 1) {
        clearInterval(textInterval);
        return;
      }
      
      const target = phases[phaseIndex + 1];
      let iterations = 0;
      
      const scrambleInterval = setInterval(() => {
        setLoadingText(target.split("").map((char, index) => {
          if (index < iterations) return char;
          return String.fromCharCode(33 + Math.floor(Math.random() * 94)); // Random ASCII
        }).join(""));
        
        iterations += 1/3;
        if (iterations >= target.length) {
          clearInterval(scrambleInterval);
          setLoadingText(target);
          phaseIndex++;
        }
      }, 30);
    }, 700);

    // Auto-dismiss after minimum display time
    const dismissTimer = setTimeout(() => {
      setPercent(100);
      setLoadingText("SYSTEM_READY");
      clearInterval(interval);
      clearInterval(textInterval);
      setTimeout(() => {
        setHidden(true);
        setTimeout(() => onComplete?.(), 600);
      }, 500);
    }, 3000);

    return () => {
      clearTimeout(dismissTimer);
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className={`loader-screen ${hidden ? 'hidden' : ''}`}>
      <div className="loader-door-top"></div>
      <div className="loader-door-bottom"></div>
      
      <div className="loader-content">
        <div className="loader-logo">
          <span className="loader-logo-text">MK</span>
        </div>

        <div className="loader-bottom">
          <span className="loader-text">{loadingText}</span>
          <div className="loader-bar">
            <div className="loader-bar-fill" style={{ width: `${percent}%` }} />
          </div>
          <span className="loader-percent">{percent}%</span>
        </div>
      </div>
    </div>
  );
}
