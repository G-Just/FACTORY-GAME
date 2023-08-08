const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");

let generationTimer = 0;
let resources = [];
let directions = ["N", "E", "S", "W"];
let currentDirection = 0;
let buildSelected = false;
let img = document.getElementById("projection");
let grid = new Array();
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
