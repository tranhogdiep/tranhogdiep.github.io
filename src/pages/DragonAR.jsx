import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../config/LanguageContext';
import { DragonARSceneManager } from '../three/dragonARScene';

export default function DragonAR({ embedded = false }) {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const { t, language } = useLanguage();

    useEffect(() => {
        if (!canvasRef.current) return;

        const manager = new DragonARSceneManager(canvasRef.current, {
            onLoaded: () => {
                setIsLoading(false);
            }
        });

        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === containerRef.current);
            // Trigger a resize event to make sure Three.js updates the canvas size
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 100);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            manager.destroy();
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

            {/* Canvas render */}
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
    );
}
