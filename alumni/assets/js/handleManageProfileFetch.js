function populateForm() {
    fetch(`/api/manage-profile/get-info`)
        .then(response => response.json())
        .then(data => { 
            console.log(data);
            const user = data.userInfo[0]; 

            document.getElementById('profileImage').src = user.pfp || '../assets/images/default-profile.jpg';
            document.getElementById('firstName').value = user.fname || '';
            document.getElementById('middleName').value = user.mname || '';
            document.getElementById('lastName').value = user.lname || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('idNumber').value = user.school_id || '';
            const jobStatusSelect = document.getElementById('jobStatus');
            const companyField = document.getElementById('company');

            if (user.company) {
                jobStatusSelect.value = 'employed';
                companyField.value = user.company || '';
                companyField.parentElement.style.display = 'block'; 
            } else {
                jobStatusSelect.value = 'unemployed';
                companyField.value = '';
                companyField.parentElement.style.display = 'none'
            }
            document.getElementById('company').value = user.company || '';  
            document.getElementById('bio').value = user.bio || '';

            if (user.access_type) {
                const accountTypePrivate = document.getElementById('accountTypePrivate');
                const accountTypePublic = document.getElementById('accountTypePublic');
            
                if (accountTypePrivate && user.access_type === 'private') {
                    accountTypePrivate.checked = true;
                }
            
                if (accountTypePublic && user.access_type === 'public') {
                    accountTypePublic.checked = true;
                }
            }
            document.getElementById('school').value = user.school || ''; 
            document.getElementById('degree').value = user.program || ''; 
            document.getElementById('gradYear').value = user.gradyear || ''; 

            toggleCompanyField(user.jobStatus);
        })
        .catch(error => console.error('Error fetching profile data:', error));
}

function toggleCompanyField(jobStatus) {
    const companyField = document.getElementById('company');
    if (jobStatus === 'employed') {
        companyField.disabled = false;  
        companyField.parentElement.style.display = 'block';  
    } else if (jobStatus === 'unemployed') {
        companyField.disabled = true;  // Disable the company input field
        companyField.value = '';  // Clear the company input field
        companyField.parentElement.style.display = 'none';  // Hide the company field
    }
}

function handleChangePfp() {
    const profileImage = document.getElementById('profileInput').files[0];

    if (!profileImage) {
        // Trigger the modal when no image is selected
        const imageSelectionModal = new bootstrap.Modal(document.getElementById('imageSelectionModal'));
        imageSelectionModal.show();
        return;
    }

    const formData = new FormData();
    formData.append('pfp', profileImage); // Attach the file directly

    fetch('/api/manage-profile/upload-pfp', {
        method: 'POST',
        body: formData, // Send the FormData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('profileImage').src = `/uploads/${data.newPfpUrl}`; // Update with the new image URL

            // Trigger the success modal
            const profileUpdateSuccessModal = new bootstrap.Modal(document.getElementById('profileUpdateSuccessModal'));
            profileUpdateSuccessModal.show();
        } else {
            alert('Error updating profile picture. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error uploading profile picture:', error);
        alert('Error uploading profile picture. Please try again.');
    });
}

function handleSaveChanges() {
    const jobStatus = document.getElementById('jobStatus').value;

    const formData = {
        fname: document.getElementById('firstName').value,
        mname: document.getElementById('middleName').value,
        lname: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        school_id: document.getElementById('idNumber').value,
        company: jobStatus === 'unemployed' ? '' : document.getElementById('company').value,
        bio: document.getElementById('bio').value,
        access_type: document.querySelector('input[name="accountType"]:checked').value,
    };

    if (!checkValidations(formData,jobStatus)){
        return
    }

    fetch('/api/manage-profile/update-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log('Profile updated successfully:', data);
            const successModal = new bootstrap.Modal(document.getElementById('saveChangesSuccessModal'));
            successModal.show();
        })
        .catch(error => {
            console.error('Error updating profile:', error);


            const failureModal = new bootstrap.Modal(document.getElementById('saveChangesFailureModal'));
            failureModal.show();
        });
}


document.addEventListener('DOMContentLoaded', () => {
    populateForm();
    document.getElementById('saveChangesButton').addEventListener('click', handleSaveChanges);
    document.getElementById('jobStatus').addEventListener('change', (e) => {
        toggleCompanyField(e.target.value);  
    });
});

function handleChangePassword() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        showFailureModal('New passwords do not match!');
        return;
    }

    if (newPassword.length < 8) {
        showFailureModal('New password must be at least 8 characters long.');
        return;
    }

    fetch('/api/manage-profile/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currentPassword, newPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message == 'Password updated successfully') {
            showSuccessModal('Your password has been changed successfully!');
        } else {
            showFailureModal(data.error || 'Failed to change password. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error changing password:', error);
        showFailureModal('An error occurred while changing the password. Please try again.');
    });
}


document.addEventListener('DOMContentLoaded', () => {
    populateForm();
    document.getElementById('changePasswordButton').addEventListener('click', handleChangePassword);
    document.getElementById('saveChangesButton').addEventListener('click', handleSaveChanges);
    document.getElementById('changePasswordButton').addEventListener('click', handleChangePassword);
});

