let xp = JSON.parse(localStorage.getItem("Xp")) || 10; // starting XP * 10 default
let conveyorSpeed = JSON.parse(localStorage.getItem("ConveyorSpeed")) || 0.2; // multiplies the speed of the objects traveling on conveyors * 1 default
let generationRate = JSON.parse(localStorage.getItem("GenerationRate")) || 2000; // how many ms for each object to generate from a mine *2000 default
let xpGain = JSON.parse(localStorage.getItem("XpGain")) || {
  iron: 1,
  platinum: 3,
  gold: 5,
}; // how much xp will one object give upon delivery *1 default

// defines what is the current building tier will be used to determine colors/sprites *maybe
let tiers = JSON.parse(localStorage.getItem("Tiers")) || {
  mineTier: 1,
  conveyorTier: 1,
  smelterTier: 1,
}; // max 6 tiers
let upgradePrices = JSON.parse(localStorage.getItem("Prices")) || {
  // prices can be adjusted based on the needs
  mineUpgradePrice: 5000,
  conveyorUpgradePrice: 700,
  smelterUpgradePrice: 7000,
  ironUpgradePrice: 100,
  platinumUpgradePrice: 1000,
  goldUpgradePrice: 5000,
};

// building prices
let mineCost = 5;
let conveyorCost = 1;
// gets the remembered cost of the smelter * default 3
let smelterCost = JSON.parse(localStorage.getItem("SmelterCost")) || 3;

//building cost labels
let mineCostLabel = document.getElementById("minePrice");
let conveyorCostLabel = document.getElementById("conveyorPrice");
let smelterCostLabel = document.getElementById("smelterPrice");
//upgrade cost labels
let mineUpgradeCostLabel = document.getElementById("minerUpgrade");
let conveyorUpgradeCostLabel = document.getElementById("conveyorUpgrade");
let smelterUpgradeCostLabel = document.getElementById("smelterUpgrade");
let ironUpgradeCostLabel = document.getElementById("ironUpgradePrice");
let platinumUpgradeCostLabel = document.getElementById("platinumUpgradePrice");
let goldUpgradeCostLabel = document.getElementById("goldUpgradePrice");
//upgrade named text
let minerUpgradeText = document.getElementById("minerUpgradeText");
let conveyorUpgradeText = document.getElementById("conveyorUpgradeText");
let smelterUpgradeText = document.getElementById("smelterUpgradeText");

function updateLabels() {
  mineUpgradeCostLabel.innerHTML = `$${numberWithCommas(upgradePrices.mineUpgradePrice)}`;
  conveyorUpgradeCostLabel.innerHTML = `$${numberWithCommas(
    upgradePrices.conveyorUpgradePrice
  )}`;
  smelterUpgradeCostLabel.innerHTML = `$${numberWithCommas(
    upgradePrices.smelterUpgradePrice
  )}`;
  ironUpgradeCostLabel.innerHTML = `$${numberWithCommas(upgradePrices.ironUpgradePrice)}`;
  platinumUpgradeCostLabel.innerHTML = `$${numberWithCommas(
    upgradePrices.platinumUpgradePrice
  )}`;
  goldUpgradeCostLabel.innerHTML = `$${numberWithCommas(upgradePrices.goldUpgradePrice)}`;
  minerUpgradeText.innerHTML = `Miner speed<br>Tier: ${tiers.mineTier}`;
  conveyorUpgradeText.innerHTML = `Conveyor speed<br>Tier: ${tiers.conveyorTier}`;
  smelterUpgradeText.innerHTML = `Ore price<br>Tier: ${tiers.smelterTier}`;
  xpLabel.innerHTML = `$${numberWithCommas(xp)}`;
  mineCostLabel.innerText = `$${mineCost}`;
  conveyorCostLabel.innerText = `$${conveyorCost}`;
  smelterCostLabel.innerText = `$${smelterCost}`;
}

function upgradeQuality(type) {
  switch (type) {
    case "minerUpgrade":
      if (tiers.mineTier < 6) {
        if (xp < upgradePrices.mineUpgradePrice) {
          displayError("Insufficient funds");
        } else {
          xp -= upgradePrices.mineUpgradePrice;
          tiers.mineTier++;
          upgradePrices.mineUpgradePrice =
            tiers.mineTier * upgradePrices.mineUpgradePrice;
          updateLabels();
          generationRate -= 300; // delay between generation
          resetInterval();
        }
      }
      break;
    case "conveyorUpgrade":
      if (tiers.conveyorTier < 6) {
        if (xp < upgradePrices.conveyorUpgradePrice) {
          displayError("Insufficient funds");
        } else {
          resources = [];
          xp -= upgradePrices.conveyorUpgradePrice;
          tiers.conveyorTier++;
          upgradePrices.conveyorUpgradePrice =
            tiers.conveyorTier * upgradePrices.conveyorUpgradePrice;
          updateLabels();
          conveyorSpeed = 0.25 * tiers.conveyorTier;
        }
      }
      break;
    case "smelterUpgrade":
      if (tiers.smelterTier < 6) {
        if (xp < upgradePrices.smelterUpgradePrice) {
          displayError("Insufficient funds");
        } else {
          xp -= upgradePrices.smelterUpgradePrice;
          tiers.smelterTier++;
          upgradePrices.smelterUpgradePrice =
            tiers.smelterTier * upgradePrices.smelterUpgradePrice;
          xpGain.iron = tiers.smelterTier;
          xpGain.platinum = tiers.smelterTier * 3;
          xpGain.gold = tiers.smelterTier * 5;
        }
      }
      break;
  }
}

let depositCount = 1;
function addOre(type) {
  switch (type) {
    case "iron":
      if (xp >= upgradePrices.ironUpgradePrice) {
        xp -= upgradePrices.ironUpgradePrice;
        new Ore("iron").add();
        depositCount++;
        upgradePrices.ironUpgradePrice *= 2;
      } else {
        displayError("Insufficient funds");
      }
      break;
    case "platinum":
      if (xp >= upgradePrices.platinumUpgradePrice) {
        xp -= upgradePrices.platinumUpgradePrice;
        new Ore("platinum").add();
        depositCount++;
        upgradePrices.platinumUpgradePrice *= 2;
      } else {
        displayError("Insufficient funds");
      }
      break;
    case "gold":
      if (xp >= upgradePrices.goldUpgradePrice) {
        xp -= upgradePrices.goldUpgradePrice;
        new Ore("gold").add();
        depositCount++;
        upgradePrices.goldUpgradePrice *= 2;
      } else {
        displayError("Insufficient funds");
      }
      break;
  }
}

// TODO: add different types of ore (make a sprite and code in logic),
// expensive to buy a better deposit, but each resource grants more money,
// upgrading resource tier increased rewards substantially
