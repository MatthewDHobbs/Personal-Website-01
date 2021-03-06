import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    AmbientLight,
    PointLight,
    Raycaster,
    Vector2,
    Vector3
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as util from './util';
import * as mesh from './mesh';

import { locations } from '../content/locations';
import { selected } from '../content/selected';

let renderer, scene, camera;
let earthMesh, cloudMesh, markerMeshes = []; // meshes
let earthMap, earthSpec, cloudMap; // textures
let ambientLight, pointLight, orangeLight; // lights
let orbitControls; // controls

export async function loadTextures() {
    let promises = [
        util.loadTexture('/assets/webgl/BlackMarble_2016_3km.jpg'),
        util.loadTexture('/assets/webgl/8081_earthspec10k.jpg'),
        util.loadTexture('/assets/webgl/8k_earth_clouds.jpg')
    ];
    const values = await Promise.all(promises);
    earthMap = values[0];
    earthSpec = values[1]; 
    cloudMap = values[2];
}

export async function initialize() {
    renderer = new WebGLRenderer({antialias: true, alpha: true});
    scene = new Scene();
    camera = new PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

    ambientLight = new AmbientLight(0xffffff, 0.75);
    pointLight = new PointLight(0xffffff, 1.5);
    orangeLight = new PointLight(0xf38f03, 1.5);
}

export async function display() {
    renderer.setPixelRatio(window.devicePixelRatio);

    earthMesh = mesh.createEarthMesh(earthMap, earthSpec);
    cloudMesh = mesh.createCloudMesh(cloudMap);

    scene.add(camera);
    scene.add(ambientLight);
    camera.add(pointLight);
    camera.add(orangeLight);
    scene.add(earthMesh);
    earthMesh.add(cloudMesh);

    earthMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

    camera.position.set(0, 1.9, 4.3);
    pointLight.position.set(-4, 2, 0);
    orangeLight.position.set(10, 2, 0);
    earthMesh.rotation.x -= 0.15;
    cloudMesh.rotation.x -= 0.15;

    Object.entries(locations).forEach(entry => {
        const markerMesh = mesh.createMarkerMesh(entry[1].longitude, entry[1].latitude, entry[0]);
        markerMeshes.push(markerMesh);
        earthMesh.add(markerMesh);
    });

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.enableZoom = false;
    orbitControls.enablePan = false;
    orbitControls.rotateSpeed = 0.2;
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = -0.3;
    orbitControls.target = new Vector3(0, 2, 0);
    orbitControls.maxPolarAngle = 1.7;
    orbitControls.minPolarAngle = 1.7;
    orbitControls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    document.getElementById('webgl-container').appendChild(renderer.domElement);

    return true;
}

export async function animate() {
    cloudMesh.rotation.y -= 0.0002;
    for (let mesh of markerMeshes)
        mesh.rotation.z -= 0.025;
    
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function click(event) {
    if (event.type == 'touchend')
        event = event.touches[0] || event.changedTouches[0];
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(markerMeshes, true);
    if (intersects.length > 0)
        selected.set({ location: intersects[0].object.name, uuid: null });
}

window.addEventListener('resize', resize);
window.addEventListener('click', click);
window.addEventListener('touchend', click);
