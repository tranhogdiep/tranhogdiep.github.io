import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';

export class DragonARSceneManager {
    constructor(canvas, callbacks) {
        this.canvas = canvas;
        this.callbacks = callbacks || {}; // { onLoaded }

        this._scene = null;
        this._camera = null;
        this._renderer = null;
        this.controls = null;
        this.mixer = null;
        this.animations = null;
        this.controller = null;
        this.reticle = null;
        this.dragonMesh = null;
        this.arButtonElement = null;

        this.hitTestSource = null;
        this.hitTestSourceRequested = false;

        this._clock = new THREE.Clock();
        this._scrollYMaterials = [];
        this._scrollXMaterials = [];

        this.init();
    }

    init() {
        this._scene = new THREE.Scene();
        this._scene.background = null;

        const width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
        const height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;

        this._camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 10000);
        this._camera.rotation.set(-0.27, 0, 0);
        this._camera.position.set(3, 3, 5);
        this._camera.lookAt(this._scene.position);
        this._scene.add(this._camera);

        this._renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this._renderer.toneMappingExposure = 1;
        this._renderer.setSize(width, height);
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this._renderer.xr.enabled = true;

        this.createLights();

        this.controls = new OrbitControls(this._camera, this._renderer.domElement);
        this.controls.enableDamping = true;

        this.onWindowResizeBound = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.onWindowResizeBound, false);

        this.loadModels();

        this.animateBound = this.update.bind(this);
        this._renderer.setAnimationLoop(this.animateBound);
    }

    createLights() {
        const light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(4, 10, -6);
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.0001;
        light.shadow.camera.far = 20;
        light.shadow.camera.top = 3;
        light.shadow.camera.bottom = -3;
        light.shadow.camera.left = -3;
        light.shadow.camera.right = 3;
        this._scene.add(light);

        // Load HDR Env
        new RGBELoader().load('/assets/images/shanghai_bund_1k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.needsUpdate = true;
            this._scene.environment = texture;
        });
    }

    loadModels() {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/assets/libs/gltf/');
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        loader.load('/assets/demo/icy_dragon.glb', (gltf) => {
            gltf.scene.name = "dragon";
            
            // Adjust materials & shadows
            const mesh = gltf.scene.getObjectByName("Object_17", true);
            if (mesh && mesh.material) {
                mesh.material.emissiveIntensity = 50;
            }

            this._scene.add(gltf.scene);
            gltf.scene.scale.set(0.01, 0.01, 0.01);
            this.dragonMesh = gltf.scene;

            gltf.scene.traverse((child) => {
                child.layers.enable(1);
                if (child.type === "Mesh" || child.type === "SkinnedMesh") {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    this.checkObjectsType(child);
                }
            });

            // Set up animation mixer
            this.mixer = new THREE.AnimationMixer(gltf.scene);
            this.animations = gltf.animations;
            if (this.animations && this.animations.length > 0) {
                const runAction = this.mixer.clipAction(this.animations[0]);
                runAction.play();
            }

            // Set up ground shadow receiver
            const groundPlane = new THREE.Mesh(
                new THREE.PlaneGeometry(7, 7),
                new THREE.ShadowMaterial({ opacity: 0.5 })
            );
            groundPlane.receiveShadow = true;
            groundPlane.rotation.x = -Math.PI / 2;
            this.dragonMesh.add(groundPlane);

            // WebXR Setup
            this.arButtonElement = ARButton.createButton(this._renderer, { requiredFeatures: ['hit-test'] });
            if (this.canvas.parentElement) {
                this.canvas.parentElement.appendChild(this.arButtonElement);
            } else {
                document.body.appendChild(this.arButtonElement);
            }

            this.controller = this._renderer.xr.getController(0);
            this.controller.addEventListener('select', () => this.onSelect());
            this._scene.add(this.controller);

            // Reticle for hit-test target indicator
            this.reticle = new THREE.Mesh(
                new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2),
                new THREE.MeshBasicMaterial()
            );
            this.reticle.matrixAutoUpdate = false;
            this.reticle.visible = false;
            this._scene.add(this.reticle);

            // Dispose loaders
            dracoLoader.dispose();

            if (this.callbacks.onLoaded) {
                this.callbacks.onLoaded();
            }
        });
    }

    checkObjectsType(child) {
        if (child.material && child.material.userData) {
            if (child.material.userData.scrollY) {
                this._scrollYMaterials.push(child.material);
            }
            if (child.material.userData.scrollX) {
                this._scrollXMaterials.push(child.material);
            }
            if (child.material.userData.addBlend) {
                child.material.blending = THREE.AdditiveBlending;
            }
        }
        if (child.userData && child.userData.renderOrder) {
            child.renderOrder = child.userData.renderOrder;
        }
    }

    onSelect() {
        if (this.reticle && this.reticle.visible && this.dragonMesh) {
            const tempScale = new THREE.Vector3();
            this.reticle.matrix.decompose(this.dragonMesh.position, this.dragonMesh.quaternion, tempScale);
            this.dragonMesh.visible = true;
        }
    }

    update(timestamp, frame) {
        const delta = this._clock.getDelta();

        if (this.controls) {
            this.controls.update();
        }

        // Texture scrolling animation
        this._scrollYMaterials.forEach(mat => {
            if (mat.emissiveMap) mat.emissiveMap.offset.y += mat.userData.scrollY;
        });
        this._scrollXMaterials.forEach(mat => {
            if (mat.emissiveMap) mat.emissiveMap.offset.x += mat.userData.scrollX;
        });

        // WebXR Hit Testing
        if (frame) {
            const referenceSpace = this._renderer.xr.getReferenceSpace();
            const session = this._renderer.xr.getSession();

            if (this.hitTestSourceRequested === false) {
                session.requestReferenceSpace('viewer').then((refSpace) => {
                    session.requestHitTestSource({ space: refSpace }).then((source) => {
                        this.hitTestSource = source;
                    });
                });

                session.addEventListener('end', () => {
                    this.hitTestSourceRequested = false;
                    this.hitTestSource = null;
                });

                this.hitTestSourceRequested = true;
            }

            if (this.hitTestSource) {
                const hitTestResults = frame.getHitTestResults(this.hitTestSource);
                if (hitTestResults.length && this.reticle) {
                    const hit = hitTestResults[0];
                    this.reticle.visible = true;
                    this.reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
                } else if (this.reticle) {
                    this.reticle.visible = false;
                }
            }
        }

        // Mixer animation update
        if (this.mixer) {
            this.mixer.update(delta);
        }

        this._renderer.render(this._scene, this._camera);
    }

    onWindowResize() {
        const width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
        const height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setSize(width, height);
    }

    destroy() {
        this._renderer.setAnimationLoop(null);
        window.removeEventListener('resize', this.onWindowResizeBound);

        if (this.arButtonElement) {
            this.arButtonElement.remove();
        }

        // Clean up geometries & materials
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
