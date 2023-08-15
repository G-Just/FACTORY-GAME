let iterCount = 0;
let resources = [];
let smelterCount = 0;

class Ore {
  constructor(type) {
    this.type = type;
    this.width = 32;
    this.height = 32;
    // generates random coordinates (cannot generate on the edge(border) )
    let setY = Math.floor(Math.random() * grid.length - 5) + 2;
    let setX = Math.floor(Math.random() * columns.length - 5) + 2;
    //if the random coordinate is taken generate another one
    while (grid[setY][setX] !== "empty") {
      setY = Math.floor(Math.random() * grid.length - 5) + 2;
      setX = Math.floor(Math.random() * columns.length - 5) + 2;
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
    // will increase the price of the smellier for each smelter built
    if (this.type === "smelter") {
      smelterCount++;
      smelterCost += smelterCount * 20;
    }
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
    switch (this.type) {
      case "iron":
        pen.drawImage(ironDeposit, this.x, this.y);
        break;
      case "platinum":
        pen.drawImage(platinumDeposit, this.x, this.y);
        break;
      case "gold":
        pen.drawImage(goldDeposit, this.x, this.y);
        break;
    }
  }
  // updates the position of the ore
  update() {
    const LuX = Math.floor((this.x + 2) / 32);
    const TuY = Math.floor((this.y + 2) / 32);
    const RuX = Math.floor((this.x + 30) / 32);
    const BuY = Math.floor((this.y + 30) / 32);
    try {
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
        this.remove = true;
      }
      //if it enters the smelter mark it to be removed from the array and add xp
      if (
        grid[Math.floor((this.y + 16) / 32)][Math.floor((this.x + 16) / 32)] ===
          "smelter" &&
        grid[Math.floor((this.y + 16) / 32)][Math.floor((this.x + 16) / 32)] ===
          "smelter" &&
        grid[Math.floor((this.y + 16) / 32)][Math.floor((this.x + 16) / 32)] ===
          "smelter" &&
        grid[Math.floor((this.y + 16) / 32)][Math.floor((this.x + 16) / 32)] ===
          "smelter"
      ) {
        switch (this.type) {
          case "iron":
            this.xpgain = xpGain.iron;
            xp += this.xpgain;
            break;
          case "platinum":
            this.xpgain = xpGain.platinum;
            xp += this.xpgain;
            break;
          case "gold":
            this.xpgain = xpGain.gold;
            xp += this.xpgain;
            break;
        }
        this.remove = true;
        // money gained text
        let moneyGained = document.createElement("p");
        moneyGained.setAttribute("class", "moneyGained");
        tooltip.insertAdjacentElement("beforebegin", moneyGained);
        moneyGained.style = "opacity:0%";
        moneyGained.innerText = `+$${this.xpgain}`;
        moneyGained.style.top = `${this.y}px`;
        moneyGained.style.left = `${this.x + 160}px`;
        moneyGained.animate(
          [
            { transform: "translateY(0px)", opacity: "100%" },
            { transform: "translateY(-15px)", opacity: "100%" },
            { transform: "translateY(-30px)", opacity: "0%" },
          ],
          { duration: 1000, iterations: 1 }
        );
        setTimeout(() => {
          moneyGained.remove();
        }, 1100);
      }
      this.x += this.direction.x * this.speed;
      this.y += this.direction.y * this.speed;
      this.draw();
    } catch (error) {
      this.remove = true;
    }
  }
}
