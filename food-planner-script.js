document.addEventListener("DOMContentLoaded", function() {
	document.getElementById("show-dinner").focus();
	// Load saved meal plans
	loadMealPlan();
	showMealPlan("dinner");

	// Get references to the meal plan buttons
	const breakfastBtn = document.getElementById("show-breakfast");
	const lunchBtn = document.getElementById("show-lunch");
	const dinnerBtn = document.getElementById("show-dinner");

	// Event listeners for meal plan buttons
	breakfastBtn.addEventListener("click", () => {
		showMealPlan("breakfast");
	});

	lunchBtn.addEventListener("click", () => {
		showMealPlan("lunch");
	});

	dinnerBtn.addEventListener("click", () => {
		showMealPlan("dinner");
	});

	// Save inputs when the user types
	const mealInputs = document.querySelectorAll(".meal-input");
	mealInputs.forEach((input) => {
		input.addEventListener("input", saveMealPlan);
	});

	// Clear all inputs
	document
		.getElementById("clear-meal-plan")
		.addEventListener("click", function() {
			if (confirm("are you sure you want to clear everything?!")) {
				mealInputs.forEach((input) => {
					input.value = "";
				});
				localStorage.removeItem("mealPlan");
			}
		});
});

// Show the selected meal plan and hide the others
function showMealPlan(plan) {
	const breakfastPlan = document.getElementById("breakfast-plan");
	const lunchPlan = document.getElementById("lunch-plan");
	const dinnerPlan = document.getElementById("dinner-plan");

	breakfastPlan.classList.add("hidden");
	lunchPlan.classList.add("hidden");
	dinnerPlan.classList.add("hidden");

	if (plan === "breakfast") {
		breakfastPlan.classList.remove("hidden");
	} else if (plan === "lunch") {
		lunchPlan.classList.remove("hidden");
	} else if (plan === "dinner") {
		dinnerPlan.classList.remove("hidden");
	}
}

// Save meal plans to local storage
function saveMealPlan() {
	const meals = { breakfast: {}, lunch: {}, dinner: {} };

	document.querySelectorAll(".breakfast-input").forEach((input) => {
		const day = input.parentElement
			.querySelector("h3")
			.textContent.toLowerCase();
		meals.breakfast[day] = input.value;
	});

	document.querySelectorAll(".lunch-input").forEach((input) => {
		const day = input.parentElement
			.querySelector("h3")
			.textContent.toLowerCase();
		meals.lunch[day] = input.value;
	});

	document.querySelectorAll(".dinner-input").forEach((input) => {
		const day = input.parentElement
			.querySelector("h3")
			.textContent.toLowerCase();
		meals.dinner[day] = input.value;
	});

	localStorage.setItem("mealPlan", JSON.stringify(meals));
}

// Load meal plans from local storage
function loadMealPlan() {
	const savedMeals = JSON.parse(localStorage.getItem("mealPlan")) || {
		breakfast: {},
		lunch: {},
		dinner: {},
	};

	document.querySelectorAll(".breakfast-input").forEach((input) => {
		const day = input.parentElement
			.querySelector("h3")
			.textContent.toLowerCase();
		if (savedMeals.breakfast[day]) {
			input.value = savedMeals.breakfast[day];
		}
	});

	document.querySelectorAll(".lunch-input").forEach((input) => {
		const day = input.parentElement
			.querySelector("h3")
			.textContent.toLowerCase();
		if (savedMeals.lunch[day]) {
			input.value = savedMeals.lunch[day];
		}
	});

	document.querySelectorAll(".dinner-input").forEach((input) => {
		const day = input.parentElement
			.querySelector("h3")
			.textContent.toLowerCase();
		if (savedMeals.dinner[day]) {
			input.value = savedMeals.dinner[day];
		}
	});
}

const mealBtnList = document.querySelectorAll(".meal-btn");

mealBtnList.forEach((mealBtn) => {
	mealBtn.addEventListener("click", () => {
		document.querySelector(".black-bg")?.classList.remove("black-bg");
		mealBtn.classList.add("black-bg");
	});
});


