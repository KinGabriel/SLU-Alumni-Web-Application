// Function to toggle password visibility
function togglePasswordVisibility(inputId, iconId) {
    var passwordField = document.getElementById(inputId);
    var icon = document.getElementById(iconId).querySelector('i');
    // Toggle password visibility
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Attach toggle functionality
document.getElementById('toggleCurrentPassword').addEventListener('click', function () {
    togglePasswordVisibility('currentPassword', 'toggleCurrentPassword');
});
document.getElementById('toggleNewPassword').addEventListener('click', function () {
    togglePasswordVisibility('newPassword', 'toggleNewPassword');
});
document.getElementById('toggleConfirmNewPassword').addEventListener('click', function () {
    togglePasswordVisibility('confirmNewPassword', 'toggleConfirmNewPassword');
});

// Save Changes Logic
document.getElementById('saveChangesButton').addEventListener('click', function () {

});

// TODO: replace with actual logic -- for simulation only
document.getElementById('confirmSaveChanges').addEventListener('click', function () {
    var success = true; 
    var saveChangesModal = bootstrap.Modal.getInstance(document.getElementById('saveChangesModal'));
    saveChangesModal.hide();
    handleSaveChanges()
    if (success) {
        var successModal = new bootstrap.Modal(document.getElementById('saveChangesSuccessModal'));
        successModal.show();
    } else {
        var failureModal = new bootstrap.Modal(document.getElementById('saveChangesFailureModal'));
        failureModal.show();
    }
});


// Clear Button for Change password
document.getElementById('clearPasswordButton').addEventListener('click', function () {
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmNewPassword').value = '';
});

// Clear Button for Personal Information
document.getElementById('clearInfoButton').addEventListener('click', function () {
    // Clear Personal Information Fields
    document.getElementById('firstName').value = '';
    document.getElementById('middleName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('idNumber').value = '';
    document.getElementById('jobStatus').value = '';
    document.getElementById('company').value = '';
    document.getElementById('bio').value = '';
    // Clear Education Fields
    document.getElementById('school').selectedIndex = 0;
    document.getElementById('degree').selectedIndex = 0;
    document.getElementById('gradYear').selectedIndex = 0;
});

// Function to trigger the file input when the image is clicked
function triggerFileInput() {
    document.getElementById('profileInput').click();
}

// Function to update the profile image
function updateProfileImage(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        // Set the default image if no file is selected
        document.getElementById('profileImage').src = "../assets/images/default-profile.jpg";
    }
}

// Function to show success modal
function showSuccessModal(message) {
    const successModal = new bootstrap.Modal(document.getElementById('changePasswordSuccessModal'));
    document.querySelector('#changePasswordSuccessModal .modal-body').textContent = message;
    successModal.show();
}


function checkValidations(formData, jobStatus) {
    // Trim all form data fields
    formData.fname = formData.fname.trim();
    formData.lname = formData.lname.trim();
    formData.email = formData.email.trim();
    formData.mname = formData.mname.trim()
    formData.bio = formData.bio.trim();
    formData.school_id = formData.school_id.trim(); 
    formData.company = formData.company.trim();

    if (formData.fname === '') {
        showValidationModal('Empty Field', 'First name cannot be empty');
        return false; 
    }

    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(formData.fname)) {
        showValidationModal('Invalid Name', 'First name should only contain letters');
        return false;
    }

    if (!nameRegex.test(formData.lname)) {
        showValidationModal('Invalid Name', 'Last name should only contain letters');
        return false;
    }

    if (formData.lname === '') {
        showValidationModal('Empty Field', 'Last name cannot be empty');
        return false;
    }

    if (formData.lname === '') {
        showValidationModal('Empty Field', 'Last name cannot be empty');
        return false;
    }

    if (formData.mname !== '') {
        if (!nameRegex.test(formData.mname)) {
            showValidationModal('Invalid Name', 'Middle name should only contain letters');
            return false;
        }
    }
    
    if (formData.email === '') {
        showValidationModal('Empty Field', 'Email cannot be empty');
        return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
        showValidationModal('Invalid Email Format', 'Please enter a valid email address');
        return false;
    }

    if (formData.bio.length > 200) {
        showValidationModal('Character Limit Exceeded', 'Bio cannot exceed 200 characters');
        return false; 
    }
    if (!formData.access_type) {
        showValidationModal('Empty Field', 'Please select an account type');
        return false;
    }

    if (formData.school_id && !/^\d+$/.test(formData.school_id)) {
        showValidationModal('Invalid Input', 'School ID must be a number');
        return false;
    }


    if (jobStatus === 'employed' && formData.company === '') {
        showValidationModal('Empty Field', 'Company name cannot be empty if employed');
        return false;
    }
    return true;
}



function showValidationModal(title, message) {
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'validationErrorModal');
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-labelledby', 'validationErrorModalLabel');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="validationErrorModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ${message}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    const validationErrorModal = new bootstrap.Modal(modal);
    validationErrorModal.show();
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}
