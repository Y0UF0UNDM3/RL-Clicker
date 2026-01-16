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
const boostBtn = document.getElementById("boostBtn");

/* =========================
   SOUND
========================= */
const clickSound = new Audio("assets/click.mp3");
clickSound.volume = 0.5;

/* =========================
   CLICK HANDLER
========================= */
clicker.addEventListener("click", () => {
  goals += goalsPerClick;
  totalClicks++;

  goalsEl.textContent = goals;
  checkExperienceUnlocks();

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
   BUILDINGS STATE & UI
========================= */
const buildings = [
  { id: 1, name: "Building 1", cost: 10, discovered: false },
  { id: 2, name: "Building 2", cost: 20, discovered: false },
  { id: 3, name: "Building 3", cost: 40, discovered: false },
  { id: 4, name: "Building 4", cost: 80, discovered: false },
  { id: 5, name: "Building 5", cost: 160, discovered: false },
];

/**
 * Render the buildings list
 * - Undiscovered buildings show "???"
 * - Clicking undiscovered buildings does NOT remove the question marks
 * - Buildings get discovered automatically once goals are 75% of their cost
 * - Buildings stay discovered once unlocked
 */
function renderBuildings() {
  buildingsList.innerHTML = "";

  buildings.forEach((building) => {
    // Auto-discover if close to cost
    if (!building.discovered && goals >= building.cost * 0.75) {
      building.discovered = true;
    }

    const div = document.createElement("div");
    div.classList.add("building");

    if (building.discovered) {
      div.classList.add("discovered");
      div.textContent = building.name;
    } else {
      div.classList.add("undiscovered");
      div.textContent = "???";
    }

    // Only allow click handler on undiscovered (but clicking won't reveal name)
    if (!building.discovered) {
      div.addEventListener("click", () => {
        // Optional: maybe give feedback here? But no discovery on click
        alert("Keep going! You’re getting close to unlocking this building.");
      });
    }

    buildingsList.appendChild(div);
  });
}

/* =========================
   CLICK EFFECT WITH POPCORN ANIMATION
========================= */
function spawnBallEffect() {
  const ball = document.createElement("div");
  ball.className = "falling-ball";

  // Random horizontal position slightly beyond clicker width sometimes
  const baseX = Math.random() * 260;
  // 30% chance to go slightly outside bounds (-20 to 280)
  const extraX = Math.random() < 0.3 ? (Math.random() * 40 - 20) : 0;
  ball.style.left = Math.min(Math.max(baseX + extraX, -20), 280) + "px";

  clicker.appendChild(ball);

  setTimeout(() => {
    ball.remove();
  }, 1200);
}

/* =========================
   SOUND
========================= */
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

/* =========================
   BOOST BUTTON & SHOP LOGIC
========================= */

let boostCost = 10;
boostBtn.textContent = ""; // Clear button text for icon-only design
boostBtn.setAttribute("data-desc", `Buy Boost (+1 goal/click) — Cost: ${boostCost}`);
// You can later add an icon image inside boostBtn if you want

boostBtn.addEventListener("click", () => {
  if (goals >= boostCost) {
    goals -= boostCost;
    goalsPerClick++;
    boostCost = Math.floor(boostCost * 1.5);
    boostBtn.setAttribute("data-desc", `Buy Boost (+1 goal/click) — Cost: ${boostCost}`);
    goalsEl.textContent = goals;
    gpcEl.textContent = goalsPerClick;

    // Remove click effect after buying boost
    if (visualUnlocked) {
      visualUnlocked = false;
      visualBtn.textContent = "Unlock Click Effect (20 clicks)";
      visualBtn.disabled = true;
    }
  }
});

/* =========================
   INITIAL UI
========================= */
goalsEl.textContent = goals;
gpcEl.textContent = goalsPerClick;

renderBuildings();

/* =========================
   NEWS TICKER ROTATION
========================= */
const newsTicker = document.getElementById("newsTicker");
const newsMessages = [
  "Welcome to Rocket League Clicker!",
  "Unlock click effects and sounds!",
  "Buy boosts to score more goals!",
  "Discover all buildings and upgrade!",
  "Click fast and climb the leaderboard!",
];

let currentNewsIndex = 0;

// Create two span elements for fade in/out effect
const newsSpan1 = document.createElement("span");
const newsSpan2 = document.createElement("span");
newsTicker.appendChild(newsSpan1);
newsTicker.appendChild(newsSpan2);

newsSpan1.style.opacity = "1";
newsSpan2.style.opacity = "0";

newsSpan1.textContent = newsMessages[currentNewsIndex];

function rotateNews() {
  const nextIndex = (currentNewsIndex + 1) % newsMessages.length;
  const fadeOutSpan = currentNewsIndex % 2 === 0 ? newsSpan1 : newsSpan2;
  const fadeInSpan = currentNewsIndex % 2 === 0 ? newsSpan2 : newsSpan1;

  fadeInSpan.textContent = newsMessages[nextIndex];

  fadeOutSpan.style.transition = "opacity 1s ease-in-out";
  fadeInSpan.style.transition = "opacity 1s ease-in-out";

  fadeOutSpan.style.opacity = "0";
  fadeInSpan.style.opacity = "1";

  currentNewsIndex = nextIndex;
}

setInterval(rotateNews, 4000);
