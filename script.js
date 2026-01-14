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

const achievementsBtn = document.getElementById("achievementsBtn");
const settingsBtn = document.getElementById("settingsBtn");
const achievementsModal = document.getElementById("achievementsModal");
const settingsModal = document.getElementById("settingsModal");
const closeAchievementsBtn = document.getElementById("closeAchievementsBtn");
const closeSettingsBtn = document.getElementById("closeSettingsBtn");

const buildingsList = document.getElementById("buildingsList");

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

const buildingData = [
  { name: "Bronze Player", baseCost: 15 },
  { name: "Silver Player", baseCost: 100 },
  { name: "Gold Player", baseCost: 1000 },
  { name: "Platinum Player", baseCost: 3500 },
  { name: "Diamond Player", baseCost: 12000 },
  { name: "Champion Player", baseCost: 50000 },
  { name: "Grand Champion", baseCost: 300000 },
  { name: "Supersonic Legend (SSL)", baseCost: 900000 },
  { name: "RLCS Team", baseCost: 2500000 }
];

let buildings = buildingData.map((b) => ({
  ...b,
  count: 0,
  cost: b.baseCost,
}));

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
  renderBuildings();
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

// Tab switching logic (shop/upgrades)
const tabs = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
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
  });
});

// Render buildings list with mystery unlock logic
function renderBuildings() {
  buildingsList.innerHTML = "";

  buildings.forEach((building, i) => {
    // Determine if building is unlocked, mystery, or locked:
    // mystery if goals >= 75% of cost but < cost, locked if below 75% cost
    const mysteryThreshold = building.cost * 0.75;
    let isUnlocked = goals >= building.cost;
    let isMystery = !isUnlocked && goals >= mysteryThreshold;
    let isLocked = !isUnlocked && goals < mysteryThreshold;

    const buildingDiv = document.createElement("div");
    buildingDiv.classList.add("building-item");
    if (isLocked) buildingDiv.classList.add("locked");
    else buildingDiv.classList.add("unlocked");

    // On click buy if unlocked
    if (isUnlocked) {
      buildingDiv.style.cursor = "pointer";
      buildingDiv.addEventListener("click", () => {
        if (goals >= building.cost) {
          goals -= building.cost;
          building.count++;
          // Increase cost exponentially
          building.cost = Math.floor(building.baseCost * Math.pow(1.15, building.count));
          updateUI();
        } else {
          alert("Not enough goals for " + building.name);
        }
      });
    }

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("building-info");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("building-name");

    if (isLocked) {
      nameSpan.textContent = "???";
      const mysterySpan = document.createElement("span");
      mysterySpan.classList.add("mystery-text");
      mysterySpan.textContent = "???";
      infoDiv.appendChild(nameSpan);
      infoDiv.appendChild(mysterySpan);
    } else if (isMystery) {
      nameSpan.textContent = "???";
      const costSpan = document.createElement("span");
      costSpan.classList.add("building-cost");
      costSpan.textContent = `Cost: ${building.cost}`;
      infoDiv.appendChild(nameSpan);
      infoDiv.appendChild(costSpan);
    } else {
      nameSpan.textContent = building.name;
      const countSpan = document.createElement("span");
      countSpan.classList.add("building-count");
      countSpan.textContent = `Owned: ${building.count}`;
      const costSpan = document.createElement("span");
      costSpan.classList.add("building-cost");
      costSpan.textContent = `Cost: ${building.cost}`;
      infoDiv.appendChild(nameSpan);
      infoDiv.appendChild(countSpan);
      infoDiv.appendChild(costSpan);
    }

    buildingDiv.appendChild(infoDiv);
    buildingsList.appendChild(buildingDiv);
  });
}

// Update news ticker text based on goals
function updateNewsTicker(currentGoals) {
  let newIndex = 0;
  for (let i = newsMessages.length - 1; i >= 0; i--) {
    if (currentGoals >= newsMessages[i].minGoals) {
      newIndex = i;
      break;
    }
  }
  if (newIndex !== currentNewsIndex) {
    currentNewsIndex = newIndex;
    newsTextElement.textContent = newsMessages[newIndex].text;

    // Restart marquee animation
    newsTextElement.style.animation = "none";
    newsTextElement.offsetHeight; // trigger reflow
    newsTextElement.style.animation = null;
  }
}

// Achievements modal toggling
achievementsBtn.addEventListener("click", () => {
  achievementsModal.hidden = false;
  achievementsModal.querySelector(".close-modal").focus();
});

closeAchievementsBtn.addEventListener("click", () => {
  achievementsModal.hidden = true;
  achievementsBtn.focus();
});

// Settings modal toggling
settingsBtn.addEventListener("click", () => {
  settingsModal.hidden = false;
  settingsModal.querySelector(".close-modal").focus();
});

closeSettingsBtn.addEventListener("click", () => {
  settingsModal.hidden = true;
  settingsBtn.focus();
});

// Close modals on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!achievementsModal.hidden) {
      achievementsModal.hidden = true;
      achievementsBtn.focus();
    }
    if (!settingsModal.hidden) {
      settingsModal.hidden = true;
      settingsBtn.focus();
    }
  }
});

// Initial UI update
updateUI();
