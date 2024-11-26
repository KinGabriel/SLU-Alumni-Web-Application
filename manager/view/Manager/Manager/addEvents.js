// DOM elements
const steps = document.querySelectorAll(".step"),
	progress = document.querySelector(".progress-bar .progress"),
	buttons = document.querySelectorAll(".buttons .btn");

let currentStep = 1;

// Update the current step and DOM
const updateSteps = (e) => {
	// Update the current step based on the btn clicked

	currentStep = e.target.id === "btn-next" ? ++currentStep : --currentStep;
	// loop through steps and toggle 'active' class based on index and current-step
	steps.forEach((step, index) => {
		step.classList[`${index < currentStep ? "add" : "remove"}`]("active");
	});

	// Update progress width based on current step
	progress.style.width = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

	// Check last/first step and add 'disabled' attribute
	if (currentStep === steps.length) {
		buttons[1].disabled = true;
	} else if (currentStep === 1) {
		buttons[0].disabled = true;
	} else {
		buttons.forEach((btn) => (btn.disabled = false));
	}
};

// Add click listeners to all buttons
buttons.forEach((button) => {
	button.addEventListener("click", updateSteps);
});
