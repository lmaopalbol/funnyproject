// [[CONSTANTS]]

//i had to write the imports like this because proxy was rewriting and breaking the links
var THREE = await import(
  "http" + "s://unpkg.com/three@v0.156.1/build/three.module.js"
);

var MOD1 = await import(
  "http" + "s://gloomyunwelcomedebuggers.yoshimon44.repl.co/lilMod.js"
);
var currentMap = await import(
  "http" + "s://gloomyunwelcomedebuggers.yoshimon44.repl.co/currentMap/currentMap.js"
);
var keyboardCuts = await import(
  "http" +
"s://gloomyunwelcomedebuggers.yoshimon44.repl.co/currentMap/keyboardCuts.js"
);

print = console.log; //you can use print instead of console.log now

var canvas = document.querySelector("#newCanva"); //substitute for getElementById
var renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setClearColor(0x00cfff);

// [[PROGRAM]]

currentMap.main(renderer);
keyboardCuts.main();
