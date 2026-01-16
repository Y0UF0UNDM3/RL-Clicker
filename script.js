/* =========================
   GAME STATE
========================= */
let goals = 0;
let goalsPerClick = 1;
let totalClicks = 0;

let visualUnlocked = false;
let soundUnlocked = false;

/* =========================
   ELEMENTS
========================= */
const goalsEl = document.getElementById("goals");
const gpcEl = document.getElementById("goalsPerClick");
const clicker = document.getElementById("clickerWrapper");

const visualBtn = document.getElementById("unlockVisualBtn");
const soundBtn = document.getElementById("unlockSoundBtn");

const buildingsList = document.getElementById("buildingsList");
const newsTicker = document.getElementById("newsTicker");
const gameShop = document.getElementById("gameShop");

/* =========================
   SOUND
========================= */
const clickSound = new Audio("assets/click.mp3");
clickSound.volume = 0.5;

/* =========================
   BUILDINGS DATA
========================= */
const buildings = [
  { id: 1, name: "Building 1", cost: 20, discovered: false },
  { id: 2, name: "Building 2", cost: 40, discovered: false },
  { id: 3, name: "Building 3", cost: 80, discovered: false },
  { id: 4, name: "Building 4", cost: 160, discovered: false },
  { id: 5, name: "Building 5", cost: 320, discovered: false }
  // Add more buildings here
];

/* =========================
   NEWS TICKER
========================= */
const newsMessages = [
  "Welcome to Rocket League Clicker!",
  "Unlock click effects and sounds!",
  "Buy boosts to score more goals!",
  "Discover all buildings and upgrade!",
  "Click fast and climb the leaderboard!",
];

let currentNewsIndex = 0;
const newsSpan = document.createElement("span");
newsSpan.style.position = "absolute";
newsSpan.style.width = "100%";
newsSpan.style.textAlign = "center";
newsSpan.style.transition = "opacity 1s ease-in-out";
newsSpan.style.opacity = "1";
newsTicker.appendChild(newsSpan);
newsSpan.textContent = newsMessages[currentNewsIndex];

function rotateNews() {
  newsSpan.style.opacity = "0";
  setTimeout(() => {
    currentNewsIndex = (currentNewsIndex + 1) % newsMessages.length;
    newsSpan.textContent = newsMessages[currentNewsIndex];
    newsSpan.style.opacity = "1";
  }, 1000);
}
setInterval(rotateNews, 4000);

/* =========================
   CLICK HANDLER
========================= */
clicker.addEventListener("click", () => {
  goals += goalsPerClick;
  totalClicks++;

  goalsEl.textContent = goals;
  checkExperienceUnlocks();
  checkBuildingDiscoveries();

  if (visualUnlocked) spawnBallEffect();
  if (soundUnlocked) playClickSound();
});

/* =========================
   EXPERIENCE UNLOCKS
========================= */
function checkExperienceUnlocks() {
  if (totalClicks >= 20 && !visualUnlocked) {
    visualBtn.disabled = false;
  }

  if (totalClicks >= 50 && !soundUnlocked) {
    soundBtn.disabled = false;
  }
}

visualBtn.addEventListener("click", () => {
  visualUnlocked = true;
  visualBtn.textContent = "Click Effect Unlocked";
  visualBtn.disabled = true;
});

soundBtn.addEventListener("click", () => {
  soundUnlocked = true;
  soundBtn.textContent = "Click Sound Unlocked";
  soundBtn.disabled = true;
});

/* =========================
   SPAWN BALL EFFECT (POPCORN)
========================= */
function spawnBallEffect() {
  const ball = document.createElement("div");
  ball.className = "falling-ball";

  // Random horizontal offset between -20px and +20px for slight pop direction
  const xMove = (Math.random() * 40 - 20).toFixed(2) + "px";
  ball.style.setProperty("--x-move", xMove);

  // Position ball horizontally at clicker center top (account for ball width)
  ball.style.left = (clicker.clientWidth / 2 - 6) + "px";
  ball.style.top = "-20px";

  clicker.appendChild(ball);

  setTimeout(() => ball.remove(), 1200);
}

/* =========================
   SOUND
========================= */
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

/* =========================
   BUILDINGS UI & LOGIC
========================= */
function renderBuildings() {
  buildingsList.innerHTML = "";

  buildings.forEach((building) => {
    const div = document.createElement("div");
    div.classList.add("building");

    if (building.discovered) {
      div.classList.add("discovered");
      div.textContent = building.name;

      // leave space for future design (padding-right in CSS)
    } else {
      div.classList.add("undiscovered");
      // Show ??? instead of name
      div.textContent = "";
    }

    // Clicking undiscovered buildings does nothing (no discovery)
    if (building.discovered) {
      div.addEventListener("click", () => {
        // Placeholder: You can add building interaction here later
        alert(`You clicked on ${building.name}`);
      });
    }

    buildingsList.appendChild(div);
  });
}

function checkBuildingDiscoveries() {
  buildings.forEach((building) => {
    if (!building.discovered && goals >= building.cost * 0.75) {
      building.discovered = true;
    }
  });
  renderBuildings();
}

/* =========================
   INITIAL UI SETUP
========================= */
goalsEl.textContent = goals;
gpcEl.textContent = goalsPerClick;

renderBuildings();
