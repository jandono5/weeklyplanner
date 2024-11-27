document.addEventListener('DOMContentLoaded', function() {
    // loading tasks from local storage
    loadTasksFromLocalStorage();

    // event listener for all add buttons
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dayDiv = this.parentElement;
            const taskInput = dayDiv.querySelector('.task-input');
            const taskText = taskInput.value.trim();
            
            if (taskText !== "") {
                addTaskToDay(dayDiv, taskText);
                taskInput.value = "";
                saveTasksToLocalStorage();
            }
        });
    });

    // event listener for 'Enter' key press
    const taskInputs = document.querySelectorAll('.task-input');
    taskInputs.forEach(input => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const dayDiv = this.parentElement;
                const taskText = this.value.trim();
                
                if (taskText !== "") {
                    addTaskToDay(dayDiv, taskText);
                    this.value = "";  // clear the input after adding
                    saveTasksToLocalStorage();
                }
            }
        });
    });
});

// drop down 
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = dropdown.querySelector('.dropbtn');
    const defaultLink = dropdown.querySelector('.default-link');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    // Set the button's text to match the default link on page load
    dropbtn.textContent = defaultLink.textContent;

    // Hide the default link when the dropdown is hovered
    dropdown.addEventListener('mouseover', function () {
        defaultLink.classList.add('hidden'); // Hide the default link
    });

    // Show the default link again when the dropdown is not hovered
    dropdown.addEventListener('mouseleave', function () {
        defaultLink.classList.remove('hidden'); // Show the default link
    });

    // Update button text dynamically if another link is clicked
    const dropdownLinks = dropdown.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function () {
            dropbtn.textContent = this.textContent;
        });
    });
});







function addTaskToDay(dayDiv, taskText, isChecked = false) {
    const taskList = dayDiv.querySelector('.task-list');
    const li = document.createElement('li');
    li.classList.add('task-item');  // Add class for task item

    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.value = taskText;
    taskInput.classList.add('task');
    if (isChecked) {
        taskInput.classList.add('checked');
    }

    // check button
    const checkBtn = document.createElement('button');
    checkBtn.classList.add('check-btn');
    checkBtn.textContent = '✔';

    // click event for button
    checkBtn.addEventListener('click', function() {
        taskInput.classList.toggle('checked');
        saveTasksToLocalStorage();
    });

    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '✖';

    // click event for delete
    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveTasksToLocalStorage();
    });

    // adding elements to list item
    li.appendChild(taskInput);
    li.appendChild(checkBtn);
    li.appendChild(deleteBtn);

    // add list item to list
    taskList.appendChild(li);
}

function saveTasksToLocalStorage() {
    const plannerData = {};
    
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        const dayId = day.id;
        const taskInputs = day.querySelectorAll('.task-list .task');
        const tasks = Array.from(taskInputs).map(input => ({
            text: input.value,
            checked: input.classList.contains('checked')
        }));

        plannerData[dayId] = tasks;
    });

    localStorage.setItem('weeklyPlanner', JSON.stringify(plannerData));
}

function loadTasksFromLocalStorage() {
    const plannerData = JSON.parse(localStorage.getItem('weeklyPlanner'));
    if (plannerData) {
        Object.keys(plannerData).forEach(dayId => {
            const dayDiv = document.getElementById(dayId);
            const tasks = plannerData[dayId];
            
            tasks.forEach(task => {
                addTaskToDay(dayDiv, task.text, task.checked);
            });
        });
    }
}
