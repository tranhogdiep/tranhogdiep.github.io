import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { AddObjectToScene, Init } from './THREESingleton.js';

const loader = new GLTFLoader();
Init();


// Load a glTF resource
loader.load('assets/models/menu.glb', (gltf) => {
    let mat = new THREE.MeshStandardMaterial();
    console.log("ssss",gltf.scene);
    AddObjectToScene(gltf.scene)
    gltf.scene.position.y=-0.4;
    gltf.scene.traverse((child)=>{
        if(child.type == "Mesh"){
            child.castShadow = true;
            child.receiveShadow = true;
            // child.material = mat;
            if(child.name=="Eff02"){
                console.log(child.material);
                // child.material.alphaTest = 0.01
            child.castShadow = false;

            }

        }
    })
}
);

function animate() {


}