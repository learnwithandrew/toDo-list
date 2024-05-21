document.addEventListener('DOMContentLoaded', () => {
    let taskContainer = document.querySelector('.toDo-list');
    let taskSubmitForm = document.getElementById('taskForm');
    let taskTitle = document.getElementById('taskTitle');

    let displayTasks = () => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then((data) => {
                let tasks = data;
                tasks.map((task) => {
                    let taskItem = document.createElement('div')
                    taskItem.classList.add('toDo-item')
                    taskItem.innerHTML = `
                    <h1>${task.taskName.toUpperCase()}</h1>
                    <div class="modify-buttons">
                        <i class="fa fa-pencil-square" aria-hidden="true"></i>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </div>
                `;
                    taskContainer.appendChild(taskItem)
                })
            })
    }

    let taskCreateForm = (e) => {
        e.preventDefault();

        const taskName = taskTitle.value;
        const taskItem = {
            taskName
        }
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskItem)
        }).then(response => response.json()).then((data) => { console.log(data) })
    }

    taskSubmitForm.addEventListener('submit', taskCreateForm);
    displayTasks();
})

