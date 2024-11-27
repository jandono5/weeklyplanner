document.addEventListener('DOMContentLoaded', function () {
    // Load meals from local storage when the page loads
    loadMealPlan();

    // Add event listener to all meal inputs
    const mealInputs = document.querySelectorAll('.meal-input');
    mealInputs.forEach(input => {
        // Save changes when the user types in a meal input field
        input.addEventListener('input', saveMealPlan);
    });
});

// Save the meal plan to local storage
function saveMealPlan() {
    const meals = {};
    const mealInputs = document.querySelectorAll('.meal-input');

    mealInputs.forEach(input => {
        const day = input.parentElement.querySelector('h3').textContent.toLowerCase(); // Get the day name
        meals[day] = input.value; // Save the input value under the day name
    });

    localStorage.setItem('mealPlan', JSON.stringify(meals)); // Store the meals as a JSON string
}

// Load the meal plan from local storage
function loadMealPlan() {
    const savedMeals = JSON.parse(localStorage.getItem('mealPlan')) || {}; // Parse saved meals or use an empty object
    const mealInputs = document.querySelectorAll('.meal-input');

    mealInputs.forEach(input => {
        const day = input.parentElement.querySelector('h3').textContent.toLowerCase(); // Get the day name
        if (savedMeals[day]) {
            input.value = savedMeals[day]; // Set the input value if it exists in savedMeals
        }
    });
}


document.getElementById('clear-meal-plan').addEventListener('click', function () {
    const mealInputs = document.querySelectorAll('.meal-input');
    mealInputs.forEach(input => {
        input.value = ""; // Clear the text box
    });

    localStorage.removeItem('mealPlan'); // Remove saved meal plan from local storage
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

