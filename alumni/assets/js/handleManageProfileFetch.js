function populateForm() {
    fetch(`/api/profile-other/get-details`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('firstName').value = data.fName || '';
            document.getElementById('lastName').value = data.lName || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('idNumber').value = data.idNumber || '';
            document.getElementById('jobStatus').value = data.jobStatus || '';
            document.getElementById('company').value = data.company || '';
            document.getElementById('bio').value = data.bio || '';

 
            const schoolSelect = document.getElementById('school');
            const degreeSelect = document.getElementById('degree');
            const gradYearSelect = document.getElementById('gradYear');

            if (schoolSelect) schoolSelect.value = data.school || '';
            if (degreeSelect) degreeSelect.value = data.degree || '';
            if (gradYearSelect) gradYearSelect.value = data.gradYear || '';
        })
        .catch(error => {
            console.error('Error fetching profile data:', error);
        });
}

document.addEventListener('DOMContentLoaded', populateForm);
