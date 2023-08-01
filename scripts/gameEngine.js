const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");

// 32x32 grid = 50 columns | 28 rows
canvas.width = 1600;
canvas.height = 896;

let grid = new Array();
let columns = new Array();

class Memory {
  constructor() {
    //Create a grid array with data inside (0 = empty)
    //Height of the array (rows)
    for (let j = 0; j < 30; j++) {
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
  }
}

class Background {
  constructor() {
    this.x = 0;
    this.y = -32;
    this.width = 32;
    this.height = 32;
  }
  draw() {
    // canvas background color
    pen.fillStyle = "rgb(221, 255, 201)";
    pen.fillRect(0, 0, 1600, 896);
    // canvas grid drawing
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
  }
  generate() {
    this.generatePosition = grid[Math.floor(Math.random() * grid.length)][
      Math.floor(Math.random() * grid[0].length + 1)
    ] = 1;
  }
  place() {
    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid[row].length; column++) {
        if (grid[row][column] === 1) {
          pen.fillStyle = "black";
          pen.font = "40px consolas";
          pen.fillText("O", column * 32 + 5, row * 32 - 3);
        }
      }
    }
  }
}

class Building {
  constructor(type) {
    this.type = type;
  }
  place() {
    for (let row = 0; row < grid.length + 1; row++) {
      for (let column = 0; column < grid[row].length; column++) {
        if (grid[row][column] === 1) {
          pen.fillStyle = "black";
          pen.font = "40px consolas";
          pen.fillText("B", column * 32 + 5, row * 32 - 3);
          grid[row][column] = 2;
        }
      }
    }
  }
}

function animate() {
  window.requestAnimationFrame(animate);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "1") {
    new Building("mine").place();
    console.log("selected [1] mine building");
  }
});

//Initialization
//Memory load in first always
new Memory();

const background = new Background();
background.draw();
const startingIronOre = new Ore("iron");
startingIronOre.generate();
startingIronOre.place();

animate();
