function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

// Load
function loadNutrition() {
  let data = JSON.parse(localStorage.getItem(getTodayKey())) || {};

  document.getElementById("waterCount").innerText = data.water || 0;
  document.getElementById("fruitCount").innerText = data.fruit || 0;
  document.getElementById("vegCount").innerText = data.veg || 0;
  document.getElementById("grainCount").innerText = data.grain || 0;
  document.getElementById("proteinCount").innerText = data.protein || 0;

  let meals = data.meals || [];
  let list = document.getElementById("mealList");
  list.innerHTML = "";

  meals.forEach(m => {
    let li = document.createElement("li");
    li.innerText = `${m.type}: ${m.text}`;
    list.appendChild(li);
  });
}

// Water
function addWater() {
  let key = getTodayKey();
  let data = JSON.parse(localStorage.getItem(key)) || {};

  data.water = (data.water || 0) + 1;

  localStorage.setItem(key, JSON.stringify(data));
  loadNutrition();
}

// Meals
function addMeal() {
  let input = document.getElementById("mealInput");
  let type = document.getElementById("mealType").value;

  if (!input.value) return;

  let key = getTodayKey();
  let data = JSON.parse(localStorage.getItem(key)) || {};

  data.meals = data.meals || [];
  data.meals.push({ type, text: input.value });

  localStorage.setItem(key, JSON.stringify(data));

  input.value = "";
  loadNutrition();
}

// MyPlate
function addFood(type) {
  let key = getTodayKey();
  let data = JSON.parse(localStorage.getItem(key)) || {};

  data[type] = (data[type] || 0) + 1;

  localStorage.setItem(key, JSON.stringify(data));
  loadNutrition();
}

// Init
loadNutrition();