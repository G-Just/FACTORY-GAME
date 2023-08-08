// 32x32 grid = 50 columns | 28 rows
canvas.width = 1600;
canvas.height = 896;

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
// Event listener that gets the mouse event variable values
canvas.addEventListener("mousemove", (mouseMove) => {
  mouse.x = mouseMove.clientX;
  mouse.y = mouseMove.clientY;
});

// Event listener that gets every button click
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "1":
      if (tooltip.style.display === "none") {
        mineButton.click();
      }
      break;
    case "2":
      if (tooltip.style.display === "none") {
        conveyorButton.click();
      }
      break;
    case "3":
      if (tooltip.style.display === "none") {
        smelterButton.click();
      }
      break;
    case "4":
      if (tooltip.style.display === "none") {
        removeButton.click();
      }
      break;
    case "r":
      //if conveyor is selected trigger the rotation
      if (
        img.src === "http://127.0.0.1:5500/art/conveyorBeltN.png" ||
        img.src === "http://127.0.0.1:5500/art/conveyorBeltE.png" ||
        img.src === "http://127.0.0.1:5500/art/conveyorBeltS.png" ||
        img.src === "http://127.0.0.1:5500/art/conveyorBeltW.png"
      ) {
        if (currentDirection === 3) {
          currentDirection = 0;
        } else {
          currentDirection++;
        }
        img.setAttribute(
          "src",
          "./art/conveyorBelt" + directions[currentDirection] + ".png"
        );
      }
      break;
    case "Escape":
      // Esc button should remove the click listener form canvas in building.js (idk how)
      tooltip.style.display = "none";
      projectionRemove();
      break;
  }
});

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

console.log(resources);
