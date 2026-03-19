// Helpers
function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

// Load today's data
function loadHealth() {
  const data = JSON.parse(localStorage.getItem(getTodayKey())) || {};

  document.getElementById("waterCount").innerText = data.water || 0;
  document.getElementById("exerciseCount").innerText = data.exercise || 0;
}

// Add Exercise
function addExercise() {
  let input = document.getElementById("exerciseInput");
  let duration = Number(input.value);
  if (!duration) return;

  const key = getTodayKey();
  let data = JSON.parse(localStorage.getItem(key)) || {};

  data.exercise = (data.exercise || 0) + duration;

  localStorage.setItem(key, JSON.stringify(data));

  document.getElementById("exerciseCount").innerText = data.exercise;
  input.value = "";

  updateStreaks();
}

// Add Water
function addWater() {
  const key = getTodayKey();
  let data = JSON.parse(localStorage.getItem(key)) || {};

  data.water = (data.water || 0) + 1;

  localStorage.setItem(key, JSON.stringify(data));

  document.getElementById("waterCount").innerText = data.water;

  updateStreaks();
}

// Goals
const goalHydration = 8;
const goalExercise = 30;

// Streaks (simple version)
function updateStreaks() {
  const data = JSON.parse(localStorage.getItem(getTodayKey())) || {};

  let hydrationStreak = data.water >= goalHydration ? 1 : 0;
  let exerciseStreak = data.exercise >= goalExercise ? 1 : 0;

  document.getElementById("hydrationStreak").innerText = hydrationStreak;
  document.getElementById("exerciseStreak").innerText = exerciseStreak;
}

// Init
loadHealth();
updateStreaks();