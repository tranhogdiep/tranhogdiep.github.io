import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three';
import { MainSceneManager } from '../three/mainScene';
import LoadingProgress from '../components/LoadingProgress';
import SlideShow from '../components/SlideShow';
import ProfileCard from '../components/ProfileCard';

export default function Home() {
    const canvasRef = useRef(null);
    const [sceneManager, setSceneManager] = useState(null);

    // Check URL parameter on mount
    const urlParams = new URLSearchParams(window.location.search);
    const hasArtworkParam = urlParams.has('artwork');

    const [init3D, setInit3D] = useState(!hasArtworkParam);
    const [isLoading, setIsLoading] = useState(!hasArtworkParam);
    const [loadProgress, setLoadProgress] = useState(0);
    const [showPortfolio, setShowPortfolio] = useState(hasArtworkParam);
    const [showProfile, setShowProfile] = useState(false);

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
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.has('artwork')) {
                    manager.zoomToPortfolio(2000);
                }
            },
            onOpenPortfolio: () => {
                setShowPortfolio(true);
            },
            onOpenProfile: () => {
                setShowProfile(true);
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
        setShowPortfolio(false);
        try {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('artwork');
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
        setShowProfile(false);
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
        </div>
    );
}
