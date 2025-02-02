document.addEventListener('DOMContentLoaded', function () {
    // Load saved meal plans
    loadMealPlan();

    // Get references to the meal plan button and dropdown links
    const mealPlanButton = document.querySelector('.dropbtn-meal');
    const showLunchLink = document.getElementById('show-lunch');
    const showDinnerLink = document.getElementById('show-dinner');
    const mealDropdownContent = document.querySelector('.dropdown-content-meal');

    // Get references to the main dropdown button and links
    const mainDropdownButton = document.querySelector('.dropbtn');
    const mainDropdownContent = document.querySelector('.dropdown-content');
    const mainDefaultLink = document.querySelector('.default-link');

    // Function to update the meal plan dropdown options
    function updateMealDropdown(selectedPlan) {
        if (selectedPlan === 'lunch') {
            showLunchLink.classList.add('hidden'); // Hide "lunch plan" option
            showDinnerLink.classList.remove('hidden'); // Show "dinner plan" option
        } else if (selectedPlan === 'dinner') {
            showLunchLink.classList.remove('hidden'); // Show "lunch plan" option
            showDinnerLink.classList.add('hidden'); // Hide "dinner plan" option
        }
    }

    // Function to update the main dropdown options
    function updateMainDropdown(selectedLink) {
        const mainLinks = mainDropdownContent.querySelectorAll('a');
        mainLinks.forEach(link => {
            if (link === selectedLink) {
                link.classList.add('hidden'); // Hide the selected link
            } else {
                link.classList.remove('hidden'); // Show the other link
            }
        });
    }

    // Add event listeners to meal plan dropdown links
    showLunchLink.addEventListener('click', function (e) {
        e.preventDefault();
        showMealPlan('lunch');
        mealPlanButton.textContent = 'lunch plan'; // Update button text (lowercase)
        updateMealDropdown('lunch'); // Update dropdown options
    });

    showDinnerLink.addEventListener('click', function (e) {
        e.preventDefault();
        showMealPlan('dinner');
        mealPlanButton.textContent = 'dinner plan'; // Update button text (lowercase)
        updateMealDropdown('dinner'); // Update dropdown options
    });

    // Add event listeners to main dropdown links
    mainDropdownContent.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            // Update the button text
            mainDropdownButton.textContent = this.textContent.toLowerCase();

            // Update the dropdown options
            updateMainDropdown(this);

            // Allow the default navigation behavior
            // No need to call e.preventDefault() here
        });
    });

    // Save inputs when the user types
    const mealInputs = document.querySelectorAll('.meal-input');
    mealInputs.forEach(input => {
        input.addEventListener('input', saveMealPlan);
    });

    // Clear all inputs
    document.getElementById('clear-meal-plan').addEventListener('click', function () {
        mealInputs.forEach(input => {
            input.value = '';
        });
        localStorage.removeItem('mealPlan');
    });

    // Set the initial button text and dropdown options based on the currently visible plan
    const lunchPlan = document.getElementById('lunch-plan');
    const dinnerPlan = document.getElementById('dinner-plan');
    if (!lunchPlan.classList.contains('hidden')) {
        mealPlanButton.textContent = 'lunch plan'; // Set initial button text (lowercase)
        updateMealDropdown('lunch');
    } else if (!dinnerPlan.classList.contains('hidden')) {
        mealPlanButton.textContent = 'dinner plan'; // Set initial button text (lowercase)
        updateMealDropdown('dinner');
    }

    // Set the initial main dropdown options
    updateMainDropdown(mainDefaultLink);
});

// Show the selected meal plan and hide the other
function showMealPlan(plan) {
    const lunchPlan = document.getElementById('lunch-plan');
    const dinnerPlan = document.getElementById('dinner-plan');

    if (plan === 'lunch') {
        lunchPlan.classList.remove('hidden');
        dinnerPlan.classList.add('hidden');
    } else if (plan === 'dinner') {
        lunchPlan.classList.add('hidden');
        dinnerPlan.classList.remove('hidden');
    }
}

// Save meal plans to local storage
function saveMealPlan() {
    const meals = { lunch: {}, dinner: {} };

    // Save lunch inputs
    document.querySelectorAll('.lunch-input').forEach(input => {
        const day = input.parentElement.querySelector('h3').textContent.toLowerCase();
        meals.lunch[day] = input.value;
    });

    // Save dinner inputs
    document.querySelectorAll('.dinner-input').forEach(input => {
        const day = input.parentElement.querySelector('h3').textContent.toLowerCase();
        meals.dinner[day] = input.value;
    });

    localStorage.setItem('mealPlan', JSON.stringify(meals));
}

// Load meal plans from local storage
function loadMealPlan() {
    const savedMeals = JSON.parse(localStorage.getItem('mealPlan')) || { lunch: {}, dinner: {} };

    // Load lunch inputs
    document.querySelectorAll('.lunch-input').forEach(input => {
        const day = input.parentElement.querySelector('h3').textContent.toLowerCase();
        if (savedMeals.lunch[day]) {
            input.value = savedMeals.lunch[day];
        }
    });

    // Load dinner inputs
    document.querySelectorAll('.dinner-input').forEach(input => {
        const day = input.parentElement.querySelector('h3').textContent.toLowerCase();
        if (savedMeals.dinner[day]) {
            input.value = savedMeals.dinner[day];
        }
    });
}
