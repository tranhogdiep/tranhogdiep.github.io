import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { AddUpdateFunction, AddObjectToScene, Init, AddScrollYMat, AddScrollXMat, GetRenderer} from './THREERender.js';

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('assets/libs/gltf/');
loader.setDRACOLoader(dracoLoader);

let mixer;
let animations;

let controller;
let reticle;

let hitTestSource = null;
let hitTestSourceRequested = false;

let dragonMesh;

Init();
LoadModels();
let tempScale = new THREE.Vector3();

let renderer = GetRenderer();
function onSelect() {

    if ( reticle.visible ) {

        // const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
        // const mesh = new THREE.Mesh( geometry, material );
        reticle.matrix.decompose( dragonMesh.position, dragonMesh.quaternion, tempScale );
        dragonMesh.visible = true;
        // mesh.scale.y = Math.random() * 2 + 1;
        // AddObjectToScene( mesh );

    }

}
function CreateLight(){
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(4, 10, -6); //default; light shining from top
    light.castShadow = true; // default false
    light.shadow.mapSize.width = 2048; // default
    light.shadow.mapSize.height = 2048; // default
    light.shadow.camera.near = 0.0001; // default
    light.shadow.camera.far = 20; // default
    light.shadow.camera.top = 3;
    light.shadow.camera.bottom = -3;
    light.shadow.camera.left = -3;
    light.shadow.camera.right = 3;
    // light.shadow.bias = -0.0002


    AddObjectToScene(light);

    // const helper = new THREE.CameraHelper(light.shadow.camera);
    // dragonMesh.attach(helper);
}

function LoadModels() {
    // Load a glTF resource
    loader.load('assets/demo/icy_dragon.glb', (gltf) => {
        gltf.scene.name = "dragon";
        console.log(gltf.scene);
        let mesh = gltf.scene.getObjectByName("Object_17", true);
        console.log(mesh);
        mesh.material.emissiveIntensity = 50;
        AddObjectToScene(gltf.scene)
        gltf.scene.scale.set(0.01,0.01,0.01)
        dragonMesh = gltf.scene;
        // dragonMesh.visible = false;
        gltf.scene.traverse((child) => {
            child.layers.enable(1);
            if (child.type == "Mesh" || child.type == "SkinnedMesh") {
                child.castShadow = true;
                child.receiveShadow = true;
                CheckObjectsTpye(child)
            }
        })

        mixer = new THREE.AnimationMixer( gltf.scene );
        animations = gltf.animations;
        let runAction = mixer.clipAction( animations[ 0 ] );
        runAction.play();


        document.getElementById("loading-progress").style.animationName = "split-effect-hide";

        setTimeout(() => {
            document.getElementById("loading-progress").style.display = "none";
        }, 400)

        document.body.appendChild( ARButton.createButton( renderer, { requiredFeatures: [ 'hit-test' ] } ) );

        controller = renderer.xr.getController( 0 );
        controller.addEventListener( 'select', onSelect );
        AddObjectToScene( controller );

        reticle = new THREE.Mesh(
            new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
            new THREE.MeshBasicMaterial()
        );
        reticle.matrixAutoUpdate = false;
        reticle.visible = false;
        AddObjectToScene( reticle );

        AddUpdateFunction(animate);

        let cube = new THREE.Mesh(new THREE.PlaneGeometry(7,7), new THREE.ShadowMaterial({opacity:0.5}));
        cube.receiveShadow = true;
        cube.rotation.x = -Math.PI/2
        dragonMesh.attach(cube);
        
    });

}
function CheckObjectsTpye(child) {
    if ((child).material.userData.scrollY) {
        AddScrollYMat((child).material);
    }
    if ((child).material.userData.scrollX) {
        AddScrollXMat((child).material);
    }
    if (child.userData.renderOrder) {
        child.renderOrder = child.userData.renderOrder;
    }
    if (child.material.userData.addBlend) {
        child.material.blending = THREE.AdditiveBlending;
    }
}
function animate(delta, x,  timestamp, frame) {
    // console.log(delta, x,  timestamp, frame);
    if ( frame ) {

        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        if ( hitTestSourceRequested === false ) {
     console.log(11);

            session.requestReferenceSpace( 'viewer' ).then( function ( referenceSpace ) {

                session.requestHitTestSource( { space: referenceSpace } ).then( function ( source ) {

                    hitTestSource = source;


                } );

            } );

            session.addEventListener( 'end', function () {

                hitTestSourceRequested = false;
                hitTestSource = null;

            } );

            hitTestSourceRequested = true;

        }

        if ( hitTestSource ) {

            const hitTestResults = frame.getHitTestResults( hitTestSource );

            if ( hitTestResults.length ) {

                const hit = hitTestResults[ 0 ];

                reticle.visible = true;
                reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

            } else {

                reticle.visible = false;

            }

        }

    }
    mixer.update(delta)

}