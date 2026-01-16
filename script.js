let goals = 0;
let goalsPerClick = 1;
let boostCost = 10;

const goalsEl = document.getElementById("goals");
const gpcEl = document.getElementById("goalsPerClick");
const boostCostEl = document.getElementById("boostCost");
const clicker = document.getElementById("clickerWrapper");
const buildingsList = document.getElementById("buildingsList");
const newsTicker = document.getElementById("newsTicker");

/* NEWS */
const newsMessages = [
  "Welcome to Rocket League Clicker!",
  "Score goals to unlock new ranks!",
  "Buildings automate goal scoring!",
  "Can you reach RLCS level?",
  "More upgrades coming soon!"
];

let newsIndex = 0;
newsTicker.textContent = newsMessages[0];

setInterval(nextNews, 4000);
newsTicker.addEventListener("click", nextNews);

function nextNews() {
  newsIndex = (newsIndex + 1) % newsMessages.length;
  newsTicker.textContent = newsMessages[newsIndex];
}

/* BUILDINGS */
const buildingData = [
  { name: "Bronze Player", cost: 15 },
  { name: "Silver Player", cost: 100 },
  { name: "Gold Player", cost: 1000 },
  { name: "Platinum Player", cost: 3500 },
  { name: "Diamond Player", cost: 12000 },
  { name: "Champion", cost: 50000 },
  { name: "Grand Champion", cost: 300000 },
  { name: "SSL", cost: 900000 },
  { name: "RLCS", cost: 2500000 }
];

const buildings = buildingData.map(b => ({
  ...b,
  owned: 0,
  discovered: false
}));

function renderBuildings() {
  buildingsList.innerHTML = "";

  buildings.forEach(b => {
    if (goals >= b.cost * 0.75) b.discovered = true;
    if (!b.discovered) return;

    const div = document.createElement("div");
    div.className = "building";
    div.textContent = `${b.name} — Cost: ${b.cost} (Owned: ${b.owned})`;

    if (goals < b.cost) div.classList.add("locked");
    else {
      div.onclick = () => {
        goals -= b.cost;
        b.owned++;
        b.cost = Math.floor(b.cost * 1.15);
        update();
      };
    }

    buildingsList.appendChild(div);
  });
}

/* CLICK */
clicker.onclick = () => {
  goals += goalsPerClick;
  spawnBalls();
  update();
};

function spawnBalls() {
  const container = clicker.querySelector(".falling-balls-container");
  for (let i = 0; i < 4; i++) {
    const ball = document.createElement("div");
    ball.className = "falling-ball";
    ball.style.left = Math.random() * 200 + "px";
    container.appendChild(ball);
    ball.onanimationend = () => ball.remove();
  }
}

/* SHOP */
document.getElementById("boostBtn").onclick = () => {
  if (goals >= boostCost) {
    goals -= boostCost;
    goalsPerClick++;
    boostCost = Math.floor(boostCost * 1.5);
    update();
  }
};

/* MODALS */
settingsBtn.onclick = () => settingsModal.hidden = false;
closeSettingsBtn.onclick = () => settingsModal.hidden = true;
achievementsBtn.onclick = () => achievementsModal.hidden = false;
closeAchievementsBtn.onclick = () => achievementsModal.hidden = true;

/* UPDATE */
function update() {
  goalsEl.textContent = goals;
  gpcEl.textContent = goalsPerClick;
  boostCostEl.textContent = boostCost;
  renderBuildings();
}

update();
