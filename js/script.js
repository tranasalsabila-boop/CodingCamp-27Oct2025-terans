const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const todoList = document.getElementById("todoList");

let todos = [];

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", clearAll);

function addTask() {
  const task = taskInput.value.trim();
  const date = dueDate.value;

  if (task === "" || date === "") return alert("Please fill all fields!");

  todos.push({ task, date, done: false });
  taskInput.value = "";
  dueDate.value = "";
  renderTodos();
}

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="no-task">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "Done ✅" : "Pending ⏳"}</td>
      <td>
        <button onclick="toggleStatus(${index})">Toggle</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(row);
  });
}

function toggleStatus(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
}

function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}

function clearAll() {
  if (confirm("Delete all tasks?")) {
    todos = [];
    renderTodos();
  }
}

renderTodos();
