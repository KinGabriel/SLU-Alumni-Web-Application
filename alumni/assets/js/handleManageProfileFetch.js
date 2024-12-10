
function populateForm() {
    fetch(`/api/manage-profile/get-info`)
    .then(response => response.json())
        .then(data => { 
            
            document.getElementById('profileImage').src = data.pfp || '../assets/images/default-profile.jpg';
            document.getElementById('firstName').value = data.fname || '';
            document.getElementById('middleName').value = data.mname || '';
            document.getElementById('lastName').value = data.lastName || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('idNumber').value = data.school_id || '';
            document.getElementById('jobStatus').value = data.jobStatus || '';
            document.getElementById('company').value = data.company || '';
            document.getElementById('bio').value = data.bio || '';
            document.getElementById('school').value = data.school || '';
            document.getElementById('degree').value = data.program || '';
            document.getElementById('gradYear').value = data.gradyear || '';
        })
        .catch(error => console.error('Error fetching profile data:', error));
}


function handleSaveChanges() {

    const formData = {
        profileImage: document.getElementById('profileImage').src, 
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        idNumber: document.getElementById('idNumber').value,
        jobStatus: document.getElementById('jobStatus').value,
        company: document.getElementById('company').value,
        bio: document.getElementById('bio').value,
        school: document.getElementById('school').value,
        degree: document.getElementById('degree').value,
        gradYear: document.getElementById('gradYear').value,
    };

    fetch('/api/manage-profile/update-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => console.log('Profile updated successfully:', data))
        .catch(error => console.error('Error updating profile:', error));
}


function handleChangePassword() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
        alert('New passwords do not match!');
        return;
    }

    fetch('/api/manage-profie/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currentPassword, newPassword }),
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => console.log('Password changed successfully:', data))
        .catch(error => console.error('Error changing password:', error));
}

function updateProfileImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('profileImage').src = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateForm();
    document.getElementById('saveChangesButton').addEventListener('click', handleSaveChanges);
    document.getElementById('changePasswordButton').addEventListener('click', handleChangePassword);
});


