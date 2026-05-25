import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';

export default function Panorama() {
    const navigate = useNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const viewer = new Viewer({
            container: containerRef.current,
            panorama: '/assets/images/tttt.jpg', // Defaulting to tttt.jpg restored from assets
            navbar: [
                'zoom',
                'fullscreen',
            ],
        });

        return () => {
            viewer.destroy();
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 10,
                    padding: '10px 20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontFamily: 'sans-serif',
                    transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#ff2846'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.6)'}
            >
                ← Back
            </button>

            {/* Photo Sphere Container */}
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
