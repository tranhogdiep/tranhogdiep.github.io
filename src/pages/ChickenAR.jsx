import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChickenAR() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

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

        return () => {
            document.head.removeChild(script);
            document.head.removeChild(scriptEffects);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', backgroundColor: '#242424', position: 'relative' }}>
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

            {/* Google Model Viewer Web Component */}
            <model-viewer
                style={{ width: '100%', height: '100%' }}
                id="model-viewer"
                src="https://cdn.glitch.global/957d4555-fa6b-4e6b-84c4-f90af449280c/fire.glb?v=1727795292339"
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
