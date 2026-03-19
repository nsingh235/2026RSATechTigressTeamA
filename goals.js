// Goal store
let goals = [];

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
  renderGoals();
}

// Add a subtask to a goal
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
  renderGoals();
}

// Toggle subtask complete
function toggleSubtask(goalId, taskId) {
  const goal = goals.find(g => g.id === goalId);
  const task = goal.subtasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  renderGoals();
}

// Calculate and update progress
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
      <ul>
    `;

    goal.subtasks.forEach(task => {
    html += `
    <div class="task">
      <label>
        <input type="checkbox" ${task.completed ? "checked" : ""} 
          onclick="toggleSubtask(${goal.id}, ${task.id})">
          ${task.title}
        </label>
       <span>DO</span>
      </div>
  ` ;
  });

    html += `
      </ul>
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

// Initial render
renderGoals();