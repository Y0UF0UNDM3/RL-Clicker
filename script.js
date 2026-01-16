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
   CLICK EFFECT WITH POPCORN ANIMATION
========================= */
function spawnBallEffect() {
  const ball = document.createElement("img");
  ball.src = "assets/rocket-league-ball";
  ball.className = "falling-ball";

  // Adjust left position for smaller ball width (12px)
  ball.style.left = Math.random() * 240 + "px";
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
   INITIAL UI
========================= */
goalsEl.textContent = goals;
gpcEl.textContent = goalsPerClick;

/* =========================
   BUILDINGS STATE & UI
========================= */
const buildings = [
  { id: 1, name: "Building 1", discovered: false },
  { id: 2, name: "Building 2", discovered: false },
  { id: 3, name: "Building 3", discovered: false },
  { id: 4, name: "Building 4", discovered: false },
  { id: 5, name: "Building 5", discovered: false }
  // Add more buildings as you like
];

const buildingsList = document.getElementById("buildingsList");

function renderBuildings() {
  buildingsList.innerHTML = "";

  buildings.forEach((building) => {
    const div = document.createElement("div");
    div.classList.add("building");

    if (building.discovered) {
      div.classList.add("discovered");
      div.textContent = building.name;

      // leave space for future design here (padding-right in CSS)
      // You can append child elements here for future designs
    } else {
      div.classList.add("undiscovered");
      div.textContent = building.name;
    }

    // Clicking undiscovered buildings discovers them
    if (!building.discovered) {
      div.addEventListener("click", () => {
        building.discovered = true;
        renderBuildings();
      });
    }

    buildingsList.appendChild(div);
  });
}

// Initial render
renderBuildings();
