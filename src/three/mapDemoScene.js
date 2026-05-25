import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export class MapDemoSceneManager {
    constructor(canvas, callbacks) {
        this.canvas = canvas;
        this.callbacks = callbacks || {}; // { onLoaded }

        this._scene = null;
        this._camera = null;
        this._renderer = null;
        this.controls = null;
        this.model = null;

        this.init();
    }

    init() {
        this._scene = new THREE.Scene();

        this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 2000);
        this._camera.position.set(-150, 120, 150);

        const light = new THREE.AmbientLight(0x404040); // soft white light
        this._scene.add(light);

        this._renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this._renderer.toneMappingExposure = 1;

        this.controls = new OrbitControls(this._camera, this._renderer.domElement);
        this.controls.addEventListener('change', () => this.render());
        this.controls.minDistance = 50;
        this.controls.maxDistance = 1000;
        this.controls.target.set(0, 0, -0.2);
        this.controls.enableDamping = true;
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
                gltfLoader.setPath('/assets/map3d/');
                gltfLoader.setDRACOLoader(dracoLoader);

                gltfLoader.load('mapdemo.glb', async (gltf) => {
                    this.model = gltf.scene;

                    // Compile async for smooth addition to scene
                    await this._renderer.compileAsync(this.model, this._camera, this._scene);
                    this._scene.add(this.model);

                    dracoLoader.dispose();
                    this.render();

                    if (this.callbacks.onLoaded) {
                        this.callbacks.onLoaded();
                    }
                }, undefined, (err) => console.error("Error loading mapdemo.glb", err));
            });
    }

    render() {
        if (this._renderer && this._scene && this._camera) {
            this._renderer.render(this._scene, this._camera);
        }
    }

    onWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
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
