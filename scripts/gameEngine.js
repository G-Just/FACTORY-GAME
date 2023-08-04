const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");

// 32x32 grid = 50 columns | 28 rows
canvas.width = 1600;
canvas.height = 896;

let grid = new Array();
let columns = new Array();

//Create a grid array with data inside (0 = empty)
//Height of the array (rows)
for (let j = 0; j < 29; j++) {
  if (columns.length !== 0) {
    grid.push(columns);
  }
  columns = [];
  //Width of the array (columns)
  for (let i = 0; i < 50; i++) {
    columns.push("empty");
  }
}
// after this we have ( array => grid[column:y][row:x] )

//Function that draws the grid
function background_grid() {
  width = 32;
  height = 32;
  x = 0;
  y = -32;
  // canvas grid drawing
  pen.strokeStyle = "rgba(124, 138, 118)";
  grid.forEach((column) => {
    pen.moveTo(x, y);
    y += 32;
    x = 0;
    grid[0].forEach((row) => {
      pen.moveTo(x, y);
      pen.strokeRect(x, y, width, height);
      x += 32;
    });
  });
}

// Mouse event variable
const mouse = {
  x: undefined,
  y: undefined,
};

// Event listener that gets the mouse event variable values
canvas.addEventListener("mousemove", (mouseMove) => {
  mouse.x = mouseMove.clientX;
  mouse.y = mouseMove.clientY;
});

// Event listener that gets every button click
const mineButton = document.getElementById("mine");
const conveyorButton = document.getElementById("conveyor");
const smelterButton = document.getElementById("smelter");
const removeButton = document.getElementById("remove");
let tooltip = document.getElementById("tooltip");
window.addEventListener("keydown", (event) => {
  if (tooltip.style.display === "none") {
    tooltip.style.display = "block";
    switch (event.key) {
      case "1":
        mineButton.click();
        break;
      case "2":
        conveyorButton.click();
        break;
      case "3":
        smelterButton.click();
        break;
      case "4":
        removeButton.click();
        break;
      case "r":
        conveyorPathHandler();
        break;
    }
  }
});

// function that draws everything on the board based on the grid cell parameters
function draw() {
  for (let i = 0; i < grid.length; i++) {
    const rows = grid[i];
    for (let j = 0; j < rows.length; j++) {
      switch (grid[i][j]) {
        case "empty":
          pen.drawImage(grass, 31, 62, 31, 31, j * 32, i * 32, 31, 31);
          break;
        case "iron":
          pen.drawImage(grass, 31, 62, 31, 31, j * 32, i * 32, 31, 31);
          pen.drawImage(iron, j * 32, i * 32);
          break;
        case "mine":
          pen.fillStyle = "green";
          pen.fillRect(j * 32, i * 32, 32, 32);
          break;
        case "conveyor":
          pen.drawImage(conveyor, 1, 1, 31, 31, j * 32 + 1, i * 32, 32, 32);
          break;
        case "smelter":
          pen.fillStyle = "yellow";
          pen.fillRect(j * 32, i * 32, 32, 32);
          break;
      }
    }
  }
}

// Initializing staring classes
const startingOre = new Ore("iron").add();

// Animation loop
var delta = 100; //delay between frames
var oldTime = 0;
function animate(currentTime) {
  if (oldTime === 0) {
    oldTime = currentTime;
  }
  if (currentTime - oldTime >= delta) {
    background_grid();
    draw();
    oldTime = currentTime;
  }
  window.requestAnimationFrame(animate);
}

// Starting animation loop
requestAnimationFrame(animate);
