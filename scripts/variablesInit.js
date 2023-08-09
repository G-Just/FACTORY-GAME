const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");
const xpLabel = document.getElementById("xpLabel");

let grid = JSON.parse(localStorage.getItem("State")) || new Array();
let xp = JSON.parse(localStorage.getItem("Xp")) || 0;
xpLabel.innerHTML = `XP : ${xp}`;

//for upgrades
let conveyorSpeed = 1; // multiplies the speed of the objects traveling on conveyors
let generationRate = 25; // how many frames for each object to generate from mine

// utility
let iterCount = 0;
let resources = [];
let generationTimer = 0;
let directions = ["N", "E", "S", "W"];
let currentDirection = 0;
let buildSelected = false;
let img = document.getElementById("projection");
let columns = new Array();

// Mouse event variable
const mouse = {
  x: undefined,
  y: undefined,
};

const mineButton = document.getElementById("mine");
const conveyorButton = document.getElementById("conveyor");
const smelterButton = document.getElementById("smelter");
const removeButton = document.getElementById("remove");
let tooltip = document.getElementById("tooltip");
