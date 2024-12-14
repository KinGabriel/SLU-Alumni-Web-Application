document.addEventListener("DOMContentLoaded", function () {
    const jobStatusDropdown = document.getElementById('job-status');
    const companyGrid = document.getElementById('companyGrid');

    // Function to toggle visibility
    function toggleCompanyGrid() {
        if (jobStatusDropdown.value === 'employed') {
            companyGrid.style.display = 'block';
        } else {
            companyGrid.style.display = 'none';
            document.getElementById('company').value = ''; // Clear input when hidden
        }
    }

    // Initial toggle and event listener setup
    toggleCompanyGrid();
    jobStatusDropdown.addEventListener('change', toggleCompanyGrid);
});
