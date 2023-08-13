// Event listener that gets the mouse event variable values
canvas.addEventListener("mousemove", (mouseMove) => {
  mouse.x = mouseMove.clientX;
  mouse.y = mouseMove.clientY;
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
      let pattern = /conveyorBelt/i;
      let result = img.src.match(pattern);
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
