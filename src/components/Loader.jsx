import { useState, useEffect } from 'react';

export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [filling, setFilling] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Start fill animation after a tiny delay
    const fillTimer = setTimeout(() => setFilling(true), 200);

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

    // Auto-dismiss after minimum display time
    const dismissTimer = setTimeout(() => {
      setPercent(100);
      clearInterval(interval);
      setTimeout(() => {
        setHidden(true);
        setTimeout(() => onComplete?.(), 600);
      }, 400);
    }, 2800);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(dismissTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className={`loader-screen ${hidden ? 'hidden' : ''}`}>
      <div className="loader-logo">
        <span className="loader-logo-outline">MK</span>
        <span className={`loader-logo-fill ${filling ? 'filling' : ''}`}>MK</span>
      </div>

      <div className="loader-bottom">
        <span className="loader-text">Loading</span>
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${percent}%` }} />
        </div>
        <span className="loader-percent">{percent}%</span>
      </div>
    </div>
  );
}
