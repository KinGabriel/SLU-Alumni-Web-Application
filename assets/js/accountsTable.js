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

document.addEventListener('DOMContentLoaded', function() {
    fetch('../controller/UserListController.php') 
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
});