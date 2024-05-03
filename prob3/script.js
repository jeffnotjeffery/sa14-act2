document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Function to create a new task item
    function createTaskItem(title, details) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${title}</span>
            <span>${details}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
    }

    // Event listener for task submission
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskTitle = document.getElementById('task-title').value;
        const taskDetails = document.getElementById('task-details').value;
        createTaskItem(taskTitle, taskDetails);
        taskForm.reset(); // Reset form fields after task is added
    });

    // Event delegation for edit and delete buttons
    taskList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            const li = target.parentElement;
            const title = li.querySelector('span:first-child').textContent;
            const details = li.querySelector('span:nth-child(2)').textContent;
            const updatedTitle = prompt('Enter updated title:', title);
            const updatedDetails = prompt('Enter updated details:', details);
            if (updatedTitle !== null && updatedTitle !== '') {
                li.querySelector('span:first-child').textContent = updatedTitle;
                li.querySelector('span:nth-child(2)').textContent = updatedDetails;
            }
        } else if (target.classList.contains('delete-btn')) {
            const li = target.parentElement;
            taskList.removeChild(li);
        }
    });
});
