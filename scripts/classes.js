class Ore {
  constructor(type) {
    this.type = type;
    this.width = 32;
    this.height = 32;
    let setY = Math.floor(Math.random() * 28);
    let setX = Math.floor(Math.random() * 50);
    //if the random coordinate is taken generate another one
    while (grid[setY][setX] !== "empty") {
      setY = Math.floor(Math.random() * 28);
      setX = Math.floor(Math.random() * 50);
    }
    this.position = { setX, setY };
  }
  add() {
    grid[this.position.setY][this.position.setX] = this.type;
  }
  destroy() {
    grid[this.position.setY][this.position.setX] = "empty";
  }
}

class Building {
  constructor(type) {
    this.type = type;
    this.width = 32;
    this.height = 32;
  }
  add() {
    grid[y / this.height][x / this.width] = this.type;
  }
}
