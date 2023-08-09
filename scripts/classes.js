let iterCount = 0;
let resources = [];

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

class Resource {
  constructor(type, x, y, direction, speed) {
    this.type = type;
    this.x = x; // in pixels
    this.y = y; // in pixels
    this.direction = direction;
    this.speed = speed;
    this.remove = false;
  }
  //draws the ore on the conveyor belt
  draw() {
    pen.drawImage(ironResource, this.x, this.y);
  }
  // updates the position of the ore
  update() {
    const LuX = Math.floor((this.x + 1) / 32);
    const TuY = Math.floor((this.y + 1) / 32);
    const RuX = Math.floor((this.x + 31) / 32);
    const BuY = Math.floor((this.y + 31) / 32);
    //right
    if (
      (grid[TuY][LuX] === "conveyorE" && grid[BuY][LuX] === "conveyorE") ||
      (grid[TuY][LuX] === "conveyorNE" && grid[BuY][LuX] === "conveyorNE") ||
      (grid[TuY][LuX] === "conveyorSE" && grid[BuY][LuX] === "conveyorSE")
    ) {
      this.direction.x = 1;
      this.direction.y = 0;
    }
    //left
    if (
      (grid[TuY][RuX] === "conveyorW" && grid[BuY][RuX] === "conveyorW") ||
      (grid[TuY][RuX] === "conveyorNW" && grid[BuY][RuX] === "conveyorNW") ||
      (grid[TuY][RuX] === "conveyorSW" && grid[BuY][RuX] === "conveyorSW")
    ) {
      this.direction.x = -1;
      this.direction.y = 0;
    }
    //up
    if (
      (grid[BuY][RuX] === "conveyorN" && grid[BuY][LuX] === "conveyorE") ||
      (grid[BuY][RuX] === "conveyorEN" && grid[BuY][LuX] === "conveyorEN") ||
      (grid[BuY][RuX] === "conveyorWN" && grid[BuY][LuX] === "conveyorWN")
    ) {
      this.direction.x = 0;
      this.direction.y = -1;
    }
    //down
    if (
      (grid[TuY][RuX] === "conveyorS" && grid[TuY][LuX] === "conveyorE") ||
      (grid[TuY][RuX] === "conveyorES" && grid[TuY][LuX] === "conveyorES") ||
      (grid[TuY][RuX] === "conveyorWS" && grid[TuY][LuX] === "conveyorWS")
    ) {
      this.direction.x = 0;
      this.direction.y = 1;
    }
    if (
      grid[TuY][RuX] === "empty" &&
      grid[BuY][RuX] === "empty" &&
      grid[TuY][LuX] === "empty" &&
      grid[BuY][LuX] === "empty"
    ) {
      this.direction.x = 0;
      this.direction.y = 0;
    }
    //if it enters the smelter mark it to be removed from the array and add xp
    if (
      grid[Math.floor((this.y + 20) / 32)][Math.floor((this.x + 20) / 32)] ===
        "smelter" &&
      grid[Math.floor((this.y + 20) / 32)][Math.floor((this.x + 20) / 32)] ===
        "smelter" &&
      grid[Math.floor((this.y + 20) / 32)][Math.floor((this.x + 20) / 32)] ===
        "smelter" &&
      grid[Math.floor((this.y + 20) / 32)][Math.floor((this.x + 20) / 32)] ===
        "smelter"
    ) {
      xp += xpGain;
      xpLabel.innerHTML = `XP : ${xp}`;
      this.remove = true;
    }
    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;
    this.draw();
  }
}
