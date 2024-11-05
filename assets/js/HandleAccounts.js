function populateUserTable(userData) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = ''; 

    userData.forEach(user => {
        const row = document.createElement('tr');
        // Create row
        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const idNumberCell = document.createElement('td');
        const gradYearCell = document.createElement('td');
        const statusCell = document.createElement('td');
        const roleCell = document.createElement('td');
        const actionCell = document.createElement('td');
        // Populate by name and pfp
        const userNameDiv = document.createElement('div');
        userNameDiv.classList.add('user-name');
        const profilePic = document.createElement('img');
       profilePic.src = user.pfp || '../assets/images/default-avatar-icon.jpg';
        profilePic.alt = user.name;
        profilePic.classList.add('profile-pic');
        userNameDiv.appendChild(profilePic);
        userNameDiv.appendChild(document.createTextNode(user.name));
        nameCell.appendChild(userNameDiv);
        // Populate the table with the data from the server
        emailCell.textContent = user.email;
        idNumberCell.textContent = user.id_number;
        gradYearCell.textContent = user.gradyear;
        statusCell.textContent = user.status === 'employed' ? 'Employed' : 'Unemployed';
        roleCell.textContent = user.role;
        // Create action buttons which will be used on for edit and delete
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        const editIcon = document.createElement('img');
        editIcon.src = '../assets/images/edit.png';
        editIcon.alt = 'Edit';
        editIcon.classList.add('action-icon');
        editButton.appendChild(editIcon);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        const deleteIcon = document.createElement('img');
        deleteIcon.src = '../assets/images/delete.png';
        deleteIcon.alt = 'Delete';
        deleteIcon.classList.add('action-icon');
        deleteButton.appendChild(deleteIcon);
        // Append as a row
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(idNumberCell);
        row.appendChild(gradYearCell);
        row.appendChild(statusCell);
        row.appendChild(roleCell);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        // Appent it to the table
        tableBody.appendChild(row);
    });
}


function fetchUserData() {
    const search = document.querySelector('input[name="search"]').value;
    const jobStatus = document.getElementById('jobStatusFilter').value;
    const role = document.getElementById('roleFilter').value;
    const queryString = new URLSearchParams({
        search,
        jobStatus,
        role,
        sort: new URLSearchParams(window.location.search).get('sort') || 'name ASC' 
    }).toString();

    fetch(`../controller/GetUserAccounts.php?${queryString}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                populateUserTable(data);
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


    document.getElementById('jobStatusFilter').addEventListener('change', function() {
        fetchUserData(); 
    });
    document.getElementById('roleFilter').addEventListener('change', function() {
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
