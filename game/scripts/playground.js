var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 2;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var lights = [];
lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( - 100, - 200, - 100 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );

// var geom = new THREE.IcosahedronGeometry(0.5, 0);
var material = new THREE.MeshPhongMaterial({
  color: 0x156289,
  emissive: 0x072534,
  side: THREE.DoubleSide,
  shading: THREE.FlatShading
});
var basicMaterial = new THREE.MeshBasicMaterial({
  color : 0xff0000,
});
// // var material = new THREE.MeshDepthMaterial();
// var meshObject = new THREE.Mesh(geom, material);
// // var largeShape = new THREE.Mesh( largeGeom, material );
//
// scene.add( meshObject );
//
// meshObject.position.z = -10;
// meshObject.position.x = -0.5;
// meshObject.position.y = 0.5;


// Game definitions

// camera range radius
cameraR = 1;

// background
planetGeom = new THREE.SphereGeometry(100, 64, 64);
planetMesh = new THREE.Mesh(planetGeom, material);
scene.add(planetMesh);
planetMesh.position.z = -200;
planetMesh.position.x = -110;
planetMesh.position.y = 0;

// Projectile definition

class Projectile {
  constructor() {
    this.geometry = new THREE.CylinderGeometry(0.01, 0.01, 1, 10);
    // Create the final object to add to the scene
    this.mesh = new THREE.Mesh(this.geometry, basicMaterial);
    scene.add(this.mesh);
    this.mesh.position.x = camera.position.x;
    this.mesh.position.y = camera.position.y - 0.1;
    this.mesh.position.z = -0.5
    this.mesh.rotation.x = Math.PI / 2;
    // mark for deletion
    this.shouldRemove = false;
  }

  move() {
    // move the projectile
    this.mesh.position.z -= 0.1;
    // check for collisions
    var position = this.mesh.position;
    var me = this;
    asteroids.forEach(function(a) {
      // don't check collisions with fragments
      if (!(a instanceof Fragment)) {
        var targetSphere = a.geometry.boundingSphere;
        var checkPoint = new THREE.Vector3();
        checkPoint.subVectors(a.mesh.position, position);
        if (targetSphere.containsPoint(checkPoint)) {
          console.log("hit!");
          a.shouldExplode = true;
          me.shouldRemove = true;
        }
      }
    });
  }
}

// array to hold projectiles
projectiles = [];
// timestamp of last projectile fired
lastFireTime = 0;
// milliseconds before allowed to re-fire
fireDelay = 500;

// Asteroid definition

class Asteroid {
  constructor(radius, position="rand") {
    this.geometry = new THREE.IcosahedronGeometry(radius, 0);
    this.mesh = new THREE.Mesh(this.geometry, material);
    scene.add(this.mesh);
    if (position == "rand") {
      this.mesh.position.z = -10;
      this.mesh.position.x = Math.random() * cameraR * 2 - cameraR;
      this.mesh.position.y = Math.random() * cameraR * 2 - cameraR;
    } else {
      this.mesh.position.z = position.z;
      this.mesh.position.x = position.x;
      this.mesh.position.y = position.y;
    }
    this.rotationX = Math.random() * 0.02 - 0.01;
    this.rotationY = Math.random() * 0.02 - 0.01;
    this.rotationZ = Math.random() * 0.02 - 0.01;
    // get bounding sphere ready for collision detection
    this.geometry.computeBoundingSphere();
    // when shouldExplode is true, fragments should be created.
    this.shouldExplode = false;
  }

  move() {
    // move the asteroid.
    this.mesh.position.z += 0.06;
    // rotate the asteroid
    this.mesh.rotation.x += this.rotationX;
  	this.mesh.rotation.y += this.rotationY;
    this.mesh.rotation.z += this.rotationZ;
  }
}

class Fragment extends Asteroid {
  constructor(position, xMove, yMove) {
    // smaller asteroid
    super(0.1, position);
    // direction in x and y to travel
    this.xMovement = xMove * 0.02;
    this.yMovement = yMove * 0.02;
  }

  move() {
    // move on the y and x planes
    this.mesh.position.x += this.xMovement;
    this.mesh.position.y += this.yMovement;
    // also move toward camera, rotate
    super.move();
  }
}

// array to hold asteroid instances
asteroids = [];
// flag that should be set to true when ready to make new asteroid
createNewAsteroid = false;

window.setInterval(function() {
  createNewAsteroid = true;
}, 500);
// createNewAsteroid = true;

// Camera movement

var Key = {
  _pressed: {},

  LEFT: 65, // A
  UP: 87, // W
  RIGHT: 68, // D
  DOWN: 83, // S
  SPACE: 32,

  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },

  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },

  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};

window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

function moveUp() {
  if (camera.position.y < cameraR) {
    camera.position.y += 0.02;
  }
}
function moveLeft() {
  if (camera.position.x > -cameraR) {
    camera.position.x -= 0.02;
  }
}
function moveDown() {
  if (camera.position.y > -cameraR) {
    camera.position.y -= 0.02;
  }
}
function moveRight() {
  if (camera.position.x < cameraR) {
    camera.position.x += 0.02;
  }
}

function moveCamera() {
  if (Key.isDown(Key.UP)) moveUp();
  if (Key.isDown(Key.LEFT)) moveLeft();
  if (Key.isDown(Key.DOWN)) moveDown();
  if (Key.isDown(Key.RIGHT)) moveRight();
};

// Object movement

function moveAsteroids() {
  // move each asteroid, explode if necessary.
  newFrags = [];
  asteroids.forEach(function(a) {
    if (a.shouldExplode) {
      var pos = a.mesh.position.clone();
      newFrags = newFrags.concat([
        new Fragment(pos, 1, 1),
        new Fragment(pos, 1, -1),
        new Fragment(pos, -1, 1),
        new Fragment(pos, -1, -1)
      ]);
    } else {
      a.move();
    }
  });
  // add in the new fragments to the asteroid list
  asteroids = asteroids.concat(newFrags);
  // remove asteroids
  asteroids = asteroids.filter(function(a) {
    if (a.mesh.position.z > 0 || a.shouldExplode) {
      scene.remove(a.mesh);
      return false;
    }
    return true;
  });

  // create any new asteroids
  if (createNewAsteroid) {
    asteroids.push(new Asteroid(0.5));
    createNewAsteroid = false;
  }
}

function moveProjectiles() {
  // move each projectile
  projectiles.forEach(function(p) {
    p.move();
  });
  // create any new projectiles
  if (Key.isDown(Key.SPACE) && (Date.now() - fireDelay > lastFireTime)) {
    lastFireTime = Date.now();
    projectiles.push(new Projectile());
  }
  // remove projectiles
  projectiles = projectiles.filter(function(p) {
    if (p.shouldRemove) {
      scene.remove(p.mesh);
      return false;
    }
    return true;
  });
}

function movePlanet() {
  planetMesh.position.z += 0.02;
}

function render() {
	requestAnimationFrame( render );

  moveProjectiles();
  moveAsteroids();
  moveCamera();
  movePlanet();

	renderer.render( scene, camera );
}

// Handle resizing

window.addEventListener('resize', function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false);

render();

// javascript learning stuff

// complicated removal scheme
// // mark asteroids to remove
// var toRemove = [];
// for (var i = 0; i < asteroids.length; i++) {
//   if (asteroids[i].mesh.position.z > 0 || asteroids[i].shouldExplode) {
//     toRemove.push(i);
//   }
// }
// // remove asteroids
// var offset = 0;
// var removeIndex;
// for (var i = 0; i < toRemove.length; i++) {
//   removeIndex = toRemove[i] + offset;
//   scene.remove(asteroids[removeIndex].mesh);
//   asteroids.splice(removeIndex, 1);
//   offset -= 1;
// }