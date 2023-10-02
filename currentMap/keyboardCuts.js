// [MODULES]
console.log("I'm still alive.")


var THREE = await import(
  "http" + "s://unpkg.com/three@v0.156.1/build/three.module.js"
);
var MOD1 = await import(
  "../../lilMod.js"
);
try {
  var currentMap = await import("/currentMap/currentMap.js");
} catch (err) {
  console.log(`keyboardCuts error: ${err}`);
}

// [GLOBAL CONSTANTS]

var [wPressed, aPressed, sPressed, dPressed] = [0, 0, 0, 0];
var [pressedDebounceZ, pressedDebounceX] = [false, false];
var listOfKeys = {
  'w': false,
  'a': false,
  's': false,
  'd': false
};

// [HELPER FUNCTIONS]

function updateLabels(door, camera){
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
}

export function main() {
  window.addEventListener("keyup", function(e){
    if (listOfKeys.hasOwnProperty(e.key)) {
      listOfKeys[e.key] = false;
    };
  })

  window.addEventListener("keydown", function (e) {

    var [scene, camera] = [
      currentMap.getCurrentScene(),
      currentMap.getCurrentCamera()
    ];
    var door = currentMap.getCurrentParts().door;
    var renderer = currentMap.getCurrentParts().renderer;

    var lala = new THREE.Vector3(0, 0, 0).setFromEuler(camera.rotation);

    //after reading some code on the internet i have realized i couldve copied that code the entire time. also i accidentally made a backwards world 💀
    var doodoo = new THREE.Vector3(
      -Math.sin(lala.y),
      Math.sin(lala.x),
      Math.cos(lala.y-Math.PI)
    );
    
    console.log(doodoo);


    if (e.key == "w" && !pressedDebounceZ) {
      listOfKeys.w = true;
      pressedDebounceZ = true;
      setTimeout(function(){
        pressedDebounceZ = false;
      }, 188)

      if (!camera.isMovingZ) {
        camera.isMovingZ = true;
        {
          var loop_count = 0;
          var loop = setInterval(function(){
            camera.position.add(doodoo.normalize().multiplyScalar(0.1));
            loop_count++;
            renderer.render(scene, camera);
            updateLabels(door, camera);
  
            if (loop_count > 50) {
              loop_count = 0;

              if (listOfKeys.w == false) {
                clearInterval(loop);
                camera.isMovingZ = false;
              }
            }
          }, 1)
        }
      }
    }

    if (e.key == "s" && !pressedDebounceZ) {
      listOfKeys.s = true;
      pressedDebounceZ = true;
      setTimeout(function(){
        pressedDebounceZ = false;
      }, 188)

      if (!camera.isMovingZ) {
        camera.isMovingZ = true;
        {
          var loop_count = 0;
          var loop = setInterval(function(){
            camera.position.sub(doodoo.normalize().multiplyScalar(0.1));
            loop_count++;
            renderer.render(scene, camera);
            updateLabels(door, camera);
  
            if (loop_count > 50) {
              loop_count = 0;

              if (listOfKeys.s == false) {
                clearInterval(loop);
                camera.isMovingZ = false;
              }
            }
          }, 1)
        }
      }
    }
    
    if (e.key == "a" && !pressedDebounceX) {
      listOfKeys.a = true;

      pressedDebounceX = true;
      setTimeout(function(){
        pressedDebounceX = false;
      }, 168)

      if (!camera.isMovingX) {
        camera.isMovingX = true;
        {
          var desiredResult = camera.rotationInDegrees.y + 45;
          console.log(desiredResult);

          var loop_count = 0;
          var loop = setInterval(function(){
            if (camera.rotationInDegrees.y < desiredResult) {
              camera.rotationInDegrees.y += 1;
            } else {
              camera.rotationInDegrees.y = desiredResult;
            }
            camera.rotation.y = MOD1.rad(camera.rotationInDegrees.y);
            loop_count++;
            renderer.render(scene, camera);
            updateLabels(door, camera);
  
            if (loop_count > 45) {
              loop_count = 0;
              desiredResult += 45;

              if (listOfKeys.a == false) {
                clearInterval(loop);
                camera.isMovingX = false;
              }
            }
          }, 1)
        }
      }
    } else if (e.key == "d" && !pressedDebounceX) {
      listOfKeys.d = true;

      pressedDebounceX = true;
      setTimeout(function(){
        pressedDebounceX = false;
      }, 168)

      if (!camera.isMovingX) {
        camera.isMovingX = true;
        {
          var desiredResult = camera.rotationInDegrees.y - 45;
          console.log(desiredResult);

          var loop_count = 0;
          var loop = setInterval(function(){
            if (camera.rotationInDegrees.y > desiredResult) {
              camera.rotationInDegrees.y -= 1;
            } else {
              camera.rotationInDegrees.y = desiredResult;
            }

            camera.rotation.y = MOD1.rad(camera.rotationInDegrees.y);
            loop_count++;
            renderer.render(scene, camera);
            updateLabels(door, camera);
  
            if (loop_count > 45) {
              loop_count = 0;
              camera.rotationInDegrees.y = desiredResult;
              desiredResult -= 45;

              if (listOfKeys.d == false) {
                clearInterval(loop);
                camera.isMovingX = false;
              }
            }
          }, 1)
        }
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
          updateLabels(door, camera);

          loop_count++;
          if (loop_count > 90) {
            clearInterval(loop);
            door.opening = false;
            door.open = !door.open;
          }
        }, 10)
      }
    }

    if (e.key == "f") { //this doesnt exist, pls dont use :))))
      camera.position.y += 1;
      camera.rotation.x += 0.25;
      updateLabels(door, camera);
    }

    if (e.key == "q") {
      camera.position.y -= 1;
      camera.rotation.x -= 1/4;
      updateLabels(door, camera);
    }

    console.log(`Prediction: ${camera.rotation.y % MOD1.rad(180)}`);


    renderer.render(scene, camera);
    updateLabels(door, camera);
  });
}
