var THREE = await import(
    "http" + "s://unpkg.com/three@v0.156.1/build/three.module.js"
  );
var MOD1 = await import(
    "../../lilMod.js"
);

var currentMap = await import("/currentMap/currentMap.js");

var [scene, camera] = [currentMap.getCurrentScene(), currentMap.getCurrentCamera()];

export function isCameraColliding(){ //only designed for not walking through the current map walls/door.
    if (!camera) {
        return;
    }
}