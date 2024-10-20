function populateApplicantsTable(applicantData) {
    const appTableBody = document.getElementById('applicantTableBody');
    appTableBody.innerHTML = '';
    applicantData.forEach(applicant => {
        const row = `
            <tr>
                <td>
                    <div class="user-name">
                        <img src="../assets/images/candy.jpg" alt="${applicant.name}" class="profile-pic">
                        ${applicant.name}
                    </div>
                </td>
                <td>${applicant.email}</td>
                <td>${applicant.id_number}</td>
                <td>${applicant.gradyear}</td>
                <td>
                    <button class="btn-accept">Accept</button>
                    <button class="btn-decline">Decline</button>
                </td>
            </tr>
        `;
        appTableBody.innerHTML += row;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('../controller/applicantListController.php')
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if(Array.isArray(data)) {
                populateApplicantsTable(data);
            } else {
                console.error('Invalid data format received.');
            }
        })
        .catch(error => console.error('Error fetching applicant data:', error));
});