let grid = JSON.parse(localStorage.getItem("State")) || new Array();
let columns = new Array();
let xp = JSON.parse(localStorage.getItem("Xp")) || 0;
xpLabel.innerHTML = `XP : ${xp}`;

// 32x32 grid = 50 columns | 28 rows
canvas.width = 1600;
canvas.height = 896;

if (grid.length === 0) {
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
  // Initializing staring classes
  new Ore("iron").add();
}
// after this we have ( array => grid[column:y][row:x] )

//Function that draws the grid
function background_grid() {
  width = 32;
  height = 32;
  x = 0;
  y = -32;
  // canvas grid drawing
  pen.strokeStyle = "rgba(30, 30, 30, 0.3)";
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

//function that upon calling will generate a resource based on the miners location
function resourceGenerate(x, y) {
  generationTimer++;
  // generate a resource every X=25 frames || maybe used for upgrades later to increase speed of generation
  if (generationTimer === generationRate) {
    //right
    if (
      grid[y][x + 1] === "conveyorE" ||
      grid[y][x + 1] === "conveyorEN" ||
      grid[y][x + 1] === "conveyorES"
    ) {
      resources.push(
        new Resource("iron", x * 32 + 19, y * 32, { x: 1, y: 0 }, conveyorSpeed)
      );
    }
    //left
    if (
      grid[y][x - 1] === "conveyorW" ||
      grid[y][x - 1] === "conveyorWN" ||
      grid[y][x - 1] === "conveyorWS"
    ) {
      resources.push(
        new Resource(
          "iron",
          x * 32 - 19,
          y * 32,
          { x: -1, y: 0 },
          conveyorSpeed
        )
      );
    }
    //up
    if (
      grid[y - 1][x] === "conveyorN" ||
      grid[y - 1][x] === "conveyorNE" ||
      grid[y - 1][x] === "conveyorNW"
    ) {
      resources.push(
        new Resource(
          "iron",
          x * 32,
          y * 32 - 19,
          { x: 0, y: -1 },
          conveyorSpeed
        )
      );
    }
    if (
      grid[y + 1][x] === "conveyorS" ||
      grid[y + 1][x] === "conveyorSE" ||
      grid[y + 1][x] === "conveyorSW"
    ) {
      resources.push(
        new Resource("iron", x * 32, y * 32 + 19, { x: 0, y: 1 }, conveyorSpeed)
      );
    }
    generationTimer = 0;
  }
}

// function that draws everything on the board based on the grid cell parameters
function draw() {
  for (let i = 0; i < grid.length; i++) {
    const rows = grid[i];
    for (let j = 0; j < rows.length; j++) {
      switch (grid[i][j]) {
        case "empty":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          break;
        case "iron":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(iron, j * 32, i * 32);
          break;
        case "mine":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(mine, j * 32, i * 32);
          resourceGenerate(j, i);
          break;
        case "conveyorN":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorN, j * 32, i * 32);
          break;
        case "conveyorE":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorE, j * 32, i * 32);
          break;
        case "conveyorS":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorS, j * 32, i * 32);
          break;
        case "conveyorW":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorW, j * 32, i * 32);
          break;
        case "conveyorEN":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorEN, j * 32, i * 32);
          break;
        case "conveyorES":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorES, j * 32, i * 32);
          break;
        case "conveyorNE":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorNE, j * 32, i * 32);
          break;
        case "conveyorNW":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorNW, j * 32, i * 32);
          break;
        case "conveyorSE":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorSE, j * 32, i * 32);
          break;
        case "conveyorSW":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorSW, j * 32, i * 32);
          break;
        case "conveyorWN":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorWN, j * 32, i * 32);
          break;
        case "conveyorWS":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(conveyorWS, j * 32, i * 32);
          break;
        case "smelter":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(smelter, j * 32, i * 32);
          break;
      }
    }
  }
}

function objectCleanUp(obj) {
  result = obj.remove ? false : true;
  delete obj;
  return result;
}

// Animation loop
var delta = 100; //delay between frames
var oldTime = 0;
function animate(currentTime) {
  if (oldTime === 0) {
    oldTime = currentTime;
  }
  if (currentTime - oldTime >= delta) {
    conveyorPathHandler();
    draw();
    background_grid();
    resources.forEach((resource) => {
      resource.update();
    });
    resources = resources.filter(objectCleanUp);
    oldTime = currentTime;
  }
  window.requestAnimationFrame(animate);
}

// Starting animation loop
requestAnimationFrame(animate);

function log() {
  console.log(grid);
}
