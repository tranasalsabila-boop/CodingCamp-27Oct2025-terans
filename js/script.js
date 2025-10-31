// Ambil elemen dari HTML
const taskInput = document.querySelector('input[type="text"]');
const dueDateInput = document.querySelector('input[type="date"]');
const addButton = document.querySelector('.add-button');
const deleteAllButton = document.querySelector('.right-button');
const filterSelect = document.getElementById('filterSelect');
const todoList = document.getElementById('todoList');

// Simpan semua tugas
let tasks = [];

// === Fungsi render ===
function renderTasks() {
    todoList.innerHTML = '';

    // Ambil filter
    const filterValue = filterSelect.value;

    // Filter berdasarkan status
    let filteredTasks = tasks;
    if (filterValue !== 'All') {
        filteredTasks = tasks.filter(task => task.status === filterValue);
    }

    // Jika tidak ada tugas
    if (filteredTasks.length === 0) {
        todoList.innerHTML = `
            <tr>
                <td colspan="4" class="no-task">No task found</td>
            </tr>
        `;
        return;
    }

    // Tampilkan daftar tugas
    filteredTasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.dueDate || '-'}</td>
            <td>
                <button class="status-btn ${task.status.toLowerCase().replace(' ', '-')}">
                    ${task.status}
                </button>
            </td>
            <td>
                <button class="delete-btn">🗑️</button>
            </td>
        `;

        // Ubah status jika diklik
        row.querySelector('.status-btn').addEventListener('click', () => {
            if (task.status === 'Pending') task.status = 'In Progress';
            else if (task.status === 'In Progress') task.status = 'Completed';
            else task.status = 'Pending';
            saveTasks();
            renderTasks();
        });

        // Hapus tugas
        row.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        todoList.appendChild(row);
    });
}

// === Fungsi tambah tugas baru ===
function addTask() {
    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (!taskName) {
        alert('Please enter your ToDo!');
        return;
    }

    const newTask = {
        name: taskName,
        dueDate: dueDate,
        status: 'Pending'
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    // Kosongkan input
    taskInput.value = '';
    dueDateInput.value = '';
}

// === Fungsi hapus semua tugas ===
function deleteAllTasks() {
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
}

// === Simpan dan ambil dari localStorage ===
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
    renderTasks();
}

// === Event listeners ===
addButton.addEventListener('click', addTask);
deleteAllButton.addEventListener('click', deleteAllTasks);
filterSelect.addEventListener('change', renderTasks);
document.addEventListener('DOMContentLoaded', loadTasks);
