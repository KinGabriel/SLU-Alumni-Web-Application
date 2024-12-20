const userTableBody = document.getElementById('userTableBody');
const jobStatusFilter = document.getElementById('jobStatusFilter');
const roleFilter = document.getElementById('roleFilter');
const dropdownContentName = document.getElementById('dropdownContentName');
const dropdownContentDate = document.getElementById('dropdownContentDate');
const dropdownContentAddedDate = document.getElementById('dropdownContentAddedDate');
// Filter function
function filterTable() {
    const jobStatus = jobStatusFilter.value.toLowerCase();
    const role = roleFilter.value.toLowerCase();
    const rows = Array.from(userTableBody.getElementsByTagName('tr'));

    rows.forEach(row => {
        const jobStatusCell = row.getElementsByTagName('td')[4]?.textContent.toLowerCase(); // Ensure cells exist
        const roleCell = row.getElementsByTagName('td')[5]?.textContent.toLowerCase();

        let showRow = true;

        // Check job status filter
        if (jobStatus !== 'all' && jobStatus !== jobStatusCell) {
            showRow = false;
        }

        // Check role filter
        if (role !== 'all' && role !== roleCell) {
            showRow = false;
        }

        row.style.display = showRow ? '' : 'none';
    });
}

// Sort functions
function sortByName(order) {
    const rows = Array.from(userTableBody.rows).filter(row => row.style.display !== 'none');
    rows.sort((a, b) => {
        const nameA = a.cells[0].textContent.toLowerCase();
        const nameB = b.cells[0].textContent.toLowerCase();
        return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    rows.forEach(row => userTableBody.appendChild(row)); // Reorder the rows in the table
}

function sortByDate(order) {
    const rows = Array.from(userTableBody.rows).filter(row => row.style.display !== 'none');
    rows.sort((a, b) => {
        const dateA = new Date(a.cells[1].textContent); // Adjust this index for the date column
        const dateB = new Date(b.cells[1].textContent); // Adjust this index for the date column
        return order === 'asc' ? dateA - dateB : dateB - dateA; // Sorting logic
    });
    rows.forEach(row => userTableBody.appendChild(row)); // Reorder the rows in the table
}

// Add event listeners to filters
jobStatusFilter.addEventListener('change', filterTable);
roleFilter.addEventListener('change', filterTable);

// Add event listeners to dropdown items for sorting
dropdownContentName.addEventListener('click', (event) => {
    const selectedOption = event.target.textContent;

    if (selectedOption === 'A - Z') {
        sortByName('asc');
    } else if (selectedOption === 'Z - A') {
        sortByName('desc');
    }
});

dropdownContentDate.addEventListener('click', (event) => {
    const selectedOption = event.target.textContent;

    if (selectedOption === 'Newest to Oldest') {
        sortByDate('desc');
    } else if (selectedOption === 'Oldest to Newest') {
        sortByDate('asc');
    }
});

// Reapply filtering after sorting to ensure only visible rows are sorted
function handleSortAndFilter() {
    filterTable();
}

// Call handleSortAndFilter after sorting to ensure the table state is consistent
dropdownContentName.addEventListener('click', handleSortAndFilter);
dropdownContentDate.addEventListener('click', handleSortAndFilter);
