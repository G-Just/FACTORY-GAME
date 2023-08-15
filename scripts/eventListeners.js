// Event listener that gets the mouse event variable values
canvas.addEventListener("mousemove", (mouseMove) => {
  mouse.x = mouseMove.clientX;
  mouse.y = mouseMove.clientY;
});

let mouseStartX;
let mouseStartY;
canvas.addEventListener("mousedown", (event) => {
  if (!buildSelected) {
    mouse.mouseDown = true;
    mouse.mouseUp = false;
    mouseStartX = mouse.x;
    mouseStartY = mouse.y;
  }
});
canvas.addEventListener("mouseup", (event) => {
  if (!buildSelected) {
    mouse.mouseUp = true;
    mouse.mouseDown = false;
  }
});

// Event listener that gets every button click
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "1":
      mineButton.click();
      break;
    case "2":
      conveyorButton.click();
      break;
    case "3":
      smelterButton.click();
      break;
    case "4":
      removeButton.click();
      break;
    case "r":
    case "R":
      let patternConveyor = /conveyorBelt/i;
      let patternLogistics = /sorter/i;
      let result = img.src.match(patternConveyor);
      let result2 = img.src.match(patternLogistics); // TODO: add the merger/splitter art + logic
      //if conveyor is selected trigger the rotation
      if (result !== null) {
        if (currentDirection === 3) {
          currentDirection = 0;
        } else {
          currentDirection++;
        }
        img.setAttribute(
          "src",
          "./art/conveyorBelt" + directions[currentDirection] + ".png"
        );
      }
      break;
    case "Escape": //FIXME: escape does not remove the event listener
      // Esc button should remove the click listener form canvas in building.js (idk how)
      tooltip.style.display = "none";
      projectionRemove();
      if (upgradeWindow.style.display === "block") {
        upgradeWindow.style.display = "none";
      }
      break;
  }
});
