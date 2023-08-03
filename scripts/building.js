let buildSelected = false;
function buildEvent(type) {
  if (!buildSelected) {
    buildSelected = true;
    canvas.addEventListener("click", function build() {
      x = Math.floor((mouse.x - 160) / 32);
      y = Math.floor((mouse.y - 10) / 32);
      console.log(type);
      switch (type) {
        case "mine":
          if (grid[y][x] === "iron") {
            grid[y][x] = type;
          }
          break;
        case "conveyor":
          if (grid[y][x] === "empty") {
            grid[y][x] = type;
          }
          break;
        case "smelter":
          if (grid[y][x] === "empty") {
            grid[y][x] = type;
          }
          break;
      }
      this.removeEventListener("click", build);
      buildSelected = false;
    });
  }
}
