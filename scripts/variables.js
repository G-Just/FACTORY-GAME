const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");
const xpLabel = document.getElementById("xpLabel");

// utility
let directions = ["N", "E", "S", "W"];
let currentDirection = 0;
let buildSelected = false;

//projection element used to show what is being built
let img = document.getElementById("projection");

//tooltip used to display messages
let tooltip = document.getElementById("tooltip");

// mouse event variable
const mouse = {
  x: undefined,
  y: undefined,
};
