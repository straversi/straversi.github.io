import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
const makePointLight = (x, y, z) => {
    const light = new THREE.PointLight(0xffffff, 1, 50);
    light.position.set(x, y, z);
    scene.add(light);
};
makePointLight(0, 10, 10);
var ambientLight = new THREE.AmbientLight(0x404040, 5);
scene.add(ambientLight);
const progressBar = document.querySelector('#progress-bar');
var loader = new GLTFLoader();
let steven;
loader.load("assets/steven-mask-6/optimized-face-1.glb", function (gltf) {
    var _a;
    steven = gltf.scene.getObjectByName('texturedMesh');
    steven.scale.set(5, 5, 5);
    steven.lookAt(0, 0, -10);
    scene.add(gltf.scene);
    (_a = document.getElementById('loader')) === null || _a === void 0 ? void 0 : _a.remove();
}, function (progress) {
    progressBar.style.width = `${100 * progress.loaded / progress.total}%`;
}, undefined);
var loader = new GLTFLoader();
let sushi;
const sushiScale = .05;
loader.load("assets/steven-mask-6/sushi-shiny-opt.glb", function (gltf) {
    sushi = gltf.scene.children[0];
    sushi.scale.set(sushiScale, sushiScale, sushiScale);
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
});
var plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -5);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersectPoint = new THREE.Vector3();
const moveHandler = (clientX, clientY) => {
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersectPoint);
    intersectPoint.multiply(new THREE.Vector3(-1, -1, -1));
    if (steven !== undefined) {
        steven.lookAt(intersectPoint);
    }
    if (sushi !== undefined) {
        sushi.position.set(-intersectPoint.x, -intersectPoint.y + 0.2, -intersectPoint.z);
    }
};
const touchHandler = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    moveHandler(touch.clientX, touch.clientY);
};
const mouseHandler = (e) => {
    moveHandler(e.clientX, e.clientY);
};
window.addEventListener("touchmove", touchHandler);
window.addEventListener("touchstart", touchHandler);
window.addEventListener("mousemove", mouseHandler);
camera.position.z = 50;
camera.zoom = 15;
camera.updateProjectionMatrix();
let t = 0;
const sushiRotX = () => {
    return Math.sin(2 * t) / 3;
};
var animate = function () {
    requestAnimationFrame(animate);
    if (sushi !== undefined) {
        sushi.rotation.y += 0.015;
        sushi.rotation.x = sushiRotX();
    }
    renderer.render(scene, camera);
    t += 0.01;
};
animate();
