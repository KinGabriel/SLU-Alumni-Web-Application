function populateApplicantsTable(applicantData) {
    const appTableBody = document.getElementById('applicantTableBody');
    appTableBody.innerHTML = ''; 

    applicantData.forEach(applicant => {
        const row = document.createElement('tr');
        // Create row  
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const idNumberCell = document.createElement('td');
        const gradYearCell = document.createElement('td');
        const actionCell = document.createElement('td');
         // Populate by name and pfp
        const userNameDiv = document.createElement('div');
        userNameDiv.classList.add('user-name');
        const profilePic = document.createElement('img');
        profilePic.src = '../assets/images/candy.jpg';
        profilePic.alt = applicant.name;
        profilePic.classList.add('profile-pic');
        userNameDiv.appendChild(profilePic);
        userNameDiv.appendChild(document.createTextNode(applicant.name));
        nameCell.appendChild(userNameDiv);
        // Populate the table with the data from the server
        emailCell.textContent = applicant.email;
        idNumberCell.textContent = applicant.id_number;
        gradYearCell.textContent = applicant.gradyear;
        // Create Accept and Decline buttons
        const acceptButton = document.createElement('button');
        acceptButton.classList.add('btn-accept');
        acceptButton.textContent = 'Accept';
        const declineButton = document.createElement('button');
        declineButton.classList.add('btn-decline');
        declineButton.textContent = 'Decline';
        // Append buttons
        actionCell.appendChild(acceptButton);
        actionCell.appendChild(declineButton);
        // Append all 
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(idNumberCell);
        row.appendChild(gradYearCell);
        row.appendChild(actionCell);
        appTableBody.appendChild(row);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    fetch('../controller/GetApplicationList.php')
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