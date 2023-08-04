let buildSelected = false;
function buildEvent(type) {
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
            break;
          }
        case "conveyor":
          if (grid[y][x] === "empty") {
            tooltip.style.display = "none";
            new Building(type, position).add();
            buildSelected = false;
          }
          break;
        case "smelter":
          if (grid[y][x] === "empty") {
            tooltip.style.display = "none";
            new Building(type, position).add();
            buildSelected = false;
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
    });
  }
}
