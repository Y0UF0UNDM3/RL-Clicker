let goals = 0;
let goalsPerClick = 1;
let boostCost = 10;
const goalsToLevelUp = 100;

const goalsSpan = document.getElementById("goals");
const boostCostSpan = document.getElementById("boostCost");
const goalsPerClickSpan = document.getElementById("goalsPerClick");
const clickerWrapper = document.getElementById("clickerWrapper");
const boostBtn = document.getElementById("boostBtn");
const progressFill = document.getElementById("progressFill");

const newsTextElement = document.getElementById("newsText");

const tabs = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// News ticker messages depending on goals
const newsMessages = [
  { minGoals: 0, text: "Welcome to Rocket League Clicker! Score goals to unlock new features!" },
  { minGoals: 10, text: "Boost your goals per click by buying Boosts in the Shop!" },
  { minGoals: 50, text: "Buildings coming soon! Automate your goal scoring!" },
  { minGoals: 100, text: "Upgrades are on the way! Level up faster!" },
  { minGoals: 250, text: "Achievements unlocked! Show off your skills!" },
  { minGoals: 500, text: "Settings panel lets you customize your game experience!" },
  { minGoals: 1000, text: "Keep scoring! You are a Rocket League legend!" }
];

let currentNewsIndex = -1;

function updateUI() {
  goalsSpan.textContent = goals;
  boostCostSpan.textContent = boostCost;
  goalsPerClickSpan.textContent = goalsPerClick;

  // Update progress bar (based on remainder goals to next level)
  const progressPercent = Math.min(
    ((goals % goalsToLevelUp) / goalsToLevelUp) * 100,
    100
  );
  progressFill.style.width = progressPercent + "%";

  updateNewsTicker(goals);
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

clickerWrapper.addEventListener("click", () => {
  goals += goalsPerClick;
  updateUI();
  animateClickFeedback();
});

// Shop button buy boost
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

// Tab switching logic
tabs.forEach((tabBtn) => {
  tabBtn.addEventListener("click", () => {
    const targetTab = tabBtn.getAttribute("data-tab");

    tabs.forEach((btn) => {
      btn.classList.toggle("active", btn === tabBtn);
      btn.setAttribute("aria-selected", btn === tabBtn ? "true" : "false");
    });

    tabContents.forEach((tabContent) => {
      tabContent.style.display = tabContent.id === targetTab ? "block" : "none";
    });
