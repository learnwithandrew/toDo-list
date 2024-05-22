document.addEventListener('DOMContentLoaded', () => {
    let taskContainer = document.querySelector('.toDo-list');
    let taskSubmitForm = document.getElementById('taskForm');
    let taskTitle = document.getElementById('taskTitle');
    let taskDelete = document.getElementById('delete-button')

    let displayTasks = () => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then((data) => {
                let tasks = data;
                if (tasks.length === 0) {
                    let message = document.createElement('div')
                    message.innerHTML = `
                    <h1>No tasks yet</h1>
                    `;
                    taskContainer.appendChild(message);
                } else {
                    tasks.map((task) => {
                        let taskItem = document.createElement('div')
                        taskItem.classList.add('toDo-item')
                        taskItem.innerHTML = `
                    <h1>${task.taskName.toUpperCase()}</h1>
                    <div class="modify-buttons">
                        <i class="fa fa-pencil-square" aria-hidden="true" data-id=${task.id}></i>
                        <i class="fa fa-trash" id="delete-button" aria-hidden="true" data-id=${task.id}></i>
                    </div>
                `;
                        taskContainer.appendChild(taskItem)
                    })
                }
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

    let taskDeleteForm = (id) => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
    }

    taskContainer.addEventListener('click', (e) => {
        e.target.classList.contains('fa-trash')
        const taskId = e.target.dataset.id
        taskDeleteForm(taskId)

    })

    taskSubmitForm.addEventListener('submit', taskCreateForm);
    displayTasks();
})

