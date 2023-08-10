let paused = false;

setInterval(() => {
  if (!paused) {
    localStorage.clear();
    localStorage.setItem("State", JSON.stringify(grid));
    localStorage.setItem("Xp", JSON.stringify(xp));
  }
}, 500);

function reset() {
  paused = true;
  const confirmation = confirm(
    "Are you sure? Note: all the progress will be lost"
  );
  if (confirmation) {
    localStorage.clear();
    location.reload();
  }
}
