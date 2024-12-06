function fetchConnections() {
    const activeButton = document.querySelector('.filter-button.active');
    const searchQuery = document.querySelector('input[name="searchConnection"]').value;
    const filterValue = activeButton ? activeButton.innerText.toLowerCase() : 'mutual';
    
    // Get the selected sort option
    const sortValue = document.querySelector('.sort-option.active')?.dataset.sort || '';
    const sortQuery = sortValue ? `&sort=${sortValue}` : '';
    const searchQueryString = searchQuery ? `&search=${searchQuery}` : '';
    const filterQueryString = filterValue ? `&filter=${filterValue}` : '';

    fetch(`/api/connections/get-connection?${searchQueryString}${filterQueryString}${sortQuery}`)
        .then(response => response.json())
        .then(data => {
            updateConnectionsTable(data);  
        })
        .catch(error => {
            console.error('Error fetching mutual connections:', error);
        });
}
fetchConnections()

// TODO Modal
// Handle removal of follower
async function removeFollower(user_id, name, confirmModal) {
    try {
<<<<<<< HEAD
        const response = await fetch(`/api/remove-follower/${user_id}`, {
=======
        const response = await fetch(`/api/connections/emove-following/${following_id}`, {
>>>>>>> 43df0e1171a82995514bb0bd48024208e8dd3d17
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Close the confirmation modal
            confirmModal.hide();

            // Show success modal for follower removal
            const successModal = new bootstrap.Modal(document.getElementById('successRemoveFollowerModal'));
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

// Handle removal of following
async function removeFollowing(user_id, name, confirmModal) {
    try {
<<<<<<< HEAD
        const response = await fetch(`/api/remove-following/${user_id}`, {
=======
        const response = await fetch(`/api/connections/remove-follower/${follower_id}`, {  
>>>>>>> 43df0e1171a82995514bb0bd48024208e8dd3d17
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Close the confirmation modal
            confirmModal.hide();

            // Show success modal for following removal
            const successModal = new bootstrap.Modal(document.getElementById('successRemoveFollowingModal'));
            const removedFollowingNameElement = document.getElementById('removedFollowingName');
            removedFollowingNameElement.textContent = name;
            successModal.show();

            // Remove the following item from the DOM
            const connectionItem = document.querySelector(`[data-user-id="${user_id}"]`);
            if (connectionItem) {
                connectionItem.remove();
            }

            // Refresh the connections list
            fetchConnections();
        } else {
            alert('Failed to remove following.');
        }
    } catch (error) {
        console.error('Error removing following:', error);
        alert('An error occurred while removing the following.');
    }
}