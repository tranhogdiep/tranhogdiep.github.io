import React from 'react';
import './LoadingProgress.css';

export default function LoadingProgress({ progress, visible }) {
    if (!visible) return null;
    return (
        <div id="loading-progress" className="loading-progress">
            <div className="loader"></div>
            {progress > 0 && (
                <div className="progress-text">
                    {Math.round(progress)}%
                </div>
            )}
        </div>
    );
}
