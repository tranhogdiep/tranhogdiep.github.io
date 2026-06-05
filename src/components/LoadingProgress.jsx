import React, { useEffect, useState } from 'react';
import './LoadingProgress.css';

export default function LoadingProgress({ progress, visible }) {
    const [render, setRender] = useState(visible);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (visible) {
            setRender(true);
            setFade(false);
        } else {
            setFade(true);
            const timer = setTimeout(() => {
                setRender(false);
            }, 600); // matches CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!render) return null;

    const size = 260;
    const center = size / 2;
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const safeProgress = Math.min(Math.max(progress || 0, 0), 100);
    const strokeDashoffset = circumference - (safeProgress / 100) * circumference;

    // Calculate position for leading edge white dot
    const angle = (safeProgress / 100) * 360 - 90;
    const angleRad = (angle * Math.PI) / 180;
    const dotX = center + radius * Math.cos(angleRad);
    const dotY = center + radius * Math.sin(angleRad);

    return (
        <div id="loading-progress" className={`loading-progress ${fade ? 'fade-out' : ''}`}>
            {/* HUD Corner Brackets */}
            <div className="loading-corner top-left"></div>
            <div className="loading-corner bottom-right"></div>

            <div className="loader-container">
                <svg width={size} height={size} className="loader-svg">
                    {/* Concentric rings */}
                    <circle 
                        cx={center} 
                        cy={center} 
                        r={radius + 15} 
                        className="loader-ring-outer" 
                    />
                    <circle 
                        cx={center} 
                        cy={center} 
                        r={radius - 15} 
                        className="loader-ring-inner" 
                    />

                    {/* Progress track */}
                    <circle 
                        cx={center} 
                        cy={center} 
                        r={radius} 
                        className="loader-track" 
                    />

                    {/* Active progress arc */}
                    <circle 
                        cx={center} 
                        cy={center} 
                        r={radius} 
                        className="loader-progress" 
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        transform={`rotate(-90 ${center} ${center})`}
                    />

                    {/* White leading dot at the end of progress */}
                    {safeProgress > 0 && (
                        <circle 
                            cx={dotX} 
                            cy={dotY} 
                            r="4" 
                            className="loader-dot" 
                        />
                    )}
                </svg>

                {/* Text inside the circle */}
                <div className="loader-text-container">
                    <div className="progress-text">{Math.round(safeProgress)}%</div>
                    <div className="loader-subtitle">SYSTEM LOAD</div>
                </div>
            </div>
        </div>
    );
}

