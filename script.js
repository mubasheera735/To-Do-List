const taskList = document.getElementById("taskList");

window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    createTask(task.text, task.completed);
  });
};

function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value === "") return;

  createTask(input.value, false);

  saveTasks();

  input.value = "";
}

function createTask(taskText, completed) {
  const li = document.createElement("li");

  li.textContent = taskText;

  if (completed) {
    li.classList.add("completed");
  }

  li.onclick = function () {
    li.classList.toggle("completed");
    saveTasks();
  };

  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";

  deleteBtn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];

  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
