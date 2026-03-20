const STORAGE_KEY = "pieceful_goals";

// Load goals from localStorage
let goals = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Save goals to localStorage
function saveGoals() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

// Add a new goal
function addGoal() {
  const title = document.getElementById("goalTitle").value;
  const category = document.getElementById("category").value;
  if (!title) return;

  goals.push({
    id: Date.now(),
    title,
    category,
    completed: false,
    subtasks: []
  });

  document.getElementById("goalTitle").value = "";
  saveGoals();
  renderGoals();
}

// Add a subtask
function addSubtask(goalId) {
  const input = document.getElementById(`task-${goalId}`);
  if (!input.value) return;

  const goal = goals.find(g => g.id === goalId);
  goal.subtasks.push({
    id: Date.now(),
    title: input.value,
    completed: false
  });

  input.value = "";
  saveGoals();
  renderGoals();
}

// Toggle subtask
function toggleSubtask(goalId, taskId) {
  const goal = goals.find(g => g.id === goalId);
  const task = goal.subtasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  saveGoals();
  renderGoals();
}

// Update progress
function updateProgress() {
  let allTasks = [];
  goals.forEach(goal => {
    if (goal.subtasks.length > 0) allTasks.push(...goal.subtasks);
    else allTasks.push({ completed: goal.completed });
  });

  const completed = allTasks.filter(t => t.completed).length;
  const total = allTasks.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").innerText = `${percent}% complete`;
}

// Render goals
function renderGoals() {
  const container = document.getElementById("goalsContainer");
  container.innerHTML = "";

  goals.forEach(goal => {
    const div = document.createElement("div");
    div.className = "card";

    let html = `
      <div class="goal-header">
        <strong>${goal.title}</strong>
        <span class="category">${goal.category}</span>
      </div>
    `;

    // Subtasks as checkbox rows
    goal.subtasks.forEach(task => {
      html += `
        <div class="task">
          <label>
            <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleSubtask(${goal.id}, ${task.id})">
            ${task.title}
          </label>
          <span>DO</span>
        </div>
      `;
    });

    // Input for new subtasks
    html += `
      <div class="subtask-input">
        <input id="task-${goal.id}" placeholder="Add step..." />
        <button class="btn" onclick="addSubtask(${goal.id})">+</button>
      </div>
    `;

    div.innerHTML = html;
    container.appendChild(div);
  });

  updateProgress();
}

renderGoals();