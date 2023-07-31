// Building the grid
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
  table.setAttribute("id", "table");

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
