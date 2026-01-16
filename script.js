let goals = 0;
let gpc = 1;
let boostCost = 10;

const goalsEl = document.getElementById("goals");
const gpcEl = document.getElementById("goalsPerClick");
const boostCostEl = document.getElementById("boostCost");
const clicker = document.getElementById("clickerWrapper");
const buildingsList = document.getElementById("buildingsList");
const newsTicker = document.getElementById("newsTicker");

/* NEWS */
const news = [
  "Welcome to Rocket League Clicker!",
  "Score goals to unlock new ranks.",
  "Buildings automate goal scoring.",
  "Can you reach RLCS?",
  "More upgrades coming soon."
];

let newsIndex = 0;
newsTicker.textContent = news[0];

setInterval(nextNews, 4000);
newsTicker.onclick = nextNews;

function nextNews() {
  newsIndex = (newsIndex + 1) % news.length;
  newsTicker.textContent = news[newsIndex];
}

/* BUILDINGS */
const data = [
  ["Bronze Player", 15],
  ["Silver Player", 100],
  ["Gold Player", 1000],
  ["Platinum Player", 3500],
  ["Diamond Player", 12000],
  ["Champion", 50000],
  ["Grand Champion", 300000],
  ["SSL", 900000],
  ["RLCS", 2500000]
];

const buildings = data.map(b => ({
  name: b[0],
  cost: b[1],
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

    if (goals < b.cost) {
      div.classList.add("locked");
    } else {
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
  goals += gpc;
  spawnBalls();
  update();
};

function spawnBalls() {
  const c = clicker.querySelector(".falling-balls");
  for (let i = 0; i < 4; i++) {
    const b = document.createElement("div");
    b.className = "ball";
    b.style.left = Math.random() * 220 + "px";
    c.appendChild(b);
    b.onanimationend = () => b.remove();
  }
}

/* SHOP */
boostBtn.onclick = () => {
  if (goals >= boostCost) {
    goals -= boostCost;
    gpc++;
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
  gpcEl.textContent = gpc;
  boostCostEl.textContent = boostCost;
  renderBuildings();
}

update();
