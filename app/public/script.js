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

  const title = document.getElementById("taskTitle").value;
  const desc = document.getElementById("taskDesc").value;

  tasks.push({ title, desc });

  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${task.title} - ${task.desc}`;
    taskList.appendChild(li);
  });
}