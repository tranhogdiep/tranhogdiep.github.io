import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../config/LanguageContext';
import { MapDemoSceneManager } from '../three/mapDemoScene';

export default function MapDemo({ embedded = false }) {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [manager, setManager] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { t, language } = useLanguage();

    // States for controls
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        const sceneManager = new MapDemoSceneManager(canvasRef.current, {
            onLoaded: () => {
                setIsLoading(false);
            }
        });
        setManager(sceneManager);

        let animationFrameId;
        const tick = () => {
            if (sceneManager.controls) {
                sceneManager.controls.update();
            }
            sceneManager.render();
            animationFrameId = requestAnimationFrame(tick);
        };
        tick();

        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === containerRef.current);
            // Wait a moment for layout to adjust and resize renderer
            setTimeout(() => {
                if (sceneManager) sceneManager.onWindowResize();
            }, 100);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            cancelAnimationFrame(animationFrameId);
            sceneManager.destroy();
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Resize Three.js renderer when container size changes (especially for embedded view)
    useEffect(() => {
        if (manager) {
            manager.onWindowResize();
        }
    }, [isFullscreen, manager]);

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
                overflow: 'hidden',
                borderRadius: embedded && !isFullscreen ? '12px' : '0px'
            }}
        >
            {/* Overlay Info (Top Right) */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: embedded && !isFullscreen ? '20px' : '120px', // Shift left when full-screen to avoid overlap with Fullscreen button
                zIndex: 10,
                color: '#fff',
                fontFamily: 'sans-serif',
                textAlign: 'right',
                textShadow: '0 2px 5px rgba(0,0,0,0.8)',
                pointerEvents: 'none'
            }}>
                <h3 style={{ margin: '0 0 5px 0', fontSize: embedded && !isFullscreen ? '1rem' : '1.17rem' }}>{t('mapDemo.title')}</h3>
                <span style={{ fontSize: '11px', opacity: 0.8 }}>{t('mapDemo.tips')}</span>
            </div>

            {/* Back Button (Only for standalone page mode) */}
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

            {/* Full Screen Button (Always show in embedded, show in standalone to go full browser window size if needed) */}
            {embedded && (
                <button
                    onClick={toggleFullscreen}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        zIndex: 10,
                        padding: '8px 15px',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: '#fff',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontFamily: 'sans-serif',
                        fontWeight: '600',
                        fontSize: '0.8rem',
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
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4" />
                            </svg>
                            {language === 'vi' ? 'Thoát' : 'Exit'}
                        </>
                    ) : (
                        <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                            </svg>
                            {language === 'vi' ? 'Phóng to' : 'Fullscreen'}
                        </>
                    )}
                </button>
            )}



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

            {/* Canvas render */}
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
}
