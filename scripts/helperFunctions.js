const upgradeWindow = document.getElementById("upgrade-window");

function openUpgradeWindow() {
  if (upgradeWindow.style.display === "block") {
    upgradeWindow.style.display = "none";
  } else {
    upgradeWindow.style.display = "block";
  }
}

function closeUpgradeWindow() {
  upgradeWindow.style.display = "none";
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayError(message) {
  tooltip.style.display = "block";
  tooltip.innerHTML = message;
  setTimeout(() => {
    tooltip.style.display = "none";
  }, 1000);
}

function log() {
  console.log(grid);
}
