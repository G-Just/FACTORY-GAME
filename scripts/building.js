function build(type) {
  canvas.addEventListener("click", (click) => {
    x = Math.floor((click.clientX - 160) / 32);
    y = Math.floor((click.clientY - 10) / 32);
    console.log(x, y, type);
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
  });
}
