const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");
const xpLabel = document.getElementById("xpLabel");

//for upgrades
let conveyorSpeed = 1; // multiplies the speed of the objects traveling on conveyors
let generationRate = 25; // how many frames for each object to generate from mine
let xpGain = 1; // how much xp will one object give upon delivery

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
