var THREE = await import(
  "http" + "s://unpkg.com/three@v0.156.1/build/three.module.js"
);
var MOD1 = await import(
  "../../lilMod.js"
);

var scene, camera;
var objects = {};

export var getCurrentScene = () => scene;
export var getCurrentCamera = () => camera;
export var getCurrentParts = () => objects;


export function main(renderer) {
  objects["renderer"] = renderer;
  
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, 1.6, 1, 600);
  camera.rotationInDegrees = new THREE.Vector3(0, 0, 0); //doesnt really do anything, just helps keep track of numbers
  camera.isMovingZ = false;
  camera.isMovingX = false;

  

  camera.position.z += 9;

  var wall = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 1),
    new THREE.MeshBasicMaterial({ color: 0xdacfee })
  );
  objects["wall"] = wall;

  wall.position.x = 5;

  var wallR = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 1),
    new THREE.MeshBasicMaterial({ color: 0xdacfee })
  );
  objects["wallR"] = wallR;

  wallR.position.x = -5;

  var door = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 1),
    new THREE.MeshBasicMaterial({ color: 0x4f2f00 })
  );
  objects["door"] = door;

  door.open = false;
  door.opening = false;

  var floor = new THREE.Mesh(
    new THREE.BoxGeometry(5, 1, 125),
    new THREE.MeshBasicMaterial({ color: 0xfaeeaa })
  );

  var floor2 = new THREE.Mesh(
    new THREE.BoxGeometry(5, 1, 125),
    new THREE.MeshBasicMaterial({ color: 0xfaeeaa })
  );

  var floor1 = new THREE.Mesh(
    new THREE.BoxGeometry(125, 1.25, 125),
    new THREE.MeshBasicMaterial({ color: 0x5fcc5f })
  );

  floor.position.y -= 2.5;
  floor2.position.y -= 2.5;
  floor2.rotation.y += MOD1.rad(90);
  floor1.position.y -= 2.65;
  floor2.position.z -= 45;

  scene.add(floor);
  scene.add(floor1);
  scene.add(floor2);
  scene.add(wall);
  scene.add(wallR);
  scene.add(door);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  if (resizeRendererToDisplaySize(renderer)) {
    var canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
}


function resizeRendererToDisplaySize(renderer) {
  var canvas = renderer.domElement;
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  var needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}