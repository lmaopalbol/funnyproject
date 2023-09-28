import * as THREE from "three";
import { PerspectiveCamera } from "three";

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";

var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 3, 100);

camera.position.z = 5;

var scene = new THREE.Scene();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var mat = new THREE.MeshPhongMaterial({ color: 0xff00ff });

var cube = new THREE.Mesh(geometry, mat);
scene.add(cube);

var cub3 = new THREE.Mesh(
  new THREE.BoxGeometry(6, 9, 3),
  new THREE.MeshBasicMaterial({ color: 0x5ea892 })
);

scene.add(cub3);

cub3.position.z = -3;

var count = 0;

{
  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

camera.lookAt(0, cube.position.y, cube.position.z);

function animate() {
  requestAnimationFrame(animate);
  //camera.lookAt(0, cube.position.y, cube.position.z);

  count++;
  if (count >= 360) {
    count = 0;
  }
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

window.addEventListener("keydown", function (e) {
  if (e.keyCode == 65) {
    camera.position.x -= 1;
  } else if (e.keyCode == 68) {
    camera.position.x += 1;
  } else if (e.keyCode == 87) {
    camera.position.z -= 1;
  } else if (e.keyCode == 83) {
    camera.position.z += 1;
  }
});

animate();
