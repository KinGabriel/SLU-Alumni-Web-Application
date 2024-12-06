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
async function deleteFollowing(following_id) {
    try {
        const response = await fetch(`/api/connections/emove-following/${following_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result; 
    } catch (error) {
        console.error('Error deleting following:', error.message);
        alert('Unable to delete the following. Please try again.');
    }
}


// TODO Modal
async function deleteFollower(follower_id) {
    try {
        const response = await fetch(`/api/connections/remove-follower/${follower_id}`, {  
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
     
        const result = await response.json();
        return result; 
    } catch (error) {
        console.error('Error deleting following:', error.message);
        alert('Unable to delete the follower. Please try again.');
    }
}
