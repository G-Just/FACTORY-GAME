let xp = JSON.parse(localStorage.getItem("Xp")) || 10; // starting XP * 10 default
let conveyorSpeed = JSON.parse(localStorage.getItem("ConveyorSpeed")) || 1; // multiplies the speed of the objects traveling on conveyors * 1 default
let generationRate = JSON.parse(localStorage.getItem("GenerationRate")) || 25; // how many frames for each object to generate from a mine *25 default
let xpGain = JSON.parse(localStorage.getItem("XpGain")) || 1; // how much xp will one object give upon delivery *1 default

// defines what is the current building tier will be used to determine colors/sprites *maybe
let tiers = JSON.parse(localStorage.getItem("Tiers")) || {
  mineTier: 1,
  conveyorTier: 1,
  smelterTier: 1,
}; // 6 tiers
let upgradePrices = JSON.parse(localStorage.getItem("Prices")) || {
  mineUpgradePrice: 90000,
  conveyorUpgradePrice: 700,
  smelterUpgradePrice: 150000,
};

//building cost labels
let mineCostLabel = document.getElementById("minePrice");
let conveyorCostLabel = document.getElementById("conveyorPrice");
let smelterCostLabel = document.getElementById("smelterPrice");
//upgrade cost labels
let mineUpgradeCostLabel = document.getElementById("minerUpgrade");
let conveyorUpgradeCostLabel = document.getElementById("conveyorUpgrade");
let smelterUpgradeCostLabel = document.getElementById("smelterUpgrade");
//upgrade named text
let minerUpgradeText = document.getElementById("minerUpgradeText");
let conveyorUpgradeText = document.getElementById("conveyorUpgradeText");
let smelterUpgradeText = document.getElementById("smelterUpgradeText");

mineUpgradeCostLabel.innerHTML = `$${numberWithCommas(
  upgradePrices.mineUpgradePrice
)}`;
conveyorUpgradeCostLabel.innerHTML = `$${numberWithCommas(
  upgradePrices.conveyorUpgradePrice
)}`;
smelterUpgradeCostLabel.innerHTML = `$${numberWithCommas(
  upgradePrices.smelterUpgradePrice
)}`;

minerUpgradeText.innerHTML = `Miner speed<br>Tier: ${tiers.mineTier}`;
conveyorUpgradeText.innerHTML = `Conveyor speed<br>Tier: ${tiers.mineTier}`;
smelterUpgradeText.innerHTML = `Ore price<br>Tier: ${tiers.mineTier}`;

// prices
let mineCost = 5;
let conveyorCost = 1;
// gets the remembered cost of the smelter * default 3
let smelterCost = JSON.parse(localStorage.getItem("SmelterCost")) || 3;

function upgradeQuality(type) {
  switch (type) {
    case "minerUpgrade":
      if (tiers.mineTier < 6) {
        if (xp < upgradePrices.mineUpgradePrice) {
          tooltip.style.display = "block";
          tooltip.innerHTML = "Not enough money";
          setTimeout(() => {
            tooltip.style.display = "none";
          }, 1000);
        } else {
          xp -= upgradePrices.mineUpgradePrice;
          tiers.mineTier++;
          upgradePrices.mineUpgradePrice =
            tiers.mineTier * upgradePrices.mineUpgradePrice;
          mineUpgradeCostLabel.innerHTML = `$${numberWithCommas(
            upgradePrices.mineUpgradePrice
          )}`;
          minerUpgradeText.innerHTML = `Miner speed<br>Tier: ${tiers.mineTier}`;
          generationRate = 25 + tiers.mineTier * -1;
        }
      }
      break;
    case "conveyorUpgrade":
      if (tiers.conveyorTier < 6) {
        if (xp < upgradePrices.conveyorUpgradePrice) {
          tooltip.style.display = "block";
          tooltip.innerHTML = "Not enough money";
          setTimeout(() => {
            tooltip.style.display = "none";
          }, 1000);
        } else {
          resources = [];
          xp -= upgradePrices.conveyorUpgradePrice;
          tiers.conveyorTier++;
          upgradePrices.conveyorUpgradePrice =
            tiers.conveyorTier * upgradePrices.conveyorUpgradePrice;
          conveyorUpgradeCostLabel.innerHTML = `$${numberWithCommas(
            upgradePrices.conveyorUpgradePrice
          )}`;
          conveyorUpgradeText.innerHTML = `Conveyor speed<br>Tier: ${tiers.conveyorTier}`;
          conveyorSpeed = 0.5 * tiers.conveyorTier;
        }
      }
      break;
    case "smelterUpgrade":
      if (tiers.smelterTier < 6) {
        if (xp < upgradePrices.smelterUpgradePrice) {
          tooltip.style.display = "block";
          tooltip.innerHTML = "Not enough money";
          setTimeout(() => {
            tooltip.style.display = "none";
          }, 1000);
        } else {
          xp -= upgradePrices.smelterUpgradePrice;
          tiers.smelterTier++;
          upgradePrices.smelterUpgradePrice =
            tiers.smelterTier * upgradePrices.smelterUpgradePrice;
          smelterUpgradeCostLabel.innerHTML = `$${numberWithCommas(
            upgradePrices.smelterUpgradePrice
          )}`;
          smelterUpgradeText.innerHTML = `Ore price<br>Tier: ${tiers.smelterTier}`;
          xpGain = tiers.smelterTier;
        }
      }
      break;
  }
}

let depositCount = 1;
function addOre(type) {
  //FIXME: SOMETHING IS COMPLETELY FUCKED UP
  if (depositCount < 4) {
    xp -= 2;
    switch (type) {
      case "iron":
        new Ore("iron").add();
        depositCount++;
        break;
    }
  } else {
    tooltip.style.display = "block";
    tooltip.innerHTML = "Cannot get more than 4 for now! SRY :(";
    setTimeout(() => {
      tooltip.style.display = "none";
    }, 1000);
  }
}
