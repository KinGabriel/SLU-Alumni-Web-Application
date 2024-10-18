const userTableBody = document.getElementById('userTableBody');
const jobStatusFilter = document.getElementById('jobStatusFilter');
const roleFilter = document.getElementById('roleFilter');

// Filter function
function filterTable() {
    const jobStatus = jobStatusFilter.value.toLowerCase();
    const role = roleFilter.value.toLowerCase();

    const rows = userTableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const jobStatusCell = rows[i].getElementsByTagName('td')[4].textContent.toLowerCase();
        const roleCell = rows[i].getElementsByTagName('td')[5].textContent.toLowerCase();

        let showRow = true;

        // Check job status filter
        if (jobStatus !== 'all' && jobStatus !== jobStatusCell) {
            showRow = false;
        }

        // Check role filter
        if (role !== 'all' && role !== roleCell) {
            showRow = false;
        }

        rows[i].style.display = showRow ? '' : 'none';
    }
}

// Add event listeners to dropdowns
jobStatusFilter.addEventListener('change', filterTable);
roleFilter.addEventListener('change', filterTable);
