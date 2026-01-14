let goals = 0;
let goalsPerClick = 1;
let boostCost = 10;
const goalsToLevelUp = 100;

const goalsSpan = document.getElementById("goals");
const boostCostSpan = document.getElementById("boostCost");
const clickerWrapper = document.querySelector(".clicker-wrapper");
const boostBtn = document.getElementById("boostBtn");
const progressFill = document.getElementById("progressFill");

clickerWrapper.addEventListener("click", () => {
  goals += goalsPerClick;
  updateUI();
  animateClickFeedback();
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

  const progressPercent = Math.min((goals % goalsToLevelUp) / goalsToLevelUp * 100, 100);
  progressFill.style.width = progressPercent + "%";
}

function animateClickFeedback() {
  const feedback = document.createElement("div");
  feedback.classList.add("click-feedback");
  document.querySelector(".clicker-wrapper").appendChild(feedback);
  feedback.addEventListener("animationend", () => feedback.remove());
}

updateUI();
