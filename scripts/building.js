function projectionCoordinates() {
  x = Math.floor((mouse.x - 160) / 32) * 32;
  y = Math.floor((mouse.y - 10) / 32) * 32;
  img.style.left = `${x + 160}px`;
  img.style.top = `${y + 10}px`;
}

function projectionRemove() {
  img.style.display = "none";
  canvas.removeEventListener("mousemove", projection);
}

function project(type) {
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
      break;
  }
  canvas.addEventListener("mousemove", projectionCoordinates);
}

function buildEvent(type) {
  switch (type) {
    case "mine":
      if (xp < 5) {
        return;
      }
      break;
    case "conveyor":
      if (xp < 1) {
        return;
      }
      break;
    case "smelter":
      if (xp < 3) {
        return;
      }
      break;
  }
  project(type);
  if (!buildSelected) {
    tooltip = document.getElementById("tooltip");
    tooltip.style.display = "block";
    switch (type) {
      case "mine":
        tooltip.innerHTML = "Now building : Mine";
        break;
      case "conveyor":
        tooltip.innerHTML = "Now building : Conveyor";
        break;
      case "smelter":
        tooltip.innerHTML = "Now building : Smelter";
        break;
      case "remove":
        tooltip.innerHTML = "Click to remove a building";
        break;
    }
    buildSelected = true;
    canvas.addEventListener("click", function build() {
      x = Math.floor((mouse.x - 160) / 32);
      y = Math.floor((mouse.y - 10) / 32);
      const position = { x: x, y: y };
      switch (type) {
        case "mine":
          if (grid[y][x] === "iron") {
            tooltip.style.display = "none";
            xp -= 5;
            new Building(type, position).add();
            buildSelected = false;
            projectionRemove();
          } else {
            tooltip.style.display = "none";
            projectionRemove();
          }
          break;
        case "conveyor":
          if (grid[y][x] === "empty") {
            tooltip.style.display = "none";
            xp -= 1;
            new Building(type, position, directions[currentDirection]).add();
            buildSelected = false;
            projectionRemove();
          }
          tooltip.style.display = "none";
          projectionRemove();
          break;
        case "smelter":
          if (grid[y][x] === "empty") {
            tooltip.style.display = "none";
            xp -= 3;
            new Building(type, position).add();
            buildSelected = false;
            projectionRemove();
          }
          tooltip.style.display = "none";
          projectionRemove();
          break;
        case "remove":
          switch (grid[y][x]) {
            case "mine":
              tooltip.style.display = "none";
              xp += 5;
              grid[y][x] = "iron";
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
              tooltip.style.display = "none";
              xp += 1;
              grid[y][x] = "empty";
              buildSelected = false;
              projectionRemove();
              break;
            case "smelter":
              tooltip.style.display = "none";
              xp += 3;
              grid[y][x] = "empty";
              buildSelected = false;
              projectionRemove();
              break;
          }
          break;
      }
      this.removeEventListener("click", build);
      tooltip.style.display = "none";
      buildSelected = false;
    });
  }
}
