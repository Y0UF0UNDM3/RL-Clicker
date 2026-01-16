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
