function fetchConnections() {
    const activeButton = document.querySelector('.filter-button.active');
    const searchQuery = document.querySelector('input[name="searchConnection"]').value;
    const filterValue = activeButton ? activeButton.innerText.toLowerCase() : 'mutual';
    
    // Get the selected sort option
    const sortValue = document.querySelector('.sort-option.active')?.dataset.sort || '';
    const sortQuery = sortValue ? `&sort=${sortValue}` : '';
    const searchQueryString = searchQuery ? `&search=${searchQuery}` : '';
    const filterQueryString = filterValue ? `&filter=${filterValue}` : '';

    fetch(`/api/mutual?${searchQueryString}${filterQueryString}${sortQuery}`)
        .then(response => response.json())
        .then(data => {
            updateConnectionsTable(data);  // Update the connections table with fetched data
        })
        .catch(error => {
            console.error('Error fetching mutual connections:', error);
        });
}
fetchConnections()