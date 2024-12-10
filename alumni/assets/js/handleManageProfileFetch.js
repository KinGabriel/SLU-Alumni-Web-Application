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
            document.getElementById('jobStatus').value = user.jobStatus || '';  
            document.getElementById('company').value = user.company || 'Unemployed';
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
        accountType: document.querySelector('input[name="accountType"]:checked')?.value,
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
        .then(data => {
            console.log('Profile updated successfully:', data);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
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

    fetch('/api/manage-profile/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currentPassword, newPassword }),
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log('Password changed successfully:', data);
            alert('Password changed successfully!');
        })
        .catch(error => {
            console.error('Error changing password:', error);
            alert('Failed to change password. Please try again.');
        });
}



document.addEventListener('DOMContentLoaded', () => {
    populateForm();
    document.getElementById('saveChangesButton').addEventListener('click', handleSaveChanges);
    document.getElementById('changePasswordButton').addEventListener('click', handleChangePassword);
});
