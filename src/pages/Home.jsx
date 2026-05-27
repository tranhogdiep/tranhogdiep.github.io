import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three';
import { MainSceneManager } from '../three/mainScene';
import LoadingProgress from '../components/LoadingProgress';
import SlideShow from '../components/SlideShow';
import ProfileCard from '../components/ProfileCard';
import ContactModal from '../components/ContactModal';

export default function Home() {
    const canvasRef = useRef(null);
    const [sceneManager, setSceneManager] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // Check search params and hash params for initial tab/artwork
    const getInitialParams = () => {
        const initialParams = new URLSearchParams(window.location.search);
        const hashPart = window.location.hash.split('?')[1];
        const initialHashParams = hashPart ? new URLSearchParams(hashPart) : new URLSearchParams();
        return {
            hasArtwork: initialParams.has('artwork') || initialHashParams.has('artwork'),
            tab: initialParams.get('tab') || initialHashParams.get('tab')
        };
    };

    const initialParsed = getInitialParams();
    const hasArtworkParam = initialParsed.hasArtwork || initialParsed.tab === 'portfolio';

    const [init3D, setInit3D] = useState(!hasArtworkParam);
    const [isLoading, setIsLoading] = useState(!hasArtworkParam);
    const [loadProgress, setLoadProgress] = useState(0);

    // Active tab and artwork state from searchParams (reactive)
    const tab = searchParams.get('tab');
    const artwork = searchParams.get('artwork');

    const showPortfolio = tab === 'portfolio' || !!artwork;
    const showProfile = tab === 'about';
    const showContact = tab === 'contact';

    // Redirection fallback for legacy /?tab=blog link
    useEffect(() => {
        if (tab === 'blog') {
            navigate('/blog', { replace: true });
        }
    }, [tab, navigate]);

    // Synchronize 3D camera animations with active tab
    useEffect(() => {
        if (!sceneManager) return;

        if (tab === 'portfolio' || artwork) {
            if (!sceneManager.hiding) {
                sceneManager.zoomToPortfolio(1500);
            }
        } else {
            if (sceneManager.hiding) {
                sceneManager.showMenu();
            }
        }
    }, [tab, artwork, sceneManager]);

    useEffect(() => {
        if (!init3D) return;
        if (!canvasRef.current) return;

        // Progress tracker for loading models
        const progressMap = { menu: 0, open: 0, stand: 0 };
        const updateProgress = () => {
            const sum = progressMap.menu + progressMap.open + progressMap.stand;
            setLoadProgress(sum / 3);
        };

        // Initialize Main Scene Manager
        const manager = new MainSceneManager(canvasRef.current, {
            onLoaded: () => {
                setIsLoading(false);
                const currentParsed = getInitialParams();
                if (currentParsed.hasArtwork || currentParsed.tab === 'portfolio') {
                    manager.zoomToPortfolio(2000);
                }
            },
            onOpenPortfolio: () => {
                setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    next.set('tab', 'portfolio');
                    return next;
                });
            },
            onOpenProfile: () => {
                setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    next.set('tab', 'about');
                    return next;
                });
            }
        });
        setSceneManager(manager);

        // Load models
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/assets/libs/gltf/');
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        const checkObjectScroll = (child) => {
            if (child.material && child.material.userData) {
                if (child.material.userData.scrollY) {
                    manager.addScrollYMat(child.material);
                }
                if (child.material.userData.scrollX) {
                    manager.addScrollXMat(child.material);
                }
                if (child.material.userData.addBlend) {
                    child.material.blending = THREE.AdditiveBlending;
                }
            }
            if (child.userData && child.userData.renderOrder) {
                child.renderOrder = child.userData.renderOrder;
            }
        };

        // 1. Load Menu Model
        loader.load(
            '/assets/models/menu.glb',
            (gltf) => {
                gltf.scene.name = "mainscene";
                manager.addObjectToScene(gltf.scene);
                gltf.scene.position.y = -0.4;
                gltf.scene.layers.enable(1);

                gltf.scene.traverse((child) => {
                    child.layers.enable(1);
                    if (child.type === "Mesh") {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        if (child.name === "Eff02") {
                            child.castShadow = false;
                        }
                        checkObjectScroll(child);
                    }
                });
            },
            (xhr) => {
                if (xhr.total > 0) {
                    progressMap.menu = (xhr.loaded / xhr.total) * 100;
                    updateProgress();
                }
            },
            (err) => console.error("Error loading menu.glb", err)
        );

        // 2. Load effectOpen Model
        loader.load(
            '/assets/models/effectOpen.glb',
            (gltf) => {
                gltf.scene.name = "effectOpen";
                gltf.scene.layers.enable(3);
                manager.addObjectToScene(gltf.scene);
                gltf.scene.position.y = -0.4;
                gltf.scene.traverse((child) => {
                    child.layers.enable(3);
                    if (child.type === "Mesh") {
                        checkObjectScroll(child);
                    }
                });
            },
            (xhr) => {
                if (xhr.total > 0) {
                    progressMap.open = (xhr.loaded / xhr.total) * 100;
                    updateProgress();
                }
            },
            (err) => console.error("Error loading effectOpen.glb", err)
        );

        // 3. Load effectStand Model
        loader.load(
            '/assets/models/effectStand.glb',
            (gltf) => {
                gltf.scene.name = "effectStand";
                gltf.scene.layers.enable(3);
                manager.addObjectToScene(gltf.scene);
                gltf.scene.position.y = -0.4;
                gltf.scene.traverse((child) => {
                    child.layers.enable(3);
                    if (child.type === "Mesh") {
                        checkObjectScroll(child);
                    }
                });
            },
            (xhr) => {
                if (xhr.total > 0) {
                    progressMap.stand = (xhr.loaded / xhr.total) * 100;
                    updateProgress();
                }
            },
            (err) => console.error("Error loading effectStand.glb", err)
        );

        // Cleanup on unmount
        return () => {
            manager.destroy();
            dracoLoader.dispose();
        };
    }, [init3D]);

    const handleClosePortfolio = () => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.delete('tab');
            next.delete('artwork');
            return next;
        });

        try {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('artwork');
            newUrl.searchParams.delete('tab');
            window.history.replaceState({}, '', newUrl);
        } catch (e) {
            console.error(e);
        }

        if (sceneManager) {
            sceneManager.showMenu(); // Zoom out camera back to menu
        } else {
            setIsLoading(true);
            setInit3D(true);
        }
    };

    const handleCloseProfile = () => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.delete('tab');
            return next;
        });
    };

    const handleCloseContact = () => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.delete('tab');
            return next;
        });
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* 3D Canvas */}
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

            {/* Initial Loading progress */}
            <LoadingProgress progress={loadProgress} visible={isLoading} />

            {/* Portfolio Slider Overlay */}
            {showPortfolio && <SlideShow onClose={handleClosePortfolio} />}

            {/* Profile PopUp Overlay */}
            {showProfile && <ProfileCard onClose={handleCloseProfile} />}

            {/* Contact Modal Overlay */}
            {showContact && <ContactModal onClose={handleCloseContact} />}

            {/* Floating Social Icons (Bottom Right) */}
            {!showPortfolio && !showProfile && !showContact && (
                <div className="floating-socials">
                    <a href="https://www.facebook.com/THDPA" target="_blank" rel="noreferrer" className="social-icon fb" title="Facebook">
                        <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
                            <path d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/diepth/" target="_blank" rel="noreferrer" className="social-icon ln" title="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878( 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                        </svg>
                    </a>
                    <a href="https://www.artstation.com/dieptranhong" target="_blank" rel="noreferrer" className="social-icon as" title="ArtStation">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill="currentColor">
                            <path d="M2 377.4l43 74.3A51.4 51.4 0 0 0 90.9 480h285.4l-59.2-102.6zM501.8 350L335.6 59.3A51.4 51.4 0 0 0 290.2 32h-88.4l257.3 447.6 40.7-70.5c1.9-3.2 21-29.7 2-59.1zM275 304.5l-115.5-200 L44 304.5z" />
                        </svg>
                    </a>
                    <a href="https://ddevsin.gumroad.com/l/ReadyFaster" target="_blank" rel="noreferrer" className="social-icon gr" title="Gumroad">
                        <svg fill="currentColor" width="18" height="18" viewBox="-6.5 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.656 22.844v-11.938c0-0.625 0.719-1.344 1.313-1.344h9.688c0.438 0.781 1.281 1.344 2.281 1.344 1.469 0 2.656-1.219 2.656-2.656 0-1.5-1.188-2.656-2.656-2.656-1 0-1.844 0.531-2.281 1.313h-9.688c-0.969 0-1.969 0.469-2.75 1.219-0.781 0.781-1.219 1.781-1.219 2.781v11.938c0 1 0.438 2 1.219 2.781 0.781 0.75 1.781 1.219 2.75 1.219h10.656c0.969 0 1.969-0.469 2.75-1.219 0.781-0.781 1.219-1.781 1.219-2.781v-6.625c0-1.094-0.438-2.125-1.25-2.875-0.75-0.719-1.75-1.125-2.719-1.125h-5.313c-1.063 0-2.063 0.438-2.844 1.25-0.719 0.75-1.156 1.75-1.156 2.75v1.313c0 1 0.438 2 1.219 2.75 0.781 0.781 1.781 1.25 2.781 1.25h0.344c0.469 0.781 1.313 1.313 2.313 1.313 1.469 0 2.656-1.188 2.656-2.656s-1.188-2.656-2.656-2.656c-1 0-1.844 0.531-2.313 1.344h-0.344c-0.625 0-1.344-0.75-1.344-1.344v-1.313c0-0.625 0.594-1.344 1.344-1.344h5.313c0.594 0 1.313 0.594 1.313 1.344v6.625c0 0.594-0.719 1.344-1.313 1.344h-10.656c-0.594 0-1.313-0.75-1.313-1.344z" />
                        </svg>
                    </a>
                </div>
            )}
        </div>
    );
}
