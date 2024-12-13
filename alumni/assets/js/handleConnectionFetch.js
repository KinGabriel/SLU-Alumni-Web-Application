let debounceTimeout;

document.querySelector('input[name="searchConnection"]').addEventListener('input', () => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        fetchConnections();
    }, 300); 
});


async function fetchConnections() {
    const activeButton = document.querySelector('.filter-button.active');
    const searchQuery = document.querySelector('input[name="searchConnection"]').value;
    const filterValue = activeButton ? activeButton.innerText.toLowerCase() : 'mutual';
    const sortValue = document.querySelector('.sort-option.active')?.dataset.sort || '';

    const queryParams = new URLSearchParams({
        search: searchQuery || '',
        filter: filterValue || '',
        sort: sortValue || ''
    });

    try {
        const response = await fetch(`/api/connections/get-connection?${queryParams.toString()}`);
        const data = await response.json();
        updateConnectionsTable(data);
    } catch (error) {
        console.error('Error fetching connections:', error);
    }
}

fetchConnections()

// TODO Modal
async function removeFollower(user_id, name, confirmModal) {
    try {
        const response = await fetch(`/api/connections/remove-follower/${user_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            confirmModal.hide();

            // Listen for when the modal is fully hidden before showing the success modal
            confirmModal._element.addEventListener('hidden.bs.modal', function () {
                const successModal = new bootstrap.Modal(document.getElementById('successRemoveFollowerModal'));
                document.getElementById('removedFollowerName').textContent = name;
                successModal.show();

                // remove the follower item from the DOM
                const connectionItem = document.querySelector(`[data-user-id="${user_id}"]`);
                if (connectionItem) {
                    connectionItem.remove();
                }

                // Call to refresh connections 
                fetchConnections();
            });
        } else {
            alert('Failed to remove follower.');
        }
    } catch (error) {
        console.error('Error removing follower:', error);
        alert('An error occurred while removing the follower.');
    }
}

// Handle removal of following
async function removeFollowing(user_id, name, confirmModal) {
    try {
        const response = await fetch(`/api/connections/remove-following/${user_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            confirmModal.hide();

            // Listen for when the modal is fully hidden before showing the success modal
            confirmModal._element.addEventListener('hidden.bs.modal', function () {
                const successModal = new bootstrap.Modal(document.getElementById('successRemoveFollowingModal'));
                document.getElementById('removedFollowingName').textContent = name;
                successModal.show();

                //  remove the following item from the DOM
                const connectionItem = document.querySelector(`[data-user-id="${user_id}"]`);
                if (connectionItem) {
                    connectionItem.remove();
                }

                // Call to refresh connections 
                fetchConnections();
            });
        } else {
            alert('Failed to remove following.');
        }
    } catch (error) {
        console.error('Error removing following:', error);
        alert('An error occurred while removing the following.');
    }
}
// handle accept
async function acceptRequest(user_id, name) {
    console.log(user_id)
    try {
        const response = await fetch(`/api/connections/acceptRequest/${user_id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Close the confirmation modal

            // Show success modal for follower removal
            const successModal = new bootstrap.Modal(document.getElementById('successfulAccept'));
            const removedFollowerNameElement = document.getElementById('removedFollowerName');
            removedFollowerNameElement.textContent = name;
            successModal.show();

            // Remove the follower item from the DOM
            const connectionItem = document.querySelector(`[data-user-id="${user_id}"]`);
            if (connectionItem) {
                connectionItem.remove();
            }

            // Refresh the connections list
            fetchConnections();
        } else {
            alert('Failed to remove follower.');
        }
    } catch (error) {
        console.error('Error removing follower:', error);
        alert('An error occurred while removing the follower.');
    }
}


