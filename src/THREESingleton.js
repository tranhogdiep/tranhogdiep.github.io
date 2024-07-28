import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
// import { NodeToyMaterial } from "@nodetoy/three-nodetoy";


import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import * as TWEEN from 'three/addons/libs/tween.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

var currentHighlightBook;
var _scrollYMaterials = [];
var _scrollXMaterials = [];

var effectOpen;
var effectStand;
var effectStandBook;
var effectOpenTween;
var effectStandTween;

var mousePos = new THREE.Vector2();
var rayMousePos = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
raycaster.layers.set(1);

let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

var _stats;
var _clock;
var _deltaTime;
var _elapTime;

var _gui;

var _scene;
var _camera;
var _renderer;

var _updateFunctions = [];

var _contentData;

var _composer;
var _gtaoPass;
var _outputPass;
var _renderPass;
var _fxaaPass;
var _bloomPass;
var _outlinePass;

var _debugDiv;
var controls;

var renderSettings = {
    fxaa: true
}
var aoParameters = {
    radius: 0.44,
    distanceExponent: 2.38,
    thickness: 6,
    scale: 10,
    samples: 16,
    distanceFallOff: 0.1,
    screenSpaceRadius: true,
};
var pdParameters = {
    lumaPhi: 10.,
    depthPhi: 2.,
    normalPhi: 3.,
    radius: 4.,
    radiusExponent: 1.,
    rings: 2.,
    samples: 16,
};
var outlineParams = {
    edgeStrength: 3.0,
    edgeGlow: 0.0,
    edgeThickness: 3.0,
    pulsePeriod: 0,
    rotate: false,
    usePatternTexture: false
};

export function Init() {
    _stats = new Stats()
    document.body.appendChild(_stats.dom)

    _gui = new GUI();

    _clock = new THREE.Clock(true);
    _deltaTime = _clock.getDelta();
    _elapTime = 0;

    _scene = new THREE.Scene()
    _scene.background = null;
    // _scene.fog = new THREE.FogExp2( 0xbaeef5, 0.0005 );

    _camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000)
    _camera.rotation.set(-0.27, 0, 0);
    _camera.position.set(0, 0.91, 2.07);
    _scene.add(_camera);
    console.log(_camera);

    _renderer = new THREE.WebGLRenderer({ antialias: false });
    _renderer.toneMapping = THREE.ACESFilmicToneMapping;
    _renderer.toneMappingExposure = 0.5;
    _renderer.setPixelRatio(window.devicePixelRatio * 1);
    _renderer.info.autoReset = false;
    _renderer.setSize(window.innerWidth, window.innerHeight);
    _renderer.shadowMap.enabled = true;
    _renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    console.log("777");
    CreateLights();

    // controls = new OrbitControls( _camera, _renderer.domElement );

    _renderer.setAnimationLoop(() => {
        _deltaTime = _clock.getDelta();

        _scrollYMaterials.forEach(mat => {
            mat.emissiveMap.offset.y += mat.userData.scrollY;
        });
        _scrollXMaterials.forEach(mat => {
            mat.emissiveMap.offset.x += mat.userData.scrollX;
        });

        _camera.position.x += (((mousePos.x - windowHalfX) / 800) - _camera.position.x) * .05;
        _camera.position.y += (-((mousePos.y - windowHalfY) / 200) - _camera.position.y) * .05;
        if (_camera.position.y < 1) {
            _camera.position.y = 1;
        }
        _camera.lookAt(_scene.position);

        raycaster.setFromCamera(rayMousePos, _camera);
        const intersects = raycaster.intersectObject(_scene, true);
        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            if (selectedObject.parent.name == "BookOpen" || selectedObject.parent.name == "BookStand") {
                HighlightBook(selectedObject);
            }
            else {
                RemoveSelectedObject();
            }
        }
        else {
            RemoveSelectedObject();
        }

        _elapTime = _clock.getElapsedTime();
        if (!document.hidden)
            TWEEN.update();
        _updateFunctions.forEach(element => {
            element(_deltaTime, _elapTime);
        });

        // NodeToyMaterial.tick();
        Render();
        _stats.update();
        // PrintStatus();
    });
    document.body.appendChild(_renderer.domElement)


    _composer = new EffectComposer(_renderer);
    _renderPass = new RenderPass(_scene, _camera);

    _fxaaPass = new ShaderPass(FXAAShader);
    const pixelRatio = _renderer.getPixelRatio();

    _fxaaPass.material.uniforms['resolution'].value.x = 1 / (_renderer.domElement.offsetWidth * pixelRatio);
    _fxaaPass.material.uniforms['resolution'].value.y = 1 / (_renderer.domElement.offsetHeight * pixelRatio);
    _fxaaPass.enabled = false;

    _gtaoPass = new GTAOPass(_scene, _camera, window.innerWidth, window.innerHeight);
    _gtaoPass.output = GTAOPass.OUTPUT.Default;
    _gtaoPass.updateGtaoMaterial(aoParameters);
    _gtaoPass.enabled = false;

    _bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.3, 0.4, 0.95);

    _outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), _scene, _camera);
    _outlinePass.hiddenEdgeColor.set('#1aff47');
    _outlinePass.edgeStrength = 8;
    _outlinePass.visibleEdgeColor.set('#1aff47');
    console.log("6666", outlineParams);

    _outputPass = new OutputPass();
    _outputPass.enabled = true;

    _composer.addPass(_renderPass);
    _composer.addPass(_outlinePass);
    _composer.addPass(_bloomPass);
    // _composer.addPass(_gtaoPass);
    _composer.addPass(_outputPass);
    // _composer.addPass(_fxaaPass);


    SetupRender();

    _debugDiv = document.createElement('div');
    _debugDiv.style.position = "fixed";
    document.body.appendChild(_debugDiv);



    document.addEventListener("focus", () => {
        console.log(focus);
    })
    document.addEventListener("blur", () => {
        console.log(blur);
    })
    CreateGUI();
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    _camera.aspect = window.innerWidth / window.innerHeight
    _camera.updateProjectionMatrix()
    _renderer.setSize(window.innerWidth, window.innerHeight)
    Render()
}
function SetupRender() {
    window.addEventListener('resize', () => { onWindowResize() }, false)
}

function Render() {
    // _renderer.render(_scene, _camera);
    _composer.render();
}

function SetGAOBox(box3) {
    // _gtaoPass.setSceneClipBox(box3);
}


function AddUpdateFunction(func) {
    _updateFunctions.push(func);
}

export function AddObjectToScene(object) {
    _scene.add(object);
    if (object.name == "effectOpen") {
        effectOpen = object;
    }
    else if (object.name == "effectStand") {
        effectStand = object;
    }
    else if(object.name == "mainscene"){
        object.traverse((child) => {
            if (child.name == "StandBook") {
                effectStandBook = child;
            }
        })
    }
}

function PrintStatus() {
    console.log("Calls: " + _renderer.info.render.calls + " " + _renderer.info.render.triangles);
    _renderer.info.reset();
}

document.addEventListener('mousemove', onDocumentMouseMove);
function onDocumentMouseMove(event) {

    mousePos.x = event.clientX;
    mousePos.y = event.clientY;

    rayMousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
    rayMousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;

}
function HighlightBook(selectedObject) {
    if (selectedObject.parent.name == "BookOpen") {
        if (currentHighlightBook)
            if (currentHighlightBook.name == selectedObject.parent.name)
                return;
        RemoveSelectedObject();
        console.log("highlight", selectedObject.parent.name);
        currentHighlightBook = selectedObject.parent;
        AddSelectedObject(selectedObject.parent)
        if (effectOpen)
            effectOpen.visible = true;

        if (effectOpenTween == null) {
            effectOpen.traverse((child) => {
                if (child.type == "Mesh") {
                    child.material.opacity = 0
                }
            })
            effectOpenTween = new TWEEN.Tween({ t: 0 }).to({ t: 1 }, 2000).start().onComplete(() => {
                effectOpenTween = null;
            }).onUpdate((value) => {
                effectOpen.traverse((child) => {
                    if (child.type == "Mesh") {
                        child.material.opacity = value.t
                        // console.log(child.material.opacity);
                    }
                })
            })
        }
    }
    else if (selectedObject.parent.name == "BookStand") {
        if (currentHighlightBook)
            if (currentHighlightBook.name == selectedObject.parent.name)
                return;

        RemoveSelectedObject();

        currentHighlightBook = selectedObject.parent;
        if (effectStand){
            effectStand.visible = true;
        }
        AddSelectedObject(selectedObject.parent)
        if (effectStandTween == null) {
            effectStand.traverse((child) => {
                if (child.type == "Mesh") {
                    child.material.opacity = 0
                }
            })
            effectStandBook.material.emissiveIntensity = 0
            effectStandTween = new TWEEN.Tween({ t: 0 }).to({ t: 1 }, 1000).start().onComplete(() => {
                effectStandTween = null;
            }).onUpdate((value) => {
                effectStandBook.material.emissiveIntensity = value.t*50
                effectStand.traverse((child) => {
                    if (child.type == "Mesh") {
                        child.material.opacity = value.t
                        // console.log(child.material.opacity);
                    }
                })
            })
        }
    }
}
function AddSelectedObject(object) {
    if (object)
        _outlinePass.selectedObjects = object.children;
    else
        _outlinePass.selectedObjects = [];
}
function RemoveSelectedObject() {
    if (effectOpen)
        effectOpen.visible = false;
    if (effectOpenTween) {
        effectOpenTween.stop();
        effectOpenTween = null;
    }
    if (effectStand){
        effectStand.visible = false;
    }
    if(effectStandBook)
        effectStandBook.material.emissiveIntensity = 0

    if (effectStandTween) {
        effectStandTween.stop();
        effectStandTween = null;

    }
    AddSelectedObject(null);
    currentHighlightBook = null;
}
export function AddScrollYMat(mat) {
    console.log(mat);
    _scrollYMaterials.push(mat);
}
export function AddScrollXMat(newmat) {
    if (!_scrollXMaterials.some(mat => mat.id === newmat.id)) {
        console.log("add", newmat.id);
        _scrollXMaterials.push(newmat);
        return;
    }
    console.log("No add", newmat.id);
}

function CreateLights() {
    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(4, 10, -6); //default; light shining from top
    light.castShadow = true; // default false
    light.shadow.mapSize.width = 4096; // default
    light.shadow.mapSize.height = 4096; // default
    light.shadow.camera.near = 0.0001; // default
    light.shadow.camera.far = 20; // default
    light.shadow.camera.top = 3;
    light.shadow.camera.bottom = -3;
    light.shadow.camera.left = -3;
    light.shadow.camera.right = 3;
    light.shadow.bias = -0.0002


    // let directTarget = new THREE.Object3D();
    // directTarget.position.set(3, 0, 3);
    // light.target = directTarget;
    // _scene.add(directTarget);
    _scene.add(light);

    // const helper = new THREE.CameraHelper(light.shadow.camera);
    // _scene.add(helper);

    const spotLight = new THREE.SpotLight(0xffffff, 250);
    spotLight.position.set(0, 5, 0);
    // spotLight.map = new THREE.TextureLoader().load( url );
    // spotLight.lookAt(new THREE.Vector3(0,0,1))
    spotLight.castShadow = true;
    spotLight.angle = 0.2;
    spotLight.penumbra = 0.4;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 5;
    spotLight.shadow.camera.far = 10;
    // spotLight.shadow.camera.fov = 30;
    spotLight.shadow.bias = -0.0005;

    _scene.add(spotLight);

    let _hdrEquirectangularMap = new RGBELoader()
        .load('assets/images/shanghai_bund_1k.hdr', () => {
            _hdrEquirectangularMap.mapping = THREE.EquirectangularReflectionMapping;
            _hdrEquirectangularMap.minFilter = THREE.LinearFilter;
            _hdrEquirectangularMap.magFilter = THREE.LinearFilter;
            _hdrEquirectangularMap.needsUpdate = true;
            _scene.environment = _hdrEquirectangularMap;
            // THREESingleton.Ins().Scene.background = this._hdrEquirectangularMap;
        });
}

function CreateGUI() {
    _gui.add(renderSettings, 'fxaa').onChange((value) => {
        if (value)
            _composer.addPass(_fxaaPass);
        else
            _composer.removePass(_fxaaPass);

    });
}