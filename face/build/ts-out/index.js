import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const makePointLight = (x, y, z) => {
    const light = new THREE.PointLight(0xffffff, 1, 50);
    light.position.set(x, y, z);
    scene.add(light);
};
makePointLight(0, 0, 10);
var ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);
var loader = new GLTFLoader();
let steven;
loader.load("assets/steven-mask-6/optimized-face-1.glb", function (gltf) {
    steven = gltf;
    scene.add(steven.scene);
    steven.scene.scale.set(5, 5, -5);
    console.log('doneee');
}, undefined, function (error) {
    console.error(error);
});
var loader = new GLTFLoader();
let sushi;
const sushiScale = 0.05;
loader.load("assets/steven-mask-6/sushi.glb", function (gltf) {
    sushi = gltf;
    sushi.scene.scale.set(sushiScale, sushiScale, sushiScale);
    scene.add(sushi.scene);
}, undefined, function (error) {
    console.error(error);
});
var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -5);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersectPoint = new THREE.Vector3();
window.addEventListener("mousemove", (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectPoint);
    intersectPoint.add(new THREE.Vector3(0, -0.4, 0));
    if (steven !== undefined) {
        steven.scene.lookAt(intersectPoint);
    }
    if (sushi !== undefined) {
        sushi.scene.position.set(intersectPoint.x, intersectPoint.y + 0.2, intersectPoint.z);
    }
});
camera.position.z = 50;
camera.zoom = 15;
camera.updateProjectionMatrix();
let t = 0;
const sushiRotX = () => {
    return Math.sin(2 * t) / 3;
};
var animate = function () {
    requestAnimationFrame(animate);
    sushi.scene.rotation.y += 0.015;
    sushi.scene.rotation.x = sushiRotX();
    renderer.render(scene, camera);
    t += 0.01;
};
animate();
