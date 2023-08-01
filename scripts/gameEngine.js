const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");

// 32x32 grid = 50 columns | 28 rows
canvas.width = 1600;
canvas.height = 896;

// canvas background color
pen.fillStyle = "rgb(221, 255, 201)";
pen.fillRect(0, 0, 1600, 896);

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
    columns.push(0);
  }
}
// after this we have ( array => grid[row][column] )

class Grid {
  constructor() {
    // draw a grid
    this.x = 0;
    this.y = -32;
    this.width = 32;
    this.height = 32;
  }
  // Draws the grid based on grid array
  draw() {
    pen.strokeStyle = "black";

    grid.forEach((column) => {
      pen.moveTo(this.x, this.y);
      this.y += 32;
      this.x = 0;
      grid[0].forEach((row) => {
        pen.moveTo(this.x, this.y);
        pen.strokeRect(this.x, this.y, this.width, this.height);
        this.x += 32;
      });
    });
  }
}

class Ore {
  constructor(type) {
    this.type = type;
    this.position = {
      x: Math.floor(Math.random() * 50) * 32,
      y: Math.floor(Math.random() * 27) * 32,
    };
    // Prevents the text from spawning above the canvas
    if (this.position.y === 0) {
      this.position.y += 32;
    }
    // Offset for the text to spawn in the center of the cell
    this.xoffset = 5;
    this.yoffset = 3;
  }
  spawn() {
    pen.fillStyle = "black";
    pen.font = "40px consolas";
    pen.fillText(
      "O",
      this.position.x + this.xoffset,
      this.position.y - this.yoffset
    );
  }
}

function spawn() {
  ironOre = new Ore("iron").spawn();
}

gameGrid = new Grid().draw();

function animate() {
  window.requestAnimationFrame(animate);
}

animate();
