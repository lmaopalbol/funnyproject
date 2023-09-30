/*
  [greetings]
    -[this module is a collection of certain things i may or may not want to use throughout this project]
    -[idk bro]
*/

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
  return parseFloat(((deg * Math.PI) / 180));
};
