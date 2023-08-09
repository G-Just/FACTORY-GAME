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
    "================== Are you sure? ================== \n Note: this will remove all the items currently on conveyor belts"
  );
  if (confirmation) {
    localStorage.clear();
    location.reload();
  }
}
