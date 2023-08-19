let grid = JSON.parse(localStorage.getItem("State")) || new Array();
let columns = new Array();
// 32x32 grid = 50 columns | 28 rows
canvas.width = 1600;
canvas.height = 896;

if (grid.length === 0) {
  //Create a grid array with data inside (0 = empty)
  //Height of the array (rows)
  for (let j = 0; j <= 100; j++) {
    if (columns.length !== 0) {
      grid.push(columns);
    }
    columns = [];
    //Width of the array (columns)
    for (let i = 0; i < 100; i++) {
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
let generationTimer = 0;
let coords = [];
let coordsFinal = [];
function resourceGenerate(x, y, type) {
  generationTimer++;
  coords.push({ x: x, y: y, type: type });
  // magical code WHO DA FUCK KNOWS HOW THIS WORKS
  // Removes all the duplicates from coords and makes a unique only coordsfinal array
  coordsFinal = coords.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.x === value.x && t.y === value.y)
  );
}

let presetInterval = setInterval(() => {
  coords = [];
  coordsFinal.forEach((mine) => {
    // generate a resource every X=25 frames || maybe used for upgrades later to increase speed of generation
    //right
    if (
      grid[mine.y][mine.x + 1] === "conveyorE" ||
      grid[mine.y][mine.x + 1] === "conveyorEN" ||
      grid[mine.y][mine.x + 1] === "conveyorES"
    ) {
      resources.push(
        new Resource(
          mine.type,
          mine.x * 32,
          mine.y * 32,
          { x: 1, y: 0 },
          conveyorSpeed
        )
      );
    }
    //left
    if (
      grid[mine.y][mine.x - 1] === "conveyorW" ||
      grid[mine.y][mine.x - 1] === "conveyorWN" ||
      grid[mine.y][mine.x - 1] === "conveyorWS"
    ) {
      resources.push(
        new Resource(
          mine.type,
          mine.x * 32,
          mine.y * 32,
          { x: -1, y: 0 },
          conveyorSpeed
        )
      );
    }
    //up
    if (
      grid[mine.y - 1][mine.x] === "conveyorN" ||
      grid[mine.y - 1][mine.x] === "conveyorNE" ||
      grid[mine.y - 1][mine.x] === "conveyorNW"
    ) {
      resources.push(
        new Resource(
          mine.type,
          mine.x * 32,
          mine.y * 32,
          { x: 0, y: -1 },
          conveyorSpeed
        )
      );
    }
    //down
    if (
      grid[mine.y + 1][mine.x] === "conveyorS" ||
      grid[mine.y + 1][mine.x] === "conveyorSE" ||
      grid[mine.y + 1][mine.x] === "conveyorSW"
    ) {
      resources.push(
        new Resource(
          mine.type,
          mine.x * 32,
          mine.y * 32,
          { x: 0, y: 1 },
          conveyorSpeed
        )
      );
    }
  });
  coordsFinal = [];
}, generationRate);

function resetInterval() {
  clearInterval(presetInterval);
  presetInterval = setInterval(() => {
    coords = [];
    coordsFinal.forEach((mine) => {
      // generate a resource every X=25 frames || maybe used for upgrades later to increase speed of generation
      //right
      if (
        grid[mine.y][mine.x + 1] === "conveyorE" ||
        grid[mine.y][mine.x + 1] === "conveyorEN" ||
        grid[mine.y][mine.x + 1] === "conveyorES"
      ) {
        resources.push(
          new Resource(
            mine.type,
            mine.x * 32,
            mine.y * 32,
            { x: 1, y: 0 },
            conveyorSpeed
          )
        );
      }
      //left
      if (
        grid[mine.y][mine.x - 1] === "conveyorW" ||
        grid[mine.y][mine.x - 1] === "conveyorWN" ||
        grid[mine.y][mine.x - 1] === "conveyorWS"
      ) {
        resources.push(
          new Resource(
            mine.type,
            mine.x * 32,
            mine.y * 32,
            { x: -1, y: 0 },
            conveyorSpeed
          )
        );
      }
      //up
      if (
        grid[mine.y - 1][mine.x] === "conveyorN" ||
        grid[mine.y - 1][mine.x] === "conveyorNE" ||
        grid[mine.y - 1][mine.x] === "conveyorNW"
      ) {
        resources.push(
          new Resource(
            mine.type,
            mine.x * 32,
            mine.y * 32,
            { x: 0, y: -1 },
            conveyorSpeed
          )
        );
      }
      //down
      if (
        grid[mine.y + 1][mine.x] === "conveyorS" ||
        grid[mine.y + 1][mine.x] === "conveyorSE" ||
        grid[mine.y + 1][mine.x] === "conveyorSW"
      ) {
        resources.push(
          new Resource(
            mine.type,
            mine.x * 32,
            mine.y * 32,
            { x: 0, y: 1 },
            conveyorSpeed
          )
        );
      }
    });
    coordsFinal = [];
  }, generationRate);
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
        case "platinum":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(platinum, j * 32, i * 32);
          break;
        case "gold":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(gold, j * 32, i * 32);
          break;
        case "mineiron":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(mine, j * 32, i * 32);
          resourceGenerate(j, i, "iron"); // when mine is drawn on canvas trigger resource generation
          break;
        case "mineplatinum":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(mine, j * 32, i * 32);
          resourceGenerate(j, i, "platinum"); // when mine is drawn on canvas trigger resource generation
          break;
        case "minegold":
          pen.drawImage(grass, 32, 64, 32, 32, j * 32, i * 32, 32, 32);
          pen.drawImage(mine, j * 32, i * 32);
          resourceGenerate(j, i, "gold"); // when mine is drawn on canvas trigger resource generation
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

let incomeLabel = document.getElementById("income");
let oldxp = 0;
let newxp = xp;
let timer = 1;
let gained = 0;
let total = xp * -1;
setInterval(() => {
  if (timer <= 60) {
    newxp = xp;
    gained = newxp - oldxp;
    total += gained;
    oldxp = newxp;
    incomeLabel.innerHTML = `$${Math.round(total)}`;
    timer++;
  } else {
    timer = 1;
    total = 0;
  }
}, 1000);

function offset() {
  coordX = pen.getTransform().m41;
  coordY = pen.getTransform().m42;
  if (mouse.mouseDown) {
    offsetX = (mouseStartX - mouse.x) * -1 * scale;
    offsetY = (mouseStartY - mouse.y) * -1 * scale;
    pen.translate(offsetX, offsetY);
    mouseStartX = mouse.x;
    mouseStartY = mouse.y;
  }
  if (!mouse.mouseDown) {
    let working = false;
    // console.log(coordX, coordY); // DEBUGGING LOG
    if (coordX > 0) {
      pen.setTransform(scale, 0, 0, scale, 0, coordY);
      working = true;
    }
    if (coordX < grid[0].length * (-32 * scale) + canvas.width) {
      pen.setTransform(
        scale,
        0,
        0,
        scale,
        grid[0].length * (-32 * scale) + canvas.width,
        coordY
      );
      working = true;
    }
    if (coordY > 0) {
      pen.setTransform(scale, 0, 0, scale, coordX, 0);
      working = true;
    }
    if (coordY < grid.length * (-32 * scale) + canvas.height) {
      pen.setTransform(
        scale,
        0,
        0,
        scale,
        coordX,
        grid.length * (-32 * scale) + canvas.height
      );
      working = true;
    }
    working = false;
    if (!working) {
      offsetSnap(coordX, coordY);
    }
  }
}
// context.setTransform(a, b, c, d, e, f)
// a	Scales the drawings horizontally
// b	Skews the drawings horizontally
// c	Skews the drawings vertically
// d	Scales the drawings vertically
// e	Moves the the drawings horizontally
// f	Moves the the drawings vertically

function offsetSnap(x, y) {
  //FIXME: the scale at some point rounds into an error and the edge is slightly off (can live with that, but could be fixed)
  let working = false;
  // target to the nearest (32*scale) cell
  targetX = Math.round(Math.round(x / (32 * scale)) * 32 * scale);
  targetY = Math.round(Math.round(y / (32 * scale)) * 32 * scale);
  // console.log(
  //   "X:",
  //   x,
  //   "Y:",
  //   y,
  //   "|| TARGET",
  //   targetX,
  //   targetY,
  //   "SCALE",
  //   scale
  // ); //DEBUGGING LOG
  if (targetX < grid[0].length * (-32 * scale) + canvas.width) {
    targetX = grid[0].length * (-32 * scale) + canvas.width;
  }
  if (targetY < grid.length * (-32 * scale) + canvas.height) {
    targetY = grid.length * (-32 * scale) + canvas.height;
  }
  if (x > targetX) {
    pen.setTransform(scale, 0, 0, scale, targetX, targetY);
    working = true;
  }
  if (x < targetX) {
    pen.setTransform(scale, 0, 0, scale, targetX, targetY);
    working = true;
  }
  if (y > targetY) {
    pen.setTransform(scale, 0, 0, scale, targetX, targetY);
    working = true;
  }
  if (y < targetY) {
    pen.setTransform(scale, 0, 0, scale, targetX, targetY);
    working = true;
  }
  //creates the offset on the grid so that the clicks correspond to the correct cell -> grid index
  currentGridOffsetX = Math.round(x / (32 * scale));
  currentGridOffsetY = Math.round(y / (32 * scale));
  // if the offset is not 0 -> meaning its been moved flip the value to a positive to apply in the grid array index calls
  if (currentGridOffsetX !== 0) {
    currentGridOffsetX *= -1;
  }
  if (currentGridOffsetY !== 0) {
    currentGridOffsetY *= -1;
  }
}
// context.setTransform(a, b, c, d, e, f)
// a	Scales the drawings horizontally
// b	Skews the drawings horizontally
// c	Skews the drawings vertically
// d	Scales the drawings vertically
// e	Moves the the drawings horizontally
// f	Moves the the drawings vertically

// Animation loop
var delta = 1000 / 60; //delay between frames
var oldTime = 0;
function animate(currentTime) {
  if (oldTime === 0) {
    oldTime = currentTime;
  }
  if (currentTime - oldTime >= delta) {
    pen.clearRect(-1000, -1000, 35000, 35000);
    offset();
    conveyorPathHandler();
    draw();
    background_grid();
    resources.forEach((resource) => {
      resource.update();
    });
    oldTime = currentTime;
  }
  window.requestAnimationFrame(animate);
}

// Starting animation loop
requestAnimationFrame(animate);

setInterval(() => {
  updateLabels();
  resources = resources.filter(objectCleanUp);
  if (tiers.mineTier === 6) {
    minerUpgradeText.innerHTML = `Miner speed<br>Tier: MAX`;
    mineUpgradeCostLabel.innerHTML = "";
  }
  if (tiers.conveyorTier === 6) {
    conveyorUpgradeText.innerHTML = `Conveyor speed<br>Tier: MAX`;
    conveyorUpgradeCostLabel.innerHTML = "";
  }
  if (tiers.smelterTier === 6) {
    smelterUpgradeText.innerHTML = `Ore price<br>Tier: MAX`;
    smelterUpgradeCostLabel.innerHTML = "";
  }
}, 10);
