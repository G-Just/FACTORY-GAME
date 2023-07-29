class Ore {
  //accepted types = iron, (need to add more later)
  //Places the ore randomly.
  constructor(_type, _position) {
    this.type = _type;

    const AllCellsHTML = document.getElementsByClassName("Empty");
    var AllCells = Array.from(AllCellsHTML);
    const SelectedPlace = AllCells[Math.floor(Math.random() * 629)];
    SelectedPlace.innerHTML = `<i class="fa-solid fa-bolt fa-2xl"></i>`;
    SelectedPlace.classList.add("OreIron");
  }
}

class Building {
  //accepted types = mine, conveyor, smelter
  constructor(_type) {
    this.type = _type;
  }
  //Used to place the building.
  select() {
    const Grid = document.getElementById("gridContainer");
    const CreatingProjection = document.createElement("div");
    CreatingProjection.setAttribute("id", "ProjectionMine");
    CreatingProjection.innerHTML = `<i class="fa-solid fa-industry fa-2xl"></i>`;
    document.body.insertBefore(
      CreatingProjection,
      document.getElementById("guide")
    );
    const Projection = document.getElementById("ProjectionMine");
    Grid.onpointermove = (event) => {
      const { clientX, clientY } = event;
      Projection.style.left = `${Math.floor(clientX / 40) * 40}px`;
      Projection.style.top = `${Math.floor(clientY / 40) * 40}px`;
    };
  }
  place(id) {}
}
// ======================================================================

function build() {
  const MineBuilding = new Building("mine");
  MineBuilding.select();
}

var rows = 20;
var cols = 40;

var grid = new Array(rows);

var timer;
var reproductionTime = 100;

function initializeGrids() {
  for (var i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }
}

function createTable() {
  var gridContainer = document.getElementById("gridContainer");
  var table = document.createElement("table");
  table.setAttribute("cellspacing", "0");
  table.setAttribute("cellpadding", "0");

  for (var i = 0; i < rows; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < cols; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("id", i + "_" + j);
      cell.setAttribute("class", "Empty");
      //attribute class can (for now) have :
      //    1. Empty
      //		2. OreType
      //		3. BuildingType
      //    4. Conveyor
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
}

// Initialize
function initialize() {
  createTable();
  initializeGrids();
  const StarterIron = new Ore("iron");
}

window.onload = initialize;
