function projectionCoordinates() {
  img.style.width = `${32 * scale}px`;
  img.style.height = `${32 * scale}px`;
  x = Math.floor((mouse.x - 160) / (32 * scale)) * (32 * scale);
  y = Math.floor((mouse.y - 10) / (32 * scale)) * (32 * scale);
  img.style.left = `${x + 160}px`;
  img.style.top = `${y + 10}px`;
}

function projectionRemove() {
  img.style.display = "none";
  // not needed. Coordinates will update (remove if lag issues? -> unlikely)
  // canvas.removeEventListener("mousemove", projectionCoordinates);
}

function project(type) {
  if (!buildSelected) {
    buildSelected = true;
    switch (type) {
      case "mine":
        img.style.display = "block";
        img.setAttribute("src", "./art/mine.png");
        break;
      case "conveyor":
        img.style.display = "block";
        img.setAttribute(
          "src",
          "./art/conveyorBelt" + directions[currentDirection] + ".png"
        );
        break;
      case "smelter":
        img.style.display = "block";
        img.setAttribute("src", "./art/smelter.png");
        break;
      case "remove":
        img.style.display = "block";
        img.setAttribute("src", "./art/remove.png");
        break;
    }
    canvas.addEventListener("mousemove", projectionCoordinates);
  }
}

function buildEvent(type) {
  tooltip.style.display = "block";
  //case looks if user has enough xp and disables the building event if not
  switch (type) {
    case "mine":
      if (xp < mineCost) {
        displayError("Insufficient funds");
        return;
      }
      break;
    case "conveyor":
      if (xp < conveyorCost) {
        displayError("Insufficient funds");
        return;
      }
      break;
    case "smelter":
      if (xp < smelterCost) {
        displayError("Insufficient funds");
        return;
      }
      break;
  }
  // start projection event (takes the html element and adds mousemove follow)
  project(type);
  // text of what is currently selected
  // changes the text based on what was selected
  switch (type) {
    case "mine":
      tooltip.innerHTML = "Now building : Mine";
      break;
    case "conveyor":
      tooltip.innerHTML = "Now building : Conveyor ('r' to rotate)";
      break;
    case "smelter":
      tooltip.innerHTML = "Now building : Smelter";
      break;
    case "remove":
      tooltip.innerHTML = "Click to remove a building";
      break;
  }
  // adds click event to the canvass and executes build on click
  canvas.addEventListener("click", function build() {
    x = Math.floor((mouse.x - 160) / (32 * scale));
    y = Math.floor((mouse.y - 10) / (32 * scale));
    const position = { x: x + currentGridOffsetX, y: y + currentGridOffsetY };
    switch (type) {
      case "mine":
        if (
          grid[y + currentGridOffsetY][x + currentGridOffsetX] === "iron" ||
          grid[y + currentGridOffsetY][x + currentGridOffsetX] === "platinum" ||
          grid[y + currentGridOffsetY][x + currentGridOffsetX] === "gold"
        ) {
          tooltip.style.display = "none";
          xp -= mineCost;
          new Building(
            type + grid[y + currentGridOffsetY][x + currentGridOffsetX],
            position
          ).add();
          buildSelected = false;
          projectionRemove();
        } else {
          displayError("Invalid location");
          projectionRemove();
        }
        break;
      case "conveyor":
        if (grid[y + currentGridOffsetY][x + currentGridOffsetX] === "empty") {
          tooltip.style.display = "none";
          xp -= conveyorCost;
          new Building(type, position, directions[currentDirection]).add();
          buildSelected = false;
          projectionRemove();
        } else {
          displayError("Invalid location");
          projectionRemove();
        }
        break;
      case "smelter":
        if (grid[y + currentGridOffsetY][x + currentGridOffsetX] === "empty") {
          tooltip.style.display = "none";
          xp -= smelterCost;
          new Building(type, position).add();
          buildSelected = false;
          projectionRemove();
        } else {
          displayError("Invalid location");
          projectionRemove();
        }
        break;
      case "remove":
        switch (grid[y + currentGridOffsetY][x + currentGridOffsetX]) {
          case "mineiron":
            tooltip.style.display = "none";
            xp += mineCost;
            grid[y + currentGridOffsetY][x + currentGridOffsetX] = "iron";
            buildSelected = false;
            projectionRemove();
            break;
          case "mineplatinum":
            tooltip.style.display = "none";
            xp += mineCost;
            grid[y + currentGridOffsetY][x + currentGridOffsetX] = "platinum";
            buildSelected = false;
            projectionRemove();
            break;
          case "minegold":
            tooltip.style.display = "none";
            xp += mineCost;
            grid[y + currentGridOffsetY][x + currentGridOffsetX] = "gold";
            buildSelected = false;
            projectionRemove();
            break;
          case "conveyorE":
          case "conveyorEN":
          case "conveyorES":
          case "conveyorN":
          case "conveyorNE":
          case "conveyorNW":
          case "conveyorS":
          case "conveyorSE":
          case "conveyorSW":
          case "conveyorW":
          case "conveyorWN":
          case "conveyorWS":
          case "conveyorESN":
          case "conveyorESW":
          case "conveyorEWN":
          case "conveyorSWN":
            tooltip.style.display = "none";
            xp += conveyorCost;
            grid[y + currentGridOffsetY][x + currentGridOffsetX] = "empty";
            buildSelected = false;
            projectionRemove();
            break;
          case "smelter":
            tooltip.style.display = "none";
            smelterCost -= smelterCount * 20;
            smelterCount--;
            xp += smelterCost;
            grid[y + currentGridOffsetY][x + currentGridOffsetX] = "empty";
            buildSelected = false;
            projectionRemove();
            break;
          case "empty":
            tooltip.style.display = "none";
            buildSelected = false;
            projectionRemove();
        }
        break;
    }
    this.removeEventListener("click", build);
    buildSelected = false;
  });
}
