//import * as THREE from 'three';

export function rotateAroundPoint(obj, point, axis, rotation) {
  obj.position.sub(point);
  obj.position.applyAxisAngle(axis, rotation);
  obj.position.add(point);

  obj.rotateOnAxis(axis, rotation);
}


export function isThisModuleWorking() {
  console.log("YEAH!");
}

export const rad = (deg) => {
  return parseInt(((deg * Math.PI) / 180).toFixed(5));
};
