// DOM elements
const steps = document.querySelectorAll(".step"),
      progress = document.querySelector(".progress-bar .progress"),
      buttons = document.querySelectorAll(".buttons .btn"),
      stepContents = document.querySelectorAll(".step-content"),
      fileInput = document.getElementById("image-upload"),
      fileNameLabel = document.getElementById("file-name"),
      btnPrev = document.getElementById("btn-prev"),
      btnNext = document.getElementById("btn-next"),
      btnSubmit = document.getElementById("btn-submit"),
      imagePreview = document.querySelector(".company-logo");

// Object to store job opportunity details
let jobDetails = {
    companyName: '',
    country: '',
    zipCode: '',
    address: '',
    email: '',
    contactNumber: '',
    description: '',
    jobTitle: '',
    skills: '',
    requirements: ''
};

let currentStep = 1;
let uploadedImageFile = null;

// Function to capture job details
const captureJobDetails = () => {
    if (currentStep === 1) {
        jobDetails.companyName = document.getElementById("company-name").value;
        jobDetails.country = document.getElementById("country").value;
        jobDetails.zipCode = document.getElementById("zip-code").value;
        jobDetails.address = document.getElementById("address").value;
        jobDetails.email = document.getElementById("email-address").value;
        jobDetails.contactNumber = document.getElementById("contact-number").value;
        jobDetails.description = document.getElementById("company-description").value;
    } else if (currentStep === 2) {
        jobDetails.jobTitle = document.getElementById("job-title").value;
    } else if (currentStep === 3) {
        jobDetails.skills = document.getElementById("skills").value;
        jobDetails.requirements = document.getElementById("requirements").value;
    }

    console.log("Captured Job Details:", jobDetails);
};

document.getElementById("company-name").addEventListener("input", captureJobDetails);
document.getElementById("country").addEventListener("input", captureJobDetails);
document.getElementById("zip-code").addEventListener("input", captureJobDetails);
document.getElementById("address").addEventListener("input", captureJobDetails);
document.getElementById("email-address").addEventListener("input", captureJobDetails);
document.getElementById("contact-number").addEventListener("input", captureJobDetails);
document.getElementById("company-description").addEventListener("input", captureJobDetails);
document.getElementById("job-title").addEventListener("input", captureJobDetails);
document.getElementById("skills").addEventListener("input", captureJobDetails);
document.getElementById("requirements").addEventListener("input", captureJobDetails);

// Update steps and manage DOM visibility
const updateSteps = (e) => {
    captureJobDetails();

    if (e.target.id === "btn-next" && !checkRequiredFields()) {
        e.preventDefault(); // Prevent moving to the next step
        alert("Please fill in all required fields.");
        return;
    }

    if (e.target.id === "btn-next" && currentStep === steps.length) {
        e.preventDefault();
        document.getElementById("event-form").submit();
        return;
    }

    if (e.target.id === "btn-next" && currentStep === 2) {
        e.preventDefault();
    }

    // Update current step
    currentStep = e.target.id === "btn-next" ? ++currentStep : --currentStep;

    // Update progress bar and step indicators
    steps.forEach((step, index) => {
        step.classList[index < currentStep ? "add" : "remove"]("active");
    });

    progress.style.width = `${((currentStep - 1) / (steps.length - 1)) * 100}%`;

    // Show and hide step content with null checks
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
        btnSubmit.style.display = "none";
    } else if (currentStep === steps.length) {
        btnPrev.disabled = false; // Enable "Previous" button on the last step
        btnNext.innerText = "Submit"; // Change the button text to "Submit"
        btnNext.type = "submit"; // Change button type to "submit" for form submission
        btnSubmit.style.display = "inline";
    } else {
        btnPrev.disabled = false; // Enable "Previous" button on other steps
        btnNext.innerText = "Next"; // Reset the "Next" button text
        btnNext.type = "button"; // Ensure button is not a submit button
        btnSubmit.style.display = "none";
    }

    // Ensure the image preview is shown if the file is already selected
    if (currentStep === 2 && uploadedImageFile) {
        imagePreview.style.display = "block";
    }
};

// Image upload preview
const handleImageUploadPreview = () => {
    const file = fileInput.files[0];

    if (file) {
        // Display the selected file name
        fileNameLabel.textContent = file.name;

        // Create a FileReader to load the image
        const reader = new FileReader();

        // When the file is loaded, set the image source
        reader.onload = function (e) {
            const uploadedImageURL = e.target.result; // Get the image URL from the file
            imagePreview.src = uploadedImageURL; // Set the image preview source
            imagePreview.style.display = "block"; // Make the preview image visible
        };

        // Read the file as a data URL to preview it
        reader.readAsDataURL(file);

        // Store the uploaded file
        uploadedImageFile = file;

        console.log("Upload file:", uploadedImageFile);
    } else {
        // If no file is selected, reset the file name and hide the preview image
        fileNameLabel.textContent = "No file chosen";
        imagePreview.style.display = "none";
    }
};

// Add event listener to the file input
fileInput.addEventListener("change", handleImageUploadPreview);

// Submit form data using AJAX
document.getElementById("event-form").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target); // Create FormData object
    if (uploadedImageFile) {
        console.log("Uploading file:", uploadedImageFile); // Log the file to check it's available
        formData.append("image", uploadedImageFile); // Add the image file to the form data
    } else {
        console.log("No image uploaded in step 2.");
    }

    fetch("../controller/saveJobOpp.php", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Job Opportunity added successfully!");
                window.location.href = "../view/addJobOpp.php";
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch((error) => {
            alert("An error occurred: " + error);
        });
});

// Add event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener("click", updateSteps);
});

const checkRequiredFields = () => {
    let isValid = true;

    // Step 1 validation: Company Name to Company Description
    if (currentStep === 1) {
        const step1Fields = document.querySelectorAll('#step1 [required]');
        step1Fields.forEach(field => {
            if (field.value.trim() === '') {
                isValid = false;
                field.classList.add('error'); // Add error class for empty fields
            } else {
                field.classList.remove('error'); // Remove error class if the field is filled
            }
        });
    }

    // Step 2 validation: Job Title (only required in step 2)
    if (currentStep === 2) {
        const jobTitleField = document.querySelector('#step2 #job-title');
        if (jobTitleField && jobTitleField.value.trim() === '') {
            isValid = false;
            jobTitleField.classList.add('error'); // Add error class for empty job title
        } else {
            jobTitleField.classList.remove('error'); // Remove error class if the field is filled
        }
    }

    if (currentStep === 3) {
        const step3Fields = document.querySelectorAll('#step3 [required]');
        step3Fields.forEach(field => {
            if (field.value.trim() === '') {
                isValid = false;
                field.classList.add('error'); // Add error class for empty fields
            } else {
                field.classList.remove('error'); // Remove error class if the field is filled
            }
        });
    }

    return isValid;
};

const handleInputValidation = (event) => {
    const field = event.target;
    const emailLabel = document.getElementById("email-label");
    const emailError = document.getElementById("email-error");

    if (field.id === "email-address") {
        // Email validation
        if (!validateEmail(field.value.trim())) {
            field.classList.add('error'); // Add error class if email is invalid
            emailError.style.display = "inline"; // Show error message
            emailLabel.style.display = "none"; // Hide the email label if the email is invalid
        } else {
            field.classList.remove('error'); // Remove error class if email is valid
            emailError.style.display = "none"; // Hide error message
            emailLabel.style.display = "inline"; // Show email label again if email is valid
        }
    } else {
        // For other fields, check if they are empty or not
        if (field.value.trim() === '') {
            field.classList.add('error'); // Add error class if the field is empty
        } else {
            field.classList.remove('error'); // Remove error class if the field is filled
        }
    }
};

const requiredFields = document.querySelectorAll('[required]');
requiredFields.forEach(field => {
    field.addEventListener('input', handleInputValidation);
});

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const emailField = document.getElementById('email-address');
emailField.addEventListener('input', handleInputValidation);

// Function to handle zip code validation
const handleZipCodeValidation = (event) => {
    const field = event.target;
    const zipLabel = document.getElementById("zip-label");
    const zipError = document.getElementById("zip-error");

    // Allow only numeric input
    if (/\D/.test(field.value)) { // Regex to match non-digit characters
        field.value = field.value.replace(/\D/g, ''); // Remove non-digit characters
        zipError.style.display = "inline"; // Show error message
        zipLabel.style.display = "none";
    } else {
        zipError.style.display = "none"; // Hide error message if the input is valid
        zipLabel.style.display = "inline";
    }
};

// Add event listener to the zip code field
const zipCodeField = document.getElementById('zip-code');
zipCodeField.addEventListener('input', handleZipCodeValidation);

// Function to handle contact number validation
const handleContactNumberValidation = (event) => {
    const field = event.target;
    const numLabel = document.getElementById("number-label");
    const numError = document.getElementById("number-error");

    // Allow only numeric input
    if (/\D/.test(field.value)) { // Regex to match non-digit characters
        field.value = field.value.replace(/\D/g, ''); // Remove non-digit characters
        numError.style.display = "inline"; // Show error message
        numLabel.style.display = "none";
    } else {
        numError.style.display = "none"; // Hide error message if the input is valid
        numLabel.style.display = "inline";
    }
};

// Add event listener to the zip code field
const contactNumberField = document.getElementById('contact-number');
contactNumberField.addEventListener('input', handleContactNumberValidation);