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
    var saveChangesModal = new bootstrap.Modal(document.getElementById('saveChangesModal'));
    saveChangesModal.show();
});

// TODO: replace with actual logic -- for simulation only
document.getElementById('confirmSaveChanges').addEventListener('click', function () {
    var success = true; 
    var saveChangesModal = bootstrap.Modal.getInstance(document.getElementById('saveChangesModal'));
    saveChangesModal.hide();

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

// Function to show failure modal
function showFailureModal(message) {
    const failureModal = new bootstrap.Modal(document.getElementById('changePasswordFailureModal'));
    document.querySelector('#changePasswordFailureModal .modal-body').textContent = message;
    failureModal.show();
}