// [[CONSTANTS]]

console.log("Heyyyy!!!!! Are you working or WHAT?!");

//i had to write the imports like this because proxy was rewriting and breaking the links

var THREE = await import(
  "https://unpkg.com/three@v0.156.1/build/three.module.js"
);

var MOD1 = await import(
  "/lilMod.js"
);
var currentMap = await import(
  "/currentMap/currentMap.js"
);

try {
  var keyboardCuts = await import(
    "/currentMap/keyboardCuts.js"
  );
} catch (err) {
  console.log(err);
}

print = console.log; //you can use print instead of console.log now

var canvas = document.querySelector("#newCanva"); //substitute for getElementById
var renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setClearColor(0x00cfff);

// [[PROGRAM]]

currentMap.main(renderer);
keyboardCuts.main();
