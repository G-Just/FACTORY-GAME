// Event listener that gets the mouse event variable values
canvas.addEventListener("mousemove", (mouseMove) => {
  mouse.x = mouseMove.clientX;
  mouse.y = mouseMove.clientY;
});

// Event listener that gets every button click
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "1":
      if (xp >= 5) {
        if (tooltip.style.display === "none") {
          mineButton.click();
        }
      }
      break;
    case "2":
      if (xp >= 1) {
        if (tooltip.style.display === "none") {
          conveyorButton.click();
        }
      }
      break;
    case "3":
      if (xp >= 3) {
        if (tooltip.style.display === "none") {
          smelterButton.click();
        }
      }
      break;
    case "4":
      if (tooltip.style.display === "none") {
        removeButton.click();
      }
      break;
    case "r":
    case "R":
      //if conveyor is selected trigger the rotation
      if (
        img.src === "http://127.0.0.1:5500/art/conveyorBeltN.png" ||
        img.src === "http://127.0.0.1:5500/art/conveyorBeltE.png" ||
        img.src === "http://127.0.0.1:5500/art/conveyorBeltS.png" ||
        img.src === "http://127.0.0.1:5500/art/conveyorBeltW.png"
      ) {
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
      break;
  }
});
