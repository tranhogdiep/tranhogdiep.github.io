import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../config/LanguageContext';

export default function ChickenAR({ embedded = false }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { t, language } = useLanguage();
    const containerRef = React.useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        // Load model-viewer script
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
        document.head.appendChild(script);

        // Load model-viewer-effects script
        const scriptEffects = document.createElement('script');
        scriptEffects.type = 'module';
        scriptEffects.src = 'https://cdn.jsdelivr.net/npm/@google/model-viewer-effects/dist/model-viewer-effects.min.js';
        document.head.appendChild(scriptEffects);

        // Hide loading screen after some time (model viewer takes care of its own inside loader)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === containerRef.current);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.head.removeChild(script);
            document.head.removeChild(scriptEffects);
            clearTimeout(timer);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen:", err);
            });
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div 
            ref={containerRef}
            style={{ 
                width: embedded && !isFullscreen ? '100%' : '100vw', 
                height: embedded && !isFullscreen ? '100%' : '100vh', 
                backgroundColor: '#242424', 
                position: 'relative',
                overflow: 'hidden'
            }}
        >
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
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff2846'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
                >
                    ← {t('common.back')}
                </button>
            )}

            {/* Full Screen Button */}
            <button
                onClick={toggleFullscreen}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 10,
                    padding: '10px 20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: '#fff',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontFamily: 'sans-serif',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
                    e.currentTarget.style.borderColor = '#38bdf8';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)';
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.2)';
                }}
            >
                {isFullscreen ? (
                    <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"/>
                        </svg>
                        {language === 'vi' ? 'Thoát toàn màn hình' : 'Exit Fullscreen'}
                    </>
                ) : (
                    <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                        {language === 'vi' ? 'Toàn màn hình' : 'Fullscreen'}
                    </>
                )}
            </button>


            {isLoading && (
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    zIndex: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#242424'
                }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '5px solid #fff',
                        borderBottomColor: 'transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>{`
                        @keyframes spin {
                            to { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            )}

            {/* Google Model Viewer Web Component */}
            <model-viewer
                style={{ width: '100%', height: '100%' }}
                id="model-viewer"
                src="/assets/demo/fire.glb"
                ar
                ar-modes="scene-viewer quick-look webxr"
                camera-controls
                disable-pan
                touch-action="pan-y pan-x"
                camera-orbit="45deg 55deg auto"
                max-camera-orbit="auto 90deg 200%"
                min-camera-orbit="auto 0deg auto"
                alt="A 3D model of VR360"
                autoplay
            >
                <effect-composer>
                    <bloom-effect></bloom-effect>
                    <color-grade-effect></color-grade-effect>
                </effect-composer>
            </model-viewer>
        </div>
    );
}
