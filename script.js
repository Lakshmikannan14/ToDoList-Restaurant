const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

const taskStats = document.createElement('div');
taskStats.className = 'task-stats';
document.body.appendChild(taskStats);

function updateTaskCounts() {
    const tasks = taskList.querySelectorAll('li');
    const completedTasks = taskList.querySelectorAll('li span.completed');
    const incompleteTasks = tasks.length - completedTasks.length;
    
    taskStats.textContent = `Completed: ${completedTasks.length} | Incompleted: ${incompleteTasks}`;
}

function addTask() {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const span = document.createElement('span');
    span.textContent = taskText;

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            span.classList.add('completed');
        } else {
            span.classList.remove('completed');
        }
        updateTaskCounts(); 
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click', () => {
        li.remove();
        updateTaskCounts(); 
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');

    editButton.addEventListener('click', () => {
        const newTaskText = prompt('Edit your task:', span.textContent);
        if (newTaskText !== null && newTaskText !== '') {
            span.textContent = newTaskText;
        }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton); 
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = '';
    updateTaskCounts(); 
}

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});