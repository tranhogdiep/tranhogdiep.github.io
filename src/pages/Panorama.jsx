import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../config/LanguageContext';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';

export default function Panorama({ embedded = false }) {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { t } = useLanguage();

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

        // Trigger a resize to ensure it fits the container dimensions correctly when embedded
        const resizeTimeout = setTimeout(() => {
            try {
                if (viewer && typeof viewer.resize === 'function') {
                    viewer.resize();
                }
            } catch (e) {
                console.warn("Failed to resize Photo Sphere Viewer:", e);
            }
        }, 150);

        return () => {
            clearTimeout(resizeTimeout);
            viewer.destroy();
        };
    }, []);

    return (
        <div style={{
            width: embedded ? '100%' : '100vw',
            height: embedded ? '100%' : '100vh',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Back Button */}
            {!embedded && (
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
                    ← {t('common.back')}
                </button>
            )}

            {/* Photo Sphere Container */}
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
