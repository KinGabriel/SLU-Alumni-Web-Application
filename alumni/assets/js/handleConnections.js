 // Add the 'active' class based on the current URL
 document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname; // Get the current URL path
    const navLinks = document.querySelectorAll('nav li a'); // Get all navigation links

    navLinks.forEach(link => {
        // Check if the link's href matches the current path
        if (link.href.endsWith(currentPath)) {
            link.parentElement.classList.add('active');  // Add active class to the corresponding list item
        }
    });

    document.querySelectorAll('nav li a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('nav li').forEach(item => {
                item.classList.remove('active');  // Remove active class from all items
            });
            link.parentElement.classList.add('active');  // Add active class to the clicked item
        });
    });
});

function updateConnectionsTable(data) {
    const table = document.getElementById('connectionsTable');
    table.innerHTML = ''; 

    if (data.message && data.data.length === 0) {
        table.innerHTML = `<p>No connections found.</p>`; 
    } else {
        let connections = data.data;
        const activeButton = document.querySelector('.filter-button.active');
        const filterValue = activeButton ? activeButton.innerText.toLowerCase() : 'mutual';

        connections.forEach(connection => {
            const connectionItem = document.createElement('div');
            connectionItem.classList.add('connection-item');
            connectionItem.setAttribute('data-user-id', connection.user_id); // unique user ID attribute
            
            // Profile picture
            const profilePic = document.createElement('img');
            profilePic.src = connection.pfp || '../assets/images/default-profile.jpg';
            profilePic.alt = 'Profile Picture';
            profilePic.classList.add('profile-pic');
            
            // Name 
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('name');
            nameDiv.textContent = connection.name;
            
            // Actions (Accept and Decline buttons for requests, Remove for others)
            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('actions');
            
            if (filterValue === 'request') {
                // Accept button
                const acceptBtn = document.createElement('button');
                acceptBtn.classList.add('accept-btn', 'btn'); 
                acceptBtn.textContent = 'Accept';
                acceptBtn.onclick = () => acceptRequest(connection.user_id, connection.name);
                actionsDiv.appendChild(acceptBtn);
                
                // Decline button
                const declineBtn = document.createElement('button');
                declineBtn.classList.add('decline-btn', 'btn'); 
                declineBtn.textContent = 'Decline';
                declineBtn.onclick = () => removeFollower(connection.user_id, connection.name);
                actionsDiv.appendChild(declineBtn);
            } else if (filterValue !== 'mutuals') {
                // Remove button for other filters
                const removeBtn = document.createElement('button');
                removeBtn.classList.add('remove-btn', 'btn');
                removeBtn.textContent = 'Remove';
                removeBtn.onclick = () => removeConnection(connection.user_id, connection.name);
                actionsDiv.appendChild(removeBtn);
            }
            
            // Append elements to connectionItem
            connectionItem.appendChild(profilePic);
            connectionItem.appendChild(nameDiv);
            connectionItem.appendChild(actionsDiv);
            
            // Append connectionItem to the table
            table.appendChild(connectionItem);
        });
    }
}


document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        fetchConnections(); 
    });
});

document.querySelector('#searchForm').addEventListener('submit', (event) => {
    event.preventDefault(); 
    fetchConnections(); 
});

function filterEvents(filterType) {
    document.querySelectorAll('.filter-button').forEach(button => button.classList.remove('active'));
    const activeButton = [...document.querySelectorAll('.filter-button')].find(button => button.innerText.toLowerCase() === filterType);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    fetchConnections();
}

document.getElementById('dropdownButtonName').addEventListener('click', () => {
    const dropdownContent = document.getElementById('dropdownContentName');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('click', (event) => {
    if (!event.target.matches('#dropdownButtonName') && !event.target.matches('.sort-option')) {
        const dropdownContent = document.getElementById('dropdownContentName');
        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
    }
});


document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelectorAll('.sort-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        document.getElementById('dropdownContentName').style.display = 'none';
        fetchConnections();
    });
});

// TODO modal
function removeConnection(user_id, name) {
    const activeButton = document.querySelector('.filter-button.active');
    const filterValue = activeButton ? activeButton.innerText.toLowerCase() : 'mutual';

    if (filterValue === 'followers') {
       // For followers
       selectedUserId = user_id;
       selectedConnectionName = name;

       const connectionNameElement = document.getElementById('followerName');
       connectionNameElement.textContent = name;

       const confirmModal = new bootstrap.Modal(document.getElementById('confirmRemoveFollowerModal'));
       confirmModal.show();
       
       // Handle removal on confirm button
       const confirmRemoveFollowerButton = document.getElementById('confirmRemoveFollowerButton');
       confirmRemoveFollowerButton.onclick = async () => {
           await removeFollower(user_id, name, confirmModal);
       };
    } else if (filterValue === 'following') {
       // For following
       selectedUserId = user_id;
       selectedConnectionName = name;

       const connectionNameElement = document.getElementById('followingName');
       connectionNameElement.textContent = name;

       const confirmModal = new bootstrap.Modal(document.getElementById('confirmRemoveFollowingModal'));
       confirmModal.show();
       
       // Handle removal on confirm button
       const confirmRemoveFollowingButton = document.getElementById('confirmRemoveFollowingButton');
       confirmRemoveFollowingButton.onclick = async () => {
           await removeFollowing(user_id, name, confirmModal);
       };
   } else {
       console.warn('Remove operation is not allowed for this filter.');
   }
}