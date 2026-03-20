
function getAllDates() {
  let dates = Object.keys(localStorage)
    .filter(key => /^\d{4}-\d{2}-\d{2}$/.test(key))
    .sort()
    .reverse();

  return dates;
}

function loadHistory() {
  const container = document.getElementById("historyContainer");
  container.innerHTML = "";

  let dates = getAllDates();

  if (dates.length === 0) {
    container.innerHTML = "<p>No data yet 🌱</p>";
    return;
  }

  dates.forEach(dateKey => {
    let data = JSON.parse(localStorage.getItem(dateKey)) || {};

    let card = document.createElement("div");
    card.className = "card";

    let mealsCount = (data.meals || []).length;

    card.innerHTML = `
      <h2>${formatDate(dateKey)}</h2>

      <p>😊 Mood: ${data.mood || "—"}</p>
      <p>🏆 Win: ${data.win || "—"}</p>

      <hr>

      <p>💧 Water: ${data.water || 0}</p>
      <p>🏃 Exercise: ${data.exercise || 0} min</p>

      <hr>

      <p>🍎 Fruit: ${data.fruit || 0}</p>
      <p>🥦 Veg: ${data.veg || 0}</p>
      <p>🍞 Grain: ${data.grain || 0}</p>
      <p>🍗 Protein: ${data.protein || 0}</p>

      <p>🍴 Meals: ${mealsCount}</p>
    `;

    container.appendChild(card);
  });
}

// Format date
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