class Ore {
  //accepted types = iron, (need to add more later)
  //Places the ore randomly.
  constructor(_type, _position) {
    this.type = _type;

    const AllCellsHTML = document.getElementsByClassName("Empty");
    var AllCells = Array.from(AllCellsHTML);
    const SelectedPlace = AllCells[Math.floor(Math.random() * 629)];
    SelectedPlace.innerHTML = `<i class="fa-solid fa-bolt fa-2xl"></i>`;
    SelectedPlace.classList = "OreIron";
  }
}

class Building {
  //accepted types = mine, conveyor, smelter
  constructor(_type) {
    this.type = _type;
    if (_type === "mine") {
      this.building = `<i class="fa-solid fa-oil-well fa-xl"></i>`;
    }
    if (_type === "conveyor") {
      this.building = `<i class="fa-solid fa-arrow-right fa-2xl"></i>`;
    }
    if (_type === "smelter") {
      this.building = `<i class="fa-solid fa-industry fa-xl"></i>`;
    }
  }
  //Used to place the building.
  select() {
    const CreatingProjection = document.createElement("div");
    CreatingProjection.setAttribute("id", "Projection");
    CreatingProjection.innerHTML = this.building;
    document.body.insertBefore(
      CreatingProjection,
      document.getElementById("guide")
    );
    const Grid = document.getElementById("gridContainer");
    const Projection = document.getElementById("Projection");
    Grid.onpointermove = (event) => {
      const { clientX, clientY } = event;
      Projection.style.left = `${Math.floor(clientX / 40) * 40}px`;
      Projection.style.top = `${Math.floor(clientY / 40) * 40}px`;
      document.addEventListener("click", (e) => {
        let elementClass = e.target.classList;
        if (this.type === "mine") {
          if (elementClass[0] === "OreIron") {
            Projection.remove();
            e.target.innerHTML = this.building;
            e.target.classlist = "BuildingMine";
          }
        }
        if (this.type === "conveyor") {
          if (elementClass[0] === "Empty") {
            Projection.remove();
            e.target.innerHTML = this.building;
            e.target.classlist = "BuildingConveyor";
          }
        }
        if (this.type === "smelter") {
          if (elementClass[0] === "Empty") {
            Projection.remove();
            e.target.innerHTML = this.building;
            e.target.classlist = "BuildingSmelter";
          }
        }
      });
    };
  }
}
// ======================================================================

function buildMine() {
  if (!document.getElementById("Projection")) {
    const MineBuilding = new Building("mine");
    MineBuilding.select();
  }
}
function buildConveyor() {
  if (!document.getElementById("Projection")) {
    const ConveyorBuilding = new Building("conveyor");
    ConveyorBuilding.select();
  }
}
function buildSmelter() {
  if (!document.getElementById("Projection")) {
    const SmelterBuilding = new Building("smelter");
    SmelterBuilding.select();
  }
}
