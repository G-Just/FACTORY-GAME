let xp = JSON.parse(localStorage.getItem("Xp")) || 100; // starting XP * 10 default
let conveyorSpeed = 1; // multiplies the speed of the objects traveling on conveyors * 1 default
let generationRate = 25; // how many frames for each object to generate from a mine *25 default
let xpGain = 1; // how much xp will one object give upon delivery *1 default

// defines what is the current building tier will be used to determine colors/sorites *maybe
let tiers = { conveyorTier: 1, mineTier: 1, resourceTier: 1 };

//cost labels
let mineCostLabel = document.getElementById("minePrice");
let conveyorCostLabel = document.getElementById("conveyorPrice");
let smelterCostLabel = document.getElementById("smelterPrice");

// prices
let mineCost = 5;
let conveyorCost = 1;
// gets the remembered cost of the smelter * default 3
let smelterCost = JSON.parse(localStorage.getItem("SmelterCost")) || 3;
