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

        // Populate by name and profile picture
        const userNameDiv = document.createElement('div');
        userNameDiv.classList.add('user-name');
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
        acceptButton.addEventListener('click', () => showConfirmationModal(applicant));


        const declineButton = document.createElement('button');
        declineButton.classList.add('btn-decline');
        declineButton.textContent = 'Decline';
        declineButton.addEventListener('click',  () => showDeclineConfirmationModal(applicant));


        const viewButton = document.createElement('button');
        viewButton.classList.add('btn-view-profile');
        viewButton.textContent = 'View Image';
        viewButton.addEventListener('click', () => viewImage(applicant.school_id_pic));

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
    const urlParams = new URLSearchParams(window.location.search);
    const queryString = new URLSearchParams({
        search: urlParams.get('search') || '', 
        sort: urlParams.get('sort') || 'name ASC' 
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
}


document.addEventListener('DOMContentLoaded', () => {
    // Initial fetch of user data
    fetchUserData();

    // Real-time search handling
    const searchInput = document.querySelector('input[name="search"]');
    searchInput.addEventListener('input', function () {
        const searchValue = this.value.trim();
        const queryString = new URLSearchParams(window.location.search);

        if (searchValue === '') {
            queryString.delete('search'); // Remove 'search' query parameter if empty
        } else {
            queryString.set('search', searchValue);
        }

        // Update the browser URL without refreshing the page
        window.history.pushState({}, '', `${window.location.pathname}?${queryString.toString()}`);

        // Fetch the updated data based on the new search term
        fetchUserData();
    });

    // Handle real-time search input
    document.querySelector('input[name="search"]').addEventListener('input', function() {
        const searchValue = this.value.trim();
        if (searchValue === '') {
            // If search input is cleared, fetch all users
            fetchUserData();
        }
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


async function acceptUser(schoolID) {
    try {
        const response = await fetch(`../controller/ProcessApplicants.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ schoolID, action: 'accept' }), 
        });
        if (!response.ok) throw new Error('Failed to accept user');
        fetchUserData(); 
    } catch (error) {
        console.error(error);
    }
}

async function declineUser(schoolID) {
    try {
        const response = await fetch(`../controller/ProcessApplicants.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ schoolID, action: 'decline' }), 
        });
        if (!response.ok) throw new Error('Failed to decline user');
        fetchUserData(); 
    } catch (error) {
        console.error(error);
    }
}

function viewImage(imageUrl) {
    // Css for the show image or its modal
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .modal img {
            max-width: 90%;
            max-height: 90%;
        }

      .close-button {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0; 
        }

        .close-button img {
            width: 30px; 
            height: 30px;
            filter: brightness(0) invert(1);
        }
    `;
    // Append the style element to the head
    document.head.appendChild(style);

    // Create an image element to display the school ID picture
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl; 
    imgElement.alt = 'School ID Picture';
    imgElement.style.width = '100%'; 

    // Create a modal to display the image
    const modal = document.createElement('div');
    modal.classList.add('modal'); 
    modal.appendChild(imgElement);

    // Create a close button for the modal using an image
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button'); // Add a class for styling
    const closeIcon = document.createElement('img');
    closeIcon.src = '../assets/images/closeButton.png'; 
    closeIcon.alt = 'Close';
    closeButton.appendChild(closeIcon);
    
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal); 
        document.head.removeChild(style); 
    });
    modal.appendChild(closeButton);

    document.body.appendChild(modal); 
}

function showConfirmationModal(applicant) {
    const confirmMessage = document.getElementById('confirmMessage');
    confirmMessage.textContent = `Are you sure you want to accept ${applicant.name}?`;

    const confirmModal = document.getElementById('confirmModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = "../assets/images/addedUser.png"; 

    confirmModal.style.display = 'flex';

    document.getElementById('confirmYes').onclick = function() {
        acceptUser(applicant.id_number);
        closeConfirmationModal();
    };

    document.getElementById('confirmNo').onclick = closeConfirmationModal;
}

function showDeclineConfirmationModal(applicant) {
    const confirmMessage = document.getElementById('confirmMessage');
    confirmMessage.textContent = `Are you sure you want to decline ${applicant.name}?`;

    const confirmModal = document.getElementById('confirmModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = "../assets/images/declineUser.png"; 

    confirmModal.style.display = 'flex';

    document.getElementById('confirmYes').onclick = function() {
        declineUser(applicant.id_number);
        closeConfirmationModal();
    };

    document.getElementById('confirmNo').onclick = closeConfirmationModal;
}

function closeConfirmationModal() {
    document.getElementById('confirmModal').style.display = 'none';
}