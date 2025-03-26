document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');

    // Función para cargar todas las tareas al cargar la página
    function loadTasks() {
        fetch('/tasks')
            .then(response => response.json())
            .then(data => {
                taskList.innerHTML = '';
                data.forEach(task => addTaskToDOM(task));
            });
    }

    // Función para agregar una tarea al DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'border', 'border-gray-300', 'rounded');
        li.innerHTML = `
            <span class="${task.completed ? 'line-through' : ''}">${task.task}</span>
            <div>
                <button class="complete-btn bg-green-500 text-white px-2 py-1 rounded mr-2">${task.completed ? 'Deshacer' : 'Completada'}</button>
                <button class="delete-btn bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
            </div>
        `;

        // Manejar el click en el botón de completar
        li.querySelector('.complete-btn').addEventListener('click', () => {
            fetch(`/tasks/${task.id}`, {
                method: 'PUT'
            })
            .then(response => response.json())
            .then(updatedTask => {
                li.querySelector('span').classList.toggle('line-through');
                li.querySelector('.complete-btn').textContent = updatedTask.completed ? 'Deshacer' : 'Completada';
            });
        });

        // Manejar el click en el botón de eliminar
        li.querySelector('.delete-btn').addEventListener('click', () => {
            fetch(`/tasks/${task.id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(() => {
                li.remove();
            });
        });

        taskList.appendChild(li);
    }

    // Manejar la adición de una nueva tarea
    addTaskBtn.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask) {
            fetch('/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: newTask })
            })
            .then(response => response.json())
            .then(task => {
                addTaskToDOM(task);
                taskInput.value = '';
            });
        }
    });

    // Cargar las tareas cuando la página esté lista
    loadTasks();
});