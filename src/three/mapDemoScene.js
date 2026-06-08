import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export class MapDemoSceneManager {
    constructor(canvas, callbacks) {
        this.canvas = canvas;
        this.callbacks = callbacks || {}; // { onLoaded }

        this._scene = null;
        this._camera = null;
        this._renderer = null;
        this._composer = null;
        this._renderPass = null;
        this._bloomPass = null;
        this._outputPass = null;
        this.controls = null;
        this.model = null;

        this.clock = new THREE.Clock();
        this.routePlaneMesh = null;
        this.animBuildingMesh = null;
        this.routeSpeed = 1.0;

        this.buildingUvCenterX = 0.545;
        this.buildingUvCenterY = 0.445;
        this.buildingMinScale = 10;
        this.buildingMaxScale = 0.0;

        this.circleMainMesh = null;
        this.circleRotationSpeed = 1.0;

        this.init();
    }

    init() {
        this._scene = new THREE.Scene();

        const width = (this.canvas.parentElement && this.canvas.parentElement.clientWidth) || window.innerWidth;
        const height = (this.canvas.parentElement && this.canvas.parentElement.clientHeight) || window.innerHeight;

        this._camera = new THREE.PerspectiveCamera(90, width / height, 0.25, 2000);
        this._camera.position.set(0, 120, 100);

        const light = new THREE.AmbientLight(0x404040); // soft white light
        this._scene.add(light);

        this._renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._renderer.setSize(width, height);
        this._renderer.toneMapping = THREE.NeutralToneMapping;
        this._renderer.toneMappingExposure = 1.7;

        // Postprocessing
        this._composer = new EffectComposer(this._renderer);
        this._renderPass = new RenderPass(this._scene, this._camera);
        // Setup UnrealBloomPass (resolution, strength, radius, threshold)
        this._bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height),
            0.2,   // strength
            0.1,   // radius
            0.7   // threshold
        );
        this._outputPass = new OutputPass();

        this._composer.addPass(this._renderPass);
        this._composer.addPass(this._bloomPass);
        this._composer.addPass(this._outputPass);

        this.controls = new OrbitControls(this._camera, this._renderer.domElement);
        this.controls.addEventListener('change', () => this.render());
        this.controls.minDistance = 20;
        this.controls.maxDistance = 300;
        this.controls.target.set(0, 50, 0);
        this.controls.enableDamping = true;
        this.controls.enablePan = false;
        this.controls.minPolarAngle = Math.PI / 8;
        this.controls.maxPolarAngle = Math.PI / 1.8;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.1;
        this.controls.update();

        this.onWindowResizeBound = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.onWindowResizeBound, false);

        this.loadEnvAndModel();
    }

    loadEnvAndModel() {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/assets/libs/gltf/');

        new RGBELoader()
            .setPath('/assets/images/')
            .load('blouberg_sunrise_2_1k.hdr', (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                this._scene.environment = texture;
                this.render();

                // Load 3D map model
                const gltfLoader = new GLTFLoader();
                gltfLoader.setPath('/assets/blog/demoMap/models/');
                gltfLoader.setDRACOLoader(dracoLoader);

                gltfLoader.load('mapdemo.glb', async (gltf) => {
                    this.model = gltf.scene;

                    // Compile async for smooth addition to scene
                    await this._renderer.compileAsync(this.model, this._camera, this._scene);
                    this._scene.add(this.model);

                    // Find Plane mesh representing the road path
                    this.routePlaneMesh = null;
                    this.animBuildingMesh = null;
                    this.model.traverse((child) => {
                        if (child.isMesh && child.name === 'Plane') {
                            this.routePlaneMesh = child;

                            // Setup texture wrapping for repeating animation
                            const mats = Array.isArray(child.material) ? child.material : [child.material];
                            mats.forEach(mat => {
                                ['map', 'emissiveMap', 'alphaMap', 'normalMap', 'roughnessMap', 'metalnessMap'].forEach(mapName => {
                                    if (mat[mapName]) {
                                        mat[mapName].wrapS = THREE.RepeatWrapping;
                                        mat[mapName].wrapT = THREE.RepeatWrapping;
                                    }
                                });
                                mat.transparent = true;
                                mat.depthWrite = true;
                            });
                        }

                        if (child.isMesh && child.name === 'GroundBuilding_Highlight') {
                            this.animBuildingMesh = child;

                            // Clone material to avoid affecting other buildings sharing the material
                            if (child.material) {
                                child.material = child.material.clone();
                            }

                            const mats = Array.isArray(child.material) ? child.material : [child.material];
                            mats.forEach(mat => {
                                ['map', 'emissiveMap', 'alphaMap', 'normalMap', 'roughnessMap', 'metalnessMap'].forEach(mapName => {
                                    if (mat[mapName]) {
                                        mat[mapName].center.set(this.buildingUvCenterX, this.buildingUvCenterY);
                                        mat[mapName].wrapS = THREE.ClampToEdgeWrapping;
                                        mat[mapName].wrapT = THREE.ClampToEdgeWrapping;
                                    }
                                });
                            });
                        }

                        if (child.isMesh && child.name === 'CircleMain') {
                            this.circleMainMesh = child;

                            if (child.material) {
                                child.material = child.material.clone();
                            }

                            const mats = Array.isArray(child.material) ? child.material : [child.material];
                            mats.forEach(mat => {
                                ['map', 'emissiveMap', 'alphaMap', 'normalMap', 'roughnessMap', 'metalnessMap'].forEach(mapName => {
                                    if (mat[mapName]) {
                                        mat[mapName].center.set(0.5, 0.5);
                                    }
                                });
                            });
                        }

                        if (child.name === 'GroundBuilding') {
                            console.log('GroundBuilding', child);
                            for (let i = 0; i < child.children.length; i++) {
                                const mesh = child.children[i];
                                mesh.material.color.setHex(0xaaaaaa);
                            }
                        }
                    });

                    dracoLoader.dispose();
                    this.render();

                    if (this.callbacks.onLoaded) {
                        this.callbacks.onLoaded();
                    }
                }, undefined, (err) => console.error("Error loading mapdemo.glb", err));
            });
    }



    setBuildingCenter(x, y) {
        this.buildingUvCenterX = x;
        this.buildingUvCenterY = y;
        if (this.animBuildingMesh && this.animBuildingMesh.material) {
            const mats = Array.isArray(this.animBuildingMesh.material) ? this.animBuildingMesh.material : [this.animBuildingMesh.material];
            mats.forEach(mat => {
                ['map', 'emissiveMap', 'alphaMap', 'normalMap', 'roughnessMap', 'metalnessMap'].forEach(mapName => {
                    if (mat[mapName]) {
                        mat[mapName].center.set(x, y);
                    }
                });
            });
        }
    }

    setBuildingMinScale(val) {
        this.buildingMinScale = val;
    }

    setBuildingMaxScale(val) {
        this.buildingMaxScale = val;
    }

    setCircleRotationSpeed(val) {
        this.circleRotationSpeed = val;
    }

    render() {
        const elapsed = this.clock.getElapsedTime();

        if (this.routePlaneMesh && this.routePlaneMesh.material) {
            const mats = Array.isArray(this.routePlaneMesh.material) ? this.routePlaneMesh.material : [this.routePlaneMesh.material];
            mats.forEach(mat => {
                ['map', 'emissiveMap', 'alphaMap'].forEach(mapName => {
                    if (mat[mapName]) {
                        // Increment offset over time. Multiplied by 0.5 to keep speed natural
                        mat[mapName].offset.y = -(elapsed * this.routeSpeed * 0.5);
                    }
                });
            });
        }

        if (this.animBuildingMesh && this.animBuildingMesh.material) {
            const duration = 5.0; // Cycle duration in seconds
            const t = (elapsed * this.routeSpeed / duration) % 1.0; // Sawtooth progress (0.0 to 1.0)
            const scale = this.buildingMaxScale - t * (this.buildingMaxScale - this.buildingMinScale);

            const mats = Array.isArray(this.animBuildingMesh.material) ? this.animBuildingMesh.material : [this.animBuildingMesh.material];
            mats.forEach(mat => {
                ['map', 'emissiveMap', 'alphaMap', 'normalMap', 'roughnessMap', 'metalnessMap'].forEach(mapName => {
                    if (mat[mapName]) {
                        mat[mapName].repeat.set(scale, scale);
                    }
                });
            });
        }

        if (this.circleMainMesh && this.circleMainMesh.material) {
            const mats = Array.isArray(this.circleMainMesh.material) ? this.circleMainMesh.material : [this.circleMainMesh.material];
            mats.forEach(mat => {
                ['map', 'emissiveMap', 'alphaMap', 'normalMap', 'roughnessMap', 'metalnessMap'].forEach(mapName => {
                    if (mat[mapName]) {
                        mat[mapName].rotation = elapsed * this.circleRotationSpeed;
                    }
                });
            });
        }

        if (this._composer) {
            this._composer.render();
        } else if (this._renderer && this._scene && this._camera) {
            this._renderer.render(this._scene, this._camera);
        }
    }

    onWindowResize() {
        const width = (this.canvas.parentElement && this.canvas.parentElement.clientWidth) || window.innerWidth;
        const height = (this.canvas.parentElement && this.canvas.parentElement.clientHeight) || window.innerHeight;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
        if (this._composer) {
            this._composer.setSize(width, height);
        }
        this.render();
    }

    destroy() {
        window.removeEventListener('resize', this.onWindowResizeBound);

        if (this.controls) {
            this.controls.dispose();
        }

        this._scene.traverse((object) => {
            if (!object.isMesh) return;
            object.geometry.dispose();

            if (object.material.isMaterial) {
                object.material.dispose();
            } else {
                for (const material of object.material) {
                    material.dispose();
                }
            }
        });

        this._renderer.dispose();
    }
}
