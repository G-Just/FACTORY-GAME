const canvas = document.querySelector("canvas");
const pen = canvas.getContext("2d");

// 32x32 grid = 50 columns | 28 rows
canvas.width = 1600;
canvas.height = 896;

let grid = new Array();
let columns = new Array();

//Create a grid array with data inside (0 = empty)
//Height of the array (rows)
for (let j = 0; j < 30; j++) {
  if (columns.length !== 0) {
    grid.push(columns);
  }
  columns = [];
  //Width of the array (columns)
  for (let i = 0; i < 50; i++) {
    columns.push(0);
  }
}
// after this we have ( array => grid[row][column] )

function background_grid() {
  width = 32;
  height = 32;
  x = 0;
  y = -32;
  // canvas background color
  pen.fillStyle = "rgb(221, 255, 201)";
  pen.fillRect(0, 0, 1600, 896);
  // canvas grid drawing
  pen.strokeStyle = "black";
  grid.forEach((column) => {
    pen.moveTo(x, y);
    y += 32;
    x = 0;
    grid[0].forEach((row) => {
      pen.moveTo(x, y);
      pen.strokeRect(x, y, width, height);
      x += 32;
    });
  });
}

function animate() {
  window.requestAnimationFrame(animate);
}

animate();
