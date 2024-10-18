// Filter function
function filterTable() {
    const jobStatus = document.getElementById('jobStatusFilter').value.toLowerCase();
    const graduationYear = document.getElementById('graduationYearFilter').value;
    const role = document.getElementById('roleFilter').value.toLowerCase();

    const table = document.getElementById('userTableBody');
    const rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const jobStatusCell = rows[i].getElementsByTagName('td')[3].textContent.toLowerCase();
        const graduationYearCell = rows[i].getElementsByTagName('td')[4].textContent;
        const roleCell = rows[i].getElementsByTagName('td')[5].textContent.toLowerCase();

        let showRow = true;

        // Check job status filter
        if (jobStatus !== 'all' && jobStatus !== jobStatusCell) {
            showRow = false;
        }

        // Check graduation year filter
        if (graduationYear !== 'all' && graduationYear !== graduationYearCell) {
            showRow = false;
        }

        // Check role filter
        if (role !== 'all' && role !== roleCell) {
            showRow = false;
        }

        rows[i].style.display = showRow ? '' : 'none';
        function editRow(button) {
            const row = button.closest('tr');
            // Add your edit logic here
            console.log('Edit row:', row);
        }
        
        function deleteRow(button) {
            const row = button.closest('tr');
            // Confirm deletion before removing
            if (confirm('Are you sure you want to delete this row?')) {
                row.remove();
            }
        }
        
        // Add event listeners to buttons
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', () => editRow(button));
        });
        
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', () => deleteRow(button));
        });
        
    }
}

// Add event listeners to dropdowns
document.getElementById('jobStatusFilter').addEventListener('change', filterTable);
document.getElementById('graduationYearFilter').addEventListener('change', filterTable);
document.getElementById('roleFilter').addEventListener('change', filterTable);
