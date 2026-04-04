const openFormBtn = document.getElementById("openFormBtn");
const formContainer = document.getElementById("formContainer");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const taskStatusInput = document.getElementById("taskStatus");
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
  const status = taskStatusInput.value;
  const taskIndex = taskIndexInput.value;

  if (!title) return;

  if (taskIndex !== "") {
    tasks[taskIndex].title = title;
    tasks[taskIndex].desc = desc;
    tasks[taskIndex].status = status;
  } else {
    tasks.push({
      title,
      desc,
      status
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
    <li class="list-group-item text-center">
      <strong>No hay tareas registradas</strong><br>
      <small class="text-muted">Agrega una nueva tarea para comenzar</small>
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
          <span class="badge ${getStatusClass(task.status)}">${task.status}</span>
        </div>
        <div class="d-flex flex-column gap-2 align-items-end">
          <span class="text-muted small">#${index + 1}</span>
          <div class="d-flex flex-column gap-2 align-items-end">
            <span class="text-muted small">#${index + 1}</span>
               <button class="btn btn-sm btn-outline-primary edit-btn" data-index="${index}">
                 Editar
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-index="${index}">
    Eliminar
  </button>
</div>
        </div>
      </div>
    `;

    taskList.appendChild(li);
  });

  bindEditEvents();
  bindDeleteEvents();
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
  taskStatusInput.value = task.status;

  cancelEditBtn.classList.remove("d-none");
  formContainer.classList.remove("d-none");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteTask(index) {
  const confirmDelete = confirm("¿Eliminar esta tarea?");
  if (!confirmDelete) return;

  tasks.splice(index, 1);
  renderTasks();
}

function resetForm() {
  taskIndexInput.value = "";
  taskTitleInput.value = "";
  taskDescInput.value = "";
  taskStatusInput.value = "Pendiente";
  cancelEditBtn.classList.add("d-none");
}

function bindDeleteEvents() {
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      deleteTask(index);
    });
  });
}

function getStatusClass(status) {
  if (status === "Pendiente") return "bg-secondary";
  if (status === "En progreso") return "bg-warning text-dark";
  return "bg-success";
}

renderTasks();