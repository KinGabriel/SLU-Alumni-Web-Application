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
        const viewButton = document.createElement('button');
        viewButton.classList.add('btn-view-profile');
        viewButton.textContent = 'View Image';
        // Append buttons
        actionCell.appendChild(acceptButton);
        actionCell.appendChild(declineButton);
        actionCell.appendChild(viewButton);
        // Append all 
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(idNumberCell);
        row.appendChild(gradYearCell);
        row.appendChild(actionCell);
        appTableBody.appendChild(row);
    });
}


function fetchUserData() {
    const search = document.querySelector('input[name="search"]').value;
    const queryString = new URLSearchParams({
        search,
        sort: new URLSearchParams(window.location.search).get('sort') || 'name ASC' 
    }).toString();

    fetch(`../controller/GetApplicationList.php?${queryString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                populateApplicantsTable(data);
            } else {
                console.error('Invalid data format received.');
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
    window.history.replaceState({}, '', `?${queryString}`);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();
    document.querySelector('.search form').addEventListener('submit', function(event) {
        event.preventDefault(); 
        fetchUserData(); 
    });


    document.querySelectorAll('.sort-option').forEach(option => {
        option.addEventListener('click', function(event) {
            event.preventDefault();
            const sortType = this.getAttribute('data-sort');
            const queryString = new URLSearchParams(window.location.search);
            if (sortType === 'name-asc') {
                queryString.set('sort', 'name ASC');
            } else if (sortType === 'name-desc') {
                queryString.set('sort', 'name DESC');
            } else if (sortType === 'year-newest') {
                queryString.set('sort', 'year DESC');
            } else if (sortType === 'year-oldest') {
                queryString.set('sort', 'year ASC');
            }
            window.location.search = queryString.toString();
        });
    });
});
