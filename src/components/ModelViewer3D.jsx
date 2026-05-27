import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import * as THREE from 'three';
import './ModelViewer3D.css';

export default function ModelViewer3D() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    
    const [modelPath, setModelPath] = useState('/assets/blog/optimize3D/CSCDVN_Optimized_webp.glb');
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({ vertices: 0, triangles: 0 });
    const [autoRotate, setAutoRotate] = useState(true);

    const controlsRef = useRef(null);

    // Helpers to dispose Three.js objects
    const disposeMaterial = (material) => {
        material.dispose();
        // Check for maps and textures
        for (const key of Object.keys(material)) {
            const value = material[key];
            if (value && typeof value.dispose === 'function' && value instanceof THREE.Texture) {
                value.dispose();
            }
        }
    };

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight || 450;

        // 1. Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x18181c);

        // 2. Camera setup
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(3, 2, 4);

        // 3. Renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;

        // 4. Load HDRI environment map
        let envTexture = null;
        new RGBELoader().load('/assets/hdris/spruit_sunrise_1k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.needsUpdate = true;
            scene.environment = texture;
            envTexture = texture;
        }, undefined, (err) => {
            console.error("Error loading environment HDRI map:", err);
        });

        // Lights (Supplementary to HDRI environment light)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x2c2c35, 0.4);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight1.position.set(5, 10, 7);
        dirLight1.castShadow = true;
        dirLight1.shadow.mapSize.width = 1024;
        dirLight1.shadow.mapSize.height = 1024;
        dirLight1.shadow.camera.near = 0.5;
        dirLight1.shadow.camera.far = 25;
        dirLight1.shadow.bias = -0.0005;
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xaaccff, 0.2);
        dirLight2.position.set(-5, 5, -5);
        scene.add(dirLight2);

        // 5. Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 0.5;
        controls.maxDistance = 15;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 0.8;
        controlsRef.current = controls;

        // Grid/Floor helper for context
        const gridHelper = new THREE.GridHelper(10, 20, 0x44444c, 0x222228);
        gridHelper.position.y = -0.8;
        scene.add(gridHelper);

        // 6. Loader setup
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/assets/libs/gltf/');

        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        let loadedGroup = null;

        setLoading(true);
        setProgress(0);
        setError(null);

        loader.load(
            modelPath,
            (gltf) => {
                loadedGroup = gltf.scene;
                scene.add(loadedGroup);

                // Center & scale model to fit view nicely
                const box = new THREE.Box3().setFromObject(loadedGroup);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                // Reposition group so model center is at (0, 0, 0)
                loadedGroup.position.x = -center.x;
                // Place slightly above the grid floor
                loadedGroup.position.y = -center.y + 0.1;
                loadedGroup.position.z = -center.z;

                // Adjust grid height based on bottom boundary
                gridHelper.position.y = -size.y / 2;

                // Adjust shadow camera bounds if needed
                const maxDim = Math.max(size.x, size.y, size.z);
                
                // Count polycounts
                let totalVertices = 0;
                let totalTriangles = 0;
                loadedGroup.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        
                        const geom = child.geometry;
                        if (geom) {
                            const pos = geom.getAttribute('position');
                            if (pos) {
                                totalVertices += pos.count;
                            }
                            if (geom.index) {
                                totalTriangles += geom.index.count / 3;
                            } else if (pos) {
                                totalTriangles += pos.count / 3;
                            }
                        }
                    }
                });

                setStats({
                    vertices: totalVertices,
                    triangles: Math.round(totalTriangles)
                });

                // Position camera based on model size
                const fov = camera.fov * (Math.PI / 180);
                let cameraDist = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                cameraDist *= 1.35; // zoom out multiplier

                camera.position.set(cameraDist * 0.9, cameraDist * 0.4, cameraDist * 1.1);
                controls.target.set(0, 0, 0);
                controls.update();

                setLoading(false);
            },
            (xhr) => {
                if (xhr.total > 0) {
                    setProgress((xhr.loaded / xhr.total) * 100);
                } else {
                    setProgress((prev) => Math.min(prev + 5, 95));
                }
            },
            (err) => {
                console.error("Error loading model", err);
                setError("Error loading 3D asset model. Check the Draco decoder or the file path.");
                setLoading(false);
            }
        );

        // 7. Animation Loop
        let animationFrameId;
        const clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            
            // Sync autoRotate state
            if (controls) {
                controls.update();
            }
            
            renderer.render(scene, camera);
        };
        animate();

        // 8. Handle window resizing
        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight || 450;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', handleResize);

        // 9. Clean up on unmount or model path change
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);

            if (loadedGroup) {
                scene.remove(loadedGroup);
                loadedGroup.traverse((child) => {
                    if (child.isMesh) {
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) {
                            if (Array.isArray(child.material)) {
                                child.material.forEach(disposeMaterial);
                            } else {
                                disposeMaterial(child.material);
                            }
                        }
                    }
                });
            }

            scene.remove(gridHelper);
            gridHelper.geometry.dispose();
            gridHelper.material.dispose();

            if (envTexture) {
                envTexture.dispose();
            }

            renderer.dispose();
            dracoLoader.dispose();
            controls.dispose();
        };
    }, [modelPath]);

    // Handle auto rotate toggle
    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.autoRotate = autoRotate;
        }
    }, [autoRotate]);

    const isOptimized = modelPath.includes('Optimized');

    return (
        <div className="viewer-3d-wrapper" ref={containerRef}>
            <canvas ref={canvasRef} className="viewer-3d-canvas" />

            {/* Model stats overlay (glassmorphism) */}
            <div className="viewer-3d-overlay stats-panel">
                <div className="stats-header">Model Details</div>
                <div className="stats-row">
                    <span className="stats-label">Vertices:</span>
                    <span className="stats-value">{loading ? 'Counting...' : stats.vertices.toLocaleString()}</span>
                </div>
                <div className="stats-row">
                    <span className="stats-label">Triangles:</span>
                    <span className="stats-value">{loading ? 'Counting...' : stats.triangles.toLocaleString()}</span>
                </div>
                <div className="stats-row">
                    <span className="stats-label">File size:</span>
                    <span className="stats-value size-badge">
                        {isOptimized ? '4.82 MB (Optimized)' : '46.62 MB (Blender)'}
                    </span>
                </div>
            </div>

            {/* Control controls overlays */}
            <div className="viewer-3d-overlay controls-panel">
                <button 
                    className={`control-btn ${autoRotate ? 'active' : ''}`}
                    onClick={() => setAutoRotate(!autoRotate)}
                    title="Toggle Auto Rotate"
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                    </svg>
                    <span>Auto Rotate</span>
                </button>
                <div className="interaction-tips">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                    Drag to rotate • Pinch/Scroll to zoom
                </div>
            </div>

            {/* Model Selector Bar */}
            <div className="viewer-3d-overlay model-selector">
                <button
                    className={`selector-tab ${!isOptimized ? 'active' : ''}`}
                    onClick={() => setModelPath('/assets/blog/optimize3D/CSCDVN_Draco.glb')}
                    disabled={loading && !isOptimized}
                >
                    Blender Draco (46.62 MB)
                </button>
                <button
                    className={`selector-tab ${isOptimized ? 'active' : ''}`}
                    onClick={() => setModelPath('/assets/blog/optimize3D/CSCDVN_Optimized_webp.glb')}
                    disabled={loading && isOptimized}
                >
                    Fully Optimized (4.82 MB)
                </button>
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="viewer-loading-screen">
                    <div className="viewer-loader"></div>
                    <div className="viewer-loading-text">
                        Loading Asset: {Math.round(progress)}%
                    </div>
                </div>
            )}

            {/* Error screen */}
            {error && (
                <div className="viewer-error-screen">
                    <div className="error-icon">⚠️</div>
                    <div className="error-msg">{error}</div>
                </div>
            )}
        </div>
    );
}
