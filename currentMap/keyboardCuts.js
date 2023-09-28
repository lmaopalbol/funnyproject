// [MODULES]
var THREE = await import(
  "http" + "s://unpkg.com/three@v0.156.1/build/three.module.js"
);
var MOD1 = await import(
  "../../lilMod.js"
);
var currentMap = await import("currentMap.js");

// [GLOBAL CONSTANTS]



export function main() {
  window.addEventListener("keydown", function (e) {

    var [scene, camera] = [
      currentMap.getCurrentScene(),
      currentMap.getCurrentCamera()
    ];
    var door = currentMap.getCurrentParts().door;
    var renderer = currentMap.getCurrentParts().renderer;

    var lala = new THREE.Vector3(0, 0, 0).setFromEuler(camera.rotation);

    var doodoo = new THREE.Vector3(
      -Math.sin(lala.y),
      0,
      Math.cos(lala.y - Math.PI)
    );

    if (e.key == "w" && !camera.isMovingZ) {
      //camera.position.add(doodoo.normalize());
      camera.isMovingZ = true
      {
        var loop_count = 0;
        var loop = setInterval(function(){
          camera.position.add(doodoo.normalize().multiplyScalar(0.1));
          loop_count++;
          renderer.render(scene, camera);

          if (loop_count > 50) {
            clearInterval(loop);
            camera.isMovingZ = false;
          }
        }, 1)
      }
    } else if (e.key == "s" && !camera.isMovingZ) {
      camera.isMovingZ = true
      {
        var loop_count = 0;
        var loop = setInterval(function(){
          camera.position.sub(doodoo.normalize().multiplyScalar(0.1));
          loop_count++;
          renderer.render(scene, camera);

          if (loop_count > 50) {
            clearInterval(loop);
            camera.isMovingZ = false;
          }
        }, 1)
      }
      //floor.position.z += 0.1;
    } else if (e.key == "a" && !camera.isMovingX) {
      camera.isMovingX = true;
      {
        var loop_count = 0;
        var loop = setInterval(function(){
          camera.rotation.y += MOD1.rad(1);
          loop_count++;
          renderer.render(scene, camera);

          if (loop_count > 45) {
            clearInterval(loop);
            camera.isMovingX = false;
          }
        }, 1)
      }
    } else if (e.key == "d" && !camera.isMovingX) {
      camera.isMovingX = true;
      {
        var loop_count = 0;
        var loop = setInterval(function(){
          camera.rotation.y -= MOD1.rad(1);
          loop_count++;
          renderer.render(scene, camera);

          if (loop_count > 45) {
            clearInterval(loop);
            camera.isMovingX = false;
          }
        }, 1)
      }
    }

    //Door opening demo
    if (e.key == "e" && !door.opening) {
      door.opening = true;
      { //im wrapping this in a block just to make the variables below local
        var loop_count = 0;
        var loop = setInterval(function(){
          MOD1.rotateAroundPoint(
            door,
            new THREE.Vector3(2, 0, 0),
            new THREE.Vector3(0, 1, 0),
            MOD1.rad((door.open ? 1 : -1))
          )
          renderer.render(scene, camera);

          loop_count++;
          if (loop_count > 90) {
            clearInterval(loop);
            door.opening = false;
            door.open = !door.open;
          }
        }, 10)
      }
    }

    if (e.key == "f") { //this doesnt exist
      camera.position.y += 1;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    if (e.key == "q") {
      camera.position.y -= 1;
      camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    console.log(`Prediction: ${camera.rotation.y % MOD1.rad(180)}`);

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
}
