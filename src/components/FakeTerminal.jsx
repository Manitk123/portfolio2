import { useState, useEffect } from 'react';

export default function FakeTerminal() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const lines = [
    { text: 'manit@macbook-pro ~ % ./status.sh', delay: 0 },
    { text: 'Analyzing system capabilities...', delay: 0.5 },
    { text: '[OK] Core dependencies loaded', delay: 1.5 },
    { text: '[OK] Security protocols active', delay: 2.0 },
    { text: '[OK] Creative engines running at 100%', delay: 2.5 },
    { text: 'System is fully operational and ready to build.', delay: 3.2 }
  ];

  return (
    <div className="fake-terminal reveal">
      <div className="fake-terminal-header">
        <div className="term-dots">
          <span className="term-dot close"></span>
          <span className="term-dot minimize"></span>
          <span className="term-dot maximize"></span>
        </div>
        <div className="term-title">manit@macbook-pro:~</div>
      </div>
      <div className="fake-terminal-body">
        {lines.map((line, i) => (
          <div key={i} className="term-line" style={{ animationDelay: `${line.delay}s` }}>
            {line.text}
          </div>
        ))}
        <div className="term-input" style={{ animationDelay: '3.5s' }}>
          <span className="term-prompt">manit@macbook-pro ~ % </span>
          <span className="term-cursor" style={{ opacity: showCursor ? 1 : 0 }}></span>
        </div>
      </div>
    </div>
  );
}
