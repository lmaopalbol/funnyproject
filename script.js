// [[CONSTANTS]]

//i had to write the imports like this because proxy was rewriting and breaking the links
var THREE = await import(
  "https://unpkg.com/three@v0.156.1/build/three.module.js"
);

var MOD1 = await import(
  "/lilMod.js"
);
var currentMap1 = await import(
  "/currentMap/currentMap.js"
);

var keyboardCuts = await import(
  "/currentMap/keyboardCuts.js"
);

print = console.log; //you can use print instead of console.log now

var canvas = document.querySelector("#newCanva"); //substitute for getElementById
var renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setClearColor(0x00cfff);

// [[PROGRAM]]

currentMap1.main(renderer);
keyboardCuts.main();
