class Ore {
  constructor(type) {
    this.type = type;
    this.width = 32;
    this.height = 32;
    // generates random coordinates (cannot generate on the edge(border) )
    let setY = Math.floor(Math.random() * 26) + 1;
    let setX = Math.floor(Math.random() * 48) + 1;
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
  constructor(type, position, cardinalDirection = "") {
    this.type = type;
    this.width = 32;
    this.height = 32;
    this.position = position;
    this.cardinalDirection = cardinalDirection;
  }
  add() {
    grid[this.position.y][this.position.x] = this.type + this.cardinalDirection;
  }
}
