let goals = JSON.parse(localStorage.getItem("goals")) || [];

/* RENDER */
function renderGoals() {
  const container = document.getElementById("goalsContainer");
  container.innerHTML = "";

  goals.forEach(goal => {
    let div = document.createElement("div");
    div.className = "card";

    let completedCount = goal.subtasks.filter(t => t.completed).length;
    let total = goal.subtasks.length;

    div.innerHTML = `
      <div class="goal-header">
        <h3>${goal.title}</h3>
        <span class="category">${goal.category}</span>
      </div>

      <p>${completedCount}/${total} tasks complete</p>

      <ul>
        ${goal.subtasks.map(task => `
          <li class="${task.completed ? "completed" : ""}">
            <input type="checkbox" ${task.completed ? "checked" : ""}
              onclick="toggleSubtask(${goal.id}, ${task.id})">
            ${task.title}
          </li>
        `).join("")}
      </ul>

      <div class="subtask-input">
        <input id="task-${goal.id}" placeholder="Add step..." />
        <button onclick="addSubtask(${goal.id})">+</button>
      </div>
    `;

    container.appendChild(div);
  });

  updateProgress();
}

/* ADD GOAL */
function addGoal() {
  let title = document.getElementById("goalTitle").value;
  let category = document.getElementById("category").value;

  if (!title) return;

  goals.push({
    id: Date.now(),
    title,
    category,
    subtasks: []
  });

  saveGoals();
}

/* ADD SUBTASK */
function addSubtask(goalId) {
  let input = document.getElementById(`task-${goalId}`);
  if (!input.value) return;

  let goal = goals.find(g => g.id === goalId);

  goal.subtasks.push({
    id: Date.now(),
    title: input.value,
    completed: false
  });

  saveGoals();
}

/* TOGGLE */
function toggleSubtask(goalId, taskId) {
  let goal = goals.find(g => g.id === goalId);
  let task = goal.subtasks.find(t => t.id === taskId);

  task.completed = !task.completed;

  saveGoals();
}

/* SAVE */
function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
  renderGoals();
}

/* PROGRESS */
function updateProgress() {
  let allTasks = goals.flatMap(g => g.subtasks);
  let completed = allTasks.filter(t => t.completed).length;

  let percent = allTasks.length
    ? Math.round((completed / allTasks.length) * 100)
    : 0;

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").innerText = percent + "% complete";
}

/* INIT */
renderGoals();