import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragonARSceneManager } from '../three/dragonARScene';

export default function DragonAR() {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!canvasRef.current) return;

        const manager = new DragonARSceneManager(canvasRef.current, {
            onLoaded: () => {
                setIsLoading(false);
            }
        });

        return () => {
            manager.destroy();
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: '#242424', position: 'relative', overflow: 'hidden' }}>
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
