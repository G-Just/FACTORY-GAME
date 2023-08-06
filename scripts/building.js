let img = document.getElementById("projection");

function projection() {
  x = Math.floor((mouse.x - 160) / 32) * 32;
  y = Math.floor((mouse.y - 10) / 32) * 32;
  img.style.left = `${x + 160}px`;
  img.style.top = `${y + 10}px`;
}

function projectionRemove() {
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
      img.setAttribute("src", "./art/conveyorBelt.png");
      break;
    case "smelter":
      img.style.display = "block";
      img.setAttribute("src", "./art/smelter.png");
      break;
    case "remove":
      break;
  }
  canvas.addEventListener("mousemove", projection);
}

let buildSelected = false;
function buildEvent(type) {
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
            new Building(type, position).add();
            buildSelected = false;
            projectionRemove();
          }
          break;
        case "conveyor":
          if (grid[y][x] === "empty") {
            tooltip.style.display = "none";
            new Building(type, position).add();
            buildSelected = false;
            projectionRemove();
          }
          break;
        case "smelter":
          if (grid[y][x] === "empty") {
            tooltip.style.display = "none";
            new Building(type, position).add();
            buildSelected = false;
            projectionRemove();
          }
          break;
        case "remove":
          if (grid[y][x] !== "iron") {
            tooltip.style.display = "none";
            if (grid[y][x] === "mine") {
              grid[y][x] = "iron";
              buildSelected = false;
            } else {
              grid[y][x] = "empty";
              buildSelected = false;
            }
          }
          break;
      }
      this.removeEventListener("click", build);
      tooltip.style.display = "none";
      buildSelected = false;
    });
  }
}
