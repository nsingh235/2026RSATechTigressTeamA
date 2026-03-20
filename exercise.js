const goal = 30;

// Get today's key
function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

// Load data
function loadExercise() {
  const data = JSON.parse(localStorage.getItem(getTodayKey())) || {};

  let total = data.exercise || 0;

  document.getElementById("exerciseCount").innerText = total;

  updateProgress(total);
  updateStreak();
}

// Add custom input
function addExercise() {
  let input = document.getElementById("exerciseInput");
  let duration = Number(input.value);
  if (!duration) return;

  saveExercise(duration);
  input.value = "";
}

// Quick add buttons
function quickAdd(amount) {
  saveExercise(amount);
}

// Save
function saveExercise(amount) {
  const key = getTodayKey();
  let data = JSON.parse(localStorage.getItem(key)) || {};

  data.exercise = (data.exercise || 0) + amount;

  localStorage.setItem(key, JSON.stringify(data));

  loadExercise();
}

// Progress bar
function updateProgress(total) {
  let percent = Math.min((total / goal) * 100, 100);

  document.getElementById("progressBar").style.width = percent + "%";
}

// 🔥 REAL streak system (multi-day)
function updateStreak() {
  let streak = 0;

  for (let i = 0; i < 30; i++) {
    let date = new Date();
    date.setDate(date.getDate() - i);

    let key = date.toISOString().split("T")[0];
    let data = JSON.parse(localStorage.getItem(key));

    if (data && data.exercise >= goal) {
      streak++;
    } else {
      break;
    }
  }

  document.getElementById("exerciseStreak").innerText = streak;
}

loadExercise();