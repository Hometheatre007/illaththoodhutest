'use client';

import { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  left: string;
  bottom: string;
  animationDelay: string;
  animationDuration: string;
  width: string;
  height: string;
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [statusText, setStatusText] = useState('initializing...');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setVisible(true);
    // Generate particles as React state instead of DOM manipulation
    const generatedParticles: Particle[] = [];
    for (let i = 0; i < 22; i++) {
      const size = (2 + Math.random() * 3) + 'px';
      generatedParticles.push({
        id: i,
        left: Math.random() * 100 + '%',
        bottom: Math.random() * 40 + '%',
        animationDelay: (Math.random() * 3) + 's',
        animationDuration: (2 + Math.random() * 2) + 's',
        width: size,
        height: size,
      });
    }
    setParticles(generatedParticles);

    // Cycle status texts
    const texts = ['initializing...', 'loading assets...', 'almost ready...', 'welcome...'];
    let ti = 0;
    const textInterval = setInterval(() => {
      ti = (ti + 1) % texts.length;
      setStatusText(texts[ti]);
    }, 2200);

    // Fade out after page loads
    const handleLoad = () => {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 600);
      }, 1800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Fallback: hide after 5 seconds max
    const fallback = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    }, 5000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(fallback);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div className={`loading-overlay ${fadeOut ? 'loading-fadeout' : ''}`}>
      <div className="loading-screen">
        {/* Corner decorations */}
        <div className="loading-corner loading-corner-tl" />
        <div className="loading-corner loading-corner-tr" />
        <div className="loading-corner loading-corner-bl" />
        <div className="loading-corner loading-corner-br" />

        {/* Floating particles - rendered via React instead of DOM manipulation */}
        <div className="loading-particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="loading-particle"
              style={{
                left: p.left,
                bottom: p.bottom,
                animationDelay: p.animationDelay,
                animationDuration: p.animationDuration,
                width: p.width,
                height: p.height,
              }}
            />
          ))}
        </div>

        <div className="loading-logo-wrap">
          {/* Spinning rings + Tamil letter */}
          <div className="loading-ring-container">
            <div className="loading-ring-wrap">
              <div className="loading-ring loading-ring-1" />
              <div className="loading-ring loading-ring-2" />
              <div className="loading-ring loading-ring-3" />
            </div>
            <div className="loading-main-letter">இ</div>
          </div>

          {/* Site name */}
          <div className="loading-site-name">Loading</div>

          {/* Progress bar */}
          <div className="loading-bar-wrap">
            <div className="loading-bar-fill">
              <div className="loading-bar-shimmer" />
            </div>
          </div>

          {/* Bouncing dots */}
          <div className="loading-dots">
            <div className="loading-dot" />
            <div className="loading-dot" />
            <div className="loading-dot" />
          </div>

          {/* Status text */}
          <div className="loading-status-text">{statusText}</div>
        </div>
      </div>
    </div>
  );
}
