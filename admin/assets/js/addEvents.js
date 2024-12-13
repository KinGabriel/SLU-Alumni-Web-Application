// DOM elements
const steps = document.querySelectorAll(".step"),
      progress = document.querySelector(".progress-bar .progress"),
      buttons = document.querySelectorAll(".buttons .btn"),
      stepContents = document.querySelectorAll(".step-content"),
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

const validateDatesAndTimes = () => {
    const currentDate = new Date();
    const startDateInput = document.getElementById("start-date").value;
    const startTimeInput = document.getElementById("start-time").value;
    const endTimeInput = document.getElementById("end-time").value;
  
    // Parse the start and end dates and times
    const startDate = new Date(startDateInput);
    const startTime = new Date(`${startDateInput}T${startTimeInput}`);
    const endTime = new Date(`${startDateInput}T${endTimeInput}`);
  
    // Validate the clicked date
    if (startDate.getTime() === currentDate.getTime() && startTime <= currentDate) {
      alert("The selected time cannot be earlier than the current time.");
      return false;
    } else if (startDate <= currentDate) {
      alert("The selected date cannot be earlier than the current date.");
      return false;
    }
  
    // Validate start and end times
    if (endTime < startTime) {
      alert("The end time cannot be earlier than the start time.");
      return false;
    } 
  
    return true;
  };

const checkRequiredFields = () => {
    const requiredFields = document.querySelectorAll('[required]'); // Select all fields with "required" attribute
    let allValid = true; // Flag to track if all fields are valid

    // Loop through each required field
    requiredFields.forEach((field) => {
        if (!field.value.trim()) { // Check if the field is empty
            field.classList.add('error'); // Optionally, add an error class for styling
            allValid = false; // Mark validation as failed
        } else {
            field.classList.remove('error'); // Remove error class if field is not empty
        }
    });

    // Validate the dates and times
    if (allValid) {
        allValid = validateDatesAndTimes();
    }

    return allValid; // Return true if all fields are valid, otherwise false
};

const handleInputValidation = (event) => {
    const field = event.target;

    if (field.value.trim() === '') {
        field.classList.add('error'); // Add error class if the field is empty
    } else {
        field.classList.remove('error'); // Remove error class if the field is filled
    }
};

const requiredFields = document.querySelectorAll('[required]');
requiredFields.forEach(field => {
    field.addEventListener('input', handleInputValidation);
});

// Update the current step and DOM  
const updateSteps = (e) => {
    console.log("Upload file:", uploadedImageFile);

    if (e.target.id === "btn-next" && !checkRequiredFields()) {
        e.preventDefault(); // Prevent moving to the next step
        return;
    }
    
    if (e.target.id === "btn-next" && checkRequiredFields()) {
        captureEventDetails();
    }
    
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
    const file = fileInput.files[0]; // Get the selected file

    if (file) {
        fileNameLabel.textContent = file.name; // Show file name
        const reader = new FileReader();

        // Preview image (if it's an image file)
        reader.onload = function (e) {
            uploadedImageURL = e.target.result; // Store the uploaded image URL
            uploadedImageFile = file; // Store the file reference
            console.log("Uploaded file:", uploadedImageFile);
        };

        // Read the file as a data URL to display it
        reader.readAsDataURL(file);
    } else {
        // Reset values if no file is selected
        fileNameLabel.textContent = "No file chosen"; // Reset file name label
        uploadedImageURL = null; // Clear the uploaded image URL
        uploadedImageFile = null; // Clear the uploaded file
        fileInput.value = ""; // Clear the file input
        console.log("No file selected.");
    }
};



// Display event preview on Step 3
const displayEventPreview = () => {
    // Ensure uploadedImageURL is set correctly
    const previewImageURL = uploadedImageURL || "../assets/images/default-event-image.png"; // Fallback to default image

    // Set the event details for Step 3 preview
    document.getElementById("event-image-preview").src = previewImageURL; // Set the event image
    document.querySelector(".event-title").textContent = eventDetails.title || "Untitled Event"; // Set the event title
    
    // Set the event date and time
    const eventDateTime = document.querySelector(".event-date-time");
    eventDateTime.querySelector(".date").textContent = eventDetails.startDate || "No date"; // Event Date
    eventDateTime.querySelector(".time").textContent = `${eventDetails.startTime || "N/A"} - ${eventDetails.endTime || "N/A"}`; // Event Time
    
    // Set the event location
    document.querySelector(".location-text").textContent = eventDetails.location || "No location provided"; // Event Location
    
    // Set the event description
    document.querySelector(".description").textContent = eventDetails.description || "No description provided"; // Event Description
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
        console.log("No image uploaded. Using default image.");
        formData.append("defaultImage", "../assets/images/default-event-image.png");
    }

    fetch("../controller/saveEvent.php", {
        method: "POST",
        body: formData,
    })
    .then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json(); // Parse the response as JSON
        } else {
            throw new Error("Invalid response format from server.");
        }
    })
    .then((data) => {
        if (data.success) {
            alert("Event added successfully!");
            window.location.href = "../view/addEvents.php"; // Redirect after success
        } else {
            console.error("Server Error:", data.error);
            alert("Error: " + (data.error || "An unknown error occurred."));
        }
    })
    .catch((error) => {
        console.error("Fetch Error:", error); // Log the error for debugging
        throw new Error("An unexpected error occurred. Please try again later.");
    });
});

// Show the first step initially
// updateSteps({ target: { id: "btn-next" } });