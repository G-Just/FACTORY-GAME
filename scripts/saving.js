let paused = false;

setInterval(() => {
  if (!paused) {
    localStorage.clear();
    localStorage.setItem("State", JSON.stringify(grid));
    localStorage.setItem("Xp", JSON.stringify(xp));
    localStorage.setItem("SmelterCost", JSON.stringify(smelterCost));
    localStorage.setItem("ConveyorSpeed", JSON.stringify(conveyorSpeed));
    localStorage.setItem("GenerationRate", JSON.stringify(generationRate));
    localStorage.setItem("XpGain", JSON.stringify(xpGain));
    localStorage.setItem("Tiers", JSON.stringify(tiers));
    localStorage.setItem("Prices", JSON.stringify(upgradePrices));
  }
}, 1000);

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
