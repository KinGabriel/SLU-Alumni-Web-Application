function updateConnectionsTable(data) {
    const table = document.getElementById('connectionsTable');
    table.innerHTML = ''; 

    if (data.message && data.data.length === 0) {
        table.innerHTML = `<p>No connections found.</p>`; 
    } else {
        let connections = data.data;
        connections.forEach(connection => {
            const connectionItem = document.createElement('div');
            connectionItem.classList.add('connection-item');
            // Profile picture
            const profilePic = document.createElement('img');
            profilePic.src = connection.pfp;
            profilePic.alt = 'Profile Picture';
            profilePic.classList.add('profile-pic');
            // Name 
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('name');
            nameDiv.textContent = connection.name;
            // Actions (Message and Remove buttons)
            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('actions');
            const messageBtn = document.createElement('button');
            messageBtn.classList.add('message-btn');
            messageBtn.textContent = 'Message';
            messageBtn.onclick = () => sendMessage(connection.user_id);
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-btn');
            removeBtn.textContent = 'Remove';
            removeBtn.onclick = () => removeConnection(connection.user_id);
            // Append elements to actionsDiv
            actionsDiv.appendChild(messageBtn);
            actionsDiv.appendChild(removeBtn);
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
