const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let tasks = [];

// Function to render tasks
function renderTasks() {
    // Clear existing list
    todoList.innerHTML = '';

    // Render each task
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        // Add edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit task:', task.text);
            if (newText !== null) {
                tasks[index].text = newText;
                renderTasks();
            }
        });

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        // Add complete toggle button
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        });

        const actions = document.createElement('div');
        actions.classList.add('actions');
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        actions.appendChild(completeButton);

        li.appendChild(actions);
        todoList.appendChild(li);
    });
}

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (text !== '') {
        tasks.push({ text: text, completed: false });
        input.value = '';
        renderTasks();
    }
});

// Initial render
renderTasks();
