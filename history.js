// Load all saved days
function loadHistory() {
  const container = document.getElementById("historyContainer");
  container.innerHTML = "";

  let keys = Object.keys(localStorage)
    .filter(key => key.includes("-")) // date keys
    .sort()
    .reverse(); // newest first

  if (keys.length === 0) {
    container.innerHTML = "<p>No data yet 🌱</p>";
    return;
  }

  keys.forEach(key => {
    let data = JSON.parse(localStorage.getItem(key));

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
  <h2>${formatDate(key)}</h2>
  <p>😊 Mood: ${data.mood || "—"}</p>
  <p>🏆 Win: ${data.win || "—"}</p>
  <p>💧 Water: ${data.water || 0}</p>
  <p>🏃 Exercise: ${data.exercise || 0} min</p>
`   ;

    container.appendChild(card);
  });
}

// Format date nicely
function formatDate(dateStr) {
  let date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

// Init
loadHistory();