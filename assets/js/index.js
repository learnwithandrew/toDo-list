document.addEventListener('DOMContentLoaded', () => {
    let taskContainer = document.querySelector('.toDo-list')
    let displayTasks = () => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then((data) => {
                let tasks = data;
                tasks.map((task) => {
                    let taskItem = document.createElement('div')
                    taskItem.classList.add('toDo-item')
                    taskItem.innerHTML = `
                    <h1>${task.taskName}</h1>
                    <div class="modify-buttons">
                        <i class="fa fa-pencil-square" aria-hidden="true"></i>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </div>
                `;
                    taskContainer.appendChild(taskItem)
                })
            })

    }
    displayTasks();
})

