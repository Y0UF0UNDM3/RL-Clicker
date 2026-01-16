/* =========================
   GAME STATE
========================= */
let goals = 0;
let goalsPerClick = 1;

let totalClicks = 0;
let visualClickUnlocked = false;
let soundClickUnlocked = false;

/* =========================
   ELEMENTS
========================= */
const goalsEl = document.getElementById("goals");
const gpcEl = document.getElementById("goalsPerClick");
const clicker = document.getElementById("clickerWrapper");

/* =========================
   CLICK SOUND
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

  checkClickUnlocks();

  if (visualClickUnlocked) {
    spawnClickEffect();
  }

  if (soundClickUnlocked) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

/* =========================
   UNLOCK SYSTEM
========================= */
function checkClickUnlocks() {
  if (totalClicks === 20) {
    visualClickUnlocked = true;
    setNews("Click effect unlocked!");
  }

  if (totalClicks === 50) {
    soundClickUnlocked = true;
    setNews("Click sound unlocked!");
  }
}

/* =========================
   CLICK EFFECT (BALL FALL)
========================= */
function spawnClickEffect() {
  const container = document.createElement("div");
  container.className = "falling-balls";

  const ball = document.createElement("div");
  ball.className = "ball";

  ball.style.left = Math.random() * 220 + "px";
  ball.style.top = "40px";

  container.appendChild(ball);
  clicker.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 1200);
}

/* =========================
   NEWS TICKER (STATIC ROTATION)
========================= */
const newsMessages = [
  "Welcome to Rocket League Clicker!",
  "Buildings automate goal scoring!",
  "Click to score goals!",
];

let newsIndex = 0;
const newsEl = document.getElementById("newsTicker");

function rotateNews() {
  newsIndex = (newsIndex + 1) % newsMessages.length;
  newsEl.textContent = newsMessages[newsIndex];
}

function setNews(text) {
  newsEl.textContent = text;
}

setInterval(rotateNews, 4000);
newsEl.addEventListener("click", rotateNews);

/* =========================
   INITIAL UI
========================= */
goalsEl.textContent = goals;
gpcEl.textContent = goalsPerClick;
