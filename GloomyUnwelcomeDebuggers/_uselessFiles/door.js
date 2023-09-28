import * as THREE from "three";
import { PerspectiveCamera } from "three";

const rad = (deg) => {
  return (deg * Math.PI) / 180;
};
print = console.log;

var canvas = document.querySelector("#newCanva");
var renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setClearColor(0xbbbbca);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(70, 1.6, 1, 600);

camera.position.z -= 9;

document.querySelector(
  "#camPosLabel"
).innerText = `Camera Position: (${camera.position.toArray().join(", ")})`;

var cube = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 1),
  new THREE.MeshBasicMaterial({ color: 0xdacfee })
);

cube.position.x = 5;

var cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 1),
  new THREE.MeshBasicMaterial({ color: 0xdacfee })
);

cube2.position.x = -5;

var door = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 1),
  new THREE.MeshBasicMaterial({ color: 0x4f2f00 })
);

door.open = false;

var axeHelp = new THREE.AxesHelper(5);

var pivotP = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

pivotP.position.set(2.5, 0, 0);

//scene.add(cube);
//scene.add(cube2);
scene.add(door);
scene.add(axeHelp);
scene.add(pivotP);
camera.lookAt(new THREE.Vector3(0, 0, 0));

document.querySelector(
  "#cubPosLabel"
).innerText = `Cube Position: (${cube.position.toArray().join(", ")})`;

window.addEventListener("keydown", function (e) {
  if (e.keyCode == 87) {
    camera.position.z += 0.1;
  } else if (e.keyCode == 83) {
    camera.position.z -= 0.1;
  } else if (e.keyCode == 65) {
    camera.rotation.y -= 0.1;
  } else if (e.keyCode == 68) {
    camera.rotation.y += 0.1;
  }

  if (e.keyCode == 69) {
    if (!door.open) {
      door.position.x += 3;
      door.rotateY(rad(90));
    } else {
      door.position.x -= 3;
      door.rotateY(rad(-90));
    }
    door.open = !door.open;
    //door.position.x -= 5;
  }

  if (e.keyCode == 70) {
    camera.position.y += 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
  document.querySelector(
    "#cubPosLabel"
  ).innerText = `Cube Position: (${door.position
    .toArray()
    .map((x) => x.toFixed(2))
    .join(", ")})`;
  document.querySelector(
    "#camPosLabel"
  ).innerText = `Camera Position: (${camera.position.toArray().join(", ")})`;
  renderer.render(scene, camera);
});

{
  door.position.sub(pivotP.position);
  door.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), rad(-90));
  door.position.add(pivotP.position);

  door.rotateOnAxis(new THREE.Vector3(0, 1, 0), rad(-90));
}

function ren() {
  renderer.render(scene, camera);

  requestAnimationFrame(ren);
}

requestAnimationFrame(ren);
