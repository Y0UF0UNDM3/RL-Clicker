let goals = 0;
let goalsPerClick = 1;
let boostCost = 10;

const goalsSpan = document.getElementById("goals");
const boostCostSpan = document.getElementById("boostCost");
const clicker = document.getElementById("clicker");
const boostBtn = document.getElementById("boostBtn");

clicker.addEventListener("click", () => {
  goals += goalsPerClick;
  updateUI();
});

boostBtn.addEventListener("click", () => {
  if (goals >= boostCost) {
    goals -= boostCost;
    goalsPerClick += 1;
    boostCost = Math.floor(boostCost * 1.5);
    updateUI();
  } else {
    alert("Not enough goals!");
  }
});

function updateUI() {
  goalsSpan.textContent = goals;
  boostCostSpan.textContent = boostCost;
}

