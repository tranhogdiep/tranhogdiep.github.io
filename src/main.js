import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { AddObjectToScene, Init, AddScrollYMat, AddScrollXMat } from './THREESingleton.js';

const loader = new GLTFLoader();
Init();
LoadModels();


function LoadModels(){
// Load a glTF resource
loader.load('assets/models/menu.glb', (gltf) => {
    gltf.scene.name = "mainscene";

    AddObjectToScene(gltf.scene)
    gltf.scene.position.y = -0.4;
    gltf.scene.layers.enable( 1 );

    gltf.scene.traverse((child) => {
        child.layers.enable( 1 );
        if (child.type == "Mesh") {
            child.castShadow = true;
            child.receiveShadow = true;
            // child.material = mat;
            if (child.name == "Eff02") {
                console.log(child.material);
                // child.material.alphaTest = 0.01
                child.castShadow = false;

            }
            CheckObjectsTpye(child)
        }
    })
});

// Load a glTF resource
loader.load('assets/models/effectOpen.glb', (gltf) => {
    console.log("effectOpen", gltf.scene);
    gltf.scene.name = "effectOpen";
    gltf.scene.layers.enable( 3 );
    AddObjectToScene(gltf.scene)
    gltf.scene.position.y = -0.4;
    gltf.scene.traverse((child) => {
        child.layers.enable( 3 );
        console.log(child.layers);
        if (child.type == "Mesh") {
            CheckObjectsTpye(child)
        }
    })
});
loader.load('assets/models/effectStand.glb', (gltf) => {
    console.log("ssss", gltf.scene);
    gltf.scene.name = "effectStand";
    gltf.scene.layers.enable( 3 );
    AddObjectToScene(gltf.scene)
    gltf.scene.position.y = -0.4;
    gltf.scene.traverse((child) => {
        child.layers.enable( 3 );
        console.log(child.layers);
        if (child.type == "Mesh") {
            CheckObjectsTpye(child)
        }
    })
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
        console.log('set render order ', child.userData.renderOrder);
        child.renderOrder = child.userData.renderOrder;
    }
    if (child.material.userData.addBlend) {
        console.log('set addBlend ', child.userData.renderOrder);
        child.material.blending = THREE.AdditiveBlending;
    }
}
function animate() {


}