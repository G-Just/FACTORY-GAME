var rows = 17;
var cols = 37;

var grid = new Array(rows);

var timer;
var reproductionTime = 100;

function initializeGrids() {
  for (var i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
  }
}

// Initialize
function initialize() {
  createTable();
  initializeGrids();
}

function createTable() {
  var gridContainer = document.getElementById("gridContainer");
  var table = document.createElement("table");

  for (var i = 0; i < rows; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < cols; j++) {
      //
      var cell = document.createElement("td");
      cell.setAttribute("id", i + "_" + j);
      cell.setAttribute("class", "dead");
      tr.appendChild(cell);
    }
    table.appendChild(tr);
  }
  gridContainer.appendChild(table);
}

window.onload = initialize;
