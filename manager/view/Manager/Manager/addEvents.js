// DOM elements
const steps = document.querySelectorAll(".step"),
      progress = document.querySelector(".progress-bar .progress"),
      buttons = document.querySelectorAll(".buttons .btn"),
      stepContents = document.querySelectorAll(".step-content");

let currentStep = 1;

// Update the current step and DOM
const updateSteps = (e) => {
    // Update the current step based on the btn clicked
    currentStep = e.target.id === "btn-next" ? ++currentStep : --currentStep;

    // Loop through steps and toggle 'active' class based on index and current-step
    steps.forEach((step, index) => {
        step.classList[`${index < currentStep ? "add" : "remove"}`]("active");
    });

    // Update progress width based on current step
    progress.style.width = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

    // Check last/first step and add 'disabled' attribute to buttons
    if (currentStep === steps.length) {
        buttons[1].disabled = true;  // Disable "Next" button on the last step
    } else if (currentStep === 1) {
        buttons[0].disabled = true;  // Disable "Previous" button on the first step
    } else {
        buttons.forEach((btn) => (btn.disabled = false));  // Enable both buttons
    }

    // Manage step content visibility
    stepContents.forEach((content, index) => {
        content.style.display = (index + 1 === currentStep) ? 'block' : 'none';  // Show current step, hide others
    });

    // If current step is 2, show blank page
    if (currentStep === 2) {
        // Hide Step 1 content
        document.querySelector(".step-content.step-1").style.display = 'none';
        // Show blank page content
        document.querySelector(".step-content.step-blank").style.display = 'block';
    }

    // Hide blank page at the end of the steps
    if (currentStep === steps.length) {
        document.querySelector(".step-content.step-blank").style.display = 'none'; // Hide blank page at the end
    }
};

// Add click listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", updateSteps);
});
