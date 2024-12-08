// DOM elements
const steps = document.querySelectorAll(".step"),
      progress = document.querySelector(".progress-bar .progress"),
      buttons = document.querySelectorAll(".buttons .btn"),
      stepContents = document.querySelectorAll(".step-content");
      fileInput = document.getElementById("image-upload"),
      fileNameLabel = document.getElementById("file-name"), // File name label
      btnPrev = document.getElementById("btn-prev"),
      btnNext = document.getElementById("btn-next"),
      btnSubmit = document.getElementById("btn-submit");
    
      // Store the image data
    let uploadedImageURL = '';
    let eventDetails = {
    title: '',
    location: '',
    startDate: '',
    startTime: '',
    endTime: '',
    description: ''
};


let currentStep = 1;
let uploadedImageFile = null;

const captureEventDetails = () => {
    // Capture values from the form inputs
    eventDetails.title = document.getElementById("event-title-input").value;
    eventDetails.startDate = document.getElementById("start-date").value;
    eventDetails.startTime = document.getElementById("start-time").value;
    eventDetails.endTime = document.getElementById("end-time").value;
    eventDetails.location = document.getElementById("event-location-input").value;
    eventDetails.description = document.getElementById("event-description-input").value;
    console.log("Captured Event Details:", eventDetails);
};

document.getElementById("event-title-input").addEventListener("input", captureEventDetails);
document.getElementById("start-date").addEventListener("input", captureEventDetails);
document.getElementById("start-time").addEventListener("input", captureEventDetails);
document.getElementById("end-time").addEventListener("input", captureEventDetails);
document.getElementById("event-location-input").addEventListener("input", captureEventDetails);
document.getElementById("event-description-input").addEventListener("input", captureEventDetails);

// Update the current step and DOM  
const updateSteps = (e) => {
    console.log("Upload file:", uploadedImageFile);
    
    captureEventDetails();
    
    if (e.target.id === "btn-next" && currentStep === 3) {
        e.preventDefault();
        document.getElementById("event-form").submit();
        return;  // Prevent moving to the next step
    }

    // Prevent form submission on "Next" button click
    if (e.target.id === "btn-next" && currentStep === 2) {
        e.preventDefault();
    }

    // Update the current step based on the clicked button
    currentStep = e.target.id === "btn-next" ? ++currentStep : --currentStep;

    // Update active classes for step indicators
    steps.forEach((step, index) => {
        step.classList[index < currentStep ? "add" : "remove"]("active");
    });

    // Update progress bar width
    progress.style.width = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

    // Show and hide step content
    stepContents.forEach((content, index) => {
        content.style.display = index + 1 === currentStep ? "block" : "none";
    });

    // Manage button states
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    if (currentStep === 1) {
        btnPrev.disabled = true; // Disable "Previous" button on the first step
        btnNext.innerText = "Next"; // Reset the "Next" button text
        btnNext.type = "button"; // Ensure button is not a submit button
    } else if (currentStep === steps.length) {
        console.log("steps length:", steps.length);
        btnPrev.disabled = false; // Enable the "Previous" button
        btnNext.innerText = "Submit"; // Change the button text to "Submit"
        btnNext.type = "submit"; // Change button type to "submit" for form submission
        console.log("button type:", btnNext.type);
    } else {
        btnPrev.disabled = false; // Enable the "Previous" button
        btnNext.innerText = "Next"; // Reset the "Next" button text
        btnNext.type = "button"; // Ensure button is not a submit button
    }

    if (currentStep === 2) {
        handleImageUploadPreview();
    }

    if (currentStep === 3) {
        displayEventPreview();
    }
};

// Show selected file name and image preview
const handleImageUploadPreview = () => {
    const file = fileInput.files[0];

    if (file) {
        fileNameLabel.textContent = file.name; // Show file name
        const reader = new FileReader();
        
        // Preview image (if it's an image file)
        reader.onload = function(e) {
            uploadedImageURL = e.target.result; // Store the image URL
            const imagePreview = document.querySelector(".event-image");
            imagePreview.src = uploadedImageURL; // Set image source to the uploaded file
            imagePreview.style.display = "block"; // Make image visible
        };

        // Read the file as a data URL to display it
        reader.readAsDataURL(file);

        uploadedImageFile = file;
        console.log("Upload file:", uploadedImageFile);
    } else {
        fileNameLabel.textContent = "No file chosen"; // Reset file name if no file is selected
    }
};

// Display event preview on Step 3
const displayEventPreview = () => {
    // Set the event details for Step 3 preview
    document.getElementById("event-image-preview").src = uploadedImageURL; // Set the event image
    // Set the event title
    document.querySelector(".event-title").textContent = eventDetails.title;
    
    // Set the event date and time
    const eventDateTime = document.querySelector(".event-date-time");
    eventDateTime.querySelector(".date").textContent = eventDetails.startDate; // Event Date
    eventDateTime.querySelector(".time").textContent = `${eventDetails.startTime} - ${eventDetails.endTime}`; // Event Time
    
    // Set the event location
    document.querySelector(".location-text").textContent = eventDetails.location; // Event Location
    
    // Set the event description
    document.querySelector(".description").textContent = eventDetails.description; // Event Description
};

// Add event listener to the file input for previewing the image
fileInput.addEventListener("change", handleImageUploadPreview);

// Add click listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener("click", updateSteps);
});

// Handle form submission via AJAX when Submit button is clicked in Step 3
document.getElementById("event-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission to handle it via AJAX

    const formData = new FormData(e.target); // Get the form data

    if (uploadedImageFile) {
        console.log("Uploading file:", uploadedImageFile); // Log the file to check it's available
        formData.append("image", uploadedImageFile); // Add the image file to the form data
    } else {
        console.log("No image uploaded.");
    }

    fetch("../controller/saveEvent.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Event added successfully!");
            window.location.href = "../view/addEvents.php"; // Redirect after success
        } else {
            alert("Error: " + data.error);
        }
    })
    .catch(error => {
        alert("An error occurred: " + error);
    });
});

// Show the first step initially
// updateSteps({ target: { id: "btn-next" } });