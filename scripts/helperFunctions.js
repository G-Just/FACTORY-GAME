const upgradeWindow = document.getElementById("upgrade-window");

function openUpgradeWindow() {
  upgradeWindow.style.display = "block";
}

function closeUpgradeWindow() {
  upgradeWindow.style.display = "none";
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
