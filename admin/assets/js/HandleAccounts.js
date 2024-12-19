let currentPage = 1;
const usersPerPage = 5;
let allUsers = [];

function populateUserTable(userData) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';

    userData.forEach(user => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const idNumberCell = document.createElement('td');
        const gradYearCell = document.createElement('td');
        const statusCell = document.createElement('td');
        const roleCell = document.createElement('td');
        const actionCell = document.createElement('td');

        const userNameDiv = document.createElement('div');
        userNameDiv.classList.add('user-name');
        const profilePic = document.createElement('img');
        profilePic.src = user.pfp || '../assets/images/default-avatar-icon.jpg';
        profilePic.alt = user.name;
        profilePic.classList.add('profile-pic');
        userNameDiv.appendChild(profilePic);
        userNameDiv.appendChild(document.createTextNode(user.name));
        nameCell.appendChild(userNameDiv);

        emailCell.textContent = user.email;
        idNumberCell.textContent = user.id_number;
        gradYearCell.textContent = user.gradyear;
        statusCell.textContent = user.status === 'employed' ? 'Employed' : 'Unemployed';
        roleCell.textContent = user.role;

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        const editIcon = document.createElement('img');
        editIcon.src = '../assets/images/edit.png';
        editIcon.alt = 'Edit';
        editIcon.classList.add('action-icon');
        editButton.appendChild(editIcon);
        editButton.addEventListener('click', () => {
            const editUrl = new URL('SLU-Alumni-Web-Application/admin/view/EditUser.php', window.location.origin);
            editUrl.searchParams.append('user_id', user.user_id);
            window.location.href = editUrl.toString();
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        const deleteIcon = document.createElement('img');
        deleteIcon.src = '../assets/images/delete.png';
        deleteIcon.alt = 'Delete';
        deleteIcon.classList.add('action-icon');
        deleteButton.appendChild(deleteIcon);
        deleteButton.addEventListener('click', () => showConfirmationModal(user));

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(idNumberCell);
        row.appendChild(gradYearCell);
        row.appendChild(statusCell);
        row.appendChild(roleCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

function updatePaginationButtons() {
    const pagination = document.querySelector('.pagination ul');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(allUsers.length / usersPerPage);

    const createPageItem = (label, isDisabled, isActive, pageNumber) => {
        const li = document.createElement('li');
        li.className = `page-item ${isDisabled ? 'disabled' : ''} ${isActive ? 'active' : ''}`;
        const link = document.createElement('a');
        link.className = 'page-link';
        link.textContent = label;
        if (!isDisabled) {
            link.addEventListener('click', () => {
                currentPage = pageNumber;
                renderCurrentPage();
            });
        }
        li.appendChild(link);
        return li;
    };

    pagination.appendChild(createPageItem('«', currentPage === 1, false, currentPage - 1));

    for (let i = 1; i <= totalPages; i++) {
        pagination.appendChild(createPageItem(i, false, currentPage === i, i));
    }

    pagination.appendChild(createPageItem('»', currentPage === totalPages, false, currentPage + 1));
}

function renderCurrentPage() {
    const start = (currentPage - 1) * usersPerPage;
    const end = start + usersPerPage;
    populateUserTable(allUsers.slice(start, end));
    updatePaginationButtons();
}

function fetchUserData() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobStatus = document.getElementById('jobStatusFilter').value;
    const role = document.getElementById('roleFilter').value;
    const queryString = new URLSearchParams({
        search: urlParams.get('search') || '',
        jobStatus,
        role,
        sort: urlParams.get('sort') || 'name ASC',
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
                allUsers = data;
                currentPage = 1;
                renderCurrentPage();
            } else {
                console.error('Invalid data format received.');
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUserData();

    document.getElementById('jobStatusFilter').addEventListener('change', fetchUserData);
    document.getElementById('roleFilter').addEventListener('change', fetchUserData);

    document.querySelector('.search form').addEventListener('submit', function (event) {
        event.preventDefault();
        const searchValue = document.querySelector('input[name="search"]').value;
        const queryString = new URLSearchParams(window.location.search);
        queryString.set('search', searchValue);
        window.history.pushState({}, '', `${window.location.pathname}?${queryString.toString()}`);
        fetchUserData();
    });



    document.getElementById('jobStatusFilter').addEventListener('change', function() {
        const queryString = new URLSearchParams(window.location.search);
        queryString.set('jobStatusFilter', this.value);
        window.history.pushState({}, '', `${window.location.pathname}?${queryString.toString()}`); 
        fetchUserData();
    });

    document.getElementById('roleFilter').addEventListener('change', function() {
        const queryString = new URLSearchParams(window.location.search);
        queryString.set('roleFilter', this.value); 
        window.history.pushState({}, '', `${window.location.pathname}?${queryString.toString()}`);
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
            window.location.search = queryString.toString();9
        });
    });
});

async function deleteUser(email,name) {
    console.log("Deleting user:", email);
    try {
        const response = await fetch(`../controller/ProcessDeleteUser.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }), 
        });
        const data = await response.json();
        if (data.success) {
            showFeedbackModal(`${name} deleted successfully.`);
            await fetchUserData(); 
        } else {
            const errorMessage = data.error;
            showFeedbackModal(errorMessage);
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        showFeedbackModal("An error occurred while deleting the user.");
    }
}

function showConfirmationModal(user) {
    const confirmMessage = document.getElementById('confirmMessage');
    confirmMessage.textContent = `Are you sure you want to delete ${user.name}?`;

    const confirmModal = document.getElementById('confirmModal');
    confirmModal.style.display = 'flex';
    const modalImage = document.getElementById('modalImage');
    modalImage.src = "../assets/images/declineUser.png"; 

    document.getElementById('confirmYes').onclick = function() {
        deleteUser(user.email,user.name);
        closeConfirmationModal();
    };

    document.getElementById('confirmNo').onclick = closeConfirmationModal;
}

function closeConfirmationModal() {
    document.getElementById('confirmModal').style.display = 'none';
}

function showFeedbackModal(message) {
    const feedbackMessage = document.getElementById('feedbackMessage');
    feedbackMessage.textContent = message;

    const feedbackModal = document.getElementById('feedbackModal');
    feedbackModal.style.display = 'flex';
}

function closeFeedbackModal() {
    document.getElementById('feedbackModal').style.display = 'none';
}