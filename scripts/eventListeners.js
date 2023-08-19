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
    mouseStartX = mouse.x;
    mouseStartY = mouse.y;
  }
});
canvas.addEventListener("mouseup", (event) => {
  if (!buildSelected) {
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
      let result = img.src.match(patternConveyor);
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

//TODO: add scale mechanic to the world map
//scrollwheel event listener will change the scale of the entire game
let scale = 1;
let borderScale = 1;
canvas.addEventListener("wheel", (event) => {
  if (scale > 0.5 && scale <= 1.4) {
    if (event.deltaY < 0) {
      scale += 0.1;
      borderScale -= 0.1;
    }
    if (event.deltaY > 0) {
      scale -= 0.1;
      borderScale += 0.1;
    }
  } else {
    if (scale === 0.5) {
      if (event.deltaY < 0) {
        scale += 0.1;
        borderScale -= 0.1;
      }
    }
    if (scale === 1.5) {
      if (event.deltaY > 0) {
        scale -= 0.1;
        borderScale += 0.1;
      }
    }
  }
  scale = Number(scale.toPrecision(2));
  borderScale = Number(borderScale.toPrecision(2));
  pen.setTransform(scale, 0, 0, scale, coordX, coordY);
});
// context.setTransform(a, b, c, d, e, f)
// a	Scales the drawings horizontally
// b	Skews the drawings horizontally
// c	Skews the drawings vertically
// d	Scales the drawings vertically
// e	Moves the the drawings horizontally
// f	Moves the the drawings vertically
