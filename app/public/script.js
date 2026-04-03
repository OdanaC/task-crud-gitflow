const openFormBtn = document.getElementById("openFormBtn");
const formContainer = document.getElementById("formContainer");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = [];

openFormBtn.addEventListener("click", () => {
  formContainer.classList.toggle("d-none");
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("taskTitle").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();

  if (!title) return;

  tasks.push({
    title,
    desc,
    status: "Pendiente"
  });

  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `
      <li class="list-group-item text-muted text-center">
        No hay tareas registradas
      </li>
    `;
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
      <div class="d-flex justify-content-between align-items-start gap-3">
        <div>
          <h3 class="h6 mb-1">${task.title}</h3>
          <p class="mb-1 text-muted">${task.desc || "Sin descripción"}</p>
          <span class="badge bg-secondary">${task.status}</span>
        </div>
        <span class="text-muted small">#${index + 1}</span>
      </div>
    `;

    taskList.appendChild(li);
  });
}

renderTasks();