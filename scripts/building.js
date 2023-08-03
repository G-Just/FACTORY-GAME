let buildSelected = false;

function buildEvent(type) {
  if (!buildSelected) {
    buildSelected = true;
    canvas.addEventListener("click", function build() {
      x = Math.floor((mouse.x - 160) / 32);
      y = Math.floor((mouse.y - 10) / 32);
      const position = { x: x, y: y };
      switch (type) {
        case "mine":
          if (grid[y][x] === "iron") {
            new Building(type, position).add();
          }
          break;
        case "conveyor":
          if (grid[y][x] === "empty") {
            new Building(type, position).add();
          }
          break;
        case "smelter":
          if (grid[y][x] === "empty") {
            new Building(type, position).add();
          }
          break;
      }
      this.removeEventListener("click", build);
      buildSelected = false;
    });
  }
}
