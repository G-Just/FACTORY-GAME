const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");
const xpLabel = document.getElementById("xpLabel");

//for upgrades
let xp = JSON.parse(localStorage.getItem("Xp")) || 10; // starting XP
let conveyorSpeed = 1; // multiplies the speed of the objects traveling on conveyors * 1 default
let generationRate = 25; // how many frames for each object to generate from mine *25 default
let xpGain = 1; // how much xp will one object give upon delivery *1 default
// defines what is the current building tier will be used to determine colors/sorites
let conveyorTier = 1;
let mineTier = 1;
let resourceTier = 1;

// utility
let generationTimer = 0;
let directions = ["N", "E", "S", "W"];
let currentDirection = 0;
let buildSelected = false;
let img = document.getElementById("projection");

// Mouse event variable
const mouse = {
  x: undefined,
  y: undefined,
};
