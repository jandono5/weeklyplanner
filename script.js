// Auto-resize utility functions
function autoResize(textarea) {
  textarea.style.height = "auto"; // Reset height
  textarea.style.height = `${textarea.scrollHeight}px`; // Resize to fit content
}

function addAutoResizeListener(textarea) {
  textarea.addEventListener("input", () => autoResize(textarea));
  autoResize(textarea); // Resize immediately
}

document.addEventListener("DOMContentLoaded", function () {
  loadTasksFromLocalStorage();

  const addButtons = document.querySelectorAll(".add-btn");
  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const dayDiv = this.parentElement;
      const taskInput = dayDiv.querySelector(".task-input");
      const taskText = taskInput.value.trim();

      if (taskText !== "") {
        addTaskToDay(dayDiv, taskText);
        taskInput.value = "";
        saveTasksToLocalStorage();
      }
    });
  });

  const taskInputs = document.querySelectorAll(".task-input");
  taskInputs.forEach((input) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        const dayDiv = this.parentElement;
        const taskText = this.value.trim();

        if (taskText !== "") {
          addTaskToDay(dayDiv, taskText);
          this.value = "";
          saveTasksToLocalStorage();
        }
      }
    });
  });

  // Dropdown logic for all dropdowns
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const dropbtn = dropdown.querySelector(".dropbtn");
    const defaultLink = dropdown.querySelector(".default-link");

    dropbtn.textContent = defaultLink.textContent;

    dropdown.addEventListener("mouseover", () => {
      defaultLink.classList.add("hidden");
    });

    dropdown.addEventListener("mouseleave", () => {
      defaultLink.classList.remove("hidden");
    });

    const links = dropdown.querySelectorAll(".dropdown-content a");
    links.forEach((link) => {
      link.addEventListener("click", function () {
        dropbtn.textContent = this.textContent;
      });
    });
  });
});

function addTaskToDay(dayDiv, taskText, isChecked = false) {
  const taskList = dayDiv.querySelector(".task-list");
  const li = document.createElement("li");
  li.classList.add("task-item");

  const taskInput = document.createElement("textarea");
  taskInput.classList.add("task");
  taskInput.value = taskText;
  taskInput.setAttribute("rows", "1");


  // Trigger auto-resize based on content
  taskInput.style.height = "auto";
  taskInput.style.height = `${taskInput.scrollHeight}px`;

  if (isChecked) taskInput.classList.add("checked");

  addAutoResizeListener(taskInput);

  li.setAttribute("draggable", "true");

  li.addEventListener("dragstart", (e) => {
    li.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });

  li.addEventListener("dragend", () => {
    li.classList.remove("dragging");
    saveTasksToLocalStorage();
  });

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check-btn");
  checkBtn.textContent = "✔";
  checkBtn.addEventListener("click", () => {
    taskInput.classList.toggle("checked");
    saveTasksToLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "✖";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    saveTasksToLocalStorage();
  });

  li.appendChild(taskInput);
  li.appendChild(checkBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  addAutoResizeListener(taskInput);
  addDragAndDropListeners(taskList);
}

function addDragAndDropListeners(taskList) {
  taskList.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = taskList.querySelector(".dragging");
    const afterElement = getDragAfterElement(taskList, e.clientY);
    if (afterElement == null) {
      taskList.appendChild(draggingItem);
    } else {
      taskList.insertBefore(draggingItem, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".task-item:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}

function saveTasksToLocalStorage() {
  const plannerData = {};
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    const dayId = day.id;
    const taskInputs = day.querySelectorAll(".task-list .task");
    const tasks = Array.from(taskInputs).map((input) => ({
      text: input.value,
      checked: input.classList.contains("checked"),
    }));
    plannerData[dayId] = tasks;
  });
  localStorage.setItem("weeklyPlanner", JSON.stringify(plannerData));
}

function loadTasksFromLocalStorage() {
  const plannerData = JSON.parse(localStorage.getItem("weeklyPlanner"));
  if (plannerData) {
    Object.keys(plannerData).forEach((dayId) => {
      const dayDiv = document.getElementById(dayId);
      const tasks = plannerData[dayId];
      tasks.forEach((task) => {
        addTaskToDay(dayDiv, task.text, task.checked);
      });
    });
  }
}

document
  .getElementById("clear-weekly-planner")
  .addEventListener("click", function () {
    if (confirm("are you sure you want to clear everything?!")) {
      const taskLists = document.querySelectorAll(".task-list");
      taskLists.forEach((taskList) => {
        taskList.innerHTML = "";
      });
      localStorage.removeItem("weeklyPlanner");
    }
  });
