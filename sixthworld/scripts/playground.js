var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var smallGeom = new THREE.OctahedronGeometry( 1, 1 );
var largeGeom = new THREE.OctahedronGeometry( 15, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x1CADF9, wireframe: true } );
// var material = new THREE.MeshDepthMaterial();
var smallShape = new THREE.Mesh( smallGeom, material );
var largeShape = new THREE.Mesh( largeGeom, material );

scene.add( smallShape );
scene.add( largeShape );

camera.position.z = 5;

mouseX = 0;
mouseY = 0;
document.onmousemove = function(event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
}

pageHeight = window.innerHeight;
pageWidth = window.innerWidth;
modifier = 15;

function render() {
	requestAnimationFrame( render );

  smallShape.rotation.x += (mouseY - pageHeight / 2) / pageHeight / modifier;
  smallShape.rotation.y += (mouseX - pageWidth / 2) / pageWidth / modifier;

  largeShape.rotation.x += (mouseY - pageHeight / 2) / pageHeight / modifier;
  largeShape.rotation.y += (mouseX - pageWidth / 2) / pageWidth / modifier;

	renderer.render( scene, camera );
}
render();
