// this triggers with animate loop and reforms the conveyor path connecting them with curves
function conveyorPathHandler() {
  for (let i = 0; i < grid.length; i++) {
    const rows = grid[i];
    for (let j = 0; j < rows.length; j++) {
      switch (grid[i][j]) {
        case "conveyorN":
          //right
          if (
            grid[i][j + 1] === "conveyorW" ||
            grid[i][j + 1] === "conveyorSW" ||
            grid[i][j + 1] === "conveyorNW"
          ) {
            grid[i][j] = "conveyorWN";
          }
          if (
            grid[i][j + 1] === "conveyorE" ||
            grid[i][j + 1] === "conveyorES" ||
            grid[i][j + 1] === "conveyorEN"
          ) {
            grid[i][j] = "conveyorNE";
          }
          //left
          if (
            grid[i][j - 1] === "conveyorW" ||
            grid[i][j - 1] === "conveyorWS" ||
            grid[i][j - 1] === "conveyorWN"
          ) {
            grid[i][j] = "conveyorNW";
          }
          if (
            grid[i][j - 1] === "conveyorE" ||
            grid[i][j - 1] === "conveyorSE" ||
            grid[i][j - 1] === "conveyorNE"
          ) {
            grid[i][j] = "conveyorEN";
          }
          //down - ignore
          //up - ignore
          break;
        case "conveyorS":
          //right
          if (
            grid[i][j + 1] === "conveyorE" ||
            grid[i][j + 1] === "conveyorES" ||
            grid[i][j + 1] === "conveyorEN"
          ) {
            grid[i][j] = "conveyorSE";
          }
          if (
            grid[i][j + 1] === "conveyorW" ||
            grid[i][j + 1] === "conveyorSW" ||
            grid[i][j + 1] === "conveyorNW"
          ) {
            grid[i][j] = "conveyorWS";
          }
          //left
          if (
            grid[i][j - 1] === "conveyorE" ||
            grid[i][j - 1] === "conveyorSE" ||
            grid[i][j - 1] === "conveyorNE"
          ) {
            grid[i][j] = "conveyorES";
          }
          if (
            grid[i][j - 1] === "conveyorW" ||
            grid[i][j - 1] === "conveyorWS" ||
            grid[i][j - 1] === "conveyorWN"
          ) {
            grid[i][j] = "conveyorSW";
          }
          //down - ignore
          //up - ignore
          break;
        case "conveyorE":
          //right - ignore
          //left - ignore
          //down
          if (
            grid[i + 1][j] === "conveyorN" ||
            grid[i + 1][j] === "conveyorWN" ||
            grid[i + 1][j] === "conveyorEN"
          ) {
            grid[i][j] = "conveyorNE";
          }
          if (
            grid[i + 1][j] === "conveyorS" ||
            grid[i + 1][j] === "conveyorSW" ||
            grid[i + 1][j] === "conveyorSE"
          ) {
            grid[i][j] = "conveyorES";
          }
          //up
          if (
            grid[i - 1][j] === "conveyorS" ||
            grid[i - 1][j] === "conveyorWS" ||
            grid[i - 1][j] === "conveyorES"
          ) {
            grid[i][j] = "conveyorSE";
          }
          if (
            grid[i - 1][j] === "conveyorN" ||
            grid[i - 1][j] === "conveyorNW" ||
            grid[i - 1][j] === "conveyorNE"
          ) {
            grid[i][j] = "conveyorEN";
          }
          break;
        case "conveyorW":
          //right - ignore
          //left - ignore
          //down
          if (
            grid[i + 1][j] === "conveyorN" ||
            grid[i + 1][j] === "conveyorWN" ||
            grid[i + 1][j] === "conveyorEN"
          ) {
            grid[i][j] = "conveyorNW";
          }
          if (
            grid[i + 1][j] === "conveyorS" ||
            grid[i + 1][j] === "conveyorSW" ||
            grid[i + 1][j] === "conveyorSE"
          ) {
            grid[i][j] = "conveyorWS";
          }
          //up
          if (
            grid[i - 1][j] === "conveyorS" ||
            grid[i - 1][j] === "conveyorWS" ||
            grid[i - 1][j] === "conveyorES"
          ) {
            grid[i][j] = "conveyorSW";
          }
          if (
            grid[i - 1][j] === "conveyorN" ||
            grid[i - 1][j] === "conveyorNW" ||
            grid[i - 1][j] === "conveyorNE"
          ) {
            grid[i][j] = "conveyorWN";
          }
          break;
          break;
      }
    }
  }
}

function resourceGenerate(x, y) {
  generationTimer++;
  // generate a resource every X=25 frames || maybe used for upgrades later to increase speed of generation
  if (generationTimer === 25) {
    //right
    if (
      grid[y][x + 1] === "conveyorE" ||
      grid[y][x + 1] === "conveyorEN" ||
      grid[y][x + 1] === "conveyorES"
    ) {
      resources.push(new Resource("iron", x * 32 + 23, y * 32));
    }
    //left
    if (
      grid[y][x - 1] === "conveyorW" ||
      grid[y][x - 1] === "conveyorWN" ||
      grid[y][x - 1] === "conveyorWS"
    ) {
      resources.push(new Resource("iron", x * 32 - 23, y * 32));
    }
    //up
    if (
      grid[y - 1][x] === "conveyorN" ||
      grid[y - 1][x] === "conveyorNE" ||
      grid[y - 1][x] === "conveyorNW"
    ) {
      resources.push(new Resource("iron", x * 32, y * 32 - 23));
    }
    if (
      grid[y + 1][x] === "conveyorS" ||
      grid[y + 1][x] === "conveyorSE" ||
      grid[y + 1][x] === "conveyorSW"
    ) {
      resources.push(new Resource("iron", x * 32, y * 32 + 23));
    }
    generationTimer = 0;
  }
}

//TEMPORARY REMOVE ON FINAL BUILD
function getGrid() {
  console.log(grid);
}
