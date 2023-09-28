import * as THREE from "three";
import { PerspectiveCamera } from "three";
import * as MOD1 from "/lilMod.js";

const rad = (deg) => {
  return (deg * Math.PI) / 180;
};
print = console.log;

var canvas = document.querySelector("#newCanva");
var renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setClearColor(0x00cfff);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(70, 1.6, 1, 600);

camera.position.z += 9;

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
floor2.rotation.y += rad(90);
floor1.position.y -= 2.65;
floor2.position.z -= 45;

scene.add(floor);
scene.add(floor1);
scene.add(floor2);
scene.add(cube);
scene.add(cube2);
scene.add(door);
camera.lookAt(new THREE.Vector3(0, 0, 0));

window.addEventListener("keydown", function (e) {
  //console.log(camera.position);
  //console.log(camera.rotation);

  var lala = new THREE.Vector3(0, 0, 0).setFromEuler(camera.rotation);
  /* 
  var doodoo = new THREE.Vector3(
    -lala.y * (Math.abs(lala.y)%rad(180) == 0 ? 0 : 1), 
    0,
    Math.abs(lala.y%rad(180)) * (Math.abs(lala.y)%rad(180) == rad(90) ? 0 : 1));

  if (lala.y == 0) {
    doodoo.z = -1
  } else if (Math.abs(lala.y%rad(180)) == 0) {
    doodoo.z = 1;
  }
  */
  var doodoo = new THREE.Vector3(
    -Math.sin(lala.y),
    0,
    Math.cos(lala.y - Math.PI)
  );

  if (e.key == "w") {
    //camera.position.z -= 0.1;
    //floor.position.z -= 0.1;

    camera.position.add(doodoo.normalize());
  } else if (e.key == "s") {
    camera.position.sub(doodoo.normalize());
    //floor.position.z += 0.1;
  } else if (e.key == "a") {
    camera.rotation.y += rad(45);
  } else if (e.key == "d") {
    camera.rotation.y -= rad(45);
  }

  if (e.key == "e") {
    if (!door.open) {
      MOD1.rotateAroundPoint(
        door,
        new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(0, 1, 0),
        rad(-90)
      );
    } else {
      MOD1.rotateAroundPoint(
        door,
        new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(0, 1, 0),
        rad(90)
      );
    }
    door.open = !door.open;
    //door.position.x -= 5;
  }

  if (e.key == "f") {
    camera.position.y += 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  if (e.key == "q") {
    camera.position.y -= 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  console.log(`Prediction: ${camera.rotation.y % rad(180)}`);

  document.querySelector(
    "#cubPosLabel"
  ).innerText = `Door Position: (${door.position
    .toArray()
    .map((x) => x.toFixed(2))
    .join(", ")})`;
  document.querySelector(
    "#camPosLabel"
  ).innerText = `Camera Position: (${camera.position
    .toArray()
    .map((x) => x.toFixed(2))
    .join(", ")})`;
  document.querySelector(
    "#camRotLabel"
  ).innerText = `Camera Rotation: (${new THREE.Vector3(0, 0, 0)
    .setFromEuler(camera.rotation)
    .toArray()
    .map((x) => x.toFixed(2))
    .join(", ")})`;
  renderer.render(scene, camera);
});

renderer.render(scene, camera);
MOD1.testy();
