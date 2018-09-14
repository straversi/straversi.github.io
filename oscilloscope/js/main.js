var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2.5;
camera.lookAt(new THREE.Vector3(0, 0, 0));
var CAM_FACE_2D = camera.quaternion.clone();

camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 2.5;
camera.lookAt(new THREE.Vector3(0, 0, 0));
var CAM_FACE_3D = camera.quaternion.clone();
var CAM_POS_3D = camera.position.clone();

function webglAvailable() {
	try {
		var canvas = document.createElement('canvas');
		return !!(window.WebGLRenderingContext && (
			canvas.getContext('webgl' ) ||
			canvas.getContext('experimental-webgl'))
		);
	} catch (e) {
		return false;
	}
}

if (!webglAvailable()) {
	document.getElementById("no-web-gl-overlay").style.display = "block";
}

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = -1.0;

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

/*
 * stats.js r8 - http://github.com/mrdoob/stats.js
 */

var Stats=function(){var h,a,n=0,o=0,i=Date.now(),u=i,p=i,l=0,q=1E3,r=0,e,j,f,b=[[16,16,48],[0,255,255]],m=0,s=1E3,t=0,d,k,g,c=[[16,48,16],[0,255,0]];h=document.createElement("div");h.style.cursor="pointer";h.style.width="80px";h.style.opacity="0.9";h.style.zIndex="10001";h.addEventListener("mousedown",function(a){a.preventDefault();n=(n+1)%2;n==0?(e.style.display="block",d.style.display="none"):(e.style.display="none",d.style.display="block")},!1);e=document.createElement("div");e.style.textAlign=
"left";e.style.lineHeight="1.2em";e.style.backgroundColor="rgb("+Math.floor(b[0][0]/2)+","+Math.floor(b[0][1]/2)+","+Math.floor(b[0][2]/2)+")";e.style.padding="0 0 3px 3px";h.appendChild(e);j=document.createElement("div");j.style.fontFamily="Helvetica, Arial, sans-serif";j.style.fontSize="9px";j.style.color="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";j.style.fontWeight="bold";j.innerHTML="FPS";e.appendChild(j);f=document.createElement("div");f.style.position="relative";f.style.width="74px";f.style.height=
"30px";f.style.backgroundColor="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";for(e.appendChild(f);f.children.length<74;)a=document.createElement("span"),a.style.width="1px",a.style.height="30px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+b[0][0]+","+b[0][1]+","+b[0][2]+")",f.appendChild(a);d=document.createElement("div");d.style.textAlign="left";d.style.lineHeight="1.2em";d.style.backgroundColor="rgb("+Math.floor(c[0][0]/2)+","+Math.floor(c[0][1]/2)+","+Math.floor(c[0][2]/2)+")";d.style.padding=
"0 0 3px 3px";d.style.display="none";h.appendChild(d);k=document.createElement("div");k.style.fontFamily="Helvetica, Arial, sans-serif";k.style.fontSize="9px";k.style.color="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";k.style.fontWeight="bold";k.innerHTML="MS";d.appendChild(k);g=document.createElement("div");g.style.position="relative";g.style.width="74px";g.style.height="30px";g.style.backgroundColor="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";for(d.appendChild(g);g.children.length<74;)a=document.createElement("span"),
a.style.width="1px",a.style.height=Math.random()*30+"px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+c[0][0]+","+c[0][1]+","+c[0][2]+")",g.appendChild(a);return{domElement:h,update:function(){i=Date.now();m=i-u;s=Math.min(s,m);t=Math.max(t,m);k.textContent=m+" MS ("+s+"-"+t+")";var a=Math.min(30,30-m/200*30);g.appendChild(g.firstChild).style.height=a+"px";u=i;o++;if(i>p+1E3)l=Math.round(o*1E3/(i-p)),q=Math.min(q,l),r=Math.max(r,l),j.textContent=l+" FPS ("+q+"-"+r+")",a=Math.min(30,30-l/
100*30),f.appendChild(f.firstChild).style.height=a+"px",p=i,o=0}}};
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';

if (webglAvailable()) {
	document.body.appendChild(stats.domElement);
}

/*
 * Box
 */

var geometry = new THREE.BoxGeometry(2, 2, 2);
var material = new THREE.MeshBasicMaterial({color: 0x555555, wireframe: true});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var CUBE_FACE_2D = cube.quaternion.clone();

var quatCapturer = new THREE.Object3D();
quatCapturer.lookAt(new THREE.Vector3(0, 2, 2.5));
var QUAT_FACE_2D = quatCapturer.quaternion.clone();

quatCapturer.lookAt(0, 0, 1);
var QUAT_FACE_3D = quatCapturer.quaternion.clone();

/*
 * Line
 */

var lineGeometry = new THREE.Geometry();
for (var _ = 0; _ < 1024; _++) {
	lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
}

var uniforms = {
	opacity: { value: 1.0 },
	color: { value: new THREE.Vector3(0, 0, 0) }
};
var shaderMaterial = new THREE.ShaderMaterial({
	uniforms:       uniforms,
	vertexShader:   document.getElementById('vertexshader').textContent,
	fragmentShader: document.getElementById('fragmentshader').textContent,
	blending:       THREE.AdditiveBlending,
	depthTest:      false,
	transparent:    true
});

var vertices = lineGeometry.vertices;

var buffergeometry = new THREE.BufferGeometry();

var position = new THREE.Float32BufferAttribute(vertices.length * 3, 3).copyVector3sArray(vertices);
buffergeometry.addAttribute('position', position);

var customColor = new THREE.Float32BufferAttribute(vertices.length * 3, 3);
buffergeometry.addAttribute('customColor', customColor);

var color = new THREE.Color(0xffffff);

for (var i = 0, l = customColor.count; i < l; i++) {
	color.setHSL(0.3, 1, 1 - i / l);
	color.toArray(customColor.array, i * customColor.itemSize);
}

var line = new THREE.Line(buffergeometry, shaderMaterial);
cube.add(line);

/*
 * Animation
 */

function animate(timeStamp) {
	requestAnimationFrame(animate);

	applyWave(line, timeStamp);

	TWEEN.update(timeStamp);
	controls.update();

	renderer.render(scene, camera);

  stats.update();
}

var xHz = 276;
var yHz = 460;
var zHz = 185;
var HzToVizHz = 1/160;
var masterOffset = 0.1;

function applyWave(line, timeStamp) {
	var attributes = line.geometry.attributes;
	var positions = attributes.position.array;

	timeStamp = timeStamp || 0;

	var offset = 0;
	for (var i = 0, l = positions.length; i < l; i += 3) {
		positions[i] = Math.sin(xHz * HzToVizHz * (timeStamp - offset));
		positions[i + 1] = Math.cos(yHz * HzToVizHz * (timeStamp - offset));
		positions[i + 2] = Math.sin(zHz * HzToVizHz * (timeStamp - offset));

		offset += masterOffset;
	}

	attributes.position.needsUpdate = true;
}

function switchTo2d() {
	controls.enabled = false;
	controls.autoRotate = false;

	TWEEN.removeAll();

	var tweenA = new TWEEN.Tween(camera.position)
		.to({ x: 0, y: 0, z: 3 }, 1000);
	var tweenB = new TWEEN.Tween(camera.quaternion)
	  .to({ x: CUBE_FACE_2D.x, y: CUBE_FACE_2D.y, z: CUBE_FACE_2D.z, w: CUBE_FACE_2D.w }, 1000);
	tweenA.onStart(function() { tweenB.start(); });
	var tweenC = new TWEEN.Tween(camera.position)
		.to({ x: 0, y: 0, z: 200 }, 500);
	var tweenD = new TWEEN.Tween(camera)
		.to({ zoom: 80 }, 500)
		.onUpdate(function(obj) {
			camera.updateProjectionMatrix();
		});
	tweenA.chain(tweenC, tweenD);
	tweenA.start();
}

function switchTo3d() {
	controls.enabled = true;
	controls.autoRotate = true;

	TWEEN.removeAll();

	var tweenD = new TWEEN.Tween(camera)
		.to({ zoom: 1 }, 500)
		.onUpdate(function(obj) {
			camera.updateProjectionMatrix();
		});
	var tweenC = new TWEEN.Tween(camera.position)
		.to({ x: 0, y: 0, z: 3 }, 500);
	tweenC.onStart(function() { tweenD.start(); });
	var tweenB = new TWEEN.Tween(camera.quaternion)
	  .to({ x: CAM_FACE_3D.x, y: CAM_FACE_3D.y, z: CAM_FACE_3D.z, w: CAM_FACE_3D.w }, 1000);
	var tweenA = new TWEEN.Tween(camera.position)
		.to({ x: 0, y: 2, z: 2.5 }, 1000);
	tweenC.chain(tweenB, tweenA);
	tweenC.start();
}

/*
 * Synth and GUI
 */

var synthX = new Tone.Synth().toMaster();
var synthY = new Tone.Synth().toMaster();
var synthZ = new Tone.Synth().toMaster();

if (webglAvailable()) {
	var gui = new dat.GUI();
}

var controller;
controller = gui.add(window, 'xHz', 0, 600).onChange(function(hz) {
	synthX.setNote(hz);
});
controller.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = 'x Hz';

controller = gui.add(window, 'yHz', 0, 600).onChange(function(hz) {
	synthY.setNote(hz);
});
controller.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = 'y Hz';

controller = gui.add(window, 'zHz', 0, 600).onChange(function(hz) {
	synthZ.setNote(hz);
});
controller.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = 'z Hz';

controller = gui.add(window, 'masterOffset', 0.05, 0.2);
controller.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = 'Blur';

controller = gui.add(Tone.Master, 'mute');
controller.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = 'Mute';

var dimensionActionToName = {
	switchTo2d: 'Switch to 2D',
	switchTo3d: 'Switch to 3D',
}
controller = gui.add(window, 'switchTo2d').onFinishChange(function() {
	// this = the controller (dat.gui)
	this.property = this.property == 'switchTo2d' ? 'switchTo3d' : 'switchTo2d';
	var name = this.domElement.parentElement.getElementsByClassName('property-name')[0];
	name.innerHTML = dimensionActionToName[this.property];
});
controller.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = dimensionActionToName[controller.property];

function setAllHz(x, y, z) {
	xHz = x; synthX.setNote(x);
	yHz = y; synthY.setNote(y);
	zHz = z; synthZ.setNote(z);
	for (var i in gui.__controllers) {
    gui.__controllers[i].updateDisplay();
  }
}
var presetsFolder = gui.addFolder('Examples');

function example1() { setAllHz(276, 461, 185); }
var ex = presetsFolder.add(window, 'example1');
ex.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = 'example 1';

function example2() { setAllHz(116, 116, 77); }
ex = presetsFolder.add(window, 'example2');
ex.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = 'example 2';

function example3() { setAllHz(276, 460, 185); }
ex = presetsFolder.add(window, 'example3');
ex.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = 'example 3';

function example4() { setAllHz(161.8, 122.7, 284.8); }
ex = presetsFolder.add(window, 'example4');
ex.domElement.parentElement.getElementsByClassName('property-name')[0].innerHTML = 'example 4';

animate();

synthX.triggerAttack(xHz);
synthY.triggerAttack(yHz);
synthZ.triggerAttack(zHz);

