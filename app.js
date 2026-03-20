// Affirmations
const affirmations = [
  "You are enough 💖",
  "You are growing 🌱",
  "You are capable ✨",
  "You matter 💕",
  "Keep going 🌟",
  "You are strong 💪"
];

function newAffirmation() {
  const el = document.getElementById("affirmation");
  el.style.opacity = 0;

  setTimeout(() => {
    let rand = affirmations[Math.floor(Math.random() * affirmations.length)];
    el.innerText = rand;
    el.style.opacity = 1;
  }, 200);
}

// Greeting
const hour = new Date().getHours();
let greeting = "Welcome";

if (hour < 12) greeting = "Good morning ☀️";
else if (hour < 18) greeting = "Good afternoon 🌿";
else greeting = "Good evening 🌙";

document.getElementById("greeting").innerText = greeting;

// STORAGE
function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

// LOAD DATA
function loadToday() {
  const data = JSON.parse(localStorage.getItem(getTodayKey())) || {};

  if (data.mood) {
    document.getElementById("moodText").innerText = "Today: " + data.mood;
  }

  if (data.win) {
    document.getElementById("winText").innerText = data.win;
  }
}

// SAVE MOOD
function setMood(mood) {
  const key = getTodayKey();
  let data = JSON.parse(localStorage.getItem(key)) || {};

  data.mood = mood;
  localStorage.setItem(key, JSON.stringify(data));

  document.getElementById("moodText").innerText = "Today: " + mood;
}

// SAVE WIN
function saveWin() {
  const input = document.getElementById("winInput").value;
  if (!input) return;

  const key = getTodayKey();
  let data = JSON.parse(localStorage.getItem(key)) || {};

  data.win = input;
  localStorage.setItem(key, JSON.stringify(data));

  document.getElementById("winText").innerText = input;
  document.getElementById("winInput").value = "";
}

loadToday();