setInterval(() => {
  localStorage.clear();
  localStorage.setItem("State", JSON.stringify(grid));
  localStorage.setItem("Xp", JSON.stringify(xp));
}, 5000);

function reset() {
  const confirmation = confirm(
    "================== Are you sure? ================== \n Note: this will remove all the items currently on conveyor belts"
  );
  //FIXME: maybe overkill but sometimes doesn't clear the storage
  if (confirmation) {
    while (localStorage.getItem("State")) {
      localStorage.clear();
    }
    location.reload();
  }
}
