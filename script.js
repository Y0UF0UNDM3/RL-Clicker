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

  const progressPercent = Math.min(
    ((goals % goalsToLevelUp) / goalsToLevelUp) * 100,
    100
  );
  progressFill.style.width = progressPercent + "%";
}

function animateClickFeedback() {
  const container = document.querySelector(".falling-balls-container");
  const ballCount = 5;

  for (let i = 0; i < ballCount; i++) {
    const ball = document.createElement("div");
    ball.classList.add("falling-ball");

    const startX = Math.random() * (container.clientWidth - 24);
    const xMove = (Math.random() * 60 - 30).toFixed(2);

    ball.style.left = `${startX}px`;
    ball.style.top = `0px`;
    ball.style.setProperty("--x-move", `${xMove}px`);

    container.appendChild(ball);

    ball.addEventListener("animationend", () => {
      ball.remove();
    });
  }
}

updateUI();
