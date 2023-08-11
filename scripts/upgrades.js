let xp = JSON.parse(localStorage.getItem("Xp")) || 10; // starting XP
let conveyorSpeed = 1; // multiplies the speed of the objects traveling on conveyors * 1 default
let generationRate = 25; // how many frames for each object to generate from mine *25 default
let xpGain = 1; // how much xp will one object give upon delivery *1 default

// defines what is the current building tier will be used to determine colors/sorites *maybe
let conveyorTier = 1;
let mineTier = 1;
let resourceTier = 1;
