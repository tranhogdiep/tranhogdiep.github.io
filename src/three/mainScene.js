import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import * as TWEEN from 'three/addons/libs/tween.module.js';

export class MainSceneManager {
    constructor(canvas, callbacks) {
        this.canvas = canvas;
        this.callbacks = callbacks || {}; // { onOpenPortfolio, onOpenProfile, onLoaded }

        this.ismouseDown = false;
        this.isDrag = false;
        this.isChangingMode = false;
        this.hiding = false;

        this.currentHighlightBook = null;
        this._scrollYMaterials = [];
        this._scrollXMaterials = [];

        this.mainScene = null;
        this.effectOpen = null;
        this.effectStand = null;
        this.effectStandBook = null;
        this.effectOpenTween = null;
        this.effectStandTween = null;

        this.openPorTween = null;
        this.openPorTweenUI = null;
        this.openMenuTween = null;
        this.openMenuTweenUI = null;

        this.openPos = new THREE.Vector3();
        this.cameraTermPos = new THREE.Vector3();
        this.cameraTermRot = new THREE.Quaternion();
        this.cameraOldRot = new THREE.Quaternion();

        this.mousePos = new THREE.Vector2(0, window.innerWidth);
        this.rayMousePos = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.raycaster.layers.set(1);

        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this._clock = new THREE.Clock(true);
        this._deltaTime = 0;
        this._elapTime = 0;

        this._scene = null;
        this._camera = null;
        this._renderer = null;
        this._composer = null;
        this._renderPass = null;
        this._bloomPass = null;
        this._outlinePass = null;
        this._outputPass = null;

        this.init();
    }

    init() {
        this._scene = new THREE.Scene();
        this._scene.background = null;

        this._camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
        this._camera.rotation.set(-0.27, 0, 0);
        this._camera.position.set(0, 0.6, 2.07);
        this.cameraTermPos.copy(this._camera.position);
        this._camera.lookAt(this._scene.position);
        this._scene.add(this._camera);

        this._renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, alpha: true });
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this._renderer.toneMappingExposure = 1;
        this._renderer.info.autoReset = false;
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.createLights();

        // Bind events
        this.onWindowResizeBound = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.onWindowResizeBound, false);

        this.onTouchStartBound = this.onTouchStart.bind(this);
        this.onTouchMoveBound = this.onTouchMove.bind(this);
        this.onTouchEndBound = this.onTouchEnd.bind(this);
        this.onDocumentMouseMoveBound = this.onDocumentMouseMove.bind(this);
        this.onDocumentMouseDownBound = this.onDocumentMouseDown.bind(this);
        this.onDocumentMouseUpBound = this.onDocumentMouseUp.bind(this);

        if (window.matchMedia("(pointer: coarse)").matches) {
            this.canvas.addEventListener('touchstart', this.onTouchStartBound, { passive: true });
            this.canvas.addEventListener('touchmove', this.onTouchMoveBound, { passive: true });
            this.canvas.addEventListener('touchend', this.onTouchEndBound, { passive: true });
        } else {
            this.canvas.addEventListener('pointermove', this.onDocumentMouseMoveBound, false);
            this.canvas.addEventListener('pointerdown', this.onDocumentMouseDownBound, false);
            this.canvas.addEventListener('pointerup', this.onDocumentMouseUpBound, false);
        }

        // Postprocessing
        this._composer = new EffectComposer(this._renderer);
        this._renderPass = new RenderPass(this._scene, this._camera);
        this._bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.2, 0.3, 0.9);

        this._outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), this._scene, this._camera);
        this._outlinePass.hiddenEdgeColor.set('#1aff47');
        this._outlinePass.edgeStrength = 8;
        this._outlinePass.visibleEdgeColor.set('#1aff47');

        this._outputPass = new OutputPass();

        this._composer.addPass(this._renderPass);
        this._composer.addPass(this._outlinePass);
        this._composer.addPass(this._bloomPass);
        this._composer.addPass(this._outputPass);

        // Animation Loop
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
        light.shadow.bias = -0.0002;
        this._scene.add(light);

        const spotLight = new THREE.SpotLight(0xffffff, 150);
        spotLight.position.set(0, 5, 0);
        spotLight.castShadow = true;
        spotLight.angle = 0.2;
        spotLight.penumbra = 0.4;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 5;
        spotLight.shadow.camera.far = 10;
        spotLight.shadow.bias = -0.0005;
        this._scene.add(spotLight);

        // Load HDR environment map (Note path change to absolute/public root /assets)
        new RGBELoader().load('/assets/images/shanghai_bund_1k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.needsUpdate = true;
            this._scene.environment = texture;
        });
    }

    addObjectToScene(object) {
        this._scene.add(object);
        if (object.name === "effectOpen") {
            this.effectOpen = object;
        } else if (object.name === "effectStand") {
            this.effectStand = object;
        } else if (object.name === "mainscene") {
            this.mainScene = object;
            object.traverse((child) => {
                if (child.name === "StandBook") {
                    this.effectStandBook = child;
                } else if (child.name === "BookOpen") {
                    this.openPos = new THREE.Vector3();
                    child.getWorldPosition(this.openPos);
                }
            });
        }

        if (this.effectOpen != null && this.effectStand != null && this.mainScene != null) {
            if (this.callbacks.onLoaded) {
                this.callbacks.onLoaded();
            }
        }
    }

    addScrollYMat(mat) {
        this._scrollYMaterials.push(mat);
    }

    addScrollXMat(newmat) {
        if (!this._scrollXMaterials.some(mat => mat.id === newmat.id)) {
            this._scrollXMaterials.push(newmat);
        }
    }

    update() {
        if (this.hiding) return;
        this._deltaTime = this._clock.getDelta();

        this._scrollYMaterials.forEach(mat => {
            if (mat.emissiveMap) {
                mat.emissiveMap.offset.y += mat.userData.scrollY;
            }
        });
        this._scrollXMaterials.forEach(mat => {
            if (mat.emissiveMap) {
                mat.emissiveMap.offset.x += mat.userData.scrollX;
            }
        });

        if (this.isChangingMode === false) {
            this.cameraTermPos.x += (((this.mousePos.x - this.windowHalfX) / 800) - this.cameraTermPos.x) * .05;
            this.cameraTermPos.y += (-((this.mousePos.y - this.windowHalfY) / 200) - this.cameraTermPos.y) * .05;
            this.cameraTermPos.z = this._camera.position.z;
            this._camera.position.lerp(this.cameraTermPos, 0.1);
            if (this._camera.position.y < 0.6) {
                this._camera.position.y = 0.6;
            }
            this.cameraOldRot.copy(this._camera.quaternion);
            this._camera.lookAt(this._scene.position);
            this._camera.updateProjectionMatrix();

            this.cameraTermRot.copy(this._camera.quaternion);
            this._camera.quaternion.copy(this.cameraOldRot);
            this._camera.quaternion.slerp(this.cameraTermRot, 0.1);

            this.raycaster.setFromCamera(this.rayMousePos, this._camera);
            const intersects = this.raycaster.intersectObject(this._scene, true);
            if (intersects.length > 0) {
                const selectedObject = intersects[0].object;
                if (selectedObject.parent.name === "BookOpen" || selectedObject.parent.name === "BookStand") {
                    this.highlightBook(selectedObject);
                } else {
                    this.removeSelectedObject();
                }
            } else {
                this.removeSelectedObject();
            }
        }

        this._elapTime = this._clock.getElapsedTime();
        if (!document.hidden) {
            TWEEN.update();
        }

        this._composer.render();
    }

    onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._composer.setSize(window.innerWidth, window.innerHeight);
    }

    onTouchStart(event) {
        this.ismouseDown = true;
    }

    onTouchMove(event) {
        this.mousePos.x = event.changedTouches[0].clientX;
        this.mousePos.y = event.changedTouches[0].clientY;

        this.rayMousePos.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
        this.rayMousePos.y = - (event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
    }

    onTouchEnd(event) {
        this.ismouseDown = false;
        this.rayMousePos.x = (event.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
        this.rayMousePos.y = - (event.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
        this.checkSelectBook();
    }

    onDocumentMouseMove(event) {
        this.mousePos.x = event.clientX;
        this.mousePos.y = event.clientY;

        this.rayMousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.rayMousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }

    onDocumentMouseDown(event) {
        this.ismouseDown = true;
    }

    onDocumentMouseUp(event) {
        this.rayMousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.rayMousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.checkSelectBook();
        this.ismouseDown = false;
        this.isDrag = false;
    }

    checkSelectBook() {
        this.raycaster.setFromCamera(this.rayMousePos, this._camera);
        const intersects = this.raycaster.intersectObject(this._scene, true);
        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            if (selectedObject.parent.name === "BookOpen") {
                this.highlightBook(selectedObject);
                this.stopAllTween();
                this.isChangingMode = true;
                let oldRot = this._camera.quaternion.clone();
                this._camera.lookAt(this.openPos);
                this._camera.updateProjectionMatrix();
                let newRot = this._camera.quaternion.clone();
                this._camera.quaternion.copy(oldRot);

                // Start transition zoom in to portfolio
                this.openPorTween = new TWEEN.Tween({ t: 30 }).to({ t: 0 }, 2000).easing(TWEEN.Easing.Back.In).onUpdate((value) => {
                    this._camera.fov = value.t;
                    this._camera.quaternion.slerp(newRot, 0.1);
                    this._camera.updateProjectionMatrix();
                }).start().onComplete(() => {
                    if (this.callbacks.onOpenPortfolio) {
                        this.callbacks.onOpenPortfolio(); // Báo React mở Portfolio
                    }
                    this.hiding = true; // Stop rendering three scene to save CPU/GPU while in Portfolio
                });
            } else if (selectedObject.parent.name === "BookStand") {
                if (this.callbacks.onOpenProfile) {
                    this.callbacks.onOpenProfile(); // Báo React mở Profile
                }
            }
        }
    }

    showMenu() {
        this.stopAllTween();
        this.hiding = false;
        this.isChangingMode = true;

        this.openMenuTweenUI = new TWEEN.Tween({ t: 0 }).to({ t: 30 }, 2000).easing(TWEEN.Easing.Back.Out).onUpdate((value) => {
            this._camera.fov = value.t;
            this._camera.updateProjectionMatrix();
        }).start().onComplete(() => {
            this.isChangingMode = false;
        });
    }

    highlightBook(selectedObject) {
        if (selectedObject.parent.name === "BookOpen") {
            if (this.currentHighlightBook && this.currentHighlightBook.name === selectedObject.parent.name) {
                return;
            }
            this.removeSelectedObject();
            this.currentHighlightBook = selectedObject.parent;
            this.addSelectedObject(selectedObject.parent);
            if (this.effectOpen) {
                this.effectOpen.visible = true;

                if (this.effectOpenTween == null) {
                    this.effectOpen.traverse((child) => {
                        if (child.type === "Mesh") {
                            child.material.opacity = 0;
                        }
                    });
                    this.effectOpenTween = new TWEEN.Tween({ t: 0 }).to({ t: 1 }, 2000).start().onComplete(() => {
                        this.effectOpenTween = null;
                    }).onUpdate((value) => {
                        this.effectOpen.traverse((child) => {
                            if (child.type === "Mesh") {
                                child.material.opacity = value.t;
                            }
                        });
                    });
                }
            }
        } else if (selectedObject.parent.name === "BookStand") {
            if (this.currentHighlightBook && this.currentHighlightBook.name === selectedObject.parent.name) {
                return;
            }

            this.removeSelectedObject();
            this.currentHighlightBook = selectedObject.parent;

            if (this.effectStand) {
                this.effectStand.visible = true;
                if (this.effectStandTween == null) {
                    this.effectStand.traverse((child) => {
                        if (child.type === "Mesh") {
                            child.material.opacity = 0;
                        }
                    });
                    if (this.effectStandBook) {
                        this.effectStandBook.material.emissiveIntensity = 0;
                    }
                    this.effectStandTween = new TWEEN.Tween({ t: 0 }).to({ t: 1 }, 1000).start().onComplete(() => {
                        this.effectStandTween = null;
                    }).onUpdate((value) => {
                        if (this.effectStandBook) {
                            this.effectStandBook.material.emissiveIntensity = value.t * 50;
                        }
                        this.effectStand.traverse((child) => {
                            if (child.type === "Mesh") {
                                child.material.opacity = value.t;
                            }
                        });
                    });
                }
            }
            this.addSelectedObject(selectedObject.parent);
        }
    }

    addSelectedObject(object) {
        if (object) {
            this._outlinePass.selectedObjects = object.children;
        } else {
            this._outlinePass.selectedObjects = [];
        }
    }

    removeSelectedObject() {
        if (this.effectOpen) {
            this.effectOpen.visible = false;
        }
        if (this.effectOpenTween) {
            this.effectOpenTween.stop();
            this.effectOpenTween = null;
        }
        if (this.effectStand) {
            this.effectStand.visible = false;
        }
        if (this.effectStandBook) {
            this.effectStandBook.material.emissiveIntensity = 0;
        }
        if (this.effectStandTween) {
            this.effectStandTween.stop();
            this.effectStandTween = null;
        }
        this.addSelectedObject(null);
        this.currentHighlightBook = null;
    }

    stopAllTween() {
        if (this.openMenuTween) this.openMenuTween.stop();
        if (this.openMenuTweenUI) this.openMenuTweenUI.stop();
        if (this.openPorTween) this.openPorTween.stop();
        if (this.openPorTweenUI) this.openPorTweenUI.stop();
    }

    destroy() {
        this.stopAllTween();
        this._renderer.setAnimationLoop(null);
        window.removeEventListener('resize', this.onWindowResizeBound);

        if (window.matchMedia("(pointer: coarse)").matches) {
            this.canvas.removeEventListener('touchstart', this.onTouchStartBound);
            this.canvas.removeEventListener('touchmove', this.onTouchMoveBound);
            this.canvas.removeEventListener('touchend', this.onTouchEndBound);
        } else {
            this.canvas.removeEventListener('pointermove', this.onDocumentMouseMoveBound);
            this.canvas.removeEventListener('pointerdown', this.onDocumentMouseDownBound);
            this.canvas.removeEventListener('pointerup', this.onDocumentMouseUpBound);
        }

        // Clean up geometries, materials, textures, renderer
        this._scene.traverse((object) => {
            if (!object.isMesh) return;
            object.geometry.dispose();

            if (object.material.isMaterial) {
                this.cleanMaterial(object.material);
            } else {
                for (const material of object.material) {
                    this.cleanMaterial(material);
                }
            }
        });

        this._renderer.dispose();
    }

    cleanMaterial(material) {
        material.dispose();
        for (const key of Object.keys(material)) {
            const value = material[key];
            if (value && typeof value.dispose === 'function') {
                value.dispose();
            }
        }
    }
}
