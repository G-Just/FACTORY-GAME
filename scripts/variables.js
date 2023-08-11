const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");
const xpLabel = document.getElementById("xpLabel");

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
