function populateUserTable(userData) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = ''; 
    
    userData.forEach(user => {
        const row = `
            <tr>
                <td>
                    <div class="user-name">
                        <img src="../assets/images/candy.jpg" alt="${user.name}" class="profile-pic">
                        ${user.name}
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${user.id_number}</td>
                <td>${user.gradyear}</td>
                <td>${user.status === 'employed' ? 'Employed' : 'Unemployed'}</td>
                <td>${user.role}</td>
                <td>
                    <button class="edit-button">
                        <img src="../assets/images/edit.png" alt="Edit" class="action-icon">
                    </button>
                    <button class="delete-button">
                        <img src="../assets/images/delete.png" alt="Delete" class="action-icon">
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row; 
    });
}

function fetchUserData() {
    const search = document.querySelector('input[name="search"]').value;
    const jobStatus = document.getElementById('jobStatusFilter').value;
    const role = document.getElementById('roleFilter').value;
    
    const queryString = new URLSearchParams({
        search,
        jobStatus,
        role
    }).toString();

    fetch(`../controller/UserListController.php?${queryString}`)
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
                console.error('Invalid data format received:', data);
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}

document.addEventListener('DOMContentLoaded', fetchUserData);

document.querySelector('.search form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    fetchUserData();
});

document.getElementById('jobStatusFilter').addEventListener('change', fetchUserData);
document.getElementById('roleFilter').addEventListener('change', fetchUserData);

// Sort functionality for dropdowns
document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', function(event) {
        event.preventDefault();
        const sortType = this.getAttribute('data-sort');
        const queryString = new URLSearchParams(window.location.search);
        queryString.set('sort', sortType);
        fetchUserData(); 
    });
});
