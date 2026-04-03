const openFormBtn = document.getElementById("openFormBtn");
const formContainer = document.getElementById("formContainer");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const taskIndexInput = document.getElementById("taskIndex");
const taskTitleInput = document.getElementById("taskTitle");
const taskDescInput = document.getElementById("taskDesc");

let tasks = [];

openFormBtn.addEventListener("click", () => {
  resetForm();
  formContainer.classList.toggle("d-none");
});

cancelEditBtn.addEventListener("click", () => {
  resetForm();
  formContainer.classList.add("d-none");
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskTitleInput.value.trim();
  const desc = taskDescInput.value.trim();
  const taskIndex = taskIndexInput.value;

  if (!title) return;

  if (taskIndex !== "") {
    tasks[taskIndex].title = title;
    tasks[taskIndex].desc = desc;
  } else {
    tasks.push({
      title,
      desc,
      status: "Pendiente"
    });
  }

  renderTasks();
  resetForm();
  formContainer.classList.add("d-none");
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
        <div class="d-flex flex-column gap-2 align-items-end">
          <span class="text-muted small">#${index + 1}</span>
          <button class="btn btn-sm btn-outline-primary edit-btn" data-index="${index}">
            Editar
          </button>
        </div>
      </div>
    `;

    taskList.appendChild(li);
  });

  bindEditEvents();
}

function bindEditEvents() {
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      editTask(index);
    });
  });
}

function editTask(index) {
  const task = tasks[index];
  if (!task) return;

  taskIndexInput.value = index;
  taskTitleInput.value = task.title;
  taskDescInput.value = task.desc;

  cancelEditBtn.classList.remove("d-none");
  formContainer.classList.remove("d-none");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetForm() {
  taskIndexInput.value = "";
  taskTitleInput.value = "";
  taskDescInput.value = "";
  cancelEditBtn.classList.add("d-none");
}

renderTasks();